# Bắt Đầu Với Semantix

Trang này giúp bạn chọn đúng lộ trình phù hợp với mục tiêu và bối cảnh của mình — thay vì đọc toàn bộ tài liệu theo thứ tự, hãy bắt đầu từ con đường phù hợp nhất với bạn.

---

## Chọn Lộ Trình Của Bạn

### Tôi muốn dùng thử nhanh, không cần cài đặt

Nếu bạn chỉ muốn trải nghiệm Semantix mà chưa có database — hoặc chỉ muốn xem nó hoạt động như thế nào — hãy bắt đầu với **Google Sheets trong 10 phút**:

> **→ [Free Trial: Kết Nối Google Sheets & Chat Với Dữ Liệu](../free-trial/README.md)**

Bạn sẽ học được:
- Kết nối Google Sheets vào Semantix (không cần cài đặt phức tạp)
- Tạo Data Model cơ bản
- Đặt câu hỏi bằng tiếng Việt và nhận biểu đồ
- Tạo Dashboard đầu tiên

Phù hợp cho: người dùng đang đánh giá (evaluation), demo nội bộ, hoặc team nhỏ dùng Google Sheets.

---

### Tôi đã có database và muốn thiết lập production

Nếu bạn đã có PostgreSQL, MySQL, BigQuery, Snowflake hoặc ClickHouse và muốn đi thẳng vào cài đặt thực tế:

> **→ [Bắt Đầu Nhanh — Từ Zero Đến AI Chat](quick-start.md)**

Hướng dẫn 7 bước, ước tính **15–30 phút** cho một domain nghiệp vụ điển hình:

| Bước | Mục Tiêu | Thời Gian |
|------|----------|-----------|
| 1. Connection | Kết nối an toàn vào database | 5 phút |
| 2. Data Model | Ánh xạ bảng → khái niệm nghiệp vụ | 15–30 phút |
| 3. Semantic Context | Nhóm Models theo phạm vi | 5 phút |
| 4. AI Provider | Gắn mô hình LLM | 5 phút |
| 5. AI Assistant | Cấu hình giao diện AI | 5 phút |
| 6. AI Chat | Đặt câu hỏi đầu tiên | Ngay lập tức |
| 7. Dashboard | Ghim và chia sẻ kết quả | 5 phút |

---

### Tôi muốn hiểu kiến trúc trước khi bắt đầu

> **→ [Về Semantix — Kiến Trúc, Cách Hoạt Động & Khái Niệm Cốt Lõi](../about.md)**

Phù hợp cho: architect, tech lead, hoặc bất kỳ ai muốn hiểu "tại sao" và "như thế nào" trước khi nhảy vào cấu hình.

---

### Tôi cần kiểm tra yêu cầu kỹ thuật để triển khai self-hosted

> **→ [Yêu Cầu Hệ Thống](requirements.md)**

---

## Lộ Trình Học Theo Vai Trò

### Data Analyst / BI Engineer

Người xây dựng và duy trì Semantic Layer — đây là vai trò quan trọng nhất để Semantix hoạt động hiệu quả.

```
1. Đọc "Về Semantix" để nắm vững khái niệm cốt lõi
        ↓
2. Làm Bắt Đầu Nhanh (toàn bộ 7 bước)
        ↓
3. Đọc sâu từng thành phần:
   - Data Models: labels, descriptions, column types
   - Calculated Fields: biểu thức SQL tùy chỉnh
   - Metrics: định nghĩa KPI chuẩn hóa
   - Relations: khai báo JOIN giữa các bảng
        ↓
4. Thiết lập Semantic Contexts cho từng phòng ban
   (+ Row-Level Security nếu cần phân quyền dữ liệu)
        ↓
5. Tạo AI Assistants cho từng nhóm người dùng
        ↓
6. Đọc: Tối Ưu Hóa AI & Best Practices
```

**Tài liệu ưu tiên:**
[Data Models](../studio/data-models.md) · [Calculated Fields](../studio/calculated-fields.md) · [Metrics](../studio/metrics.md) · [Relations](../studio/relations.md) · [Contexts](../studio/contexts.md) · [AI Best Practices](../deep-dives/ai-best-practices.md)

---

### Data Engineer / DevOps

Người quản lý hạ tầng dữ liệu, kết nối, và pipeline.

```
1. Kiểm tra Yêu Cầu Hệ Thống và thiết lập môi trường
        ↓
2. Cấu hình các Connections (production, staging, warehouse)
        ↓
3. Thiết lập Engine Templates (nếu dùng template chuẩn)
        ↓
4. Cấu hình Data Pipelines (đồng bộ dữ liệu theo lịch)
        ↓
5. Cấu hình Admin:
   - SSO (SAML/OIDC)
   - Caching & Performance
   - Platform Integrations (Telegram, Teams, Zalo)
        ↓
6. Thiết lập Audit Logs và monitoring
```

**Tài liệu ưu tiên:**
[Requirements](requirements.md) · [Connections](../studio/connections.md) · [Data Pipelines](../studio/pipelines.md) · [SSO](../admin/sso.md) · [Security](../admin/security.md) · [Caching](../admin/caching.md)

---

### Quản Lý / Người Dùng Cuối

Người sử dụng kết quả — không cần cấu hình, chỉ cần đặt câu hỏi.

