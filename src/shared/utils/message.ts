import { render, h } from "preact";
import { Message } from "../components/Message";

type MessagePlacement =
  | "top"
  | "bottom"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

const getUserMessagePlacement = (): MessagePlacement => {
  try {
    const settings = JSON.parse(localStorage.getItem("x-downloader-settings") || "{}");
    return settings.messagePlacement || "top";
  } catch {
    return "top";
  }
};

interface MessageConfig {
  type?: "success" | "error" | "warning" | "info";
  content: string;
  duration?: number;
  placement?: MessagePlacement;
}

// 模块级状态
const containers = new Map<MessagePlacement, HTMLElement>();
let messageCount = 0;

const getPositionStyle = (placement: MessagePlacement): string => {
  const [vertical, horizontal] = placement.split("-") as ["top" | "bottom", string?];
  const isBottom = vertical === "bottom";
  const direction = isBottom ? "column-reverse" : "column";

  let position = `${vertical}: 20px; display: flex; flex-direction: ${direction};`;

  if (horizontal) {
    position += ` ${horizontal}: 20px;`;
  } else {
    position += " left: 50%; transform: translateX(-50%);";
  }

  return position;
};

const getContainer = (placement: MessagePlacement = "top"): HTMLElement => {
  if (!containers.has(placement)) {
    const container = document.createElement("div");
    container.id = `userscript-message-container-${placement}`;
    container.style.cssText = `
      position: fixed;
      z-index: 9999;
      pointer-events: none;
      ${getPositionStyle(placement)}
    `;
    document.body.appendChild(container);
    containers.set(placement, container);
  }
  return containers.get(placement)!;
};

const show = (config: MessageConfig) => {
  const placement = config.placement || "top";
  const container = getContainer(placement);
  const messageId = `userscript-message-${++messageCount}`;
  const messageElement = document.createElement("div");
  messageElement.id = messageId;
  const isBottom = placement.startsWith("bottom");
  messageElement.style.cssText = `
    position: relative;
    margin-bottom: 8px;
    pointer-events: auto;
    animation: ${isBottom ? "messageSlideInBottom" : "messageSlideIn"} 0.3s ease-out;
  `;

  container.appendChild(messageElement);

  const onClose = () => {
    if (messageElement.parentNode) {
      const isBottom = placement.startsWith("bottom");
      messageElement.style.animation = `${isBottom ? "messageSlideOutBottom" : "messageSlideOut"} 0.3s ease-in forwards`;
      setTimeout(() => {
        if (messageElement.parentNode) {
          messageElement.parentNode.removeChild(messageElement);
        }
      }, 300);
    }
  };

  render(h(Message, { ...config, onClose }), messageElement);
  return onClose;
};

const createMessageMethod =
  (type: "success" | "error" | "warning" | "info") =>
  (content: string, duration?: number, placement?: MessagePlacement) =>
    show({
      type,
      content,
      placement: placement || getUserMessagePlacement(),
      ...(duration !== undefined && { duration }),
    });

const success = createMessageMethod("success");
const error = createMessageMethod("error");
const warning = createMessageMethod("warning");
const info = createMessageMethod("info");

const destroy = () => {
  containers.forEach((container) => {
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
  });
  containers.clear();
};

export const message = { success, error, warning, info, destroy };

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

  @keyframes messageSlideOutBottom {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(100%);
      opacity: 0;
    }
  }

  @keyframes messageSlideInBottom {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);
