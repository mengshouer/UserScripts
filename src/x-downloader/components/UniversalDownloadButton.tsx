import { useState, useEffect } from "preact/hooks";
import { useDownloaderSettings } from "../hooks/useDownloaderSettings";
import { handleImageDownload } from "./ImageDownloadButton";
import { handleVideoDownload } from "./VideoDownloadButton";
import { styled, message, i18n } from "../../shared";
import { IMAGE_SELECTOR } from "..";
import {
  tweetHasDownloadableImages,
  tweetHasDownloadableVideos,
  getDownloadableImages,
  getDownloadableVideos,
} from "../utils";

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
  const url = window.location.href;

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const detectMediaType = () => {
      if (tweetHasDownloadableImages(tweetContainer)) {
        setMediaType("image");
        return;
      }

      if (tweetHasDownloadableVideos(tweetContainer)) {
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
    // 如果是预览页面，则只下载当前展示的图片
    if (url.includes("/photo/") && container.nodeName !== "ARTICLE") {
      const photoMatch = url.match(/\/photo\/(\d+)/);
      const photoIndex = photoMatch && photoMatch[1] ? parseInt(photoMatch[1]) - 1 : 0;

      // 查找轮播图容器，然后在其中按索引获取图片
      const carouselContainer = container.querySelector('[aria-roledescription="carousel"]');
      if (carouselContainer) {
        const targetImage = carouselContainer.querySelectorAll(IMAGE_SELECTOR)[
          photoIndex
        ] as HTMLImageElement;

        if (targetImage) {
          await handleImageDownload({
            setIsDownloading: nopSetDownloading,
            targetImage,
            settings,
            imageIndex: photoIndex,
            tweetContainer: container,
          });
          message.success(i18n.t("messages.imagesDownloadSuccess", { count: 1 }));
          return;
        }
      }
      throw new Error("Image not found in preview mode");
    }

    // 非预览模式，下载所有可下载的图片
    const images = getDownloadableImages(container);

    const downloadPromises = images.map((img, index) => {
      if (!img) return Promise.resolve();
      return handleImageDownload({
        setIsDownloading: nopSetDownloading,
        targetImage: img,
        settings,
        skipAutoLike: index > 0, // 只有第一张图片允许点赞，其他跳过
        imageIndex: index,
        tweetContainer: container,
      });
    });

    const results = await Promise.allSettled(downloadPromises);

    const failed = results.filter((result) => result.status === "rejected");
    const successCount = results.length - failed.length;
    if (successCount === 0) {
      message.error(i18n.t("messages.imageDownloadFailed"));
    } else if (failed.length > 0) {
      message.warning(
        i18n.t("messages.imagesDownloadSuccess", { count: `${successCount}/${results.length}` }),
      );
    } else {
      message.success(i18n.t("messages.imagesDownloadSuccess", { count: results.length }));
    }
  };

  const downloadVideo = async (container: HTMLElement) => {
    // 获取第一个可下载的视频
    const videos = getDownloadableVideos(container);
    const video = videos[0];

    if (!video) return;

    handleVideoDownload({
      setIsDownloading: nopSetDownloading,
      src: video.src,
      tweetContainer: container,
      settings,
    }).then(() => message.success(i18n.t("messages.videoDownloadSuccess")));
  };

  const getTitle = () => {
    if (isDownloading) return i18n.t("ui.downloading");

    // 获取可下载的媒体数量
    let imageCount = getDownloadableImages(tweetContainer).length;
    let videoCount = getDownloadableVideos(tweetContainer).length;

    // 预览模式下，始终显示单个媒体
    if (["/photo/", "/video/"].some((segment) => url.includes(segment))) {
      imageCount = 1;
      videoCount = 1;
    }

    if (mediaType === "image") {
      return imageCount > 1
        ? i18n.t("ui.downloadImages", { count: imageCount })
        : i18n.t("ui.downloadImage");
    }
    return videoCount > 1
      ? i18n.t("ui.downloadVideos", { count: videoCount })
      : i18n.t("ui.downloadVideo");
  };

  const handleDownload = async (e: MouseEvent) => {
    if (isDownloading) return;
    e.stopPropagation();

    setIsDownloading(true);

    try {
      if (mediaType === "image") {
        await downloadImages(tweetContainer);
      } else if (mediaType === "video") {
        await downloadVideo(tweetContainer);
      }
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
