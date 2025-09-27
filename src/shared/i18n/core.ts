import type { Locale, LocaleData } from "./types";

const DEFAULT_LOCALE: Locale = "zh";

class I18n {
  private currentLocale: Locale = DEFAULT_LOCALE;
  private translations: Record<Locale, LocaleData> = {} as Record<Locale, LocaleData>;
  private listeners: Set<() => void> = new Set();

  constructor() {
    // 从构建时环境变量或浏览器语言检测默认语言
    this.currentLocale = this.detectLocale();
  }

  private detectLocale(): Locale {
    return typeof navigator !== "undefined" && navigator.language.toLowerCase().startsWith("zh")
      ? "zh"
      : "en";
  }

  addTranslations(locale: Locale, translations: LocaleData): void {
    this.translations[locale] = { ...this.translations[locale], ...translations };
  }

  setLocale(locale: Locale): void {
    if (this.currentLocale !== locale) {
      this.currentLocale = locale;
      this.notifyListeners();
    }
  }

  getLocale(): Locale {
    return this.currentLocale;
  }

  t(key: string, fallback?: string): string {
    const translation = this.getNestedValue(this.translations[this.currentLocale], key);

    if (typeof translation === "string") {
      return translation;
    }

    // 回退到默认语言
    if (this.currentLocale !== DEFAULT_LOCALE) {
      const defaultTranslation = this.getNestedValue(this.translations[DEFAULT_LOCALE], key);
      if (typeof defaultTranslation === "string") {
        return defaultTranslation;
      }
    }

    // 返回 fallback 或 key 本身
    return fallback || key;
  }

  private getNestedValue(
    obj: LocaleData | undefined,
    path: string,
  ): string | LocaleData | undefined {
    if (!obj) return undefined;

    return path.split(".").reduce((current: any, key) => current?.[key], obj);
  }

  subscribe(callback: () => void): () => void {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach((callback) => callback());
  }
}

// 创建全局单例实例
export const i18n = new I18n();
