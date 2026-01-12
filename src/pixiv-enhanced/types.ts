/**
 * Pixiv Downloader 类型定义
 */

import type { BaseSettings } from "../shared/types";
import type { MessagePlacement } from "../shared/components/MessagePlacementSelector";

// GM 类型声明已移至 src/shared/types.ts

/**
 * Pixiv 作品信息
 */
export interface PixivArtworkInfo {
  /** 作品ID */
  artworkId: string;
  /** 作者ID */
  authorId: string;
  /** 作者名称 */
  authorName: string;
  /** 作品标题 */
  artworkTitle: string;
  /** 图片总数 */
  pageCount: number;
  /** 当前页码 (1-based) */
  currentPage: number;
}

/**
 * 图片URL信息
 */
export interface ImageUrlInfo {
  /** 原图URL */
  originalUrl: string;
  /** 预览图URL */
  previewUrl: string;
  /** 文件扩展名 (png/jpg/gif) */
  extension: string;
  /** 图片序号 (0-based) */
  pageIndex: number;
}

/**
 * 按钮位置
 */
export type ButtonPosition = "top" | "bottom" | "left" | "right";

/**
 * Pixiv Downloader 设置
 */
export interface PixivDownloaderSettings extends BaseSettings {
  /** 文件命名模板 */
  readonly fileName: string;
  /** 显示悬停按钮 */
  readonly showHoverButton: boolean;
  /** 按钮垂直位置 */
  readonly buttonPositionVertical: "top" | "bottom";
  /** 按钮水平位置 */
  readonly buttonPositionHorizontal: "left" | "right";
  /** 按钮垂直位置值 */
  readonly buttonPositionVerticalValue: string;
  /** 按钮水平位置值 */
  readonly buttonPositionHorizontalValue: string;
  /** 消息弹层位置 */
  readonly messagePlacement: MessagePlacement;
}

/**
 * 默认设置
 */
export const DEFAULT_SETTINGS: PixivDownloaderSettings = {
  fileName: "<%ArtworkId>_p<%PageIndex>_<%AuthorId>",
  showHoverButton: true,
  buttonPositionVertical: "bottom",
  buttonPositionHorizontal: "right",
  buttonPositionVerticalValue: "8",
  buttonPositionHorizontalValue: "8",
  messagePlacement: "top",
};
