import { extractUrlInfo } from "../../shared";
export { extractVideoUrl, findVideoContainer, findVideoPlayerContainer } from "./videoUtils";

/**
 * 从 DOM 元素中提取 Tweet ID
 */
export function getTweetIdFromElement(element: HTMLElement): string | undefined {
  // 方法1: 从最近的 article 元素的 data-testid 属性中获取
  let current: HTMLElement | null = element;
  while (current && current.tagName !== "BODY") {
    if (current.tagName === "ARTICLE" && current.hasAttribute("data-testid")) {
      const testId = current.getAttribute("data-testid");
      if (testId === "tweet") {
        // 查找链接中的 tweet ID
        const links = current.querySelectorAll('a[href*="/status/"]');
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
