import { createSettingsHook } from "../../shared/hooks/useSettings";
import type { DownloaderSettings } from "../../shared/types";

const DEFAULT_SETTINGS: DownloaderSettings = {
  fileName: "<%Userid> <%Tid>_p<%PicNo>",
  showDownloadButton: true,
  videoFileName: "<%Userid> <%Tid>",
  showVideoDownloadButton: false,
  showUniversalDownloadButton: true,
  autoLikeOnDownload: false,
};

const STORAGE_KEY = "x-downloader-settings";

// 创建单例设置管理器
const settingsHook = createSettingsHook(STORAGE_KEY, DEFAULT_SETTINGS);

// 创建 X-downloader 特定的设置管理
export function useDownloaderSettings() {
  return settingsHook;
}
