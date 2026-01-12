/**
 * 下载相关工具函数
 */

// 下载守卫
let downloadCount = 0;
const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
  e.preventDefault();
  e.returnValue = "";
};

export const downloadGuard = {
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
  },
};

/**
 * 下载文件
 */
export async function downloadFile(url: string, fileName: string): Promise<void> {
  downloadGuard.add();
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob();

    // 创建临时链接进行下载
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = fileName;

    // 触发下载
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 清理 URL
    URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error(`Download failed: ${fileName}`, error);
    throw error;
  } finally {
    downloadGuard.remove();
  }
}

export interface GmDownloadOptions {
  headers?: Record<string, string>;
}

/**
 * 使用 GM_xmlhttpRequest 下载文件 (绕过 CORS)
 */
export async function gmDownloadFile(
  url: string,
  fileName: string,
  options?: GmDownloadOptions,
): Promise<void> {
  downloadGuard.add();
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: "GET",
      url,
      responseType: "blob",
      ...(options?.headers && { headers: options.headers }),
      onload: (response) => {
        try {
          const blob = response.response as Blob;
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
        } catch (error) {
          reject(error);
        } finally {
          downloadGuard.remove();
        }
      },
      onerror: (error) => {
        downloadGuard.remove();
        reject(error);
      },
    });
  });
}

/**
 * 从 URL 提取文件信息
 */
export function extractFileInfo(src: string): { picname: string; ext: string } {
  const picname = src.split("?")[0]?.split("/").pop() || "";
  const ext = src.includes("format=png") ? "png" : "jpg";
  return { picname, ext };
}

/**
 * 生成下载文件名
 */
export function generateFileName(template: string, variables: Record<string, string>): string {
  let result = template;
  for (const [key, value] of Object.entries(variables)) {
    result = result.replace(new RegExp(`<%${key}>`, "g"), value || "");
  }
  return result;
}

/**
 * 从 URL 提取信息
 */
export function extractUrlInfo(url: string): {
  userid: string;
  tid: string;
  picno: string;
} {
  const urlRegex = /https:\/\/(twitter|x)\.com\//;
  const array = url.replace(urlRegex, "").split("/");
  return {
    userid: array[0] || "unknown",
    tid: array[2] || "unknown",
    picno: array[4] || "1",
  };
}
