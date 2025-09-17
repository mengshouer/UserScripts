import { useTheme } from '../hooks/useTheme';

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number';
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

export function Input({
  type = 'text',
  value,
  defaultValue,
  placeholder,
  disabled = false,
  onChange,
  onBlur,
  onFocus,
  className = '',
  style = {},
}: InputProps) {
  const { theme } = useTheme();

  const inputStyle = {
    width: '100%',
    padding: '8px 12px',
    border: `1px solid ${theme.inputBorder}`,
    background: theme.inputBackground,
    color: theme.textColor,
    borderRadius: '6px',
    fontSize: '14px',
    boxSizing: 'border-box' as const,
    outline: 'none',
    transition: 'border-color 0.2s ease',
    ...style,
  };

  return (
    <input
      type={type}
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
      style={inputStyle}
      onChange={(e) => onChange?.(e.currentTarget.value)}
      onBlur={onBlur}
      onFocus={onFocus}
      onFocusCapture={(e) => {
        e.currentTarget.style.borderColor = '#1da1f2';
      }}
      onBlurCapture={(e) => {
        e.currentTarget.style.borderColor = theme.inputBorder;
      }}
    />
  );
}