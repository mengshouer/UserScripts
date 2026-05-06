import { getFollowState, subscribeFollowState } from "./followState";
import {
  TWEET_SELECTOR,
  LIKE_BUTTON_SELECTOR,
  UNLIKE_BUTTON_SELECTOR,
  USER_NAME_SELECTOR,
} from "./selectors";
import { SETTINGS_CHANGE_EVENT, i18n } from "../../shared";
import { settingsHook } from "../hooks/useDownloaderSettings";

const BADGE_CLASS = "x-downloader-follow-badge";
const STYLE_ID = "x-downloader-follow-badge-style";
const RESERVED_ROUTE_NAMES = new Set(["home", "i", "explore", "notifications", "messages"]);
const badgesByUser = new Map<string, Set<HTMLElement>>();
const processedUserNameElements = new WeakSet<HTMLElement>();

let unsubscribeFollowState: (() => void) | undefined;
let initialized = false;

const normalizeScreenName = (screenName: string): string => screenName.toLowerCase();

const shouldShowFollowBadge = (): boolean => settingsHook.signal.value.showFollowBadge !== false;

const getScreenNameFromUserNameElement = (userNameElement: HTMLElement): string | undefined => {
  const links = Array.from(userNameElement.querySelectorAll<HTMLAnchorElement>('a[href^="/"]'));
  for (const link of links) {
    const screenName = link.getAttribute("href")?.match(/^\/([^/?#]+)/)?.[1];
    if (screenName && !RESERVED_ROUTE_NAMES.has(normalizeScreenName(screenName))) {
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
      transition:
        background-color 0.2s ease,
        border-color 0.2s ease,
        color 0.2s ease,
        box-shadow 0.2s ease;
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

    .${BADGE_CLASS}[data-follow-state="not-following"][data-like-alert="true"] {
      color: rgb(255, 212, 128);
      background-color: rgba(255, 149, 0, 0.22);
      border-color: rgba(255, 149, 0, 0.75);
      box-shadow: 0 0 0 2px rgba(255, 149, 0, 0.16);
      animation: x-downloader-follow-badge-pulse 1.1s ease-out 1;
    }

    @keyframes x-downloader-follow-badge-pulse {
      0% {
        box-shadow: 0 0 0 0 rgba(255, 149, 0, 0.42);
      }
      100% {
        box-shadow: 0 0 0 6px rgba(255, 149, 0, 0);
      }
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
    delete badge.dataset.followState;
    return;
  }

  const label = following ? i18n.t("badge.following") : i18n.t("badge.notFollowing");

  badge.hidden = false;
  badge.dataset.followState = following ? "following" : "not-following";
  if (following) {
    delete badge.dataset.likeAlert;
  }
  badge.textContent = label;
  badge.title = `@${screenName}: ${label}`;
  badge.setAttribute("aria-label", badge.title);
};

export const setTweetFollowBadgeLikeAlert = (tweetElement: HTMLElement, liked: boolean): void => {
  const badge = tweetElement.querySelector<HTMLElement>(`${USER_NAME_SELECTOR} .${BADGE_CLASS}`);

  if (!badge) {
    return;
  }

  if (liked) {
    badge.dataset.likeAlert = "true";
    return;
  }

  delete badge.dataset.likeAlert;
};

const updateLikeAlertAfterDomChange = (
  tweetElement: HTMLElement,
  action: "like" | "unlike",
): void => {
  const isLiked = Boolean(tweetElement.querySelector(UNLIKE_BUTTON_SELECTOR));

  if (action === "like") {
    if (isLiked) {
      setTweetFollowBadgeLikeAlert(tweetElement, true);
    }
    return;
  }

  if (!isLiked || tweetElement.querySelector(LIKE_BUTTON_SELECTOR)) {
    setTweetFollowBadgeLikeAlert(tweetElement, false);
  }
};

const scheduleLikeAlertUpdate = (tweetElement: HTMLElement, action: "like" | "unlike"): void => {
  [100, 500, 1200].forEach((delayMs) => {
    window.setTimeout(() => updateLikeAlertAfterDomChange(tweetElement, action), delayMs);
  });
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

const refreshAllBadgeLabels = (): void => {
  badgesByUser.forEach((_, screenName) => updateBadgesForUser(screenName));
};

const removeExistingBadge = (userNameElement: HTMLElement): void => {
  const badge = userNameElement.querySelector<HTMLElement>(`.${BADGE_CLASS}`);

  if (!badge) {
    return;
  }

  unregisterBadge(badge.dataset.screenName, badge);
  badge.remove();
};

const handleDocumentClick = (event: MouseEvent): void => {
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }

  const button = target.closest<HTMLButtonElement>(
    `${LIKE_BUTTON_SELECTOR}, ${UNLIKE_BUTTON_SELECTOR}`,
  );
  if (!button) {
    return;
  }

  const tweetElement = button.closest<HTMLElement>(TWEET_SELECTOR);
  if (!tweetElement) {
    return;
  }

  const action = button.getAttribute("data-testid") === "unlike" ? "unlike" : "like";
  scheduleLikeAlertUpdate(tweetElement, action);
};

export const initializeFollowBadgeSystem = (): void => {
  if (initialized) {
    return;
  }
  initialized = true;

  ensureFollowBadgeStyle();

  if (!unsubscribeFollowState) {
    unsubscribeFollowState = subscribeFollowState((screenName) => {
      updateBadgesForUser(screenName);
    });
  }

  i18n.subscribe(refreshAllBadgeLabels);
  document.addEventListener("click", handleDocumentClick, true);

  window.addEventListener(SETTINGS_CHANGE_EVENT, () => {
    if (!shouldShowFollowBadge()) {
      document.querySelectorAll<HTMLElement>(`.${BADGE_CLASS}`).forEach((badge) => badge.remove());
      badgesByUser.clear();
      return;
    }

    document
      .querySelectorAll<HTMLElement>(TWEET_SELECTOR)
      .forEach((tweet) => setupFollowBadgeForTweet(tweet));
  });
};

export const setupFollowBadgeForTweet = (tweetElement: HTMLElement): void => {
  const userNameElement = tweetElement.querySelector<HTMLElement>(USER_NAME_SELECTOR);

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
