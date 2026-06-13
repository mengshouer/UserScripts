import { i18n, message } from "../../shared";

/**
 * 统一的错误处理函数
 */
export function handleDownloadError(
  error: unknown,
  prefix: string = i18n.t("messages.downloadFailed"),
): void {
  console.error(`${prefix}:`, error);
  const errorMessage = error instanceof Error ? error.message : String(error);
  message.error(`${prefix}: ${errorMessage}`);
}
