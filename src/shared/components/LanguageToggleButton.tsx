import { useI18n } from "../i18n";
import type { Locale } from "../i18n/types";
import { Button } from "./Button";

// 新增语言时这两个 Record 会因缺键而编译报错，提醒重新评估按钮式切换
const NEXT_LOCALE: Record<Locale, Locale> = {
  zh: "en",
  en: "zh",
};

const LOCALE_LABELS: Record<Locale, string> = {
  zh: "中文",
  en: "English",
};

/** 标签显示的是「点下去会切到的语言」，故不需要 i18n——语言名本身与语境无关 */
export function LanguageToggleButton() {
  const { locale, setLocale } = useI18n();
  const nextLocale = NEXT_LOCALE[locale];

  return (
    <Button variant="secondary" size="small" onClick={() => setLocale(nextLocale)}>
      {`🌐 ${LOCALE_LABELS[nextLocale]}`}
    </Button>
  );
}
