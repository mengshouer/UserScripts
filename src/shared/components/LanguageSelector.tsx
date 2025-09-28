import { useTheme } from "../hooks/useTheme";
import { useI18n } from "../i18n";
import { Select } from "./Select";
import type { Locale } from "../i18n/types";

interface LanguageSelectorProps {
  className?: string;
  style?: {
    [key: string]: string | number;
  };
}

export function LanguageSelector({ className, style }: LanguageSelectorProps) {
  const { theme } = useTheme();
  const { t, locale, setLocale } = useI18n();

  const languages = [
    { value: "zh", label: "中文" },
    { value: "en", label: "English" },
  ];

  return (
    <div
      className={className}
      style={{ display: "flex", alignItems: "center", gap: "8px", ...style }}
    >
      <label
        style={{
          fontSize: "14px",
          fontWeight: 500,
          color: theme.textColor,
          marginBottom: "0",
        }}
      >
        {t("common.language")}:
      </label>
      <Select value={locale} options={languages} onChange={(value) => setLocale(value as Locale)} />
    </div>
  );
}
