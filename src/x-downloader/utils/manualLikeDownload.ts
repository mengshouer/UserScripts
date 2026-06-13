import { i18n, message } from "../../shared";
import { settingsHook } from "../hooks/useDownloaderSettings";
import { subscribeFavoriteTweetResponse } from "./favoriteTweetResponse";
import { downloadTweetMedia } from "./mediaDownload";
import { LIKE_BUTTON_SELECTOR } from "./selectors";
import {
  findTweetContainer,
  tweetHasDownloadableImages,
  tweetHasDownloadableVideos,
} from "./tweetDom";

const MANUAL_LIKE_RESPONSE_TIMEOUT_MS = 8000;
// 冷却期内同一推文不重复触发，避免快速 unlike/like 误触导致重复下载
const MANUAL_LIKE_DOWNLOAD_COOLDOWN_MS = 10_000;
const pendingManualLikeDownloads = new Set<string>();

// 待确认的点赞请求序号，按 FIFO 顺序消费 FavoriteTweet 响应
const pendingLikeTokens = new Set<number>();
let likeSequence = 0;

let initialized = false;

interface ManualLikeConfirmationResult {
  success: boolean;
  tweetId: string;
  errorMessage?: string | undefined;
}

const waitForManualLikeConfirmation = (token: number): Promise<ManualLikeConfirmationResult> => {
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

  return new Promise((resolve) => {
    const finish = (result: ManualLikeConfirmationResult) => {
      if (settled) {
        return;
      }

      settled = true;
      cleanup();
      resolve(result);
    };

    timeoutId = window.setTimeout(
      () =>
        finish({
          success: false,
          tweetId: "",
          errorMessage: i18n.t("messages.likeResponseError"),
        }),
      MANUAL_LIKE_RESPONSE_TIMEOUT_MS,
    );

    unsubscribe = subscribeFavoriteTweetResponse((result) => {
      // FIFO：仅最早的待确认点赞消费当前响应，避免并发点赞时多个订阅抢占同一响应。
      // 下载内容由 tweetContainer 决定，tweetId 仅用于冷却去重，故即使响应乱序也不会下错推文。
      let oldest = Infinity;
      for (const pending of pendingLikeTokens) {
        if (pending < oldest) {
          oldest = pending;
        }
      }
      if (token !== oldest) {
        return;
      }

      finish({
        success: result.success,
        tweetId: result.tweetId,
        errorMessage: result.success
          ? undefined
          : result.errorMessage || i18n.t("messages.likeResponseError"),
      });
    });
  });
};

const maybeDownloadAfterManualLike = (tweetContainer: HTMLElement): void => {
  // 预检查：无可下载媒体时直接跳过，避免对纯文本推文启动 8 秒等待
  const hasMedia =
    tweetHasDownloadableImages(tweetContainer) || tweetHasDownloadableVideos(tweetContainer);
  if (!hasMedia) {
    return;
  }

  const token = ++likeSequence;
  pendingLikeTokens.add(token);

  void (async () => {
    let confirmation: ManualLikeConfirmationResult | undefined;
    try {
      confirmation = await waitForManualLikeConfirmation(token);

      if (!settingsHook.signal.value.downloadOnManualLike) {
        return;
      }

      const { tweetId } = confirmation;
      if (!tweetId) {
        return;
      }

      // 冷却期去重
      if (pendingManualLikeDownloads.has(tweetId)) {
        return;
      }

      pendingManualLikeDownloads.add(tweetId);

      if (!confirmation.success) {
        message.warning(
          i18n.t("messages.manualLikeResponseUncertain", {
            error: confirmation.errorMessage || i18n.t("messages.likeResponseError"),
          }),
        );
      }

      await downloadTweetMedia({
        tweetContainer,
        settings: settingsHook.signal.value,
      });
    } catch (error) {
      console.error("Download on manual like failed:", error);
    } finally {
      pendingLikeTokens.delete(token);
      const finalTweetId = confirmation?.tweetId;
      if (finalTweetId) {
        window.setTimeout(
          () => pendingManualLikeDownloads.delete(finalTweetId),
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

  maybeDownloadAfterManualLike(tweetContainer);
};

export const initializeManualLikeDownload = (): void => {
  if (initialized) {
    return;
  }
  initialized = true;

  document.addEventListener("click", handleDocumentClick, true);
};
