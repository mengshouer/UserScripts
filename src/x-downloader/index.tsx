// ==UserScript==
// @name         X(Twitter) Downloader
// @name:zh-CN   X（Twitter）下载器
// @author       mengshouer
// @version      0.4
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
import { findVideoContainer, findVideoPlayerContainer } from "./utils/videoUtils";

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

/**
 * 为单个图片设置交互监听
 */
function setupImageInteraction(img: HTMLImageElement): void {
  // 检查是否已经处理过 && 验证图片
  if (img.getAttribute("data-download-processed") === "true" || !img.src) {
    return;
  }

  // 查找图片容器
  const imageContainer = img.parentElement?.parentElement;
  if (!imageContainer) return;

  // 确保容器是相对定位的
  if (getComputedStyle(imageContainer).position === "static") {
    imageContainer.style.position = "relative";
  }

  // 创建下载按钮容器（初始隐藏）
  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "none";

  // 将按钮容器添加到图片容器中
  imageContainer.appendChild(buttonContainer);

  // 初始渲染图片下载按钮
  const renderImageButton = () => {
    render(<ImageDownloadButton targetImage={img} />, buttonContainer);
  };
  renderImageButton();

  // 按钮显示隐藏逻辑
  const { showButton, hideButton } = createButtonVisibilityHandlers(
    buttonContainer,
    "showDownloadButton",
    renderImageButton,
  );

  // 鼠标进入图片容器时显示按钮
  imageContainer.addEventListener("mouseenter", showButton);
  imageContainer.addEventListener("mouseleave", hideButton);

  // 标记为已处理
  img.setAttribute("data-download-processed", "true");
}

/**
 * 为图片添加下载按钮
 */
function addDownloadButtonToImage(images: NodeListOf<Element>): void {
  images.forEach((element) => {
    const img = element as HTMLImageElement;
    setupImageInteraction(img);
  });
}

/**
 * 为单个视频设置交互监听
 */
function setupVideoInteraction(video: HTMLVideoElement): void {
  // 检查是否已经处理过
  if (video.getAttribute("data-video-download-processed") === "true") {
    return;
  }

  // 查找对应的 Tweet 容器
  let tweetContainer: HTMLElement | null = video;
  while (tweetContainer && tweetContainer.tagName !== "BODY") {
    if (
      tweetContainer.tagName === "ARTICLE" &&
      tweetContainer.getAttribute("data-testid") === "tweet"
    ) {
      break;
    }
    tweetContainer = tweetContainer.parentElement;
  }

  if (!tweetContainer) {
    return;
  }

  // 查找视频容器
  const videoContainer = findVideoContainer(video) || findVideoPlayerContainer(video);
  if (!videoContainer) {
    return;
  }

  // 创建下载按钮容器（初始隐藏）
  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "none";

  // 将按钮容器添加到视频容器中
  videoContainer.appendChild(buttonContainer);

  // 初始渲染视频下载按钮
  const renderVideoButton = () => {
    render(<VideoDownloadButton tweetContainer={tweetContainer} />, buttonContainer);
  };
  renderVideoButton();

  // 按钮显示隐藏逻辑
  const { showButton, hideButton } = createButtonVisibilityHandlers(
    buttonContainer,
    "showVideoDownloadButton",
    renderVideoButton,
  );

  // 鼠标进入视频容器时显示按钮
  videoContainer.addEventListener("mouseenter", showButton);
  videoContainer.addEventListener("mouseleave", hideButton);

  // 标记为已处理
  video.setAttribute("data-video-download-processed", "true");
}

/**
 * 为视频添加下载按钮
 */
function addDownloadButtonToVideo(videos: NodeListOf<Element>): void {
  videos.forEach((element) => {
    const video = element as HTMLVideoElement;
    setupVideoInteraction(video);
  });
}

/**
 * 监听图片和视频元素并添加下载按钮
 */
function watchForMedia(): void {
  // 防抖处理，避免频繁触发
  let processTimeout: ReturnType<typeof setTimeout> | undefined;

  const processMedia = () => {
    if (processTimeout) {
      clearTimeout(processTimeout);
    }

    processTimeout = setTimeout(() => {
      // 处理图片 - 只查找新增的图片
      const images = document.querySelectorAll(
        'img[src^="https://pbs.twimg.com/media/"]:not([data-download-processed])',
      );
      addDownloadButtonToImage(images);

      // 处理视频 - 只查找新增的视频
      const videos = document.querySelectorAll("video:not([data-video-download-processed])");
      addDownloadButtonToVideo(videos);
    }, 100); // 100ms防抖延迟
  };

  // 立即执行一次
  processMedia();

  // 监听DOM变化（用于动态加载的内容）
  const observer = new MutationObserver((mutations) => {
    // 检查是否有相关的DOM变化
    const hasRelevantChanges = mutations.some(
      (mutation) =>
        mutation.type === "childList" &&
        (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0),
    );

    if (hasRelevantChanges) {
      processMedia();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false, // 不监听属性变化
    characterData: false, // 不监听文本变化
  });

  // 清理函数
  const cleanup = () => {
    observer.disconnect();
  };

  // 在页面卸载时清理
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
