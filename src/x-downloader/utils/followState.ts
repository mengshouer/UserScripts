type FollowStateListener = (screenName: string, following: boolean) => void;
type JsonRecord = Record<string, unknown>;
type FollowStateWindow = Window &
  typeof globalThis & {
    __xDownloaderFollowStateInterceptorInstalled?: boolean;
  };

declare const unsafeWindow: FollowStateWindow | undefined;

const followStateCache = new Map<string, boolean>();
const listeners = new Set<FollowStateListener>();
const MAX_FOLLOW_STATE_CACHE_SIZE = 1000;

const normalizeScreenName = (screenName: string) => screenName.toLowerCase();

const isRecord = (value: unknown): value is JsonRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const getRecord = (value: unknown): JsonRecord | undefined => {
  if (isRecord(value)) {
    return value;
  }
  return undefined;
};

const getString = (value: unknown): string | undefined => {
  if (typeof value === "string" && value.length > 0) {
    return value;
  }
  return undefined;
};

const getBoolean = (value: unknown): boolean | undefined => {
  if (typeof value === "boolean") {
    return value;
  }
  return undefined;
};

const getPageWindow = (): FollowStateWindow => {
  if (typeof unsafeWindow !== "undefined") {
    return unsafeWindow;
  }
  return window as FollowStateWindow;
};

const notifyFollowState = (screenName: string, following: boolean): void => {
  const normalizedScreenName = normalizeScreenName(screenName);
  const previousState = followStateCache.get(normalizedScreenName);

  if (previousState === following) {
    return;
  }

  followStateCache.set(normalizedScreenName, following);

  while (followStateCache.size > MAX_FOLLOW_STATE_CACHE_SIZE) {
    const oldestScreenName = followStateCache.keys().next().value;
    if (!oldestScreenName) break;
    followStateCache.delete(oldestScreenName);
  }

  listeners.forEach((listener) => listener(screenName, following));
};

const readFollowingFromUserResult = (record: JsonRecord): boolean | undefined => {
  const legacy = getRecord(record.legacy);
  const relationshipPerspectives = getRecord(record.relationship_perspectives);
  const viewerRelationships = getRecord(record.viewer_relationships);

  return (
    getBoolean(legacy?.following) ??
    getBoolean(relationshipPerspectives?.following) ??
    getBoolean(viewerRelationships?.following)
  );
};

const readScreenNameFromUserResult = (record: JsonRecord): string | undefined => {
  const core = getRecord(record.core);
  const legacy = getRecord(record.legacy);

  return (
    getString(core?.screen_name) ??
    getString(core?.screenName) ??
    getString(legacy?.screen_name) ??
    getString(record.screen_name) ??
    getString(record.screenName)
  );
};

const collectFollowStates = (payload: unknown): void => {
  const stack: unknown[] = [payload];
  const seen = new WeakSet<object>();

  while (stack.length > 0) {
    const current = stack.pop();

    if (Array.isArray(current)) {
      stack.push(...current);
      continue;
    }

    if (!isRecord(current)) {
      continue;
    }

    if (seen.has(current)) {
      continue;
    }
    seen.add(current);

    const screenName = readScreenNameFromUserResult(current);
    const following = readFollowingFromUserResult(current);

    if (screenName && typeof following === "boolean") {
      notifyFollowState(screenName, following);
    }

    stack.push(...Object.values(current));
  }
};

const getFetchUrl = (input: Parameters<typeof fetch>[0]): string =>
  typeof input === "string" ? input : input instanceof URL ? input.href : (input as Request).url;

const shouldReadGraphqlResponse = (url: string): boolean =>
  url.includes("/graphql/") || url.includes("/i/api/graphql/");

const collectFollowStatesFromText = (responseText: string): void => {
  const trimmedResponseText = responseText.trim();

  if (!trimmedResponseText) {
    return;
  }

  try {
    collectFollowStates(JSON.parse(trimmedResponseText));
  } catch {
    // Ignore non-JSON or truncated GraphQL responses; X can emit empty/stream-like payloads.
  }
};

const readFollowStatesFromResponse = (response: Response): void => {
  if (!response.ok) {
    return;
  }

  void response
    .clone()
    .text()
    .then((responseText) => collectFollowStatesFromText(responseText))
    .catch(() => undefined);
};

const readFollowStatesFromXhr = (xhr: XMLHttpRequest): void => {
  if (xhr.status < 200 || xhr.status >= 300) {
    return;
  }

  if (xhr.responseType === "json") {
    collectFollowStates(xhr.response);
    return;
  }

  if (xhr.responseType && xhr.responseType !== "text") {
    return;
  }

  collectFollowStatesFromText(xhr.responseText);
};

export const installFollowStateInterceptor = (): void => {
  const pageWindow = getPageWindow();
  const xhrUrls = new WeakMap<XMLHttpRequest, string>();

  /*
   * Debug helper for future X GraphQL shape changes.
   * Uncomment when diagnosing follow badge failures:
   *
   * pageWindow.__xDownloaderFollowStateDebug = () => ({
   *   cache: Object.fromEntries(followStateCache),
   *   cacheSize: followStateCache.size,
   * });
   */

  if (pageWindow.__xDownloaderFollowStateInterceptorInstalled) {
    return;
  }

  pageWindow.__xDownloaderFollowStateInterceptorInstalled = true;

  const originalFetch = pageWindow.fetch.bind(pageWindow);
  const originalXhrOpen = pageWindow.XMLHttpRequest.prototype.open;
  const originalXhrSend = pageWindow.XMLHttpRequest.prototype.send;

  pageWindow.fetch = ((...args: Parameters<typeof fetch>) => {
    const responsePromise = originalFetch(...args);
    const requestUrl = getFetchUrl(args[0]);

    if (shouldReadGraphqlResponse(requestUrl)) {
      void responsePromise
        .then((response) => readFollowStatesFromResponse(response))
        .catch(() => undefined);
    }

    return responsePromise;
  }) as typeof fetch;

  pageWindow.XMLHttpRequest.prototype.open = function openWithFollowStateTracking(
    this: XMLHttpRequest,
    method: string,
    url: string | URL,
    async?: boolean,
    username?: string | null,
    password?: string | null,
  ) {
    const requestUrl = String(url);

    if (requestUrl) {
      xhrUrls.set(this, requestUrl);
    }

    if (typeof async === "boolean") {
      originalXhrOpen.call(this, method, url, async, username, password);
      return;
    }

    originalXhrOpen.call(this, method, url, true);
  } as typeof pageWindow.XMLHttpRequest.prototype.open;

  pageWindow.XMLHttpRequest.prototype.send = function sendWithFollowStateTracking(
    ...args: Parameters<XMLHttpRequest["send"]>
  ) {
    const requestUrl = xhrUrls.get(this);

    if (requestUrl && shouldReadGraphqlResponse(requestUrl)) {
      this.addEventListener("loadend", () => readFollowStatesFromXhr(this), { once: true });
    }

    return originalXhrSend.apply(this, args);
  };
};

export const getFollowState = (screenName: string): boolean | undefined =>
  followStateCache.get(normalizeScreenName(screenName));

export const subscribeFollowState = (listener: FollowStateListener): (() => void) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};
