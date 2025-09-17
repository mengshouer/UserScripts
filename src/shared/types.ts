// 通用类型定义
export interface ThemeConfig {
  panelBackground: string;
  textColor: string;
  secondaryTextColor: string;
  borderColor: string;
  inputBackground: string;
  inputBorder: string;
  buttonBackground: string;
  buttonBorder: string;
  buttonText: string;
}

export interface BaseSettings {
  [key: string]: any;
}

export interface DownloaderSettings extends BaseSettings {
  fileName: string;
  showDownloadButton: boolean;
  // 视频相关设置
  videoFileName: string;
  showVideoDownloadButton: boolean;
}

// 组件通用 props
export interface BaseComponentProps {
  className?: string;
  style?: Record<string, string | number>;
}

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: any;
}

export interface ButtonProps extends BaseComponentProps {
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  children: any;
}