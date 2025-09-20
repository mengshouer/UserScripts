import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { readdirSync, existsSync } from "fs";
import { join } from "path";

// 获取要构建的脚本名称（从环境变量或命令行参数）
const scriptToBuild = process.env.SCRIPT || "x-downloader";
// 获取构建模式：prod（压缩）或 dev（调试）
const buildMode = process.env.BUILD_MODE || "dev";
const isProd = buildMode === "prod";

// 动态发现脚本函数
function discoverScripts(): Record<string, { source: string; output: string }> {
  const srcDir = "src";
  const scripts: Record<string, { source: string; output: string }> = {};

  if (!existsSync(srcDir)) {
    console.warn(`⚠️  Source directory ${srcDir} not found`);
    return scripts;
  }

  // 读取 src 目录下的所有子目录
  const entries = readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const scriptName = entry.name;
    // 跳过 shared 目录
    if (scriptName === "shared") continue;

    const scriptDir = join(srcDir, scriptName);

    // 查找 index.tsx 或 index.ts 文件
    const indexFiles = ["index.tsx", "index.ts"];
    let entryFile: string | null = null;

    for (const fileName of indexFiles) {
      const filePath = join(scriptDir, fileName);
      if (existsSync(filePath)) {
        entryFile = filePath;
        break;
      }
    }

    if (entryFile) {
      scripts[scriptName] = {
        source: entryFile,
        output: `${scriptName}.user.js`,
      };
    }
  }

  return scripts;
}

// 获取动态发现的脚本列表
const scriptFiles = discoverScripts();
const scriptConfig = scriptFiles[scriptToBuild];

if (!scriptConfig) {
  console.error(`❌ Script configuration not found: ${scriptToBuild}`);
  console.log("Available scripts:", Object.keys(scriptFiles).join(", "));
  process.exit(1);
}

console.log(`🚀 Building script: ${scriptToBuild} (${buildMode} mode)`);

// 自定义插件来处理 UserScript 头部
function preserveUserScriptHeader() {
  let userScriptHeader = "";
  const fs = require("fs");

  return {
    name: "preserve-userscript-header",
    configResolved() {
      // 在配置解析阶段预先提取 UserScript 头部，不干扰后续监听
      if (!scriptConfig) return;

      const entryFile = scriptConfig.source;
      try {
        const code = fs.readFileSync(entryFile, "utf-8");
        const userScriptMatch = code.match(
          /(\/\/ ==UserScript==[\s\S]*?\/\/ ==\/UserScript==)/
        );
        if (userScriptMatch) {
          userScriptHeader = userScriptMatch[1] + "\n\n";
        }
      } catch (error: any) {
        console.warn(
          "⚠️ Failed to extract UserScript header:",
          error?.message || String(error)
        );
      }
    },
    transform(code: string, id: string) {
      // 只处理入口文件，移除 UserScript 头部避免编译错误
      if (
        id.includes("/src/") &&
        (id.endsWith("/index.ts") || id.endsWith("/index.tsx"))
      ) {
        const userScriptMatch = code.match(
          /(\/\/ ==UserScript==[\s\S]*?\/\/ ==\/UserScript==)/
        );
        if (userScriptMatch) {
          return {
            code: code.replace(userScriptMatch[0], ""),
            map: null,
          };
        }
      }
      return null;
    },
    generateBundle(_options: any, bundle: any) {
      // 在输出文件开头添加 UserScript 头部
      for (const fileName in bundle) {
        const chunk = bundle[fileName];
        if (chunk.type === "chunk" && chunk.isEntry && userScriptHeader) {
          chunk.code = userScriptHeader + chunk.code;
        }
      }
    },
  };
}

export default defineConfig({
  build: {
    target: "es2020",
    minify: isProd ? "esbuild" : false,
    rollupOptions: {
      input: scriptConfig.source,
      output: {
        entryFileNames: isProd
          ? scriptConfig.output.replace(".user.js", ".min.user.js")
          : scriptConfig.output,
        dir: "dist",
        format: "iife",
        compact: isProd,
        generatedCode: { preset: "es2015" },
        minifyInternalExports: isProd,
      },
      treeshake: isProd ? { preset: "recommended" } : false,
      watch: {
        include: ["src/**/*"],
        exclude: ["node_modules/**", "dist/**"],
        buildDelay: 300,
        clearScreen: false,
        chokidar: {
          usePolling: true,
          interval: 500,
          binaryInterval: 500,
          ignoreInitial: false,
          followSymlinks: true,
          disableGlobbing: false,
        },
      },
    },
    outDir: "dist",
    emptyOutDir: false,
  },
  plugins: [preact(), preserveUserScriptHeader()],
  esbuild: {
    target: "es2020",
    legalComments: "none",
    minifyIdentifiers: isProd,
    minifySyntax: isProd,
    minifyWhitespace: isProd,
    drop: isProd ? ["console", "debugger"] : [],
    pure: ["console.log", "console.info", "console.debug"],
  },
  // 优化依赖预构建
  optimizeDeps: {
    include: ["preact", "preact/hooks", "@preact/signals-core", "goober"],
    exclude: [],
  },
});
