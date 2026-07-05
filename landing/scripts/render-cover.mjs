// Render lại cover của 1 (hoặc nhiều) bài TỪ SOURCE đã sửa tay: covers-src/<slug>.html -> public/blog/covers/<slug>.png
// Dùng khi bạn chỉnh tay covers-src/<slug>.html (đổi số liệu chart, tiêu đề, màu, motif...).
// Chạy:  node scripts/render-cover.mjs <slug> [slug ...]
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const ROOT = path.resolve(process.cwd());
const SRC = path.join(ROOT, 'covers-src');
const OUT = path.join(ROOT, 'public/blog/covers');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const slugs = process.argv.slice(2);
if (!slugs.length) { console.error('Cần ít nhất 1 slug. Vd: node scripts/render-cover.mjs cohort-analysis'); process.exit(1); }

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'] });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
for (const slug of slugs) {
  const f = path.join(SRC, slug + '.html');
  if (!fs.existsSync(f)) { console.log('skip (no source):', slug); continue; }
  await page.setContent(fs.readFileSync(f, 'utf8'), { waitUntil: 'load', timeout: 60000 });
  await page.evaluate(() => Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 5000))]));
  await new Promise(r => setTimeout(r, 380));
  await page.screenshot({ path: path.join(OUT, slug + '.png'), type: 'png' });
  console.log('render:', slug);
}
await browser.close();
console.log('Xong.');
