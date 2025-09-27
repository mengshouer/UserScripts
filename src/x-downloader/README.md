# X-Downloader

[English](#english) | [中文](#中文)

---

## 中文

Twitter/X 媒体下载器，支持图片和视频下载。

### 功能特性

#### 🖼️ 图片下载

- 悬停显示下载按钮，支持 Twitter/X 原生图片下载
- 支持高质量原图下载（自动获取 `:orig` 版本）
- 智能文件命名：支持自定义文件名格式
- 只在图片上悬停时显示按钮，不干扰正常浏览

#### 🎥 视频下载

- 支持 Twitter/X 原生视频下载
- 智能获取视频流地址，自动选择最高画质
- 支持自定义视频文件命名格式
- 在视频暂停或悬停时显示下载按钮

#### 🌐 多语言支持

- 自动检测浏览器语言
- 中文用户自动显示中文界面
- 其他语言用户自动显示英文界面

#### ⚙️ 设置管理

- 可自定义开启/关闭图片下载按钮
- 可自定义开启/关闭视频下载按钮
- 通用下载按钮（在推文操作栏显示）
- 下载时自动点赞功能
- 自定义文件名格式（支持变量替换）

### 安装

- [安装压缩版](https://raw.githubusercontent.com/mengshouer/UserScripts/refs/heads/release/x-downloader.min.user.js)
- [安装开发版](https://raw.githubusercontent.com/mengshouer/UserScripts/refs/heads/release/x-downloader.user.js)

---

## English

Twitter/X media downloader that supports downloading images and videos.

### Features

#### 🖼️ Image Download

- Hover to show download button for Twitter/X native images
- Support high-quality original image download (auto-fetch `:orig` version)
- Smart file naming with customizable format
- Button only shows on image hover, non-intrusive browsing

#### 🎥 Video Download

- Support Twitter/X native video download
- Smart video stream URL extraction with highest quality selection
- Customizable video file naming format
- Download button appears on video pause or hover

#### 🌐 Multi-language Support

- Automatic browser language detection
- Chinese users get Chinese interface automatically
- Other language users get English interface automatically

#### ⚙️ Settings Management

- Toggle image download button on/off
- Toggle video download button on/off
- Universal download button (shows in tweet actions)
- Auto-like on download feature
- Customizable filename format (with variable substitution)

### Installation

- [Install Minified](https://raw.githubusercontent.com/mengshouer/UserScripts/refs/heads/release/x-downloader.min.user.js)
- [Install Development](https://raw.githubusercontent.com/mengshouer/UserScripts/refs/heads/release/x-downloader.user.js)

### Technical Details

Built with modern web technologies:

- **Frontend**: Preact + TypeScript + JSX
- **Styling**: CSS-in-JS (Goober) with theme support
- **State Management**: @preact/signals-core
- **Internationalization**: Custom lightweight i18n system (~2KB)
- **Bundle Size**: ~19.6KB (gzipped)

### Thanks

- [TwitterMediaHarvest](https://github.com/EltonChou/TwitterMediaHarvest)
