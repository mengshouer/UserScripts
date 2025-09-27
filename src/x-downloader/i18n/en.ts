import type { LocaleData } from "../../shared/i18n/types";

export const enTranslations: LocaleData = {
  title: "X(Twitter) Downloader Settings",
  settings: {
    image: {
      title: "Image Download Settings",
      fileName: "Image filename format",
      fileNamePlaceholder: "<%Userid> <%Tid>_p<%PicNo>",
      fileNameHelp: "Available variables: <%Userid>, <%Tid>, <%Time>, <%PicName>, <%PicNo>",
      showButton: "Show image download button",
    },
    video: {
      title: "Video Download Settings",
      fileName: "Video filename format",
      fileNamePlaceholder: "<%Userid> <%Tid>_video_<%Time>",
      fileNameHelp: "Available variables: <%Userid>, <%Tid>, <%Time>",
      showButton: "Show video download button",
    },
    universal: {
      title: "Universal Download Settings",
      showButton: "Show universal download button",
      showButtonHelp:
        "Display unified download button in tweet actions, automatically detects media type",
      autoLike: "Auto-like on download",
      autoLikeHelp: "Automatically like the tweet when downloading images or videos",
    },
    reset: "Reset to default settings",
  },
  messages: {
    downloadStart: "Download started",
    downloadSuccess: "Download successful",
    downloadError: "Download failed",
    noMediaFound: "No media found",
    settingsReset: "Settings reset",
  },
};
