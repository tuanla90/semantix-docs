import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// RSS feed sinh lúc build — kênh "đất của mình": người đọc theo dõi qua trình
// đọc RSS, không phụ thuộc thuật toán nền tảng nào, không cần dịch vụ email.
const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL('https://semantix.vn');
  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
  const self = new URL('/rss.xml', base).href;
  const lastBuild = posts[0]?.data.pubDate.toUTCString() ?? new Date(0).toUTCString();

  const items = posts
    .map((p) => {
      const link = new URL(`/blog/${p.slug}/`, base).href;
      return (
        `    <item>\n` +
        `      <title>${esc(p.data.title)}</title>\n` +
        `      <link>${link}</link>\n` +
        `      <guid isPermaLink="true">${link}</guid>\n` +
        `      <pubDate>${p.data.pubDate.toUTCString()}</pubDate>\n` +
        `      <category>${esc(p.data.category)}</category>\n` +
        `      <description>${esc(p.data.description)}</description>\n` +
        `    </item>`
      );
    })
    .join('\n');

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n` +
    `  <channel>\n` +
    `    <title>Tuấn LA Lab — Blog</title>\n` +
    `    <link>${new URL('/blog/', base).href}</link>\n` +
    `    <atom:link href="${self}" rel="self" type="application/rss+xml" />\n` +
    `    <description>Mỗi tuần một khái niệm data — gỡ gọn bằng chuyện công sở Việt. Bởi Lê Anh Tuấn.</description>\n` +
    `    <language>vi-VN</language>\n` +
    `    <lastBuildDate>${lastBuild}</lastBuildDate>\n` +
    items +
    `\n  </channel>\n` +
    `</rss>\n`;

  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
