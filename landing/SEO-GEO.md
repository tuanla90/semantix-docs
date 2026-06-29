# AI-SEO / GEO checklist — viết để được AI trích dẫn

> Chắt lọc từ skill `ai-seo` (coreyhaines31/marketingskills) + nghiên cứu GEO (Princeton), áp riêng cho blog dữ liệu Semantix. **Bản nháp để bạn duyệt** rồi gộp vào `CONTENT_PLAN.md` (đề xuất thành §M) nếu thấy hợp. Phần "Kỹ thuật" bên dưới đã code sẵn vào site.

## Vì sao
SEO truyền thống → lên **hạng**. GEO (Generative Engine Optimization) → được ChatGPT / Perplexity / Google AI Overviews **trích dẫn**. Trang hạng 2–3 vẫn có thể được trích nếu cấu trúc đúng.

## Đòn bẩy được trích dẫn (ưu tiên từ trên xuống)
| Làm gì | Mức tăng hiển thị* |
|---|---|
| Trích dẫn nguồn uy tín | +40% |
| Thêm số liệu / thống kê | +37% |
| Trích dẫn lời chuyên gia | +30% |
| Giọng có thẩm quyền | +25% |
| Viết rõ ràng, mạch lạc | +20% |
| Nhồi từ khóa | **−10% (phản tác dụng)** |

*Định hướng, không tuyệt đối. Kết hợp mạnh nhất: **số liệu + văn mạch lạc**. Site hạng thấp hưởng lợi nhiều hơn (tới +115% khi có citation).

→ Blog Semantix có lợi thế sẵn: **biểu đồ ECharts + số liệu gốc** chính là "mồi trích dẫn". Tận dụng triệt để.

## Quy tắc khi viết (thêm vào checklist G10 trước khi đăng)
- [ ] Mỗi H2/H3 **mở đầu bằng câu trả lời thẳng 40–60 từ** (tối ưu cho featured snippet & AI Overview); giải thích sâu để sau.
- [ ] Tiêu đề mục viết **đúng cách người ta hỏi** ("X là gì", "X khác Y ra sao", "khi nào dùng X").
- [ ] So sánh → dùng **bảng**; quy trình → dùng **list đánh số** (AI trích bảng/list dễ hơn đoạn văn dài).
- [ ] Có **≥1 số liệu kèm nguồn** (link hoặc tên báo cáo). Số minh họa thì ghi rõ "minh họa".
- [ ] Ưu tiên các dạng AI hay trích nhất: **bài so sánh** (~33% citation), **guide đầy đủ** (~15%), **nghiên cứu/số liệu gốc** (~12%).

## Xếp ưu tiên 151 bài backlog (từ skill content-strategy)
Chấm mỗi ý tưởng theo trọng số: **Tác động khách hàng 40% · Hợp sản phẩm 30% · Tiềm năng search 20% · Công sức 10%**. Và phân loại **Searchable** (bắt nhu cầu có sẵn — ưu tiên) vs **Shareable** (tạo nhu cầu).

## Kỹ thuật (ĐÃ code sẵn vào site)
- `public/robots.txt`: KHÔNG chặn GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended, Bingbot.
- `public/llms.txt`: tóm tắt site + link chính cho LLM.
- JSON-LD `Organization` + `WebSite` (mọi trang) và `BlogPosting` + `BreadcrumbList` (mỗi bài).
- `sitemap.xml` + `<link rel="canonical">` + thẻ Open Graph / Twitter.
- **Còn thiếu (cần bạn thêm):** `public/og/default.png` (1200×630) và `public/og/logo.png`; xác nhận domain trong `astro.config.mjs`.
