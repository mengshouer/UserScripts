import {
  downloadFile,
  extractFileInfo,
  generateFileName,
  extractUrlInfo,
} from "../../shared";
import { useDownloaderSettings } from "../hooks/useDownloaderSettings";
import { DownloadButton } from "./DownloadButton";

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

export function ImageDownloadButton({ targetImage }: ImageDownloadButtonProps) {
  const settingsManager = useDownloaderSettings();

  // 如果设置禁用了显示按钮，返回 null
  if (!settingsManager.settings.showDownloadButton) {
    return null;
  }

  const handleDownload = async () => {
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

    const filename = generateFileName(settingsManager.settings.fileName, {
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
      console.error("Download failed:", error);
    }
  };

  return (
    <DownloadButton
      onDownload={handleDownload}
      title="下载原图"
      style={settingsManager.settings.imageButtonStyle || {}}
    />
  );
}
