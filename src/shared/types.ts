// 统一的类型定义文件
import type { VNode, JSX as PreactJSX } from "preact";

// === JSX 全局类型声明 ===
declare global {
  namespace JSX {
    interface Element extends PreactJSX.Element {}
    interface IntrinsicElements extends PreactJSX.IntrinsicElements {}
    interface ElementChildrenAttribute extends PreactJSX.ElementChildrenAttribute {}
  }
}

// === Goober CSS-in-JS 类型扩展 ===
// 仅在需要时扩展 goober 的现有类型
declare module "goober" {
  // 确保 setup 函数的类型正确
  export function setup(pragma: (type: any, props: any, ...children: any[]) => any): void;
}

// === 主题系统统一类型定义 ===
export interface Theme {
  // 基础颜色
  primary: string;
  secondary: string;
  danger: string;
  background: string;
  text: string;
  border: string;

  // 组件特定颜色
  buttonBackground: string;
  buttonText: string;
  buttonBorder: string;
  modalBackground: string;
  modalOverlay: string;

  // 面板和输入框颜色
  panelBackground: string;
  textColor: string;
  secondaryTextColor: string;
  borderColor: string;
  inputBackground: string;
  inputBorder: string;
}

// === 设置相关类型 ===
export interface BaseSettings {
  readonly [key: string]: unknown;
}

export interface DownloaderSettings extends BaseSettings {
  readonly fileName: string;
  readonly showDownloadButton: boolean;
  readonly videoFileName: string;
  readonly showVideoDownloadButton: boolean;
  readonly showUniversalDownloadButton: boolean;
  readonly autoLikeOnDownload: boolean;
  readonly messagePlacement:
    | "top"
    | "bottom"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
}

// === 组件通用类型 ===
export interface BaseComponentProps {
  readonly className?: string;
  readonly style?: Readonly<Record<string, string | number>>;
  readonly children?: VNode | VNode[] | string | number | null;
}

export interface ModalProps extends BaseComponentProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly title?: string;
}

export interface ButtonProps extends BaseComponentProps {
  readonly onClick?: (event: MouseEvent) => void | Promise<void>;
  readonly disabled?: boolean;
  readonly variant?: "primary" | "secondary" | "danger";
  readonly size?: "small" | "medium" | "large";
  readonly type?: "button" | "submit" | "reset";
}

export interface InputProps extends BaseComponentProps {
  readonly value?: string;
  readonly onChange?: (event: Event & { target: HTMLInputElement }) => void;
  readonly placeholder?: string;
  readonly disabled?: boolean;
  readonly type?: "text" | "password" | "email" | "number" | "url";
}

export interface CheckboxProps extends BaseComponentProps {
  readonly checked?: boolean;
  readonly onChange?: (event: Event & { target: HTMLInputElement }) => void;
  readonly disabled?: boolean;
  readonly label?: string;
}

// === 下载相关类型 ===
export interface DownloadInfo {
  readonly url: string;
  readonly filename: string;
  readonly size?: number;
  readonly type?: string;
}

export interface DownloadButtonProps extends BaseComponentProps {
  readonly onDownload: (event: MouseEvent) => void | Promise<void>;
  readonly isDownloading?: boolean;
  readonly downloadInfo?: DownloadInfo;
}

// === 工具函数类型 ===
export interface StorageManager<T extends BaseSettings> {
  loadSettings(): T;
  saveSettings(settings: Partial<T>): void;
  resetSettings(): void;
}
