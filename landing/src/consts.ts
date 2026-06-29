// Hằng số dùng chung cho SEO / Open Graph / JSON-LD.
// Origin production đặt ở `site` trong astro.config.mjs (đọc qua Astro.site) — đổi domain ở đó.

export const SITE_NAME = 'Tuấn LA Lab';

// Kênh YouTube (đang hồi sinh từ @mastergoogletools → Tuấn LA Lab)
export const YOUTUBE_URL = 'https://www.youtube.com/@mastergoogletools';

// Ảnh chia sẻ mạng xã hội mặc định (1200×630). Cần thêm file: landing/public/og/default.png
export const DEFAULT_OG_IMAGE = '/og/default.png';

// Link tài liệu (GitBook). Mọi link "Tài Liệu" trên site trỏ về đây.
export const DOCS_URL = 'https://tuanla90.gitbook.io/semantix/vi';

export const ORG = {
  name: 'Semantix',
  // Logo cho JSON-LD (PNG, nền trong, ≥112px). Cần thêm file: landing/public/og/logo.png
  logo: '/og/logo.png',
  email: 'hello@semantix.vn',
  // Link mạng xã hội chính thức (điền khi có): Zalo OA, LinkedIn, YouTube, Facebook…
  sameAs: ['https://www.youtube.com/@mastergoogletools'] as string[],
};
