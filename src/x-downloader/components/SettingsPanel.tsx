import { Modal, Button, Input, Checkbox, LanguageSelector, useTheme } from "../../shared";
import { useDownloaderSettings } from "../hooks/useDownloaderSettings";
import { useI18n } from "../i18n";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const { theme, isDark } = useTheme();
  const { settings, setSetting, resetSettings } = useDownloaderSettings();
  const { t } = useI18n();

  const sectionTitleStyle = {
    fontSize: "16px",
    fontWeight: 600,
    color: theme.textColor,
    marginBottom: "12px",
    marginTop: "20px",
    padding: "8px 12px",
    backgroundColor: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.03)",
    borderRadius: "4px",
  };

  const fieldContainerStyle = {
    marginBottom: "16px",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "6px",
    fontWeight: 500,
    color: theme.textColor,
  };

  const helpTextStyle = {
    marginTop: "4px",
    fontSize: "12px",
    color: theme.secondaryTextColor,
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t("title")}>
      <div>
        {/* 语言设置和重置按钮 */}
        <div
          style={{
            height: "max-content",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 0",
            borderTop: `1px solid ${theme.borderColor}`,
            borderBottom: `1px solid ${theme.borderColor}`,
          }}
        >
          <LanguageSelector />
          <Button
            variant="secondary"
            onClick={() => {
              resetSettings();
            }}
          >
            {t("settings.reset")}
          </Button>
        </div>

        {/* 图片下载设置 */}
        <div style={sectionTitleStyle}>{t("settings.image.title")}</div>

        <div style={fieldContainerStyle}>
          <label style={labelStyle}>{t("settings.image.fileName")}</label>
          <Input
            value={settings.fileName}
            onChange={(value) => setSetting("fileName", value)}
            placeholder={t("settings.image.fileNamePlaceholder")}
          />
          <div style={helpTextStyle}>{t("settings.image.fileNameHelp")}</div>
        </div>

        <div style={fieldContainerStyle}>
          <Checkbox
            checked={settings.showDownloadButton}
            onChange={(checked) => setSetting("showDownloadButton", checked)}
          >
            {t("settings.image.showButton")}
          </Checkbox>
        </div>

        {/* 视频下载设置 */}
        <div style={sectionTitleStyle}>{t("settings.video.title")}</div>

        <div style={fieldContainerStyle}>
          <label style={labelStyle}>{t("settings.video.fileName")}</label>
          <Input
            value={settings.videoFileName}
            onChange={(value) => setSetting("videoFileName", value)}
            placeholder={t("settings.video.fileNamePlaceholder")}
          />
          <div style={helpTextStyle}>{t("settings.video.fileNameHelp")}</div>
        </div>

        <div style={fieldContainerStyle}>
          <Checkbox
            checked={settings.showVideoDownloadButton}
            onChange={(checked) => setSetting("showVideoDownloadButton", checked)}
          >
            {t("settings.video.showButton")}
          </Checkbox>
        </div>

        {/* 通用下载设置 */}
        <div style={sectionTitleStyle}>{t("settings.universal.title")}</div>

        <div style={fieldContainerStyle}>
          <Checkbox
            checked={settings.showUniversalDownloadButton}
            onChange={(checked) => setSetting("showUniversalDownloadButton", checked)}
          >
            {t("settings.universal.showButton")}
          </Checkbox>
          <div style={helpTextStyle}>{t("settings.universal.showButtonHelp")}</div>
        </div>

        <div style={fieldContainerStyle}>
          <Checkbox
            checked={settings.autoLikeOnDownload}
            onChange={(checked) => setSetting("autoLikeOnDownload", checked)}
          >
            {t("settings.universal.autoLike")}
          </Checkbox>
          <div style={helpTextStyle}>{t("settings.universal.autoLikeHelp")}</div>
        </div>
      </div>
    </Modal>
  );
}
