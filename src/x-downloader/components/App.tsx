import { useState } from "preact/hooks";
import { SettingsButton } from "./SettingsButton";
import { SettingsPanel } from "./SettingsPanel";

export function App() {
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);

  return (
    <>
      <SettingsButton
        onClick={() => setIsSettingsPanelOpen(!isSettingsPanelOpen)}
        isSettingsPanelOpen={isSettingsPanelOpen}
      />
      <SettingsPanel isOpen={isSettingsPanelOpen} onClose={() => setIsSettingsPanelOpen(false)} />
    </>
  );
}
