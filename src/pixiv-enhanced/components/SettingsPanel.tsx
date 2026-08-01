import { useState } from "preact/hooks";
import {
  Modal,
  Input,
  Checkbox,
  GeneralSettingsCard,
  LanguageToggleButton,
  ResetSettingsButton,
  SettingsCard,
  ButtonPositionSettings,
  useTheme,
} from "../../shared";
import { usePixivDownloaderSettings } from "../hooks/usePixivDownloaderSettings";
import { useI18n } from "../i18n";
import type { PixivDownloaderSettings } from "../types";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const { settings, setSetting, resetSettings } = usePixivDownloaderSettings();
  const { t } = useI18n();
  const { theme } = useTheme();
  const [resetKey, setResetKey] = useState(0);

  const fieldStyle = {
    marginBottom: "20px",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontWeight: 500,
    fontSize: "14px",
    color: theme.textColor,
  };

  const helpTextStyle = {
    marginTop: "6px",
    fontSize: "12px",
    color: theme.secondaryTextColor,
    paddingLeft: "24px",
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t("title")}
      headerActions={<LanguageToggleButton />}
    >
      <div key={resetKey}>
        {/* 通用设置卡片 */}
        <GeneralSettingsCard
          placement={settings.messagePlacement}
          alertDuration={settings.messageAlertDuration}
          onPlacementChange={(placement) => setSetting("messagePlacement", placement)}
          onAlertDurationChange={(value) => setSetting("messageAlertDuration", value)}
        />

        {/* 图片下载设置卡片 */}
        <SettingsCard title={t("settings.image.title")}>
          <div style={fieldStyle}>
            <label style={labelStyle}>{t("settings.image.fileName")}</label>
            <Input
              value={settings.fileName}
              onChange={(value) => setSetting("fileName", value)}
              placeholder={t("settings.image.fileNamePlaceholder")}
            />
            <div style={{ marginTop: "6px", fontSize: "12px", color: theme.secondaryTextColor }}>
              {t("settings.image.fileNameHelp")}
            </div>
          </div>

          <div>
            <Checkbox
              checked={settings.showHoverButton}
              onChange={(checked) => setSetting("showHoverButton", checked)}
            >
              {t("settings.image.showHoverButton")}
            </Checkbox>
            <div style={helpTextStyle}>{t("settings.image.showHoverButtonHelp")}</div>
          </div>
        </SettingsCard>

        {/* 按钮位置设置卡片 */}
        <ButtonPositionSettings
          values={{
            buttonPositionVertical: settings.buttonPositionVertical,
            buttonPositionHorizontal: settings.buttonPositionHorizontal,
            buttonPositionVerticalValue: settings.buttonPositionVerticalValue,
            buttonPositionHorizontalValue: settings.buttonPositionHorizontalValue,
          }}
          onChange={(key, value) => {
            setSetting(key, value as PixivDownloaderSettings[typeof key]);
          }}
        />

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <ResetSettingsButton
            onReset={() => {
              resetSettings();
              setResetKey((prev) => prev + 1);
            }}
          />
        </div>
      </div>
    </Modal>
  );
}
