import type { LocaleData } from "../../shared/i18n/types";

export const zhTranslations: LocaleData = {
  title: "X(Twitter) Downloader 设置",
  settings: {
    image: {
      title: "图片下载设置",
      fileName: "图片文件名格式",
      fileNamePlaceholder: "<%Userid> <%Tid>_p<%PicNo>",
      fileNameHelp: "可用变量：<%Userid>、<%Tid>、<%Time>、<%PicName>、<%PicNo>",
      showButton: "显示图片下载按钮",
    },
    video: {
      title: "视频下载设置",
      fileName: "视频文件名格式",
      fileNamePlaceholder: "<%Userid> <%Tid>_video_<%Time>",
      fileNameHelp: "可用变量：<%Userid>、<%Tid>、<%Time>",
      showButton: "显示视频下载按钮",
    },
    universal: {
      title: "通用下载设置",
      showButton: "显示通用下载按钮",
      showButtonHelp: "在推文操作栏中显示统一的下载按钮，自动检测媒体类型",
      autoLike: "下载时自动点赞",
      autoLikeHelp: "下载图片或视频时自动为推文点赞",
    },
    reset: "重置为默认设置",
  },
  messages: {
    downloadStart: "开始下载",
    downloadSuccess: "下载成功",
    downloadError: "下载失败",
    noMediaFound: "未找到媒体文件",
    settingsReset: "设置已重置",
  },
};
