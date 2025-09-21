// ==UserScript==
// @name         X(Twitter) Downloader
// @name:zh-CN   X（Twitter）下载器
// @author       mengshouer
// @version      0.6
// @description  Add a download button to the media.
// @include      *://twitter.com/*
// @include      *://*.twitter.com/*
// @include      *://x.com/*
// @include      *://*.x.com/*
// @license      GPL-3.0 License
// @namespace    https://github.com/mengshouer/UserScripts
// ==/UserScript==

import { render } from "preact";
import { App } from "./components/App";
import { ImageDownloadButton } from "./components/ImageDownloadButton";
import { VideoDownloadButton } from "./components/VideoDownloadButton";
import { UniversalDownloadButton } from "./components/UniversalDownloadButton";
import { findVideoContainer, findVideoPlayerContainer } from "./utils/videoUtils";
import { findTweetContainer } from "./utils";

export const IMAGE_SELECTOR = 'img[src^="https://pbs.twimg.com/media/"]';
export const VIDEO_SELECTOR = "video";
const processedImages = new WeakSet<HTMLImageElement>();
const processedVideos = new WeakSet<HTMLVideoElement>();
const processedTweets = new WeakSet<HTMLElement>();

// 公共的设置获取逻辑
const getSettings = () => {
  return JSON.parse(localStorage.getItem("x-downloader-settings") || "{}");
};

// 通用的按钮显示隐藏逻辑
const createButtonVisibilityHandlers = (
  buttonContainer: HTMLElement,
  settingKey: string,
  rerenderCallback: () => void,
) => {
  const showButton = () => {
    const settings = getSettings();
    const shouldShow = settings[settingKey] !== false;
    if (shouldShow) {
      // 重新渲染以应用最新样式
      rerenderCallback();
      buttonContainer.style.display = "block";
    } else {
      buttonContainer.style.display = "none";
    }
  };

  const hideButton = () => {
    buttonContainer.style.display = "none";
  };

  return { showButton, hideButton };
};

type HoverButtonSettingKey = "showDownloadButton" | "showVideoDownloadButton";

const mountHoverButton = (
  hostElement: HTMLElement,
  settingKey: HoverButtonSettingKey,
  renderCallback: (container: HTMLElement) => void,
) => {
  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "none";
  hostElement.appendChild(buttonContainer);

  const rerender = () => {
    renderCallback(buttonContainer);
  };

  rerender();

  const { showButton, hideButton } = createButtonVisibilityHandlers(
    buttonContainer,
    settingKey,
    rerender,
  );

  hostElement.addEventListener("mouseenter", showButton);
  hostElement.addEventListener("mouseleave", hideButton);
};

const ensureRelativePosition = (element: HTMLElement) => {
  const style = getComputedStyle(element);
  if (style.position === "static") {
    element.style.position = "relative";
  }
};

/**
 * 为Tweet添加通用下载按钮
 */
function setupUniversalDownloadButton(tweetElement: HTMLElement): void {
  if (processedTweets.has(tweetElement)) {
    return;
  }

  // 查找role="group"的div元素
  const actionGroup = tweetElement.querySelector('div[role="group"]');
  if (!actionGroup) {
    return;
  }

  // 创建按钮容器
  const buttonContainer = document.createElement("div");
  buttonContainer.style.cssText = `
    display: inline-flex;
    align-items: center;
    margin-left: auto;
  `;

  // 将按钮添加到action group的最后
  actionGroup.appendChild(buttonContainer);

  // 渲染通用下载按钮
  render(<UniversalDownloadButton tweetContainer={tweetElement} />, buttonContainer);

  processedTweets.add(tweetElement);
}

const isTargetImage = (img: HTMLImageElement) =>
  Boolean(img.src) && img.src.startsWith("https://pbs.twimg.com/media/");

/**
 * 为单个图片设置交互监听
 */
function setupImageInteraction(img: HTMLImageElement): void {
  if (processedImages.has(img) || !isTargetImage(img)) {
    return;
  }

  const tweetContainer = findTweetContainer(img);

  if (tweetContainer) {
    setupUniversalDownloadButton(tweetContainer);
  }

  const imageContainer = img.parentElement?.parentElement;
  if (!imageContainer) return;

  ensureRelativePosition(imageContainer);

  mountHoverButton(imageContainer, "showDownloadButton", (container) => {
    render(<ImageDownloadButton targetImage={img} />, container);
  });

  processedImages.add(img);
}

/**
 * 为单个视频设置交互监听
 */
function setupVideoInteraction(video: HTMLVideoElement): void {
  if (processedVideos.has(video)) {
    return;
  }

  const tweetContainer = findTweetContainer(video);

  if (!tweetContainer) {
    return;
  }

  setupUniversalDownloadButton(tweetContainer);

  // 查找视频容器
  const videoContainer = findVideoContainer(video) || findVideoPlayerContainer(video);
  if (!videoContainer) {
    return;
  }

  mountHoverButton(videoContainer, "showVideoDownloadButton", (container) => {
    render(<VideoDownloadButton src={video.src} tweetContainer={tweetContainer} />, container);
  });

  processedVideos.add(video);
}

const scanNodeForMedia = (node: Node) => {
  if (node instanceof HTMLImageElement && isTargetImage(node)) {
    setupImageInteraction(node);
    return;
  }

  if (node.firstChild instanceof HTMLVideoElement) {
    setupVideoInteraction(node.firstChild);
    return;
  }

  if (node instanceof Element || node instanceof Document || node instanceof DocumentFragment) {
    // 处理图片
    node.querySelectorAll(IMAGE_SELECTOR).forEach((img) => {
      setupImageInteraction(img as HTMLImageElement);
    });

    // 处理视频
    node.querySelectorAll(VIDEO_SELECTOR).forEach((video) => {
      setupVideoInteraction(video as HTMLVideoElement);
    });
  }
};

/**
 * 监听图片和视频元素并添加下载按钮
 */
function watchForMedia(): void {
  const pendingNodes = new Set<Node>();
  let rafId: number | null = null;

  const scheduleScan = (node: Node) => {
    pendingNodes.add(node);

    if (rafId !== null) {
      return;
    }

    rafId = requestAnimationFrame(() => {
      rafId = null;
      pendingNodes.forEach((pendingNode) => {
        scanNodeForMedia(pendingNode);
      });
      pendingNodes.clear();
    });
  };

  scheduleScan(document);

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        scheduleScan(node);
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false, // 不监听属性变化
    characterData: false, // 不监听文本变化
  });

  const cleanup = () => {
    observer.disconnect();
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    pendingNodes.clear();
  };

  window.addEventListener("beforeunload", cleanup);
}

/**
 * 初始化应用
 */
function initializeApp(): void {
  // 创建应用容器
  const appContainer = document.createElement("div");
  appContainer.id = "x-downloader-app";
  document.body.appendChild(appContainer);

  // 渲染主应用
  render(<App />, appContainer);

  // 开始监听图片和视频
  watchForMedia();
}

// 等待 DOM 加载完成后初始化
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}
