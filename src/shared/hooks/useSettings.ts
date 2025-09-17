import { signal, computed } from '@preact/signals-core';
import { StorageManager } from '../utils/storage';
import type { BaseSettings } from '../types';

/**
 * 设置管理 Hook
 */
export function createSettingsHook<T extends BaseSettings>(
  storageKey: string,
  defaultSettings: T
) {
  const storageManager = new StorageManager(storageKey, defaultSettings);

  // 创建响应式信号
  const settingsSignal = signal<T>(storageManager.loadSettings());

  // 计算属性 - 便于组件访问特定设置
  const computedSettings = computed(() => settingsSignal.value);

  return {
    // 获取当前设置
    get settings() {
      return computedSettings.value;
    },

    // 更新设置
    updateSettings(newSettings: Partial<T>) {
      const updated = storageManager.saveSettings(newSettings);
      settingsSignal.value = updated;
    },

    // 重置设置
    resetSettings() {
      const reset = storageManager.resetSettings();
      settingsSignal.value = reset;
      return reset;
    },

    // 获取单个设置项
    getSetting<K extends keyof T>(key: K): T[K] {
      return settingsSignal.value[key];
    },

    // 设置单个设置项
    setSetting<K extends keyof T>(key: K, value: T[K]) {
      this.updateSettings({ [key]: value } as unknown as Partial<T>);
    },

    // 响应式信号（用于组件订阅）
    signal: settingsSignal,
  };
}