// Sinh trang quản lý (local, KHÔNG deploy): 1 bảng gộp - cover PNG + script video + thumbnail + ghi chú.
// Chạy:  node landing/scripts/gen-admin.mjs   ->  mở landing/cover-admin.html (hoặc http://localhost:8124/admin).
// Cần edit-server (npm run edit) để mấy nút "Sửa local / Sửa script" hoạt động.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..'); // landing/
const BLOG = path.join(ROOT, 'src/content/blog');
const VIDEOS = path.join(ROOT, 'video/videos');
const VOUT = path.join(ROOT, 'video/out');

const BLOG_URL = 'https://tuanla90.github.io/semantix-docs/blog';
const EDIT_LOCAL = 'http://localhost:8124';          // blog editor:  /?slug=
const EDIT_VIDEO = 'http://localhost:8124/video';     // video editor: ?slug=  (sửa lời thoại content.py)
const EDIT_SCENES = 'http://localhost:8124/scenes';   // scenes editor json↔live (nhúng Studio 3000)
const EDIT_GH = 'https://github.com/tuanla90/semantix-docs/edit/main/landing/src/content/blog';

const exists = (p) => { try { fs.accessSync(p); return true; } catch { return false; } };

function fm(raw) {
  raw = raw.replace(/^﻿/, '').replace(/\r\n/g, '\n');
  const m = raw.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!m) return {};
  const o = {};
  for (const line of m[1].split('\n')) {
    const mm = line.match(/^(\w+):\s*(.*)$/);
    if (mm) o[mm[1]] = mm[2].trim().replace(/^["']|["']$/g, '');
  }
  return o;
}
function splitTitle(title) {
  let t = (title || '').trim(), sub = '';
  const cands = [[t.indexOf(':'), 'c'], [t.indexOf('?'), 'q'], [t.indexOf(' - '), 'd']]
    .filter(([i]) => i > 0).sort((a, b) => a[0] - b[0]);
  if (cands.length) {
    const [i, k] = cands[0];
    if (k === 'q') { sub = t.slice(i + 1); t = t.slice(0, i + 1); }
    else if (k === 'd') { sub = t.slice(i + 3); t = t.slice(0, i); }
    else { sub = t.slice(i + 1); t = t.slice(0, i); }
  }
  return { t: t.trim(), sub: sub.trim().replace(/^["'\-\s]+/, '') };
}

const rows = fs.readdirSync(BLOG).filter(f => f.endsWith('.md')).map(f => {
  const slug = f.replace(/\.md$/, '');
  const d = fm(fs.readFileSync(path.join(BLOG, f), 'utf8'));
  const { t, sub } = splitTitle(d.title);
  const svg = d.cover ? 'public' + d.cover : `public/blog/covers/${slug}.svg`;
  return {
    slug, title: d.title || slug, t, sub: sub || d.description || '',
    date: d.pubDate || '', cat: d.category || '',
    svg, png: `public/blog/covers/${slug}.png`,
    vids: [], vthumb: '',
  };
}).filter(Boolean).sort((a, b) => String(a.date).localeCompare(String(b.date)));

const blogSet = new Set(rows.map(r => r.slug));
// Nguồn blog của 1 video = quét slug blog trong phần comment đầu content.py (+ trùng slug).
function sourcesOf(videoSlug) {
  let header = '';
  try { header = fs.readFileSync(path.join(VIDEOS, videoSlug, 'content.py'), 'utf8').split(/\nORDER\b/)[0]; } catch {}
  const found = [...blogSet].filter(s => new RegExp('(^|[^a-z0-9-])' + s + '([^a-z0-9-]|$)').test(header));
  if (blogSet.has(videoSlug) && !found.includes(videoSlug)) found.push(videoSlug);
  return found;
}
const VSCRIPTS = path.join(ROOT, 'video-scripts');
const hasMp4 = (slug) => { try { return fs.readdirSync(path.join(VOUT, slug)).some(f => f.endsWith('.mp4')); } catch { return false; } };
const videoList = (exists(VIDEOS) ? fs.readdirSync(VIDEOS) : [])
  .filter(slug => exists(path.join(VIDEOS, slug, 'content.py')))
  .sort()
  .map(slug => ({
    slug,
    built: exists(path.join(VIDEOS, slug, 'scenes.json')),
    thumb: exists(path.join(VOUT, slug, 'thumb.png')) ? `video/out/${slug}/thumb.png` : '',
    render: hasMp4(slug),
    publish: exists(path.join(VSCRIPTS, slug + '.PUBLISH.md')),
    sources: sourcesOf(slug),
  }));
// Nối ngược: bài blog -> video phủ nó (kèm trạng thái + thumb)
const blogToVideos = {};
for (const v of videoList) for (const b of v.sources) (blogToVideos[b] ||= []).push(v.slug);
for (const r of rows) {
  r.vids = (blogToVideos[r.slug] || []).map(vs => {
    const v = videoList.find(x => x.slug === vs);
    return { slug: vs, built: !!(v && v.built), thumb: (v && v.thumb) || '', render: !!(v && v.render), publish: !!(v && v.publish) };
  });
  const tv = r.vids.find(v => v.thumb);
  r.vthumb = tv ? tv.thumb : '';
  r.vstate = r.vids.length ? (r.vids.some(v => v.render) ? 'render' : (r.vids.some(v => v.built) ? 'built' : 'script')) : 'none';
}
// Video không gắn bài blog nào -> thành dòng riêng (đặt lên đầu)
const orphan = videoList.filter(v => v.sources.length === 0 && !blogSet.has(v.slug));
const videoRows = orphan.map(v => ({
  slug: v.slug, title: v.slug, t: v.slug, sub: 'Video gốc - không gắn bài blog nào',
  date: '', cat: 'VIDEO', svg: '', png: '', isVideoOnly: true,
  vids: [{ slug: v.slug, built: v.built, thumb: v.thumb, render: v.render, publish: v.publish }], vthumb: v.thumb,
  vstate: v.render ? 'render' : (v.built ? 'built' : 'script'),
}));
const allRows = [...videoRows, ...rows];
const cats = [...new Set(allRows.map(r => r.cat).filter(c => c && c !== 'VIDEO'))].sort();
const catOpts = cats.map(c => `<option value="cat:${c}">${c}</option>`).join('');

const html = `<!doctype html><html lang="vi"><head><meta charset="utf-8"><title>Quản lý nội dung · Tuấn LA Lab</title>
<style>
 *{box-sizing:border-box} body{margin:0;font-family:Inter,'Segoe UI',Arial,sans-serif;background:#f1f5f9;color:#0f172a}
 header{position:sticky;top:0;z-index:5;background:#fff;border-bottom:1px solid #e2e8f0;padding:14px 20px;display:flex;align-items:center;gap:16px;flex-wrap:wrap}
 header h1{font-size:18px;margin:0} .muted{color:#64748b;font-size:13px}
 .btn{border:1px solid #cbd5e1;background:#fff;border-radius:8px;padding:7px 14px;font-weight:600;font-size:13px;cursor:pointer}
 .btn.primary{background:#783ABF;border-color:#783ABF;color:#fff}
 select,input{border:1px solid #cbd5e1;border-radius:8px;padding:6px 10px;font:inherit}
 table{border-collapse:collapse;width:100%;background:#fff}
 th,td{border-bottom:1px solid #e2e8f0;padding:12px;vertical-align:top;text-align:left}
 th{position:sticky;top:55px;background:#f8fafc;font-size:12px;text-transform:uppercase;letter-spacing:.5px;color:#475569;z-index:4}
 td.idx{font-weight:800;color:#94a3b8;width:46px}
 .ttl a{color:#5B2A91;font-weight:800;font-size:15px;text-decoration:none} .ttl a:hover{text-decoration:underline}
 .ttl .vidname{color:#783ABF;font-weight:800;font-size:15px}
 .ttl .sub{color:#64748b;font-size:13px;margin-top:4px;line-height:1.4} .ttl .meta{color:#94a3b8;font-size:11px;margin-top:6px}
 .ttl .acts{margin-top:8px;display:flex;gap:6px;flex-wrap:wrap}
 .ttl .acts a{font-size:12px;font-weight:700;text-decoration:none;padding:4px 10px;border-radius:6px}
 .ttl .acts a.view{background:#ede9fe;color:#6d28d9} .ttl .acts a.local{background:#0e7490;color:#fff} .ttl .acts a.edit{background:#783ABF;color:#fff}
 .cell-img{width:300px} .cell-img img{width:290px;border-radius:8px;display:block;background:#0b1120;min-height:54px}
 img.zoom{cursor:zoom-in;transition:opacity .15s} img.zoom:hover{opacity:.88}
 .scell{width:185px} .scell a{display:inline-block;font-size:11px;font-weight:700;color:#fff;background:#783ABF;padding:4px 8px;border-radius:6px;text-decoration:none;word-break:break-all}
 .scell .vbadge{font-size:10px;font-weight:700;padding:2px 7px;border-radius:100px;white-space:nowrap;margin-left:4px}
 .vbadge.built{background:#dcfce7;color:#166534} .vbadge.draft{background:#fef9c3;color:#854d0e}
 .scell .line{margin:2px 0}
 .scell .sbadges{display:flex;flex-wrap:wrap;gap:3px;margin:4px 0 2px}
 .sbadge{font-size:9.5px;font-weight:700;padding:2px 6px;border-radius:100px;white-space:nowrap}
 .sbadge.on{background:#dcfce7;color:#166534} .sbadge.off{background:#f1f5f9;color:#94a3b8}
 .scell a.scriptlink{background:#783ABF}
 .scell a.renderlink{display:inline-block;font-size:11px;font-weight:700;color:#fff;background:#0e7490;padding:4px 8px;border-radius:6px;text-decoration:none}
 .scell .renderlink.off{background:#e2e8f0;color:#94a3b8;cursor:not-allowed}
 .scell .vrev{display:flex;align-items:center;gap:5px;font-size:11px;font-weight:700;color:#0e7490;margin-top:6px;cursor:pointer}
 tr.vreviewed{background:#ecfeff} tr.vreviewed td.idx{color:#0891b2}
 tr.vreviewed.flagged{background:#fff7ed}
 .cell-thumb{width:210px} .cell-thumb img{width:200px;border-radius:8px;display:block;background:#0b1120}
 .dash{color:#cbd5e1}
 td.note{width:240px} td.note textarea{width:100%;height:80px;border:1px solid #cbd5e1;border-radius:8px;padding:8px;font:inherit;resize:vertical}
 .flagwrap{margin-top:8px;display:flex;align-items:center;gap:8px}
 tr.flagged{background:#fff7ed} tr.flagged td.idx{color:#ea580c}
 tr.videorow{background:#faf5ff}
 #lb{display:none;position:fixed;inset:0;background:rgba(2,6,23,.92);z-index:50;align-items:center;justify-content:center;cursor:zoom-out}
 #lb img{max-width:94vw;max-height:94vh;border-radius:10px;box-shadow:0 20px 60px rgba(0,0,0,.6)}
</style></head><body>
<header>
 <h1>Quản lý nội dung</h1>
 <span class="muted" id="count"></span>
 <span style="flex:1"></span>
 <label class="muted">Lọc: <select id="filter"><option value="all">Tất cả</option><option value="flag">Chỉ "Cần sửa"</option><option value="note">Có ghi chú</option><option value="video">Có video</option><optgroup label="Trạng thái video"><option value="v:none">Chưa có video</option><option value="v:script">Có script · chưa dựng</option><option value="v:built">Đã dựng scenes · chưa render</option><option value="v:render">Đã render</option><option value="vr:0">Video CHƯA review</option><option value="vr:1">Video ĐÃ review</option></optgroup>${catOpts ? '<optgroup label="Chủ đề">' + catOpts + '</optgroup>' : ''}</select></label>
 <input id="search" placeholder="Tìm tiêu đề / slug…" style="width:220px">
 <button class="btn" id="clearFlags" title="Bỏ đánh dấu Cần sửa ở mọi mục (giữ ghi chú)">Bỏ chọn cần sửa</button>
 <button class="btn" id="clearAll" title="Xoá cả đánh dấu lẫn ghi chú">Xoá hết</button>
 <button class="btn primary" id="export">Xuất danh sách cần sửa</button>
</header>

<table><thead><tr>
 <th>#</th><th>Bài viết / Video</th><th>Cover</th>
 <th>Script video</th><th>Thumbnail</th><th>Ghi chú / Yêu cầu sửa</th>
</tr></thead><tbody id="tb"></tbody></table>

<div id="lb"><img id="lbimg" alt="zoom"></div>

<script>
const DATA = ${JSON.stringify(allRows)};
const BLOG_URL = ${JSON.stringify(BLOG_URL)};
const EDIT_LOCAL = ${JSON.stringify(EDIT_LOCAL)};
const EDIT_VIDEO = ${JSON.stringify(EDIT_VIDEO)};
const EDIT_SCENES = ${JSON.stringify(EDIT_SCENES)};
const EDIT_GH = ${JSON.stringify(EDIT_GH)};
const LS = 'cover-admin-v1';
const store = JSON.parse(localStorage.getItem(LS) || '{}');
const save = () => localStorage.setItem(LS, JSON.stringify(store));
const tb = document.getElementById('tb');
function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

function row(d, i){
  const s = store[d.slug] || {};
  const tr = document.createElement('tr');
  tr.dataset.slug = d.slug;
  if (s.flag) tr.classList.add('flagged');
  if (d.isVideoOnly) tr.classList.add('videorow');

  const vb = (ok,label) => '<span class="sbadge '+(ok?'on':'off')+'">'+(ok?'✓':'○')+' '+label+'</span>';
  const scriptCell = (d.vids && d.vids.length)
    ? d.vids.map(v => {
        const renderLink = v.built
          ? '<a class="renderlink" href="'+EDIT_SCENES+'?slug='+v.slug+'" target="_blank" rel="noopener" title="Sửa scenes.json (json trái ↔ Studio live phải). Cần: npm run studio @3000">🎬 sửa scenes (live)</a>'
          : '<span class="renderlink off" title="Phải dựng scenes trước (build) mới sửa được">🎬 scenes: cần dựng</span>';
        return '<div class="line"><a class="scriptlink" href="'+EDIT_VIDEO+'?slug='+v.slug+'" target="_blank" rel="noopener" title="Mở &amp; sửa lời thoại (content.py)">📝 script: '+v.slug+'</a></div><div class="sbadges">'+vb(true,'script')+vb(!!v.thumb,'thumb')+vb(v.built,'scenes')+vb(v.render,'render')+vb(v.publish,'publish')+'</div><div class="line">'+renderLink+'</div>';
      }).join('')
      + '<label class="vrev"><input type="checkbox" class="vreview" '+(s.vreview?'checked':'')+'> đã review video</label>'
    : '<span class="dash">—</span>';
  const thumbCell = d.vthumb
    ? '<img class="zoom" loading="lazy" src="'+d.vthumb+'?v='+Date.now()+'" alt="thumb">'
    : '<span class="dash">—</span>';
  const pngCell = d.png ? '<img class="zoom" loading="lazy" src="'+d.png+'?v='+Date.now()+'" onerror="this.style.opacity=.2">' : '<span class="dash">—</span>';
  const titleCell = d.isVideoOnly
    ? '<div class="vidname">🎬 '+esc(d.slug)+'</div><div class="sub">'+esc(d.sub)+'</div><div class="acts"><a class="edit" href="'+EDIT_VIDEO+'?slug='+d.slug+'" target="_blank" rel="noopener">🎬 Sửa script</a></div>'
    : '<a href="'+BLOG_URL+'/'+d.slug+'/" target="_blank" rel="noopener">'+esc(d.t||d.title)+'</a>'+(d.sub?'<div class="sub">'+esc(d.sub)+'</div>':'')+'<div class="meta">'+esc(d.date)+' · '+esc(d.cat)+' · <code>'+esc(d.slug)+'</code></div><div class="acts"><a class="view" href="'+BLOG_URL+'/'+d.slug+'/" target="_blank" rel="noopener">👁 Xem</a><a class="local" href="'+EDIT_LOCAL+'/?slug='+d.slug+'" target="_blank" rel="noopener">📝 Sửa local</a><a class="edit" href="'+EDIT_GH+'/'+d.slug+'.md" target="_blank" rel="noopener">✏️ GitHub</a></div>';

  tr.innerHTML = \`
   <td class="idx">\${i+1}</td>
   <td class="ttl">\${titleCell}</td>
   <td class="cell-img">\${pngCell}</td>
   <td class="scell">\${scriptCell}</td>
   <td class="cell-thumb">\${thumbCell}</td>
   <td class="note">
     <textarea placeholder="Ghi chú / yêu cầu chỉnh sửa…">\${esc(s.note||'')}</textarea>
     <div class="flagwrap"><label><input type="checkbox" class="flagcb" \${s.flag?'checked':''}> <b>Cần sửa</b></label></div>
   </td>\`;
  const ta = tr.querySelector('textarea'), cb = tr.querySelector('input.flagcb'), vr = tr.querySelector('input.vreview');
  ta.addEventListener('input', () => { (store[d.slug] ||= {}).note = ta.value; save(); });
  cb.addEventListener('change', () => { (store[d.slug] ||= {}).flag = cb.checked; tr.classList.toggle('flagged', cb.checked); save(); recount(); });
  if (vr) vr.addEventListener('change', () => { (store[d.slug] ||= {}).vreview = vr.checked; tr.classList.toggle('vreviewed', vr.checked); save(); recount(); });
  if (s.vreview) tr.classList.add('vreviewed');
  return tr;
}
function render(){
  const f = document.getElementById('filter').value, q = document.getElementById('search').value.toLowerCase().trim();
  tb.innerHTML=''; let n=0;
  DATA.forEach((d,i)=>{
    const s = store[d.slug]||{};
    if (f==='flag' && !s.flag) return;
    if (f==='note' && !(s.note && s.note.trim())) return;
    if (f==='video' && !(d.vids && d.vids.length)) return;
    if (f.startsWith('v:') && d.vstate !== f.slice(2)) return;
    if (f==='vr:1' && !s.vreview) return;
    if (f==='vr:0' && !((d.vids && d.vids.length) && !s.vreview)) return;
    if (f.startsWith('cat:') && d.cat !== f.slice(4)) return;
    if (q && !((d.title||'')+' '+d.slug).toLowerCase().includes(q)) return;
    tb.appendChild(row(d,i)); n++;
  });
  document.getElementById('count').textContent = n+' / '+DATA.length+' mục';
}
function recount(){ const fl=Object.values(store).filter(x=>x.flag).length; document.getElementById('count').textContent = DATA.length+' mục · '+fl+' cần sửa'; }

// lightbox: bấm ảnh bất kỳ (class zoom, đã load) -> phóng to
const lb = document.getElementById('lb'), lbimg = document.getElementById('lbimg');
document.addEventListener('click', e => {
  const img = e.target.closest && e.target.closest('img.zoom');
  if (img && img.naturalWidth) { lbimg.src = img.src; lb.style.display = 'flex'; }
});
lb.addEventListener('click', () => lb.style.display = 'none');
document.addEventListener('keydown', e => { if (e.key === 'Escape') lb.style.display = 'none'; });

document.getElementById('filter').addEventListener('change',render);
document.getElementById('search').addEventListener('input',render);
// Bỏ chọn "Cần sửa" ở mọi mục (giữ ghi chú)
document.getElementById('clearFlags').addEventListener('click',()=>{
  const n=Object.values(store).filter(x=>x.flag).length;
  if(!n){alert('Không có mục nào đang đánh dấu.');return;}
  if(!confirm('Bỏ đánh dấu "Cần sửa" ở '+n+' mục? (Ghi chú vẫn giữ)'))return;
  for(const k in store) if(store[k]) store[k].flag=false;
  save(); render(); recount();
});
// Xoá cả cờ lẫn ghi chú
document.getElementById('clearAll').addEventListener('click',()=>{
  const n=Object.keys(store).length;
  if(!n){alert('Chưa có dữ liệu nào để xoá.');return;}
  if(!confirm('Xoá TẤT CẢ đánh dấu + ghi chú ('+n+' mục)? Không hoàn tác được.'))return;
  for(const k in store) delete store[k];
  save(); render(); recount();
});
document.getElementById('export').addEventListener('click',()=>{
  const out = DATA.filter(d=>(store[d.slug]||{}).flag).map((d,i)=>\`\${i+1}. \${d.slug} — \${d.title}\\n   YÊU CẦU: \${(store[d.slug].note||'(chưa ghi)')}\`).join('\\n\\n');
  const txt = out || '(chưa đánh dấu mục nào "Cần sửa")';
  navigator.clipboard?.writeText(txt);
  const blob = new Blob([txt],{type:'text/plain'}); const a=document.createElement('a');
  a.href=URL.createObjectURL(blob); a.download='cover-yeu-cau-sua.txt'; a.click();
  alert('Đã copy vào clipboard + tải file cover-yeu-cau-sua.txt\\n\\n'+txt.slice(0,500));
});
render(); recount();
</script></body></html>`;

const out = path.join(ROOT, 'cover-admin.html');
fs.writeFileSync(out, html, 'utf8');
console.log(`XONG: ${rows.length} bài + ${videoRows.length} video gốc, ${videoList.length} video tổng -> ${out}`);
