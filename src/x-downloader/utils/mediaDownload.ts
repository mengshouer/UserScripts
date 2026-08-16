import {
  copyToClipboard,
  downloadFile,
  extractFileInfo,
  extractUrlInfo,
  generateFileName,
  i18n,
  message,
} from "../../shared";
import type { DownloaderSettings } from "../types";
import { IMAGE_SELECTOR, VIDEO_SELECTOR } from "./selectors";
import { extractVideoUrl } from "./videoUtils";
import { handleDownloadError } from "./downloadError";
import {
  findTweetContainer,
  getDownloadableImages,
  getDownloadableVideos,
  getTweetIdFromElement,
  getUserIdFromTweetContainer,
} from "./tweetDom";

interface DownloadMediaResult {
  success: boolean;
  tweetId?: string | undefined;
}

/**
 * 检查关键字段是否为 unknown，打印详细日志并返回缺失字段列表
 */
function checkMissingFields(fields: Record<string, string | undefined>, source: string): string[] {
  const missing: string[] = [];
  for (const [name, value] of Object.entries(fields)) {
    if (!value || value === "unknown") {
      missing.push(name);
    }
  }
  if (missing.length > 0) {
    console.warn(`[x-downloader] Fields unresolved: ${missing.join(", ")} | source: ${source}`);
  }
  return missing;
}

interface ImageMediaDownloadOptions {
  targetImage: HTMLImageElement;
  tweetContainer?: HTMLElement | null | undefined;
  settings: DownloaderSettings;
  imageIndex?: number | undefined;
  isShiftPressed?: boolean;
  showSuccessMessage?: boolean;
}

interface VideoMediaDownloadOptions {
  src: string | undefined;
  tweetContainer: HTMLElement;
  settings: DownloaderSettings;
  isShiftPressed?: boolean;
  showSuccessMessage?: boolean;
}

interface TweetMediaDownloadOptions {
  tweetContainer: HTMLElement;
  settings: DownloaderSettings;
}

/**
 * 查找第一个 A 标签父元素
 */
function findFirstAnchor(node: HTMLElement): HTMLAnchorElement | null {
  let current: HTMLElement | null = node;
  for (let i = 0; i < 20 && current; i++) {
    current = current.parentElement;
    if (current?.tagName.toLowerCase() === "a") {
      return current as HTMLAnchorElement;
    }
  }
  return null;
}

export async function downloadImageMedia({
  targetImage,
  tweetContainer,
  settings,
  imageIndex,
  isShiftPressed = false,
  showSuccessMessage = true,
  skipFieldWarning = false,
}: ImageMediaDownloadOptions & { skipFieldWarning?: boolean }): Promise<DownloadMediaResult> {
  try {
    const { picname, ext } = extractFileInfo(targetImage.src);

    // 提取 userid 和 tid：优先从 tweet 容器 DOM 中获取（和视频路径一致），URL 解析作为补充
    const container = tweetContainer || findTweetContainer(targetImage);
    let userid: string | undefined;
    let tid: string | undefined;
    let picno = "1";

    if (container) {
      userid = getUserIdFromTweetContainer(container);
      tid = getTweetIdFromElement(container, userid);
    }

    // 从 URL 中解析 picno，同时作为 userid/tid 的 fallback
    const firstA = findFirstAnchor(targetImage);
    const parseSource = window.location.href.includes("photo")
      ? window.location.href
      : firstA?.href || "";
    if (parseSource) {
      const urlInfo = extractUrlInfo(parseSource);
      if (!userid || userid === "unknown") userid = urlInfo.userid;
      if (!tid || tid === "unknown") tid = urlInfo.tid;
      picno = urlInfo.picno;
    }

    userid = userid || "unknown";
    tid = tid || "unknown";

    let hasFieldWarning = false;
    if (!skipFieldWarning) {
      const missing = checkMissingFields(
        { Userid: userid, Tid: tid },
        parseSource || window.location.href,
      );
      if (missing.length > 0) {
        message.warning(i18n.t("messages.fieldMissing", { fields: missing.join(", ") }));
        hasFieldWarning = true;
      }
    }

    const picNo = imageIndex ?? parseInt(picno) - 1;

    const filename = generateFileName(settings.fileName, {
      Userid: userid,
      Tid: tid,
      Time: `${Date.now()}`,
      PicName: picname,
      PicNo: `${picNo}`,
    });

    const downloadUrl = `https://pbs.twimg.com/media/${picname}?format=${ext}&name=orig`;

    if (isShiftPressed) {
      await copyToClipboard(downloadUrl);
      return { success: true, tweetId: tid };
    }

    await downloadFile(downloadUrl, `${filename}.${ext}`);
    if (showSuccessMessage && !hasFieldWarning) {
      message.success(i18n.t("messages.downloadSuccess"));
    }

    return { success: true, tweetId: tid };
  } catch (error) {
    handleDownloadError(error, i18n.t("messages.imageDownloadFailed"));
    return { success: false };
  }
}

