import { useState } from "preact/hooks";
import { SettingsButton } from "./SettingsButton";
import { SettingsPanel } from "./SettingsPanel";

export function App() {
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);

  const handleToggleSettings = () => {
    setIsSettingsPanelOpen(!isSettingsPanelOpen);
  };

  const handleCloseSettings = () => {
    setIsSettingsPanelOpen(false);
  };

  return (
    <>
      <SettingsButton onClick={handleToggleSettings} isSettingsPanelOpen={isSettingsPanelOpen} />
      <SettingsPanel isOpen={isSettingsPanelOpen} onClose={handleCloseSettings} />
    </>
  );
}
