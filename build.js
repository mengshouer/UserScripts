#!/usr/bin/env node

const { execSync, spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

/**
 * Dynamically discovers all scripts under src/.
 * @returns {Record<string, { source: string; output: string; name: string; version: string; description: string }>}
 */
function discoverScripts() {
  const srcDir = "src";
  const scripts = {};

  if (!fs.existsSync(srcDir)) {
    console.warn(`⚠️  Source directory ${srcDir} not found`);
    return scripts;
  }

  // Read every subdirectory under src/
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const scriptName = entry.name;
    // Skip the shared folder
    if (scriptName === "shared") continue;

    const scriptDir = path.join(srcDir, scriptName);

    // Look for index.tsx or index.ts file
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
      // Extract metadata from the entry file if possible
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

/**
 * Extracts userscript metadata block fields from a source file.
 * @param {string} filePath absolute or relative file path
 * @returns {{ name?: string; version?: string; description?: string }}
 */
function extractScriptMetadata(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const metadata = {};

    // Extract information from the UserScript metadata block
    const userScriptMatch = content.match(/\/\/ ==UserScript==([\s\S]*?)\/\/ ==\/UserScript==/);
    if (userScriptMatch) {
      const header = userScriptMatch[1];

      // Grab individual metadata fields
      const nameMatch = header.match(/@name\s+(.+)/);
      if (nameMatch) metadata.name = nameMatch[1].trim();

      const versionMatch = header.match(/@version\s+(.+)/);
      if (versionMatch) metadata.version = versionMatch[1].trim();

      const descMatch = header.match(/@description\s+(.+)/);
      if (descMatch) metadata.description = descMatch[1].trim();
    }

    return metadata;
  } catch (error) {
    console.warn(`⚠️  Failed to extract metadata from ${filePath}:`, error.message);
    return {};
  }
}

// Dynamically discovered script list
const scriptFiles = discoverScripts();

const BUILD_TARGETS = ["dev", "prod", "external"];
const DEFAULT_BUILD_TARGETS = ["dev", "prod", "external"];

/**
 * Parses command line args and returns the requested build targets.
 * @param {string[]} args cli args
 * @returns {string[]} list of targets to build
 */
function resolveBuildTargets(args) {
  const explicitTargets = BUILD_TARGETS.filter((target) => args.includes(`--${target}`));
  if (explicitTargets.length > 0) {
    return Array.from(new Set(explicitTargets));
  }
  return DEFAULT_BUILD_TARGETS;
}

/**
 * Determines watch mode based on CLI flags.
 * @param {string[]} args cli args
 * @returns {"dev"|"prod"|"external"} watch mode
 */
function resolveWatchMode(args) {
  if (args.includes("--prod")) return "prod";
  if (args.includes("--external")) return "external";
  return "dev";
}

/**
 * Converts the base output name to the variant for a specific target.
 * @param {string} baseName base filename
 * @param {"dev"|"prod"|"external"} target build target
 * @returns {string} formatted filename
 */
function formatOutputName(baseName, target) {
  if (target === "prod") return baseName.replace(".user.js", ".min.user.js");
  if (target === "external") return baseName.replace(".user.js", ".external.user.js");
  return baseName;
}

/**
 * Returns a readable label for the given target.
 * @param {"dev"|"prod"|"external"} target build target
 * @returns {string} friendly target label
 */
function describeTarget(target) {
  if (target === "prod") return "minified";
  if (target === "external") return "external";
  return "debug";
}

/**
 * Builds a single script for the requested targets.
 * @param {string} scriptName script folder name
 * @param {string[]} [buildTargets=DEFAULT_BUILD_TARGETS] targets to build
 * @returns {Promise<boolean>} success flag
 */
async function buildScript(scriptName, buildTargets = DEFAULT_BUILD_TARGETS) {
  const config = scriptFiles[scriptName];

  if (!config) {
    console.error(`❌ Script not found: ${scriptName}`);
    console.log("Available scripts:", Object.keys(scriptFiles).join(", "));
    return false;
  }

  // Ensure source file exists before building
  if (!fs.existsSync(config.source)) {
    console.error(`❌ Source file not found: ${config.source}`);
    return false;
  }

  console.log(`🚀 Building ${scriptName} (${buildTargets.join(", ")} mode)...`);

  try {
    for (const target of buildTargets) {
      const label = describeTarget(target);
      console.log(`  🛠️  Building ${label} version...`);
      execSync("npx vite build", {
        stdio: "inherit",
        shell: true,
        env: { ...process.env, SCRIPT: scriptName, BUILD_MODE: target },
      });
      const outputName = formatOutputName(config.output, target);
      console.log(
        `  ✅ ${label.charAt(0).toUpperCase() + label.slice(1)} version -> dist/${outputName}`,
      );
    }

    console.log(`✅ ${scriptName} built successfully`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to build ${scriptName}:`, error.message);
    return false;
  }
}

/**
 * Builds every discovered script for the requested targets.
 * @param {string[]} [buildTargets=DEFAULT_BUILD_TARGETS] targets to build
 * @returns {Promise<boolean>} success flag
 */
async function buildAll(buildTargets = DEFAULT_BUILD_TARGETS) {
  const scriptNames = Object.keys(scriptFiles);

  console.log(`🚀 Building all scripts: ${scriptNames.join(", ")}`);

  let success = 0;
  let failed = 0;

  for (const scriptName of scriptNames) {
    const result = await buildScript(scriptName, buildTargets);
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

/**
 * Starts Vite in watch mode for a given script and target.
 * @param {string} scriptName script folder name
 * @param {"dev"|"prod"|"external"} watchMode target to watch
 * @returns {Promise<never>} never resolves to keep process alive
 */
async function watchScript(scriptName, watchMode = "dev") {
  const config = scriptFiles[scriptName];

  if (!config) {
    console.error(`❌ Script not found: ${scriptName}`);
    console.log("Available scripts:", Object.keys(scriptFiles).join(", "));
    return false;
  }

  // Ensure source file exists before starting watch mode
  if (!fs.existsSync(config.source)) {
    console.error(`❌ Source file not found: ${config.source}`);
    return false;
  }

  const buildMode = watchMode;
  const outputSuffix =
    buildMode === "prod"
      ? ".min.user.js"
      : buildMode === "external"
        ? ".external.user.js"
        : ".user.js";

  console.log(`👀 Watching ${scriptName} for changes (${buildMode} mode)...`);
  console.log(`📁 Source: ${config.source}`);
  console.log(`📦 Output: dist/${config.output.replace(".user.js", outputSuffix)}`);
  console.log("Press Ctrl+C to stop\n");

  // Use Vite watch mode; rely on shell for cross-platform behavior
  const child = spawn("npx", ["vite", "build", "--watch"], {
    stdio: "inherit",
    shell: true,
    env: {
      ...process.env,
      SCRIPT: scriptName,
      BUILD_MODE: buildMode,
    },
  });

  // Handle child process errors
  child.on("error", (error) => {
    console.error("❌ Failed to start watch process:", error.message);
    if (error.code === "ENOENT") {
      console.error("💡 Troubleshooting steps:");
      console.error("   1. Make sure Node.js and npm are properly installed");
      console.error("   2. Verify npx is available in your PATH");
      console.error("   3. Try running: npm install -g npm@latest");
      console.error("   4. If using Windows, make sure to run in Command Prompt or PowerShell");
      console.error("   5. Check if Vite is installed: npm list vite");
    }
    process.exit(1);
  });

  // Handle termination signals
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

/**
 * Prints the discovered scripts and their output destinations.
 * @returns {Promise<void>}
 */
async function listScripts() {
  console.log("📋 Available scripts:");
  const scriptEntries = Object.entries(scriptFiles);

  if (scriptEntries.length === 0) {
    console.log("  ❌ No scripts found in src/ directory");
    console.log("  💡 Create a script by adding src/{script-name}/index.tsx or index.ts");
    return;
  }

  scriptEntries.forEach(([name, config]) => {
    console.log(`  • ${name}: ${config.name} v${config.version}`);
    if (config.description) {
      console.log(`    📄 ${config.description}`);
    }
    console.log(`    📁 Source: ${config.source}`);
    const outputs = ["dev", "prod", "external"].map(
      (target) => `dist/${formatOutputName(config.output, target)}`,
    );
    console.log(`    📦 Output: ${outputs.join(", ")}`);
    console.log("");
  });
}

// Parse CLI arguments
const args = process.argv.slice(2);
const command = args[0];
const buildTargets = resolveBuildTargets(args);

/**
 * Entrypoint for the CLI.
 * @returns {Promise<void>}
 */
async function main() {
  switch (command) {
    case "list":
    case "ls":
      await listScripts();
      break;

    case "all": {
      const success = await buildAll(buildTargets);
      process.exit(success ? 0 : 1);
    }

    case "watch":
    case "w": {
      const scriptName = args.filter((arg) => !arg.startsWith("--"))[1] || "x-downloader";
      const watchMode = resolveWatchMode(args);
      await watchScript(scriptName, watchMode);
      break;
    }

    case undefined:
      console.log("Usage: node build.js [command] [script-name] [--dev|--prod]");
      console.log("Commands:");
      console.log("  list, ls       - List all available scripts");
      console.log("  all            - Build all scripts (both versions)");
      console.log("  watch, w       - Watch specific script for changes");
      console.log("  [script]       - Build specific script");
      console.log("");
      console.log("Options:");
      console.log("  --dev          - Build debug version only");
      console.log("  --prod         - Build minified version only");
      console.log("  --external     - Build external version only");
      console.log("  (default)      - Build debug + minified + external versions");
      console.log("");
      console.log("Examples:");
      console.log("  node build.js watch x-downloader        # Watch dev version");
      console.log("  node build.js watch x-downloader --prod # Watch minified version");
      console.log("  node build.js w --prod                  # Watch minified (default script)");
      console.log("");
      await listScripts();
      break;

    default: {
      // Remove option flags to get the real script name
      const scriptName = args.filter((arg) => !arg.startsWith("--"))[0];
      const result = await buildScript(scriptName, buildTargets);
      process.exit(result ? 0 : 1);
    }
  }
}

main().catch((error) => {
  console.error("❌ Unexpected error:", error);
  process.exit(1);
});
