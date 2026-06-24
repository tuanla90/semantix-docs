# Về Semantix

## Semantix là gì?

**Semantix** là nền tảng trí tuệ dữ liệu (data intelligence) được hỗ trợ bởi AI, cho phép mọi thành viên trong tổ chức — từ quản lý kinh doanh đến nhà phân tích dữ liệu — tự đặt câu hỏi bằng ngôn ngữ tự nhiên và nhận kết quả tức thì, không cần viết SQL hay biết lập trình.

Thay vì chỉ kết nối AI với raw database schema, Semantix xây dựng một **Semantic Layer** — tầng ngữ nghĩa trung gian — nơi các khái niệm nghiệp vụ ("doanh thu", "khách hàng active", "tỷ lệ chuyển đổi") được định nghĩa một lần, chuẩn hóa, và tái sử dụng xuyên suốt toàn tổ chức. AI được "căn chỉnh" vào ngữ nghĩa này — không phải vào tên cột kỹ thuật.

---

## Tại Sao Semantix Ra Đời?

### Vấn Đề Của BI Truyền Thống

Trong hầu hết các tổ chức, quy trình lấy dữ liệu trông giống như thế này:

```
Quản lý gửi yêu cầu
       ↓
Analyst nhận ticket → viết SQL → tạo báo cáo
       ↓
Kết quả được gửi lại — thường sau 1–3 ngày
       ↓
Quản lý có thêm câu hỏi → lặp lại vòng lặp
```

Mô hình này tạo ra **hai nút thắt cổ chai** không thể giải quyết bằng cách thuê thêm người:

**Nút thắt kỹ thuật** — Người dùng nghiệp vụ không biết SQL, không thể tự khai thác dữ liệu. Họ phụ thuộc hoàn toàn vào team data — vốn luôn bận rộn với nhiều yêu cầu khác nhau.

**Nút thắt ngữ nghĩa** — Ngay cả khi có AI trực tiếp viết SQL từ ngôn ngữ tự nhiên, AI vẫn không hiểu "doanh thu" trong tổ chức bạn cụ thể là gì: có bao gồm VAT không? Có trừ hoàn hàng không? Chỉ tính đơn đã thanh toán hay cả đơn pending? Mỗi công ty có định nghĩa riêng — và AI không thể tự suy ra từ tên cột `revenue_amount`.

### Cách Tiếp Cận Của Semantix

Semantix giải quyết cả hai nút thắt bằng một kiến trúc ba tầng:

```
┌─────────────────────────────────────────┐
│           Người Dùng                    │
│   (câu hỏi ngôn ngữ tự nhiên / UI)    │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│         Semantic Layer                  │
│  (Data Models, Metrics, Contexts)       │
│  Định nghĩa nghiệp vụ chuẩn hóa        │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│           Database / Data Source        │
│  (PostgreSQL, BigQuery, Snowflake...)   │
└─────────────────────────────────────────┘
```

Semantic Layer đóng vai trò "phiên dịch viên" hai chiều: dịch ngôn ngữ tự nhiên sang SQL chuẩn xác, và dịch kết quả kỹ thuật thành insight có ý nghĩa nghiệp vụ.

---

## Semantix Hoạt Động Như Thế Nào?

### Giai Đoạn 1 — Xây Dựng Semantic Layer (Một Lần)

Đây là giai đoạn cấu hình do Data Analyst hoặc BI Engineer thực hiện, thường mất **1–4 giờ** cho một domain nghiệp vụ điển hình.

```
Bước 1: Connection
→ Kết nối an toàn đến database (PostgreSQL, BigQuery, Snowflake, v.v.)
→ Thông tin đăng nhập được mã hóa AES-256

Bước 2: Data Models
→ Ánh xạ từng bảng database → khái niệm nghiệp vụ
→ Viết Label và Description cho từng bảng, cột
→ Định nghĩa Metrics (KPI): SUM(revenue), COUNT(orders)...
→ Khai báo Relations (JOIN) giữa các bảng

Bước 3: Semantic Context
→ Nhóm các Data Models liên quan vào một "phòng làm việc"
→ Giới hạn phạm vi dữ liệu theo phòng ban / use case
→ (Tùy chọn) Cấu hình Row-Level Security

Bước 4: AI Provider + AI Assistant
→ Gắn mô hình LLM (OpenAI, Anthropic, Gemini...)
→ Định nghĩa personality và ngôn ngữ giao tiếp
→ Gắn Context vào Assistant
```

