import { useState, useEffect } from "preact/hooks";
import { signal } from "@preact/signals-core";

// 使用 Preact Signals 进行全局按键状态管理
const keySignals = new Map<string, ReturnType<typeof signal<boolean>>>();
let globalEventListenersAttached = false;

// 获取或创建指定按键的 signal
function getKeySignal(key: string): ReturnType<typeof signal<boolean>> {
  if (!keySignals.has(key)) {
    const newSignal = signal<boolean>(false);
    keySignals.set(key, newSignal);
    return newSignal;
  }
  return keySignals.get(key)!;
}

// 全局事件处理函数
const handleKeyDown = (e: KeyboardEvent) => {
  const keySignal = keySignals.get(e.key);
  if (keySignal && !keySignal.value) {
    keySignal.value = true;
  }
};

const handleKeyUp = (e: KeyboardEvent) => {
  const keySignal = keySignals.get(e.key);
  if (keySignal && keySignal.value) {
    keySignal.value = false;
  }
};

// 处理窗口失焦时重置所有按键状态
const handleBlur = () => {
  keySignals.forEach((keySignal) => {
    if (keySignal.value) {
      keySignal.value = false;
    }
  });
};

// 添加全局事件监听器
function attachGlobalEventListeners() {
  if (!globalEventListenersAttached) {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleBlur);
    globalEventListenersAttached = true;
  }
}

/**
 * 全局按键状态管理 Hook
 * 使用 Preact Signals 实现响应式按键状态共享
 *
 * @param key - 要监听的按键名称 (e.g., "Shift", "Control", "Alt", "Meta", "a", "Enter" 等)
 * @returns 按键是否被按下的状态
 */
export function useGlobalKey(key: string): boolean {
  // 获取或创建该按键的 signal
  const keySignal = getKeySignal(key);

  // 使用 useState 来跟踪 signal 的值，确保组件会重渲染
  const [keyState, setKeyState] = useState(keySignal.value);

  useEffect(() => {
    // 确保全局事件监听器已附加
    attachGlobalEventListeners();

    // 订阅 signal 的变化，当 signal 改变时更新组件状态
    const unsubscribe = keySignal.subscribe((value) => {
      setKeyState(value);
    });

    // 同步初始状态（防止竞态条件）
    setKeyState(keySignal.value);

    // 清理订阅
    return () => {
      unsubscribe();
    };
  }, [key, keySignal]);

  return keyState ?? false;
}
