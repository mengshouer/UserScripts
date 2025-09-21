import { useState } from "preact/hooks";
import { downloadFile, extractFileInfo, generateFileName, extractUrlInfo } from "../../shared";
import { useDownloaderSettings } from "../hooks/useDownloaderSettings";
import { DownloadButton } from "./DownloadButton";
import { handleDownloadError } from "../utils";

interface ImageDownloadButtonProps {
  targetImage: HTMLImageElement;
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

export const handleImageDownload = async (
  setIsDownloading: (downloading: boolean) => void,
  targetImage: HTMLImageElement,
  settingFileName: string,
) => {
  setIsDownloading(true);
  const { picname, ext } = extractFileInfo(targetImage.src);
  let urlInfo;

  if (document.location.href.includes("photo")) {
    // 大图画廊模式
    urlInfo = extractUrlInfo(document.location.href);
  } else {
    // 信息流模式
    const firstA = findFirstAnchor(targetImage);
    if (!firstA) return;
    urlInfo = extractUrlInfo(firstA.href);
  }

  const filename = generateFileName(settingFileName, {
    Userid: urlInfo.userid,
    Tid: urlInfo.tid,
    Time: Date.now().toString(),
    PicName: picname,
    PicNo: (parseInt(urlInfo.picno) - 1).toString(),
  });

  const downloadUrl = `https://pbs.twimg.com/media/${picname}?format=${ext}&name=orig`;

  try {
    await downloadFile(downloadUrl, `${filename}.${ext}`);
  } catch (error) {
    handleDownloadError(error, "图片下载失败");
  } finally {
    setIsDownloading(false);
  }
};

export function ImageDownloadButton({ targetImage }: ImageDownloadButtonProps) {
  const settingsManager = useDownloaderSettings();
  const [isDownloading, setIsDownloading] = useState(false);

  // 如果设置禁用了显示按钮，返回 null
  if (!settingsManager.settings.showDownloadButton) {
    return null;
  }

  return (
    <DownloadButton
      isDownloading={isDownloading}
      onDownload={() =>
        handleImageDownload(setIsDownloading, targetImage, settingsManager.settings.fileName)
      }
      title="下载原图"
      style={{ bottom: "8px", right: "8px" }}
    />
  );
}
