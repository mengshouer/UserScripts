import { useState, useEffect } from "preact/hooks";
import { i18n } from "../core";
import type { Locale } from "../types";

export interface UseI18nReturn {
  t: (key: string, fallback?: string) => string;
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export function useI18n(): UseI18nReturn {
  const [locale, setLocaleState] = useState<Locale>(i18n.getLocale());

  useEffect(() => {
    const unsubscribe = i18n.subscribe(() => {
      setLocaleState(i18n.getLocale());
    });

    return unsubscribe;
  }, []);

  const setLocale = (newLocale: Locale) => i18n.setLocale(newLocale);
  const t = (key: string, fallback?: string) => i18n.t(key, fallback);

  return { t, locale, setLocale };
}
