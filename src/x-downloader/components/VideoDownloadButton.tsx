import { useState } from "preact/hooks";
import { downloadFile, generateFileName, extractUrlInfo } from "../../shared";
import { extractVideoUrl, getTweetIdFromElement } from "../utils/videoUtils";
import { useDownloaderSettings } from "../hooks/useDownloaderSettings";
import { DownloadButton } from "./DownloadButton";

interface VideoDownloadButtonProps {
  tweetContainer: HTMLElement;
}

export function VideoDownloadButton({ tweetContainer }: VideoDownloadButtonProps) {
  const settingsManager = useDownloaderSettings();
  const [isDownloading, setIsDownloading] = useState(false);

  // 如果设置禁用了显示按钮，返回 null
  if (!settingsManager.settings.showVideoDownloadButton) {
    return null;
  }

  const handleDownload = async () => {
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
      const errorMessage = error instanceof Error ? error.message : String(error);
      alert(`下载失败: ${errorMessage}`);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <DownloadButton
      onDownload={handleDownload}
      title={isDownloading ? "下载中..." : "下载视频"}
      isDownloading={isDownloading}
      style={settingsManager.settings.videoButtonStyle || {}}
    />
  );
}
