type JsonRecord = Record<string, unknown>;
type FavoriteTweetListener = (result: FavoriteTweetResult) => void;
type FavoriteTweetWindow = Window &
  typeof globalThis & {
    __xDownloaderFavoriteTweetInterceptorInstalled?: boolean;
  };

declare const unsafeWindow: FavoriteTweetWindow | undefined;

interface TwitterApiError {
  message?: string;
  code?: number;
  kind?: string;
  name?: string;
  source?: string;
}

interface FavoriteTweetApiResponse {
  data?: {
    favorite_tweet?: string;
  };
  errors?: TwitterApiError[];
}

export interface FavoriteTweetResult {
  tweetId: string;
  success: boolean;
  likedThisSession?: boolean;
  status?: number | undefined;
  errorMessage?: string | undefined;
}

const FAVORITE_TWEET_OPERATION = "/FavoriteTweet";
const listeners = new Set<FavoriteTweetListener>();

const isRecord = (value: unknown): value is JsonRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const getPageWindow = (): FavoriteTweetWindow => {
  if (typeof unsafeWindow !== "undefined") {
    return unsafeWindow;
  }
  return window as FavoriteTweetWindow;
};

const getFetchUrl = (input: Parameters<typeof fetch>[0]): string => {
  if (typeof input === "string") {
    return input;
  }

  const href = (input as { href?: unknown }).href;
  if (typeof href === "string") {
    return href;
  }

  const url = (input as { url?: unknown }).url;
  return typeof url === "string" ? url : "";
};

const isFavoriteTweetUrl = (url: string): boolean =>
  url.includes("/i/api/graphql/") && url.includes(FAVORITE_TWEET_OPERATION);

const getString = (value: unknown): string | undefined =>
  typeof value === "string" && value.length > 0 ? value : undefined;

const readTweetIdFromPayload = (payload: unknown): string | undefined => {
  if (!isRecord(payload)) {
    return undefined;
  }

  const variables = payload.variables;
  if (!isRecord(variables)) {
    return undefined;
  }

  return getString(variables.tweet_id);
};

const readTweetIdFromBodyText = (bodyText: string | undefined): string | undefined => {
  if (!bodyText) {
    return undefined;
  }

  try {
    return readTweetIdFromPayload(JSON.parse(bodyText));
  } catch {
    return undefined;
  }
};

const bodyToText = (body: unknown): string | undefined => {
  if (!body) {
    return undefined;
  }

  if (typeof body === "string") {
    return body;
  }

  if (body instanceof URLSearchParams) {
    return body.toString();
  }

  if (body instanceof Blob) {
    return undefined;
  }

  if (body instanceof ArrayBuffer) {
    return new TextDecoder().decode(body);
  }

  if (ArrayBuffer.isView(body)) {
    return new TextDecoder().decode(body);
  }

  return undefined;
};

const getFetchBodyText = async (
  input: Parameters<typeof fetch>[0],
  init: Parameters<typeof fetch>[1],
): Promise<string | undefined> => {
  const initBody = bodyToText(init?.body);
  if (initBody) {
    return initBody;
  }

  const request = input as { clone?: () => { text?: () => Promise<string> } };
  if (typeof request.clone === "function") {
    try {
      const clonedRequest = request.clone();
      if (typeof clonedRequest.text === "function") {
        return await clonedRequest.text();
      }
    } catch {
      return undefined;
    }
  }

  return undefined;
};

const notifyFavoriteTweetResult = (result: FavoriteTweetResult): void => {
  listeners.forEach((listener) => {
    try {
      listener(result);
    } catch {
      // 忽略 listener 错误，避免影响其他 listener
    }
  });
};

const parseFavoriteTweetResponse = (
  tweetId: string,
  payload: unknown,
  status?: number,
): FavoriteTweetResult => {
  if (!isRecord(payload)) {
    return { tweetId, success: false, status };
  }

  const response = payload as FavoriteTweetApiResponse;

  if (response.data?.favorite_tweet === "Done") {
    return { tweetId, success: true, likedThisSession: true, status };
  }

  const [error] = response.errors ?? [];
  if (error?.code === 139 && error.name === "AuthorizationError") {
    return { tweetId, success: true, status };
  }

  return {
    tweetId,
    success: false,
    status,
    errorMessage: error?.message,
  };
};

