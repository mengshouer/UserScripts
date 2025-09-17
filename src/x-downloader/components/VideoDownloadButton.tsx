import { useState } from "preact/hooks";
import { preventEventPropagation, downloadFile, generateFileName, extractUrlInfo } from "../../shared";
import { extractVideoUrl, getTweetIdFromElement } from "../utils/videoUtils";
import { useDownloaderSettings } from "../hooks/useDownloaderSettings";

interface VideoDownloadButtonProps {
  tweetContainer: HTMLElement;
}

// 在组件外部创建设置管理器实例
const settingsManager = useDownloaderSettings();

export function VideoDownloadButton({
  tweetContainer,
}: VideoDownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (e: MouseEvent) => {
    preventEventPropagation(e);

    if (isDownloading) return;

    setIsDownloading(true);

    try {
      // 从 Tweet 容器中获取 Tweet ID
      const tweetId = getTweetIdFromElement(tweetContainer);
      if (!tweetId) {
        console.error("无法获取 Tweet ID");
        return;
      }

      // 获取视频下载链接
      const videoUrl = await extractVideoUrl(tweetId);
      if (!videoUrl) {
        alert("未找到视频下载链接");
        return;
      }

      // 获取 URL 信息以生成更好的文件名
      let urlInfo;
      try {
        // 尝试从 Tweet 容器中的链接获取信息
        const tweetLink = tweetContainer.querySelector('a[href*="/status/"]') as HTMLAnchorElement;
        if (tweetLink) {
          urlInfo = extractUrlInfo(tweetLink.href);
        } else {
          // 备用方案：使用当前 URL
          urlInfo = extractUrlInfo(window.location.href);
        }
      } catch (error) {
        console.warn("无法提取URL信息，使用默认格式:", error);
        urlInfo = { userid: "unknown", tid: tweetId, picno: "1" };
      }

      // 使用设置中的视频文件名格式
      const filename = generateFileName(settingsManager.settings.videoFileName, {
        Userid: urlInfo.userid,
        Tid: urlInfo.tid,
        Time: Date.now().toString(),
      });

      // 下载视频
      await downloadFile(videoUrl, `${filename}.mp4`);
    } catch (error) {
      console.error("视频下载失败:", error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      alert(`下载失败: ${errorMessage}`);
    } finally {
      setIsDownloading(false);
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
        cursor: isDownloading ? "not-allowed" : "pointer",
        opacity: isDownloading ? 0.5 : 0.9,
        transition: "opacity 0.2s ease, transform 0.2s ease",
        transform: isDownloading ? "scale(0.95)" : "scale(1)",
      }}
      onClick={handleDownload}
      onMouseDown={(e) => {
        e.preventDefault();
        return false;
      }}
      onMouseEnter={(e) => {
        if (!isDownloading) {
          e.currentTarget.style.opacity = "1";
          e.currentTarget.style.transform = "scale(1.05)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isDownloading) {
          e.currentTarget.style.opacity = "0.9";
          e.currentTarget.style.transform = "scale(1)";
        }
      }}
      title={isDownloading ? "下载中..." : "下载视频"}
      disabled={isDownloading}
    >
      {isDownloading ? (
        // 加载图标
        <svg
          style={{
            width: "18px",
            height: "18px",
            animation: "spin 1s linear infinite",
          }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeDasharray="31.416"
            strokeDashoffset="15.708"
            style={{ color: "white" }}
          />
        </svg>
      ) : (
        // 下载图标（视频专用，更简洁的设计）
        <svg
          style={{ width: "20px", height: "20px" }}
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
        >
          <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
        </svg>
      )}
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </button>
  );
}
