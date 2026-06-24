# AI Assistants (Trợ Lý AI)

**Điều hướng:** Studio → DSAI → AI Assistants

AI Assistant là **trợ lý AI được cấu hình riêng** về tính cách, ngôn ngữ, phạm vi dữ liệu (Context) và model AI. Một hệ thống Semantix có thể có nhiều AI Assistant khác nhau phục vụ nhiều bộ phận hoặc mục đích khác nhau.

**Ví dụ thực tế:**
- "Trợ lý Kinh doanh" — phân tích doanh thu, đơn hàng, dùng GPT-4o, ngôn ngữ tiếng Việt
- "Sales Analyst" — phân tích sales pipeline, dùng Claude Sonnet, ngôn ngữ tiếng Anh
- "HR Bot" — tra cứu thông tin nhân sự, dùng Gemini Flash, chỉ cho phép đội HR

---

## Tạo AI Assistant Mới

### Bước 1 — Khởi Tạo

1. Vào **Studio → DSAI → AI Assistants → New Assistant**.
2. Form cấu hình mở ra.

### Bước 2 — Thông Tin Cơ Bản

| Trường | Bắt Buộc | Ví Dụ | Mô Tả |
|--------|----------|--------|--------|
| **Name** | Có | `Trợ lý Kinh doanh` | Tên hiển thị trong giao diện chat |
| **Icon** | Không | 🤖 hoặc upload ảnh | Biểu tượng nhận diện trong danh sách |
| **Description** | Không | `Phân tích doanh thu và đơn hàng` | Mô tả ngắn về chức năng |
| **Active** | — | Bật | Tắt để ẩn khỏi người dùng |

### Bước 3 — Chọn Context và AI Provider

| Trường | Bắt Buộc | Mô Tả |
|--------|----------|--------|
| **Context** | Có | Chọn Semantic Context đã tạo — định nghĩa phạm vi dữ liệu AI được phép truy cập |
| **AI Provider** | Có | Chọn nhà cung cấp AI (OpenAI, Anthropic, Gemini...) |
| **Model** | Có | Tên model cụ thể (ví dụ: `gpt-4o`, `claude-sonnet-4-5`, `gemini-1.5-pro`) |

**Gợi ý chọn Model:**

| Model | Ưu Điểm | Dùng Khi |
|-------|----------|---------|
| `gpt-4o` (OpenAI) | Nhanh, chính xác cao, đa ngôn ngữ tốt | Phân tích dữ liệu phức tạp, nhiều người dùng |
| `gpt-4-turbo` (OpenAI) | Ngữ cảnh dài hơn | Context có nhiều Model phức tạp |
| `claude-sonnet-4-5` (Anthropic) | Lý luận mạnh, ít "hallucination" | Phân tích đòi hỏi độ chính xác cao |
| `gemini-1.5-pro` (Google) | Ngữ cảnh rất dài | Khi Knowledge Base có tài liệu dài |
| `gemini-1.5-flash` (Google) | Rất nhanh, chi phí thấp | Câu hỏi đơn giản, nhiều người dùng |
| Model Ollama (local) | Không gửi dữ liệu ra ngoài | Yêu cầu bảo mật cao, dữ liệu nhạy cảm |

### Bước 4 — Ngôn Ngữ và Tin Nhắn Chào

| Trường | Ví Dụ | Mô Tả |
|--------|--------|--------|
| **Language** | `vi` | Ngôn ngữ AI dùng để trả lời (`vi` = tiếng Việt, `en` = tiếng Anh) |
| **Greeting Message** | (xem ví dụ) | Câu đầu tiên hiển thị khi người dùng mở chat |

**Ví dụ Greeting Message:**
```
Xin chào! Tôi là Trợ lý Kinh doanh của [Tên Công ty]. 
Bạn có thể hỏi tôi về doanh thu, đơn hàng, và khách hàng.
Ví dụ: "Doanh thu tháng này theo kênh bán hàng là bao nhiêu?"
```

### Bước 5 — Personality (System Prompt)

Personality là **hướng dẫn tính cách và phong cách trả lời** cho AI — còn gọi là system prompt. Đây là yếu tố quyết định AI trả lời theo phong cách nào.

**Cấu trúc Personality hiệu quả:**

```
[1. VAI TRÒ] Bạn là [tên/vai trò] của [công ty]. 

[2. PHONG CÁCH] Trả lời bằng tiếng Việt, [ngắn gọn/chi tiết], [chuyên nghiệp/thân thiện].

[3. ƯU TIÊN] Tập trung vào [loại số liệu/phân tích ưu tiên].

[4. FORMAT] Luôn trình bày số liệu dạng [bảng/biểu đồ]. Đơn vị tiền tệ là [VNĐ/USD].

[5. GIỚI HẠN] Chỉ trả lời câu hỏi liên quan đến [phạm vi]. Nếu không chắc, hãy nói rõ.

[6. XỬ LÝ KHÔNG CHẮC] Khi không có dữ liệu đủ, thông báo và đề xuất cách đặt câu hỏi khác.
```

**Ví dụ Personality cho Trợ lý Kinh doanh:**

