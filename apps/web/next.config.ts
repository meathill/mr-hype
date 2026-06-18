import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 直接消费 @mr-hype/shared 的 TS 源码
  transpilePackages: ['@mr-hype/shared'],
};

export default nextConfig;

// 让 next dev 拿到 Cloudflare 本地绑定（D1 等）
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

initOpenNextCloudflareForDev();
