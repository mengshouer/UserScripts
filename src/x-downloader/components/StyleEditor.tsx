import { useState } from "preact/hooks";
import { useTheme } from "../../shared";

interface StyleEditorProps {
  value: Record<string, string | number>;
  onChange: (value: Record<string, string | number>) => void;
  placeholder?: string;
}

export function StyleEditor({ value, onChange }: StyleEditorProps) {
  const { theme } = useTheme();
  const [error, setError] = useState<string>("");

  const handleChange = (e: Event) => {
    const jsonStr = (e.target as HTMLTextAreaElement).value;

    if (!jsonStr.trim()) {
      setError("");
      onChange({});
      return;
    }

    try {
      const parsed = JSON.parse(jsonStr);
      if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
        setError("");
        onChange(parsed);
      } else {
        setError("必须是对象格式");
      }
    } catch {
      setError("JSON 格式错误");
    }
  };

  // 内联样式替代 styled 组件
  const textareaStyle = {
    width: "100%",
    padding: "8px 12px",
    border: `1px solid ${error ? "#dc3545" : theme.inputBorder}`,
    background: theme.inputBackground,
    color: theme.textColor,
    borderRadius: "6px",
    fontSize: "14px",
    fontFamily: "monospace",
    minHeight: "100px",
    resize: "vertical" as const,
    boxSizing: "border-box" as const,
    outline: "none",
    transition: "border-color 0.2s ease",
  };

  const errorStyle = {
    marginTop: "4px",
    fontSize: "12px",
    color: "#dc3545",
  };

  // 悬停效果处理
  const handleFocus = (e: Event) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.borderColor = "#1da1f2";
  };

  const handleBlur = (e: Event) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.borderColor = error ? "#dc3545" : theme.inputBorder;
  };

  return (
    <div>
      <textarea
        style={textareaStyle}
        value={JSON.stringify(value, null, 2)}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {error && <div style={errorStyle}>{error}</div>}
    </div>
  );
}
