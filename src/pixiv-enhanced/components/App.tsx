import { useState, useEffect, useRef } from "preact/hooks";
import { SettingsButton, OPEN_SETTINGS_EVENT } from "../../shared";
import { SettingsPanel } from "./SettingsPanel";
import { DownloadAllButton } from "./DownloadAllButton";
import { extractArtworkInfo } from "../utils/pixivParser";
import type { PixivArtworkInfo } from "../types";

export function App() {
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);
  const [isMouseNearLeft, setIsMouseNearLeft] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [artworkInfo, setArtworkInfo] = useState<PixivArtworkInfo | null>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    // 监听鼠标移动，判断是否展示设置按钮（使用 RAF 节流）
    const handleMouseMove = (e: MouseEvent) => {
      if (rafIdRef.current !== null) return;
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;
        const isNear = e.clientX < 100 && e.clientY > window.innerHeight * (2 / 3);
        setIsMouseNearLeft(isNear);
      });
    };

    // 监听油猴菜单打开设置面板事件
    const handleOpenSettings = () => setIsSettingsPanelOpen(true);

    document.addEventListener("mousemove", handleMouseMove);
    window.addEventListener(OPEN_SETTINGS_EVENT, handleOpenSettings);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener(OPEN_SETTINGS_EVENT, handleOpenSettings);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  // 获取作品信息
  useEffect(() => {
    extractArtworkInfo().then(setArtworkInfo);
  }, []);

  const isVisible = isMouseNearLeft || isSettingsPanelOpen || isDownloading;

  return (
    <>
      {artworkInfo && (
        <DownloadAllButton
          artworkInfo={artworkInfo}
          isVisible={isVisible}
          onDownloadingChange={setIsDownloading}
        />
      )}
      <SettingsButton
        onClick={() => setIsSettingsPanelOpen(true)}
        isVisible={isVisible}
        backgroundColor="#0096fa"
      />
      <SettingsPanel isOpen={isSettingsPanelOpen} onClose={() => setIsSettingsPanelOpen(false)} />
    </>
  );
}
