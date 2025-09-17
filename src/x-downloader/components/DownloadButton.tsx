import type { ComponentChildren } from "preact";
import { preventEventPropagation } from "../../shared";

interface DownloadButtonProps {
  /** 点击处理函数 */
  onDownload: (e: MouseEvent) => void | Promise<void>;
  /** 按钮提示文本 */
  title: string;
  /** 是否正在下载 */
  isDownloading?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义图标 */
  icon?: ComponentChildren;
  /** 加载状态的图标 */
  loadingIcon?: ComponentChildren;
  /** 额外的样式覆盖 */
  style?: Record<string, string | number>;
  /** 额外的 CSS 类名 */
  className?: string;
}

const defaultDownloadIcon = (
  <svg
    style={{ width: "20px", height: "20px" }}
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
    viewBox="0 0 24 24"
  >
    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
  </svg>
);

const defaultLoadingIcon = (
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
);

export function DownloadButton({
  onDownload,
  title,
  isDownloading = false,
  disabled = false,
  icon = defaultDownloadIcon,
  loadingIcon = defaultLoadingIcon,
  style = {},
  className = "",
}: DownloadButtonProps) {
  const isDisabled = disabled || isDownloading;

  const handleClick = async (e: MouseEvent) => {
    preventEventPropagation(e);
    if (isDisabled) return;
    await onDownload(e);
  };

  const baseStyle: Record<string, string | number> = {
    position: "absolute",
    ...(!style.bottom && !style.top && { top: "8px" }),
    ...(!style.right && !style.left && { right: "8px" }),
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "rgba(0, 0, 0, 0.8)",
    border: "2px solid rgba(255, 255, 255, 0.9)",
    cursor: isDisabled ? "not-allowed" : "pointer",
    opacity: isDownloading ? 0.5 : 0.8,
    transition: "opacity 0.2s ease, transform 0.2s ease",
    transform: isDownloading ? "scale(0.95)" : "scale(1)",
    ...style,
  };

  return (
    <>
      <button
        className={className}
        style={baseStyle}
        onClick={handleClick}
        onMouseDown={(e) => {
          e.preventDefault();
          return false;
        }}
        onMouseEnter={(e) => {
          if (!isDisabled) {
            e.currentTarget.style.opacity = "1";
            if (!isDownloading) {
              e.currentTarget.style.transform = "scale(1.05)";
            }
          }
        }}
        onMouseLeave={(e) => {
          if (!isDisabled) {
            e.currentTarget.style.opacity = isDownloading ? "0.5" : "0.8";
            if (!isDownloading) {
              e.currentTarget.style.transform = "scale(1)";
            }
          }
        }}
        title={title}
        disabled={isDisabled}
      >
        {isDownloading ? loadingIcon : icon}
      </button>
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
    </>
  );
}
