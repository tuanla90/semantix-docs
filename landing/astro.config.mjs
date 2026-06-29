import { defineConfig } from 'astro/config';

// `site` = origin production (đổi nếu domain khác). Dùng cho canonical, Open Graph, sitemap.
export default defineConfig({
  site: 'https://semantix.vn',
  output: 'static',
});
