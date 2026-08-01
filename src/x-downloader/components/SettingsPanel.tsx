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
import { useDownloaderSettings } from "../hooks/useDownloaderSettings";
import { useI18n } from "../i18n";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const { settings, setSetting, resetSettings } = useDownloaderSettings();
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
              checked={settings.showFollowBadge}
              onChange={(checked) => setSetting("showFollowBadge", checked)}
            >
              {t("settings.universal.showFollowBadge")}
            </Checkbox>
            <div style={helpTextStyle}>{t("settings.universal.showFollowBadgeHelp")}</div>
          </div>

          <div style={{ marginTop: "16px" }}>
            <Checkbox
              checked={settings.downloadOnManualLike}
              onChange={(checked) => setSetting("downloadOnManualLike", checked)}
            >
              {t("settings.universal.downloadOnManualLike")}
            </Checkbox>
            <div style={helpTextStyle}>{t("settings.universal.downloadOnManualLikeHelp")}</div>
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

          <div style={{ marginTop: "16px" }}>
            <Checkbox
              checked={settings.autoLikeApiFallback}
              onChange={(checked) => setSetting("autoLikeApiFallback", checked)}
            >
              {t("settings.universal.autoLikeApiFallback")}
            </Checkbox>
            <div style={helpTextStyle}>{t("settings.universal.autoLikeApiFallbackHelp")}</div>
          </div>

          <div style={{ marginTop: "16px" }}>
            <Checkbox
              checked={settings.hideEditImageButton}
              onChange={(checked) => setSetting("hideEditImageButton", checked)}
            >
              {t("settings.universal.hideEditImage")}
            </Checkbox>
            <div style={helpTextStyle}>{t("settings.universal.hideEditImageHelp")}</div>
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
          onChange={(key, value) => setSetting(key, value as never)}
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
