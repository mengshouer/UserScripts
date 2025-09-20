import { ButtonProps } from "../types";
import { useTheme } from "../hooks/useTheme";
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

const buttonVariants = {
  primary: {
    "--bg": "#1da1f2",
    "--color": "white",
    "--border": "none",
  },
  secondary: (theme: any) => ({
    "--bg": theme.buttonBackground,
    "--color": theme.buttonText,
    "--border": `1px solid ${theme.buttonBorder}`,
  }),
  danger: {
    "--bg": "#dc3545",
    "--color": "white",
    "--border": "none",
  },
};

const buttonSizes = {
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
}: ButtonProps) {
  const { theme } = useTheme();

  const variantStyles =
    variant === "secondary" ? buttonVariants.secondary(theme) : buttonVariants[variant];

  const buttonStyle = {
    ...variantStyles,
    ...buttonSizes[size],
    "--cursor": disabled ? "not-allowed" : "pointer",
    "--opacity": disabled ? "0.6" : "1",
    ...style,
  };

  return (
    <StyledButton className={className} style={buttonStyle} onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
}
