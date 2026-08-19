---
name: content-merge
description: Ghép bản viết lại của Antigravity với bản gốc thành bản chuẩn cuối — giữ xương sống theo rule, lấy văn mượt của AG. Dùng khi đã có <slug>.ag.md từ Antigravity cần review/merge, hoặc user dán bản viết lại vào chat.
---

# Content Merge — review & ghép bản Antigravity

Vai: biên tập cuối. Antigravity viết mượt nhưng "bay", không bám file rules. Nhiệm vụ: lấy cái mượt của AG, trả lại cái xương sống của bản gốc. Chuẩn tham chiếu: lần merge bài `semantic-layer` (commit `e84085a`).

## Input
- Bản gốc: `landing/drafts/<slug>.md` (bài mới) hoặc `landing/src/content/blog/<slug>.md` (viết lại bài đã live).
- Bản AG: `landing/drafts/<slug>.ag.md` (user lưu từ Antigravity) hoặc dán thẳng vào chat.

## Quy trình
1. Đọc cả hai bản + `landing/STYLE.md` nếu chưa nắm giọng.
2. Lấy **khung văn của AG làm nền**: câu liền mạch, ít bold, không câu cụt, không em-dash.
3. Soát **xương sống** — từng mục PHẢI sống sót từ bản gốc, AG hay làm rơi:
   - [ ] Hook khớp lời hứa của title (vd title nói "không số nào sai" thì thân bài phải chốt "cả ba đều đúng", không phải "không bịa đặt").
   - [ ] Giọng "mình" + war story thật. AG hay đổi thành giọng vô danh "khi làm việc với các hệ thống lớn..." → trả lại nguyên đoạn.
   - [ ] Internal links, video callout 🎬, CTA cuối bài — AG hay cắt sạch.
   - [ ] Neo uy tín: tên tool/hệ thống thật (dbt, Cube, WrenAI...).
   - [ ] Câu định vị sản phẩm (brand-light, 1 beat).
   - [ ] Khẩu ngữ tự nhiên ("dăm bảy kiểu", "thấm đòn") — AG hay dịch phẳng thành số liệu khô.
4. Soát **overclaim AG thêm vào**: "luôn chính xác", "loại bỏ hoàn toàn", "duy nhất" → hạ tông hoặc cắt.
5. **GIỮ chi tiết đời thực** AG thêm (COD, phí sàn, voucher sàn, sổ phụ...) — đó thường là phần ngon nhất của AG.
6. Số liệu hai bản vênh nhau → lấy khoảng an toàn ("trên dưới 20%"), không giả chính xác.
7. Chạy skill **stop-slop** trên bản ghép (giữ ngoại lệ như content-writer: hook, "..." nhịp nói).
8. Ghi bản ghép đè vào file gốc. KHÔNG xoá `<slug>.ag.md` (drafts chưa vào git, xoá là mất); user tự dọn sau khi publish.

## Output
Bản ghép + bảng ngắn "lấy gì từ đâu" (từ AG / từ bản gốc / tự quyết) để user duyệt. Kết bằng đề xuất chạy **content-check** trước khi đăng.
