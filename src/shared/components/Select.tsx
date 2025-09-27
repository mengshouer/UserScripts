import { useTheme } from "../hooks/useTheme";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  style?: {
    [key: string]: string | number;
  };
}

export function Select({ value, options, onChange, placeholder, className, style }: SelectProps) {
  const { theme } = useTheme();

  const selectStyle = {
    padding: "6px 8px",
    borderRadius: "4px",
    border: `1px solid ${theme.borderColor}`,
    backgroundColor: theme.backgroundColor,
    color: theme.textColor,
    fontSize: "14px",
    cursor: "pointer",
    outline: "none",
    ...style,
  };

  const handleChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    onChange(target.value);
  };

  return (
    <select value={value} onChange={handleChange} className={className} style={selectStyle}>
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
