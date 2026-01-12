// ==UserScript==
// @name         Pixiv Enhanced
// @name:zh-CN   Pixiv 增强
// @author       mengshouer
// @version      0.1.0
// @description  Enhance Pixiv with download and more features. Settings available by hovering mouse to the bottom left corner or via Tampermonkey menu.
// @description:zh-CN  增强 Pixiv，提供下载等功能。鼠标移入浏览器左下角或油猴菜单可打开设置。
// @include      *://www.pixiv.net/artworks/*
// @include      *://pixiv.net/artworks/*
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @license      GPL-3.0 License
// @namespace    https://github.com/mengshouer/UserScripts
// ==/UserScript==

// 导入类型以确保全局声明生效
import "./types";

import { render } from "preact";
import { App } from "./components/App";
import { HoverDownloadButton } from "./components/HoverDownloadButton";
import { findImageContainer, ensureRelativePosition } from "./utils/pixivDom";
import { STORAGE_KEY, OPEN_SETTINGS_EVENT } from "../shared";

// 初始化 i18n
import "./i18n";

// 注册油猴菜单命令
GM_registerMenuCommand("⚙️ Settings / 设置", () => {
  window.dispatchEvent(new CustomEvent(OPEN_SETTINGS_EVENT));
});

// 选择器
export const IMAGE_SELECTOR = 'img[src*="i.pximg.net/img-master"]';

// 追踪已处理的元素
const processedImages = new WeakSet<HTMLImageElement>();

/**
 * 获取设置
 */
const getSettings = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

/**
 * 挂载悬停按钮
 */
const mountHoverButton = (hostElement: HTMLElement, targetImage: HTMLImageElement) => {
  const container = document.createElement("div");
  container.style.display = "none";
  hostElement.appendChild(container);
  render(<HoverDownloadButton targetImage={targetImage} />, container);

  let isInside = false;
  let rafId: number | null = null;

  document.addEventListener("mousemove", (e: MouseEvent) => {
    if (rafId !== null) return;
    rafId = requestAnimationFrame(() => {
      rafId = null;
      const rect = hostElement.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (inside && !isInside) {
        const shouldShow = getSettings().showHoverButton !== false;
        container.style.display = shouldShow ? "block" : "none";
      } else if (!inside && isInside) {
        container.style.display = "none";
      }
      isInside = inside;
    });
  });
};

/**
 * 为图片添加悬停下载按钮
 */
function setupImageInteraction(img: HTMLImageElement): void {
  if (processedImages.has(img)) return;

  const imageContainer = findImageContainer(img);
  if (!imageContainer) return;

  ensureRelativePosition(imageContainer);
  mountHoverButton(imageContainer, img);

  processedImages.add(img);
}

/**
 * 扫描节点中的媒体元素
 */
const scanNodeForMedia = (node: Node) => {
  if (node instanceof HTMLImageElement && node.src.includes("i.pximg.net/img-master")) {
    setupImageInteraction(node);
  } else if (
    node instanceof Element ||
    node instanceof Document ||
    node instanceof DocumentFragment
  ) {
    node
      .querySelectorAll(IMAGE_SELECTOR)
      .forEach((img) => setupImageInteraction(img as HTMLImageElement));
  }
};

/**
 * 监听图片元素并添加下载按钮
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

  // 初始扫描
  scheduleScan(document);

  // 监听 DOM 变化
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
    attributes: false,
    characterData: false,
  });

  // 清理函数
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
  console.log("[Pixiv Downloader] 初始化中...");

  // 创建应用容器
  const appContainer = document.createElement("div");
  appContainer.id = "pixiv-enhanced-app";
  document.body.appendChild(appContainer);

  // 渲染设置面板
  render(<App />, appContainer);

  // 开始监听图片
  watchForMedia();

  console.log("[Pixiv Downloader] 初始化完成");
}

// 等待 DOM 加载完成后初始化
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}
