/**
 * Pixiv 下载逻辑
 */

import { gmDownloadFile, downloadGuard } from "../../shared";
import type { PixivArtworkInfo, ImageUrlInfo, PixivDownloaderSettings } from "../types";
import { generatePixivFileName } from "./pixivParser";

export interface DownloadResult {
  success: number;
  failed: { pageIndex: number; error: unknown }[];
}

/**
 * 下载单张图片
 */
export async function downloadSingleImage(
  imageInfo: ImageUrlInfo,
  artworkInfo: PixivArtworkInfo,
  settings: PixivDownloaderSettings,
): Promise<void> {
  try {
    // 生成文件名
    const filename = generatePixivFileName(settings.fileName, artworkInfo, imageInfo.pageIndex);

    // 下载文件
    await gmDownloadFile(imageInfo.originalUrl, `${filename}.${imageInfo.extension}`, {
      headers: { Referer: "https://www.pixiv.net/" },
    });

    console.log("[Pixiv Downloader] 下载成功:", filename);
  } catch (error) {
    console.error("[Pixiv Downloader] 下载失败:", error);
    throw error;
  }
}

/**
 * 批量下载所有图片
 */
export async function downloadAllImages(
  imageUrls: ImageUrlInfo[],
  artworkInfo: PixivArtworkInfo,
  settings: PixivDownloaderSettings,
  onProgress?: (current: number, total: number) => void,
): Promise<DownloadResult> {
  const total = imageUrls.length;
  const result: DownloadResult = { success: 0, failed: [] };

  // 添加批量下载守卫，确保整个下载过程中页面离开会被阻止
  downloadGuard.add();

  try {
    for (let i = 0; i < total; i++) {
      const imageInfo = imageUrls[i];
      if (!imageInfo) continue;

      // 更新进度
      if (onProgress) {
        onProgress(i + 1, total);
      }

      // 下载图片
      try {
        await downloadSingleImage(imageInfo, artworkInfo, settings);
        result.success++;
      } catch (error) {
        result.failed.push({ pageIndex: imageInfo.pageIndex, error });
      }

      // 添加延迟避免触发限流 (除了最后一张)
      if (i < total - 1) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }
  } finally {
    downloadGuard.remove();
  }

  console.log(
    `[Pixiv Downloader] 下载完成: 成功 ${result.success} 张, 失败 ${result.failed.length} 张`,
  );
  return result;
}
