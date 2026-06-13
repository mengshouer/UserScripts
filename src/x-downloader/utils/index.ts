import type { DownloaderSettings } from "../types";
export { handleDownloadError } from "./downloadError";
export {
  findTweetContainer,
  getDownloadableImages,
  getDownloadableVideos,
  getTweetIdFromElement,
  getUserIdFromTweetContainer,
  isInsideQuoteTweet,
  tweetHasDownloadableImages,
  tweetHasDownloadableVideos,
} from "./tweetDom";
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
