import { defineConfig, type PluginOption } from "vite";
import preact from "@preact/preset-vite";
import { readdirSync, existsSync, readFileSync } from "fs";
import { join } from "path";
import {
  ExternalDependencyResolver,
  type ExternalDependencyMeta,
  buildRequireList,
  appendRequires,
} from "./lib/external-deps.js";

const scriptToBuild = process.env.SCRIPT || "x-downloader";
const buildMode = process.env.BUILD_MODE || "dev";
const isProd = buildMode === "prod";
const isExternal = buildMode === "external";

/**
 * Scans the src directory and returns available script entries.
 */
function discoverScripts(): Record<string, { source: string; output: string }> {
  const srcDir = "src";
  const scripts: Record<string, { source: string; output: string }> = {};

  if (!existsSync(srcDir)) {
    console.warn(`⚠️  Source directory ${srcDir} not found`);
    return scripts;
  }

  const entries = readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const scriptName = entry.name;
    if (scriptName === "shared") continue;

    const scriptDir = join(srcDir, scriptName);
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

const scriptFiles = discoverScripts();
const scriptConfig = scriptFiles[scriptToBuild];

if (!scriptConfig) {
  console.error(`❌ Script configuration not found: ${scriptToBuild}`);
  console.log("Available scripts:", Object.keys(scriptFiles).join(", "));
  process.exit(1);
}

console.log(`🚀 Building script: ${scriptToBuild} (${buildMode} mode)`);

const externalDependencyRegistry = new Map<string, ExternalDependencyMeta>();
const externalResolver = new ExternalDependencyResolver({ provider: "jsdelivr" });

/**
 * Vite plugin that marks bare imports as external and collects CDN metadata.
 */
function userscriptExternalDepsPlugin(
  registry: Map<string, ExternalDependencyMeta>,
  resolver: ExternalDependencyResolver,
) {
  return {
    name: "userscript-external-deps",
    apply: "build" as const,
    enforce: "pre" as const,
    buildStart() {
      registry.clear();
    },
    resolveId(source: string) {
      if (!isExternal) return null;

      if (registry.has(source)) {
        return { id: source, external: true };
      }

      const meta = resolver.resolve(source);
      if (!meta) {
        return null;
      }

      registry.set(meta.id, meta);
      return { id: meta.id, external: true };
    },
    buildEnd() {
      const warnings = resolver.getWarnings();
      if (warnings.length > 0) {
        console.log("\n⚠️  External dependency warnings:");
        warnings.forEach((warning) => console.log(`   ${warning}`));
      }
    },
  };
}

/**
 * Vite plugin that captures the UserScript header and reinjects it post-build.
 */
function preserveUserScriptHeader(options?: {
  externalDeps?: Map<string, ExternalDependencyMeta>;
  enableRequires?: boolean;
}) {
  const externalDeps = options?.externalDeps;
  const enableRequires = Boolean(options?.enableRequires && externalDeps);
  let userScriptHeader = "";
  let existingRequires = new Set<string>();

  return {
    name: "preserve-userscript-header",
    configResolved() {
      if (!scriptConfig) return;

      try {
        const code = readFileSync(scriptConfig.source, "utf-8");
        const userScriptMatch = code.match(/(\/\/ ==UserScript==[\s\S]*?\/\/ ==\/UserScript==)/);
        if (userScriptMatch && typeof userScriptMatch[1] === "string") {
          userScriptHeader = userScriptMatch[1];
          const requireList: string[] = [];
          for (const match of userScriptHeader.matchAll(/@require\s+(.+)/g)) {
            const value = match[1]?.trim();
            if (value) {
              requireList.push(value);
            }
          }
          existingRequires = new Set(requireList);
        }
      } catch (error: any) {
        console.warn("⚠️ Failed to extract UserScript header:", error?.message || String(error));
      }
    },
    transform(code: string, id: string) {
      if (id.includes("/src/") && (id.endsWith("/index.ts") || id.endsWith("/index.tsx"))) {
        const userScriptMatch = code.match(/(\/\/ ==UserScript==[\s\S]*?\/\/ ==\/UserScript==)/);
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
      if (!userScriptHeader) return;

      const requires = enableRequires ? buildRequireList(externalDeps!, existingRequires) : [];
      const headerWithRequires = appendRequires(userScriptHeader, requires) + "\n\n";

      for (const fileName in bundle) {
        const chunk = bundle[fileName];
        if (chunk.type === "chunk" && chunk.isEntry) {
          chunk.code = headerWithRequires + chunk.code;
        }
      }
    },
  };
}

const plugins = [
  isExternal ? userscriptExternalDepsPlugin(externalDependencyRegistry, externalResolver) : null,
  preact(),
  preserveUserScriptHeader({
    externalDeps: externalDependencyRegistry,
    enableRequires: isExternal,
  }),
].filter(Boolean) as PluginOption[];

export default defineConfig({
  build: {
    target: "es2020",
    minify: isProd ? "esbuild" : false,
    rollupOptions: {
      input: scriptConfig.source,
      output: {
        entryFileNames: isProd
          ? scriptConfig.output.replace(".user.js", ".min.user.js")
          : isExternal
            ? scriptConfig.output.replace(".user.js", ".external.user.js")
            : scriptConfig.output,
        dir: "dist",
        format: "iife",
        compact: isProd,
        generatedCode: { preset: "es2015" },
        minifyInternalExports: isProd,
        globals: (id: string) => {
          const meta = externalDependencyRegistry.get(id);
          if (meta) return meta.globalName;
          return externalResolver.resolve(id)?.globalName ?? id;
        },
      },
      treeshake: isProd ? { preset: "recommended" } : false,
      watch: {
        include: ["src/**/*"],
        exclude: ["node_modules/**", "dist/**"],
        buildDelay: 300,
        clearScreen: false,
        chokidar: {
          usePolling: true,
          interval: 1000,
          binaryInterval: 1500,
          ignoreInitial: false,
          followSymlinks: true,
          disableGlobbing: false,
        },
      },
    },
    outDir: "dist",
    emptyOutDir: false,
  },
  plugins,
  esbuild: {
    target: "es2020",
    legalComments: "none",
    minifyIdentifiers: isProd,
    minifySyntax: isProd,
    minifyWhitespace: isProd,
    drop: isProd ? ["console", "debugger"] : [],
    pure: ["console.log", "console.info", "console.debug"],
  },
});
