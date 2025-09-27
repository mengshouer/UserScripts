import { i18n } from "../../shared/i18n/core";
import { zhTranslations as sharedZh } from "../../shared/i18n/locales/zh";
import { enTranslations as sharedEn } from "../../shared/i18n/locales/en";
import { zhTranslations as xDownloaderZh } from "./zh";
import { enTranslations as xDownloaderEn } from "./en";

// 注册所有翻译
i18n.addTranslations("zh", { ...sharedZh, ...xDownloaderZh });
i18n.addTranslations("en", { ...sharedEn, ...xDownloaderEn });

export * from "../../shared/i18n";
