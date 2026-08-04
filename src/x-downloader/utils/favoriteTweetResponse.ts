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

/** 消费传入 response 的 body，调用方必须传克隆体，不能传交还给页面的那一份 */
const readFavoriteTweetFromResponseClone = (tweetId: string, responseClone: Response): void => {
  void responseClone
    .text()
    .then((responseText) => readFavoriteTweetFromText(tweetId, responseText, responseClone.status))
    .catch((error: unknown) => {
      // 读取失败是真实的响应异常，照常上报，同时留下诊断信息
      console.warn("[x-downloader] FavoriteTweet response read failed:", error);
      notifyFavoriteTweetResult({ tweetId, success: false, status: responseClone.status });
    });
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
      // 双参数 then 让拒绝分支只归因于请求本身失败；尾部 catch 仅兜住两个 handler
      // 内部的异常，并且必须留下日志——静默吞掉会让监听方只剩 15s 超时这一个信号
      void responsePromise
        .then(
          (response) => {
            // 必须在任何 await 之前同步 clone：页面自己的 handler 在下一个 microtask
            // 就可能读掉 body，那之后 clone 会抛 "body is already used"
            const responseClone = response.clone();

            return tweetIdPromise.then((tweetId) => {
              if (tweetId) {
                readFavoriteTweetFromResponseClone(tweetId, responseClone);
                return;
              }

              // 归因不到 tweetId 时主动释放克隆体，避免 tee 缓冲一直挂着
              void responseClone.body?.cancel().catch(() => undefined);
            });
          },
          async (error: unknown) => {
            // 请求失败（断网 / abort / CORS）时主动上报，否则监听方只能等到超时
            const tweetId = await tweetIdPromise.catch(() => undefined);
            if (tweetId) {
              notifyFavoriteTweetResult({
                tweetId,
                success: false,
                errorMessage: error instanceof Error ? error.message : undefined,
              });
            }
          },
        )
        .catch((error: unknown) => {
          console.warn("[x-downloader] FavoriteTweet interceptor failed:", error);
        });
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
