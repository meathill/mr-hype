# 测试指南

## 单元测试（vitest）

核心逻辑测试在 `packages/shared`（目标识别、换一句循环、壁纸尺寸算法）：

```bash
pnpm test                          # 跑全部（turbo）
pnpm --filter @mr-hype/shared test:watch
```

约定：`packages/shared` 里纯函数（`detectGoal`/`computeResult`/`computeWallpaperLayout`）必须有用例；修 bug 先补能复现的用例再修。

## 类型 / 格式 / Lint

```bash
pnpm typecheck     # 两个包 tsc --noEmit
pnpm lint          # biome check
pnpm format        # biome 格式化（写入）
```

## 端到端手测（本地）

```bash
pnpm --filter @mr-hype/web db:migrate:local    # 首次
pnpm --filter @mr-hype/web dev
```

- **匿名闭环**：首页 → 生成（填目标/选语气/选模板）→ loading → 结果 → 下载（真实浏览器；headless 无法栅格化 foreignObject）→ 换一句（计数递减）→ 换模板。
- **登录闭环**：`/login` 注册/登录（邮箱+密码）→ `/goal` 保存战役 → 刷新仍在（D1）→ 结果页收藏 → `/me` 看统计/历史/收藏 → 退出登录。

## 构建验证

```bash
pnpm --filter @mr-hype/web build      # next build：静态/动态路由划分应正确
pnpm --filter @mr-hype/web preview    # opennext + workerd 跑 Worker 形态
```
