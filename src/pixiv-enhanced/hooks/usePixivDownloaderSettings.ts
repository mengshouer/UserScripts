import { useState, useEffect } from "preact/hooks";
import { createSettingsHook } from "../../shared/hooks/useSettings";
import { STORAGE_KEY } from "../../shared";
import type { PixivDownloaderSettings } from "../types";
import { DEFAULT_SETTINGS } from "../types";

// 创建单例设置管理器
const settingsHook = createSettingsHook<PixivDownloaderSettings>(STORAGE_KEY, DEFAULT_SETTINGS);

/**
 * Pixiv Downloader 设置管理 Hook
 */
export function usePixivDownloaderSettings() {
  const [settings, setSettings] = useState<PixivDownloaderSettings>(settingsHook.signal.value);

  useEffect(() => {
    const unsubscribe = settingsHook.signal.subscribe((value) => {
      setSettings(value);
    });
    return () => unsubscribe();
  }, []);

  return {
    settings,
    setSetting: settingsHook.setSetting,
    updateSettings: settingsHook.updateSettings,
    resetSettings: settingsHook.resetSettings,
    getSetting: settingsHook.getSetting,
  };
}
