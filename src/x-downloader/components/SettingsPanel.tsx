import { useState } from "preact/hooks";
import {
  Modal,
  Button,
  Input,
  Checkbox,
  LanguageSelector,
  MessagePlacementSelector,
  SettingsCard,
  useTheme,
} from "../../shared";
import { useDownloaderSettings } from "../hooks/useDownloaderSettings";
import { useI18n } from "../i18n";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const { settings, setSetting, resetSettings } = useDownloaderSettings();
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

          <Checkbox
            checked={settings.showDownloadButton}
            onChange={(checked) => setSetting("showDownloadButton", checked)}
          >
            {t("settings.image.showButton")}
          </Checkbox>
        </SettingsCard>

        {/* 视频下载设置卡片 */}
        <SettingsCard title={t("settings.video.title")}>
          <div style={fieldStyle}>
            <label style={labelStyle}>{t("settings.video.fileName")}</label>
            <Input
              value={settings.videoFileName}
              onChange={(value) => setSetting("videoFileName", value)}
              placeholder={t("settings.video.fileNamePlaceholder")}
            />
            <div style={{ marginTop: "6px", fontSize: "12px", color: theme.secondaryTextColor }}>
              {t("settings.video.fileNameHelp")}
            </div>
          </div>

          <Checkbox
            checked={settings.showVideoDownloadButton}
            onChange={(checked) => setSetting("showVideoDownloadButton", checked)}
          >
            {t("settings.video.showButton")}
          </Checkbox>
        </SettingsCard>

        {/* 通用下载设置卡片 */}
        <SettingsCard title={t("settings.universal.title")}>
          <div>
            <Checkbox
              checked={settings.showUniversalDownloadButton}
              onChange={(checked) => setSetting("showUniversalDownloadButton", checked)}
            >
              {t("settings.universal.showButton")}
            </Checkbox>
            <div style={helpTextStyle}>{t("settings.universal.showButtonHelp")}</div>
          </div>

          <div style={{ marginTop: "16px" }}>
            <Checkbox
              checked={settings.autoLikeOnDownload}
              onChange={(checked) => setSetting("autoLikeOnDownload", checked)}
            >
              {t("settings.universal.autoLike")}
            </Checkbox>
            <div style={helpTextStyle}>{t("settings.universal.autoLikeHelp")}</div>
          </div>
        </SettingsCard>

        {/* 按钮位置设置卡片 */}
        <SettingsCard title={t("settings.position.title")}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
              <div style={{ flex: "1", minWidth: "120px" }}>
                <label style={labelStyle}>{t("settings.position.vertical")}</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <Button
                    variant={settings.buttonPositionVertical === "top" ? "primary" : "secondary"}
                    size="small"
                    onClick={() => setSetting("buttonPositionVertical", "top")}
                  >
                    {t("settings.position.top")}
                  </Button>
                  <Button
                    variant={settings.buttonPositionVertical === "bottom" ? "primary" : "secondary"}
                    size="small"
                    onClick={() => setSetting("buttonPositionVertical", "bottom")}
                  >
                    {t("settings.position.bottom")}
                  </Button>
                </div>
              </div>
              <div style={{ flex: "1", minWidth: "120px" }}>
                <label style={labelStyle}>{t("settings.position.verticalValue")}</label>
                <Input
                  value={settings.buttonPositionVerticalValue as string}
                  onChange={(value) => setSetting("buttonPositionVerticalValue", value)}
                  placeholder="8"
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
              <div style={{ flex: "1", minWidth: "120px" }}>
                <label style={labelStyle}>{t("settings.position.horizontal")}</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <Button
                    variant={settings.buttonPositionHorizontal === "left" ? "primary" : "secondary"}
                    size="small"
                    onClick={() => setSetting("buttonPositionHorizontal", "left")}
                  >
                    {t("settings.position.left")}
                  </Button>
                  <Button
                    variant={
                      settings.buttonPositionHorizontal === "right" ? "primary" : "secondary"
                    }
                    size="small"
                    onClick={() => setSetting("buttonPositionHorizontal", "right")}
                  >
                    {t("settings.position.right")}
                  </Button>
                </div>
              </div>
              <div style={{ flex: "1", minWidth: "120px" }}>
                <label style={labelStyle}>{t("settings.position.horizontalValue")}</label>
                <Input
                  value={settings.buttonPositionHorizontalValue as string}
                  onChange={(value) => setSetting("buttonPositionHorizontalValue", value)}
                  placeholder="8"
                />
              </div>
            </div>

            <div style={{ fontSize: "12px", color: theme.secondaryTextColor }}>
              {t("settings.position.valueHelp")}
            </div>
          </div>
        </SettingsCard>
      </div>
    </Modal>
  );
}
