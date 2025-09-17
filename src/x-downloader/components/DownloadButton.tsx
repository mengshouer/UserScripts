import {
  preventEventPropagation,
  downloadFile,
  extractFileInfo,
  generateFileName,
  extractUrlInfo,
} from "../../shared";
import { useDownloaderSettings } from "../hooks/useDownloaderSettings";

interface DownloadButtonProps {
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

// 在组件外部创建设置管理器实例
const settingsManager = useDownloaderSettings();

export function DownloadButton({ targetImage }: DownloadButtonProps) {
  const handleDownload = async (e: MouseEvent) => {
    preventEventPropagation(e);

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
    <button
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        background: "rgba(0, 0, 0, 0.8)",
        border: "2px solid rgba(255, 255, 255, 0.9)",
        cursor: "pointer",
        opacity: 0.8,
        transition: "opacity 0.2s ease, transform 0.2s ease",
      }}
      onClick={handleDownload}
      onMouseDown={(e) => {
        e.preventDefault();
        return false;
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = "1";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = "0.8";
      }}
      title="下载原图"
    >
      <svg
        style={{ width: "20px", height: "20px" }}
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
        viewBox="0 0 24 24"
      >
        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
      </svg>
    </button>
  );
}
