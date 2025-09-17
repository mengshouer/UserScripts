# UserScripts

自用的一些可能有用的油猴脚本

## 脚本列表

| 脚本名       | 描述                            | 安装(min)     | 安装(unzip)                        |
| ------------ | ------------------------------- | -------------- | ---------------------------------- |
| x-downloader | 给 X 的图片或者视频添加下载按钮 | [安装](https://raw.githubusercontent.com/mengshouer/UserScripts/refs/heads/release/x-downloader.min.user.js) | [安装](https://raw.githubusercontent.com/mengshouer/UserScripts/refs/heads/release/x-downloader.user.js) |

## 开发环境设置

### 安装依赖

```bash
npm install
```

## 构建命令

### 查看所有可用脚本

```bash
npm run build:list
# 或者
node build.js list
```

### 构建特定脚本

```bash
# 构建 x-downloader
npm run build:x-downloader
# 或者
node build.js x-downloader
```

### 构建所有脚本

```bash
npm run build:all
# 或者
node build.js all
```