### Giai Đoạn 2 — Sử Dụng Hàng Ngày

Người dùng cuối chỉ thấy giai đoạn này — một giao diện chat đơn giản:

```
Câu hỏi: "Tổng doanh thu tháng này theo khu vực?"
       ↓
AI đọc Semantic Context → hiểu "doanh thu" = SUM(revenue) WHERE status='paid'
       ↓
Tự động sinh SQL tối ưu
       ↓
Chạy trực tiếp trên database của bạn (dữ liệu không rời server)
       ↓
Trả về: bảng kết quả + biểu đồ phù hợp + gợi ý câu hỏi tiếp theo
```

Toàn bộ quá trình từ câu hỏi đến kết quả thường dưới **5 giây**.

---

## Các Khái Niệm Cốt Lõi

### Connection

**Connection** là cầu nối an toàn giữa Semantix và nguồn dữ liệu của bạn. Mỗi Connection lưu thông tin host, port, tên database, username/password — được mã hóa hoàn toàn và không bao giờ hiển thị lại sau khi Save.

**Các nguồn được hỗ trợ:**

| Loại | Nguồn |
|------|-------|
| **Relational DB** | PostgreSQL, MySQL, MariaDB, Amazon Redshift |
| **Data Warehouse** | BigQuery, Snowflake, ClickHouse |
| **Spreadsheet** | Google Sheets |
| **Khác** | Xem danh sách đầy đủ tại [Nguồn Dữ Liệu](connections/README.md) |

Một Workspace có thể có nhiều Connections — ví dụ: một Connection cho Production DB, một cho Data Warehouse.

→ [Hướng dẫn chi tiết: Connections](studio/connections.md)

---

### Data Model

**Data Model** là bản đồ ngữ nghĩa của một bảng dữ liệu. Đây là thành phần quan trọng nhất trong Semantic Layer.

Thay vì AI nhìn thấy:
```sql
SELECT rev_amt_vnd FROM ord_hdr WHERE ord_sts_cd = 'PD'
```

AI nhìn thấy:
> *"Bảng Đơn Hàng — mỗi dòng là một đơn hàng. Cột 'Doanh thu (VNĐ)' là tổng giá trị đơn hàng đã bao gồm phí giao hàng và đã trừ giảm giá. Chỉ tính đơn có trạng thái = 'paid' (đã thanh toán)."*

**Cấu trúc của một Data Model:**

```
Data Model
├── Thông tin chung: Name, Label, Description, Connection, Table
├── Columns          → danh sách cột với Label, Type, Description
├── Metrics          → KPI được tính toán (SUM, COUNT, AVG, ...)
├── Calculated Fields → trường tùy chỉnh bằng biểu thức SQL
└── Relations        → khai báo JOIN với Data Models khác
```

**Nguyên tắc vàng:** Description của cột và bảng là thứ AI đọc để hiểu nghiệp vụ. Đầu tư vào mô tả = đầu tư vào độ chính xác của AI.

→ [Hướng dẫn chi tiết: Data Models](studio/data-models.md)

---

### Metrics (Chỉ Số KPI)

**Metrics** là các phép đo nghiệp vụ được định nghĩa sẵn, gắn với một Data Model. Khi người dùng hỏi "tổng doanh thu", AI sẽ dùng đúng Metric đã định nghĩa — không tự suy đoán công thức tính.

**Ví dụ một số Metrics điển hình:**

