#!/usr/bin/env node

const { execSync, spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

// 动态发现脚本函数
function discoverScripts() {
  const srcDir = "src";
  const scripts = {};

  if (!fs.existsSync(srcDir)) {
    console.warn(`⚠️  Source directory ${srcDir} not found`);
    return scripts;
  }

  // 读取 src 目录下的所有子目录
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const scriptName = entry.name;
    // 跳过 shared 目录
    if (scriptName === "shared") continue;

    const scriptDir = path.join(srcDir, scriptName);

    // 查找 index.tsx 或 index.ts 文件
    const indexFiles = ["index.tsx", "index.ts"];
    let entryFile = null;

    for (const fileName of indexFiles) {
      const filePath = path.join(scriptDir, fileName);
      if (fs.existsSync(filePath)) {
        entryFile = filePath;
        break;
      }
    }

    if (entryFile) {
      // 尝试从入口文件中提取元数据
      const metadata = extractScriptMetadata(entryFile);

      scripts[scriptName] = {
        source: entryFile,
        output: `${scriptName}.user.js`,
        name: metadata.name || `${scriptName} UserScript`,
        version: metadata.version || "0.0.1",
        description: metadata.description || "",
      };
    }
  }

  return scripts;
}

// 从脚本文件中提取元数据
function extractScriptMetadata(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const metadata = {};

    // 提取 UserScript 头部信息
    const userScriptMatch = content.match(
      /\/\/ ==UserScript==([\s\S]*?)\/\/ ==\/UserScript==/
    );
    if (userScriptMatch) {
      const header = userScriptMatch[1];

      // 提取各种元数据
      const nameMatch = header.match(/@name\s+(.+)/);
      if (nameMatch) metadata.name = nameMatch[1].trim();

      const versionMatch = header.match(/@version\s+(.+)/);
      if (versionMatch) metadata.version = versionMatch[1].trim();

      const descMatch = header.match(/@description\s+(.+)/);
      if (descMatch) metadata.description = descMatch[1].trim();
    }

    return metadata;
  } catch (error) {
    console.warn(
      `⚠️  Failed to extract metadata from ${filePath}:`,
      error.message
    );
    return {};
  }
}

// 获取动态发现的脚本列表
const scriptFiles = discoverScripts();

