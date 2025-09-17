import { createSettingsHook } from "../../shared/hooks/useSettings";
import { DownloaderSettings } from "../../shared/types";

const DEFAULT_SETTINGS: DownloaderSettings = {
  fileName: "<%Userid> <%Tid>_p<%PicNo>",
  showDownloadButton: true,
  // 视频相关设置
  videoFileName: "<%Userid> <%Tid>",
  showVideoDownloadButton: true,
};

const STORAGE_KEY = "x-downloader-settings";

// 创建 X-downloader 特定的设置管理
export function useDownloaderSettings() {
  return createSettingsHook(STORAGE_KEY, DEFAULT_SETTINGS);
}
