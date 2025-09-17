/**
 * 下载相关工具函数
 */

/**
 * 下载文件
 */
export async function downloadFile(url: string, fileName: string): Promise<void> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob();

    // 创建临时链接进行下载
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
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
  }
}

/**
 * 从 URL 提取文件信息
 */
export function extractFileInfo(src: string): { picname: string; ext: string } {
  const picname = src.split('?')[0]?.split('/').pop() || '';
  const ext = src.includes('format=png') ? 'png' : 'jpg';
  return { picname, ext };
}

/**
 * 生成下载文件名
 */
export function generateFileName(
  template: string,
  variables: Record<string, string>
): string {
  let result = template;
  for (const [key, value] of Object.entries(variables)) {
    result = result.replace(new RegExp(`<%${key}>`, 'g'), value || '');
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
  const array = url.replace(urlRegex, '').split('/');
  return {
    userid: array[0] || 'unknown',
    tid: array[2] || 'unknown',
    picno: array[4] || '1',
  };
}