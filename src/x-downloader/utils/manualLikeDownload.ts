import { i18n, message } from "../../shared";
import { settingsHook } from "../hooks/useDownloaderSettings";
import { subscribeFavoriteTweetResponse } from "./favoriteTweetResponse";
import { downloadTweetMedia } from "./mediaDownload";
import { LIKE_BUTTON_SELECTOR, UNLIKE_BUTTON_SELECTOR } from "./selectors";
import {
  findTweetContainer,
  getTweetIdFromElement,
  getUserIdFromTweetContainer,
  tweetHasDownloadableImages,
  tweetHasDownloadableVideos,
} from "./tweetDom";

// 点赞响应确认窗口。下载不等待它，它只决定「多久之后判定为没收到响应」，
// 到点后还要用按钮状态复核才会提示，所以放宽是安全的：
// 弱网下 X 响应偏慢时过早判定只会增加复核次数。
const MANUAL_LIKE_RESPONSE_TIMEOUT_MS = 15_000;
// 同一推文在此期间内不再触发下载，覆盖重复点击、同一推文存在多个点赞按钮
// （灯箱底部与右栏 article）、以及快速 unlike/like 误触
const MANUAL_LIKE_DOWNLOAD_COOLDOWN_MS = 10_000;

// 正在下载或处于冷却期的推文 id
const activeManualLikeTweetIds = new Set<string>();

let initialized = false;

/** 无响应可归因时用 timeout，X 明确返回错误时用 error */
type LikeSettleReason = { kind: "timeout" } | { kind: "error"; message: string };

const buildTweetUrl = (tweetId: string, username: string | undefined): string =>
  username
    ? `https://x.com/${username}/status/${tweetId}`
    : `https://x.com/i/web/status/${tweetId}`;

/**
 * 没观测到响应时改用按钮状态复核：只有能正面看到「仍未点赞」才提示。
 * 容器已被 timeline 虚拟化回收、或按钮压根找不到时一律返回 false——
 * 观测不到不等于点赞失败，此时闭嘴比误报更可取。
 */
const isStillUnliked = (tweetContainer: HTMLElement): boolean => {
  if (!tweetContainer.isConnected) {
    return false;
  }

  // 先查 unlike：灯箱容器里可能混有其他推文的 like 按钮，已点赞的证据优先
  if (tweetContainer.querySelector(UNLIKE_BUTTON_SELECTOR)) {
    return false;
  }

  return Boolean(tweetContainer.querySelector(LIKE_BUTTON_SELECTOR));
};

/**
 * 监听该推文的 FavoriteTweet 响应，仅在响应异常或迟迟收不到响应时提示。
 * 下载已在点击时发起，这里不参与下载流程，纯粹作为提示通道。
 */
const watchLikeResult = (
  tweetId: string,
  username: string | undefined,
  tweetContainer: HTMLElement,
): void => {
  let settled = false;
  let timeoutId: number | undefined;
  let unsubscribe: (() => void) | undefined;

  const cleanup = () => {
    if (timeoutId !== undefined) {
      window.clearTimeout(timeoutId);
      timeoutId = undefined;
    }
    unsubscribe?.();
    unsubscribe = undefined;
  };

  const warnWithTweetLink = (content: string): void => {
    message.warning(content, undefined, undefined, () =>
      window.open(buildTweetUrl(tweetId, username), "_blank"),
    );
  };

  /** reason 为空表示点赞已确认成功，静默收尾；否则按原因弹出可点击的警告 */
  const settle = (reason?: LikeSettleReason): void => {
    if (settled) {
      return;
    }

    settled = true;
    cleanup();

    if (!reason) {
      return;
    }

    if (reason.kind === "error") {
      warnWithTweetLink(
        i18n.t("messages.manualLikeResponseUncertain", {
          user: username || tweetId,
          error: reason.message,
        }),
      );
      return;
    }

    // 超时只说明我们没观测到响应，按钮状态才是本地事实
    if (!isStillUnliked(tweetContainer)) {
      return;
    }

    warnWithTweetLink(i18n.t("messages.manualLikeResponseMissing", { user: username || tweetId }));
  };

  timeoutId = window.setTimeout(() => settle({ kind: "timeout" }), MANUAL_LIKE_RESPONSE_TIMEOUT_MS);

  unsubscribe = subscribeFavoriteTweetResponse((result) => {
    // 按 tweetId 精确配对：并发点赞时各自只认自己那条响应，不受响应顺序影响
    if (result.tweetId !== tweetId) {
      return;
    }

    settle(
      result.success
        ? undefined
        : { kind: "error", message: result.errorMessage || i18n.t("messages.likeResponseError") },
    );
  });
};

const maybeDownloadAfterManualLike = (
  tweetContainer: HTMLElement,
  likeButton: HTMLElement,
): void => {
  // 预检查：无可下载媒体时不产生任何动作，避免对纯文本推文误报
  const hasMedia =
    tweetHasDownloadableImages(tweetContainer) || tweetHasDownloadableVideos(tweetContainer);
  if (!hasMedia) {
    return;
  }

  // tweetId 是可选增强：用于去重去噪与警告里的推文链接。
  // 解析失败时（例如没有 status 链接的推广推文）降级处理，但下载照常进行。
  const tweetId = getTweetIdFromElement(likeButton);
  const username = tweetId ? getUserIdFromTweetContainer(tweetContainer) : undefined;

  if (tweetId) {
    if (activeManualLikeTweetIds.has(tweetId)) {
      return;
    }

    activeManualLikeTweetIds.add(tweetId);
    watchLikeResult(tweetId, username, tweetContainer);
  } else {
    console.debug(
      "[x-downloader] manual like: tweet id unavailable, dedupe and like check skipped",
    );
  }

  // 点击即下载，不等待点赞响应：等待除了拖慢下载并不能阻止任何一次下载
  void (async () => {
    try {
      await downloadTweetMedia({
        tweetContainer,
        settings: settingsHook.signal.value,
      });
    } catch (error) {
      console.error("Download on manual like failed:", error);
    } finally {
      if (tweetId) {
        window.setTimeout(
          () => activeManualLikeTweetIds.delete(tweetId),
          MANUAL_LIKE_DOWNLOAD_COOLDOWN_MS,
        );
      }
    }
  })();
};

const handleDocumentClick = (event: MouseEvent): void => {
  // isTrusted 拦截程序化点击（如下载后自动点赞的 likeButton.click()），避免形成点赞-下载循环
  if (!event.isTrusted || !settingsHook.signal.value.downloadOnManualLike) {
    return;
  }

  // Shift 键按下时跳过下载（用于临时禁用自动下载）
  if (event.shiftKey) {
    return;
  }

  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }

  const likeButton = target.closest<HTMLButtonElement>(LIKE_BUTTON_SELECTOR);
  if (!likeButton) {
    return;
  }

  // findTweetContainer 兼容 timeline 的 article 与 photo 灯箱的 dialog 容器
  const tweetContainer = findTweetContainer(likeButton);
  if (!tweetContainer) {
    return;
  }

  maybeDownloadAfterManualLike(tweetContainer, likeButton);
};

export const initializeManualLikeDownload = (): void => {
  if (initialized) {
    return;
  }
  initialized = true;

  document.addEventListener("click", handleDocumentClick, true);
};