| Metric | Loại | Công Thức |
|--------|------|-----------|
| Tổng doanh thu | SUM | `SUM(revenue)` |
| Số đơn hàng | COUNT_DISTINCT | `COUNT(DISTINCT order_id)` |
| Doanh thu trung bình / đơn | AVG | `AVG(revenue)` |
| Tỷ lệ đơn hủy | CUSTOM | `COUNT(cancelled) / COUNT(*) * 100` |
| Khách hàng duy nhất | COUNT_DISTINCT | `COUNT(DISTINCT customer_id)` |

Metrics có thể được tái sử dụng trong nhiều Semantic Contexts khác nhau.

→ [Hướng dẫn chi tiết: Metrics](studio/metrics.md)

---

### Calculated Fields (Trường Tính Toán)

**Calculated Fields** là các cột ảo được tính toán từ biểu thức SQL tùy chỉnh — không cần tạo cột mới trong database.

**Ví dụ:**
- `profit_margin` = `(revenue - cost) / revenue * 100`
- `order_age_days` = `DATEDIFF(NOW(), order_date)`
- `customer_tier` = `CASE WHEN lifetime_value > 10000000 THEN 'VIP' WHEN lifetime_value > 1000000 THEN 'Standard' ELSE 'Basic' END`

Calculated Fields có thể dùng như cột thông thường trong câu hỏi AI — "khách hàng VIP có doanh thu tháng này là bao nhiêu?"

→ [Hướng dẫn chi tiết: Calculated Fields](studio/calculated-fields.md)

---

### Relations (Quan Hệ)

**Relations** khai báo mối quan hệ JOIN giữa các Data Models. Khi người dùng hỏi "doanh thu theo từng danh mục sản phẩm", AI cần biết cách JOIN bảng Đơn hàng với bảng Sản phẩm — và Relations cung cấp thông tin đó.

**Các loại quan hệ:**

| Loại | Ý Nghĩa |
|------|---------|
| `many_to_one` | Nhiều đơn hàng thuộc một khách hàng |
| `one_to_many` | Một đơn hàng có nhiều dòng sản phẩm |
| `one_to_one` | Một user có một profile |

→ [Hướng dẫn chi tiết: Relations](studio/relations.md)

---

### Semantic Context

**Semantic Context** (gọi tắt: Context) là tập hợp các Data Models và Metrics được nhóm lại theo một phạm vi nghiệp vụ cụ thể. Đây là "phòng làm việc" mà mỗi AI Assistant hoạt động bên trong.

**Tại sao cần Context?**

Tổ chức của bạn có thể có hàng chục bảng dữ liệu — nhưng team Kinh doanh chỉ cần làm việc với Đơn hàng, Khách hàng, Sản phẩm. Team Marketing chỉ cần Campaign, Leads, Conversion. Context giúp mỗi AI Assistant chỉ "thấy" và trả lời trong phạm vi dữ liệu phù hợp với người dùng đó.

**Cấu hình Context:**
- Danh sách Data Models được phép truy vấn
- Danh sách Metrics được phép dùng
- Default Time Column (cho các câu hỏi "tháng này", "tuần trước")
- Row-Level Security (tùy chọn) — giới hạn dữ liệu theo từng user

→ [Hướng dẫn chi tiết: Semantic Contexts](studio/contexts.md)

---

### AI Provider

**AI Provider** là nhà cung cấp mô hình ngôn ngữ lớn (LLM) mà Semantix dùng để hiểu câu hỏi và sinh SQL. Semantix không lock-in vào một provider — bạn tự chọn và tự kiểm soát API key.

**Các provider được hỗ trợ:**

| Provider | Mô Hình Đề Xuất | Ghi Chú |
|----------|----------------|---------|
| **OpenAI** | GPT-4o | Hiệu suất tốt nhất, chi phí vừa |
| **Anthropic** | Claude Sonnet | Đặc biệt tốt với dữ liệu phức tạp |
| **Google** | Gemini 1.5 Pro | Tích hợp tốt với BigQuery |
| **DeepSeek** | DeepSeek-V3 | Chi phí thấp, mã nguồn mở |
| **Ollama** | Llama 3, Mistral | Self-hosted, không gửi data ra ngoài |

Bạn có thể cấu hình nhiều AI Providers và gán khác nhau cho mỗi AI Assistant.

