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
import type { DownloaderSettings } from "../../shared/types";
import { useDownloaderSettings } from "../hooks/useDownloaderSettings";
import { DownloadButton } from "./DownloadButton";
import { handleDownloadError, likeTweet } from "../utils";

interface ImageDownloadOptions {
  setIsDownloading: (downloading: boolean) => void;
  targetImage: HTMLImageElement;
  settings: DownloaderSettings;
  skipAutoLike?: boolean;
  imageIndex?: number;
  isShiftPressed?: boolean;
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
  tweetContainer,
}: ImageDownloadOptions) => {
  setIsDownloading(true);
  const { picname, ext } = extractFileInfo(targetImage.src);
  let urlInfo;

  if (window.location.href.includes("photo")) {
    urlInfo = extractUrlInfo(window.location.href);
  } else {
    const firstA = findFirstAnchor(targetImage);
    if (!firstA) return;
    urlInfo = extractUrlInfo(firstA.href);
  }

  // 优先使用传入的 imageIndex，否则使用 URL 中解析的 picno
  const picNo = imageIndex ? imageIndex : parseInt(urlInfo.picno) - 1;

  const filename = generateFileName(settings.fileName, {
    Userid: urlInfo.userid,
    Tid: urlInfo.tid,
    Time: `${Date.now()}`,
    PicName: picname,
    PicNo: `${picNo}`,
  });

  const downloadUrl = `https://pbs.twimg.com/media/${picname}?format=${ext}&name=orig`;

  try {
    // 如果按住 Shift，直接复制链接
    if (isShiftPressed) {
      await copyToClipboard(downloadUrl);
      return;
    }

    await downloadFile(downloadUrl, `${filename}.${ext}`);

    if (settings.autoLikeOnDownload && urlInfo.tid && !skipAutoLike) {
      const likeResult = await likeTweet(tweetContainer, urlInfo.tid);
      if (!likeResult.success && likeResult.message) {
        message.error(likeResult.message);
      }
    }
  } catch (error) {
    handleDownloadError(error, i18n.t("messages.imageDownloadFailed"));
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
      onClick={(_, isShiftPressed) =>
        handleImageDownload({
          setIsDownloading,
          targetImage,
          settings,
          isShiftPressed,
          tweetContainer,
        })
      }
      title={i18n.t("ui.downloadImage")}
      style={{ bottom: "8px", right: "8px" }}
    />
  );
}
