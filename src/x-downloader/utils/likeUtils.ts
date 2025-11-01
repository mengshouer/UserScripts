import { getCookie } from "../../shared/utils/cookie";
import { message, i18n } from "../../shared";

const LIKE_BUTTON_SELECTOR = 'button[data-testid="like"]';
const UNLIKE_BUTTON_SELECTOR = 'button[data-testid="unlike"]';
const DOM_CHECK_RETRIES = 5;
const DOM_CHECK_INTERVAL_MS = 200;

interface TwitterApiHeaders extends Record<string, string> {
  accept: string;
  "accept-language": string;
  authorization: string;
  "content-type": string;
  "x-csrf-token": string;
  "x-twitter-active-user": string;
  "x-twitter-auth-type": string;
  "x-twitter-client-language": string;
  cookie: string;
}

interface LikeTweetPayload {
  variables: {
    tweet_id: string;
  };
  queryId: string;
}

interface TwitterApiError {
  message: string;
  code: number;
  kind: string;
  name: string;
  source: string;
}

interface TwitterApiResponse {
  data?: {
    favorite_tweet?: string;
  };
  errors?: TwitterApiError[];
}

type DomLikeStatus = "success" | "already-liked" | "fallback";

const TWITTER_API_ENDPOINT = "https://x.com/i/api/graphql/lI07N6Otwv1PhnEgXILM7A/FavoriteTweet";
const TWITTER_BEARER_TOKEN =
  "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA";

export async function likeTweet(
  tweetContainer: HTMLElement | null,
  tweetId: string,
): Promise<{ success: boolean; message?: string }> {
  try {
    if (tweetContainer) {
      const domResult = await tryLikeViaDom(tweetContainer);

      if (domResult === "success" || domResult === "already-liked") {
        return { success: true };
      }
    }

    return await likeTweetViaApi(tweetId);
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    return { success: false, message: i18n.t("messages.likeFailed", { error: errorMsg }) };
  }
}

async function tryLikeViaDom(tweetContainer: HTMLElement): Promise<DomLikeStatus> {
  const unlikeButton = tweetContainer.querySelector(
    UNLIKE_BUTTON_SELECTOR,
  ) as HTMLButtonElement | null;

  if (unlikeButton) {
    return "already-liked";
  }

  const likeButton = tweetContainer.querySelector(LIKE_BUTTON_SELECTOR) as HTMLButtonElement | null;

  if (!likeButton) {
    return "fallback";
  }

  try {
    likeButton.click();
  } catch {
    return "fallback";
  }

  const domUpdated = await waitForDomLikeState(tweetContainer, likeButton);

  if (domUpdated) {
    message.info(i18n.t("messages.likeSuccess"));
    return "success";
  }

  return "fallback";
}

async function waitForDomLikeState(
  tweetContainer: HTMLElement,
  likeButton: HTMLButtonElement,
): Promise<boolean> {
  for (let attempt = 0; attempt < DOM_CHECK_RETRIES; attempt++) {
    const unlikeButton = tweetContainer.querySelector(UNLIKE_BUTTON_SELECTOR);
    if (unlikeButton) {
      return true;
    }

    const dataTestId = likeButton.getAttribute("data-testid");
    const ariaPressed = likeButton.getAttribute("aria-pressed");
    if (dataTestId === "unlike" || ariaPressed === "true") {
      return true;
    }

    await new Promise((resolve) => window.setTimeout(resolve, DOM_CHECK_INTERVAL_MS));
  }

  const unlikeButton = tweetContainer.querySelector(UNLIKE_BUTTON_SELECTOR);
  if (unlikeButton) {
    return true;
  }

  const dataTestId = likeButton.getAttribute("data-testid");
  if (dataTestId === "unlike") {
    return true;
  }

  return likeButton.getAttribute("aria-pressed") === "true";
}

function getTwitterHeaders(): TwitterApiHeaders | null {
  const csrfToken = getCookie("ct0");
  const cookies = document.cookie;

  if (!csrfToken || !cookies) {
    return null;
  }

  return {
    accept: "*/*",
    "accept-language": "en-US,en;q=0.9",
    authorization: TWITTER_BEARER_TOKEN,
    "content-type": "application/json",
    "x-csrf-token": csrfToken,
    "x-twitter-active-user": "yes",
    "x-twitter-auth-type": "OAuth2Session",
    "x-twitter-client-language": "en",
    cookie: cookies,
  };
}

async function likeTweetViaApi(tweetId: string): Promise<{ success: boolean; message?: string }> {
  const headers = getTwitterHeaders();
  if (!headers) {
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
      headers,
      body: JSON.stringify(payload),
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

      const errorMsg = errorMessage || "未知错误";
      return { success: false, message: i18n.t("messages.likeFailed", { error: errorMsg }) };
    }

    if (data?.favorite_tweet === "Done") {
      message.info(i18n.t("messages.likeSuccess"));
      return { success: true };
    }

    return { success: false, message: i18n.t("messages.likeResponseError") };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    return { success: false, message: i18n.t("messages.likeFailed", { error: errorMsg }) };
  }
}
