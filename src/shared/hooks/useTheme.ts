import { signal, computed } from "@preact/signals-core";
import { getThemeConfig } from "../utils/theme";
import type { Theme } from "../types";

// 主题信号
const themeSignal = signal<Theme>(getThemeConfig());

// 监听系统主题变化
if (window.matchMedia) {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleChange = () => {
    themeSignal.value = getThemeConfig();
  };

  // 兼容不同的浏览器 API
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener("change", handleChange);
  } else if (mediaQuery.addListener) {
    mediaQuery.addListener(handleChange);
  }
}

/**
 * 主题 Hook
 */
export function useTheme() {
  const theme = computed(() => themeSignal.value);

  return {
    // 当前主题配置
    theme: theme.value,

    // 是否为暗色主题
    isDark: computed(() => window.matchMedia?.("(prefers-color-scheme: dark)").matches || false)
      .value,

    // 手动刷新主题（如果需要）
    refreshTheme() {
      themeSignal.value = getThemeConfig();
    },

    // 响应式信号
    signal: themeSignal,
  };
}
