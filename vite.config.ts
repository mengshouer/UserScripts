import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { readdirSync, existsSync } from 'fs';
import { join } from 'path';

// 获取要构建的脚本名称（从环境变量或命令行参数）
const scriptToBuild = process.env.SCRIPT || 'x-downloader';
// 获取构建模式：prod（压缩）或 dev（调试）
const buildMode = process.env.BUILD_MODE || 'dev';

// 动态发现脚本函数
function discoverScripts(): Record<string, { source: string; output: string }> {
  const srcDir = 'src';
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
    if (scriptName === 'shared') continue;

    const scriptDir = join(srcDir, scriptName);

    // 查找 index.tsx 或 index.ts 文件
    const indexFiles = ['index.tsx', 'index.ts'];
    let entryFile = null;

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
        output: `${scriptName}.user.js`
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
  console.log('Available scripts:', Object.keys(scriptFiles).join(', '));
  process.exit(1);
}

console.log(`🚀 Building script: ${scriptToBuild} (${buildMode} mode)`);

// 自定义插件来处理 UserScript 头部
function preserveUserScriptHeader() {
  let userScriptHeader = '';

  return {
    name: 'preserve-userscript-header',
    load(id: string) {
      // 处理 src/*/index.ts 和 index.tsx 文件
      if (id.includes('/src/') && (id.endsWith('/index.ts') || id.endsWith('/index.tsx') || id.endsWith('.source.ts'))) {
        const fs = require('fs');
        const code = fs.readFileSync(id, 'utf-8');

        // 提取 UserScript 头部
        const userScriptMatch = code.match(/(\/\/ ==UserScript==[\s\S]*?\/\/ ==\/UserScript==)/);
        if (userScriptMatch) {
          userScriptHeader = userScriptMatch[1] + '\n\n';
          // 移除头部，让 TypeScript 编译器不处理注释
          return code.replace(userScriptMatch[0], '');
        }
      }
      return null;
    },
    generateBundle(_options: any, bundle: any) {
      // 在输出文件开头添加 UserScript 头部
      for (const fileName in bundle) {
        const chunk = bundle[fileName];
        if (chunk.type === 'chunk' && chunk.isEntry && userScriptHeader) {
          chunk.code = userScriptHeader + chunk.code;
        }
      }
    }
  };
}

export default defineConfig({
  build: {
    target: 'es2019',
    minify: buildMode === 'prod' ? 'esbuild' : false, // 压缩模式下启用压缩
    rollupOptions: {
      input: scriptConfig.source,
      output: {
        entryFileNames: buildMode === 'prod'
          ? scriptConfig.output.replace('.user.js', '.min.user.js')
          : scriptConfig.output,
        dir: 'dist',
        format: 'iife', // UserScript 需要 IIFE 格式
      },
      treeshake: false // 禁用 tree-shaking
    },
    outDir: 'dist',
    emptyOutDir: false // 不清空输出目录，允许多个脚本共存
  },
  plugins: [
    preact(),
    preserveUserScriptHeader()
  ],
  esbuild: {
    target: 'es2019',
    legalComments: 'none', // 我们要保留源文件中的 UserScript 头部，但需要特殊处理
    minifyIdentifiers: buildMode === 'prod',
    minifySyntax: buildMode === 'prod',
    minifyWhitespace: buildMode === 'prod'
  }
});