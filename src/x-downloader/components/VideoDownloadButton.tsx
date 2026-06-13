import { useState } from "preact/hooks";
import { i18n, message } from "../../shared";
import type { DownloaderSettings } from "../types";
import { getButtonPositionStyle, likeTweet } from "../utils";
import { useDownloaderSettings } from "../hooks/useDownloaderSettings";
import { DownloadButton } from "./DownloadButton";
import { downloadVideoMedia } from "../utils/mediaDownload";

interface VideoDownloadButtonProps {
  src: string | undefined;
  tweetContainer: HTMLElement;
}

interface VideoDownloadOptions {
  setIsDownloading: (downloading: boolean) => void;
  src: string | undefined;
  tweetContainer: HTMLElement;
  settings: DownloaderSettings;
  isShiftPressed?: boolean;
}

export const handleVideoDownload = async ({
  setIsDownloading,
  src,
  tweetContainer,
  settings,
  isShiftPressed = false,
}: VideoDownloadOptions): Promise<boolean> => {
  setIsDownloading(true);
  try {
    const downloadResult = await downloadVideoMedia({
      src,
      tweetContainer,
      settings,
      isShiftPressed,
    });

    if (
      downloadResult.success &&
      settings.autoLikeOnDownload &&
      downloadResult.tweetId &&
      !isShiftPressed
    ) {
      const likeResult = await likeTweet(tweetContainer, downloadResult.tweetId);
      if (!likeResult.success && likeResult.message) {
        message.error(likeResult.message);
      }
    }

    return downloadResult.success;
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
      onClick={async (_, isShiftPressed) => {
        await handleVideoDownload({
          setIsDownloading,
          src,
          tweetContainer,
          settings,
          isShiftPressed,
        });
      }}
      title={isDownloading ? i18n.t("ui.downloading") : i18n.t("ui.downloadVideo")}
      style={getButtonPositionStyle(settings)}
    />
  );
}
