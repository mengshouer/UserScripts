import { useTheme } from "../hooks/useTheme";
import { styled } from "../utils/goober-setup";

interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  children?: any;
  className?: string;
  style?: Record<string, string | number>;
}

const Label = styled("label")`
  display: flex;
  align-items: center;
  cursor: var(--cursor);
  color: var(--text-color);
  opacity: var(--opacity);
`;

const CheckboxInput = styled("input")`
  margin-right: 8px;
  accent-color: #1da1f2;
  cursor: var(--cursor);
`;

export function Checkbox({
  checked,
  defaultChecked,
  disabled = false,
  onChange,
  children,
  className = "",
  style = {},
}: CheckboxProps) {
  const { theme } = useTheme();

  const checkboxStyle = {
    "--cursor": disabled ? "not-allowed" : "pointer",
    "--text-color": theme.textColor,
    "--opacity": disabled ? "0.6" : "1",
    ...style,
  };

  return (
    <Label className={className} style={checkboxStyle}>
      <CheckboxInput
        type="checkbox"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={(e: Event) => onChange?.((e.currentTarget as HTMLInputElement).checked)}
        style={{ "--cursor": disabled ? "not-allowed" : "pointer" }}
      />
      {children}
    </Label>
  );
}
