export type Locale = "zh" | "en";

export interface LocaleData {
  [key: string]: string | LocaleData;
}

// 简化类型定义，直接使用字符串
export type TranslationKey = string;
