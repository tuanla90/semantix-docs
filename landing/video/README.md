# landing/video — nội dung video kênh Tuấn LA Lab

Thư mục này chỉ chứa **nội dung + brand**. Máy móc dựng video nằm ở repo riêng `blog2video` và vào đây qua `node_modules`.

## Ở đây có gì

| Đường dẫn | Nội dung |
|---|---|
| `video.config.json` | brand (tên/màu/wordmark), nhịp, nhạc nền, 6 màu category thumbnail |
| `videos/<slug>/` | `content.py` (lời thoại), `scenes.json` (hình), `thumb.json` (thumbnail) — bạn viết<br>`beats/timings/outro.json` — engine sinh |
| `src/index.ts` | 4 dòng nối config + registry vào engine |
| `src/og.tsx`, `thumbnail.tsx`, `thumb-root.tsx` | ảnh OG + thumbnail bản Remotion (đường cũ, chạy tay khi cần) |
| `public/thumb/` | mặt + logo LA |
| `public/audio/` | voiceover đã sinh (gitignore, ~300MB) |
| `.env` | key ElevenLabs (KHÔNG commit) |

`src/videos.gen.ts`, `public/lottie/`, `out/` đều sinh tự động → gitignore.

## Lệnh

```bash
npm run studio
```

```bash
npm run registry
```

```bash
npm run thumb -- llm-bia-sql
```

```bash
npm run build -- llm-bia-sql --no-render
```

Sau mỗi lần nâng cấp engine chạy `npm run sync-assets` — copy lottie + sfx vào `public/`, vì Remotion `staticFile()` không với tới `node_modules`. Nhạc nền (`public/audio/music/`) là của riêng repo này, engine không đụng tới.

Dùng `npm run …` chứ đừng `npx blog2video …`: npx hỏi registry npm trước và hay treo sau proxy công ty.

## Nối với engine

`package.json` đang trỏ `"blog2video": "file:../../../blog2video"` — sửa engine là thấy ngay, nhưng phải chạy `npm run build:lib` bên engine để `dist/` cập nhật. Khi engine ổn định thì đổi sang `github:<user>/blog2video#v0.1.0`.

- Cấu hình từng field: `blog2video/docs/CONFIG.md`
- Gotcha khi dựng (Chrome bị chặn, onnxruntime, proxy MITM): `blog2video/docs/PIPELINE.md`
- Cách chẻ bài viết thành beat: `blog2video/docs/SCRIPT-PROTOCOL.md` + tông giọng ở [../STYLE.md](../STYLE.md)
