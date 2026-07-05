---
name: content-check
description: Soát (QA) một bài blog hoặc script trước khi đăng — giọng de-AI, trung thực/NDA, SEO, link hỏng, cover, frontmatter, build. Dùng khi review bài trước khi publish hoặc kiểm chất lượng nội dung.
---

# Content Check — QA nội dung trước khi đăng

Chạy checklist trên MỘT bài (blog `.md` hoặc script `content.py`/`.PUBLISH.md`). Xuất bảng **PASS/FAIL** + danh sách cần sửa. **Không tự sửa** trừ khi user bảo.

## Checklist

### 1. Giọng & typography (de-AI)
- [ ] Chạy skill **stop-slop** → điểm ≥ 35/50; không câu "hắng giọng", đối-lập nhị phân, pull-quote dạng prose, false-agency.
- [ ] Ký tự "máy": `—` (em-dash) = 0 → dùng `,` `.` `:`. Không `…` (ellipsis char). Không `×` kiểu "30×" → "gấp N lần". ("..." nhịp nói được giữ.)
- [ ] Trạng từ/intensifier thừa (hoàn toàn, thật ra, thành thật, rất, chính, sạch) đã cắt.

### 2. Trung thực & NDA (xem [[semantix-site-honesty]], author bible)
- [ ] Không bịa co-founder/team/tên khách/testimonial/số traction.
- [ ] NDA đúng ngữ cảnh: war story blog dùng mô tả ngành; tên công ty thật chỉ ở `/about` CV.
- [ ] Persona hư cấu chỉ minh hoạ, không làm byline/chứng thực.

### 3. SEO
- [ ] `title` ~50–60 ký tự, có từ khoá chính; `description` 120–160 ký tự, có hook.
- [ ] `category` hợp lệ; `pubDate`; `author: "Lê Anh Tuấn"`; `readTime` hợp lý.
- [ ] ≥ 1–2 **internal link** tới bài liên quan, anchor có nghĩa (không "bấm vào đây").

### 4. Ảnh & link
- [ ] `cover` trỏ file tồn tại: `public/blog/covers/<slug>.png` (hoặc `.svg`); có `coverAlt`.
- [ ] Không link chết — đặc biệt `/docs/vi/free-trial/` (đang chết, xem [[semantix-site-personal-hub]]); external link còn sống.

### 5. Build
- [ ] `npm --prefix landing run build` không lỗi (frontmatter khớp schema `src/content/config.ts`).

## Cách chạy
Grep/đọc bài, kiểm từng mục, in `✅/❌` + lý do + đề xuất sửa gọn. Kết bằng verdict: **ĐĂNG ĐƯỢC** hay **CẦN SỬA (n mục)**.
