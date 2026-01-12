/**
 * Pixiv DOM 操作工具
 */

/**
 * 查找图片容器
 */
export function findImageContainer(img: HTMLImageElement): HTMLElement | null {
  // 向上查找包含原图链接的 <a> 标签的父容器
  const anchor = img.closest('a[href*="i.pximg.net/img-original"]');
  if (anchor?.parentElement) {
    return anchor.parentElement;
  }

  // 如果没有找到,尝试向上查找几层
  let current: HTMLElement | null = img.parentElement;
  let depth = 0;
  while (current && depth < 5) {
    if (current.tagName === "DIV" && current.style.position !== "static") {
      return current;
    }
    current = current.parentElement;
    depth++;
  }

  return img.parentElement;
}

/**
 * 确保元素具有相对定位
 */
export function ensureRelativePosition(element: HTMLElement): void {
  const position = window.getComputedStyle(element).position;
  if (position === "static") {
    element.style.position = "relative";
  }
}
