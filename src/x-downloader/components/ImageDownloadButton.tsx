import { useState } from "preact/hooks";
import {
  downloadFile,
  extractFileInfo,
  generateFileName,
  extractUrlInfo,
  message,
  i18n,
} from "../../shared";
import type { DownloaderSettings } from "../../shared/types";
import { useDownloaderSettings } from "../hooks/useDownloaderSettings";
import { DownloadButton } from "./DownloadButton";
import { handleDownloadError, likeTweet } from "../utils";

interface ImageDownloadButtonProps {
  targetImage: HTMLImageElement;
}

interface ImageDownloadOptions {
  setIsDownloading: (downloading: boolean) => void;
  targetImage: HTMLImageElement;
  settings: DownloaderSettings;
  skipAutoLike?: boolean;
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
}: ImageDownloadOptions) => {
  setIsDownloading(true);
  const { picname, ext } = extractFileInfo(targetImage.src);
  let urlInfo;

  if (document.location.href.includes("photo")) {
    urlInfo = extractUrlInfo(document.location.href);
  } else {
    const firstA = findFirstAnchor(targetImage);
    if (!firstA) return;
    urlInfo = extractUrlInfo(firstA.href);
  }

  const filename = generateFileName(settings.fileName, {
    Userid: urlInfo.userid,
    Tid: urlInfo.tid,
    Time: Date.now().toString(),
    PicName: picname,
    PicNo: (parseInt(urlInfo.picno) - 1).toString(),
  });

  const downloadUrl = `https://pbs.twimg.com/media/${picname}?format=${ext}&name=orig`;

  try {
    await downloadFile(downloadUrl, `${filename}.${ext}`);

    if (settings.autoLikeOnDownload && urlInfo.tid && !skipAutoLike) {
      const likeResult = await likeTweet(urlInfo.tid);
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

export function ImageDownloadButton({ targetImage }: ImageDownloadButtonProps) {
  const { settings } = useDownloaderSettings();
  const [isDownloading, setIsDownloading] = useState(false);

  // 如果设置禁用了显示按钮，返回 null
  if (!settings.showDownloadButton) {
    return null;
  }

  return (
    <DownloadButton
      isDownloading={isDownloading}
      onDownload={() =>
        handleImageDownload({
          setIsDownloading,
          targetImage,
          settings,
        })
      }
      title={i18n.t("ui.downloadImage")}
      style={{ bottom: "8px", right: "8px" }}
    />
  );
}
