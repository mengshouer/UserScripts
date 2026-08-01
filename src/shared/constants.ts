/**
 * 共享常量
 */

import type { SharedMessageSettings } from "./types";

// 存储 key
export const STORAGE_KEY = "m-userscript-settings";

// 事件名
export const OPEN_SETTINGS_EVENT = "m-open-settings-panel";
export const SETTINGS_CHANGE_EVENT = `${STORAGE_KEY}-changed`;

// 消息提示共享设置的默认值，各脚本在自己的 DEFAULT_SETTINGS 中展开
export const DEFAULT_MESSAGE_SETTINGS: SharedMessageSettings = {
  messagePlacement: "top",
  messageAlertDuration: "3000",
};
