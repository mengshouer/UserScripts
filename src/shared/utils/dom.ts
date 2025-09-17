/**
 * DOM 操作工具函数
 */

/**
 * 阻止事件冒泡和默认行为
 */
export function preventEventPropagation(e: Event): void {
  e.stopPropagation();
  e.preventDefault();
}

/**
 * 等待元素出现在 DOM 中
 */
export function waitForElement(
  selector: string,
  callback: (elements: NodeListOf<Element>) => void,
  options: {
    interval?: number;
    maxAttempts?: number;
  } = {}
): () => void {
  const { interval = 300, maxAttempts = 100 } = options;
  let attempts = 0;

  const checkElements = () => {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      callback(elements);
    }

    attempts++;
    if (attempts >= maxAttempts) {
      clearInterval(timer);
    }
  };

  // 立即执行一次
  checkElements();

  // 设置定时器
  const timer = setInterval(checkElements, interval);

  // 返回清理函数
  return () => clearInterval(timer);
}
