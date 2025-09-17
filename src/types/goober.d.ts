// goober 与 Preact 的类型兼容性修复
declare module "goober" {
  import { ComponentType } from "preact";

  // 修复泛型支持
  interface StyledFunction {
    <P = {}>(template: TemplateStringsArray, ...args: any[]): (props: P) => any;
  }

  export function styled(tag: string): StyledFunction;
  export function styled<P = {}>(
    component: ComponentType<P>
  ): (template: TemplateStringsArray, ...args: any[]) => (props: P) => any;
  export function css(template: TemplateStringsArray, ...args: any[]): string;
  export function keyframes(
    template: TemplateStringsArray,
    ...args: any[]
  ): string;
  export function glob(css: string): void;
  export function setup(pragma: any): void;
}
