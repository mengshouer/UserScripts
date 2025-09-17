import { ThemeConfig } from '../types';

/**
 * 检测是否为暗色主题
 */
export function isDarkMode(): boolean {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches || false;
}

/**
 * 获取主题配置
 */
export function getThemeConfig(): ThemeConfig {
  const isDark = isDarkMode();

  return {
    panelBackground: isDark ? '#1e1e1e' : 'white',
    textColor: isDark ? '#e1e8ed' : '#333',
    secondaryTextColor: isDark ? '#8b98a5' : '#666',
    borderColor: isDark ? '#38444d' : '#ddd',
    inputBackground: isDark ? '#253341' : 'white',
    inputBorder: isDark ? '#38444d' : '#ddd',
    buttonBackground: isDark ? '#2f3336' : '#f7f9fa',
    buttonBorder: isDark ? '#545659' : '#ddd',
    buttonText: isDark ? '#e1e8ed' : '#333',
  };
}