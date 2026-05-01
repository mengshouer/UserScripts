import type { BaseSettings } from "../shared/types";

export interface DownloaderSettings extends BaseSettings {
  readonly fileName: string;
  readonly showDownloadButton: boolean;
  readonly videoFileName: string;
  readonly showVideoDownloadButton: boolean;
  readonly showUniversalDownloadButton: boolean;
  readonly showFollowBadge: boolean;
  readonly autoLikeOnDownload: boolean;
  readonly messagePlacement:
    | "top"
    | "bottom"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
  readonly buttonPositionVertical: "top" | "bottom";
  readonly buttonPositionHorizontal: "left" | "right";
  readonly buttonPositionVerticalValue: string;
  readonly buttonPositionHorizontalValue: string;
  readonly hideEditImageButton: boolean;
}
