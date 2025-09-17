// JSX 类型声明文件
import type { JSX as PreactJSX } from 'preact';

declare global {
  namespace JSX {
    interface Element extends PreactJSX.Element {}
    interface IntrinsicElements extends PreactJSX.IntrinsicElements {}
  }
}