→ [Hướng dẫn chi tiết: AI Providers](studio/ai-providers.md)

---

### AI Assistant

**AI Assistant** là giao diện hội thoại mà người dùng cuối tương tác. Mỗi Assistant là sự kết hợp của:

```
AI Assistant = Semantic Context + AI Provider/Model + Personality + Language
```

**Một tổ chức thường tạo nhiều AI Assistants:**

| Assistant | Context | Dành Cho |
|-----------|---------|----------|
| Trợ lý Kinh doanh | `sales` | Phòng Sales & Marketing |
| Trợ lý Vận hành | `operations` | Phòng Ops & Logistics |
| Trợ lý Tài chính | `finance` | Phòng Kế toán |
| Phân tích Chiến lược | `executive` | Ban Lãnh đạo |

**Personality (System Prompt)** cho phép định hướng cách AI trả lời: ngôn ngữ, phong cách trình bày, loại biểu đồ ưu tiên, đơn vị tiền tệ, v.v.

→ [Hướng dẫn chi tiết: AI Assistants](studio/ai-assistants.md)

---

### Knowledge Base

**Knowledge Base** cho phép AI tham chiếu tài liệu nội bộ khi trả lời — PDF, Word, văn bản, wiki — giúp AI hiểu thuật ngữ, chính sách, và quy trình đặc thù của tổ chức bạn.

**Ví dụ ứng dụng:**
- Tải lên "Chính sách phân loại khách hàng VIP" → AI hiểu đúng tiêu chí khi được hỏi về khách hàng VIP
- Tải lên "Glossary thuật ngữ ngành" → AI không nhầm lẫn giữa "churn" trong nghĩa của công ty bạn và nghĩa chung

→ [Hướng dẫn chi tiết: Knowledge Bases](studio/knowledge-bases.md)

---

### Data Portal

**Data Portal** là cổng dữ liệu tự phục vụ dành cho người dùng cuối không cần kỹ thuật. Thay vì chat với AI, họ chọn một **Data Template** (mẫu báo cáo được định nghĩa sẵn), điền tham số lọc (ngày, khu vực, sản phẩm...), và xuất dữ liệu — không cần biết SQL hay cách dùng AI.

**Phù hợp cho:**
- Nhân viên kinh doanh cần báo cáo doanh số hàng tuần
- Kế toán cần xuất công nợ theo khách hàng
- Nhân sự cần báo cáo chấm công theo tháng

→ [Hướng dẫn chi tiết: Data Portal](data-portal/README.md)

---

### Data Pipelines

**Data Pipelines** tự động hóa việc đồng bộ dữ liệu theo lịch giữa các nguồn và đích. Bạn không cần viết code ETL — chỉ cần cấu hình nguồn, đích, lịch chạy, và Semantix xử lý phần còn lại.

**Ứng dụng phổ biến:**
- Đồng bộ dữ liệu từ nhiều chi nhánh về một Data Warehouse trung tâm
- Export kết quả phân tích vào Google Sheets hàng ngày
- Replication dữ liệu production sang môi trường analytics (read-only)

→ [Hướng dẫn chi tiết: Data Pipelines](studio/pipelines.md)

---

### Dashboards

**Dashboards** là bộ sưu tập các widget (biểu đồ, scorecard, bảng, text) được sắp xếp trực quan. Người dùng có thể tạo Dashboard bằng cách:
- Ghim kết quả từ AI Chat (nhanh nhất)
- Kéo thả widget trong Dashboard Editor
- Nhúng vào ứng dụng ngoài qua Embed Token

→ [Hướng dẫn chi tiết: Dashboards](dashboards/README.md)

---

## Kiến Trúc Bảo Mật

Semantix được thiết kế với nguyên tắc **"dữ liệu không rời hạ tầng của bạn"**:

