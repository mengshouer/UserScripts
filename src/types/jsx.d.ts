// JSX 类型声明文件
import type { JSX as PreactJSX, VNode } from "preact";

declare global {
  namespace JSX {
    interface Element extends PreactJSX.Element {}
    interface IntrinsicElements extends PreactJSX.IntrinsicElements {}
    interface ElementChildrenAttribute extends PreactJSX.ElementChildrenAttribute {}
  }
}

// goober 与 Preact 的类型兼容
declare module "goober" {
  export function styled<T extends keyof PreactJSX.IntrinsicElements>(
    tag: T,
  ): <P = {}>(
    strings: TemplateStringsArray,
    ...args: any[]
  ) => (props: PreactJSX.IntrinsicElements[T] & P) => VNode<any>;

  export function styled<P = {}>(
    component: (props: P) => VNode<any>,
  ): (strings: TemplateStringsArray, ...args: any[]) => (props: P) => VNode<any>;

  export function css(strings: TemplateStringsArray, ...args: any[]): string;
  export function keyframes(strings: TemplateStringsArray, ...args: any[]): string;
  export function glob(styles: string): void;
  export function setup(pragma: any): void;
}
