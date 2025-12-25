import { extractUrlInfo, message, i18n } from "../../shared";
import type { DownloaderSettings } from "../../shared/types";
export { extractVideoUrl, findVideoContainer, findVideoPlayerContainer } from "./videoUtils";
export { likeTweet } from "./likeUtils";

/**
 * 格式化位置值，纯数字默认添加 px 单位
 */
export function formatPositionValue(value: string): string {
  if (/^\d+$/.test(value.trim())) {
    return `${value.trim()}px`;
  }
  return value;
}

/**
 * 根据设置生成按钮位置样式
 */
export function getButtonPositionStyle(settings: DownloaderSettings): Record<string, string> {
  return {
    [settings.buttonPositionVertical as string]: formatPositionValue(
      settings.buttonPositionVerticalValue as string,
    ),
    [settings.buttonPositionHorizontal as string]: formatPositionValue(
      settings.buttonPositionHorizontalValue as string,
    ),
  };
}

/**
 * 统一的错误处理函数
 */
export function handleDownloadError(
  error: unknown,
  prefix: string = i18n.t("messages.downloadFailed"),
): void {
  console.error(`${prefix}:`, error);
  const errorMessage = error instanceof Error ? error.message : String(error);
  message.error(`${prefix}: ${errorMessage}`);
}

/**
 * 从 DOM 元素中查找最近的 Tweet 容器
 *
 * @param element - 起始的 DOM 元素
 * @returns 最近的 Tweet 容器元素，找不到则返回 null
 */
export function findTweetContainer(element: HTMLElement): HTMLElement | null {
  let current: HTMLElement | null = element;
  while (current && current.tagName !== "BODY") {
    // 普通 timeline 的 tweet 容器
    if (current.tagName === "ARTICLE" && current.getAttribute("data-testid") === "tweet") {
      return current;
    }

    // 照片模式的对话框容器
    if (current.getAttribute("role") === "dialog") {
      return current;
    }

    current = current.parentElement;
  }
  return null;
}

/**
 * 从 DOM 元素中提取 Tweet ID
 */
export function getTweetIdFromElement(element: HTMLElement, username = ""): string | undefined {
  // 方法1: 从最近的 article 元素的 data-testid 属性中获取
  let current: HTMLElement | null = element;
  while (current && current.tagName !== "BODY") {
    if (current.tagName === "ARTICLE" && current.hasAttribute("data-testid")) {
      const testId = current.getAttribute("data-testid");
      if (testId === "tweet") {
        // 查找链接中的 tweet ID
        const links = current.querySelectorAll(`a[href*="${username}/status/"]`);
        for (const link of Array.from(links)) {
          const href = (link as HTMLAnchorElement).href;
          const match = href.match(/\/status\/(\d+)/);
          if (match) {
            return match[1];
          }
        }
      }
    }
    current = current.parentElement;
  }

  // 方法2: 从当前页面 URL 中获取
  const urlMatch = window.location.href.match(/\/status\/(\d+)/);
  if (urlMatch) {
    return urlMatch[1];
  }

  return undefined;
}

/**
 * 检查元素是否在引用推文内
 *
 * @param element - 要检查的DOM元素
 * @returns 如果在引用推文内返回true，否则返回false
 */
export function isInsideQuoteTweet(element: HTMLElement): boolean {
  // 查找role="link"祖先容器，检查是否包含time元素
  const roleLink = element.closest('[role="link"]');
  if (roleLink && roleLink.querySelector("time")) {
    return true;
  }

  // 查找特定ID模式祖先容器，检查是否包含time元素
  const idContainer = element.closest('[id^="id"]:not([aria-labelledby])');
  if (idContainer && idContainer.querySelector("time")) {
    return true;
  }

  return false;
}

/**
 * 检查推文容器是否有可下载的图片（排除引用推文中的图片）
 *
 * @param tweetContainer - 推文容器元素
 * @returns 如果有可下载的图片返回true
 */
export function tweetHasDownloadableImages(tweetContainer: HTMLElement): boolean {
  const images = tweetContainer.querySelectorAll('img[src^="https://pbs.twimg.com/media/"]');
  return Array.from(images).some((img) => !isInsideQuoteTweet(img as HTMLElement));
}

/**
 * 检查推文容器是否有可下载的视频（排除引用推文中的视频）
 *
 * @param tweetContainer - 推文容器元素
 * @returns 如果有可下载的视频返回true
 */
export function tweetHasDownloadableVideos(tweetContainer: HTMLElement): boolean {
  const videos = tweetContainer.querySelectorAll("video");
  return Array.from(videos).some((video) => !isInsideQuoteTweet(video as HTMLElement));
}

/**
 * 获取推文中可下载的图片（排除引用推文中的图片）
 *
 * @param tweetContainer - 推文容器元素
 * @returns 可下载的图片元素数组
 */
export function getDownloadableImages(tweetContainer: HTMLElement): HTMLImageElement[] {
  const images = tweetContainer.querySelectorAll('img[src^="https://pbs.twimg.com/media/"]');
  return Array.from(images).filter(
    (img) => !isInsideQuoteTweet(img as HTMLElement),
  ) as HTMLImageElement[];
}

/**
 * 获取推文中可下载的视频（排除引用推文中的视频）
 *
 * @param tweetContainer - 推文容器元素
 * @returns 可下载的视频元素数组
 */
export function getDownloadableVideos(tweetContainer: HTMLElement): HTMLVideoElement[] {
  const videos = tweetContainer.querySelectorAll("video");
  return Array.from(videos).filter(
    (video) => !isInsideQuoteTweet(video as HTMLElement),
  ) as HTMLVideoElement[];
}

/**
 * 从 Tweet 容器中获取用户名
 * 优先通过 data-testid="User-Name" 获取，失败则通过 status 链接兜底
 */
export function getUserIdFromTweetContainer(tweetContainer: HTMLElement) {
  try {
    // 方法1: 通过 data-testid="User-Name" 获取用户名
    const userNameElement = tweetContainer.querySelector('[data-testid="User-Name"]');
    if (userNameElement) {
      const linkElement = userNameElement.querySelector('a[href^="/"]') as HTMLAnchorElement;
      if (linkElement) {
        const href = linkElement.getAttribute("href");
        if (href && href.startsWith("/")) {
          const username = href.slice(1).split("/")[0];
          if (username) {
            return username;
          }
        }
      }
    }

    // 方法2: 兜底方案 - 从 status 链接中提取用户名
    const tweetLink = tweetContainer.querySelector('a[href*="/status/"]') as HTMLAnchorElement;
    if (tweetLink) {
      return extractUrlInfo(tweetLink.href).userid;
    } else {
      // 最后的备用方案：使用当前 URL
      return extractUrlInfo(window.location.href).userid;
    }
  } catch (error) {
    console.error("获取用户名时出错:", error);
    return undefined;
  }
}
