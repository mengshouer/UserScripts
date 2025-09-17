import { useState } from "preact/hooks";
import { useTheme } from "../../shared";

interface StyleEditorProps {
  value: Record<string, string | number>;
  onChange: (value: Record<string, string | number>) => void;
  placeholder?: string;
}

export function StyleEditor({ value, onChange, placeholder }: StyleEditorProps) {
  const { theme } = useTheme();
  const [error, setError] = useState<string>("");

  // 将对象转为格式化的 JSON 字符串
  const objectToJson = (obj: Record<string, string | number>) => {
    return JSON.stringify(obj, null, 2);
  };

  // 将 JSON 字符串转为对象
  const jsonToObject = (jsonStr: string) => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
        return parsed;
      }
      throw new Error("必须是对象格式");
    } catch (e) {
      throw new Error("JSON 格式错误");
    }
  };

  const handleChange = (e: Event) => {
    const jsonStr = (e.target as HTMLTextAreaElement).value;

    if (!jsonStr.trim()) {
      setError("");
      onChange({});
      return;
    }

    try {
      const parsed = jsonToObject(jsonStr);
      setError("");
      onChange(parsed);
    } catch (e) {
      setError(e instanceof Error ? e.message : "格式错误");
    }
  };

  const textareaStyle = {
    width: "100%",
    padding: "8px 12px",
    border: error ? "1px solid #dc3545" : `1px solid ${theme.inputBorder}`,
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

  return (
    <div>
      <textarea
        style={textareaStyle}
        value={objectToJson(value)}
        onChange={handleChange}
        placeholder={placeholder || '{\n  "top": "8px",\n  "right": "8px"\n}'}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "#1da1f2";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = error ? "#dc3545" : theme.inputBorder;
        }}
      />
      {error && (
        <div style={errorStyle}>
          {error}
        </div>
      )}
    </div>
  );
}