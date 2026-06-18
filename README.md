# 鸡血君 Mr. Hype

基于用户目标与当下状态，每天生成「打气文案 + 手机锁屏壁纸」的 AI 工具。
输入目标 → 选语气/模板 → 生成专属文案 → 排版成壁纸 → 下载保存。需求见 [PRD.md](PRD.md)。

## 技术栈

- **Monorepo**：pnpm workspaces（`apps/web`、`apps/mobile`、`packages/shared`）
- **网页端**：Next.js 16（App Router）+ React 19 + **Tailwind CSS v4**，图标用 **Phosphor**
- **部署**：**Cloudflare Workers + OpenNext**（`@opennextjs/cloudflare`）
- **数据**：**Cloudflare D1** + **Drizzle ORM**；鉴权 **BetterAuth**（邮箱+密码）
- **AI**：默认本地精选文案池；配 `ANTHROPIC_API_KEY` 后走 Claude

## 目录结构

```
packages/shared   跨端共享：类型 / 内容模型 / 8 套模板配置 / 壁纸尺寸算法 / 生成逻辑（含 vitest）
apps/web          Next.js 网页端（= Cloudflare Worker）
apps/mobile       占位，后续 Expo，复用 shared
```

## 本地开发

```bash
pnpm install
# 首次：应用 D1 迁移到本地
pnpm --filter @mr-hype/web db:migrate:local
# 启动
pnpm --filter @mr-hype/web dev   # http://localhost:3000
```

密钥放 `apps/web/.dev.vars`（已 gitignore）：`BETTER_AUTH_SECRET` 必填；`ANTHROPIC_API_KEY` 可选。

## 构建 / 部署（Cloudflare）

```bash
pnpm --filter @mr-hype/web build      # next build
pnpm --filter @mr-hype/web preview    # 本地以 Worker 形态预览（opennext + workerd）
```

首次部署需 owner 配好 Cloudflare：

```bash
pnpm --filter @mr-hype/web exec wrangler login
pnpm --filter @mr-hype/web exec wrangler d1 create mr-hype   # 把返回的 database_id 填进 wrangler.jsonc
pnpm --filter @mr-hype/web exec wrangler secret put BETTER_AUTH_SECRET
pnpm --filter @mr-hype/web db:migrate:remote
pnpm --filter @mr-hype/web deploy
```

## 常用脚本（根目录）

| 命令 | 说明 |
| --- | --- |
| `pnpm dev` | 启动 web 开发服务 |
| `pnpm build` | 构建所有包 |
| `pnpm test` | 跑测试（shared） |
| `pnpm typecheck` | 类型检查 |
| `pnpm format` | biome 格式化 |
| `pnpm lint` | biome 检查 |

更多决策与踩坑见 [DEV_NOTE.md](DEV_NOTE.md)，未完成项见 [WIP.md](WIP.md)，测试见 [TESTING.md](TESTING.md)。
