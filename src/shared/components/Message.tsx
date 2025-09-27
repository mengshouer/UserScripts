import { useEffect, useRef } from "preact/hooks";
import { styled } from "../utils/goober-setup";

interface MessageProps {
  readonly type?: "success" | "error" | "warning" | "info";
  readonly content: string;
  readonly duration?: number;
  readonly onClose?: () => void;
  readonly className?: string;
  readonly style?: Record<string, string | number>;
}

const MessageContainer = styled("div")`
  position: relative;
  min-width: 250px;
  max-width: 400px;
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 14px;
  line-height: 1.4;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  color: #fff;

  @keyframes messageSlideIn {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  &.message-success {
    background-color: rgba(34, 197, 94, 0.4);
    border: 1px solid rgba(34, 197, 94, 0.7);
  }

  &.message-error {
    background-color: rgba(239, 68, 68, 0.4);
    border: 1px solid rgba(239, 68, 68, 0.7);
  }

  &.message-warning {
    background-color: rgba(245, 158, 11, 0.4);
    border: 1px solid rgba(245, 158, 11, 0.7);
  }

  &.message-info {
    background-color: rgba(59, 130, 246, 0.4);
    border: 1px solid rgba(59, 130, 246, 0.7);
  }
`;

const CloseIcon = styled("span")`
  float: right;
  margin-left: 8px;
  font-weight: bold;
  opacity: 0.7;
  font-size: 16px;
  line-height: 1;

  &:hover {
    opacity: 1;
  }
`;

export function Message({
  type = "info",
  content,
  duration = 3000,
  onClose,
  className,
  style,
}: MessageProps) {
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const remainingTimeRef = useRef<number>(duration);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const startTimer = (time: number) => {
    clearTimer();
    if (time > 0) {
      startTimeRef.current = Date.now();
      timerRef.current = window.setTimeout(() => {
        onClose?.();
      }, time);
    }
  };

  const pauseTimer = () => {
    if (timerRef.current) {
      const elapsed = Date.now() - startTimeRef.current;
      remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
      clearTimer();
    }
  };

  const resumeTimer = () => {
    if (remainingTimeRef.current > 0) {
      startTimer(remainingTimeRef.current);
    }
  };

  useEffect(() => {
    if (duration > 0) {
      remainingTimeRef.current = duration;
      startTimer(duration);
    }

    return clearTimer;
  }, [duration, onClose]);

  return (
    <MessageContainer
      className={`message-${type} ${className || ""}`}
      style={style}
      onClick={() => onClose?.()}
      onMouseEnter={() => pauseTimer()}
      onMouseLeave={() => resumeTimer()}
    >
      {content}
      <CloseIcon>×</CloseIcon>
    </MessageContainer>
  );
}
