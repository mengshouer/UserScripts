import { useState, useEffect } from "preact/hooks";

interface SettingsButtonProps {
  onClick: () => void;
  isSettingsPanelOpen: boolean;
}

export function SettingsButton({
  onClick,
  isSettingsPanelOpen,
}: SettingsButtonProps) {
  const [isMouseNearLeft, setIsMouseNearLeft] = useState(false);

  // 监听鼠标移动，判断是否展示设置按钮
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // 距离左边缘100px，距离底部 1 / 3 屏幕高度
      const isNear =
        e.clientX < 100 && e.clientY > window.innerHeight * (2 / 3);
      setIsMouseNearLeft(isNear);
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const buttonStyle = {
    position: "fixed" as const,
    left: isMouseNearLeft || isSettingsPanelOpen ? "10px" : "-40px",
    bottom: "20px",
    width: "40px",
    height: "40px",
    backgroundColor: "#1da1f2",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    zIndex: 10000,
    color: "white",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
    transition: "left 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    opacity: 0.9,
    border: "none",
  };

  const handleMouseEnter = (e: MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.style.opacity = "1";
    target.style.transform = "scale(1.05)";
  };

  const handleMouseLeave = (e: MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.style.opacity = "0.9";
    target.style.transform = "scale(1)";
  };

  return (
    <button
      style={buttonStyle}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
      </svg>
    </button>
  );
}
