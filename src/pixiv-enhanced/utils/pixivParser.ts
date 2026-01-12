/**
 * Pixiv 页面解析工具
 */

import type { PixivArtworkInfo, ImageUrlInfo } from "../types";

interface PixivPageData {
  urls: {
    original: string;
  };
}

/**
 * 从当前页面提取作品信息 (使用 Pixiv API)
 */
export async function extractArtworkInfo(): Promise<PixivArtworkInfo | null> {
  try {
    // 1. 从 URL 提取作品ID
    const artworkId = window.location.pathname.match(/\/artworks\/(\d+)/)?.[1];
    if (!artworkId) {
      console.warn("[Pixiv Downloader] 无法从 URL 提取作品ID");
      return null;
    }

    // 2. 调用 API 获取作品完整信息
    const response = await fetch(`https://www.pixiv.net/ajax/illust/${artworkId}`);
    const json = await response.json();

    if (json.error) {
      throw new Error("Failed to fetch artwork info");
    }

    const body = json.body;

    return {
      artworkId: body.illustId,
      authorId: body.userId,
      authorName: body.userName,
      artworkTitle: body.illustTitle,
      pageCount: body.pageCount || 1,
      currentPage: 1,
    };
  } catch (error) {
    console.error("[Pixiv Downloader] 提取作品信息失败:", error);
    return null;
  }
}

/**
 * 调用 Pixiv API 获取作品的所有原图 URL
 */
async function fetchOriginalUrls(artworkId: string): Promise<string[]> {
  const response = await fetch(`https://www.pixiv.net/ajax/illust/${artworkId}/pages`);
  const json = await response.json();

  if (json.error) {
    throw new Error("Failed to fetch artwork pages");
  }

  return json.body.map((page: PixivPageData) => page.urls.original);
}

/**
 * 从图片元素获取原图URL信息
 */
export async function getImageUrlInfo(
  img: HTMLImageElement,
  artworkId: string,
): Promise<ImageUrlInfo | null> {
  try {
    // 1. 优先从父级 <a> 标签获取原图链接
    const anchor = img.closest<HTMLAnchorElement>('a[href*="i.pximg.net/img-original"]');
    if (anchor?.href) {
      const originalUrl = anchor.href;
      const extension = originalUrl.split(".").pop() || "png";
      const pageIndexMatch = originalUrl.match(/_p(\d+)\./);
      const pageIndex = pageIndexMatch ? parseInt(pageIndexMatch[1] || "0", 10) : 0;

      return {
        originalUrl,
        previewUrl: img.src,
        extension,
        pageIndex,
      };
    }

    // 2. 调用 API 获取真实原图 URL
    const originalUrls = await fetchOriginalUrls(artworkId);
    const pageIndexMatch = img.src.match(/_p(\d+)_/);
    const pageIndex = pageIndexMatch ? parseInt(pageIndexMatch[1] || "0", 10) : 0;

    if (originalUrls[pageIndex]) {
      const originalUrl = originalUrls[pageIndex];
      const extension = originalUrl.split(".").pop() || "png";

      return {
        originalUrl,
        previewUrl: img.src,
        extension,
        pageIndex,
      };
    }

    return null;
  } catch (error) {
    console.error("[Pixiv Downloader] 获取图片URL信息失败:", error);
    return null;
  }
}

/**
 * 获取作品的所有图片URL信息
 */
export async function getAllImageUrls(artworkInfo: PixivArtworkInfo): Promise<ImageUrlInfo[]> {
  try {
    // 直接调用 API 获取所有原图 URL
    const originalUrls = await fetchOriginalUrls(artworkInfo.artworkId);

    return originalUrls.map((url, index) => ({
      originalUrl: url,
      previewUrl: url
        .replace("img-original", "img-master")
        .replace(/\.(png|jpg|gif)$/, "_master1200.jpg"),
      extension: url.split(".").pop() || "png",
      pageIndex: index,
    }));
  } catch (error) {
    console.error("[Pixiv Downloader] 获取所有图片URL失败:", error);
    return [];
  }
}

/**
 * 生成文件名
 */
export function generatePixivFileName(
  template: string,
  artworkInfo: PixivArtworkInfo,
  pageIndex: number,
): string {
  const variables: Record<string, string> = {
    ArtworkId: artworkInfo.artworkId,
    PageIndex: String(pageIndex),
    AuthorId: artworkInfo.authorId,
    AuthorName: artworkInfo.authorName,
    ArtworkTitle: artworkInfo.artworkTitle,
    Time: String(Date.now()),
  };

  let result = template;
  for (const [key, value] of Object.entries(variables)) {
    result = result.replace(new RegExp(`<%${key}>`, "g"), value || "");
  }

  // 移除文件名中的非法字符
  result = result.replace(/[<>:"/\\|?*]/g, "_");

  return result;
}
