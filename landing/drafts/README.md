# Quy trình content: Claude thô → Antigravity → merge → deck

Dây chuyền 5 bước cho một bài mới. Chỉ bước 2 làm tay, còn lại gọi skill trong Claude Code.

| # | Bước | Ai làm | Lệnh / thao tác | Ra file |
|---|------|--------|-----------------|---------|
| 1 | Viết thô | Claude | `/content-writer <đề tài>` | `landing/drafts/<slug>.md` |
| 2 | Viết lại humanly | **Mình + Antigravity** | Copy khối brief trong [ANTIGRAVITY-BRIEF.md](./ANTIGRAVITY-BRIEF.md) + bài thô, dán vào Antigravity | Lưu kết quả thành `landing/drafts/<slug>.ag.md` |
| 3 | Merge bám rule | Claude | `/content-merge <slug>` (hoặc dán bản AG vào chat) | Ghi đè `<slug>.md`, kèm bảng "lấy gì từ đâu" |
| 4 | QA trước đăng | Claude | `/content-check <slug>` | Verdict ĐĂNG ĐƯỢC / CẦN SỬA |
| 5 | Deck trình bày | Claude | `/content-deck <slug>` | `landing/video-decks/<slug>/deck.html` + `kich-ban-noi.md` |

Sau bước 4: promote bài từ `drafts/` sang `src/content/blog/` theo luồng riêng (Claude không tự promote). Sau bước 5: mở `deck.html` bằng Chrome, bấm `F` fullscreen, quay OBS với webcam góc dưới-phải — nói trực tiếp, không render video.

## Theo dõi trên trang admin

Chạy `npm run edit` (trong `landing/`) rồi mở `http://localhost:8124/admin`: bài nháp hiện nhóm "📝 Nháp", mỗi bài có badge **🪄 AG** (đã có `<slug>.ag.md` chưa — khi có, bấm vào pill là mở diff so bản AG với bản gốc) và nút **🖥 Slide** — bấm là mở thẳng deck HTML (`/deck?slug=<slug>`), kèm **🎤 Kịch bản** nói. Lọc theo các trạng thái này ở facet "Quy trình bài".

## Quy ước file trong thư mục này

- `<slug>.md` — bản đang chốt (thô lúc đầu, thành bản merge sau bước 3).
- `<slug>.ag.md` — bản Antigravity, giữ tới khi bài publish rồi mới dọn.
- Soi diff bằng mắt sau khi merge: bấm **Δ Diff** trên trang admin (hoặc mở `http://localhost:8124/diff?slug=<slug>`) — cột trái là mốc Git chọn được (HEAD~1/HEAD/main), cột phải là file đang có trên máy, kèm chỉ số % khác biệt và quét em-dash.

## Vì sao phải merge (bước 3)?

Antigravity viết mượt nhưng bay: hay cắt internal link, đổi war story thành giọng sách giáo khoa, thêm overclaim "luôn chính xác". Claude bám rule nhưng văn thô hơn. Skill `content-merge` lấy khung văn AG làm nền rồi trả lại xương sống: hook khớp title, giọng "mình", links, neo uy tín (dbt, WrenAI...), câu định vị sản phẩm, khẩu ngữ. Chuẩn tham chiếu: bài `semantic-layer`, commit `e84085a`.