| Nguyên Tắc | Chi Tiết |
|-----------|---------|
| **Query tại nguồn** | Semantix sinh SQL và gửi đến database của bạn — kết quả trả về trực tiếp cho người dùng, không được lưu trữ trên Semantix |
| **Mã hóa credentials** | Thông tin kết nối database được mã hóa AES-256 trước khi lưu |
| **Row-Level Security** | Attributes & Contexts giới hạn dữ liệu từng user được phép xem |
| **SSO Enterprise** | Hỗ trợ SAML 2.0 và OIDC — tích hợp với Okta, Azure AD, Google Workspace |
| **Audit Logs** | Toàn bộ câu hỏi, SQL sinh ra, và kết quả được ghi log để kiểm soát |
| **Self-hosted** | Triển khai hoàn toàn trong hạ tầng nội bộ — không chia sẻ dữ liệu với bên thứ ba |
| **API Key scoping** | Mỗi API Key được giới hạn quyền (read-only, specific context) |

→ [Hướng dẫn chi tiết: Kiến Trúc & Bảo Mật](admin/security.md)

---

## Semantix Dành Cho Ai?

| Vai Trò | Cách Dùng Chính | Tính Năng Hay Dùng |
|---------|----------------|-------------------|
| **Quản lý / Lãnh đạo** | Hỏi số liệu bằng tiếng Việt, không cần team data | AI Chat, Dashboard |
| **Business Analyst** | Xây dựng Data Models, giải phóng thời gian khỏi báo cáo lặp | Studio, Data Templates |
| **Data Engineer** | Quản lý kết nối, pipeline, engine templates | Connections, Pipelines |
| **Data Scientist** | Phân tích Cohort, RFM, Funnel tích hợp sẵn | AI Chat Advanced |
| **Developer** | Nhúng dashboard, truy vấn dữ liệu qua API | API Reference, Embed |
| **Nhân viên cuối** | Xuất báo cáo theo mẫu không cần kỹ thuật | Data Portal |

---

## So Sánh Với Các Giải Pháp Khác

| | Semantix | BI Tool Truyền Thống | AI-to-SQL Đơn Thuần |
|--|---------|---------------------|-------------------|
| Người dùng cuối tự hỏi | ✅ | ❌ Cần qua analyst | ⚠️ Kết quả thiếu nhất quán |
| Định nghĩa nghiệp vụ chuẩn hóa | ✅ Semantic Layer | ⚠️ Scattered trong report | ❌ Không có |
| Kết quả nhất quán cho mọi người | ✅ | ⚠️ Tùy analyst | ❌ Mỗi lần khác nhau |
| Self-hosted / Dữ liệu tại chỗ | ✅ | ✅ | ⚠️ Tùy vendor |
| Phân tích nâng cao tích hợp | ✅ Cohort, RFM, Funnel | ⚠️ Cần cấu hình | ❌ |
| Cấu hình ban đầu | Vừa (1–4 giờ/domain) | Cao (tuần–tháng) | Thấp nhưng kém chính xác |

---

## Triết Lý Sản Phẩm

**"Định nghĩa một lần, dùng mãi mãi."**

Semantix tin rằng vấn đề cốt lõi của dữ liệu trong tổ chức không phải là thiếu dữ liệu, mà là thiếu một nơi để định nghĩa nghiệp vụ một cách nhất quán. Mỗi lần analyst viết một câu SQL mới, họ đang tái tạo lại định nghĩa nghiệp vụ — và không có gì đảm bảo định nghĩa đó giống với câu SQL analyst khác viết tuần trước.

Semantic Layer giải quyết điều đó: khi "doanh thu" được định nghĩa một lần trong Data Model, mọi câu hỏi từ mọi người dùng — qua AI Chat, Dashboard, hay API — đều dùng đúng định nghĩa đó.

---

## Bước Tiếp Theo

- **Bắt đầu ngay** → [Tổng Quan Bắt Đầu](getting-started/index.md)
- **Dùng thử miễn phí** → [Free Trial với Google Sheets](free-trial/README.md)
- **Đi thẳng vào cài đặt** → [Bắt Đầu Nhanh — 7 Bước](getting-started/quick-start.md)
- **Tìm hiểu bảo mật** → [Kiến Trúc & Bảo Mật](admin/security.md)
