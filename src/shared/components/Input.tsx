import { useTheme } from "../hooks/useTheme";
import { styled } from "../utils/goober-setup";

interface InputProps {
  type?: "text" | "email" | "password" | "number";
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  className?: string;
  style?: Record<string, string | number>;
}

const StyledInput = styled("input")`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--input-border);
  background: var(--input-bg);
  color: var(--input-text);
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #1da1f2;
  }
`;

export function Input({
  type = "text",
  value,
  defaultValue,
  placeholder,
  disabled = false,
  onChange,
  onBlur,
  onFocus,
  className = "",
  style = {},
}: InputProps) {
  const { theme } = useTheme();

  const inputStyle = {
    "--input-border": theme.inputBorder,
    "--input-bg": theme.inputBackground,
    "--input-text": theme.textColor,
    ...style,
  };

  return (
    <StyledInput
      type={type}
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
      style={inputStyle}
      onChange={(e: Event) => onChange?.((e.currentTarget as HTMLInputElement).value)}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
}
