import { i18n } from "../../shared/i18n/core";
import { zhTranslations as sharedZh } from "../../shared/i18n/locales/zh";
import { enTranslations as sharedEn } from "../../shared/i18n/locales/en";
import { zhTranslations as pixivZh } from "./zh";
import { enTranslations as pixivEn } from "./en";

// 先添加 shared 翻译，再添加脚本特定翻译（利用 deepMerge 正确合并）
i18n.addTranslations("zh", sharedZh);
i18n.addTranslations("zh", pixivZh);
i18n.addTranslations("en", sharedEn);
i18n.addTranslations("en", pixivEn);

// 重新导出 shared i18n 的所有功能
export * from "../../shared/i18n";
