import { useTheme } from "../hooks/useTheme";
import { useI18n } from "../i18n";
import type { MessagePlacement } from "../types";
import { Input } from "./Input";
import { Select } from "./Select";
import { SettingsCard } from "./SettingsCard";

interface GeneralSettingsCardProps {
  placement: MessagePlacement;
  alertDuration: string;
  onPlacementChange: (placement: MessagePlacement) => void;
  onAlertDurationChange: (value: string) => void;
}

/**
 * 各脚本共用的通用设置卡片，目前承载消息提示相关设置。
 * 后续新增共享设置加在这里，所有脚本自动获得。
 */
export function GeneralSettingsCard({
  placement,
  alertDuration,
  onPlacementChange,
  onAlertDurationChange,
}: GeneralSettingsCardProps) {
  const { theme } = useTheme();
  const { t } = useI18n();

  const placements = [
    { value: "top", label: t("common.messagePlacement.top") },
    { value: "bottom", label: t("common.messagePlacement.bottom") },
    { value: "top-left", label: t("common.messagePlacement.topLeft") },
    { value: "top-right", label: t("common.messagePlacement.topRight") },
    { value: "bottom-left", label: t("common.messagePlacement.bottomLeft") },
    { value: "bottom-right", label: t("common.messagePlacement.bottomRight") },
  ];

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
  };

  const selectStyle = {
    width: "100%",
    boxSizing: "border-box",
  };

  return (
    <SettingsCard title={t("common.generalSettings.title")}>
      <div style={fieldStyle}>
        <label style={labelStyle}>{t("common.messagePlacement.label")}</label>
        <Select
          value={placement}
          options={placements}
          onChange={(value) => onPlacementChange(value as MessagePlacement)}
          style={selectStyle}
        />
      </div>

      <div>
        <label style={labelStyle}>{t("common.messageAlertDuration.label")}</label>
        <Input
          value={alertDuration}
          onChange={onAlertDurationChange}
          placeholder={t("common.messageAlertDuration.placeholder")}
        />
        <div style={helpTextStyle}>{t("common.messageAlertDuration.help")}</div>
      </div>
    </SettingsCard>
  );
}
