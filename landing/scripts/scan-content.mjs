// Scan filesystem -> dữ liệu quản trị nội dung (blog + video status). LIVE, không bake.
// Dùng bởi edit-server (/api/admin-data) và gen-admin (bản tĩnh fallback).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..'); // landing/
const BLOG = path.join(ROOT, 'src/content/blog');
const VIDEOS = path.join(ROOT, 'video/videos');
const VOUT = path.join(ROOT, 'video/out');
const VSCRIPTS = path.join(ROOT, 'video-scripts');

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

const hasMp4 = (slug) => { try { return fs.readdirSync(path.join(VOUT, slug)).some(f => f.endsWith('.mp4')); } catch { return false; } };
// voice AI THẬT: gen_audio.py ghi beats.json trỏ .mp3; scaffold.py chỉ ghi .wav (câm, nhạc/sfx preview).
const realVoice = (slug) => {
  try { const bj = JSON.parse(fs.readFileSync(path.join(VIDEOS, slug, 'beats.json'), 'utf8'));
    return Array.isArray(bj) && bj.length > 0 && /\.mp3$/i.test(bj[0].audio || ''); } catch { return false; }
};

export function scanAll() {
  const rows = fs.readdirSync(BLOG).filter(f => f.endsWith('.md')).map(f => {
    const slug = f.replace(/\.md$/, '');
    const d = fm(fs.readFileSync(path.join(BLOG, f), 'utf8'));
    const { t, sub } = splitTitle(d.title);
    return {
      slug, title: d.title || slug, t, sub: sub || d.description || '',
      date: d.pubDate || '', cat: d.category || '',
      png: `public/blog/covers/${slug}.png`, vids: [], vthumb: '',
    };
  }).sort((a, b) => String(a.date).localeCompare(String(b.date)));

  const blogSet = new Set(rows.map(r => r.slug));
  const sourcesOf = (videoSlug) => {
    let header = '';
    try { header = fs.readFileSync(path.join(VIDEOS, videoSlug, 'content.py'), 'utf8').split(/\nORDER\b/)[0]; } catch {}
    const found = [...blogSet].filter(s => new RegExp('(^|[^a-z0-9-])' + s + '([^a-z0-9-]|$)').test(header));
    if (blogSet.has(videoSlug) && !found.includes(videoSlug)) found.push(videoSlug);
    return found;
  };
  const videoList = (exists(VIDEOS) ? fs.readdirSync(VIDEOS) : [])
    .filter(slug => exists(path.join(VIDEOS, slug, 'content.py')))
    .sort()
    .map(slug => ({
      slug,
      scenes: exists(path.join(VIDEOS, slug, 'scenes.json')),
      scaffolded: exists(path.join(VIDEOS, slug, 'beats.json')),   // có track audio (câm scaffold HOẶC voice thật)
      voiced: realVoice(slug),                                     // CHỈ true khi có voice AI (.mp3)
      thumb: exists(path.join(VOUT, slug, 'thumb.png')) ? `video/out/${slug}/thumb.png` : '',
      render: hasMp4(slug),
      publish: exists(path.join(VSCRIPTS, slug + '.PUBLISH.md')),
      sources: sourcesOf(slug),
    }));

  const blogToVideos = {};
  for (const v of videoList) for (const b of v.sources) (blogToVideos[b] ||= []).push(v.slug);
  const vidInfo = (vs) => { const v = videoList.find(x => x.slug === vs) || {}; return { slug: vs, scenes: !!v.scenes, scaffolded: !!v.scaffolded, voiced: !!v.voiced, thumb: v.thumb || '', render: !!v.render, publish: !!v.publish }; };
  for (const r of rows) {
    r.vids = (blogToVideos[r.slug] || []).map(vidInfo);
    const tv = r.vids.find(v => v.thumb); r.vthumb = tv ? tv.thumb : '';
    r.vstate = vstate(r.vids);
  }
  const orphan = videoList.filter(v => v.sources.length === 0 && !blogSet.has(v.slug));
  const videoRows = orphan.map(v => ({
    slug: v.slug, title: v.slug, t: v.slug, sub: 'Video gốc - không gắn blog', date: '', cat: 'VIDEO',
    png: '', isVideoOnly: true, vids: [vidInfo(v.slug)], vthumb: v.thumb, vstate: vstate([vidInfo(v.slug)]),
  }));
  const allRows = [...videoRows, ...rows];
  const cats = [...new Set(allRows.map(r => r.cat).filter(c => c && c !== 'VIDEO'))].sort();
  return { rows: allRows, cats, stamp: Date.now() };
}

// trạng thái pipeline tổng hợp của 1 dòng: none < script < scenes < scaffold < voiced < render < publish
function vstate(vids) {
  if (!vids.length) return 'none';
  if (vids.some(v => v.publish)) return 'publish';
  if (vids.some(v => v.render)) return 'render';
  if (vids.some(v => v.voiced)) return 'voiced';
  if (vids.some(v => v.scaffolded)) return 'scaffold';   // có nhạc/sfx (track câm) nhưng CHƯA voice AI
  if (vids.some(v => v.scenes)) return 'scenes';
  return 'script';
}
