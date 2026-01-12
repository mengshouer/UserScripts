import type { LocaleData } from "../types";

export const zhTranslations: LocaleData = {
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
      bottomRight: "右下角",
    },
  },
  button: {
    download: "下载",
    settings: "设置",
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
      valueHelp: "纯数字默认 px，也可输入带单位的值如 1rem、10%",
    },
  },
};