export async function downloadVideoMedia({
  src,
  tweetContainer,
  settings,
  isShiftPressed = false,
  showSuccessMessage = true,
}: VideoMediaDownloadOptions): Promise<DownloadMediaResult> {
  try {
    const username = getUserIdFromTweetContainer(tweetContainer);
    const tweetId = getTweetIdFromElement(tweetContainer, username);
    const hasSrc = src && src.startsWith("https://video.twimg.com");

    // 没有 src 且 tweetId 缺失：技术上无法获取视频 URL，必须阻断
    if (!tweetId && !hasSrc) {
      message.error(i18n.t("messages.cannotRecognizeTweet"));
      return { success: false };
    }

    const missing = checkMissingFields({ Userid: username, Tid: tweetId }, window.location.href);
    const hasFieldWarning = missing.length > 0;
    if (hasFieldWarning) {
      message.warning(i18n.t("messages.fieldMissing", { fields: missing.join(", ") }));
    }

    const videoUrl = hasSrc ? src : await extractVideoUrl(tweetId!);
    if (!videoUrl) {
      message.error(i18n.t("messages.videoLinkNotFound"));
      return { success: false, tweetId };
    }

    // 如果按住 Shift，直接复制链接
    if (isShiftPressed) {
      await copyToClipboard(videoUrl);
      return { success: true, tweetId };
    }

    const filename = generateFileName(settings.videoFileName, {
      Userid: username || "unknown",
      Tid: tweetId || "unknown",
      Time: `${Date.now()}`,
    });

    await downloadFile(videoUrl, `${filename}.mp4`);
    if (showSuccessMessage && !hasFieldWarning) {
      message.success(i18n.t("messages.videoDownloadSuccess"));
    }

    return { success: true, tweetId };
  } catch (error) {
    handleDownloadError(error, i18n.t("messages.videoDownloadFailed"));
    return { success: false };
  }
}

export async function downloadTweetMedia({
  tweetContainer,
  settings,
}: TweetMediaDownloadOptions): Promise<boolean> {
  const url = window.location.href;

  // 灯箱模式：容器内会混入右侧对话列中其他推文的媒体，
  // 按 URL 段判断当前展示的媒体类型，只下载当前展示的媒体
  if (tweetContainer.nodeName !== "ARTICLE") {
    if (url.includes("/photo/")) {
      return await downloadLightboxImage(tweetContainer, settings);
    }
    if (url.includes("/video/")) {
      return await downloadLightboxVideo(tweetContainer, settings);
    }
  }

  const images = getDownloadableImages(tweetContainer);

  if (images.length > 0) {
    return await downloadTweetImages(images, tweetContainer, settings);
  }

  const videos = getDownloadableVideos(tweetContainer);

  if (videos.length > 0) {
    return await downloadTweetVideo(tweetContainer, videos, settings);
  }

  return false;
}

/**
 * 在灯箱容器中定位当前展示的图片或 gif 视频：
 * gif 在 X 中用 <video loop> 渲染，需要同时查图片和视频。
 * 取灯箱内（article 之外）视口可见面积最大的媒体元素。
 */
function findLightboxDisplayedImage(
  tweetContainer: HTMLElement,
): HTMLImageElement | HTMLVideoElement | undefined {
  const imgCandidates = Array.from(
    tweetContainer.querySelectorAll<HTMLImageElement>(IMAGE_SELECTOR),
  ).filter((img) => !img.closest("article"));

  const videoCandidates = Array.from(
    tweetContainer.querySelectorAll<HTMLVideoElement>(VIDEO_SELECTOR),
  ).filter((video) => !video.closest("article"));

  const candidates = [...imgCandidates, ...videoCandidates];

  let best: HTMLImageElement | HTMLVideoElement | undefined;
  let bestArea = 0;
  for (const media of candidates) {
    const rect = media.getBoundingClientRect();
    const visibleWidth = Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0);
    const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
    const visibleArea = Math.max(0, visibleWidth) * Math.max(0, visibleHeight);
    if (visibleArea > bestArea) {
      bestArea = visibleArea;
      best = media;
    }
  }

  return best;
}

