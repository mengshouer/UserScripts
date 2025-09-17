import { setup } from "goober";
import { h } from "preact";

// 配置 goober 使用 Preact 的 createElement 函数
setup(h);

// 导出常用的 goober 工具
export { styled, css, keyframes, glob } from "goober";

// 为主题系统提供的类型定义
export interface Theme {
  primary: string;
  secondary: string;
  danger: string;
  background: string;
  text: string;
  border: string;
  buttonBackground: string;
  buttonText: string;
  buttonBorder: string;
  modalBackground: string;
  modalOverlay: string;
}

// 主题上下文的辅助函数
export const createThemeProps = (theme: Theme) => ({ theme });
