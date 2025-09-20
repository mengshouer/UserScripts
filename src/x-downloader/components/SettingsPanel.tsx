import { Modal, Button, Input, Checkbox, useTheme } from "../../shared";
import { useDownloaderSettings } from "../hooks/useDownloaderSettings";
import { StyleEditor } from "./StyleEditor";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const { theme } = useTheme();
  const settingsManager = useDownloaderSettings();

  const handleReset = () => {
    settingsManager.resetSettings();
  };

  const sectionTitleStyle = {
    fontSize: "16px",
    fontWeight: 600,
    color: theme.textColor,
    marginBottom: "12px",
    marginTop: "20px",
    paddingBottom: "8px",
    borderBottom: `1px solid ${theme.borderColor}`,
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

  const buttonGroupStyle = {
    display: "flex",
    gap: "12px",
    marginTop: "24px",
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="X(Twitter) Downloader 设置">
      <div>
        {/* 图片下载设置 */}
        <div style={sectionTitleStyle}>图片下载设置</div>

        <div style={fieldContainerStyle}>
          <label style={labelStyle}>图片文件名格式</label>
          <Input
            value={settingsManager.settings.fileName}
            onChange={(value) => settingsManager.setSetting("fileName", value)}
            placeholder="<%Userid> <%Tid>_p<%PicNo>"
          />
          <div style={helpTextStyle}>
            可用变量：&lt;%Userid&gt;、&lt;%Tid&gt;、&lt;%Time&gt;、&lt;%PicName&gt;、&lt;%PicNo&gt;
          </div>
        </div>

        <div style={fieldContainerStyle}>
          <Checkbox
            checked={settingsManager.settings.showDownloadButton}
            onChange={(checked) => settingsManager.setSetting("showDownloadButton", checked)}
          >
            显示图片下载按钮
          </Checkbox>
        </div>

        <div style={fieldContainerStyle}>
          <label style={labelStyle}>图片下载按钮 CSS 样式属性</label>
          <StyleEditor
            value={settingsManager.settings.imageButtonStyle}
            onChange={(value) => settingsManager.setSetting("imageButtonStyle", value)}
            placeholder='{\n  "bottom": "8px",\n  "left": "8px"\n}'
          />
        </div>

        {/* 视频下载设置 */}
        <div style={sectionTitleStyle}>视频下载设置</div>

        <div style={fieldContainerStyle}>
          <label style={labelStyle}>视频文件名格式</label>
          <Input
            value={settingsManager.settings.videoFileName}
            onChange={(value) => settingsManager.setSetting("videoFileName", value)}
            placeholder="<%Userid> <%Tid>_video_<%Time>"
          />
          <div style={helpTextStyle}>可用变量：&lt;%Userid&gt;、&lt;%Tid&gt;、&lt;%Time&gt;</div>
        </div>

        <div style={fieldContainerStyle}>
          <Checkbox
            checked={settingsManager.settings.showVideoDownloadButton}
            onChange={(checked) => settingsManager.setSetting("showVideoDownloadButton", checked)}
          >
            显示视频下载按钮
          </Checkbox>
        </div>

        <div style={fieldContainerStyle}>
          <label style={labelStyle}>视频下载按钮 CSS 样式属性</label>
          <StyleEditor
            value={settingsManager.settings.videoButtonStyle}
            onChange={(value) => settingsManager.setSetting("videoButtonStyle", value)}
            placeholder='{\n  "bottom": "50px",\n  "right": "8px"\n}'
          />
        </div>

        {/* 按钮组 */}
        <div style={buttonGroupStyle}>
          <Button variant="secondary" onClick={handleReset}>
            重置为默认设置
          </Button>
        </div>
      </div>
    </Modal>
  );
}
