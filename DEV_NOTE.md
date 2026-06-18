# 开发笔记

长期需要关注的决策依据与踩坑。新人/未来的自己请先读这里。

## 架构决策

- **网页端用 Next.js（非 Vite）**：PRD 建议 + 需服务端 AI 生成 + 落地页 SEO，故选 Next.js App Router。Vite/vitest 约定保留给 `packages/shared` 与测试。
- **基建全 Cloudflare**：部署 Workers（OpenNext），数据库 D1，按需 KV/R2。ORM 用 Drizzle。
- **共享边界**：`packages/shared` 是框架无关 TS（类型/内容/模板配置/生成逻辑），web 与未来 mobile 共用。壁纸的尺寸算法 `computeWallpaperLayout()` 在 shared（纯函数），DOM 渲染留在各端（web 是 `components/wallpaper.tsx`）。
- **设计来源**：`design/*.dc.html`（Claude Design 导出）已翻译成 React；`鸡血君.dc.html` 的 `DATA()`→`shared/content.ts`，`Wallpaper.dc.html` 的 `cfg()`+`renderVals()`→`shared/templates.ts`。设计系统 `design/colors_and_type.css` 移植为 Tailwind v4 `@theme`（见 `app/globals.css`）。

## Next + OpenNext on Cloudflare

- `next.config.ts` 末尾调 `initOpenNextCloudflareForDev()`，让 `next dev` 拿到本地 D1 等绑定。
- **运行时取绑定**：`getCloudflareContext().env.DB`（封装在 `src/lib/cf.ts`）。**禁用 edge runtime**。
- **读 D1/会话的页面必须 `export const dynamic = 'force-dynamic'`**（`/goal`、`/me`、`/favorites`），否则 build 预渲染时 `getCloudflareContext` 没有请求上下文会报错。
- **env/密钥规范**（按 owner 文章）：构建期 `NEXT_PUBLIC_*` 放 `.env`；运行期普通变量放 `wrangler.jsonc` 的 `vars`；密钥放 `.dev.vars`（本地）/ `wrangler secret`（线上）。**各 env 互不继承，需逐 env 重复声明**，dev/prod 用各自资源 ID。
- `cloudflare-env.d.ts` 由 `pnpm --filter @mr-hype/web cf-typegen` 生成并提交；改了 `wrangler.jsonc` 要重跑。`.dev.vars` 里声明的变量也会被 cf-typegen 收进类型。`src/env.d.ts` 手动补 `ANTHROPIC_API_KEY` 等未进 wrangler.jsonc 的可选变量。

## D1 + Drizzle + BetterAuth

- Schema 在 `src/db/schema.ts`（BetterAuth 四表 + 业务表 goal/favorite/generation）。改 schema 后：`db:generate`（drizzle-kit 出 SQL）→ `db:migrate:local`（wrangler 应用到本地 D1）。迁移文件在 `src/db/migrations/`，**要提交**。
- **BetterAuth 实例按请求构建**（`getAuth()`，DB 绑定来自运行时），不能模块级单例。drizzleAdapter provider `sqlite`。`/api/auth/[...all]` 挂 handler。客户端 `src/lib/auth-client.ts`。
- MVP 关闭邮箱验证/找回（无邮件服务）；登录方式只做邮箱+密码，社交/微信/Apple/手机验证码延后。

## 壁纸下载（重要踩坑）

- 用 html-to-image 客户端截 result 预览节点（`src/lib/download.ts`）。**foreignObject 栅格化在 headless/sandbox 浏览器会挂起**（CI/预览里测不了），真实浏览器可用；两次尝试都加了 6s 超时回退。
- iOS Safari 忽略 `<a download>`，所以下载后弹「保存弹层」让用户**长按存图**；桌面才用 `<a download>`。
- **最稳升级路径（未做）**：服务端 Satori(JSX→SVG)+resvg(SVG→PNG) 在 Worker 里生成真 PNG，彻底解决 iOS/字体/全分辨率问题。

## 约定

- 函数用 `function foo(){}`（非 `const foo = () => {}`）；图标用 `XxxIcon` 别名；**Server Component 里 Phosphor 用 `@phosphor-icons/react/dist/ssr` 入口**，client 用主入口。
- 单文件尽量 <300 行；不内嵌 SVG（用 Phosphor / asset）。
