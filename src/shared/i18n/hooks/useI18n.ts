import { useState, useEffect } from "preact/hooks";
import { i18n } from "../core";
import type { Locale } from "../types";

export interface UseI18nReturn {
  t: typeof i18n.t;
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

  return { t: i18n.t, locale, setLocale };
}
