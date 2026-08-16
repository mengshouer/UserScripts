import { useState } from "preact/hooks";
import { i18n, message } from "../../shared";
import type { DownloaderSettings } from "../types";
import { useDownloaderSettings } from "../hooks/useDownloaderSettings";
import { DownloadButton } from "./DownloadButton";
import { getButtonPositionStyle, likeTweet } from "../utils";
import { downloadImageMedia } from "../utils/mediaDownload";

interface ImageDownloadOptions {
  setIsDownloading: (downloading: boolean) => void;
  targetImage: HTMLImageElement;
  settings: DownloaderSettings;
  isShiftPressed?: boolean;
  tweetContainer: HTMLElement | null;
}

export const handleImageDownload = async ({
  setIsDownloading,
  targetImage,
  settings,
  isShiftPressed = false,
  tweetContainer,
}: ImageDownloadOptions): Promise<boolean> => {
  setIsDownloading(true);
  try {
    const downloadResult = await downloadImageMedia({
      targetImage,
      tweetContainer: tweetContainer || undefined,
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

interface ImageDownloadButtonProps {
  targetImage: HTMLImageElement;
  tweetContainer: HTMLElement | null;
}

export function ImageDownloadButton({ targetImage, tweetContainer }: ImageDownloadButtonProps) {
  const { settings } = useDownloaderSettings();
  const [isDownloading, setIsDownloading] = useState(false);

  // 如果设置禁用了显示按钮，返回 null
  if (!settings.showDownloadButton) return null;

  return (
    <DownloadButton
      isDownloading={isDownloading}
      onClick={async (_, isShiftPressed) => {
        await handleImageDownload({
          setIsDownloading,
          targetImage,
          settings,
          isShiftPressed,
          tweetContainer,
        });
      }}
      title={i18n.t("ui.downloadImage")}
      style={getButtonPositionStyle(settings)}
    />
  );
}