async function buildScript(scriptName, buildMode = "both") {
  const config = scriptFiles[scriptName];

  if (!config) {
    console.error(`❌ Script not found: ${scriptName}`);
    console.log("Available scripts:", Object.keys(scriptFiles).join(", "));
    return false;
  }

  // 检查源文件是否存在
  if (!fs.existsSync(config.source)) {
    console.error(`❌ Source file not found: ${config.source}`);
    return false;
  }

  console.log(`🚀 Building ${scriptName} (${buildMode} mode)...`);

  try {
    if (buildMode === "both" || buildMode === "dev") {
      // 构建调试版本
      console.log("  📝 Building debug version...");
      execSync("npx vite build", {
        stdio: "inherit",
        shell: true, // 使用 shell 模式，让系统自动处理命令解析
        env: { ...process.env, SCRIPT: scriptName, BUILD_MODE: "dev" },
      });
      console.log(`  ✅ Debug version -> dist/${config.output}`);
    }

    if (buildMode === "both" || buildMode === "prod") {
      // 构建压缩版本
      console.log("  🗜️  Building minified version...");
      execSync("npx vite build", {
        stdio: "inherit",
        shell: true, // 使用 shell 模式，让系统自动处理命令解析
        env: { ...process.env, SCRIPT: scriptName, BUILD_MODE: "prod" },
      });
      const minOutput = config.output.replace(".user.js", ".min.user.js");
      console.log(`  ✅ Minified version -> dist/${minOutput}`);
    }

    console.log(`✅ ${scriptName} built successfully`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to build ${scriptName}:`, error.message);
    return false;
  }
}

async function buildAll() {
  const scriptNames = Object.keys(scriptFiles);

  console.log(`🚀 Building all scripts: ${scriptNames.join(", ")}`);

  let success = 0;
  let failed = 0;

  for (const scriptName of scriptNames) {
    const result = await buildScript(scriptName);
    if (result) {
      success++;
    } else {
      failed++;
    }
  }

  console.log(`\n📊 Build Summary:`);
  console.log(`✅ Success: ${success}`);
  console.log(`❌ Failed: ${failed}`);

  return failed === 0;
}

async function watchScript(scriptName) {
  const config = scriptFiles[scriptName];

  if (!config) {
    console.error(`❌ Script not found: ${scriptName}`);
    console.log("Available scripts:", Object.keys(scriptFiles).join(", "));
    return false;
  }

  // 检查源文件是否存在
  if (!fs.existsSync(config.source)) {
    console.error(`❌ Source file not found: ${config.source}`);
    return false;
  }

  console.log(`👀 Watching ${scriptName} for changes...`);
  console.log(`📁 Source: ${config.source}`);
  console.log(`📦 Output: dist/${config.output}`);
  console.log("Press Ctrl+C to stop\n");

  // 使用 Vite 的 watch 模式，使用 shell 模式保证跨平台兼容性
  const child = spawn("npx", ["vite", "build", "--watch"], {
    stdio: "inherit",
    shell: true, // 使用 shell 模式，让系统自动处理命令解析和路径问题
    env: {
      ...process.env,
      SCRIPT: scriptName,
      BUILD_MODE: "dev",
    },
  });

  // 处理子进程错误
  child.on("error", (error) => {
    console.error("❌ Failed to start watch process:", error.message);
    if (error.code === "ENOENT") {
      console.error("💡 Troubleshooting steps:");
      console.error("   1. Make sure Node.js and npm are properly installed");
      console.error("   2. Verify npx is available in your PATH");
      console.error("   3. Try running: npm install -g npm@latest");
      console.error(
        "   4. If using Windows, make sure to run in Command Prompt or PowerShell"
      );
      console.error("   5. Check if Vite is installed: npm list vite");
    }
    process.exit(1);
  });

  // 处理退出信号
  process.on("SIGINT", () => {
    console.log("\n🛑 Stopping watch mode...");
    child.kill("SIGINT");
    process.exit(0);
  });

  process.on("SIGTERM", () => {
    child.kill("SIGTERM");
    process.exit(0);
  });

  child.on("exit", (code) => {
    if (code !== 0) {
      console.error(`❌ Watch process exited with code ${code}`);
    }
    process.exit(code);
  });

  return new Promise(() => {}); // Keep the process alive
}

async function listScripts() {
  console.log("📋 Available scripts:");
  const scriptEntries = Object.entries(scriptFiles);

  if (scriptEntries.length === 0) {
    console.log("  ❌ No scripts found in src/ directory");
    console.log(
      "  💡 Create a script by adding src/{script-name}/index.tsx or index.ts"
    );
    return;
  }

  scriptEntries.forEach(([name, config]) => {
    console.log(`  • ${name}: ${config.name} v${config.version}`);
    if (config.description) {
      console.log(`    📄 ${config.description}`);
    }
    console.log(`    📁 Source: ${config.source}`);
    console.log(
      `    📦 Output: dist/${config.output} & dist/${config.output.replace(
        ".user.js",
        ".min.user.js"
      )}`
    );
    console.log("");
  });
}

// 命令行参数处理
const args = process.argv.slice(2);
const command = args[0];
const buildMode = args.includes("--prod")
  ? "prod"
  : args.includes("--dev")
  ? "dev"
  : "both";

async function main() {
  switch (command) {
    case "list":
    case "ls":
      await listScripts();
      break;

    case "all": {
      const success = await buildAll();
      process.exit(success ? 0 : 1);
    }

    case "watch":
    case "w": {
      const scriptName = args[1] || "x-downloader";
      await watchScript(scriptName);
      break;
    }

    case undefined:
      console.log(
        "Usage: node build.js [command] [script-name] [--dev|--prod]"
      );
      console.log("Commands:");
      console.log("  list, ls       - List all available scripts");
      console.log("  all            - Build all scripts (both versions)");
      console.log("  watch, w       - Watch specific script for changes");
      console.log("  [script]       - Build specific script");
      console.log("");
      console.log("Options:");
      console.log("  --dev          - Build debug version only");
      console.log("  --prod         - Build minified version only");
      console.log("  (default)      - Build both versions");
      console.log("");
      console.log("Examples:");
      console.log("  node build.js watch x-downloader");
      console.log(
        "  node build.js w                    # Default to x-downloader"
      );
      console.log("");
      await listScripts();
      break;

    default: {
      // 过滤掉选项参数，获取脚本名
      const scriptName = args.filter((arg) => !arg.startsWith("--"))[0];
      const result = await buildScript(scriptName, buildMode);
      process.exit(result ? 0 : 1);
    }
  }
}

main().catch((error) => {
  console.error("❌ Unexpected error:", error);
  process.exit(1);
});
