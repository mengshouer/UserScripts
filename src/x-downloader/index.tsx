// ==UserScript==
// @name         X(Twitter) Downloader
// @name:zh-CN   X（Twitter）下载器
// @author       mengshouer
// @version      0.1
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
import { DownloadButton } from "./components/DownloadButton";
import { VideoDownloadButton } from "./components/VideoDownloadButton";
import { useDownloaderSettings } from "./hooks/useDownloaderSettings";
import {
  findVideoContainer,
  findVideoPlayerContainer,
} from "./utils/videoUtils";

// 初始化设置管理器
const settingsManager = useDownloaderSettings();

/**
 * 为单个图片设置交互监听
 */
function setupImageInteraction(img: HTMLImageElement): void {
  // 检查是否已经处理过 && 验证图片
  if (img.getAttribute("data-download-processed") === "true" || !img.src) {
    return;
  }

  // 检查设置是否允许显示下载按钮
  if (!settingsManager.settings.showDownloadButton) {
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
  buttonContainer.style.position = "absolute";
  buttonContainer.style.top = "8px";
  buttonContainer.style.right = "8px";
  buttonContainer.style.zIndex = "1000";
  buttonContainer.style.display = "none";
  buttonContainer.setAttribute("data-image-download-button", "true");

  // 将按钮容器添加到图片容器中
  imageContainer.appendChild(buttonContainer);

  // 渲染图片下载按钮
  render(<DownloadButton targetImage={img} />, buttonContainer);

  // 存储按钮容器引用
  imageButtonContainers.set(img, buttonContainer);

  // 设置事件监听器
  const showButton = () => {
    buttonContainer.style.display = "block";
  };

  const hideButton = () => {
    buttonContainer.style.display = "none";
  };

  // 鼠标进入图片容器时显示按钮
  imageContainer.addEventListener("mouseenter", showButton);
  imageContainer.addEventListener("mouseleave", hideButton);

  // 清理函数
  const cleanup = () => {
    // 移除事件监听器
    imageContainer.removeEventListener("mouseenter", showButton);
    imageContainer.removeEventListener("mouseleave", hideButton);

    // 移除按钮容器
    buttonContainer.remove();

    // 清理引用
    imageButtonContainers.delete(img);
    imageListeners.delete(img);
  };

  // 存储清理函数
  imageListeners.set(img, cleanup);

  // 标记为已处理
  img.setAttribute("data-download-processed", "true");
}

/**
 * 为图片添加下载按钮（新的实现）
 */
function addDownloadButtonToImage(images: NodeListOf<Element>): void {
  images.forEach((element) => {
    const img = element as HTMLImageElement;
    setupImageInteraction(img);
  });
}

// 存储监听器的 Map
const videoListeners = new Map<HTMLVideoElement, () => void>();
const videoButtonContainers = new Map<HTMLVideoElement, HTMLElement>();
const imageListeners = new Map<HTMLImageElement, () => void>();
const imageButtonContainers = new Map<HTMLImageElement, HTMLElement>();

/**
 * 为单个视频设置交互监听
 */
function setupVideoInteraction(video: HTMLVideoElement): void {
  // 检查是否已经处理过
  if (video.getAttribute("data-video-download-processed") === "true") {
    return;
  }

  // 检查设置是否允许显示视频下载按钮
  if (!settingsManager.settings.showVideoDownloadButton) {
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
  const videoContainer =
    findVideoContainer(video) || findVideoPlayerContainer(video);
  if (!videoContainer) {
    return;
  }

  // 创建下载按钮容器（初始隐藏）
  const buttonContainer = document.createElement("div");
  buttonContainer.style.position = "absolute";
  buttonContainer.style.top = "8px";
  buttonContainer.style.right = "8px";
  buttonContainer.style.zIndex = "1000";
  buttonContainer.style.display = "none";
  buttonContainer.setAttribute("data-video-download-button", "true");

  // 将按钮容器添加到视频容器中
  videoContainer.appendChild(buttonContainer);

  // 渲染视频下载按钮
  render(
    <VideoDownloadButton tweetContainer={tweetContainer} />,
    buttonContainer
  );

  // 存储按钮容器引用
  videoButtonContainers.set(video, buttonContainer);

  // 设置事件监听器
  const showButton = () => {
    buttonContainer.style.display = "block";
  };

  const hideButton = () => {
    buttonContainer.style.display = "none";
  };

  // 鼠标进入视频容器时显示按钮
  videoContainer.addEventListener("mouseenter", showButton);
  videoContainer.addEventListener("mouseleave", hideButton);

  // 视频暂停时显示按钮
  video.addEventListener("pause", showButton);

  // 视频播放时，如果鼠标不在容器内则隐藏按钮
  video.addEventListener("play", () => {
    // 简单延迟检查，避免复杂的鼠标追踪
    setTimeout(() => {
      if (!videoContainer.matches(":hover")) {
        hideButton();
      }
    }, 500);
  });

  // 清理函数
  const cleanup = () => {
    // 移除事件监听器
    videoContainer.removeEventListener("mouseenter", showButton);
    videoContainer.removeEventListener("mouseleave", hideButton);
    video.removeEventListener("pause", showButton);
    video.removeEventListener("play", showButton);

    // 移除按钮容器
    buttonContainer.remove();

    // 清理引用
    videoButtonContainers.delete(video);
    videoListeners.delete(video);
  };

  // 存储清理函数
  videoListeners.set(video, cleanup);

  // 标记为已处理
  video.setAttribute("data-video-download-processed", "true");
}

/**
 * 为视频添加下载按钮（新的实现）
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
  const processMedia = () => {
    // 处理图片
    const images = document.querySelectorAll(
      'img[src^="https://pbs.twimg.com/media/"]'
    );
    addDownloadButtonToImage(images);

    // 处理视频
    const videos = document.querySelectorAll("video");
    addDownloadButtonToVideo(videos);
  };

  // 立即执行一次
  processMedia();

  // 监听DOM变化（用于动态加载的内容）
  const observer = new MutationObserver(processMedia);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // 清理函数
  const cleanup = () => {
    observer.disconnect();

    // 清理视频监听器
    videoListeners.forEach((cleanupFunc) => cleanupFunc());
    videoListeners.clear();
    videoButtonContainers.clear();

    // 清理图片监听器
    imageListeners.forEach((cleanupFunc) => cleanupFunc());
    imageListeners.clear();
    imageButtonContainers.clear();
  };

  // 在页面卸载时清理
  window.addEventListener("beforeunload", cleanup);
}

/**
 * 初始化应用
 */
function initializeApp(): void {
  console.log("🚀 X-downloader initializing...");

  // 创建应用容器
  const appContainer = document.createElement("div");
  appContainer.id = "x-downloader-app";
  document.body.appendChild(appContainer);

  // 渲染主应用
  render(<App />, appContainer);

  // 开始监听图片和视频
  watchForMedia();

  console.log("✅ X-downloader initialized successfully");
}

// 等待 DOM 加载完成后初始化
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}
