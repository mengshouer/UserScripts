import type { LocaleData } from "../types";

export const enTranslations: LocaleData = {
  common: {
    ok: "OK",
    cancel: "Cancel",
    close: "Close",
    reset: "Reset",
    resetSettings: "Reset to default settings",
    resetConfirm: "Confirm reset?",
    save: "Save",
    loading: "Loading...",
    error: "Error",
    success: "Success",
    warning: "Warning",
    info: "Info",
    generalSettings: {
      title: "General Settings",
    },
    messagePlacement: {
      label: "Message Placement",
      top: "Top Center",
      bottom: "Bottom Center",
      topLeft: "Top Left",
      topRight: "Top Right",
      bottomLeft: "Bottom Left",
      bottomRight: "Bottom Right",
    },
    messageAlertDuration: {
      label: "Alert Duration (ms)",
      placeholder: "3000",
      help: "How long warning/error messages stay, in milliseconds. 0 or negative keeps them until dismissed. Success messages always stay 3s.",
    },
  },
  button: {
    download: "Download",
    settings: "Settings",
  },
  settings: {
    position: {
      title: "Button Position",
      vertical: "Vertical",
      horizontal: "Horizontal",
      top: "Top",
      bottom: "Bottom",
      left: "Left",
      right: "Right",
      verticalValue: "Vertical Offset",
      horizontalValue: "Horizontal Offset",
      valueHelp: "Pure numbers default to px, also supports values like 1rem, 10%",
    },
  },
};
