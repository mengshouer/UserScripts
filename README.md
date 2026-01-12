# UserScripts

[English](#english) | [中文](#中文)

---

## 中文

自用的一些可能有用的油猴脚本，使用这些脚本需要先安装 [Tampermonkey](https://www.tampermonkey.net/) 扩展

### 脚本列表

| 脚本名       | 描述                            | 安装(min) / 备用(jsdelivr)                                                                                                                                                                                 | 安装(unzip)                                                                                              |
| ------------ | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| x-downloader | 给 X 的图片或者视频添加下载按钮 | [安装](https://raw.githubusercontent.com/mengshouer/UserScripts/refs/heads/release/x-downloader.min.user.js) / [备用](https://cdn.jsdelivr.net/gh/mengshouer/UserScripts@release/x-downloader.min.user.js) | [安装](https://raw.githubusercontent.com/mengshouer/UserScripts/refs/heads/release/x-downloader.user.js) |
| pixiv-enhanced | Pixiv 作品下载增强 | [安装](https://raw.githubusercontent.com/mengshouer/UserScripts/refs/heads/release/pixiv-enhanced.min.user.js) / [备用](https://cdn.jsdelivr.net/gh/mengshouer/UserScripts@release/pixiv-enhanced.min.user.js) | [安装](https://raw.githubusercontent.com/mengshouer/UserScripts/refs/heads/release/pixiv-enhanced.user.js) |

---

## English

Some useful UserScripts for personal use, You need to install [Tampermonkey](https://www.tampermonkey.net/) extension first

### Script List

| Script Name  | Description                      | Install (min) / Mirror (jsdelivr)                                                                                                                                                                               | Install (unzip)                                                                                             |
| ------------ | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| x-downloader | Add download buttons for X media | [Install](https://raw.githubusercontent.com/mengshouer/UserScripts/refs/heads/release/x-downloader.min.user.js) / [Mirror](https://cdn.jsdelivr.net/gh/mengshouer/UserScripts@release/x-downloader.min.user.js) | [Install](https://raw.githubusercontent.com/mengshouer/UserScripts/refs/heads/release/x-downloader.user.js) |
| pixiv-enhanced | Enhance Pixiv with download features | [Install](https://raw.githubusercontent.com/mengshouer/UserScripts/refs/heads/release/pixiv-enhanced.min.user.js) / [Mirror](https://cdn.jsdelivr.net/gh/mengshouer/UserScripts@release/pixiv-enhanced.min.user.js) | [Install](https://raw.githubusercontent.com/mengshouer/UserScripts/refs/heads/release/pixiv-enhanced.user.js) |

### Development Setup

#### Install Dependencies

```bash
npm install
```

### Build Commands

#### List Available Scripts

```bash
npm run build:list
# or
node build.js list
```

#### Development Mode

```bash
# Build development version (uncompressed, for debugging)
npm run dev

# Watch mode (auto-rebuild on file changes)
npm run watch
```

#### Production Build

```bash
# Build single script (dev + minified versions)
node build.js x-downloader

# Build minified version only
node build.js x-downloader --prod

# Build all scripts
npm run build:all
```

### Code Quality Checks

```bash
# TypeScript type checking
npm run typecheck

# ESLint code linting
npm run lint

# Code formatting
npm run format
```

### License

GPL-3.0 License