```
Bạn là Trợ lý Phân tích Kinh doanh của Công ty ABC. Nhiệm vụ của bạn 
là giúp đội Sales và Management phân tích dữ liệu bán hàng một cách 
nhanh chóng và chính xác.

Phong cách:
- Trả lời bằng tiếng Việt, ngắn gọn và chuyên nghiệp
- Luôn trình bày số liệu dạng bảng nếu có nhiều hơn 3 giá trị
- Đơn vị tiền tệ: VNĐ, định dạng có dấu phẩy ngàn (1.234.567)
- Làm tròn đến nghìn VNĐ khi cần

Ưu tiên phân tích:
- Tăng trưởng so với cùng kỳ (YoY, MoM)
- Top sản phẩm/khách hàng/khu vực
- Tỷ lệ hoàn thành mục tiêu (target)

Giới hạn:
- Chỉ phân tích dữ liệu bán hàng trong Context được giao
- Không đưa ra dự đoán tương lai trừ khi được yêu cầu rõ ràng
- Khi không chắc về định nghĩa chỉ số, hỏi lại người dùng
```

**Ví dụ Personality cho Trợ lý Nhân sự:**

```
Bạn là Trợ lý HR Analytics, hỗ trợ đội HR và quản lý phân tích 
dữ liệu nhân sự. 

Bảo mật: Không bao giờ hiển thị thông tin cá nhân chi tiết của cá nhân 
nhân viên (lương cụ thể, địa chỉ) — chỉ tổng hợp theo phòng ban hoặc cấp bậc.

Phong cách: Chính xác, khách quan. Trả lời tiếng Việt.
Đơn vị lương: triệu VNĐ.
```

### Bước 6 — Knowledge Bases (Cơ Sở Tri Thức)

Nếu muốn AI có thể trả lời câu hỏi từ tài liệu nội bộ (không chỉ database), hãy gắn thêm Knowledge Base:

1. Trong phần **Knowledge Bases**, nhấn **Add**.
2. Chọn một hoặc nhiều Knowledge Base đã tạo.
3. AI sẽ tự động tra cứu cả database lẫn tài liệu khi trả lời.

Xem [Knowledge Bases](knowledge-bases.md) để biết cách tạo.

### Bước 7 — Phân Quyền Truy Cập

Tab **Access Control** cho phép chỉ định ai được dùng Assistant này:

| Cấp Độ | Ý Nghĩa |
|--------|---------|
| **Public** (mặc định) | Mọi người dùng đã đăng nhập đều thấy |
| **Role-based** | Chỉ user có Role cụ thể mới thấy và dùng được |
| **User-based** | Chỉ định từng user cụ thể |

Người dùng chỉ thấy các Assistant mà họ có quyền truy cập.

### Bước 8 — Lưu

Nhấn **Save**. Assistant xuất hiện trong danh sách và sẵn sàng sử dụng ngay.

---

## Sử Dụng AI Assistant

### Mở AI Chat

1. Nhấn **AI Chat** trên thanh điều hướng chính (menu trên cùng).
2. Danh sách các AI Assistant hiện ra ở sidebar trái — chỉ hiển thị Assistant bạn có quyền dùng.
3. Nhấn vào tên Assistant để bắt đầu cuộc trò chuyện mới.

### Giao Diện Chat

| Thành Phần | Chức Năng |
|-----------|-----------|
| **Khung chat** | Nhập câu hỏi bằng ngôn ngữ tự nhiên |
| **Tin nhắn chào** | Greeting Message đã cấu hình |
| **Kết quả** | Bảng dữ liệu hoặc biểu đồ |
| **View SQL** | Xem câu SQL được tạo ra |
| **Pin (📌)** | Ghim biểu đồ vào Dashboard |
| **Export** | Tải xuống CSV hoặc Excel |
| **Suggest** | Đề xuất câu hỏi mẫu để thêm vào Suggestions |

### Chế Độ Phân Tích

| Chế Độ | Mô Tả | Dùng Khi |
|--------|--------|---------|
| **Structured** | NL → SQL → Kết quả | Câu hỏi rõ ràng, cần số liệu cụ thể |
| **Agentic** | AI tự lên kế hoạch, chạy nhiều query, tổng hợp | Câu hỏi phức tạp đòi hỏi nhiều bước phân tích |

---

## Quản Lý AI Assistants

### Chỉnh Sửa Assistant

1. Vào **Studio → DSAI → AI Assistants** → nhấn vào tên Assistant.
2. Thay đổi bất kỳ thông tin nào.
3. Nhấn **Save**.

Thay đổi có hiệu lực ngay lập tức với cuộc trò chuyện mới. Cuộc trò chuyện đang diễn ra không bị ảnh hưởng.

### Vô Hiệu Hóa Tạm Thời

Tắt toggle **Active** để ẩn Assistant khỏi người dùng. Hữu ích khi đang cập nhật cấu hình hoặc Context đang bảo trì.

### Kiểm Tra Hiệu Năng

Xem lịch sử chat và phản hồi của người dùng trong **Admin → Audit Logs** để đánh giá chất lượng trả lời và cải thiện cấu hình.

---

## Các Câu Hỏi Thường Gặp

**Q: Có thể tạo bao nhiêu AI Assistant?**
Không giới hạn. Khuyến nghị tạo riêng cho từng bộ phận hoặc chức năng.

**Q: Người dùng có thể thấy Personality (system prompt) không?**
Không. Personality là cấu hình hệ thống, người dùng chỉ thấy kết quả phản hồi.

**Q: Thay đổi Context có ảnh hưởng đến chat đang mở không?**
Không ảnh hưởng cuộc chat hiện tại. Chỉ áp dụng cho cuộc chat mới.

**Q: Có thể dùng nhiều Context cho một Assistant không?**
Hiện tại mỗi Assistant dùng một Context. Để phục vụ nhiều nguồn dữ liệu, hãy gộp các Model vào một Context hoặc tạo nhiều Assistant riêng.
