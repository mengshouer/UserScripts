import { Modal, Button, Input, Checkbox, useTheme } from "../../shared";
import { useDownloaderSettings } from "../hooks/useDownloaderSettings";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const { theme } = useTheme();
  const { settings, setSetting, resetSettings } = useDownloaderSettings();

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
            value={settings.fileName}
            onChange={(value) => setSetting("fileName", value)}
            placeholder="<%Userid> <%Tid>_p<%PicNo>"
          />
          <div style={helpTextStyle}>
            可用变量：&lt;%Userid&gt;、&lt;%Tid&gt;、&lt;%Time&gt;、&lt;%PicName&gt;、&lt;%PicNo&gt;
          </div>
        </div>

        <div style={fieldContainerStyle}>
          <Checkbox
            checked={settings.showDownloadButton}
            onChange={(checked) => setSetting("showDownloadButton", checked)}
          >
            显示图片下载按钮
          </Checkbox>
        </div>

        {/* 视频下载设置 */}
        <div style={sectionTitleStyle}>视频下载设置</div>

        <div style={fieldContainerStyle}>
          <label style={labelStyle}>视频文件名格式</label>
          <Input
            value={settings.videoFileName}
            onChange={(value) => setSetting("videoFileName", value)}
            placeholder="<%Userid> <%Tid>_video_<%Time>"
          />
          <div style={helpTextStyle}>可用变量：&lt;%Userid&gt;、&lt;%Tid&gt;、&lt;%Time&gt;</div>
        </div>

        <div style={fieldContainerStyle}>
          <Checkbox
            checked={settings.showVideoDownloadButton}
            onChange={(checked) => setSetting("showVideoDownloadButton", checked)}
          >
            显示视频下载按钮
          </Checkbox>
        </div>

        {/* 通用下载设置 */}
        <div style={sectionTitleStyle}>通用下载设置</div>

        <div style={fieldContainerStyle}>
          <Checkbox
            checked={settings.showUniversalDownloadButton}
            onChange={(checked) => setSetting("showUniversalDownloadButton", checked)}
          >
            显示通用下载按钮
          </Checkbox>
          <div style={helpTextStyle}>在推文操作栏中显示统一的下载按钮，自动检测媒体类型</div>
        </div>

        <div style={fieldContainerStyle}>
          <Checkbox
            checked={settings.autoLikeOnDownload}
            onChange={(checked) => setSetting("autoLikeOnDownload", checked)}
          >
            下载时自动点赞
          </Checkbox>
          <div style={helpTextStyle}>下载图片或视频时自动为推文点赞</div>
        </div>

        {/* 按钮组 */}
        <div style={buttonGroupStyle}>
          <Button
            variant="secondary"
            onClick={() => {
              resetSettings();
            }}
          >
            重置为默认设置
          </Button>
        </div>
      </div>
    </Modal>
  );
}
