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
  max-width: 90vw;
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
    marginBottom: title ? "20px" : "0",
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
    fontSize: "24px",
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
          <button
            style={closeButtonStyle}
            onClick={onClose}
            onMouseEnter={(e: Event) => {
              const target = e.target as HTMLElement;
              target.style.backgroundColor = theme.borderColor;
            }}
            onMouseLeave={(e: Event) => {
              const target = e.target as HTMLElement;
              target.style.backgroundColor = "transparent";
            }}
          >
            ×
          </button>
        </div>
        <div>{children}</div>
      </ModalContainer>
    </Overlay>
  );
}
