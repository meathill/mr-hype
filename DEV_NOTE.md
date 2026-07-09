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

- 用 html-to-image 客户端截 result 页**可见**的壁纸节点（`src/lib/download.ts` 的 `captureNodeToPng`）。**foreignObject 栅格化在 headless/sandbox 浏览器会挂起**（Claude Preview 这类工具里测不出来），真实浏览器可用；两次尝试（内联字体/`skipFonts`）都加了 6s 超时回退。
- **必须截「可见」节点，不能截藏起来的节点**：曾试过把导出节点挪到屏幕外（`position:fixed;left:-9999px`）——在真实 Chrome 里截图直接是全透明空白（尺寸对但像素全空）；改用 `h-0 overflow-hidden` 裁剪掉——直接卡死超时（同 headless 的症状）。两种「隐藏」手法在这个库上都不可靠。**结论：只截当前可见、正常渲染的节点**，不要为了不显示导出内容而额外藏一份。
- **壁纸内容本身不该含手机状态栏/时钟**：早期版本用 `lock` 态渲染假的 9:41/5G/100%/固定日期，直接烧进导出图——但真机的锁屏会自己叠加*实时*状态栏，图片里再画一份假的，叠在一起就是错的、不能用。现在 result 页展示和导出用同一份「干净」壁纸（背景+文案+DAY/日期水印+品牌，无手机 chrome），`lock` 态只留给首页营销 hero 的静态手机 mockup（那不是用户会下载的东西，"9:41" 是行业惯例，无所谓）。
- DAY/日期水印用 `src/lib/date.ts` 的 `getToday()` 取**真实当前日期**（client-only，挂载后 `useEffect` 里取，避免 SSR/水合不一致），不要写死日期字符串。
- iOS Safari 忽略 `<a download>`，所以下载后弹「保存弹层」让用户**长按存图**；桌面才用 `<a download>`。
- **最稳升级路径（未做）**：服务端 Satori(JSX→SVG)+resvg(SVG→PNG) 在 Worker 里生成真 PNG，彻底解决字体保真/全分辨率问题，也不用再纠结 html-to-image 的这些怪癖。

## 约定

- 函数用 `function foo(){}`（非 `const foo = () => {}`）；图标用 `XxxIcon` 别名；**Server Component 里 Phosphor 用 `@phosphor-icons/react/dist/ssr` 入口**，client 用主入口。
- 单文件尽量 <300 行；不内嵌 SVG（用 Phosphor / asset）。
