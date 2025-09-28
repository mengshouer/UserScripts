/**
 * 视频相关工具函数
 */

const GRAPHQL_TWEET_DETAIL_ID = "_8aYOgEDz35BrBcBal1-_w";
const GRAPHQL_ENDPOINT = `https://x.com/i/api/graphql/${GRAPHQL_TWEET_DETAIL_ID}/TweetDetail`;
const GRAPHQL_AUTH_TOKEN =
  "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA";

const TWEET_FEATURE_FLAGS = {
  rweb_video_screen_enabled: false,
  profile_label_improvements_pcf_label_in_post_enabled: true,
  rweb_tipjar_consumption_enabled: true,
  verified_phone_label_enabled: false,
  creator_subscriptions_tweet_preview_api_enabled: true,
  responsive_web_graphql_timeline_navigation_enabled: true,
  responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
  premium_content_api_read_enabled: false,
  communities_web_enable_tweet_community_results_fetch: true,
  c9s_tweet_anatomy_moderator_badge_enabled: true,
  responsive_web_grok_analyze_button_fetch_trends_enabled: false,
  responsive_web_grok_analyze_post_followups_enabled: true,
  responsive_web_jetfuel_frame: false,
  responsive_web_grok_share_attachment_enabled: true,
  articles_preview_enabled: true,
  responsive_web_edit_tweet_api_enabled: true,
  graphql_is_translatable_rweb_tweet_is_translatable_enabled: true,
  view_counts_everywhere_api_enabled: true,
  longform_notetweets_consumption_enabled: true,
  responsive_web_twitter_article_tweet_consumption_enabled: true,
  tweet_awards_web_tipping_enabled: false,
  responsive_web_grok_show_grok_translated_post: false,
  responsive_web_grok_analysis_button_from_backend: false,
  creator_subscriptions_quote_tweet_preview_enabled: false,
  freedom_of_speech_not_reach_fetch_enabled: true,
  standardized_nudges_misinfo: true,
  tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled: true,
  longform_notetweets_rich_text_read_enabled: true,
  longform_notetweets_inline_media_enabled: true,
  responsive_web_grok_image_annotation_enabled: true,
  responsive_web_enhance_cards_enabled: false,
} as const;

const TWEET_FIELD_TOGGLES = {
  withArticlePlainText: false,
  withArticleRichContentState: true,
  withDisallowedReplyControls: false,
  withGrokAnalyze: false,
} as const;

const FEATURES_PARAM = encodeURIComponent(JSON.stringify(TWEET_FEATURE_FLAGS));
const FIELD_TOGGLES_PARAM = encodeURIComponent(JSON.stringify(TWEET_FIELD_TOGGLES));
const BASE_QUERY_SUFFIX = `features=${FEATURES_PARAM}&fieldToggles=${FIELD_TOGGLES_PARAM}`;
const BASE_VARIABLES_SUFFIX =
  '","rankingMode":"Relevance","includePromotedContent":false,"withCommunity":false,"withQuickPromoteEligibilityTweetFields":false,"withBirdwatchNotes":false,"withVoice":false}';

const GRAPHQL_BASE_HEADERS: [string, string][] = [
  ["Authorization", GRAPHQL_AUTH_TOKEN],
  ["x-twitter-active-user", "yes"],
  ["Content-Type", "application/json"],
];

let cachedCsrfToken: string | undefined;

const buildTweetDetailUrl = (tweetId: string) => {
  const variables = encodeURIComponent(`{"focalTweetId":"${tweetId}${BASE_VARIABLES_SUFFIX}`);
  return `${GRAPHQL_ENDPOINT}?${BASE_QUERY_SUFFIX}&variables=${variables}`;
};

/**
 * 从 Twitter API 数据中解析最佳视频URL
 */
function getBestVideoUrl(medias: any[]): string | undefined {
  if (!Array.isArray(medias) || medias.length === 0) {
    return undefined;
  }

  // 找到第一个视频媒体 (video 或 animated_gif)
  const videoMedia = medias.find(
    (media) => media.type === "video" || media.type === "animated_gif",
  );

  if (!videoMedia || !videoMedia.video_info || !Array.isArray(videoMedia.video_info.variants)) {
    return undefined;
  }

  // 过滤 MP4 格式的视频变体并找到最高比特率的
  const mp4Variants = videoMedia.video_info.variants.filter(
    (variant: any) => variant.content_type === "video/mp4" && variant.url,
  );

  if (mp4Variants.length === 0) {
    return undefined;
  }

  // 找到比特率最高的变体
  const bestVariant = mp4Variants.reduce((prev: any, current: any) => {
    return (current.bitrate || 0) >= (prev.bitrate || 0) ? current : prev;
  });

  return bestVariant.url;
}

