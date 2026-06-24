// Post-build: prefix a base path onto root-absolute href/src in built HTML.
// Only runs when DEPLOY_BASE is set (CI/Pages) so local `npm run preview` stays at root.
//
// Why post-build instead of Astro `base`: Astro does not auto-prefix authored
// absolute URLs in markdown content or hand-written <a href="/..."> in templates.
// Rewriting the final HTML covers all of them (templates + markdown) in one pass.
import { readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const base = (process.env.DEPLOY_BASE || '').replace(/\/+$/, '');
if (!base) {
  console.log('[prefix-base] DEPLOY_BASE not set — skipping (local build).');
  process.exit(0);
}

const distDir = fileURLToPath(new URL('../dist/', import.meta.url));
const attrRe = /\b(href|src)=("|')(\/(?!\/)[^"']*)\2/g;
let files = 0, edits = 0;

function rewrite(file) {
  const src = readFileSync(file, 'utf8');
  let n = 0;
  const out = src.replace(attrRe, (m, attr, q, val) => {
    if (val === base || val.startsWith(base + '/')) return m; // idempotent
    n++;
    return `${attr}=${q}${base}${val}${q}`;
  });
  if (n) { writeFileSync(file, out); files++; edits += n; }
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (name.endsWith('.html')) rewrite(p);
  }
}

walk(distDir);
console.log(`[prefix-base] base="${base}" — rewrote ${edits} link(s) in ${files} file(s).`);
