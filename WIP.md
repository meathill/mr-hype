# WIP / 待办

网页端 MVP 已搭好并跑通（首页/生成/结果/下载/目标/模板/我的/收藏/登录/关于/使用说明）。
以下为本轮**有意延后**的项，按优先级排列。

## 近期

- [ ] **壁纸下载升级到服务端渲染**（Satori + resvg on Worker）——彻底解决 iOS `<a download>`、字体保真、全分辨率导出。当前 html-to-image 在真实浏览器可用，但 iOS/字体有风险。详见 DEV_NOTE。
- [ ] **真 Claude 文案**：seam 已就位（`src/lib/ai.ts`），配 `ANTHROPIC_API_KEY`（`.dev.vars` + `wrangler secret`）即开，需联调与调 prompt。
- [ ] **多尺寸导出**：目前只做锁屏比例；补桌面 / 社交分享图尺寸。

## 账号 / 安全

- [ ] 社交登录：Apple / Google（BetterAuth 原生），微信（需自定义 OAuth）。
- [ ] 邮箱验证 + 找回密码（接 Cloudflare Email）。
- [ ] regen 每日 3 次的**服务端限流**（KV 计数，按 userId/IP），现仅客户端限制。

## 体验

- [ ] 暗色模式开关（token 已就绪，缺切换入口）。
- [ ] 历史/收藏的「再次下载」与「设为今日」。
- [ ] `mui-mascot.png`（639KB）压缩。

## 移动端

- [ ] `apps/mobile` 用 Expo 实现，复用 `@mr-hype/shared`，壁纸写 RN 版 `Wallpaper` 消费同一 `computeWallpaperLayout()`，鉴权复用 `/api/auth`。

## 部署前（owner）

- [ ] `wrangler login` → `wrangler d1 create mr-hype` → 回填 `wrangler.jsonc` 的 `database_id`。
- [ ] `wrangler secret put BETTER_AUTH_SECRET`（线上随机强密钥）。
- [ ] `db:migrate:remote` → `deploy`。
