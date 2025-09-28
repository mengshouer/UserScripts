import type { ButtonProps } from "../types";
import { useTheme, type ThemeConfig } from "../hooks/useTheme";
import { styled } from "../utils/goober-setup";

const StyledButton = styled("button")`
  /* Base styles */
  border-radius: 6px;
  font-weight: 500;
  outline: none;
  transition: all 0.2s ease;
  border: none;
  cursor: var(--cursor);
  opacity: var(--opacity);

  /* Size variants */
  padding: var(--padding);
  font-size: var(--font-size);

  /* Color variants */
  background: var(--bg);
  color: var(--color);
  border: var(--border);

  /* Hover effects */
  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

type ButtonVariantStyle = Record<string, string>;

const buttonVariants: Record<
  Exclude<ButtonProps["variant"], undefined>,
  ButtonVariantStyle | ((theme: ThemeConfig) => ButtonVariantStyle)
> = {
  primary: {
    "--bg": "#1da1f2",
    "--color": "white",
    "--border": "none",
  },
  secondary: (theme: ThemeConfig): ButtonVariantStyle => ({
    "--bg": theme.inputBackground,
    "--color": theme.textColor,
    "--border": `1px solid ${theme.borderColor}`,
  }),
  danger: {
    "--bg": "#dc3545",
    "--color": "white",
    "--border": "none",
  },
};

const buttonSizes: Record<Exclude<ButtonProps["size"], undefined>, ButtonVariantStyle> = {
  small: {
    "--padding": "6px 12px",
    "--font-size": "12px",
  },
  medium: {
    "--padding": "8px 16px",
    "--font-size": "14px",
  },
  large: {
    "--padding": "12px 24px",
    "--font-size": "16px",
  },
};

export function Button({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  size = "medium",
  className = "",
  style = {},
  type = "button",
}: ButtonProps) {
  const { theme } = useTheme();

  const variantStyles = (() => {
    const variantConfig = buttonVariants[variant];
    return typeof variantConfig === "function" ? variantConfig(theme) : variantConfig;
  })();

  const buttonStyle: Record<string, string | number> = {
    ...variantStyles,
    ...buttonSizes[size],
    "--cursor": disabled ? "not-allowed" : "pointer",
    "--opacity": disabled ? "0.6" : "1",
    ...style,
  };

  return (
    <StyledButton
      className={className}
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </StyledButton>
  );
}
