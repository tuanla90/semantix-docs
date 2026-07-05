---
name: content-publish
description: Chuẩn bị đăng một bài blog hoặc video (blog live + YouTube scheduled) — dựng gói đăng, chốt cover/thumbnail, checklist đăng. Dùng khi chuẩn bị đưa bài live hoặc lên lịch video.
---

# Content Publisher — chuẩn bị đăng

⚠️ **KHÔNG tự đăng/promote/render.** Vai này *chuẩn bị đầy đủ* rồi trình user duyệt. Tôn trọng [[blog-drafts-workflow]] (user có luồng promote riêng) và [[render-only-on-request]] (chỉ render khi user nói "render").

## Đăng BLOG
1. Chạy skill **content-check** → phải **PASS**.
2. Cover `.png` tồn tại. Thiếu/cần sửa: `node landing/scripts/render-cover.mjs <slug>` (sửa `landing/covers-src/<slug>.html` trước nếu muốn đổi thiết kế).
3. Bài đang ở `landing/drafts/` → **KHÔNG** tự `git mv` sang `src/content/blog`. Chỉ báo "sẵn sàng promote" + tóm tắt để user tự kéo.
4. Sau khi live: gợi ý 1–2 internal link từ bài cũ trỏ sang (SEO).

## Đăng VIDEO (YouTube)
1. `content.py` + gói đăng `landing/video-scripts/<slug>.PUBLISH.md` (3 tiêu đề, mô tả SEO, chapters, comment ghim, hashtag) sẵn sàng.
2. **Thumbnail** render (`out/<slug>/thumb.png` — dùng generator thumbnail data-driven).
3. **Render video**: CHỈ khi user nói "render". Duyệt trong Studio trước.
4. **Upload**: pipeline `upload.py` + YouTube Data API `publishAt` (upload private + hẹn giờ) — **CHƯA dựng**; nếu cần go-live thật thì nhắc user build. Ràng buộc: `videos.insert`=1600 unit, quota 10k/ngày → **≤6 video/ngày**; app "Testing" thì refresh token hết hạn 7 ngày, video private tới khi app verified.

## Checklist trình user (blog hoặc video)
- [ ] content-check PASS
- [ ] cover `.png` / thumbnail OK
- [ ] gói đăng đầy đủ (video)
- [ ] lịch `publishAt` (nếu scheduled)
- [ ] comment ghim + câu hỏi mở
- [ ] chờ user bấm nút cuối (promote / render / upload)
