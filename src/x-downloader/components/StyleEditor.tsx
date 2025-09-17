import { useState } from "preact/hooks";
import { useTheme, styled } from "../../shared";

interface StyleEditorProps {
  value: Record<string, string | number>;
  onChange: (value: Record<string, string | number>) => void;
  placeholder?: string;
}

const StyledTextarea = styled("textarea")`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  background: var(--input-bg);
  color: var(--input-text);
  border-radius: 6px;
  font-size: 14px;
  font-family: monospace;
  min-height: 100px;
  resize: vertical;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #1da1f2;
  }

  &.error {
    border-color: #dc3545;
  }
`;

const ErrorText = styled("div")`
  margin-top: 4px;
  font-size: 12px;
  color: #dc3545;
`;

export function StyleEditor({ value, onChange }: StyleEditorProps) {
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
      if (
        typeof parsed === "object" &&
        parsed !== null &&
        !Array.isArray(parsed)
      ) {
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

  const themeVariables = {
    "--border-color": error ? "#dc3545" : theme.inputBorder,
    "--input-bg": theme.inputBackground,
    "--input-text": theme.textColor,
  };

  return (
    <div>
      <StyledTextarea
        style={themeVariables}
        className={error ? "error" : ""}
        value={objectToJson(value)}
        onChange={handleChange}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}
