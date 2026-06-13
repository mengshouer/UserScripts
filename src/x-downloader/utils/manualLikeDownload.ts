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

const MANUAL_LIKE_RESPONSE_TIMEOUT_MS = 8000;
// 冷却期内同一推文不重复触发，避免快速 unlike/like 误触导致重复下载
const MANUAL_LIKE_DOWNLOAD_COOLDOWN_MS = 10_000;
const pendingManualLikeDownloads = new Set<string>();

let initialized = false;

interface ManualLikeConfirmationResult {
  success: boolean;
  errorMessage?: string | undefined;
}

const waitForManualLikeConfirmation = (tweetId: string): Promise<ManualLikeConfirmationResult> => {
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
      () => finish({ success: false, errorMessage: i18n.t("messages.likeResponseError") }),
      MANUAL_LIKE_RESPONSE_TIMEOUT_MS,
    );

    unsubscribe = subscribeFavoriteTweetResponse((result) => {
      if (result.tweetId !== tweetId) {
        return;
      }

      finish({
        success: result.success,
        errorMessage: result.success
          ? undefined
          : result.errorMessage || i18n.t("messages.likeResponseError"),
      });
    });
  });
};

const maybeDownloadAfterManualLike = (tweetContainer: HTMLElement): void => {
  const username = getUserIdFromTweetContainer(tweetContainer);
  const tweetId = getTweetIdFromElement(tweetContainer, username);

  if (!tweetId || pendingManualLikeDownloads.has(tweetId)) {
    return;
  }

  // 预检查：无可下载媒体时直接跳过，避免对纯文本推文启动 8 秒等待
  const hasMedia =
    tweetHasDownloadableImages(tweetContainer) || tweetHasDownloadableVideos(tweetContainer);
  if (!hasMedia) {
    return;
  }

  pendingManualLikeDownloads.add(tweetId);

  void (async () => {
    try {
      const confirmation = await waitForManualLikeConfirmation(tweetId);
      if (!settingsHook.signal.value.downloadOnManualLike) {
        return;
      }

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
      window.setTimeout(
        () => pendingManualLikeDownloads.delete(tweetId),
        MANUAL_LIKE_DOWNLOAD_COOLDOWN_MS,
      );
    }
  })();
};

const handleDocumentClick = (event: MouseEvent): void => {
  // isTrusted 拦截程序化点击（如下载后自动点赞的 likeButton.click()），避免形成点赞-下载循环
  if (!event.isTrusted || !settingsHook.signal.value.downloadOnManualLike) {
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
