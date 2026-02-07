// ==UserScript==
// @name         Pixiv Enhanced
// @name:zh-CN   Pixiv 增强
// @author       mengshouer
// @version      0.1.0
// @description  Enhance Pixiv with download and more features. Settings available by hovering mouse to the bottom left corner or via Tampermonkey menu.
// @description:zh-CN  增强 Pixiv，提供下载等功能。鼠标移入浏览器左下角或油猴菜单可打开设置。
// @include      *://www.pixiv.net/artworks/*
// @include      *://pixiv.net/artworks/*
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @license      GPL-3.0 License
// @namespace    https://github.com/mengshouer/UserScripts
// @require     https://cdn.jsdelivr.net/npm/preact@10.28.3/dist/preact.umd.js
// @require     https://cdn.jsdelivr.net/npm/goober@2.1.18/dist/goober.umd.js
// @require     https://cdn.jsdelivr.net/npm/preact@10.28.3/jsx-runtime/dist/jsxRuntime.umd.js
// @require     https://cdn.jsdelivr.net/npm/preact@10.28.3/hooks/dist/hooks.umd.js
// @require     https://cdn.jsdelivr.net/npm/@preact/signals-core@1.13.0/dist/signals-core.min.js
// ==/UserScript==

(function(jsxRuntime2, preact2, hooks, goober2, signalsCore) {
  "use strict";
  const DEFAULT_SETTINGS = {
    fileName: "<%ArtworkId>_p<%PageIndex>_<%AuthorId>",
    showHoverButton: true,
    buttonPositionVertical: "bottom",
    buttonPositionHorizontal: "right",
    buttonPositionVerticalValue: "8",
    buttonPositionHorizontalValue: "8",
    messagePlacement: "top"
  };
  const STORAGE_KEY$1 = "m-userscript-settings";
  const OPEN_SETTINGS_EVENT = "m-open-settings-panel";
  const SETTINGS_CHANGE_EVENT = `${STORAGE_KEY$1}-changed`;
  class StorageManager {
    constructor(storageKey, defaultSettings) {
      this.storageKey = storageKey;
      this.defaultSettings = defaultSettings;
    }
    /**
     * 加载设置
     */
    loadSettings() {
      try {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
          const parsed = JSON.parse(stored);
          return { ...this.defaultSettings, ...parsed };
        }
      } catch (error2) {
        /* @__PURE__ */ console.debug("Failed to load settings:", error2);
      }
      return { ...this.defaultSettings };
    }
    /**
     * 保存设置
     */
    saveSettings(newSettings) {
      const currentSettings = this.loadSettings();
      const updatedSettings = { ...currentSettings, ...newSettings };
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(updatedSettings));
      } catch (error2) {
        /* @__PURE__ */ console.debug("Failed to save settings:", error2);
      }
      return updatedSettings;
    }
    /**
     * 重置为默认设置
     */
    resetSettings() {
      try {
        localStorage.removeItem(this.storageKey);
      } catch (error2) {
        /* @__PURE__ */ console.debug("Failed to reset settings:", error2);
      }
      return { ...this.defaultSettings };
    }
  }
  function formatPositionValue(value) {
    const trimmed = value.trim();
    if (/^\d+$/.test(trimmed)) {
      return `${trimmed}px`;
    }
    return trimmed;
  }
  function preventEventPropagation(e) {
    e.stopPropagation();
    e.preventDefault();
  }
  let downloadCount = 0;
  const beforeUnloadHandler = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };
  const downloadGuard = {
    add: () => {
      if (downloadCount === 0) {
        window.addEventListener("beforeunload", beforeUnloadHandler);
      }
      downloadCount++;
    },
    remove: () => {
      downloadCount--;
      if (downloadCount <= 0) {
        downloadCount = 0;
        window.removeEventListener("beforeunload", beforeUnloadHandler);
      }
    }
  };
  async function downloadFile(url, fileName) {
    downloadGuard.add();
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
    } catch (error2) {
      console.error(`Download failed: ${fileName}`, error2);
      throw error2;
    } finally {
      downloadGuard.remove();
    }
  }
  async function gmDownloadFile(url, fileName, options) {
    downloadGuard.add();
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: "GET",
        url,
        responseType: "blob",
        ...options?.headers && { headers: options.headers },
        onload: (response) => {
          try {
            const blob = response.response;
            const blobUrl = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = blobUrl;
            a.download = fileName;
            a.style.display = "none";
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
              document.body.removeChild(a);
              URL.revokeObjectURL(blobUrl);
            }, 100);
            resolve();
          } catch (error2) {
            reject(error2);
          } finally {
            downloadGuard.remove();
          }
        },
        onerror: (error2) => {
          downloadGuard.remove();
          reject(error2);
        }
      });
    });
  }
  function extractFileInfo(src) {
    const picname = src.split("?")[0]?.split("/").pop() || "";
    const ext = src.includes("format=png") ? "png" : "jpg";
    return { picname, ext };
  }
  function generateFileName(template, variables) {
    let result = template;
    for (const [key, value] of Object.entries(variables)) {
      result = result.replace(new RegExp(`<%${key}>`, "g"), value || "");
    }
    return result;
  }
  function extractUrlInfo(url) {
    const urlRegex = /https:\/\/(twitter|x)\.com\//;
    const array = url.replace(urlRegex, "").split("/");
    return {
      userid: array[0] || "unknown",
      tid: array[2] || "unknown",
      picno: array[4] || "1"
    };
  }
  goober2.setup(preact2.h);
  const MessageContainer = goober2.styled("div")`
  position: relative;
  min-width: 250px;
  max-width: 400px;
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 14px;
  line-height: 1.4;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  color: #fff;

  &.message-success {
    --msg-color: 34, 197, 94;
  }

  &.message-error {
    --msg-color: 239, 68, 68;
  }

  &.message-warning {
    --msg-color: 245, 158, 11;
  }

  &.message-info {
    --msg-color: 59, 130, 246;
  }

  &[class*="message-"] {
    background-color: rgba(var(--msg-color), 0.4);
    border: 1px solid rgba(var(--msg-color), 0.7);
  }
`;
  const CloseIcon = goober2.styled("span")`
  float: right;
  margin-left: 8px;
  font-weight: bold;
  opacity: 0.7;
  font-size: 16px;
  line-height: 1;

  &:hover {
    opacity: 1;
  }
`;
  function Message({
    type = "info",
    content,
    duration = 3e3,
    onClose,
    onClick,
    className,
    style
  }) {
    const timerRef = hooks.useRef(null);
    const startTimeRef = hooks.useRef(0);
    const remainingTimeRef = hooks.useRef(duration);
    const clearTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
    const startTimer = (time) => {
      clearTimer();
      if (time > 0) {
        startTimeRef.current = Date.now();
        timerRef.current = window.setTimeout(() => {
          onClose?.();
        }, time);
      }
    };
    const pauseTimer = () => {
      if (timerRef.current) {
        const elapsed = Date.now() - startTimeRef.current;
        remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
        clearTimer();
      }
    };
    const resumeTimer = () => {
      if (remainingTimeRef.current > 0) {
        startTimer(remainingTimeRef.current);
      }
    };
    hooks.useEffect(() => {
      if (duration > 0) {
        remainingTimeRef.current = duration;
        startTimer(duration);
      }
      return clearTimer;
    }, [duration, onClose]);
    return /* @__PURE__ */ jsxRuntime2.jsxs(
      MessageContainer,
      {
        className: `message-${type} ${className || ""}`,
        style,
        onClick: () => {
          onClick?.();
          onClose?.();
        },
        onMouseEnter: pauseTimer,
        onMouseLeave: resumeTimer,
        children: [
          content,
          /* @__PURE__ */ jsxRuntime2.jsx(CloseIcon, { children: "×" })
        ]
      }
    );
  }
  const getUserMessagePlacement = () => {
    try {
      const settings = JSON.parse(localStorage.getItem(STORAGE_KEY$1) || "{}");
      return settings.messagePlacement || "top";
    } catch {
      return "top";
    }
  };
  const containers = /* @__PURE__ */ new Map();
  let messageCount = 0;
  const getPositionStyle = (placement) => {
    const [vertical, horizontal] = placement.split("-");
    const isBottom = vertical === "bottom";
    const direction = isBottom ? "column-reverse" : "column";
    let position = `${vertical}: 20px; display: flex; flex-direction: ${direction};`;
    if (horizontal) {
      position += ` ${horizontal}: 20px;`;
    } else {
      position += " left: 50%; transform: translateX(-50%);";
    }
    return position;
  };
  const getContainer = (placement = "top") => {
    if (!containers.has(placement)) {
      const container = document.createElement("div");
      container.id = `userscript-message-container-${placement}`;
      container.style.cssText = `
      position: fixed;
      z-index: 9999;
      pointer-events: none;
      ${getPositionStyle(placement)}
    `;
      document.body.appendChild(container);
      containers.set(placement, container);
    }
    return containers.get(placement);
  };
  const show = (config) => {
    const placement = config.placement || "top";
    const container = getContainer(placement);
    const messageId = `userscript-message-${++messageCount}`;
    const messageElement = document.createElement("div");
    messageElement.id = messageId;
    const isBottom = placement.startsWith("bottom");
    messageElement.style.cssText = `
    position: relative;
    margin-bottom: 8px;
    pointer-events: auto;
    animation: ${isBottom ? "messageSlideInBottom" : "messageSlideIn"} 0.3s ease-out;
  `;
    container.appendChild(messageElement);
    const onClose = () => {
      if (messageElement.parentNode) {
        const isBottom2 = placement.startsWith("bottom");
        messageElement.style.animation = `${isBottom2 ? "messageSlideOutBottom" : "messageSlideOut"} 0.3s ease-in forwards`;
        setTimeout(() => {
          if (messageElement.parentNode) {
            messageElement.parentNode.removeChild(messageElement);
          }
        }, 300);
      }
    };
    preact2.render(preact2.h(Message, { ...config, onClose }), messageElement);
    return onClose;
  };
  const createMessageMethod = (type) => (content, duration, placement, onClick) => show({
    type,
    content,
    placement: placement || getUserMessagePlacement(),
    ...onClick && { onClick },
    ...duration !== void 0 && { duration }
  });
  const success = createMessageMethod("success");
  const error = createMessageMethod("error");
  const warning = createMessageMethod("warning");
  const info = createMessageMethod("info");
  const destroy = () => {
    containers.forEach((container) => {
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
    });
    containers.clear();
  };
  const message = { success, error, warning, info, destroy };
  const MESSAGE_STYLE_ID = "userscript-message-styles";
  if (!document.getElementById(MESSAGE_STYLE_ID)) {
    const style = document.createElement("style");
    style.id = MESSAGE_STYLE_ID;
    style.textContent = `
  @keyframes messageSlideIn {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes messageSlideOut {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(-100%);
      opacity: 0;
    }
  }

  @keyframes messageSlideInBottom {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes messageSlideOutBottom {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(100%);
      opacity: 0;
    }
  }
`;
    document.head.appendChild(style);
  }
  const DEFAULT_LOCALE = "en";
  const STORAGE_KEY = "userscript-locale";
  let currentLocale = DEFAULT_LOCALE;
  const translations = {};
  const listeners = [];
  const detectBrowserLocale = () => navigator?.language?.toLowerCase().startsWith("zh") ? "zh" : "en";
  try {
    currentLocale = localStorage.getItem(STORAGE_KEY) || detectBrowserLocale();
  } catch {
    currentLocale = detectBrowserLocale();
  }
  const deepMerge = (target, source) => {
    const result = { ...target };
    for (const key of Object.keys(source)) {
      if (source[key] !== null && typeof source[key] === "object" && !Array.isArray(source[key]) && target[key] !== null && typeof target[key] === "object" && !Array.isArray(target[key])) {
        result[key] = deepMerge(target[key], source[key]);
      } else {
        result[key] = source[key];
      }
    }
    return result;
  };
  const getNestedValue = (obj, path) => {
    let result = obj;
    for (const key of path.split(".")) {
      result = result?.[key];
      if (!result) return void 0;
    }
    return typeof result === "string" ? result : void 0;
  };
  const interpolate = (template, params) => {
    if (!params) return template;
    return template.replace(/\{(\w+)\}/g, (_, key) => params[key] ?? "{" + key + "}");
  };
  function t(keyOrOptions, params) {
    const key = typeof keyOrOptions === "string" ? keyOrOptions : keyOrOptions.key;
    const actualParams = typeof keyOrOptions === "string" ? params : keyOrOptions.params;
    const text = getNestedValue(translations[currentLocale], key) || getNestedValue(translations[DEFAULT_LOCALE], key) || key;
    return interpolate(text, actualParams);
  }
  const i18n = {
    addTranslations(locale, data) {
      translations[locale] = deepMerge(translations[locale] || {}, data);
    },
    setLocale(locale) {
      if (currentLocale !== locale) {
        currentLocale = locale;
        try {
          localStorage.setItem(STORAGE_KEY, locale);
        } catch {
        }
        listeners.forEach((callback) => callback());
      }
    },
    getLocale() {
      return currentLocale;
    },
    t,
    subscribe(callback) {
      listeners.push(callback);
      return () => {
        const index = listeners.indexOf(callback);
        if (index > -1) listeners.splice(index, 1);
      };
    }
  };
  function useI18n() {
    const [locale, setLocaleState] = hooks.useState(i18n.getLocale());
    hooks.useEffect(() => {
      const unsubscribe = i18n.subscribe(() => {
        setLocaleState(i18n.getLocale());
      });
      return unsubscribe;
    }, []);
    const setLocale = (newLocale) => i18n.setLocale(newLocale);
    return { t: i18n.t, locale, setLocale };
  }
  async function copyToClipboard(text) {
    try {
      let successful = false;
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        successful = true;
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        successful = document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      if (successful) {
        message.success(i18n.t("ui.copied"));
      } else {
        message.error(i18n.t("ui.copyFailed"));
      }
      return successful;
    } catch (error2) {
      console.error("Failed to copy to clipboard:", error2);
      message.error(i18n.t("ui.copyFailed"));
      return false;
    }
  }
  function getThemeConfig(isDark) {
    return {
      textColor: isDark ? "#e1e8ed" : "#333",
      backgroundColor: isDark ? "#1e1e1e" : "white",
      borderColor: isDark ? "#38444d" : "#ddd",
      secondaryTextColor: isDark ? "#8b98a5" : "#666",
      inputBackground: isDark ? "#253341" : "white",
      inputBorder: isDark ? "#38444d" : "#ddd",
      panelBackground: isDark ? "#1e1e1e" : "white"
    };
  }
  function useTheme() {
    const [isDark, setIsDark] = hooks.useState(
      () => window.matchMedia?.("(prefers-color-scheme: dark)").matches || false
    );
    hooks.useEffect(() => {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = (e) => setIsDark(e.matches);
      if (media.addEventListener) {
        media.addEventListener("change", handler);
        return () => media.removeEventListener("change", handler);
      } else if (media.addListener) {
        media.addListener(handler);
        return () => media.removeListener?.(handler);
      }
      return void 0;
    }, []);
    return {
      theme: getThemeConfig(isDark),
      isDark
    };
  }
  const keySignals = /* @__PURE__ */ new Map();
  let globalEventListenersAttached = false;
  function getKeySignal(key) {
    if (!keySignals.has(key)) {
      const newSignal = signalsCore.signal(false);
      keySignals.set(key, newSignal);
      return newSignal;
    }
    return keySignals.get(key);
  }
  const handleKeyDown = (e) => {
    const keySignal = keySignals.get(e.key);
    if (keySignal && !keySignal.value) {
      keySignal.value = true;
    }
  };
  const handleKeyUp = (e) => {
    const keySignal = keySignals.get(e.key);
    if (keySignal && keySignal.value) {
      keySignal.value = false;
    }
  };
  const handleBlur = () => {
    keySignals.forEach((keySignal) => {
      if (keySignal.value) {
        keySignal.value = false;
      }
    });
  };
  function attachGlobalEventListeners() {
    if (!globalEventListenersAttached) {
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
      window.addEventListener("blur", handleBlur);
      globalEventListenersAttached = true;
    }
  }
  function useGlobalKey(key) {
    const keySignal = getKeySignal(key);
    const [keyState, setKeyState] = hooks.useState(keySignal.value);
    hooks.useEffect(() => {
      attachGlobalEventListeners();
      const unsubscribe = keySignal.subscribe((value) => {
        setKeyState(value);
      });
      setKeyState(keySignal.value);
      return () => {
        unsubscribe();
      };
    }, [key, keySignal]);
    return keyState ?? false;
  }
  const StyledButton$3 = goober2.styled("button")`
  /* Base styles */
  border-radius: 6px;
  font-weight: 500;
  outline: none;
  border: none;
  cursor: var(--cursor);
  opacity: var(--opacity);

  /* Size variants */
  padding: var(--padding);
  font-size: var(--font-size);

  /* Color variants */
  background: var(--bg);
  color: var(--color);
  border: var(--border);
`;
  const buttonVariants = {
    primary: {
      "--bg": "#1da1f2",
      "--color": "white",
      "--border": "none"
    },
    secondary: (theme) => ({
      "--bg": theme.inputBackground,
      "--color": theme.textColor,
      "--border": `1px solid ${theme.borderColor}`
    }),
    danger: {
      "--bg": "#dc3545",
      "--color": "white",
      "--border": "none"
    }
  };
  const buttonSizes = {
    small: {
      "--padding": "6px 12px",
      "--font-size": "12px"
    },
    medium: {
      "--padding": "8px 16px",
      "--font-size": "14px"
    },
    large: {
      "--padding": "12px 24px",
      "--font-size": "16px"
    }
  };
  function Button({
    children,
    onClick,
    disabled = false,
    variant = "primary",
    size = "medium",
    className = "",
    style = {},
    type = "button"
  }) {
    const { theme } = useTheme();
    const variantStyles = (() => {
      const variantConfig = buttonVariants[variant];
      return typeof variantConfig === "function" ? variantConfig(theme) : variantConfig;
    })();
    const buttonStyle = {
      ...variantStyles,
      ...buttonSizes[size],
      "--cursor": disabled ? "not-allowed" : "pointer",
      "--opacity": disabled ? "0.6" : "1",
      ...style
    };
    return /* @__PURE__ */ jsxRuntime2.jsx(
      StyledButton$3,
      {
        className,
        style: buttonStyle,
        onClick,
        disabled,
        type,
        children
      }
    );
  }
  const Label = goober2.styled("label")`
  display: flex;
  align-items: center;
  cursor: var(--cursor);
  color: var(--text-color);
  opacity: var(--opacity);
`;
  const CheckboxInput = goober2.styled("input")`
  margin-right: 8px;
  accent-color: #1da1f2;
  cursor: var(--cursor);
`;
  function Checkbox({
    checked,
    defaultChecked,
    disabled = false,
    onChange,
    children,
    className = "",
    style = {}
  }) {
    const { theme } = useTheme();
    const checkboxStyle = {
      "--cursor": disabled ? "not-allowed" : "pointer",
      "--text-color": theme.textColor,
      "--opacity": disabled ? "0.6" : "1",
      ...style
    };
    return /* @__PURE__ */ jsxRuntime2.jsxs(Label, { className, style: checkboxStyle, children: [
      /* @__PURE__ */ jsxRuntime2.jsx(
        CheckboxInput,
        {
          type: "checkbox",
          checked,
          defaultChecked,
          disabled,
          onChange: (e) => onChange?.(e.currentTarget.checked),
          style: { "--cursor": disabled ? "not-allowed" : "pointer" }
        }
      ),
      children
    ] });
  }
  const StyledInput = goober2.styled("input")`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--input-border);
  background: var(--input-bg);
  color: var(--input-text);
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #1da1f2;
  }
`;
  function Input({
    type = "text",
    value,
    defaultValue,
    placeholder,
    disabled = false,
    onChange,
    onBlur,
    onFocus,
    className = "",
    style = {}
  }) {
    const { theme } = useTheme();
    const inputStyle = {
      "--input-border": theme.inputBorder,
      "--input-bg": theme.inputBackground,
      "--input-text": theme.textColor,
      ...style
    };
    return /* @__PURE__ */ jsxRuntime2.jsx(
      StyledInput,
      {
        type,
        value,
        defaultValue,
        placeholder,
        disabled,
        className,
        style: inputStyle,
        onChange: (e) => onChange?.(e.currentTarget.value),
        onBlur,
        onFocus
      }
    );
  }
  function Select({ value, options, onChange, placeholder, className, style }) {
    const { theme } = useTheme();
    const selectStyle = {
      padding: "6px 8px",
      borderRadius: "4px",
      border: `1px solid ${theme.borderColor}`,
      backgroundColor: theme.backgroundColor,
      color: theme.textColor,
      fontSize: "14px",
      cursor: "pointer",
      outline: "none",
      ...style
    };
    const handleChange = (event) => {
      const target = event.target;
      onChange(target.value);
    };
    return /* @__PURE__ */ jsxRuntime2.jsxs("select", { value, onChange: handleChange, className, style: selectStyle, children: [
      placeholder && /* @__PURE__ */ jsxRuntime2.jsx("option", { value: "", disabled: true, children: placeholder }),
      options.map((option) => /* @__PURE__ */ jsxRuntime2.jsx("option", { value: option.value, children: option.label }, option.value))
    ] });
  }
  function LanguageSelector({ className, style }) {
    const { theme } = useTheme();
    const { t: t2, locale, setLocale } = useI18n();
    const languages = [
      { value: "zh", label: "中文" },
      { value: "en", label: "English" }
    ];
    return /* @__PURE__ */ jsxRuntime2.jsxs(
      "div",
      {
        className,
        style: { display: "flex", alignItems: "center", gap: "8px", ...style },
        children: [
          /* @__PURE__ */ jsxRuntime2.jsxs(
            "label",
            {
              style: {
                fontSize: "14px",
                fontWeight: 500,
                color: theme.textColor,
                marginBottom: "0"
              },
              children: [
                t2("common.language"),
                ":"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntime2.jsx(Select, { value: locale, options: languages, onChange: (value) => setLocale(value) })
        ]
      }
    );
  }
  function MessagePlacementSelector({
    value,
    onChange,
    className,
    style
  }) {
    const { theme } = useTheme();
    const { t: t2 } = useI18n();
    const placements = [
      { value: "top", label: t2("common.messagePlacement.top") },
      { value: "bottom", label: t2("common.messagePlacement.bottom") },
      { value: "top-left", label: t2("common.messagePlacement.topLeft") },
      { value: "top-right", label: t2("common.messagePlacement.topRight") },
      { value: "bottom-left", label: t2("common.messagePlacement.bottomLeft") },
      { value: "bottom-right", label: t2("common.messagePlacement.bottomRight") }
    ];
    const handlePlacementChange = (newValue) => {
      onChange(newValue);
    };
    return /* @__PURE__ */ jsxRuntime2.jsxs(
      "div",
      {
        className,
        style: { display: "flex", alignItems: "center", gap: "8px", ...style },
        children: [
          /* @__PURE__ */ jsxRuntime2.jsxs(
            "label",
            {
              style: {
                fontSize: "14px",
                fontWeight: 500,
                color: theme.textColor,
                marginBottom: "0"
              },
              children: [
                t2("common.messagePlacement.label"),
                ":"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntime2.jsx(Select, { value, options: placements, onChange: handlePlacementChange })
        ]
      }
    );
  }
  const Overlay = goober2.styled("div")`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10001;
  display: flex;
  align-items: center;
  justify-content: center;
`;
  const ModalContainer = goober2.styled("div")`
  background: var(--modal-bg);
  color: var(--modal-text);
  border-radius: 12px;
  padding: 24px;
  min-width: 480px;
  width: auto;
  max-width: 90vw;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  @media (max-width: 640px) {
    min-width: auto;
    width: 90vw;
  }
`;
  function Modal({
    isOpen,
    onClose,
    title,
    children,
    className = "",
    style = {}
  }) {
    const { theme } = useTheme();
    hooks.useEffect(() => {
      if (!isOpen) return;
      const handleEsc = (e) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      document.addEventListener("keydown", handleEsc);
      return () => document.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);
    if (!isOpen) return null;
    const cssVariables = {
      "--modal-bg": theme.panelBackground,
      "--modal-text": theme.textColor,
      ...style
    };
    const headerStyle = {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: title ? "20px" : "0"
    };
    const titleStyle = {
      margin: 0,
      color: theme.textColor,
      fontSize: "20px",
      fontWeight: 600
    };
    const closeButtonStyle = {
      background: "none",
      border: "none",
      fontSize: "24px",
      cursor: "pointer",
      color: theme.secondaryTextColor,
      padding: 0,
      width: "30px",
      height: "30px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "4px",
      transition: "background-color 0.2s ease"
    };
    return /* @__PURE__ */ jsxRuntime2.jsx(Overlay, { onClick: onClose, children: /* @__PURE__ */ jsxRuntime2.jsxs(
      ModalContainer,
      {
        className,
        style: cssVariables,
        onClick: (e) => e.stopPropagation(),
        children: [
          /* @__PURE__ */ jsxRuntime2.jsxs("div", { style: headerStyle, children: [
            title && /* @__PURE__ */ jsxRuntime2.jsx("h2", { style: titleStyle, children: title }),
            /* @__PURE__ */ jsxRuntime2.jsx(
              "button",
              {
                style: closeButtonStyle,
                onClick: onClose,
                onMouseEnter: (e) => {
                  const target = e.target;
                  target.style.backgroundColor = theme.borderColor;
                },
                onMouseLeave: (e) => {
                  const target = e.target;
                  target.style.backgroundColor = "transparent";
                },
                children: "×"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime2.jsx("div", { children })
        ]
      }
    ) });
  }
  const Card = goober2.styled("div")`
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  padding: 0;
  margin-bottom: 16px;
  transition: all 0.2s ease;

  &:last-child {
    margin-bottom: 0;
  }
`;
  const CardHeader = goober2.styled("div")`
  padding: 16px 20px;
  border-bottom: 1px solid var(--card-border);
  background: var(--card-header-bg);
  border-radius: 12px 12px 0 0;
`;
  const CardTitle = goober2.styled("h3")`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--card-title-color);
  display: flex;
  align-items: center;
  gap: 8px;
`;
  const CardContent = goober2.styled("div")`
  padding: 20px;
`;
  function SettingsCard({ title, children, className = "", style = {} }) {
    const { theme, isDark } = useTheme();
    const cardStyle = {
      "--card-bg": theme.panelBackground,
      "--card-border": theme.borderColor,
      "--card-header-bg": isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(0, 0, 0, 0.01)",
      "--card-title-color": theme.textColor,
      ...style
    };
    return /* @__PURE__ */ jsxRuntime2.jsxs(Card, { className, style: cardStyle, children: [
      title && /* @__PURE__ */ jsxRuntime2.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntime2.jsx(CardTitle, { children: title }) }),
      /* @__PURE__ */ jsxRuntime2.jsx(CardContent, { children })
    ] });
  }
  const StyledButton$2 = goober2.styled("button")`
  position: fixed;
  left: var(--left-position);
  bottom: 20px;
  width: 40px;
  height: 40px;
  background-color: ${(props) => props.$bgColor};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10000;
  color: white;
  transition:
    left 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    opacity 0.2s ease,
    transform 0.2s ease;
  opacity: 0.9;
  border: none;

  &:hover {
    opacity: 1;
    transform: scale(1.05);
  }
`;
  const SettingsIcon = goober2.styled("svg")`
  width: 20px;
  height: 20px;
  fill: currentColor;
`;
  function SettingsButton({
    onClick,
    isVisible,
    backgroundColor = "#1da1f2"
  }) {
    const buttonStyle = {
      "--left-position": isVisible ? "10px" : "-40px"
    };
    return /* @__PURE__ */ jsxRuntime2.jsx(StyledButton$2, { style: buttonStyle, onClick, $bgColor: backgroundColor, children: /* @__PURE__ */ jsxRuntime2.jsx(SettingsIcon, { viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntime2.jsx("path", { d: "M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" }) }) });
  }
  function ButtonPositionSettings({ values, onChange }) {
    const { theme } = useTheme();
    const { t: t2 } = useI18n();
    const labelStyle = {
      display: "block",
      marginBottom: "8px",
      fontWeight: 500,
      fontSize: "14px",
      color: theme.textColor
    };
    return /* @__PURE__ */ jsxRuntime2.jsx(SettingsCard, { title: t2("settings.position.title"), children: /* @__PURE__ */ jsxRuntime2.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "16px" }, children: [
      /* @__PURE__ */ jsxRuntime2.jsxs("div", { style: { display: "flex", gap: "24px", flexWrap: "wrap" }, children: [
        /* @__PURE__ */ jsxRuntime2.jsxs("div", { style: { flex: "1", minWidth: "120px" }, children: [
          /* @__PURE__ */ jsxRuntime2.jsx("label", { style: labelStyle, children: t2("settings.position.vertical") }),
          /* @__PURE__ */ jsxRuntime2.jsxs("div", { style: { display: "flex", gap: "8px" }, children: [
            /* @__PURE__ */ jsxRuntime2.jsx(
              Button,
              {
                variant: values.buttonPositionVertical === "top" ? "primary" : "secondary",
                size: "small",
                onClick: () => onChange("buttonPositionVertical", "top"),
                children: t2("settings.position.top")
              }
            ),
            /* @__PURE__ */ jsxRuntime2.jsx(
              Button,
              {
                variant: values.buttonPositionVertical === "bottom" ? "primary" : "secondary",
                size: "small",
                onClick: () => onChange("buttonPositionVertical", "bottom"),
                children: t2("settings.position.bottom")
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime2.jsxs("div", { style: { flex: "1", minWidth: "120px" }, children: [
          /* @__PURE__ */ jsxRuntime2.jsx("label", { style: labelStyle, children: t2("settings.position.verticalValue") }),
          /* @__PURE__ */ jsxRuntime2.jsx(
            Input,
            {
              value: values.buttonPositionVerticalValue,
              onChange: (value) => onChange("buttonPositionVerticalValue", value),
              placeholder: "8"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime2.jsxs("div", { style: { display: "flex", gap: "24px", flexWrap: "wrap" }, children: [
        /* @__PURE__ */ jsxRuntime2.jsxs("div", { style: { flex: "1", minWidth: "120px" }, children: [
          /* @__PURE__ */ jsxRuntime2.jsx("label", { style: labelStyle, children: t2("settings.position.horizontal") }),
          /* @__PURE__ */ jsxRuntime2.jsxs("div", { style: { display: "flex", gap: "8px" }, children: [
            /* @__PURE__ */ jsxRuntime2.jsx(
              Button,
              {
                variant: values.buttonPositionHorizontal === "left" ? "primary" : "secondary",
                size: "small",
                onClick: () => onChange("buttonPositionHorizontal", "left"),
                children: t2("settings.position.left")
              }
            ),
            /* @__PURE__ */ jsxRuntime2.jsx(
              Button,
              {
                variant: values.buttonPositionHorizontal === "right" ? "primary" : "secondary",
                size: "small",
                onClick: () => onChange("buttonPositionHorizontal", "right"),
                children: t2("settings.position.right")
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime2.jsxs("div", { style: { flex: "1", minWidth: "120px" }, children: [
          /* @__PURE__ */ jsxRuntime2.jsx("label", { style: labelStyle, children: t2("settings.position.horizontalValue") }),
          /* @__PURE__ */ jsxRuntime2.jsx(
            Input,
            {
              value: values.buttonPositionHorizontalValue,
              onChange: (value) => onChange("buttonPositionHorizontalValue", value),
              placeholder: "8"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime2.jsx("div", { style: { fontSize: "12px", color: theme.secondaryTextColor }, children: t2("settings.position.valueHelp") })
    ] }) });
  }
  function createSettingsHook(storageKey, defaultSettings) {
    const storageManager = new StorageManager(storageKey, defaultSettings);
    const settingsSignal = signalsCore.signal(storageManager.loadSettings());
    const computedSettings = signalsCore.computed(() => settingsSignal.value);
    const updateSettings = (newSettings) => {
      const updated = storageManager.saveSettings(newSettings);
      settingsSignal.value = updated;
      window.dispatchEvent(new CustomEvent(SETTINGS_CHANGE_EVENT));
    };
    const resetSettings = () => {
      const reset = storageManager.resetSettings();
      settingsSignal.value = reset;
      window.dispatchEvent(new CustomEvent(SETTINGS_CHANGE_EVENT));
      return reset;
    };
    const getSetting = (key) => {
      return settingsSignal.value[key];
    };
    const setSetting = (key, value) => {
      updateSettings({ [key]: value });
    };
    return {
      // 获取当前设置
      get settings() {
        return computedSettings.value;
      },
      // 更新设置
      updateSettings,
      // 重置设置
      resetSettings,
      // 获取单个设置项
      getSetting,
      // 设置单个设置项
      setSetting,
      // 响应式信号（用于组件订阅）
      signal: settingsSignal
    };
  }
  const settingsHook = createSettingsHook(STORAGE_KEY$1, DEFAULT_SETTINGS);
  function usePixivDownloaderSettings() {
    const [settings, setSettings] = hooks.useState(settingsHook.signal.value);
    hooks.useEffect(() => {
      const unsubscribe = settingsHook.signal.subscribe((value) => {
        setSettings(value);
      });
      return () => unsubscribe();
    }, []);
    return {
      settings,
      setSetting: settingsHook.setSetting,
      updateSettings: settingsHook.updateSettings,
      resetSettings: settingsHook.resetSettings,
      getSetting: settingsHook.getSetting
    };
  }
  const zhTranslations$1 = {
    common: {
      ok: "确定",
      cancel: "取消",
      close: "关闭",
      reset: "重置",
      save: "保存",
      loading: "加载中...",
      error: "错误",
      success: "成功",
      warning: "警告",
      info: "信息",
      language: "语言",
      messagePlacement: {
        label: "消息弹窗位置",
        top: "顶部居中",
        bottom: "底部居中",
        topLeft: "左上角",
        topRight: "右上角",
        bottomLeft: "左下角",
        bottomRight: "右下角"
      }
    },
    button: {
      download: "下载",
      settings: "设置"
    },
    settings: {
      position: {
        title: "按钮位置设置",
        vertical: "垂直方向",
        horizontal: "水平方向",
        top: "上",
        bottom: "下",
        left: "左",
        right: "右",
        verticalValue: "垂直距离",
        horizontalValue: "水平距离",
        valueHelp: "纯数字默认 px，也可输入带单位的值如 1rem、10%"
      }
    }
  };
  const enTranslations$1 = {
    common: {
      ok: "OK",
      cancel: "Cancel",
      close: "Close",
      reset: "Reset",
      save: "Save",
      loading: "Loading...",
      error: "Error",
      success: "Success",
      warning: "Warning",
      info: "Info",
      language: "Language",
      messagePlacement: {
        label: "Message Placement",
        top: "Top Center",
        bottom: "Bottom Center",
        topLeft: "Top Left",
        topRight: "Top Right",
        bottomLeft: "Bottom Left",
        bottomRight: "Bottom Right"
      }
    },
    button: {
      download: "Download",
      settings: "Settings"
    },
    settings: {
      position: {
        title: "Button Position",
        vertical: "Vertical",
        horizontal: "Horizontal",
        top: "Top",
        bottom: "Bottom",
        left: "Left",
        right: "Right",
        verticalValue: "Vertical Offset",
        horizontalValue: "Horizontal Offset",
        valueHelp: "Pure numbers default to px, also supports values like 1rem, 10%"
      }
    }
  };
  const zhTranslations = {
    title: "Pixiv Downloader 设置",
    settings: {
      image: {
        title: "图片下载设置",
        fileName: "图片文件名格式",
        fileNamePlaceholder: "<%ArtworkId>_p<%PageIndex>_<%AuthorId>",
        fileNameHelp: "可用变量：<%ArtworkId>、<%PageIndex>、<%AuthorId>、<%AuthorName>、<%ArtworkTitle>、<%Time>",
        showHoverButton: "显示悬停下载按钮",
        showHoverButtonHelp: "鼠标悬停在图片上时显示下载按钮"
      },
      reset: "重置为默认设置"
    },
    ui: {
      downloadImage: "下载图片",
      downloadAll: "下载全部",
      downloading: "下载中",
      downloadAllTitle: "下载作品的所有图片",
      downloadComplete: "下载完成 ({count} 张)",
      downloadFailed: "下载失败 ({count} 张)，点击定位"
    }
  };
  const enTranslations = {
    title: "Pixiv Downloader Settings",
    settings: {
      image: {
        title: "Image Download Settings",
        fileName: "Image filename format",
        fileNamePlaceholder: "<%ArtworkId>_p<%PageIndex>_<%AuthorId>",
        fileNameHelp: "Available variables: <%ArtworkId>, <%PageIndex>, <%AuthorId>, <%AuthorName>, <%ArtworkTitle>, <%Time>",
        showHoverButton: "Show hover download button",
        showHoverButtonHelp: "Show download button when hovering over images"
      },
      reset: "Reset to default settings"
    },
    ui: {
      downloadImage: "Download Image",
      downloadAll: "Download All",
      downloading: "Downloading",
      downloadAllTitle: "Download all images of this artwork",
      downloadComplete: "Download complete ({count} images)",
      downloadFailed: "Download failed ({count} images), click to locate"
    }
  };
  i18n.addTranslations("zh", zhTranslations$1);
  i18n.addTranslations("zh", zhTranslations);
  i18n.addTranslations("en", enTranslations$1);
  i18n.addTranslations("en", enTranslations);
  function SettingsPanel({ isOpen, onClose }) {
    const { settings, setSetting, resetSettings } = usePixivDownloaderSettings();
    const { t: t2 } = useI18n();
    const { theme, isDark } = useTheme();
    const [resetKey, setResetKey] = hooks.useState(0);
    const toolbarStyle = {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      flexWrap: "wrap",
      gap: "16px",
      padding: "16px",
      marginBottom: "20px",
      background: isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(0, 0, 0, 0.01)",
      border: `1px solid ${theme.borderColor}`,
      borderRadius: "8px"
    };
    const fieldStyle = {
      marginBottom: "20px"
    };
    const labelStyle = {
      display: "block",
      marginBottom: "8px",
      fontWeight: 500,
      fontSize: "14px",
      color: theme.textColor
    };
    const helpTextStyle = {
      marginTop: "6px",
      fontSize: "12px",
      color: theme.secondaryTextColor,
      paddingLeft: "24px"
    };
    return /* @__PURE__ */ jsxRuntime2.jsx(Modal, { isOpen, onClose, title: t2("title"), children: /* @__PURE__ */ jsxRuntime2.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntime2.jsxs("div", { style: toolbarStyle, children: [
        /* @__PURE__ */ jsxRuntime2.jsxs(
          "div",
          {
            style: {
              display: "flex",
              gap: "12px",
              alignItems: "center",
              flexWrap: "wrap",
              flex: "1",
              minWidth: "0"
            },
            children: [
              /* @__PURE__ */ jsxRuntime2.jsx(LanguageSelector, {}),
              /* @__PURE__ */ jsxRuntime2.jsx(
                MessagePlacementSelector,
                {
                  value: settings.messagePlacement,
                  onChange: (placement) => setSetting("messagePlacement", placement)
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntime2.jsx(
          Button,
          {
            variant: "secondary",
            style: { flexShrink: 0 },
            onClick: () => {
              resetSettings();
              setResetKey((prev) => prev + 1);
            },
            children: t2("settings.reset")
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntime2.jsxs(SettingsCard, { title: t2("settings.image.title"), children: [
        /* @__PURE__ */ jsxRuntime2.jsxs("div", { style: fieldStyle, children: [
          /* @__PURE__ */ jsxRuntime2.jsx("label", { style: labelStyle, children: t2("settings.image.fileName") }),
          /* @__PURE__ */ jsxRuntime2.jsx(
            Input,
            {
              value: settings.fileName,
              onChange: (value) => setSetting("fileName", value),
              placeholder: t2("settings.image.fileNamePlaceholder")
            }
          ),
          /* @__PURE__ */ jsxRuntime2.jsx("div", { style: { marginTop: "6px", fontSize: "12px", color: theme.secondaryTextColor }, children: t2("settings.image.fileNameHelp") })
        ] }),
        /* @__PURE__ */ jsxRuntime2.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime2.jsx(
            Checkbox,
            {
              checked: settings.showHoverButton,
              onChange: (checked) => setSetting("showHoverButton", checked),
              children: t2("settings.image.showHoverButton")
            }
          ),
          /* @__PURE__ */ jsxRuntime2.jsx("div", { style: helpTextStyle, children: t2("settings.image.showHoverButtonHelp") })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime2.jsx(
        ButtonPositionSettings,
        {
          values: {
            buttonPositionVertical: settings.buttonPositionVertical,
            buttonPositionHorizontal: settings.buttonPositionHorizontal,
            buttonPositionVerticalValue: settings.buttonPositionVerticalValue,
            buttonPositionHorizontalValue: settings.buttonPositionHorizontalValue
          },
          onChange: (key, value) => {
            setSetting(key, value);
          }
        }
      )
    ] }, resetKey) });
  }
  async function extractArtworkInfo() {
    try {
      const artworkId = window.location.pathname.match(/\/artworks\/(\d+)/)?.[1];
      if (!artworkId) {
        console.warn("[Pixiv Downloader] 无法从 URL 提取作品ID");
        return null;
      }
      const response = await fetch(`https://www.pixiv.net/ajax/illust/${artworkId}`);
      const json = await response.json();
      if (json.error) {
        throw new Error("Failed to fetch artwork info");
      }
      const body = json.body;
      return {
        artworkId: body.illustId,
        authorId: body.userId,
        authorName: body.userName,
        artworkTitle: body.illustTitle,
        pageCount: body.pageCount || 1,
        currentPage: 1
      };
    } catch (error2) {
      console.error("[Pixiv Downloader] 提取作品信息失败:", error2);
      return null;
    }
  }
  async function fetchOriginalUrls(artworkId) {
    const response = await fetch(`https://www.pixiv.net/ajax/illust/${artworkId}/pages`);
    const json = await response.json();
    if (json.error) {
      throw new Error("Failed to fetch artwork pages");
    }
    return json.body.map((page) => page.urls.original);
  }
  async function getImageUrlInfo(img, artworkId) {
    try {
      const anchor = img.closest('a[href*="i.pximg.net/img-original"]');
      if (anchor?.href) {
        const originalUrl = anchor.href;
        const extension = originalUrl.split(".").pop() || "png";
        const pageIndexMatch2 = originalUrl.match(/_p(\d+)\./);
        const pageIndex2 = pageIndexMatch2 ? parseInt(pageIndexMatch2[1] || "0", 10) : 0;
        return {
          originalUrl,
          previewUrl: img.src,
          extension,
          pageIndex: pageIndex2
        };
      }
      const originalUrls = await fetchOriginalUrls(artworkId);
      const pageIndexMatch = img.src.match(/_p(\d+)_/);
      const pageIndex = pageIndexMatch ? parseInt(pageIndexMatch[1] || "0", 10) : 0;
      if (originalUrls[pageIndex]) {
        const originalUrl = originalUrls[pageIndex];
        const extension = originalUrl.split(".").pop() || "png";
        return {
          originalUrl,
          previewUrl: img.src,
          extension,
          pageIndex
        };
      }
      return null;
    } catch (error2) {
      console.error("[Pixiv Downloader] 获取图片URL信息失败:", error2);
      return null;
    }
  }
  async function getAllImageUrls(artworkInfo) {
    try {
      const originalUrls = await fetchOriginalUrls(artworkInfo.artworkId);
      return originalUrls.map((url, index) => ({
        originalUrl: url,
        previewUrl: url.replace("img-original", "img-master").replace(/\.(png|jpg|gif)$/, "_master1200.jpg"),
        extension: url.split(".").pop() || "png",
        pageIndex: index
      }));
    } catch (error2) {
      console.error("[Pixiv Downloader] 获取所有图片URL失败:", error2);
      return [];
    }
  }
  function generatePixivFileName(template, artworkInfo, pageIndex) {
    const variables = {
      ArtworkId: artworkInfo.artworkId,
      PageIndex: String(pageIndex),
      AuthorId: artworkInfo.authorId,
      AuthorName: artworkInfo.authorName,
      ArtworkTitle: artworkInfo.artworkTitle,
      Time: String(Date.now())
    };
    let result = template;
    for (const [key, value] of Object.entries(variables)) {
      result = result.replace(new RegExp(`<%${key}>`, "g"), value || "");
    }
    result = result.replace(/[<>:"/\\|?*]/g, "_");
    return result;
  }
  async function downloadSingleImage(imageInfo, artworkInfo, settings) {
    try {
      const filename = generatePixivFileName(settings.fileName, artworkInfo, imageInfo.pageIndex);
      await gmDownloadFile(imageInfo.originalUrl, `${filename}.${imageInfo.extension}`, {
        headers: { Referer: "https://www.pixiv.net/" }
      });
      /* @__PURE__ */ console.log("[Pixiv Downloader] 下载成功:", filename);
    } catch (error2) {
      console.error("[Pixiv Downloader] 下载失败:", error2);
      throw error2;
    }
  }
  async function downloadAllImages(imageUrls, artworkInfo, settings, onProgress) {
    const total = imageUrls.length;
    const result = { success: 0, failed: [] };
    downloadGuard.add();
    try {
      for (let i = 0; i < total; i++) {
        const imageInfo = imageUrls[i];
        if (!imageInfo) continue;
        if (onProgress) {
          onProgress(i + 1, total);
        }
        try {
          await downloadSingleImage(imageInfo, artworkInfo, settings);
          result.success++;
        } catch (error2) {
          result.failed.push({ pageIndex: imageInfo.pageIndex, error: error2 });
        }
        if (i < total - 1) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }
    } finally {
      downloadGuard.remove();
    }
    /* @__PURE__ */ console.log(
      `[Pixiv Downloader] 下载完成: 成功 ${result.success} 张, 失败 ${result.failed.length} 张`
    );
    return result;
  }
  const spin = goober2.keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
  const StyledDownloadIcon = goober2.styled("svg")`
  width: 20px;
  height: 20px;
  fill: white;
`;
  const StyledLoadingIcon = goober2.styled("svg")`
  width: 18px;
  height: 18px;
  animation: ${spin} 1s linear infinite;
  fill: none;
  stroke: white;
  stroke-width: 2;
`;
  const DownloadIcon = () => /* @__PURE__ */ jsxRuntime2.jsx(StyledDownloadIcon, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntime2.jsx("path", { d: "M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" }) });
  const LoadingIcon = () => /* @__PURE__ */ jsxRuntime2.jsxs(StyledLoadingIcon, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: [
    /* @__PURE__ */ jsxRuntime2.jsx("circle", { cx: "12", cy: "12", r: "10", "stroke-opacity": "0.25" }),
    /* @__PURE__ */ jsxRuntime2.jsx("path", { d: "M12 2 A10 10 0 0 1 22 12", "stroke-linecap": "round" })
  ] });
  const StyledButton$1 = goober2.styled("button")`
  position: fixed;
  left: var(--left-position);
  bottom: 68px;
  height: 40px;
  padding: 0 16px;
  background-color: #0096fa;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  z-index: 10000;
  color: white;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  transition:
    left 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    opacity 0.2s ease,
    transform 0.2s ease;
  opacity: 0.9;
  border: none;

  &:hover:not(:disabled) {
    opacity: 1;
    transform: scale(1.02);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }
`;
  function DownloadAllButton({
    artworkInfo,
    isVisible,
    onDownloadingChange
  }) {
    const [isDownloading, setIsDownloading] = hooks.useState(false);
    const [progress, setProgress] = hooks.useState({ current: 0, total: 0 });
    const { settings } = usePixivDownloaderSettings();
    const { t: t2 } = useI18n();
    const handleDownload = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isDownloading) return;
      setIsDownloading(true);
      onDownloadingChange?.(true);
      setProgress({ current: 0, total: 0 });
      try {
        const imageUrls = await getAllImageUrls(artworkInfo);
        if (imageUrls.length === 0) return;
        const result = await downloadAllImages(imageUrls, artworkInfo, settings, (current, total) => {
          setProgress({ current, total });
        });
        if (result.failed.length > 0) {
          const firstFailed = result.failed[0];
          message.error(
            t2("ui.downloadFailed", { count: result.failed.length }),
            void 0,
            void 0,
            () => {
              const img = document.querySelector(
                `img[src*="i.pximg.net/img-master"][src*="_p${firstFailed?.pageIndex}"]`
              );
              img?.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          );
        } else {
          message.success(t2("ui.downloadComplete", { count: imageUrls.length }));
        }
      } finally {
        setIsDownloading(false);
        onDownloadingChange?.(false);
        setProgress({ current: 0, total: 0 });
      }
    };
    const buttonText = isDownloading ? `${t2("ui.downloading")} ${progress.current}/${progress.total}` : `${t2("ui.downloadAll")} (${artworkInfo.pageCount})`;
    const buttonStyle = {
      "--left-position": isVisible ? "10px" : "-200px"
    };
    return /* @__PURE__ */ jsxRuntime2.jsxs(
      StyledButton$1,
      {
        style: buttonStyle,
        onClick: handleDownload,
        disabled: isDownloading,
        title: t2("ui.downloadAllTitle"),
        children: [
          /* @__PURE__ */ jsxRuntime2.jsx(DownloadIcon, {}),
          /* @__PURE__ */ jsxRuntime2.jsx("span", { children: buttonText })
        ]
      }
    );
  }
  function App() {
    const [isSettingsPanelOpen, setIsSettingsPanelOpen] = hooks.useState(false);
    const [isMouseNearLeft, setIsMouseNearLeft] = hooks.useState(false);
    const [isDownloading, setIsDownloading] = hooks.useState(false);
    const [artworkInfo, setArtworkInfo] = hooks.useState(null);
    const rafIdRef = hooks.useRef(null);
    hooks.useEffect(() => {
      const handleMouseMove = (e) => {
        if (rafIdRef.current !== null) return;
        rafIdRef.current = requestAnimationFrame(() => {
          rafIdRef.current = null;
          const isNear = e.clientX < 100 && e.clientY > window.innerHeight * (2 / 3);
          setIsMouseNearLeft(isNear);
        });
      };
      const handleOpenSettings = () => setIsSettingsPanelOpen(true);
      document.addEventListener("mousemove", handleMouseMove);
      window.addEventListener(OPEN_SETTINGS_EVENT, handleOpenSettings);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener(OPEN_SETTINGS_EVENT, handleOpenSettings);
        if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current);
        }
      };
    }, []);
    hooks.useEffect(() => {
      extractArtworkInfo().then(setArtworkInfo);
    }, []);
    const isVisible = isMouseNearLeft || isSettingsPanelOpen || isDownloading;
    return /* @__PURE__ */ jsxRuntime2.jsxs(jsxRuntime2.Fragment, { children: [
      artworkInfo && /* @__PURE__ */ jsxRuntime2.jsx(
        DownloadAllButton,
        {
          artworkInfo,
          isVisible,
          onDownloadingChange: setIsDownloading
        }
      ),
      /* @__PURE__ */ jsxRuntime2.jsx(
        SettingsButton,
        {
          onClick: () => setIsSettingsPanelOpen(true),
          isVisible,
          backgroundColor: "#0096fa"
        }
      ),
      /* @__PURE__ */ jsxRuntime2.jsx(SettingsPanel, { isOpen: isSettingsPanelOpen, onClose: () => setIsSettingsPanelOpen(false) })
    ] });
  }
  const StyledButton = goober2.styled("button")`
  position: absolute;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid rgba(255, 255, 255, 0.9);
  cursor: pointer;
  opacity: 0.8;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
  transform: scale(1);

  &:hover:not(:disabled) {
    opacity: 1;
    transform: scale(1.05);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
  function HoverDownloadButton({ targetImage }) {
    const { settings } = usePixivDownloaderSettings();
    const [isDownloading, setIsDownloading] = hooks.useState(false);
    if (!settings.showHoverButton) return null;
    const handleDownload = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isDownloading) return;
      setIsDownloading(true);
      try {
        const artworkInfo = await extractArtworkInfo();
        if (!artworkInfo) {
          console.error("[Pixiv Downloader] 无法提取作品信息");
          return;
        }
        const imageInfo = await getImageUrlInfo(targetImage, artworkInfo.artworkId);
        if (!imageInfo) {
          console.error("[Pixiv Downloader] 无法获取图片URL信息");
          return;
        }
        await downloadSingleImage(imageInfo, artworkInfo, settings);
      } catch (error2) {
        console.error("[Pixiv Downloader] 下载失败:", error2);
      } finally {
        setIsDownloading(false);
      }
    };
    const positionStyle = {};
    if (settings.buttonPositionVertical === "top") {
      positionStyle.top = formatPositionValue(settings.buttonPositionVerticalValue);
    } else {
      positionStyle.bottom = formatPositionValue(settings.buttonPositionVerticalValue);
    }
    if (settings.buttonPositionHorizontal === "left") {
      positionStyle.left = formatPositionValue(settings.buttonPositionHorizontalValue);
    } else {
      positionStyle.right = formatPositionValue(settings.buttonPositionHorizontalValue);
    }
    return /* @__PURE__ */ jsxRuntime2.jsx(
      StyledButton,
      {
        onClick: handleDownload,
        disabled: isDownloading,
        title: "下载图片",
        style: positionStyle,
        children: isDownloading ? /* @__PURE__ */ jsxRuntime2.jsx(LoadingIcon, {}) : /* @__PURE__ */ jsxRuntime2.jsx(DownloadIcon, {})
      }
    );
  }
  function findImageContainer(img) {
    const anchor = img.closest('a[href*="i.pximg.net/img-original"]');
    if (anchor?.parentElement) {
      return anchor.parentElement;
    }
    let current = img.parentElement;
    let depth = 0;
    while (current && depth < 5) {
      if (current.tagName === "DIV" && current.style.position !== "static") {
        return current;
      }
      current = current.parentElement;
      depth++;
    }
    return img.parentElement;
  }
  function ensureRelativePosition(element) {
    const position = window.getComputedStyle(element).position;
    if (position === "static") {
      element.style.position = "relative";
    }
  }
  GM_registerMenuCommand("⚙️ Settings / 设置", () => {
    window.dispatchEvent(new CustomEvent(OPEN_SETTINGS_EVENT));
  });
  const IMAGE_SELECTOR = 'img[src*="i.pximg.net/img-master"]';
  const processedImages = /* @__PURE__ */ new WeakSet();
  const getSettings = () => JSON.parse(localStorage.getItem(STORAGE_KEY$1) || "{}");
  const mountHoverButton = (hostElement, targetImage) => {
    const container = document.createElement("div");
    container.style.display = "none";
    hostElement.appendChild(container);
    preact2.render(/* @__PURE__ */ jsxRuntime2.jsx(HoverDownloadButton, { targetImage }), container);
    let isInside = false;
    let rafId = null;
    document.addEventListener("mousemove", (e) => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const rect = hostElement.getBoundingClientRect();
        const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
        if (inside && !isInside) {
          const shouldShow = getSettings().showHoverButton !== false;
          container.style.display = shouldShow ? "block" : "none";
        } else if (!inside && isInside) {
          container.style.display = "none";
        }
        isInside = inside;
      });
    });
  };
  function setupImageInteraction(img) {
    if (processedImages.has(img)) return;
    const imageContainer = findImageContainer(img);
    if (!imageContainer) return;
    ensureRelativePosition(imageContainer);
    mountHoverButton(imageContainer, img);
    processedImages.add(img);
  }
  const scanNodeForMedia = (node) => {
    if (node instanceof HTMLImageElement && node.src.includes("i.pximg.net/img-master")) {
      setupImageInteraction(node);
    } else if (node instanceof Element || node instanceof Document || node instanceof DocumentFragment) {
      node.querySelectorAll(IMAGE_SELECTOR).forEach((img) => setupImageInteraction(img));
    }
  };
  function watchForMedia() {
    const pendingNodes = /* @__PURE__ */ new Set();
    let rafId = null;
    const scheduleScan = (node) => {
      pendingNodes.add(node);
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        pendingNodes.forEach((pendingNode) => {
          scanNodeForMedia(pendingNode);
        });
        pendingNodes.clear();
      });
    };
    scheduleScan(document);
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          scheduleScan(node);
        });
      });
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false
    });
    const cleanup = () => {
      observer.disconnect();
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      pendingNodes.clear();
    };
    window.addEventListener("beforeunload", cleanup);
  }
  function initializeApp() {
    /* @__PURE__ */ console.log("[Pixiv Downloader] 初始化中...");
    const appContainer = document.createElement("div");
    appContainer.id = "pixiv-enhanced-app";
    document.body.appendChild(appContainer);
    preact2.render(/* @__PURE__ */ jsxRuntime2.jsx(App, {}), appContainer);
    watchForMedia();
    /* @__PURE__ */ console.log("[Pixiv Downloader] 初始化完成");
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeApp);
  } else {
    initializeApp();
  }
})(jsxRuntime, preact, preactHooks, goober, preactSignalsCore);