```
1. Đăng nhập và chọn AI Assistant phù hợp với phòng ban
        ↓
2. Đặt câu hỏi bằng tiếng Việt tự nhiên:
   "Doanh thu tháng này theo khu vực là bao nhiêu?"
   "So sánh hiệu suất quý 1 và quý 2 năm nay"
        ↓
3. Xem kết quả, nhấn "View SQL" nếu muốn kiểm tra
        ↓
4. Ghim biểu đồ vào Dashboard yêu thích
        ↓
5. (Tùy chọn) Dùng Data Portal để xuất báo cáo theo mẫu
        ↓
6. Đặt cảnh báo: nhận thông báo qua Telegram/Teams khi số liệu vượt ngưỡng
```

**Tài liệu ưu tiên:**
[AI Chat](../ai-chat/README.md) · [Data Portal](../data-portal/README.md) · [Dashboards](../dashboards/README.md) · [Notifications](../notifications/README.md)

---

### Developer / Integrator

Người tích hợp Semantix vào ứng dụng hoặc hệ thống bên ngoài.

```
1. Tạo API Key tại Admin → API Keys
        ↓
2. Đọc tài liệu API Reference
        ↓
3. Dùng Query Endpoint để truy vấn dữ liệu theo chương trình
        ↓
4. Nhúng Dashboard vào ứng dụng bằng Embed Token
        ↓
5. (Tùy chọn) Gọi Dashboards Endpoint để lấy danh sách/dữ liệu
```

**Tài liệu ưu tiên:**
[API Reference](../api-reference/README.md) · [Query Endpoint](../api-reference/query.md) · [Embed Token](../api-reference/embed-token.md) · [API Keys](../admin/api-keys.md)

---

## Checklist Trước Khi Bắt Đầu

Trước khi cấu hình Semantix với database thực, hãy chuẩn bị:

### Phía Database
- [ ] Đã có database với dữ liệu thực tế (hoặc dữ liệu test)
- [ ] Đã tạo user database với quyền `SELECT` trên các bảng cần dùng
- [ ] Đã whitelist IP của Semantix trong firewall (nếu cần)
- [ ] Biết host, port, tên database, username, password

### Phía AI Provider
- [ ] Đã có tài khoản và API key từ ít nhất một provider:
  - OpenAI: [platform.openai.com](https://platform.openai.com)
  - Anthropic: [console.anthropic.com](https://console.anthropic.com)
  - Google AI: [aistudio.google.com](https://aistudio.google.com)
  - Hoặc tự host Ollama (không cần API key bên ngoài)
- [ ] API key còn credit/quota để sử dụng

### Phía Dữ Liệu
- [ ] Đã xác định domain nghiệp vụ cần phân tích trước (ví dụ: sales, marketing, operations)
- [ ] Biết các bảng chính trong domain đó
- [ ] Biết các KPI / chỉ số quan trọng cần đo lường

---

## Câu Hỏi Thường Gặp Khi Mới Bắt Đầu

**Tôi cần biết SQL không?**
Không cần để sử dụng AI Chat. Nhưng để xây dựng Data Models và Calculated Fields tốt hơn, biết SQL cơ bản sẽ giúp ích.

**Mất bao lâu để thiết lập xong?**
Một domain nghiệp vụ điển hình (3–5 bảng, 10–20 cột quan trọng) mất khoảng **2–4 giờ** để cấu hình đầy đủ lần đầu. Sau đó, thêm bảng mới hoặc chỉnh sửa mất khoảng 15–30 phút.

**Dữ liệu của tôi có được gửi ra ngoài không?**
Không. Semantix chạy query trực tiếp trên database của bạn. Dữ liệu thực không bao giờ được lưu trên server Semantix. Chỉ có câu hỏi bạn gõ và SQL được sinh ra được gửi đến AI Provider để xử lý.

**Tôi có thể dùng nhiều AI Provider cùng lúc không?**
Có. Bạn có thể cấu hình nhiều Providers (ví dụ: OpenAI cho AI Chat thông thường, Anthropic cho phân tích phức tạp) và gán mỗi AI Assistant với một Provider khác nhau.

**AI trả lời sai thì phải làm gì?**
Trong 90% trường hợp, nguyên nhân là Description của cột hoặc bảng chưa đủ rõ. Hãy đọc [Tối Ưu Hóa AI & Best Practices](../deep-dives/ai-best-practices.md) để biết cách viết mô tả hiệu quả.

**Semantix hỗ trợ ngôn ngữ nào?**
AI Chat hỗ trợ bất kỳ ngôn ngữ nào mà LLM bạn chọn hỗ trợ. Giao diện ứng dụng hiện có tiếng Anh và tiếng Việt.

---

## Tài Nguyên Hỗ Trợ

| Tài Nguyên | Mô Tả |
|-----------|--------|
| [Câu Hỏi Thường Gặp (FAQ)](../support/faqs.md) | Giải đáp các vấn đề phổ biến |
| [Tối Ưu Hóa AI & Best Practices](../deep-dives/ai-best-practices.md) | Cách viết Data Model để AI chính xác hơn |
| [Row-Level Security](../contexts/rls.md) | Phân quyền dữ liệu theo từng user |
| [Kiến Trúc & Bảo Mật](../admin/security.md) | Thông tin cho team IT / Security |
| [Tài Liệu API](../api-reference/README.md) | Tích hợp với ứng dụng bên ngoài |

---

> **Mẹo quan trọng nhất:** Chất lượng của AI phụ thuộc trực tiếp vào chất lượng mô tả (Description) trong Data Models. Đừng bỏ qua bước này — 15 phút đầu tư vào mô tả sẽ tiết kiệm hàng giờ chỉnh sửa sau này.
