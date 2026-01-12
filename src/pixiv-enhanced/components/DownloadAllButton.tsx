import { useState } from "preact/hooks";
import { styled } from "../../shared/utils/goober-setup";
import { message } from "../../shared";
import { usePixivDownloaderSettings } from "../hooks/usePixivDownloaderSettings";
import { getAllImageUrls } from "../utils/pixivParser";
import { downloadAllImages } from "../utils/pixivDownload";
import { useI18n } from "../i18n";
import { DownloadIcon } from "./Icons";
import type { PixivArtworkInfo } from "../types";

interface DownloadAllButtonProps {
  artworkInfo: PixivArtworkInfo;
  isVisible: boolean;
  onDownloadingChange?: (isDownloading: boolean) => void;
}

const StyledButton = styled("button")`
  position: fixed;
  left: var(--left-position);
  bottom: 68px;
  height: 40px;
  padding: 0 16px;
  background-color: #0096fa;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  z-index: 10000;
  color: white;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  transition:
    left 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    opacity 0.2s ease,
    transform 0.2s ease;
  opacity: 0.9;
  border: none;

  &:hover:not(:disabled) {
    opacity: 1;
    transform: scale(1.02);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }
`;

export function DownloadAllButton({
  artworkInfo,
  isVisible,
  onDownloadingChange,
}: DownloadAllButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const { settings } = usePixivDownloaderSettings();
  const { t } = useI18n();

  const handleDownload = async (e: Event) => {
    e.preventDefault();
    e.stopPropagation();

    if (isDownloading) return;

    setIsDownloading(true);
    onDownloadingChange?.(true);
    setProgress({ current: 0, total: 0 });

    try {
      const imageUrls = await getAllImageUrls(artworkInfo);
      if (imageUrls.length === 0) return;

      const result = await downloadAllImages(imageUrls, artworkInfo, settings, (current, total) => {
        setProgress({ current, total });
      });

      if (result.failed.length > 0) {
        const firstFailed = result.failed[0];
        message.error(
          t("ui.downloadFailed", { count: result.failed.length }),
          undefined,
          undefined,
          () => {
            const img = document.querySelector(
              `img[src*="i.pximg.net/img-master"][src*="_p${firstFailed?.pageIndex}"]`,
            );
            img?.scrollIntoView({ behavior: "smooth", block: "center" });
          },
        );
      } else {
        message.success(t("ui.downloadComplete", { count: imageUrls.length }));
      }
    } finally {
      setIsDownloading(false);
      onDownloadingChange?.(false);
      setProgress({ current: 0, total: 0 });
    }
  };

  const buttonText = isDownloading
    ? `${t("ui.downloading")} ${progress.current}/${progress.total}`
    : `${t("ui.downloadAll")} (${artworkInfo.pageCount})`;

  const buttonStyle = {
    "--left-position": isVisible ? "10px" : "-200px",
  };

  return (
    <StyledButton
      style={buttonStyle}
      onClick={handleDownload}
      disabled={isDownloading}
      title={t("ui.downloadAllTitle")}
    >
      <DownloadIcon />
      <span>{buttonText}</span>
    </StyledButton>
  );
}
