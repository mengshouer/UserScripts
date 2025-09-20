import { setup } from "goober";
import { h } from "preact";

// 配置 goober 使用 Preact 的 createElement 函数
setup(h);

// 导出常用的 goober 工具
export { styled, css, keyframes, glob } from "goober";
