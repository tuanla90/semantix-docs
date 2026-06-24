# Knowledge Bases (Cơ Sở Tri Thức)

**Điều hướng:** Studio → DSAI → Knowledge Bases

Knowledge Base là kho tài liệu nội bộ (PDF, Word, văn bản...) được **vector hóa** và lưu trữ để AI Assistants có thể tra cứu và trả lời câu hỏi dựa trên nội dung — ngoài khả năng phân tích dữ liệu database thông thường.

---

## Khi Nào Cần Knowledge Base?

| Tình Huống | Ví Dụ |
|-----------|--------|
| **Quy trình, chính sách nội bộ** | "Quy định nghỉ phép", "Quy trình onboarding nhân viên mới" |
| **Tài liệu sản phẩm** | "Hướng dẫn sử dụng sản phẩm", "FAQ khách hàng" |
| **Văn bản kỹ thuật** | "Tài liệu API", "Hướng dẫn vận hành hệ thống" |
| **Báo cáo, phân tích** | "Báo cáo thị trường 2024", "Phân tích đối thủ cạnh tranh" |
| **Pháp lý, hợp đồng** | "Điều khoản dịch vụ", "Chính sách bảo mật" |

**Điểm mạnh:** Kết hợp Knowledge Base + Database trong cùng một AI Assistant cho phép trả lời câu hỏi kết hợp như *"Theo chính sách hiện tại, khách hàng VIP có doanh thu trên bao nhiêu?"* — AI đọc chính sách từ Knowledge Base và lấy số liệu từ database.

---

## Yêu Cầu Trước Khi Tạo

Phải có ít nhất một **AI Provider với Capability `Embedding`** đang hoạt động. Embedding model dùng để chuyển tài liệu thành vector lưu trữ.

Xem [AI Providers](ai-providers.md) để thiết lập.

**Các model embedding được hỗ trợ:**
- OpenAI: `text-embedding-3-small`, `text-embedding-3-large`, `text-embedding-ada-002`
- Google: `text-embedding-004`, `embedding-001`
- Ollama: các model embedding local

---

## Tạo Knowledge Base Mới

### Bước 1 — Khởi Tạo

1. Vào **Studio → DSAI → Knowledge Bases → New Knowledge Base**.
2. Điền thông tin cơ bản:

| Thuộc tính | Bắt Buộc | Ví Dụ |
|------------|----------|--------|
| **Name** | Có | `Quy Định Nhân Sự 2024` |
| **Description** | Khuyến nghị | `Chứa quy định về nghỉ phép, lương thưởng, kỷ luật và phúc lợi cho nhân viên. Cập nhật tháng 01/2024.` |
| **Embedding Provider** | Có | Chọn AI Provider có capability Embedding |

3. Nhấn **Save**.

### Bước 2 — Thêm Tài Liệu

Có 3 cách thêm tài liệu vào Knowledge Base:

**Cách 1 — Upload File:**
1. Nhấn **Add Document → Upload File**.
2. Chọn file từ máy tính (hỗ trợ: PDF, DOCX, TXT, MD, HTML).
3. Đặt tên mô tả cho tài liệu (tùy chọn).
4. Nhấn **Upload**.

**Định dạng hỗ trợ:**

| Định Dạng | Lưu Ý |
|-----------|--------|
| `.pdf` | Hỗ trợ tốt nhất — cả văn bản và bảng |
| `.docx` | Word 2007 trở lên |
| `.txt` | Plain text, encoding UTF-8 |
| `.md` | Markdown |
| `.html` | Chỉ lấy nội dung văn bản, bỏ qua CSS/JS |

**Cách 2 — Thêm URL:**
1. Nhấn **Add Document → Add URL**.
2. Nhập URL của trang web cần đọc.
3. Semantix sẽ crawl nội dung trang đó.

**Cách 3 — Nhập Văn Bản Trực Tiếp:**
1. Nhấn **Add Document → Enter Text**.
2. Gõ hoặc paste nội dung văn bản.
3. Đặt tiêu đề.
4. Nhấn **Save**.

### Bước 3 — Đồng Bộ (Sync)

Sau khi thêm tài liệu, nhấn **Sync** để vector hóa nội dung:

1. Nhấn nút **Sync** (hoặc **Sync All** nếu có nhiều tài liệu chưa đồng bộ).
2. Trạng thái chuyển sang **Syncing** — thời gian phụ thuộc vào dung lượng tài liệu.
3. Khi hoàn tất, trạng thái chuyển sang **Synced**.

**Ước tính thời gian Sync:**
- File PDF 10 trang: ~10-30 giây
- File PDF 100 trang: ~2-5 phút
- Nhiều file cùng lúc: chạy song song, nhanh hơn

---

## Trạng Thái Tài Liệu

| Trạng Thái | Biểu Tượng | Ý Nghĩa |
|------------|-----------|---------|
| **Pending** | ⏳ | Đã thêm vào, chờ đồng bộ |
| **Syncing** | 🔄 | Đang xử lý và vector hóa |
| **Synced** | ✅ | Hoàn tất, AI có thể tra cứu |
| **Error** | ❌ | Có lỗi trong quá trình xử lý |
| **Outdated** | ⚠️ | Tài liệu đã được cập nhật, cần Sync lại |

