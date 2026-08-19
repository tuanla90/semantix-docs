// Server sửa local — gõ là autosave vào đúng file, preview tự cập nhật.
//   /        -> sửa bài blog .md   (preview = Astro 8123)
//   /video   -> sửa script video content.py  (preview = bóc lời thoại, parse client)
// Chạy:  npm run edit   (blog cần Astro dev:  npm run dev)
// CÔNG CỤ LOCAL: file ở root landing/, KHÔNG nằm trong build, KHÔNG deploy.
// Ghi thẳng file thật -> git là chỗ hoàn tác nếu lỡ tay.
import http from 'node:http';
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { scanAll } from './scripts/scan-content.mjs';

const execAsync = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, 'src', 'content', 'blog');
const VIDEO_DIR = path.join(__dirname, 'video', 'videos');
const HTML_BLOG = path.join(__dirname, 'edit-tool.html');
const HTML_VIDEO = path.join(__dirname, 'edit-video.html');
const HTML_DIFF = path.join(__dirname, 'content-diff-viewer.html');
const PORT = Number(process.env.EDIT_PORT || process.env.PORT) || 8124;
const PREVIEW = process.env.PREVIEW_ORIGIN || 'http://localhost:8123';
const STUDIO = process.env.STUDIO_ORIGIN || 'http://localhost:3000';   // Remotion Studio (nhúng iframe cho scenes editor)

const okSlug = (s) => typeof s === 'string' && /^[a-z0-9][a-z0-9-]*$/.test(s);
const json = (res, code, obj) => {
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(obj));
};
const html = (res, body) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(body);
};
const readBody = (req) => new Promise((resolve, reject) => {
  let b = ''; req.on('data', (c) => { b += c; if (b.length > 8_000_000) req.destroy(); });
  req.on('end', () => resolve(b)); req.on('error', reject);
});

// Màn sửa scenes.json: TRÁI = editor JSON (tự lưu khi hợp lệ), PHẢI = Studio live (iframe port 3000).
const scenesPage = (slug) => `<!doctype html><html lang="vi"><head><meta charset="utf-8"><title>scenes · ${slug}</title><style>
:root{color-scheme:dark}*{box-sizing:border-box}
html,body{margin:0;height:100vh;overflow:hidden;font-family:ui-sans-serif,system-ui,sans-serif;background:#0c0d11;color:#e6e6ea}
body{display:flex}
#left{display:flex;flex-direction:column;width:40%;min-width:320px}
#divider{flex:0 0 6px;cursor:col-resize;background:#2a2d36}#divider:hover{background:#7C3AED}
#studio{flex:1;border:0;height:100vh;background:#08090c}
header{padding:8px 12px;background:#15171c;border-bottom:1px solid #2a2d36;display:flex;align-items:center;gap:12px;font-size:12px}
#status{font-weight:600}.ok{color:#00bc7d}.bad{color:#ff6467}.saving{color:#fe9a00}
.file{color:#9ca3af;font-family:ui-monospace,monospace;font-size:11px}
a.nav{color:#c4b5fd;text-decoration:none;font-weight:600}
textarea{flex:1;width:100%;border:0;outline:0;resize:none;padding:12px;background:#0c0d11;color:#e6e6ea;font-family:ui-monospace,monospace;font-size:12.5px;line-height:1.5;tab-size:2}
</style></head><body>
<div id="left">
  <header><span id="status" class="ok">● sẵn sàng</span><span class="file">videos/${slug}/scenes.json</span><span style="flex:1"></span><a class="nav" href="/video?slug=${slug}">📝 script</a> <a class="nav" href="/?slug=${slug}">✏️ blog</a> <a class="nav" href="/admin">🗂 admin</a></header>
  <textarea id="ed" spellcheck="false" placeholder="Đang tải scenes.json…"></textarea>
</div>
<div id="divider"></div>
<iframe id="studio" src="${STUDIO}/${slug}-Long"></iframe>
<script>
var slug=${JSON.stringify(slug)},ed=document.getElementById('ed'),st=document.getElementById('status'),t=null,lastSaved='';
function set(c,x){st.className=c;st.textContent=x}
fetch('/api/scenes-load?slug='+slug).then(function(r){return r.json()}).then(function(d){if(d.error){set('bad','⚠ '+d.error);return}ed.value=d.content;lastSaved=d.content});
function trySave(){var v=ed.value;try{JSON.parse(v)}catch(e){set('bad','⚠ JSON lỗi (chưa lưu)');return}
  if(v===lastSaved){set('ok','● đã lưu');return}set('saving','… đang lưu');
  fetch('/api/scenes-save?slug='+slug,{method:'POST',headers:{'Content-Type':'text/plain'},body:v}).then(function(r){return r.json()}).then(function(d){if(d.ok){lastSaved=v;set('ok','✓ đã lưu — Studio reload')}else{set('bad','⚠ '+(d.error||'?'))}}).catch(function(){set('bad','⚠ mất server')})}
ed.addEventListener('input',function(){try{JSON.parse(ed.value);set('saving','… đang gõ')}catch(e){set('bad','⚠ JSON lỗi (chưa lưu)')}clearTimeout(t);t=setTimeout(trySave,800)});
ed.addEventListener('keydown',function(e){if(e.key==='Tab'){e.preventDefault();var s=ed.selectionStart,en=ed.selectionEnd;ed.value=ed.value.slice(0,s)+'  '+ed.value.slice(en);ed.selectionStart=ed.selectionEnd=s+2}if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='s'){e.preventDefault();clearTimeout(t);trySave()}});
var dv=document.getElementById('divider'),lf=document.getElementById('left'),fr=document.getElementById('studio'),drag=false;
dv.addEventListener('mousedown',function(){drag=true;fr.style.pointerEvents='none';document.body.style.userSelect='none'});
window.addEventListener('mouseup',function(){drag=false;fr.style.pointerEvents='';document.body.style.userSelect=''});
window.addEventListener('mousemove',function(e){if(drag){lf.style.width=Math.max(320,Math.min(window.innerWidth-360,e.clientX))+'px'}});
</script></body></html>`;

