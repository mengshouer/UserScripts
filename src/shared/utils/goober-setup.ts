import { setup } from "goober";
import { h } from "preact";
import type { Theme } from "../../types";

// 配置 goober 使用 Preact 的 createElement 函数
setup(h);

// 导出常用的 goober 工具
export { styled, css, keyframes, glob } from "goober";

// 导出统一的主题类型
export type { Theme };

// 主题上下文的辅助函数
export const createThemeProps = (theme: Theme): { theme: Theme } => ({ theme });

// 主题转换工具函数 - 将基础配置转换为完整的 Theme
export const createThemeFromConfig = (config: {
  panelBackground: string;
  textColor: string;
  secondaryTextColor: string;
  borderColor: string;
  inputBackground: string;
  inputBorder: string;
  buttonBackground: string;
  buttonBorder: string;
  buttonText: string;
}): Theme => ({
  // 基础颜色映射
  primary: "#1da1f2",
  secondary: config.secondaryTextColor,
  danger: "#f91880",
  background: config.panelBackground,
  text: config.textColor,
  border: config.borderColor,

  // 组件特定颜色
  buttonBackground: config.buttonBackground,
  buttonText: config.buttonText,
  buttonBorder: config.buttonBorder,
  modalBackground: config.panelBackground,
  modalOverlay: "rgba(0, 0, 0, 0.6)",

  // 兼容字段
  panelBackground: config.panelBackground,
  textColor: config.textColor,
  secondaryTextColor: config.secondaryTextColor,
  borderColor: config.borderColor,
  inputBackground: config.inputBackground,
  inputBorder: config.inputBorder,
});
