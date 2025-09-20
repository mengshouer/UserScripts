import type { Theme } from "../types";
import { createThemeFromConfig } from "./goober-setup";

/**
 * 检测是否为暗色主题
 */
export function isDarkMode(): boolean {
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches || false;
}

/**
 * 获取完整的主题配置
 */
export function getThemeConfig(): Theme {
  const isDark = isDarkMode();

  const baseConfig = {
    panelBackground: isDark ? "#1e1e1e" : "white",
    textColor: isDark ? "#e1e8ed" : "#333",
    secondaryTextColor: isDark ? "#8b98a5" : "#666",
    borderColor: isDark ? "#38444d" : "#ddd",
    inputBackground: isDark ? "#253341" : "white",
    inputBorder: isDark ? "#38444d" : "#ddd",
    buttonBackground: isDark ? "#2f3336" : "#f7f9fa",
    buttonBorder: isDark ? "#545659" : "#ddd",
    buttonText: isDark ? "#e1e8ed" : "#333",
  };

  return createThemeFromConfig(baseConfig);
}

/**
 * 获取 CSS 变量对象
 */
export function getThemeCSSVariables(theme: Theme): Record<string, string> {
  return {
    "--theme-primary": theme.primary,
    "--theme-secondary": theme.secondary,
    "--theme-danger": theme.danger,
    "--theme-background": theme.background,
    "--theme-text": theme.text,
    "--theme-border": theme.border,
    "--theme-button-bg": theme.buttonBackground,
    "--theme-button-text": theme.buttonText,
    "--theme-button-border": theme.buttonBorder,
    "--theme-modal-bg": theme.modalBackground,
    "--theme-modal-overlay": theme.modalOverlay,
    "--theme-input-bg": theme.inputBackground,
    "--theme-input-border": theme.inputBorder,
  };
}
