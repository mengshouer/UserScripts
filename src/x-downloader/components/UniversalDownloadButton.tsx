import { useState, useEffect } from "preact/hooks";
import { useDownloaderSettings } from "../hooks/useDownloaderSettings";
import { styled, i18n, message } from "../../shared";
import {
  tweetHasDownloadableImages,
  tweetHasDownloadableVideos,
  getDownloadableImages,
  getDownloadableVideos,
  getTweetIdFromElement,
  getUserIdFromTweetContainer,
  likeTweet,
} from "../utils";
import { downloadTweetMedia } from "../utils/mediaDownload";

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
      const downloaded = await downloadTweetMedia({
        tweetContainer,
        settings,
      });
      if (downloaded && settings.autoLikeOnDownload) {
        const username = getUserIdFromTweetContainer(tweetContainer);
        const tweetId = getTweetIdFromElement(tweetContainer, username);
        if (tweetId) {
          const likeResult = await likeTweet(tweetContainer, tweetId);
          if (!likeResult.success && likeResult.message) {
            message.error(likeResult.message);
          }
        }
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
