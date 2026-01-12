import { useState } from "preact/hooks";
import {
  Modal,
  Button,
  Input,
  Checkbox,
  LanguageSelector,
  MessagePlacementSelector,
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
  const { theme, isDark } = useTheme();
  const [resetKey, setResetKey] = useState(0);

  const toolbarStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap" as const,
    gap: "16px",
    padding: "16px",
    marginBottom: "20px",
    background: isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(0, 0, 0, 0.01)",
    border: `1px solid ${theme.borderColor}`,
    borderRadius: "8px",
  };

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
    <Modal isOpen={isOpen} onClose={onClose} title={t("title")}>
      <div key={resetKey}>
        {/* 顶部工具栏 */}
        <div style={toolbarStyle}>
          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              flexWrap: "wrap",
              flex: "1",
              minWidth: "0",
            }}
          >
            <LanguageSelector />
            <MessagePlacementSelector
              value={settings.messagePlacement}
              onChange={(placement) => setSetting("messagePlacement", placement)}
            />
          </div>
          <Button
            variant="secondary"
            style={{ flexShrink: 0 }}
            onClick={() => {
              resetSettings();
              setResetKey((prev) => prev + 1);
            }}
          >
            {t("settings.reset")}
          </Button>
        </div>

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
      </div>
    </Modal>
  );
}
