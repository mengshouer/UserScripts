import { useState, useEffect } from "preact/hooks";
import { SettingsButton, OPEN_SETTINGS_EVENT } from "../../shared";
import { SettingsPanel } from "./SettingsPanel";

export function App() {
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);
  const [isMouseNearLeft, setIsMouseNearLeft] = useState(false);

  useEffect(() => {
    // 监听鼠标移动，判断是否展示设置按钮
    const handleMouseMove = (e: MouseEvent) => {
      // 距离左边缘100px，距离底部 1 / 3 屏幕高度
      const isNear = e.clientX < 100 && e.clientY > window.innerHeight * (2 / 3);
      setIsMouseNearLeft(isNear);
    };

    // 监听油猴菜单打开设置面板事件
    const handleOpenSettings = () => setIsSettingsPanelOpen(true);

    document.addEventListener("mousemove", handleMouseMove);
    window.addEventListener(OPEN_SETTINGS_EVENT, handleOpenSettings);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener(OPEN_SETTINGS_EVENT, handleOpenSettings);
    };
  }, []);

  const isVisible = isMouseNearLeft || isSettingsPanelOpen;

  return (
    <>
      <SettingsButton
        onClick={() => setIsSettingsPanelOpen(!isSettingsPanelOpen)}
        isVisible={isVisible}
        backgroundColor="#1da1f2"
      />
      <SettingsPanel isOpen={isSettingsPanelOpen} onClose={() => setIsSettingsPanelOpen(false)} />
    </>
  );
}
