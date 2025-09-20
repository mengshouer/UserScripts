import type { ComponentChildren } from "preact";
import { preventEventPropagation } from "../../shared";
import { styled, keyframes } from "../../shared/utils/goober-setup";

interface DownloadButtonProps {
  /** 点击处理函数 */
  onDownload: (e: any) => void | Promise<void>;
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

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StyledButton = styled("button")`
  position: absolute;
  z-index: var(--z-index, 1000);
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--width, 36px);
  height: var(--height, 36px);
  border-radius: var(--border-radius, 50%);
  background: var(--background, rgba(0, 0, 0, 0.8));
  border: var(--border, 2px solid rgba(255, 255, 255, 0.9));
  cursor: var(--cursor);
  opacity: var(--opacity);
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
  transform: var(--transform);

  top: var(--top);
  right: var(--right);
  bottom: var(--bottom);
  left: var(--left);

  &:hover:not(:disabled) {
    opacity: 1;
    transform: var(--hover-transform);
  }
`;

const DownloadIcon = styled("svg")`
  width: var(--icon-width, 20px);
  height: var(--icon-height, 20px);
  fill: var(--icon-color, white);
`;

const LoadingIcon = styled("svg")`
  width: var(--icon-width, 18px);
  height: var(--icon-height, 18px);
  animation: ${spin} 1s linear infinite;
  fill: none;
  color: var(--icon-color, white);
`;

const defaultDownloadIcon: ComponentChildren = (
  <DownloadIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
  </DownloadIcon>
);

const defaultLoadingIcon: ComponentChildren = (
  <LoadingIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
      fill="none"
      strokeDasharray="31.416"
      strokeDashoffset="15.708"
    />
  </LoadingIcon>
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

  const handleClick = async (e: any) => {
    preventEventPropagation(e);
    if (isDisabled) return;
    await onDownload(e);
  };

  // 将 CSS 属性名转换为对应的 CSS 变量名
  const convertStyleToCSSVars = (styles: Record<string, string | number>) => {
    const cssVars: Record<string, string | number> = {};

    for (const [key, value] of Object.entries(styles)) {
      // 将驼峰命名转换为 kebab-case，然后作为 CSS 变量
      const cssVarName = `--${key.replace(/[A-Z]/g, "-$&").toLowerCase()}`;
      cssVars[cssVarName] = value;
    }

    return cssVars;
  };

  const buttonStyle = {
    // 功能性 CSS 变量
    "--cursor": isDisabled ? "not-allowed" : "pointer",
    "--opacity": isDownloading ? "0.5" : "0.8",
    "--transform": isDownloading ? "scale(0.95)" : "scale(1)",
    "--hover-transform": isDownloading ? "scale(0.95)" : "scale(1.05)",
    ...(!style.top && !style.bottom && { "--bottom": "8px" }),
    ...(!style.right && !style.left && { "--right": "8px" }),
    ...convertStyleToCSSVars(style),
  };

  return (
    <StyledButton
      className={className}
      style={buttonStyle}
      onClick={handleClick}
      onMouseDown={(e: Event) => {
        e.preventDefault();
        return false;
      }}
      title={title}
      disabled={isDisabled}
    >
      {isDownloading ? loadingIcon : icon}
    </StyledButton>
  );
}
