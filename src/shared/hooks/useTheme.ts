import { useState, useEffect } from "preact/hooks";

// 主题配置接口
export interface ThemeConfig {
  textColor: string;
  backgroundColor: string;
  borderColor: string;
  secondaryTextColor: string;
  inputBackground: string;
  inputBorder: string;
  panelBackground: string;
}

// 获取主题配置
function getThemeConfig(isDark: boolean): ThemeConfig {
  return {
    textColor: isDark ? "#e1e8ed" : "#333",
    backgroundColor: isDark ? "#1e1e1e" : "white",
    borderColor: isDark ? "#38444d" : "#ddd",
    secondaryTextColor: isDark ? "#8b98a5" : "#666",
    inputBackground: isDark ? "#253341" : "white",
    inputBorder: isDark ? "#38444d" : "#ddd",
    panelBackground: isDark ? "#1e1e1e" : "white",
  };
}

/**
 * 主题 Hook
 */
export function useTheme() {
  const [isDark, setIsDark] = useState(
    () => window.matchMedia?.("(prefers-color-scheme: dark)").matches || false,
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);

    if (media.addEventListener) {
      media.addEventListener("change", handler);
      return () => media.removeEventListener("change", handler);
    } else if (media.addListener) {
      media.addListener(handler);
      return () => media.removeListener?.(handler);
    }

    // 确保所有代码路径都有返回值
    return undefined;
  }, []);

  return {
    theme: getThemeConfig(isDark),
    isDark,
  };
}
