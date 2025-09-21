import { useState } from "preact/hooks";
import { downloadFile, generateFileName } from "../../shared";
import {
  extractVideoUrl,
  getTweetIdFromElement,
  getUserIdFromTweetContainer,
  handleDownloadError,
} from "../utils";
import { useDownloaderSettings } from "../hooks/useDownloaderSettings";
import { DownloadButton } from "./DownloadButton";

interface VideoDownloadButtonProps {
  src: string | undefined;
  tweetContainer: HTMLElement;
}

export const handleVideoDownload = async (
  setIsDownloading: (downloading: boolean) => void,
  src: string | undefined,
  tweetContainer: HTMLElement,
  videoFileName: string,
) => {
  setIsDownloading(true);
  try {
    // 从 Tweet 容器中获取 Tweet ID
    const tweetId = getTweetIdFromElement(tweetContainer);
    if (!tweetId) {
      console.error("无法获取 Tweet ID");
      return;
    }

    // 获取视频下载链接
    const videoUrl =
      src && src.startsWith("https://video.twimg.com") ? src : await extractVideoUrl(tweetId);
    if (!videoUrl) {
      alert("未找到视频下载链接");
      return;
    }

    const username = getUserIdFromTweetContainer(tweetContainer);
    const urlInfo = { userid: username, tid: tweetId };

    // 使用设置中的视频文件名格式
    const filename = generateFileName(videoFileName, {
      Userid: urlInfo.userid || "unknown",
      Tid: urlInfo.tid,
      Time: Date.now().toString(),
    });

    // 下载视频
    await downloadFile(videoUrl, `${filename}.mp4`);
  } catch (error) {
    handleDownloadError(error, "视频下载失败");
  } finally {
    setIsDownloading(false);
  }
};

export function VideoDownloadButton({ src, tweetContainer }: VideoDownloadButtonProps) {
  const settingsManager = useDownloaderSettings();
  const [isDownloading, setIsDownloading] = useState(false);

  // 如果设置禁用了显示按钮，返回 null
  if (!settingsManager.settings.showVideoDownloadButton) {
    return null;
  }

  return (
    <DownloadButton
      onDownload={() => {
        if (isDownloading) return;
        setIsDownloading(true);
        handleVideoDownload(
          setIsDownloading,
          src,
          tweetContainer,
          settingsManager.settings.videoFileName,
        ).finally(() => {
          setIsDownloading(false);
        });
      }}
      title={isDownloading ? "下载中..." : "下载视频"}
      isDownloading={isDownloading}
      style={{ bottom: "70px", right: "8px" }}
    />
  );
}
