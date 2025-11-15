import { readFileSync, existsSync, statSync } from "fs";
import { dirname, join, relative } from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

export interface PackageJson {
  name?: string;
  version?: string;
  main?: string;
  module?: string;
  browser?: string | Record<string, string | boolean>;
  "umd:main"?: string;
  unpkg?: string;
  jsdelivr?: string;
  amdName?: string;
  exports?: Record<string, any>;
}

export interface ExternalDependencyMeta {
  id: string;
  cdnUrl: string;
  globalName: string;
}

export interface CdnConfig {
  provider: "jsdelivr" | "unpkg" | "cdnjs";
  customUrl?: string;
}

interface PackageSpecifier {
  pkgName: string;
  subpath: string | null;
}

const bareImportRE = /^[\w@](?!.*:)/;

const GLOBAL_NAME_OVERRIDES: Record<string, string> = {
  preact: "preact",
  "@preact/signals-core": "preactSignalsCore",
  goober: "goober",
};

const CDN_TEMPLATES = {
  jsdelivr: (pkg: string, version: string, path: string) =>
    `https://cdn.jsdelivr.net/npm/${pkg}@${version}/${path}`,
  unpkg: (pkg: string, version: string, path: string) =>
    `https://unpkg.com/${pkg}@${version}/${path}`,
  cdnjs: (pkg: string, version: string, path: string) =>
    `https://cdnjs.cloudflare.com/ajax/libs/${pkg}/${version}/${path}`,
};

const ENTRY_FIELD_PRIORITY = [
  "umd:main",
  "unpkg",
  "jsdelivr",
  "browser",
] as const;

export class ExternalDependencyResolver {
  private warned = new Set<string>();
  private cdnConfig: CdnConfig;

  constructor(cdnConfig: CdnConfig = { provider: "jsdelivr" }) {
    this.cdnConfig = cdnConfig;
  }

  resolve(specifier: string): ExternalDependencyMeta | null {
    const cleanId = this.sanitizeSpecifier(specifier);
    if (!this.isValidBareImport(cleanId)) {
      return null;
    }

    const { pkgName, subpath } = this.splitPackageSpecifier(cleanId);
    const baseInfo = this.findPackageRoot(pkgName);
    if (!baseInfo || !baseInfo.pkgJson.version) {
      return null;
    }

    let entrySource = baseInfo.pkgJson;
    let relativePrefix = "";

    if (subpath) {
      const nestedInfo = this.findPackageRoot(cleanId);
      if (!nestedInfo) return null;
      entrySource = nestedInfo.pkgJson;
      relativePrefix = relative(baseInfo.pkgDir, nestedInfo.pkgDir);
    }

    const entryFile = this.pickEntryFile(entrySource);
    if (!entryFile) {
      this.warnOnce(specifier, `No UMD entry found for "${specifier}"`);
      return null;
    }

    const normalizedEntry = this.normalizePathFragment(entryFile);
    const normalizedPrefix = relativePrefix
      ? this.normalizePathFragment(relativePrefix)
      : "";
    const cdnPath = normalizedPrefix
      ? `${normalizedPrefix}/${normalizedEntry}`
      : normalizedEntry;
    const packageName = baseInfo.pkgJson.name || pkgName;
    const cdnUrl = this.buildCdnUrl(packageName, baseInfo.pkgJson.version!, cdnPath);
    const globalName = this.deriveGlobalName(entrySource, cleanId);

    return {
      id: cleanId,
      cdnUrl,
      globalName,
    };
  }

  getWarnings(): string[] {
    return Array.from(this.warned);
  }

  private warnOnce(key: string, message: string): void {
    if (!this.warned.has(key)) {
      console.warn(`⚠️  ${message}`);
      this.warned.add(key);
    }
  }

  private buildCdnUrl(pkg: string, version: string, path: string): string {
    if (this.cdnConfig.customUrl) {
      return this.cdnConfig.customUrl
        .replace("{package}", pkg)
        .replace("{version}", version)
        .replace("{path}", path);
    }

    const template = CDN_TEMPLATES[this.cdnConfig.provider];
    return template(pkg, version, path);
  }

  private isValidBareImport(id: string): boolean {
    if (!id || id.startsWith(".") || id.startsWith("/") || id.startsWith("\0")) {
      return false;
    }
    if (id.includes(":") || id.includes("?")) {
      return false;
    }
    if (id.startsWith("src/")) {
      return false;
    }
    return bareImportRE.test(id);
  }

