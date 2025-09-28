import { useTheme } from "../hooks/useTheme";
import { useI18n } from "../i18n";
import { Select } from "./Select";

export type MessagePlacement =
  | "top"
  | "bottom"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

interface MessagePlacementSelectorProps {
  value: MessagePlacement;
  onChange: (placement: MessagePlacement) => void;
  className?: string;
  style?: {
    [key: string]: string | number;
  };
}

export function MessagePlacementSelector({
  value,
  onChange,
  className,
  style,
}: MessagePlacementSelectorProps) {
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

  const handlePlacementChange = (newValue: string) => {
    onChange(newValue as MessagePlacement);
  };

  return (
    <div
      className={className}
      style={{ display: "flex", alignItems: "center", gap: "8px", ...style }}
    >
      <label
        style={{
          fontSize: "14px",
          fontWeight: 500,
          color: theme.textColor,
          marginBottom: "0",
        }}
      >
        {t("common.messagePlacement.label")}:
      </label>
      <Select value={value} options={placements} onChange={handlePlacementChange} />
    </div>
  );
}