---

## Gắn Knowledge Base vào AI Assistant

1. Vào **Studio → DSAI → AI Assistants** → chọn Assistant muốn gắn.
2. Trong phần cấu hình, tìm mục **Knowledge Bases**.
3. Nhấn **Add** → chọn một hoặc nhiều Knowledge Base.
4. Nhấn **Save**.

Từ lúc này, khi người dùng chat với Assistant đó, AI sẽ **tự động tra cứu** cả database lẫn tài liệu trong Knowledge Base để trả lời — người dùng không cần chỉ định rõ nguồn nào.

**Ví dụ tương tác:**

```
User: "Nhân viên mới vào có được thưởng Tết không?"
AI: [Tra cứu Knowledge Base "Quy Định Nhân Sự 2024"] 
    "Theo chính sách công ty, nhân viên cần làm việc ít nhất 3 tháng 
    trước ngày Tết mới đủ điều kiện nhận thưởng Tết. Nhân viên đủ điều 
    kiện được thưởng theo hệ số tương đương 1 tháng lương cơ bản..."

User: "Hiện tại công ty có bao nhiêu nhân viên đủ điều kiện?"
AI: [Truy vấn database] "Hiện tại có 87 nhân viên đã làm việc trên 3 tháng 
    và đủ điều kiện nhận thưởng Tết 2024."
```

---

## Cập Nhật Tài Liệu

Khi tài liệu gốc thay đổi:

1. Xóa tài liệu cũ (hoặc upload version mới).
2. Nhấn **Sync** để cập nhật vector.

> **Lưu ý quan trọng:** Chỉ nhấn Sync sau khi thêm/cập nhật tài liệu. AI chỉ đọc được nội dung đã được Sync — tài liệu mới upload nhưng chưa Sync sẽ không được AI tra cứu.

---

## Xóa Tài Liệu

1. Trong danh sách tài liệu, nhấn **⋮** bên cạnh tài liệu cần xóa.
2. Chọn **Delete**.
3. Tài liệu bị xóa khỏi Knowledge Base (cả file gốc lẫn vector).
4. Không cần Sync lại — xóa có hiệu lực ngay.

---

## Phân Quyền Knowledge Base

| Permission | Cho Phép |
|------------|---------|
| `create_knowledge` | Tạo Knowledge Base mới |
| `edit_knowledge` | Thêm, xóa tài liệu, Sync |
| `delete_knowledge` | Xóa toàn bộ Knowledge Base |

Người dùng không có permission trên vẫn có thể **dùng AI Assistant** được gắn Knowledge Base — họ hỏi, AI tra cứu và trả lời.

---

## Thực Hành Tốt Nhất

### 1. Tổ Chức Knowledge Base Theo Chủ Đề

Tạo nhiều Knowledge Base nhỏ theo chủ đề thay vì một Knowledge Base khổng lồ:
- `Nhân Sự - Quy Định` (chính sách lao động, nghỉ phép, lương thưởng)
- `Nhân Sự - Onboarding` (hướng dẫn nhân viên mới)
- `IT - Hướng dẫn Sử dụng` (tài liệu hệ thống nội bộ)
- `Sản phẩm - FAQ` (câu hỏi thường gặp từ khách hàng)

### 2. Viết Tài Liệu Rõ Ràng

AI tra cứu dựa trên nội dung văn bản. Tài liệu có cấu trúc rõ ràng (tiêu đề, gạch đầu dòng, bảng) sẽ được AI hiểu và trích dẫn tốt hơn.

### 3. Cập Nhật Định Kỳ

Lên lịch review và cập nhật Knowledge Base ít nhất mỗi quý. Tài liệu lỗi thời làm AI trả lời sai.

### 4. Mô Tả Knowledge Base Đầy Đủ

Description tốt giúp AI biết khi nào nên tra cứu Knowledge Base này. Ví dụ: *"Chứa chính sách nhân sự hiện hành tính đến tháng 01/2024. Tra cứu khi có câu hỏi về nghỉ phép, lương, thưởng, kỷ luật."*

---

## Xử Lý Sự Cố

| Vấn Đề | Nguyên Nhân | Cách Xử Lý |
|---------|-------------|------------|
| Trạng thái mãi "Syncing" | Server bận hoặc file quá lớn | Chờ thêm hoặc thử Sync lại sau 5 phút |
| Trạng thái "Error" | File bị hỏng hoặc định dạng không hỗ trợ | Kiểm tra file gốc, thử export lại sang PDF |
| AI không tìm thấy thông tin | Chưa Sync, hoặc nội dung không có trong tài liệu | Kiểm tra trạng thái Sync, kiểm tra lại nội dung tài liệu |
| AI trả lời sai dù có tài liệu | Tài liệu mơ hồ hoặc mâu thuẫn | Xem lại và làm rõ nội dung trong tài liệu |
| "Embedding Provider not found" | Chưa tạo AI Provider với Embedding | Tạo AI Provider và bật Embedding capability |