/**
 * 从 Twitter API 响应中提取媒体
 */
function extractMediaFromTweetData(tweetData: any, tweetId: string): any[] {
  try {
    const instructions = tweetData.data.threaded_conversation_with_injections_v2.instructions;
    const timelineAddEntries = instructions.find((i: any) => i.type === "TimelineAddEntries");

    if (!timelineAddEntries || !Array.isArray(timelineAddEntries.entries)) {
      return [];
    }

    // 找到第一个包含媒体的条目
    for (const entry of timelineAddEntries.entries) {
      const { content, entryId } = entry;
      const { entryType, itemContent } = content;

      if (
        entryId === `tweet-${tweetId}` &&
        entryType === "TimelineTimelineItem" &&
        itemContent?.itemType === "TimelineTweet" &&
        itemContent.tweet_results?.result?.legacy?.extended_entities?.media
      ) {
        return itemContent.tweet_results.result.legacy.extended_entities.media;
      }
    }

    return [];
  } catch (error) {
    console.error("Error extracting media from tweet data:", error);
    return [];
  }
}

/**
 * 从页面获取 CSRF token
 */
function getCSRFToken(): string | undefined {
  if (cachedCsrfToken) {
    return cachedCsrfToken;
  }

  const metaTag = document.querySelector('meta[name="csrf-token"]');
  if (metaTag) {
    const token = metaTag.getAttribute("content") || undefined;
    if (token) {
      cachedCsrfToken = token;
      return token;
    }
  }

  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === "ct0" && value) {
      cachedCsrfToken = decodeURIComponent(value);
      return cachedCsrfToken;
    }
  }

  return undefined;
}

/**
 * 发起 GraphQL 请求获取 tweet 数据
 */
async function fetchTweetData(tweetId: string, csrfToken: string): Promise<any> {
  const headers = new Headers(GRAPHQL_BASE_HEADERS);
  headers.set("x-csrf-token", csrfToken);
  headers.set("User-Agent", navigator.userAgent);

  const response = await fetch(buildTweetDetailUrl(tweetId), {
    method: "GET",
    headers: headers,
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch tweet data: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

/**
 * 提取视频下载链接的主函数
 */
export async function extractVideoUrl(tweetId: string): Promise<string | undefined> {
  try {
    // 获取 CSRF token
    const csrfToken = getCSRFToken();
    if (!csrfToken) {
      throw new Error("Could not find CSRF token");
    }

    // 获取 tweet 数据
    const tweetData = await fetchTweetData(tweetId, csrfToken);

    // 提取媒体数据
    const mediaArray = extractMediaFromTweetData(tweetData, tweetId);

    // 获取最佳视频 URL
    const videoUrl = getBestVideoUrl(mediaArray);

    return videoUrl;
  } catch (error) {
    cachedCsrfToken = undefined;
    console.error("Error extracting video URL:", error);
    throw error;
  }
}

/**
 * 查找视频容器
 */
export function findVideoContainer(videoElement: HTMLVideoElement): HTMLElement | null {
  let current: HTMLElement | null = videoElement.parentElement;

  // 向上查找视频容器（通常包含 data-testid="videoComponent"）
  while (current && current.tagName !== "BODY") {
    if (
      current.hasAttribute("data-testid") &&
      current.getAttribute("data-testid") === "videoComponent"
    ) {
      return current;
    }
    current = current.parentElement;
  }

  return null;
}

/**
 * 查找视频播放器容器（更大的范围）
 */
export function findVideoPlayerContainer(videoElement: HTMLVideoElement): HTMLElement | null {
  let current: HTMLElement | null = videoElement.parentElement;

  // 向上查找包含播放器的容器
  while (current && current.tagName !== "BODY") {
    if (
      current.hasAttribute("data-testid") &&
      current.getAttribute("data-testid") === "videoPlayer"
    ) {
      return current;
    }
    current = current.parentElement;
  }

  return null;
}
