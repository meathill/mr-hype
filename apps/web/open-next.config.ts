import { defineCloudflareConfig } from '@opennextjs/cloudflare';

// MVP 先不接 R2 增量缓存；后续按需加 incrementalCache。
// 安全开关：Next 16.3 + cache interception 会触发 _rsc 预取无限重试
// （opennextjs-cloudflare#1334，上游 opennextjs-aws#1212），保持禁用。
// 见 https://github.com/meathill/mr-hype/issues/1
export default defineCloudflareConfig({
  enableCacheInterception: false,
});
