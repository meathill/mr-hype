# @mr-hype/mobile（占位）

鸡血君移动端，**尚未实现**。本轮专注网页端（`apps/web`）。

## 规划

- 用 **Expo（React Native）** 搭建，复用 `@mr-hype/shared`（类型、内容模型、模板配置、生成逻辑）。
- 壁纸渲染：写一版 React Native 的 `Wallpaper` 组件，消费 `@mr-hype/shared` 的 `computeWallpaperLayout()`（与网页端同一套尺寸算法）。
- 鉴权：复用同一套 BetterAuth 后端（`apps/web` 暴露的 `/api/auth`）。

启动移动端开发时再补充。
