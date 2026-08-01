import { useEffect } from "preact/hooks";
import { ModalProps } from "../types";
import { useTheme } from "../hooks/useTheme";
import { styled } from "../utils/goober-setup";

const Overlay = styled("div")`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10001;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled("div")`
  background: var(--modal-bg);
  color: var(--modal-text);
  border-radius: 12px;
  padding: 24px;
  min-width: 480px;
  width: auto;
  max-width: 50vw;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  @media (max-width: 640px) {
    min-width: auto;
    width: 90vw;
  }
`;

export function Modal({
  isOpen,
  onClose,
  title,
  headerActions,
  children,
  className = "",
  style = {},
}: ModalProps) {
  const { theme } = useTheme();

  // ESC 键关闭模态框
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // 使用 CSS 变量传递主题值
  const cssVariables = {
    "--modal-bg": theme.panelBackground,
    "--modal-text": theme.textColor,
    ...style,
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: title || headerActions ? "20px" : "0",
  };

  const titleStyle = {
    margin: 0,
    color: theme.textColor,
    fontSize: "20px",
    fontWeight: 600,
  };

  const closeButtonStyle = {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: theme.secondaryTextColor,
    padding: 0,
    width: "30px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    transition: "background-color 0.2s ease",
  };

  return (
    <Overlay onClick={onClose}>
      <ModalContainer
        className={className}
        style={cssVariables}
        onClick={(e: Event) => e.stopPropagation()}
      >
        <div style={headerStyle}>
          {title && <h2 style={titleStyle}>{title}</h2>}
          {/* 与关闭按钮归为一组，否则 space-between 会把 headerActions 挤到中间 */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
            {headerActions}
            <button
              style={closeButtonStyle}
              onClick={onClose}
              onMouseEnter={(e: Event) => {
                const target = e.currentTarget as HTMLElement;
                target.style.backgroundColor = theme.borderColor;
              }}
              onMouseLeave={(e: Event) => {
                const target = e.currentTarget as HTMLElement;
                target.style.backgroundColor = "transparent";
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
        </div>
        <div>{children}</div>
      </ModalContainer>
    </Overlay>
  );
}
