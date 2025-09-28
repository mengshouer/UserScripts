import { useState, useEffect } from "preact/hooks";
import { handleDownloadError } from "../utils";
import { useDownloaderSettings } from "../hooks/useDownloaderSettings";
import { handleImageDownload } from "./ImageDownloadButton";
import { handleVideoDownload } from "./VideoDownloadButton";
import { styled, message, i18n } from "../../shared";
import { IMAGE_SELECTOR, VIDEO_SELECTOR } from "..";

interface UniversalDownloadButtonProps {
  tweetContainer: HTMLElement;
}

const InlineButton = styled("button")`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34.75px;
  height: 34.75px;
  border-radius: 50%;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  color: rgb(113, 118, 123);

  &:hover:not(:disabled) {
    background-color: rgba(29, 155, 240, 0.1);
    color: rgb(29, 155, 240);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const DownloadIcon = styled("svg")`
  width: 18.75px;
  height: 18.75px;
  fill: currentColor;
`;

export function UniversalDownloadButton({ tweetContainer }: UniversalDownloadButtonProps) {
  const { settings } = useDownloaderSettings();
  const [isDownloading, setIsDownloading] = useState(false);
  const [mediaType, setMediaType] = useState<"image" | "video" | "none">("none");

  // 检测Tweet中的媒体类型
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const detectMediaType = () => {
      // 检查是否有图片
      const images = tweetContainer.querySelectorAll(IMAGE_SELECTOR);
      if (images.length > 0) {
        setMediaType("image");
        return;
      }

      // 检查是否有视频
      const videos = tweetContainer.querySelectorAll(VIDEO_SELECTOR);
      if (videos.length > 0) {
        setMediaType("video");
        return;
      }

      setMediaType("none");
    };

    const debouncedDetectMediaType = () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(detectMediaType, 100);
    };

    // 初始检测
    detectMediaType();

    // 监听DOM变化，以防媒体是懒加载的
    const observer = new MutationObserver(debouncedDetectMediaType);
    observer.observe(tweetContainer, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false,
    });

    return () => {
      observer.disconnect();
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, [tweetContainer]);

  // 如果没有媒体或者设置禁用了显示按钮，不显示
  if (mediaType === "none" || !settings.showUniversalDownloadButton) {
    return null;
  }

  // 创建一个空的状态函数，避免子下载函数影响主按钮状态
  const nopSetDownloading = () => {};

  const downloadImages = async (container: HTMLElement) => {
    const images = container.querySelectorAll(IMAGE_SELECTOR) as NodeListOf<HTMLImageElement>;

    const downloadPromises = Array.from(images).map((img, index) => {
      if (!img) return Promise.resolve();
      return handleImageDownload({
        setIsDownloading: nopSetDownloading,
        targetImage: img,
        settings,
        skipAutoLike: index > 0, // 只有第一张图片允许点赞，其他跳过
      });
    });

    const results = await Promise.allSettled(downloadPromises);

    const failed = results.filter((result) => result.status === "rejected");
    if (failed.length > 0) {
      const successCount = results.length - failed.length;
      throw new Error(`${successCount}/${results.length} 张图片下载成功`);
    }
  };

  const downloadVideo = async (container: HTMLElement) => {
    const video = container.querySelector(VIDEO_SELECTOR) as HTMLVideoElement | null;
    if (!video) return;

    await handleVideoDownload({
      setIsDownloading: nopSetDownloading,
      src: video?.src,
      tweetContainer: container,
      settings,
    });
  };

  const getTitle = () => {
    if (isDownloading) return i18n.t("ui.downloading");
    const imageCount = tweetContainer.querySelectorAll(IMAGE_SELECTOR).length;
    const videoCount = tweetContainer.querySelectorAll(VIDEO_SELECTOR).length;

    if (mediaType === "image") {
      return imageCount > 1
        ? i18n.t("ui.downloadImages", { count: imageCount })
        : i18n.t("ui.downloadImage");
    }
    return videoCount > 1
      ? i18n.t("ui.downloadVideos", { count: videoCount })
      : i18n.t("ui.downloadVideo");
  };

  const handleDownload = async () => {
    if (isDownloading) return;

    setIsDownloading(true);

    try {
      if (mediaType === "image") {
        await downloadImages(tweetContainer);
        const count = tweetContainer.querySelectorAll(IMAGE_SELECTOR).length;
        message.success(i18n.t("messages.imagesDownloadSuccess", { count }));
      } else if (mediaType === "video") {
        await downloadVideo(tweetContainer);
        message.success(i18n.t("messages.videoDownloadSuccess"));
      }
    } catch (error) {
      handleDownloadError(error, i18n.t("messages.downloadFailed"));
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <InlineButton onClick={handleDownload} disabled={isDownloading} title={getTitle()}>
      <DownloadIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
      </DownloadIcon>
    </InlineButton>
  );
}
