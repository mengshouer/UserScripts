import type { BaseSettings, SharedMessageSettings } from "../shared/types";

export interface DownloaderSettings extends BaseSettings, SharedMessageSettings {
  readonly fileName: string;
  readonly showDownloadButton: boolean;
  readonly videoFileName: string;
  readonly showVideoDownloadButton: boolean;
  readonly showUniversalDownloadButton: boolean;
  readonly showFollowBadge: boolean;
  readonly autoLikeOnDownload: boolean;
  readonly downloadOnManualLike: boolean;
  readonly autoLikeApiFallback: boolean;
  readonly buttonPositionVertical: "top" | "bottom";
  readonly buttonPositionHorizontal: "left" | "right";
  readonly buttonPositionVerticalValue: string;
  readonly buttonPositionHorizontalValue: string;
  readonly hideEditImageButton: boolean;
}
