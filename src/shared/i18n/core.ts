import type { Locale, LocaleData } from "./types";

const DEFAULT_LOCALE: Locale = "en";
const STORAGE_KEY = "userscript-locale";

let currentLocale: Locale = DEFAULT_LOCALE;
let translations: Record<Locale, LocaleData> = {} as Record<Locale, LocaleData>;
let listeners: Array<() => void> = [];

// 初始化语言检测
const detectBrowserLocale = (): Locale =>
  navigator?.language?.toLowerCase().startsWith("zh") ? "zh" : "en";

try {
  currentLocale = (localStorage.getItem(STORAGE_KEY) as Locale | null) || detectBrowserLocale();
} catch {
  currentLocale = detectBrowserLocale();
}

// 工具函数
const getNestedValue = (obj: any, path: string): string | undefined => {
  let result = obj;
  for (const key of path.split(".")) {
    result = result?.[key];
    if (!result) return undefined;
  }
  return typeof result === "string" ? result : undefined;
};

const interpolate = (template: string, params?: Record<string, any>): string => {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_, key) => params[key] ?? "{" + key + "}");
};

// 翻译函数
function t(key: string, params?: Record<string, any>): string;
function t(options: { key: string; params?: Record<string, any> }): string;
function t(
  keyOrOptions: string | { key: string; params?: Record<string, any> },
  params?: Record<string, any>,
): string {
  const key = typeof keyOrOptions === "string" ? keyOrOptions : keyOrOptions.key;
  const actualParams = typeof keyOrOptions === "string" ? params : keyOrOptions.params;

  const text =
    getNestedValue(translations[currentLocale], key) ||
    getNestedValue(translations[DEFAULT_LOCALE], key) ||
    key;

  return interpolate(text, actualParams);
}

export const i18n = {
  addTranslations(locale: Locale, data: LocaleData): void {
    translations[locale] = Object.assign(translations[locale] || {}, data);
  },

  setLocale(locale: Locale): void {
    if (currentLocale !== locale) {
      currentLocale = locale;
      try {
        localStorage.setItem(STORAGE_KEY, locale);
      } catch {}
      listeners.forEach((callback) => callback());
    }
  },

  getLocale(): Locale {
    return currentLocale;
  },

  t,

  subscribe(callback: () => void): () => void {
    listeners.push(callback);
    return () => {
      const index = listeners.indexOf(callback);
      if (index > -1) listeners.splice(index, 1);
    };
  },
};
