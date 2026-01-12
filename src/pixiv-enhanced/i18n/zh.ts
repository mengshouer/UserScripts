import type { LocaleData } from "../../shared/i18n/types";

export const zhTranslations: LocaleData = {
  title: "Pixiv Downloader 设置",
  settings: {
    image: {
      title: "图片下载设置",
      fileName: "图片文件名格式",
      fileNamePlaceholder: "<%ArtworkId>_p<%PageIndex>_<%AuthorId>",
      fileNameHelp:
        "可用变量：<%ArtworkId>、<%PageIndex>、<%AuthorId>、<%AuthorName>、<%ArtworkTitle>、<%Time>",
      showHoverButton: "显示悬停下载按钮",
      showHoverButtonHelp: "鼠标悬停在图片上时显示下载按钮",
    },
    reset: "重置为默认设置",
  },
  ui: {
    downloadImage: "下载图片",
    downloadAll: "下载全部",
    downloading: "下载中",
    downloadAllTitle: "下载作品的所有图片",
    downloadComplete: "下载完成 ({count} 张)",
    downloadFailed: "下载失败 ({count} 张)，点击定位",
  },
};
