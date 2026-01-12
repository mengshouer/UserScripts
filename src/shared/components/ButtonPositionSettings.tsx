import { Button } from "./Button";
import { Input } from "./Input";
import { SettingsCard } from "./SettingsCard";
import { useTheme } from "../hooks/useTheme";
import { useI18n } from "../i18n";

export interface ButtonPositionValues {
  buttonPositionVertical: "top" | "bottom";
  buttonPositionHorizontal: "left" | "right";
  buttonPositionVerticalValue: string;
  buttonPositionHorizontalValue: string;
}

export interface ButtonPositionSettingsProps {
  values: ButtonPositionValues;
  onChange: <K extends keyof ButtonPositionValues>(key: K, value: ButtonPositionValues[K]) => void;
}

export function ButtonPositionSettings({ values, onChange }: ButtonPositionSettingsProps) {
  const { theme } = useTheme();
  const { t } = useI18n();

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontWeight: 500,
    fontSize: "14px",
    color: theme.textColor,
  };

  return (
    <SettingsCard title={t("settings.position.title")}>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          <div style={{ flex: "1", minWidth: "120px" }}>
            <label style={labelStyle}>{t("settings.position.vertical")}</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <Button
                variant={values.buttonPositionVertical === "top" ? "primary" : "secondary"}
                size="small"
                onClick={() => onChange("buttonPositionVertical", "top")}
              >
                {t("settings.position.top")}
              </Button>
              <Button
                variant={values.buttonPositionVertical === "bottom" ? "primary" : "secondary"}
                size="small"
                onClick={() => onChange("buttonPositionVertical", "bottom")}
              >
                {t("settings.position.bottom")}
              </Button>
            </div>
          </div>
          <div style={{ flex: "1", minWidth: "120px" }}>
            <label style={labelStyle}>{t("settings.position.verticalValue")}</label>
            <Input
              value={values.buttonPositionVerticalValue}
              onChange={(value) => onChange("buttonPositionVerticalValue", value)}
              placeholder="8"
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          <div style={{ flex: "1", minWidth: "120px" }}>
            <label style={labelStyle}>{t("settings.position.horizontal")}</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <Button
                variant={values.buttonPositionHorizontal === "left" ? "primary" : "secondary"}
                size="small"
                onClick={() => onChange("buttonPositionHorizontal", "left")}
              >
                {t("settings.position.left")}
              </Button>
              <Button
                variant={values.buttonPositionHorizontal === "right" ? "primary" : "secondary"}
                size="small"
                onClick={() => onChange("buttonPositionHorizontal", "right")}
              >
                {t("settings.position.right")}
              </Button>
            </div>
          </div>
          <div style={{ flex: "1", minWidth: "120px" }}>
            <label style={labelStyle}>{t("settings.position.horizontalValue")}</label>
            <Input
              value={values.buttonPositionHorizontalValue}
              onChange={(value) => onChange("buttonPositionHorizontalValue", value)}
              placeholder="8"
            />
          </div>
        </div>

        <div style={{ fontSize: "12px", color: theme.secondaryTextColor }}>
          {t("settings.position.valueHelp")}
        </div>
      </div>
    </SettingsCard>
  );
}
