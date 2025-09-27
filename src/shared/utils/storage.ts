import type { BaseSettings } from "../types";

/**
 * 通用的本地存储管理器
 */
export class StorageManager<T extends BaseSettings> {
  constructor(
    private storageKey: string,
    private defaultSettings: T,
  ) {}

  /**
   * 加载设置
   */
  loadSettings(): T {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...this.defaultSettings, ...parsed };
      }
    } catch (error) {
      console.debug("Failed to load settings:", error);
    }
    return { ...this.defaultSettings };
  }

  /**
   * 保存设置
   */
  saveSettings(newSettings: Partial<T>): T {
    const currentSettings = this.loadSettings();
    const updatedSettings = { ...currentSettings, ...newSettings };

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(updatedSettings));
    } catch (error) {
      console.debug("Failed to save settings:", error);
    }

    return updatedSettings;
  }

  /**
   * 重置为默认设置
   */
  resetSettings(): T {
    try {
      localStorage.removeItem(this.storageKey);
    } catch (error) {
      console.debug("Failed to reset settings:", error);
    }
    return { ...this.defaultSettings };
  }
}
