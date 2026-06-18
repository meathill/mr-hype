import { defineCloudflareConfig } from '@opennextjs/cloudflare';

// MVP 先不接 R2 增量缓存；后续按需加 incrementalCache。
export default defineCloudflareConfig({});