async function downloadLightboxImage(
  tweetContainer: HTMLElement,
  settings: DownloaderSettings,
): Promise<boolean> {
  const photoMatch = window.location.href.match(/\/photo\/(\d+)/);
  const photoIndex = photoMatch && photoMatch[1] ? parseInt(photoMatch[1]) - 1 : 0;

  const targetMedia = findLightboxDisplayedImage(tweetContainer);
  if (!targetMedia) {
    message.error(i18n.t("messages.imageDownloadFailed"));
    return false;
  }

  // gif 以 <video loop src="tweet_video/*.mp4"> 渲染
  if (targetMedia instanceof HTMLVideoElement) {
    const downloaded = await downloadVideoMedia({
      src: targetMedia.src,
      tweetContainer,
      settings,
      showSuccessMessage: true,
    });
    return downloaded.success;
  }

  const downloaded = await downloadImageMedia({
    targetImage: targetMedia,
    tweetContainer,
    settings,
    imageIndex: photoIndex,
    showSuccessMessage: true,
  });
  return downloaded.success;
}

async function downloadLightboxVideo(
  tweetContainer: HTMLElement,
  settings: DownloaderSettings,
): Promise<boolean> {
  // 灯箱大视频不在 article 内；找不到时传 undefined，由 downloadVideoMedia 走 API 解析
  const video = Array.from(tweetContainer.querySelectorAll<HTMLVideoElement>(VIDEO_SELECTOR)).find(
    (v) => !v.closest("article"),
  );

  const downloaded = await downloadVideoMedia({
    src: video?.src,
    tweetContainer,
    settings,
    showSuccessMessage: true,
  });

  return downloaded.success;
}

async function downloadTweetImages(
  images: HTMLImageElement[],
  tweetContainer: HTMLElement,
  settings: DownloaderSettings,
): Promise<boolean> {
  // 批量下载前统一校验一次，避免每张图都弹 warning
  let hasFieldWarning = false;
  const userid = getUserIdFromTweetContainer(tweetContainer);
  const tid = getTweetIdFromElement(tweetContainer, userid);
  const missing = checkMissingFields({ Userid: userid, Tid: tid }, window.location.href);
  if (missing.length > 0) {
    message.warning(i18n.t("messages.fieldMissing", { fields: missing.join(", ") }));
    hasFieldWarning = true;
  }

  const downloadPromises = images.map((img, index) =>
    downloadImageMedia({
      targetImage: img,
      tweetContainer,
      settings,
      imageIndex: index,
      showSuccessMessage: false,
      skipFieldWarning: true,
    }),
  );

  const results = await Promise.allSettled(downloadPromises);

  const failed = results.filter((result) => result.status === "rejected" || !result.value.success);
  const successCount = results.length - failed.length;
  if (successCount === 0) {
    if (!hasFieldWarning) {
      message.error(i18n.t("messages.imageDownloadFailed"));
    }
    return false;
  }

  if (!hasFieldWarning) {
    if (failed.length > 0) {
      message.warning(
        i18n.t("messages.imagesDownloadSuccess", { count: `${successCount}/${results.length}` }),
      );
    } else {
      message.success(i18n.t("messages.imagesDownloadSuccess", { count: results.length }));
    }
  }

  return true;
}

async function downloadTweetVideo(
  tweetContainer: HTMLElement,
  videos: HTMLVideoElement[],
  settings: DownloaderSettings,
): Promise<boolean> {
  // 获取第一个可下载的视频
  const video = videos[0];

  if (!video) return false;

  const downloaded = await downloadVideoMedia({
    src: video.src,
    tweetContainer,
    settings,
    showSuccessMessage: false,
  });

  if (downloaded.success) {
    message.success(i18n.t("messages.videoDownloadSuccess"));
  }

  return downloaded.success;
}
