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
  width: 480px;
  max-width: 90vw;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

const Header = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--header-margin);
`;

const Title = styled("h2")`
  margin: 0;
  color: var(--modal-text);
  font-size: 20px;
  font-weight: 600;
`;

const CloseButton = styled("button")`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--secondary-text);
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--border-color);
  }
`;

const Content = styled("div")``;

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
    "--secondary-text": theme.secondaryTextColor,
    "--border-color": theme.borderColor,
    "--header-margin": title ? "20px" : "0",
    ...style,
  };

  return (
    <Overlay onClick={onClose}>
      <ModalContainer
        className={className}
        style={cssVariables}
        onClick={(e) => e.stopPropagation()}
      >
        <Header>
          {title && <Title>{title}</Title>}
          <CloseButton onClick={onClose}>×</CloseButton>
        </Header>
        <Content>{children}</Content>
      </ModalContainer>
    </Overlay>
  );
}
