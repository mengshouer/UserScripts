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
      showFollowBadge: "Show follow status badge",
      showFollowBadgeHelp: "Display whether you follow the user beside the tweet username",
      autoLike: "Auto-like on download",
      autoLikeHelp:
        "Automatically like the tweet when downloading images or videos. Automated likes may increase account risk.",
      downloadOnManualLike: "Download on manual like",
      downloadOnManualLikeHelp:
        "Automatically download tweet media after you manually like a tweet. If the like result cannot be confirmed, the download still proceeds with a notice. Hold Shift while clicking like to temporarily disable auto-download.",
      autoLikeApiFallback: "Use API fallback when auto-like fails",
      autoLikeApiFallbackHelp:
        "Directly calls the FavoriteTweet API when the native X like response cannot be observed. Enabling this may increase bot-detection risk.",
      hideEditImage: "Hide edit image button",
      hideEditImageHelp: 'Hide the "Edit image" button on tweet images',
    },
  },
  messages: {
    downloadStart: "Download started",
    downloadSuccess: "Download successful",
    downloadError: "Download failed",
    noMediaFound: "No media found",
    settingsReset: "Settings reset",
    imagesDownloadSuccess: "Successfully downloaded {count} images",
    videoDownloadSuccess: "Video download successful",
    cannotRecognizeTweet: "Cannot recognize tweet, please try again",
    videoLinkNotFound: "Video download link not found",
    tweetAlreadyLiked: "Tweet already liked",
    likeSuccess: "Like successful",
    likeButtonNotFound: "Like button not found",
    cannotGetAuthInfo: "Cannot get authentication info",
    networkRequestFailed: "Network request failed ({status})",
    likeFailed: "Like failed: {error}",
    likeResponseError: "Like response error",
    manualLikeResponseUncertain:
      "Like response error for @{user}, download continued ({error}). Click to open the tweet",
    downloadFailed: "Download failed",
    videoDownloadFailed: "Video download failed",
    imageDownloadFailed: "Image download failed",
  },
  ui: {
    downloading: "Downloading...",
    downloadVideo: "Download Video",
    downloadImage: "Download Image",
    downloadImages: "Download {count} Images",
    downloadVideos: "Download {count} Videos",
    copied: "Copied to clipboard",
    copyFailed: "Copy failed",
  },
  badge: {
    following: "Following",
    notFollowing: "Not following",
  },
};
