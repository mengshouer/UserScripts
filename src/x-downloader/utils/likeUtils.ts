import { message, i18n } from "../../shared";

const LIKE_BUTTON_SELECTOR = 'button[data-testid="like"]';
const UNLIKE_BUTTON_SELECTOR = 'button[data-testid="unlike"]';

export async function likeTweet(
  tweetContainer: HTMLElement | null,
): Promise<{ success: boolean; message?: string }> {
  if (!tweetContainer) {
    return { success: false, message: i18n.t("messages.cannotRecognizeTweet") };
  }

  try {
    const unlikeButton = tweetContainer.querySelector(
      UNLIKE_BUTTON_SELECTOR,
    ) as HTMLButtonElement | null;
    if (unlikeButton) {
      message.info(i18n.t("messages.tweetAlreadyLiked"));
      return { success: true };
    }

    const likeButton = tweetContainer.querySelector(
      LIKE_BUTTON_SELECTOR,
    ) as HTMLButtonElement | null;

    if (!likeButton) {
      return {
        success: false,
        message: i18n.t("messages.likeFailed", {
          error: i18n.t("messages.likeButtonNotFound"),
        }),
      };
    }

    likeButton.click();
    message.info(i18n.t("messages.likeSuccess"));
    return { success: true };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    return { success: false, message: i18n.t("messages.likeFailed", { error: errorMsg }) };
  }
}
