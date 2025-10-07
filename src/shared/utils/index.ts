import { message } from "./message";
import { i18n } from "../i18n";

/**
 * 复制文本到剪贴板，带自动提示
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    let successful = false;

    if (navigator.clipboard && window.isSecureContext) {
      // 使用现代 Clipboard API
      await navigator.clipboard.writeText(text);
      successful = true;
    } else {
      // 降级方案：使用传统方法
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      successful = document.execCommand("copy");
      document.body.removeChild(textArea);
    }

    // 显示提示消息
    if (successful) {
      message.success(i18n.t("ui.copied"));
    } else {
      message.error(i18n.t("ui.copyFailed"));
    }

    return successful;
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    message.error(i18n.t("ui.copyFailed"));
    return false;
  }
}
