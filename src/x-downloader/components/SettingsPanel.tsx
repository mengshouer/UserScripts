import { useState } from "preact/hooks";
import { Modal, Button, Input, Checkbox, useTheme } from "../../shared";
import { useDownloaderSettings } from "../hooks/useDownloaderSettings";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

// 在组件外部创建设置管理器实例
const settingsManager = useDownloaderSettings();

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const { theme } = useTheme();

  const [fileName, setFileName] = useState(settingsManager.settings.fileName);
  const [showDownloadButton, setShowDownloadButton] = useState(
    settingsManager.settings.showDownloadButton
  );
  // 视频设置状态
  const [videoFileName, setVideoFileName] = useState(
    settingsManager.settings.videoFileName
  );
  const [showVideoDownloadButton, setShowVideoDownloadButton] = useState(
    settingsManager.settings.showVideoDownloadButton
  );
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle"
  );

  const handleSave = () => {
    setSaveStatus("saving");

    settingsManager.updateSettings({
      fileName,
      showDownloadButton,
      videoFileName,
      showVideoDownloadButton,
    });

    setSaveStatus("saved");
    setTimeout(() => setSaveStatus("idle"), 2000);
  };

  const handleReset = () => {
    const defaultSettings = settingsManager.resetSettings();
    setFileName(defaultSettings.fileName);
    setShowDownloadButton(defaultSettings.showDownloadButton);
    setVideoFileName(defaultSettings.videoFileName);
    setShowVideoDownloadButton(defaultSettings.showVideoDownloadButton);
  };

  const fieldStyle = {
    marginBottom: "16px",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "6px",
    fontWeight: "500",
    color: theme.textColor,
  };

  const helpTextStyle = {
    marginTop: "4px",
    fontSize: "12px",
    color: theme.secondaryTextColor,
  };

  const buttonGroupStyle = {
    display: "flex",
    gap: "12px",
    marginTop: "24px",
  };

  const sectionTitleStyle = {
    fontSize: "16px",
    fontWeight: "600",
    color: theme.textColor,
    marginBottom: "12px",
    marginTop: "20px",
    paddingBottom: "8px",
    borderBottom: `1px solid ${theme.borderColor}`,
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="X(Twitter) Downloader 设置">
      <div>
        {/* 图片下载设置 */}
        <div style={sectionTitleStyle}>图片下载设置</div>

        <div style={fieldStyle}>
          <label style={labelStyle}>图片文件名格式</label>
          <Input
            value={fileName}
            onChange={setFileName}
            placeholder="<%Userid> <%Tid>_p<%PicNo>"
          />
          <div style={helpTextStyle}>
            可用变量：&lt;%Userid&gt;、&lt;%Tid&gt;、&lt;%Time&gt;、&lt;%PicName&gt;、&lt;%PicNo&gt;
          </div>
        </div>

        <div style={fieldStyle}>
          <Checkbox
            checked={showDownloadButton}
            onChange={setShowDownloadButton}
          >
            显示图片下载按钮
          </Checkbox>
        </div>

        {/* 视频下载设置 */}
        <div style={sectionTitleStyle}>视频下载设置</div>

        <div style={fieldStyle}>
          <label style={labelStyle}>视频文件名格式</label>
          <Input
            value={videoFileName}
            onChange={setVideoFileName}
            placeholder="<%Userid> <%Tid>_video_<%Time>"
          />
          <div style={helpTextStyle}>
            可用变量：&lt;%Userid&gt;、&lt;%Tid&gt;、&lt;%Time&gt;
          </div>
        </div>

        <div style={fieldStyle}>
          <Checkbox
            checked={showVideoDownloadButton}
            onChange={setShowVideoDownloadButton}
          >
            显示视频下载按钮
          </Checkbox>
        </div>

        {/* 按钮组 */}
        <div style={buttonGroupStyle}>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={saveStatus === "saving"}
            style={{ flex: 1 }}
          >
            {saveStatus === "saved" ? "已保存" : "保存设置"}
          </Button>
          <Button variant="secondary" onClick={handleReset}>
            重置
          </Button>
        </div>
      </div>
    </Modal>
  );
}
