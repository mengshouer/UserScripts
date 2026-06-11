import { useState } from "preact/hooks";
import {
  downloadFile,
  extractFileInfo,
  generateFileName,
  extractUrlInfo,
  copyToClipboard,
  message,
  i18n,
} from "../../shared";
import type { DownloaderSettings } from "../types";
import { useDownloaderSettings } from "../hooks/useDownloaderSettings";
import { DownloadButton } from "./DownloadButton";
import { handleDownloadError, likeTweet, getButtonPositionStyle } from "../utils";

interface ImageDownloadOptions {
  setIsDownloading: (downloading: boolean) => void;
  targetImage: HTMLImageElement;
  settings: DownloaderSettings;
  skipAutoLike?: boolean;
  imageIndex?: number;
  isShiftPressed?: boolean;
  showSuccessMessage?: boolean;
  tweetContainer: HTMLElement | null;
}

/**
 * 查找第一个 A 标签父元素
 */
function findFirstAnchor(node: HTMLElement): HTMLAnchorElement | null {
  let current: HTMLElement | null = node;
  for (let i = 0; i < 20 && current; i++) {
    current = current.parentElement;
    if (current?.tagName.toLowerCase() === "a") {
      return current as HTMLAnchorElement;
    }
  }
  return null;
}

export const handleImageDownload = async ({
  setIsDownloading,
  targetImage,
  settings,
  skipAutoLike = false,
  imageIndex,
  isShiftPressed = false,
  showSuccessMessage = true,
  tweetContainer,
}: ImageDownloadOptions): Promise<boolean> => {
  setIsDownloading(true);
  try {
    const { picname, ext } = extractFileInfo(targetImage.src);
    let urlInfo;

    if (window.location.href.includes("photo")) {
      urlInfo = extractUrlInfo(window.location.href);
    } else {
      const firstA = findFirstAnchor(targetImage);
      if (!firstA) return false;
      urlInfo = extractUrlInfo(firstA.href);
    }

    // 优先使用传入的 imageIndex，否则使用 URL 中解析的 picno
    const picNo = imageIndex ?? parseInt(urlInfo.picno) - 1;

    const filename = generateFileName(settings.fileName, {
      Userid: urlInfo.userid,
      Tid: urlInfo.tid,
      Time: `${Date.now()}`,
      PicName: picname,
      PicNo: `${picNo}`,
    });

    const downloadUrl = `https://pbs.twimg.com/media/${picname}?format=${ext}&name=orig`;

    // 如果按住 Shift，直接复制链接
    if (isShiftPressed) {
      await copyToClipboard(downloadUrl);
      return true;
    }

    await downloadFile(downloadUrl, `${filename}.${ext}`);
    if (showSuccessMessage) {
      message.success(i18n.t("messages.downloadSuccess"));
    }

    if (settings.autoLikeOnDownload && urlInfo.tid && !skipAutoLike) {
      const likeResult = await likeTweet(tweetContainer, urlInfo.tid);
      if (!likeResult.success && likeResult.message) {
        message.error(likeResult.message);
      }
    }

    return true;
  } catch (error) {
    handleDownloadError(error, i18n.t("messages.imageDownloadFailed"));
    return false;
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
