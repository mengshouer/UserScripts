// ==UserScript==
// @name         X(Twitter) Downloader
// @name:zh-CN   X（Twitter）下载器
// @author       mengshouer
// @version      1.0.0
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
import "./i18n"; // 导入包含所有语言的 i18n
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

const getSettings = () => JSON.parse(localStorage.getItem("x-downloader-settings") || "{}");

const mountHoverButton = (
  hostElement: HTMLElement,
  settingKey: "showDownloadButton" | "showVideoDownloadButton",
  renderCallback: (container: HTMLElement) => void,
) => {
  const container = document.createElement("div");
  container.style.display = "none";
  hostElement.appendChild(container);

  const showButton = () => {
    const shouldShow = getSettings()[settingKey] !== false;
    container.style.display = shouldShow ? "block" : "none";
    if (shouldShow) renderCallback(container);
  };

  renderCallback(container); // 初始渲染
  hostElement.addEventListener("mouseenter", showButton);
  hostElement.addEventListener("mouseleave", () => (container.style.display = "none"));
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
  if (processedTweets.has(tweetElement)) return;

  const actionGroup = tweetElement.querySelector('div[role="group"]');
  if (!actionGroup) return;

  // 创建并添加按钮容器
  const buttonContainer = document.createElement("div");
  buttonContainer.style.cssText = "display: inline-flex; align-items: center; margin-left: auto;";
  actionGroup.appendChild(buttonContainer);

  // 渲染函数
  const renderButton = () =>
    render(<UniversalDownloadButton tweetContainer={tweetElement} />, buttonContainer);

  // 初始渲染
  renderButton();

  // hover时重新渲染（简单防抖）
  let timeoutId: number | null = null;
  actionGroup.addEventListener("mouseenter", () => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = window.setTimeout(renderButton, 50);
  });

  processedTweets.add(tweetElement);
}

const isTargetImage = (img: HTMLImageElement) =>
  Boolean(img.src) && img.src.startsWith("https://pbs.twimg.com/media/");

function setupImageInteraction(img: HTMLImageElement): void {
  if (processedImages.has(img) || !isTargetImage(img)) return;

  const tweetContainer = findTweetContainer(img);
  if (tweetContainer) setupUniversalDownloadButton(tweetContainer);

  const imageContainer = img.parentElement?.parentElement;
  if (!imageContainer) return;

  ensureRelativePosition(imageContainer);
  mountHoverButton(imageContainer, "showDownloadButton", (container) => {
    render(<ImageDownloadButton targetImage={img} />, container);
  });

  processedImages.add(img);
}

function setupVideoInteraction(video: HTMLVideoElement): void {
  if (processedVideos.has(video)) return;

  const tweetContainer = findTweetContainer(video);
  if (!tweetContainer) return;

  setupUniversalDownloadButton(tweetContainer);

  const videoContainer = findVideoContainer(video) || findVideoPlayerContainer(video);
  if (!videoContainer) return;

  mountHoverButton(videoContainer, "showVideoDownloadButton", (container) => {
    render(<VideoDownloadButton src={video.src} tweetContainer={tweetContainer} />, container);
  });

  processedVideos.add(video);
}

const scanNodeForMedia = (node: Node) => {
  if (node instanceof HTMLImageElement && isTargetImage(node)) {
    setupImageInteraction(node);
  } else if (node.firstChild instanceof HTMLVideoElement) {
    setupVideoInteraction(node.firstChild);
  } else if (
    node instanceof Element ||
    node instanceof Document ||
    node instanceof DocumentFragment
  ) {
    node
      .querySelectorAll(IMAGE_SELECTOR)
      .forEach((img) => setupImageInteraction(img as HTMLImageElement));
    node
      .querySelectorAll(VIDEO_SELECTOR)
      .forEach((video) => setupVideoInteraction(video as HTMLVideoElement));
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

    if (rafId !== null) return;

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

  // 渲染设置面板
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