const readFavoriteTweetFromText = (
  tweetId: string,
  responseText: string,
  status?: number,
): void => {
  const trimmedResponseText = responseText.trim();
  if (!trimmedResponseText) {
    notifyFavoriteTweetResult({ tweetId, success: false, status });
    return;
  }

  try {
    notifyFavoriteTweetResult(
      parseFavoriteTweetResponse(tweetId, JSON.parse(trimmedResponseText), status),
    );
  } catch {
    notifyFavoriteTweetResult({ tweetId, success: false, status });
  }
};

const readFavoriteTweetFromResponse = (tweetId: string, response: Response): void => {
  void response
    .clone()
    .text()
    .then((responseText) => readFavoriteTweetFromText(tweetId, responseText, response.status))
    .catch(() => notifyFavoriteTweetResult({ tweetId, success: false, status: response.status }));
};

const readFavoriteTweetFromXhr = (tweetId: string, xhr: XMLHttpRequest): void => {
  if (xhr.responseType === "json") {
    notifyFavoriteTweetResult(parseFavoriteTweetResponse(tweetId, xhr.response, xhr.status));
    return;
  }

  if (xhr.responseType && xhr.responseType !== "text") {
    notifyFavoriteTweetResult({ tweetId, success: false, status: xhr.status });
    return;
  }

  readFavoriteTweetFromText(tweetId, xhr.responseText, xhr.status);
};

export const installFavoriteTweetResponseInterceptor = (): void => {
  const pageWindow = getPageWindow();
  const xhrBodies = new WeakMap<XMLHttpRequest, unknown>();
  const xhrInstances = new WeakSet<XMLHttpRequest>();

  if (pageWindow.__xDownloaderFavoriteTweetInterceptorInstalled) {
    return;
  }

  pageWindow.__xDownloaderFavoriteTweetInterceptorInstalled = true;

  const originalFetch = pageWindow.fetch.bind(pageWindow);
  const originalXhrOpen = pageWindow.XMLHttpRequest.prototype.open;
  const originalXhrSend = pageWindow.XMLHttpRequest.prototype.send;
  const nativeAddEventListener = pageWindow.XMLHttpRequest.prototype.addEventListener;

  pageWindow.fetch = ((...args: Parameters<typeof fetch>) => {
    const requestUrl = getFetchUrl(args[0]);
    const tweetIdPromise = isFavoriteTweetUrl(requestUrl)
      ? getFetchBodyText(args[0], args[1]).then(readTweetIdFromBodyText)
      : undefined;
    const responsePromise = originalFetch(...args);

    if (tweetIdPromise) {
      void responsePromise
        .then(async (response) => {
          const tweetId = await tweetIdPromise;
          if (tweetId) {
            readFavoriteTweetFromResponse(tweetId, response);
          }
        })
        .catch(() => undefined);
    }

    return responsePromise;
  }) as typeof fetch;

  pageWindow.XMLHttpRequest.prototype.open = function openWithFavoriteTweetTracking(
    this: XMLHttpRequest,
    method: string,
    url: string | URL,
    async?: boolean,
    username?: string | null,
    password?: string | null,
  ) {
    // 标记这是我们需要拦截的 XHR 实例
    if (isFavoriteTweetUrl(String(url))) {
      xhrInstances.add(this);
    }

    if (typeof async === "boolean") {
      originalXhrOpen.call(this, method, url, async, username, password);
      return;
    }

    originalXhrOpen.call(this, method, url, true);
  } as typeof pageWindow.XMLHttpRequest.prototype.open;

  pageWindow.XMLHttpRequest.prototype.send = function sendWithFavoriteTweetTracking(
    ...args: Parameters<XMLHttpRequest["send"]>
  ) {
    // 只对标记的 FavoriteTweet 请求注册监听器
    if (xhrInstances.has(this)) {
      const capturedThis = this;
      xhrBodies.set(this, args[0]);

      // 使用原生 addEventListener 直接挂载，绕过所有包装层
      nativeAddEventListener.call(
        this,
        "loadend",
        function () {
          const body = xhrBodies.get(capturedThis);
          const tweetId = readTweetIdFromBodyText(bodyToText(body));
          if (tweetId) {
            readFavoriteTweetFromXhr(tweetId, capturedThis);
          }
        },
        { once: true },
      );
    }

    return originalXhrSend.apply(this, args);
  };
};

export const subscribeFavoriteTweetResponse = (listener: FavoriteTweetListener): (() => void) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};
