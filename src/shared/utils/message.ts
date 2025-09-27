import { render, h } from "preact";
import { Message } from "../components/Message";

interface MessageConfig {
  type?: "success" | "error" | "warning" | "info";
  content: string;
  duration?: number;
}

class MessageService {
  private container: HTMLElement | null = null;
  private messageCount = 0;

  private getContainer(): HTMLElement {
    if (!this.container) {
      this.container = document.createElement("div");
      this.container.id = "userscript-message-container";
      this.container.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9999;
        pointer-events: none;
      `;
      document.body.appendChild(this.container);
    }
    return this.container;
  }

  private show(config: MessageConfig) {
    const container = this.getContainer();
    const messageId = `userscript-message-${++this.messageCount}`;
    const messageElement = document.createElement("div");
    messageElement.id = messageId;
    messageElement.style.cssText = `
      position: relative;
      margin-bottom: 8px;
      pointer-events: auto;
      animation: messageSlideIn 0.3s ease-out;
    `;

    container.appendChild(messageElement);

    const onClose = () => {
      if (messageElement.parentNode) {
        messageElement.style.animation = "messageSlideOut 0.3s ease-in forwards";
        setTimeout(() => {
          if (messageElement.parentNode) {
            messageElement.parentNode.removeChild(messageElement);
          }
        }, 300);
      }
    };

    render(h(Message, { ...config, onClose }), messageElement);

    return onClose;
  }

  success(content: string, duration?: number) {
    return this.show({ type: "success", content, ...(duration !== undefined && { duration }) });
  }

  error(content: string, duration?: number) {
    return this.show({ type: "error", content, ...(duration !== undefined && { duration }) });
  }

  warning(content: string, duration?: number) {
    return this.show({ type: "warning", content, ...(duration !== undefined && { duration }) });
  }

  info(content: string, duration?: number) {
    return this.show({ type: "info", content, ...(duration !== undefined && { duration }) });
  }

  destroy() {
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
      this.container = null;
    }
  }
}

export const message = new MessageService();

// 添加退出动画的CSS
const style = document.createElement("style");
style.textContent = `
  @keyframes messageSlideOut {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(-100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
