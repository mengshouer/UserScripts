import type { LocaleData } from "../../shared/i18n/types";

export const enTranslations: LocaleData = {
  title: "Pixiv Downloader Settings",
  settings: {
    image: {
      title: "Image Download Settings",
      fileName: "Image filename format",
      fileNamePlaceholder: "<%ArtworkId>_p<%PageIndex>_<%AuthorId>",
      fileNameHelp:
        "Available variables: <%ArtworkId>, <%PageIndex>, <%AuthorId>, <%AuthorName>, <%ArtworkTitle>, <%Time>",
      showHoverButton: "Show hover download button",
      showHoverButtonHelp: "Show download button when hovering over images",
    },
    reset: "Reset to default settings",
  },
  ui: {
    downloadImage: "Download Image",
    downloadAll: "Download All",
    downloading: "Downloading",
    downloadAllTitle: "Download all images of this artwork",
    downloadComplete: "Download complete ({count} images)",
    downloadFailed: "Download failed ({count} images), click to locate",
  },
};
