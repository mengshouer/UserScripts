import { useState } from "preact/hooks";
import { Modal, Button, Input, Checkbox, useTheme, styled } from "../../shared";
import { useDownloaderSettings } from "../hooks/useDownloaderSettings";
import { StyleEditor } from "./StyleEditor";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SectionTitle = styled("div")`
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 12px;
  margin-top: 20px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border-color);
`;

const FieldContainer = styled("div")`
  margin-bottom: 16px;
`;

const Label = styled("label")`
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: var(--text-color);
`;

const HelpText = styled("div")`
  margin-top: 4px;
  font-size: 12px;
  color: var(--secondary-text-color);
`;

const ButtonGroup = styled("div")`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

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
  // 按钮样式设置状态
  const [imageButtonStyle, setImageButtonStyle] = useState(
    settingsManager.settings.imageButtonStyle
  );
  const [videoButtonStyle, setVideoButtonStyle] = useState(
    settingsManager.settings.videoButtonStyle
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
      imageButtonStyle,
      videoButtonStyle,
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
    setImageButtonStyle(defaultSettings.imageButtonStyle);
    setVideoButtonStyle(defaultSettings.videoButtonStyle);
  };

  // 使用 CSS 变量传递主题值
  const themeVariables = {
    "--text-color": theme.textColor,
    "--secondary-text-color": theme.secondaryTextColor,
    "--border-color": theme.borderColor,
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="X(Twitter) Downloader 设置">
      <div style={themeVariables}>
        {/* 图片下载设置 */}
        <SectionTitle>图片下载设置</SectionTitle>

        <FieldContainer>
          <Label>图片文件名格式</Label>
          <Input
            value={fileName}
            onChange={setFileName}
            placeholder="<%Userid> <%Tid>_p<%PicNo>"
          />
          <HelpText>
            可用变量：&lt;%Userid&gt;、&lt;%Tid&gt;、&lt;%Time&gt;、&lt;%PicName&gt;、&lt;%PicNo&gt;
          </HelpText>
        </FieldContainer>

        <FieldContainer>
          <Checkbox
            checked={showDownloadButton}
            onChange={setShowDownloadButton}
          >
            显示图片下载按钮
          </Checkbox>
        </FieldContainer>

        <FieldContainer>
          <Label>图片下载按钮 CSS 样式属性</Label>
          <StyleEditor
            value={imageButtonStyle}
            onChange={setImageButtonStyle}
            placeholder='{\n  "bottom": "8px",\n  "left": "8px"\n}'
          />
        </FieldContainer>

        {/* 视频下载设置 */}
        <SectionTitle>视频下载设置</SectionTitle>

        <FieldContainer>
          <Label>视频文件名格式</Label>
          <Input
            value={videoFileName}
            onChange={setVideoFileName}
            placeholder="<%Userid> <%Tid>_video_<%Time>"
          />
          <HelpText>
            可用变量：&lt;%Userid&gt;、&lt;%Tid&gt;、&lt;%Time&gt;
          </HelpText>
        </FieldContainer>

        <FieldContainer>
          <Checkbox
            checked={showVideoDownloadButton}
            onChange={setShowVideoDownloadButton}
          >
            显示视频下载按钮
          </Checkbox>
        </FieldContainer>

        <FieldContainer>
          <Label>视频下载按钮 CSS 样式属性</Label>
          <StyleEditor
            value={videoButtonStyle}
            onChange={setVideoButtonStyle}
            placeholder='{\n  "bottom": "50px",\n  "right": "8px"\n}'
          />
        </FieldContainer>

        {/* 按钮组 */}
        <ButtonGroup>
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
        </ButtonGroup>
      </div>
    </Modal>
  );
}
