import { i18n, message } from "../../shared";
import { settingsHook } from "../hooks/useDownloaderSettings";
import { subscribeFavoriteTweetResponse } from "./favoriteTweetResponse";
import { downloadTweetMedia } from "./mediaDownload";
import { LIKE_BUTTON_SELECTOR } from "./selectors";
import {
  findTweetContainer,
  getTweetIdFromElement,
  getUserIdFromTweetContainer,
  tweetHasDownloadableImages,
  tweetHasDownloadableVideos,
} from "./tweetDom";

// 点赞响应确认窗口。下载不等待它，它只决定「多久之后判定为没收到响应并提示」，
// 所以可以放宽：弱网下 X 响应偏慢时过早提示只会变成假警报。
const MANUAL_LIKE_RESPONSE_TIMEOUT_MS = 15_000;
// 同一推文在此期间内不再触发下载，覆盖重复点击、同一推文存在多个点赞按钮
// （灯箱底部与右栏 article）、以及快速 unlike/like 误触
const MANUAL_LIKE_DOWNLOAD_COOLDOWN_MS = 10_000;

// 正在下载或处于冷却期的推文 id
const activeManualLikeTweetIds = new Set<string>();

let initialized = false;

const buildTweetUrl = (tweetId: string, username: string | undefined): string =>
  username
    ? `https://x.com/${username}/status/${tweetId}`
    : `https://x.com/i/web/status/${tweetId}`;

/**
 * 监听该推文的 FavoriteTweet 响应，仅在响应异常或迟迟收不到响应时提示。
 * 下载已在点击时发起，这里不参与下载流程，纯粹作为提示通道。
 */
const watchLikeResult = (tweetId: string, username: string | undefined): void => {
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

  /** errorMessage 为空表示点赞已确认成功，静默收尾；否则弹出可点击的警告 */
  const settle = (errorMessage?: string): void => {
    if (settled) {
      return;
    }

    settled = true;
    cleanup();

    if (!errorMessage) {
      return;
    }

    message.warning(
      i18n.t("messages.manualLikeResponseUncertain", {
        user: username || tweetId,
        error: errorMessage,
      }),
      undefined,
      undefined,
      () => window.open(buildTweetUrl(tweetId, username), "_blank"),
    );
  };

  timeoutId = window.setTimeout(
    () => settle(i18n.t("messages.likeResponseError")),
    MANUAL_LIKE_RESPONSE_TIMEOUT_MS,
  );

  unsubscribe = subscribeFavoriteTweetResponse((result) => {
    // 按 tweetId 精确配对：并发点赞时各自只认自己那条响应，不受响应顺序影响
    if (result.tweetId !== tweetId) {
      return;
    }

    settle(
      result.success ? undefined : result.errorMessage || i18n.t("messages.likeResponseError"),
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
    watchLikeResult(tweetId, username);
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
