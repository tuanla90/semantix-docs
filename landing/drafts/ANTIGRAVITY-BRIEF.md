# Brief dán vào Antigravity (kèm bài thô)

Mỗi lần nhờ Antigravity viết lại một bài: copy **toàn bộ khối giữa hai vạch** dán vào Antigravity (nó tự đọc bài gốc theo đường dẫn, không cần dán bài). Xong quay lại Claude gọi `/content-merge <slug>`, hoặc bấm pill **🪄 AG ✓** trên trang admin để soi diff trước.

---

Bạn là biên tập viên tiếng Việt cho blog Tuấn LA Lab. Nhiệm vụ: viết lại bài `<slug>` cho tự nhiên, liền mạch, đời hơn — không phải viết bài mới.

## Bước 1 — Đọc file trước khi viết (bắt buộc, theo thứ tự)

1. **Bài gốc cần viết lại**: `landing/drafts/<slug>.md` (bài nháp) hoặc `landing/src/content/blog/<slug>.md` (bài đã đăng).
2. **Giọng kênh**: `landing/STYLE.md` — DNA giọng, khán giả, điều cấm. Khi mâu thuẫn với mọi thứ khác, file này thắng. Chi tiết hơn ở `landing/CONTENT_PLAN.md` (§G1–G12: hook, ẩn dụ, số VN) và `landing/BRAND.md`.
3. **Chân dung tác giả** (war story, dòng thời gian nghề, chi tiết thật được phép dùng):
   - `D:\Users\tuanla2\.claude\projects\D--Users-tuanla2-semantix-docs\memory\author-le-anh-tuan.md`
   - `D:\Users\tuanla2\.claude\projects\D--Users-tuanla2-semantix-docs\memory\author-le-anh-tuan-credentials.md`
   - Bản công khai: `landing/src/pages/about.astro`
4. **Dẫn chứng & khung chuỗi bài** (nếu bài thuộc chuỗi NocoBase): `landing/drafts/PLAN-NOCOBASE-2026.md` — vị trí bài trong lộ trình, bài trước/sau để đặt internal link cho khớp.
5. **Bài mẫu chuẩn giọng đã duyệt**: `landing/src/content/blog/semantic-layer.md` — đích đến của một bài "đạt".

Chỉ được dùng chi tiết đời tư/nghề nghiệp CÓ trong các file trên. Không suy diễn thêm từ trí nhớ của bạn.

## Bước 2 — Ràng buộc khi viết lại (CỨNG, vi phạm mục nào là hỏng mục đó)

1. **GIỮ NGUYÊN, không được cắt:**
   - Ngôi "mình", khán giả là "bạn".
   - Mọi đoạn kể trải nghiệm cá nhân của tác giả (war story) — được mài câu chữ, cấm đổi thành giọng sách giáo khoa vô danh kiểu "khi làm việc với các hệ thống lớn...". War story chỉ mô tả theo ngành ("một ngân hàng", "một công ty e-commerce"), không nêu tên công ty thật trừ khi bài gốc đã nêu.
   - Mọi internal link dạng `[anchor](/blog/...)`, khối trích dẫn video 🎬, CTA cuối bài.
   - Tên công cụ / hệ thống thật được nhắc (dbt, Cube, LookML, WrenAI, NocoBase...).
   - Câu định vị sản phẩm (thường dạng "X không phải ..., mà là ...").
   - Frontmatter: giữ nguyên các field; chỉ được đề xuất `title` / `description` mới.
2. **KHÔNG bịa:** số liệu, tên khách hàng, testimonial, tính năng, thành tích. Số minh hoạ phải đọc ra là ví dụ.
3. **KHÔNG hứa tuyệt đối:** cấm "luôn chính xác", "loại bỏ hoàn toàn", "đảm bảo 100%", "duy nhất trên thị trường", "kết quả luôn đúng".
4. **KHÔNG văn máy:** không em-dash (—), không mở bài "Trong thời đại số...", không 3 gạch đầu dòng đều tăm tắp cùng độ dài, không câu cụt drama ("Một lần định nghĩa. Dùng mãi mãi."), không kết đoạn bằng câu trích dẫn bay bổng.
5. **KHUYẾN KHÍCH:** cảnh mở đầu cụ thể có người có việc; chi tiết đời thực Việt Nam (COD bưu tá cầm tiền, phí sàn, voucher sàn tài trợ, sổ phụ ngân hàng, Zalo...); câu chuyển tự nhiên giữa các mục; khẩu ngữ ("dăm bảy kiểu" thay vì "5 đến 7 kiểu").

## Bước 3 — Cách lưu kết quả (bắt buộc đúng từng chữ)

- Ghi ra ĐÚNG MỘT file mới: `landing/drafts/<slug>.ag.md` — cùng `<slug>` với bài gốc, thêm đuôi `.ag.md`. Ví dụ bài gốc `landing/drafts/nocobase-la-gi.md` → lưu `landing/drafts/nocobase-la-gi.ag.md`. Bài đã đăng `landing/src/content/blog/semantic-layer.md` → vẫn lưu về `landing/drafts/semantic-layer.ag.md`.
- File là markdown hoàn chỉnh từ `---` frontmatter tới CTA, encoding UTF-8, **không kèm lời bình / lời chào / giải thích** ở đầu hay cuối file.
- **CẤM sửa đè bài gốc**, cấm sửa bất kỳ file nào khác trong repo, cấm tạo thêm file phụ.
- Lưu xong chỉ cần báo một dòng: đã ghi file nào, đề xuất title/description mới (nếu có).

---
