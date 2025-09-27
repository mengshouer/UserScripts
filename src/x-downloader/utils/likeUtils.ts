import { getCookie } from "../../shared/utils/cookie";
import { message } from "../../shared";

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

const TWITTER_API_ENDPOINT = "https://x.com/i/api/graphql/lI07N6Otwv1PhnEgXILM7A/FavoriteTweet";
const TWITTER_BEARER_TOKEN =
  "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA";

function getTwitterHeaders(): TwitterApiHeaders | null {
  const csrfToken = getCookie("ct0");
  const cookies = document.cookie;

  if (!csrfToken || !cookies) {
    console.debug("无法获取必要的认证信息");
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

export async function likeTweet(tweetId: string): Promise<{ success: boolean; message?: string }> {
  try {
    const headers = getTwitterHeaders();
    if (!headers) {
      return { success: false, message: "无法获取认证信息" };
    }

    const payload: LikeTweetPayload = {
      variables: {
        tweet_id: tweetId,
      },
      queryId: "lI07N6Otwv1PhnEgXILM7A",
    };

    const response = await fetch(TWITTER_API_ENDPOINT, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return { success: false, message: `网络请求失败 (${response.status})` };
    }

    const result: TwitterApiResponse = await response.json();

    const { errors, data } = result;

    if (errors && errors.length > 0) {
      const [error] = errors;
      const { code, name, message: errorMessage } = error || {};

      if (code === 139 && name === "AuthorizationError") {
        console.debug(`📋 推文已点赞: ${tweetId}`);
        message.info("推文已点赞");
        return { success: true };
      }

      const errorMsg = errorMessage || "未知错误";
      return { success: false, message: `点赞失败: ${errorMsg}` };
    }

    if (data?.favorite_tweet === "Done") {
      console.debug(`✅ 成功点赞推文: ${tweetId}`);
      message.info("点赞成功");
      return { success: true };
    }

    return { success: false, message: "点赞响应异常" };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    return { success: false, message: `点赞失败: ${errorMsg}` };
  }
}
