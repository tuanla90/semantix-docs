import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// Sitemap tĩnh sinh lúc build (output:'static'). Trang tĩnh + mọi bài blog.
const STATIC_PATHS = ['/', '/semantix/', '/video/', '/solutions/', '/pricing/', '/about/', '/blog/', '/blog/tu-dien-thuat-ngu/'];

export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL('https://semantix.vn');
  const posts = await getCollection('blog');

  const entries: { loc: string; lastmod?: string }[] = [
    ...STATIC_PATHS.map((p) => ({ loc: new URL(p, base).href })),
    ...posts.map((p) => ({
      loc: new URL(`/blog/${p.slug}/`, base).href,
      lastmod: p.data.pubDate.toISOString(),
    })),
  ];

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    entries
      .map((e) => `  <url><loc>${e.loc}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ''}</url>`)
      .join('\n') +
    `\n</urlset>\n`;

  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
