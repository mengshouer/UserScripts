import { message, i18n } from "../../shared";
import { getCookie } from "../../shared/utils/cookie";
import { settingsHook } from "../hooks/useDownloaderSettings";
import { subscribeFavoriteTweetResponse } from "./favoriteTweetResponse";
import { setTweetFollowBadgeLikeAlert } from "./followBadge";
import { LIKE_BUTTON_SELECTOR, UNLIKE_BUTTON_SELECTOR } from "./selectors";

const LIKE_RESPONSE_TIMEOUT_MS = 8000;
const TWITTER_API_ENDPOINT = "https://x.com/i/api/graphql/lI07N6Otwv1PhnEgXILM7A/FavoriteTweet";
const TWITTER_BEARER_TOKEN =
  "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA";

interface LikeTweetResult {
  success: boolean;
  message?: string;
  likedThisSession?: boolean;
  canUseApiFallback?: boolean;
}

interface LikeTweetPayload {
  variables: {
    tweet_id: string;
  };
  queryId: string;
}

interface TwitterApiError {
  message?: string;
  code?: number;
  name?: string;
}

interface TwitterApiResponse {
  data?: {
    favorite_tweet?: string;
  };
  errors?: TwitterApiError[];
}

interface PendingFavoriteTweetResult {
  promise: Promise<LikeTweetResult>;
  cancel: () => void;
}

export async function likeTweet(
  tweetContainer: HTMLElement | null,
  tweetId: string,
): Promise<LikeTweetResult> {
  try {
    if (!tweetContainer) {
      return await fallbackLikeViaApi(tweetId, {
        fallbackMessage: i18n.t("messages.likeButtonNotFound"),
      });
    }

    const domResult = await tryLikeViaDom(tweetContainer, tweetId);

    if (!domResult.success && domResult.canUseApiFallback) {
      const fallbackResult = await fallbackLikeViaApi(tweetId, {
        fallbackMessage: domResult.message,
      });

      if (fallbackResult.likedThisSession) {
        setTweetFollowBadgeLikeAlert(tweetContainer, true);
      }

      return fallbackResult;
    }

    return domResult;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    return { success: false, message: i18n.t("messages.likeFailed", { error: errorMsg }) };
  }
}

async function tryLikeViaDom(
  tweetContainer: HTMLElement,
  tweetId: string,
): Promise<LikeTweetResult> {
  const unlikeButton = tweetContainer.querySelector(
    UNLIKE_BUTTON_SELECTOR,
  ) as HTMLButtonElement | null;

  if (unlikeButton) {
    return { success: true };
  }

  const likeButton = tweetContainer.querySelector(LIKE_BUTTON_SELECTOR) as HTMLButtonElement | null;

  if (!likeButton) {
    return {
      success: false,
      message: i18n.t("messages.likeButtonNotFound"),
      canUseApiFallback: true,
    };
  }

  const pendingFavoriteTweet = waitForFavoriteTweetResponse(tweetId);

  try {
    likeButton.click();
  } catch {
    pendingFavoriteTweet.cancel();
    return {
      success: false,
      message: i18n.t("messages.likeResponseError"),
      canUseApiFallback: true,
    };
  }

  const likeResult = await pendingFavoriteTweet.promise;

  if (likeResult.success) {
    if (likeResult.likedThisSession) {
      setTweetFollowBadgeLikeAlert(tweetContainer, true);
      message.info(i18n.t("messages.likeSuccess"));
    } else {
      message.info(i18n.t("messages.tweetAlreadyLiked"));
    }
  }

  return likeResult;
}

function waitForFavoriteTweetResponse(tweetId: string): PendingFavoriteTweetResult {
  let timeoutId: number | undefined;
  let unsubscribe: (() => void) | undefined;

  const cleanup = () => {
    if (timeoutId !== undefined) {
      window.clearTimeout(timeoutId);
      timeoutId = undefined;
    }
    unsubscribe?.();
    unsubscribe = undefined;
  };

  const promise = new Promise<LikeTweetResult>((resolve) => {
    timeoutId = window.setTimeout(() => {
      cleanup();
      resolve({
        success: false,
        message: i18n.t("messages.likeResponseError"),
        canUseApiFallback: true,
      });
    }, LIKE_RESPONSE_TIMEOUT_MS);

    unsubscribe = subscribeFavoriteTweetResponse((result) => {
      if (result.tweetId !== tweetId) {
        return;
      }

      cleanup();
      if (result.success) {
        resolve(
          result.likedThisSession ? { success: true, likedThisSession: true } : { success: true },
        );
        return;
      }

      const error = result.errorMessage || i18n.t("messages.likeResponseError");
      resolve({ success: false, message: error });
    });
  });

  return {
    promise,
    cancel: cleanup,
  };
}

async function fallbackLikeViaApi(
  tweetId: string,
  { fallbackMessage }: { fallbackMessage?: string | undefined },
): Promise<LikeTweetResult> {
  if (!settingsHook.signal.value.autoLikeApiFallback) {
    return { success: false, message: fallbackMessage || i18n.t("messages.likeResponseError") };
  }

  return await likeTweetViaApi(tweetId);
}

async function likeTweetViaApi(tweetId: string): Promise<LikeTweetResult> {
  const csrfToken = getCookie("ct0");
  if (!csrfToken) {
    return { success: false, message: i18n.t("messages.cannotGetAuthInfo") };
  }

  const payload: LikeTweetPayload = {
    variables: {
      tweet_id: tweetId,
    },
    queryId: "lI07N6Otwv1PhnEgXILM7A",
  };

  try {
    const response = await fetch(TWITTER_API_ENDPOINT, {
      method: "POST",
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        authorization: TWITTER_BEARER_TOKEN,
        "content-type": "application/json",
        "x-csrf-token": csrfToken,
        "x-twitter-active-user": "yes",
        "x-twitter-auth-type": "OAuth2Session",
        "x-twitter-client-language": "en",
      },
      body: JSON.stringify(payload),
      credentials: "include",
    });

    if (!response.ok) {
      return {
        success: false,
        message: i18n.t("messages.networkRequestFailed", { status: response.status }),
      };
    }

    const { errors, data }: TwitterApiResponse = await response.json();

    if (errors && errors.length > 0) {
      const [error] = errors;
      const { code, name, message: errorMessage } = error || {};

      if (code === 139 && name === "AuthorizationError") {
        message.info(i18n.t("messages.tweetAlreadyLiked"));
        return { success: true };
      }

      const errorMsg = errorMessage || i18n.t("messages.likeResponseError");
      return { success: false, message: i18n.t("messages.likeFailed", { error: errorMsg }) };
    }

    if (data?.favorite_tweet === "Done") {
      message.info(i18n.t("messages.likeSuccess"));
      return { success: true, likedThisSession: true };
    }

    return { success: false, message: i18n.t("messages.likeResponseError") };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    return { success: false, message: i18n.t("messages.likeFailed", { error: errorMsg }) };
  }
}
