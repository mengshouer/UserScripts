import { useState } from "preact/hooks";
import { downloadFile, generateFileName, message, i18n, copyToClipboard } from "../../shared";
import type { DownloaderSettings } from "../../shared/types";
import {
  extractVideoUrl,
  getTweetIdFromElement,
  getUserIdFromTweetContainer,
  handleDownloadError,
  likeTweet,
  getButtonPositionStyle,
} from "../utils";
import { useDownloaderSettings } from "../hooks/useDownloaderSettings";
import { DownloadButton } from "./DownloadButton";

interface VideoDownloadButtonProps {
  src: string | undefined;
  tweetContainer: HTMLElement;
}

interface VideoDownloadOptions {
  setIsDownloading: (downloading: boolean) => void;
  src: string | undefined;
  tweetContainer: HTMLElement;
  settings: DownloaderSettings;
  skipAutoLike?: boolean;
  isShiftPressed?: boolean;
}

export const handleVideoDownload = async ({
  setIsDownloading,
  src,
  tweetContainer,
  settings,
  skipAutoLike = false,
  isShiftPressed = false,
}: VideoDownloadOptions) => {
  setIsDownloading(true);
  try {
    const username = getUserIdFromTweetContainer(tweetContainer);
    const tweetId = getTweetIdFromElement(tweetContainer, username);
    if (!tweetId) {
      message.error(i18n.t("messages.cannotRecognizeTweet"));
      return;
    }

    const videoUrl =
      src && src.startsWith("https://video.twimg.com") ? src : await extractVideoUrl(tweetId);
    if (!videoUrl) {
      message.error(i18n.t("messages.videoLinkNotFound"));
      return;
    }

    // 如果按住 Shift，直接复制链接
    if (isShiftPressed) {
      await copyToClipboard(videoUrl);
      return;
    }

    const urlInfo = { userid: username, tid: tweetId };

    const filename = generateFileName(settings.videoFileName, {
      Userid: urlInfo.userid || "unknown",
      Tid: urlInfo.tid,
      Time: `${Date.now()}`,
    });

    await downloadFile(videoUrl, `${filename}.mp4`);

    if (settings.autoLikeOnDownload && tweetId && !skipAutoLike) {
      const likeResult = await likeTweet(tweetContainer, tweetId);
      if (!likeResult.success && likeResult.message) {
        message.error(likeResult.message);
      }
    }
  } catch (error) {
    handleDownloadError(error, i18n.t("messages.videoDownloadFailed"));
  } finally {
    setIsDownloading(false);
  }
};

export function VideoDownloadButton({ src, tweetContainer }: VideoDownloadButtonProps) {
  const { settings } = useDownloaderSettings();
  const [isDownloading, setIsDownloading] = useState(false);

  // 如果设置禁用了显示按钮，返回 null
  if (!settings.showVideoDownloadButton) {
    return null;
  }

  return (
    <DownloadButton
      isDownloading={isDownloading}
      onClick={(_, isShiftPressed) =>
        handleVideoDownload({
          setIsDownloading,
          src,
          tweetContainer,
          settings,
          isShiftPressed,
        })
      }
      title={isDownloading ? i18n.t("ui.downloading") : i18n.t("ui.downloadVideo")}
      style={getButtonPositionStyle(settings)}
    />
  );
}
