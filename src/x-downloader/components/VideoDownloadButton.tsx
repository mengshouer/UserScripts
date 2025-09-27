import { useState } from "preact/hooks";
import { downloadFile, generateFileName, message } from "../../shared";
import type { DownloaderSettings } from "../../shared/types";
import {
  extractVideoUrl,
  getTweetIdFromElement,
  getUserIdFromTweetContainer,
  handleDownloadError,
  likeTweet,
} from "../utils";
import { useDownloaderSettings } from "../hooks/useDownloaderSettings";
import { DownloadButton } from "./DownloadButton";

interface VideoDownloadButtonProps {
  src: string | undefined;
  tweetContainer: HTMLElement;
}

interface VideoDownloadOptions {
  setIsDownloading: (downloading: boolean) => void;
  src: string | undefined;
  tweetContainer: HTMLElement;
  settings: DownloaderSettings;
  skipAutoLike?: boolean;
}

export const handleVideoDownload = async ({
  setIsDownloading,
  src,
  tweetContainer,
  settings,
  skipAutoLike = false,
}: VideoDownloadOptions) => {
  setIsDownloading(true);
  try {
    const tweetId = getTweetIdFromElement(tweetContainer);
    if (!tweetId) {
      message.error("无法识别推文，请重试");
      return;
    }

    const videoUrl =
      src && src.startsWith("https://video.twimg.com") ? src : await extractVideoUrl(tweetId);
    if (!videoUrl) {
      message.error("未找到视频下载链接");
      return;
    }

    const username = getUserIdFromTweetContainer(tweetContainer);
    const urlInfo = { userid: username, tid: tweetId };

    const filename = generateFileName(settings.videoFileName, {
      Userid: urlInfo.userid || "unknown",
      Tid: urlInfo.tid,
      Time: Date.now().toString(),
    });

    await downloadFile(videoUrl, `${filename}.mp4`);

    if (settings.autoLikeOnDownload && tweetId && !skipAutoLike) {
      const likeResult = await likeTweet(tweetId);
      if (!likeResult.success && likeResult.message) {
        message.error(likeResult.message);
      }
    }
  } catch (error) {
    handleDownloadError(error, "视频下载失败");
  } finally {
    setIsDownloading(false);
  }
};

export function VideoDownloadButton({ src, tweetContainer }: VideoDownloadButtonProps) {
  const { settings } = useDownloaderSettings();
  const [isDownloading, setIsDownloading] = useState(false);

  // 如果设置禁用了显示按钮，返回 null
  if (!settings.showVideoDownloadButton) {
    return null;
  }

  return (
    <DownloadButton
      onDownload={() => {
        if (isDownloading) return;
        setIsDownloading(true);
        handleVideoDownload({
          setIsDownloading,
          src,
          tweetContainer,
          settings,
        }).finally(() => {
          setIsDownloading(false);
        });
      }}
      title={isDownloading ? "下载中..." : "下载视频"}
      isDownloading={isDownloading}
      style={{ bottom: "70px", right: "8px" }}
    />
  );
}
