import { useTheme } from '../hooks/useTheme';

interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  children?: any;
  className?: string;
  style?: Record<string, string | number>;
}

export function Checkbox({
  checked,
  defaultChecked,
  disabled = false,
  onChange,
  children,
  className = '',
  style = {},
}: CheckboxProps) {
  const { theme } = useTheme();

  const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
    color: theme.textColor,
    opacity: disabled ? 0.6 : 1,
    ...style,
  };

  const checkboxStyle = {
    marginRight: '8px',
    accentColor: '#1da1f2',
    cursor: disabled ? 'not-allowed' : 'pointer',
  };

  return (
    <label className={className} style={labelStyle}>
      <input
        type="checkbox"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        style={checkboxStyle}
        onChange={(e) => onChange?.(e.currentTarget.checked)}
      />
      {children}
    </label>
  );
}