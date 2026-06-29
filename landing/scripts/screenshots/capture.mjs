// Chụp screenshot app Semantix theo danh sách trong screens.config.mjs.
// Dùng Chrome đã cài sẵn (channel: 'chrome') → KHÔNG tải Chromium, tránh lỗi proxy.
// Cài 1 lần (trong landing/):  npm i -D playwright-core
// Chạy (trong landing/):       node scripts/screenshots/capture.mjs

import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import config from './screens.config.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const landingRoot = resolve(here, '../../'); // thư mục landing/
const { baseUrl, auth, options: o, screens } = config;

if (!baseUrl) {
  console.error('❌ Chưa điền baseUrl trong scripts/screenshots/screens.config.mjs');
  process.exit(1);
}

const outDir = resolve(landingRoot, o.outDir);
await mkdir(outDir, { recursive: true });

const root = baseUrl.replace(/\/+$/, '');
const abs = (u) => (/^https?:\/\//i.test(u) ? u : root + (u.startsWith('/') ? u : '/' + u));

const browser = await chromium.launch({ channel: 'chrome', headless: !o.headful });
const ctx = await browser.newContext({
  viewport: o.viewport,
  deviceScaleFactor: o.deviceScaleFactor ?? 1,
  colorScheme: o.darkMode ? 'dark' : 'light',
  locale: 'vi-VN',
});
if (o.darkMode) {
  await ctx.addInitScript(() => {
    try { localStorage.setItem('theme', 'dark'); } catch {}
  });
}
const page = await ctx.newPage();

async function shoot(name, url) {
  console.log(`📸 ${name}  →  ${url}`);
  await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => {});
  await page.waitForTimeout(o.waitMs ?? 2000);
  await page.screenshot({ path: resolve(outDir, `${name}.png`), fullPage: !!o.fullPage });
}

// 1) Trang login — chụp TRƯỚC khi đăng nhập.
if (auth?.loginPath) await shoot('01-dang-nhap', abs(auth.loginPath));

// 2) Đăng nhập.
if (auth?.username) {
  console.log('🔐 Đang đăng nhập…');
  await page.goto(abs(auth.loginPath), { waitUntil: 'networkidle' }).catch(() => {});
  await page.fill(auth.usernameSelector, auth.username);
  await page.fill(auth.passwordSelector, auth.password);
  await page.click(auth.submitSelector);
  await page.waitForLoadState('networkidle').catch(() => {});
  if (auth.successUrlIncludes) {
    await page
      .waitForURL((u) => u.toString().includes(auth.successUrlIncludes), { timeout: 20000 })
      .catch(() => console.warn('⚠️  Không thấy URL kỳ vọng sau đăng nhập — kiểm tra selector / thông tin / chạy headful: true.'));
  }
}

// 3) Chụp từng màn trong danh sách.
for (const [name, url] of Object.entries(screens)) {
  if (!url) { console.log(`⏭️  Bỏ qua ${name} (chưa có link)`); continue; }
  await shoot(name, abs(url));
}

await browser.close();
console.log(`\n✅ Xong. Ảnh lưu ở: ${outDir}`);
