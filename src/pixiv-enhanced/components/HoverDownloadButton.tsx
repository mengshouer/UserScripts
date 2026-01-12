import { useState } from "preact/hooks";
import { styled, formatPositionValue } from "../../shared";
import { usePixivDownloaderSettings } from "../hooks/usePixivDownloaderSettings";
import { getImageUrlInfo, extractArtworkInfo } from "../utils/pixivParser";
import { downloadSingleImage } from "../utils/pixivDownload";
import { DownloadIcon, LoadingIcon } from "./Icons";

interface HoverDownloadButtonProps {
  targetImage: HTMLImageElement;
}

const StyledButton = styled("button")`
  position: absolute;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid rgba(255, 255, 255, 0.9);
  cursor: pointer;
  opacity: 0.8;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
  transform: scale(1);

  &:hover:not(:disabled) {
    opacity: 1;
    transform: scale(1.05);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export function HoverDownloadButton({ targetImage }: HoverDownloadButtonProps) {
  const { settings } = usePixivDownloaderSettings();
  const [isDownloading, setIsDownloading] = useState(false);

  // 如果设置禁用了显示按钮,返回 null
  if (!settings.showHoverButton) return null;

  const handleDownload = async (e: Event) => {
    e.preventDefault();
    e.stopPropagation();

    if (isDownloading) return;

    setIsDownloading(true);

    try {
      // 提取作品信息
      const artworkInfo = await extractArtworkInfo();
      if (!artworkInfo) {
        console.error("[Pixiv Downloader] 无法提取作品信息");
        return;
      }

      // 获取图片URL信息
      const imageInfo = await getImageUrlInfo(targetImage, artworkInfo.artworkId);
      if (!imageInfo) {
        console.error("[Pixiv Downloader] 无法获取图片URL信息");
        return;
      }

      // 下载图片
      await downloadSingleImage(imageInfo, artworkInfo, settings);
    } catch (error) {
      console.error("[Pixiv Downloader] 下载失败:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  // 计算按钮位置
  const positionStyle: Record<string, string> = {};
  if (settings.buttonPositionVertical === "top") {
    positionStyle.top = formatPositionValue(settings.buttonPositionVerticalValue);
  } else {
    positionStyle.bottom = formatPositionValue(settings.buttonPositionVerticalValue);
  }
  if (settings.buttonPositionHorizontal === "left") {
    positionStyle.left = formatPositionValue(settings.buttonPositionHorizontalValue);
  } else {
    positionStyle.right = formatPositionValue(settings.buttonPositionHorizontalValue);
  }

  return (
    <StyledButton
      onClick={handleDownload}
      disabled={isDownloading}
      title="下载图片"
      style={positionStyle}
    >
      {isDownloading ? <LoadingIcon /> : <DownloadIcon />}
    </StyledButton>
  );
}