const server = http.createServer(async (req, res) => {
  const u = new URL(req.url, `http://localhost:${PORT}`);
  const p = u.pathname;
  try {
    // ---- Pages ----
    if (req.method === 'GET' && (p === '/' || p === '/edit')) {
      return html(res, (await readFile(HTML_BLOG, 'utf8')).replaceAll('__PREVIEW__', PREVIEW));
    }
    if (req.method === 'GET' && (p === '/diff' || p === '/review')) {
      return html(res, await readFile(HTML_DIFF, 'utf8'));
    }
    if (req.method === 'GET' && p === '/video') {
      return html(res, await readFile(HTML_VIDEO, 'utf8'));
    }
    if (req.method === 'GET' && p === '/scenes') {
      const slug = u.searchParams.get('slug');
      if (!okSlug(slug)) return html(res, '<body style="font-family:sans-serif;background:#0c0d11;color:#e6e6ea;padding:24px">Thiếu/không hợp lệ slug. Dùng <code>/scenes?slug=&lt;slug&gt;</code></body>');
      return html(res, scenesPage(slug));
    }
    if (req.method === 'GET' && p === '/admin') {
      return html(res, await readFile(path.join(__dirname, 'admin.html'), 'utf8'));
    }
    // ---- Deck slide (video-decks/<slug>/deck.html là file standalone, serve thẳng) + kịch bản nói ----
    if (req.method === 'GET' && p === '/deck') {
      const slug = u.searchParams.get('slug');
      if (!okSlug(slug)) return html(res, '<body style="font-family:sans-serif;background:#0c0d11;color:#e6e6ea;padding:24px">Thiếu/không hợp lệ slug. Dùng <code>/deck?slug=&lt;slug&gt;</code></body>');
      for (const f of ['deck.html', 'slide.html']) {
        try { return html(res, await readFile(path.join(__dirname, 'video-decks', slug, f), 'utf8')); } catch {}
      }
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); return res.end(`chưa có deck: video-decks/${slug}/deck.html`);
    }
    if (req.method === 'GET' && p === '/deck-script') {
      const slug = u.searchParams.get('slug');
      if (!okSlug(slug)) { res.writeHead(400); return res.end('slug?'); }
      try {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end(await readFile(path.join(__dirname, 'video-decks', slug, 'kich-ban-noi.md'), 'utf8'));
      } catch { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); return res.end(`chưa có kịch bản: video-decks/${slug}/kich-ban-noi.md`); }
    }
    // ---- Drafts API (đọc-only, cho diff viewer so bản AG) ----
    if (req.method === 'GET' && p === '/api/draft-list') {
      try {
        const files = (await readdir(path.join(__dirname, 'drafts')))
          .filter(f => f.endsWith('.md') && !f.endsWith('.ag.md') && /^[a-z0-9]/.test(f));
        return json(res, 200, { slugs: files.map(f => f.slice(0, -3)).sort() });
      } catch { return json(res, 200, { slugs: [] }); }
    }
    if (req.method === 'GET' && p === '/api/draft-load') {
      const slug = u.searchParams.get('slug');
      const ag = u.searchParams.get('ag') === '1';
      if (!okSlug(slug)) return json(res, 400, { error: 'slug không hợp lệ' });
      const file = slug + (ag ? '.ag.md' : '.md');
      try { return json(res, 200, { slug, content: await readFile(path.join(__dirname, 'drafts', file), 'utf8') }); }
      catch { return json(res, 404, { error: `chưa có drafts/${file}` }); }
    }
    // ---- Git load: lấy bản gốc trong Git (mặc định HEAD, hoặc HEAD~1, main...) ----
    if (req.method === 'GET' && p === '/api/git-load') {
      const slug = u.searchParams.get('slug');
      const ref = u.searchParams.get('ref') || 'HEAD';
      if (!okSlug(slug)) return json(res, 400, { error: 'slug không hợp lệ' });
      try {
        const relPath = `landing/src/content/blog/${slug}.md`;
        const { stdout } = await execAsync(`git show ${ref}:"${relPath}"`);
        return json(res, 200, { slug, ref, content: stdout });
      } catch (e) {
        return json(res, 500, { error: `Không lấy được Git history (${ref}): ` + (e && e.message || e) });
      }
    }
    // ---- Admin API: data quét live + state (flags/notes/review) ----
    if (req.method === 'GET' && p === '/api/admin-data') {
      try { return json(res, 200, scanAll()); }
      catch (e) { return json(res, 500, { error: String(e && e.message || e) }); }
    }
    if (req.method === 'GET' && p === '/api/admin-state') {
      try { return json(res, 200, JSON.parse(await readFile(path.join(__dirname, 'admin-state.json'), 'utf8'))); }
      catch { return json(res, 200, {}); }
    }
    if (req.method === 'POST' && p === '/api/admin-state') {
      const body = (await readBody(req)) || '{}';
      try { JSON.parse(body); } catch (e) { return json(res, 400, { error: 'JSON lỗi: ' + e.message }); }
      await writeFile(path.join(__dirname, 'admin-state.json'), body, 'utf8');
      return json(res, 200, { ok: true });
    }
    // ---- Ảnh tĩnh cho cover-admin: /public/*, /video/out/* (chỉ ảnh, có chặn traversal) ----
    if (req.method === 'GET' && (p.startsWith('/public/') || p.startsWith('/video/'))) {
      const full = path.join(__dirname, decodeURIComponent(p.replace(/^\/+/, '')));
      if (!full.startsWith(__dirname)) { res.writeHead(403); return res.end('no'); }
      const MIME = { '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.svg':'image/svg+xml', '.webp':'image/webp', '.gif':'image/gif' };
      const mime = MIME[path.extname(full).toLowerCase()];
      if (!mime) { res.writeHead(415); return res.end('no'); }
      try { res.writeHead(200, { 'Content-Type': mime }); return res.end(await readFile(full)); }
      catch { res.writeHead(404); return res.end('not found'); }
    }

    // ---- Blog API (.md) ----
    if (req.method === 'GET' && p === '/api/list') {
      const slugs = (await readdir(BLOG_DIR)).filter(f => f.endsWith('.md')).map(f => f.slice(0, -3)).sort();
      return json(res, 200, { slugs });
    }
    if (req.method === 'GET' && p === '/api/load') {
      const slug = u.searchParams.get('slug');
      if (!okSlug(slug)) return json(res, 400, { error: 'slug không hợp lệ' });
      return json(res, 200, { slug, content: await readFile(path.join(BLOG_DIR, slug + '.md'), 'utf8') });
    }
    if (req.method === 'POST' && p === '/api/save') {
      const { slug, content } = JSON.parse((await readBody(req)) || '{}');
      if (!okSlug(slug)) return json(res, 400, { error: 'slug không hợp lệ' });
      if (typeof content !== 'string') return json(res, 400, { error: 'thiếu content' });
      await writeFile(path.join(BLOG_DIR, slug + '.md'), content, 'utf8');
      return json(res, 200, { ok: true, savedAt: new Date().toISOString() });
    }

    // ---- Video API (content.py) ----
    if (req.method === 'GET' && p === '/api/video-list') {
      const dirs = (await readdir(VIDEO_DIR, { withFileTypes: true })).filter(d => d.isDirectory()).map(d => d.name);
      const slugs = [];
      for (const d of dirs) {
        try { await readFile(path.join(VIDEO_DIR, d, 'content.py'), 'utf8'); slugs.push(d); } catch {}
      }
      return json(res, 200, { slugs: slugs.sort() });
    }
    if (req.method === 'GET' && p === '/api/video-load') {
      const slug = u.searchParams.get('slug');
      if (!okSlug(slug)) return json(res, 400, { error: 'slug không hợp lệ' });
      return json(res, 200, { slug, content: await readFile(path.join(VIDEO_DIR, slug, 'content.py'), 'utf8') });
    }
    if (req.method === 'POST' && p === '/api/video-save') {
      const { slug, content } = JSON.parse((await readBody(req)) || '{}');
      if (!okSlug(slug)) return json(res, 400, { error: 'slug không hợp lệ' });
      if (typeof content !== 'string') return json(res, 400, { error: 'thiếu content' });
      await writeFile(path.join(VIDEO_DIR, slug, 'content.py'), content, 'utf8');
      return json(res, 200, { ok: true, savedAt: new Date().toISOString() });
    }

    // ---- Scenes API (scenes.json cho video) ----
    if (req.method === 'GET' && p === '/api/scenes-load') {
      const slug = u.searchParams.get('slug');
      if (!okSlug(slug)) return json(res, 400, { error: 'slug không hợp lệ' });
      try { return json(res, 200, { slug, content: await readFile(path.join(VIDEO_DIR, slug, 'scenes.json'), 'utf8') }); }
      catch { return json(res, 404, { error: 'chưa có scenes.json (cần dựng scenes trước)' }); }
    }
    if (req.method === 'POST' && p === '/api/scenes-save') {
      const slug = u.searchParams.get('slug');
      if (!okSlug(slug)) return json(res, 400, { error: 'slug không hợp lệ' });
      const body = (await readBody(req)) || '';
      try { JSON.parse(body); } catch (e) { return json(res, 400, { error: 'JSON lỗi: ' + e.message }); }
      await writeFile(path.join(VIDEO_DIR, slug, 'scenes.json'), body, 'utf8');
      return json(res, 200, { ok: true, savedAt: new Date().toISOString() });
    }

    res.writeHead(404); res.end('not found');
  } catch (e) {
    json(res, 500, { error: String(e && e.message || e) });
  }
});

server.listen(PORT, () => {
  console.log(`\n  Admin:      http://localhost:${PORT}/admin`);
  console.log(`  Sua blog:   http://localhost:${PORT}/?slug=<slug>        (can: npm run dev @8123)`);
  console.log(`  Sua script: http://localhost:${PORT}/video?slug=<slug>`);
  console.log(`  Sua scenes: http://localhost:${PORT}/scenes?slug=<slug>  (can: npm run studio @3000)`);
  console.log(`  Xem deck:   http://localhost:${PORT}/deck?slug=<slug>   (+ /deck-script?slug=<slug>)\n`);
});
