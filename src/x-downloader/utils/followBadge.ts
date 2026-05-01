import { getFollowState, subscribeFollowState } from "./followState";
import { SETTINGS_CHANGE_EVENT, STORAGE_KEY } from "../../shared";
import type { DownloaderSettings } from "../types";

const BADGE_CLASS = "x-downloader-follow-badge";
const STYLE_ID = "x-downloader-follow-badge-style";
const RESERVED_ROUTE_NAMES = new Set(["home", "i", "explore", "notifications", "messages"]);
const badgesByUser = new Map<string, Set<HTMLElement>>();
const processedUserNameElements = new WeakSet<HTMLElement>();

let unsubscribeFollowState: (() => void) | undefined;

const normalizeScreenName = (screenName: string): string => screenName.toLowerCase();

const getSettings = (): Partial<DownloaderSettings> => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") as Partial<DownloaderSettings>;
  } catch {
    return {};
  }
};

const shouldShowFollowBadge = (): boolean => getSettings().showFollowBadge !== false;

const getLabels = () => {
  const language = document.documentElement.lang || navigator.language;
  const isChinese = language.toLowerCase().startsWith("zh");

  return {
    following: isChinese ? "已关注" : "Following",
    notFollowing: isChinese ? "未关注" : "Not following",
  };
};

const extractScreenNameFromHref = (href: string | null): string | undefined => {
  if (!href) {
    return undefined;
  }

  const match = href.match(/^\/([^/?#]+)(?:[/?#]|$)/);
  const screenName = match?.[1];

  if (!screenName || RESERVED_ROUTE_NAMES.has(normalizeScreenName(screenName))) {
    return undefined;
  }

  return screenName;
};

const getScreenNameFromUserNameElement = (userNameElement: HTMLElement): string | undefined => {
  const links = Array.from(userNameElement.querySelectorAll<HTMLAnchorElement>('a[href^="/"]'));

  for (const link of links) {
    const screenName = extractScreenNameFromHref(link.getAttribute("href"));
    if (screenName) {
      return screenName;
    }
  }

  return undefined;
};

const ensureFollowBadgeStyle = (): void => {
  if (document.getElementById(STYLE_ID)) {
    return;
  }

  const styleElement = document.createElement("style");
  styleElement.id = STYLE_ID;
  styleElement.textContent = `
    .${BADGE_CLASS} {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      height: 16px;
      margin-left: 6px;
      padding: 0 6px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 700;
      line-height: 16px;
      white-space: nowrap;
      pointer-events: none;
      user-select: none;
    }

    .${BADGE_CLASS}[hidden] {
      display: none !important;
    }

    .${BADGE_CLASS}[data-follow-state="following"] {
      color: rgb(0, 186, 124);
      background-color: rgba(0, 186, 124, 0.16);
      border: 1px solid rgba(0, 186, 124, 0.45);
    }

    .${BADGE_CLASS}[data-follow-state="not-following"] {
      color: rgb(113, 118, 123);
      background-color: rgba(113, 118, 123, 0.14);
      border: 1px solid rgba(113, 118, 123, 0.35);
    }
  `;
  document.head.appendChild(styleElement);
};

const registerBadge = (screenName: string, badge: HTMLElement): void => {
  const normalizedScreenName = normalizeScreenName(screenName);
  let badges = badgesByUser.get(normalizedScreenName);

  if (!badges) {
    badges = new Set();
    badgesByUser.set(normalizedScreenName, badges);
  }

  badges.add(badge);
};

const unregisterBadge = (screenName: string | undefined, badge: HTMLElement): void => {
  if (!screenName) {
    return;
  }

  const badges = badgesByUser.get(screenName);
  badges?.delete(badge);

  if (badges?.size === 0) {
    badgesByUser.delete(screenName);
  }
};

const updateBadge = (badge: HTMLElement, screenName: string): void => {
  const following = getFollowState(screenName);

  if (typeof following !== "boolean") {
    badge.hidden = true;
    badge.textContent = "";
    badge.removeAttribute("aria-label");
    return;
  }

  const labels = getLabels();
  const label = following ? labels.following : labels.notFollowing;

  badge.hidden = false;
  badge.dataset.followState = following ? "following" : "not-following";
  badge.textContent = label;
  badge.title = `@${screenName}: ${label}`;
  badge.setAttribute("aria-label", badge.title);
};

const updateBadgesForUser = (screenName: string): void => {
  const normalizedScreenName = normalizeScreenName(screenName);
  const badges = badgesByUser.get(normalizedScreenName);

  if (!badges) {
    return;
  }

  badges.forEach((badge) => {
    if (!badge.isConnected) {
      badges.delete(badge);
      return;
    }

    updateBadge(badge, screenName);
  });

  if (badges.size === 0) {
    badgesByUser.delete(normalizedScreenName);
  }
};

const removeExistingBadge = (userNameElement: HTMLElement): void => {
  const badge = userNameElement.querySelector<HTMLElement>(`.${BADGE_CLASS}`);

  if (!badge) {
    return;
  }

  unregisterBadge(badge.dataset.screenName, badge);
  badge.remove();
};

export const initializeFollowBadgeSystem = (): void => {
  ensureFollowBadgeStyle();

  if (!unsubscribeFollowState) {
    unsubscribeFollowState = subscribeFollowState((screenName) => {
      updateBadgesForUser(screenName);
    });
  }

  window.addEventListener(SETTINGS_CHANGE_EVENT, () => {
    if (!shouldShowFollowBadge()) {
      document.querySelectorAll<HTMLElement>(`.${BADGE_CLASS}`).forEach((badge) => badge.remove());
      badgesByUser.clear();
      return;
    }

    document
      .querySelectorAll<HTMLElement>('article[data-testid="tweet"]')
      .forEach((tweet) => setupFollowBadgeForTweet(tweet));
  });
};

export const setupFollowBadgeForTweet = (tweetElement: HTMLElement): void => {
  const userNameElement = tweetElement.querySelector<HTMLElement>('[data-testid="User-Name"]');

  if (!userNameElement) {
    return;
  }

  const existingBadge = userNameElement.querySelector<HTMLElement>(`.${BADGE_CLASS}`);

  if (processedUserNameElements.has(userNameElement) && existingBadge) {
    return;
  }

  if (!shouldShowFollowBadge()) {
    removeExistingBadge(userNameElement);
    return;
  }

  const screenName = getScreenNameFromUserNameElement(userNameElement);

  if (!screenName) {
    removeExistingBadge(userNameElement);
    return;
  }

  let badge = existingBadge;
  const normalizedScreenName = normalizeScreenName(screenName);

  if (!badge) {
    badge = document.createElement("span");
    badge.className = BADGE_CLASS;
    userNameElement.appendChild(badge);
  }

  if (badge.dataset.screenName !== normalizedScreenName) {
    unregisterBadge(badge.dataset.screenName, badge);
    badge.dataset.screenName = normalizedScreenName;
    registerBadge(normalizedScreenName, badge);
  }

  updateBadge(badge, screenName);
  processedUserNameElements.add(userNameElement);
};