  private sanitizeSpecifier(id: string): string {
    const [withoutQuery = id] = id.split("?");
    const [withoutHash = withoutQuery] = withoutQuery.split("#");
    return withoutHash.replace(/\\/g, "/");
  }

  private splitPackageSpecifier(id: string): PackageSpecifier {
    if (id.startsWith("@")) {
      const segments = id.split("/");
      const scope = segments[0] ?? "";
      const name = segments[1] ?? "";
      const pkgName = name ? `${scope}/${name}` : scope;
      const subpathValue = segments.slice(2).join("/");
      return {
        pkgName,
        subpath: subpathValue ? subpathValue : null,
      };
    }

    const [pkgName = id, ...rest] = id.split("/");
    const subpathValue = rest.join("/");
    return {
      pkgName,
      subpath: subpathValue ? subpathValue : null,
    };
  }

  private findPackageRoot(
    specifier: string,
  ): { pkgDir: string; pkgJson: PackageJson } | null {
    let resolvedPath: string;
    try {
      resolvedPath = require.resolve(specifier, { paths: [process.cwd()] });
    } catch {
      return null;
    }

    const packageJsonPath = this.locateNearestPackageJson(resolvedPath);
    if (!packageJsonPath) return null;

    return {
      pkgDir: dirname(packageJsonPath),
      pkgJson: JSON.parse(readFileSync(packageJsonPath, "utf-8")),
    };
  }

  private locateNearestPackageJson(startPath: string): string | null {
    let currentDir: string;
    try {
      const stat = statSync(startPath);
      currentDir = stat.isDirectory() ? startPath : dirname(startPath);
    } catch {
      currentDir = dirname(startPath);
    }

    while (true) {
      const candidate = join(currentDir, "package.json");
      if (existsSync(candidate)) {
        return candidate;
      }
      const parentDir = dirname(currentDir);
      if (parentDir === currentDir) {
        return null;
      }
      currentDir = parentDir;
    }
  }

  private pickEntryFile(manifest: PackageJson): string | null {
    for (const field of ENTRY_FIELD_PRIORITY) {
      const value = manifest[field];
      if (typeof value === "string" && value.trim().length > 0) {
        return value.trim();
      }
    }

    const exportEntry = manifest?.exports?.["."]?.umd;
    if (typeof exportEntry === "string" && exportEntry.trim().length > 0) {
      return exportEntry.trim();
    }

    return null;
  }

  private normalizePathFragment(fragment: string): string {
    return fragment.replace(/^\.?\//, "").replace(/\\/g, "/");
  }

  private deriveGlobalName(manifest: PackageJson | undefined, fallback: string): string {
    if (GLOBAL_NAME_OVERRIDES[fallback]) {
      return GLOBAL_NAME_OVERRIDES[fallback];
    }

    if (manifest?.amdName && typeof manifest.amdName === "string") {
      return manifest.amdName;
    }

    const source = (manifest?.name as string) || fallback;
    return source
      .replace(/^@/, "")
      .split(/[^a-zA-Z0-9]+/)
      .filter(Boolean)
      .map((segment, index) =>
        index === 0
          ? segment.charAt(0).toLowerCase() + segment.slice(1)
          : segment.charAt(0).toUpperCase() + segment.slice(1),
      )
      .join("");
  }
}

export function buildRequireList(
  externalDeps: Map<string, ExternalDependencyMeta>,
  existingRequires: Set<string>,
): string[] {
  return Array.from(externalDeps.values())
    .map((dep, index) => ({ dep, index }))
    .sort((a, b) => {
      const depthDelta = a.dep.id.split("/").length - b.dep.id.split("/").length;
      if (depthDelta !== 0) return depthDelta;
      return a.index - b.index;
    })
    .map((item) => item.dep.cdnUrl)
    .filter((url) => !existingRequires.has(url));
}

export function appendRequires(header: string, requires: string[]): string {
  if (requires.length === 0) return header;
  const lines = header.split(/\r?\n/);
  const endIndex = lines.findIndex((line) => line.trim() === "// ==/UserScript==");
  const insertionIndex = endIndex === -1 ? lines.length : endIndex;
  const requireLines = requires.map((url) => `// @require     ${url}`);
  lines.splice(insertionIndex, 0, ...requireLines);
  return lines.join("\n");
}
