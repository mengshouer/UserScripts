# Pixiv Enhanced

[English](#english) | [中文](#中文)

---

## 中文

Pixiv 作品下载增强工具，支持悬停下载和批量下载。

### 功能特性

#### 🖼️ 图片下载

- 悬停显示下载按钮，快速下载单张图片
- 支持原图下载（自动获取最高质量版本）
- 批量下载作品的所有图片
- 智能文件命名：支持自定义文件名格式

#### 🌐 多语言支持

- 自动检测浏览器语言
- 中文用户自动显示中文界面
- 其他语言用户自动显示英文界面

#### ⚙️ 设置管理

- 可自定义开启/关闭悬停下载按钮
- 自定义文件名格式（支持变量替换）
- 自定义按钮位置
- 自定义消息提示位置

### 文件名变量

- `<%ArtworkId>`: 作品 ID
- `<%PageIndex>`: 页码索引
- `<%AuthorId>`: 作者 ID
- `<%AuthorName>`: 作者名称
- `<%ArtworkTitle>`: 作品标题
- `<%Time>`: 时间戳

### 安装

- [安装压缩版](https://raw.githubusercontent.com/mengshouer/UserScripts/refs/heads/release/pixiv-enhanced.min.user.js)
- [安装开发版](https://raw.githubusercontent.com/mengshouer/UserScripts/refs/heads/release/pixiv-enhanced.user.js)

---

## English

Pixiv artwork download enhancement tool with hover download and batch download support.

### Features

#### 🖼️ Image Download

- Hover to show download button for quick single image download
- Support original image download (auto-fetch highest quality version)
- Batch download all images in artwork
- Smart file naming with customizable format

#### 🌐 Multi-language Support

- Automatic browser language detection
- Chinese users get Chinese interface automatically
- Other language users get English interface automatically

#### ⚙️ Settings Management

- Toggle hover download button on/off
- Customizable filename format (with variable substitution)
- Customizable button position
- Customizable message placement

### Filename Variables

- `<%ArtworkId>`: Artwork ID
- `<%PageIndex>`: Page index
- `<%AuthorId>`: Author ID
- `<%AuthorName>`: Author name
- `<%ArtworkTitle>`: Artwork title
- `<%Time>`: Timestamp

### Installation

- [Install Minified](https://raw.githubusercontent.com/mengshouer/UserScripts/refs/heads/release/pixiv-enhanced.min.user.js)
- [Install Development](https://raw.githubusercontent.com/mengshouer/UserScripts/refs/heads/release/pixiv-enhanced.user.js)

### Technical Details

Built with modern web technologies:

- **Frontend**: Preact + TypeScript + JSX
- **Styling**: CSS-in-JS (Goober) with theme support
- **State Management**: @preact/signals-core
- **Internationalization**: Custom lightweight i18n system
