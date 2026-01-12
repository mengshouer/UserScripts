/**
 * DOM 操作工具函数
 */

/**
 * 格式化位置值，将纯数字转换为带 px 单位的值
 * @param value - 位置值，如 "8" 或 "8px" 或 "1rem"
 * @returns 格式化后的值，如 "8px" 或 "1rem"
 */
export function formatPositionValue(value: string): string {
  const trimmed = value.trim();
  // 如果是纯数字，添加 px 单位
  if (/^\d+$/.test(trimmed)) {
    return `${trimmed}px`;
  }
  return trimmed;
}

/**
 * 阻止事件冒泡和默认行为
 */
export function preventEventPropagation(e: Event): void {
  e.stopPropagation();
  e.preventDefault();
}
