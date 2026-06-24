# Bắt Đầu Nhanh

Hướng dẫn này đưa bạn từ màn hình trống đến trạng thái có thể đặt câu hỏi bằng tiếng Việt và nhận biểu đồ trong vòng **10–15 phút**. Mỗi bước được mô tả chi tiết để bạn không bị bỏ lỡ bất kỳ thao tác nào.

---

## Bước 1 — Kết Nối Nguồn Dữ Liệu

Semantix cần biết dữ liệu của bạn nằm ở đâu. Bước này tạo một **Connection** — tức là thông tin đăng nhập và địa chỉ kết nối vào database hoặc file của bạn.

### 1.1 Mở giao diện tạo Connection

1. Đăng nhập vào Semantix.
2. Trên thanh điều hướng trái, chọn **Studio**.
3. Trong phần **DE (Data Engineering)**, nhấn **Connections**.
4. Nhấn nút **New Connection** ở góc trên bên phải.

### 1.2 Chọn loại database

Một danh sách loại nguồn dữ liệu sẽ hiện ra. Chọn loại phù hợp với hệ thống của bạn:

| Loại Database | Khi nào dùng |
|---------------|-------------|
| **PostgreSQL** | Database PostgreSQL hoặc Amazon Redshift |
| **MySQL** | Database MySQL hoặc MariaDB |
| **BigQuery** | Google BigQuery data warehouse |
| **Snowflake** | Snowflake cloud data warehouse |
| **ClickHouse** | ClickHouse analytics database |
| **Google Sheets** | File bảng tính Google Sheets (phù hợp gói Free) |

### 1.3 Điền thông tin kết nối

Tùy theo loại database, bạn sẽ thấy các trường sau:

**Với PostgreSQL / MySQL:**

| Trường | Ví Dụ | Ghi Chú |
|--------|--------|---------|
| Name | `Production DB` | Tên hiển thị trong Semantix |
| Host | `db.company.com` | Địa chỉ server database |
| Port | `5432` (PostgreSQL) / `3306` (MySQL) | Cổng kết nối |
| Database | `analytics` | Tên database cụ thể |
| Username | `semantix_user` | Tài khoản đọc dữ liệu |
| Password | `••••••••` | Mật khẩu (được mã hóa khi lưu) |
| SSL | Bật nếu server yêu cầu | Khuyến nghị bật trên môi trường production |

**Với Google Sheets:**

1. Chia sẻ file Google Sheets với địa chỉ service account:
   ```
   semantix@gen-lang-client-0852507499.iam.gserviceaccount.com
   ```
   Mở file → nhấn **Share** → dán địa chỉ trên → quyền **Viewer** → **Send**.
2. Lấy **Spreadsheet ID** từ URL:
   ```
   https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
   ```
3. Điền Spreadsheet ID và tên Sheet (tab) vào form.

### 1.4 Kiểm tra và lưu

1. Nhấn **Test Connection** — Semantix sẽ thử kết nối và thông báo thành công hay lỗi.
2. Nếu thành công, nhấn **Save**. Connection xuất hiện trong danh sách.

> **Bảo mật:** Semantix mã hóa toàn bộ thông tin đăng nhập. Mật khẩu không bao giờ được lưu dạng plain text và không bao giờ hiển thị lại sau khi Save.

---

## Bước 2 — Tạo Data Model

Data Model là "bản đồ" giúp AI hiểu ý nghĩa nghiệp vụ của các bảng dữ liệu. Bước này quan trọng nhất — đầu tư mô tả càng chi tiết, AI trả lời càng chính xác.

### 2.1 Tạo Model mới

1. Trong Studio, chọn **DABI → Data Models → New Model**.
2. Ở bước đầu, chọn **Connection** vừa tạo và chọn **Bảng (Table)** cần dùng.
3. Nhấn **Import** để Semantix tự động tải danh sách cột từ database.

### 2.2 Điền thông tin cơ bản

| Trường | Ví Dụ | Ghi Chú |
|--------|--------|---------|
| **Name** | `don_hang` | Tên kỹ thuật, không dấu, không khoảng trắng |
| **Label** | `Đơn hàng bán` | Tên hiển thị thân thiện — AI và người dùng thấy tên này |
| **Description** | `Bảng lưu toàn bộ đơn hàng từ website và cửa hàng, mỗi dòng là một đơn hàng` | AI đọc mô tả này để hiểu khi nào nên dùng bảng |

### 2.3 Cấu hình cột (tab Columns)

Với mỗi cột quan trọng, hãy điền đầy đủ:

| Thuộc tính | Ý nghĩa | Mẹo |
|------------|---------|-----|
| **Label** | Tên hiển thị bằng tiếng Việt | Ví dụ: "Ngày đặt hàng", "Tổng tiền" |
| **Data Type** | `TEXT`, `INTEGER`, `DOUBLE`, `DATE`, `DATETIME` | Chọn đúng type giúp AI hiểu phép toán nào áp dụng được |
| **Description** | Mô tả ý nghĩa và đặc điểm của cột | Càng chi tiết càng tốt |
| **Primary Key** | Đánh dấu nếu là khóa chính | Giúp AI hiểu cách đếm bản ghi duy nhất |
| **Searchable** | Cho phép AI lọc theo cột này | Bật cho các cột thường dùng làm điều kiện lọc |

**Ví dụ mô tả cột tốt:**
- Cột `status`: *"Trạng thái đơn hàng: 'pending' = chờ xử lý, 'paid' = đã thanh toán, 'cancelled' = đã hủy. Chỉ tính doanh thu cho đơn có status = 'paid'."*
- Cột `revenue`: *"Tổng giá trị đơn hàng bao gồm phí ship, đã trừ giảm giá. Đơn vị: VNĐ."*

### 2.4 Định nghĩa Metrics (chỉ số KPI)

Chuyển sang tab **Metrics** → nhấn **New Metric**:

| Metric cần tạo | Aggregation | Column |
|----------------|-------------|--------|
| Tổng doanh thu | SUM | revenue |
| Số đơn hàng | COUNT_DISTINCT | order_id |
| Doanh thu TB/đơn | AVG | revenue |
| Khách hàng duy nhất | COUNT_DISTINCT | customer_id |

Xem hướng dẫn chi tiết tại [Metrics](../studio/metrics.md).

### 2.5 Khai báo Relations (nếu cần JOIN)

Nếu bạn có nhiều bảng cần kết hợp (ví dụ: đơn hàng + khách hàng), hãy chuyển sang tab **Relations** và khai báo. Xem [Relations](../studio/relations.md).

### 2.6 Lưu Model

Nhấn **Save**. Model xuất hiện trong danh sách Data Models.

---

## Bước 3 — Tạo Semantic Context

Context là "phòng làm việc" nhóm các Model liên quan lại với nhau và cho AI biết phạm vi dữ liệu nào được phép truy vấn.

### 3.1 Tạo Context mới

1. Vào **Studio → DABI → Semantic Contexts → New Context**.
2. Điền thông tin:

| Trường | Ví Dụ |
|--------|--------|
| **Name** | `sales_analysis` |
| **Label** | `Phân tích Bán hàng` |
| **Description** | `Dữ liệu đơn hàng và khách hàng dùng cho phòng Kinh doanh. Bao gồm doanh thu, số lượng đơn, phân tích theo khu vực và sản phẩm.` |

### 3.2 Thêm Models và Metrics

- Tab **Models**: Chọn các Model liên quan (ví dụ: `don_hang`, `khach_hang`, `san_pham`).
- Tab **Metrics**: Chọn các Metric người dùng được phép dùng trong Context này.
- **Default Time Column**: Chọn cột ngày mặc định (ví dụ: `order_date`) để AI hiểu "tháng này", "tuần trước" mà không cần người dùng chỉ rõ.

### 3.3 Lưu Context

Nhấn **Save**.

---

## Bước 4 — Cấu Hình AI Provider & AI Assistant

### 4.1 Thêm AI Provider

AI Provider cung cấp "bộ não" — mô hình ngôn ngữ lớn (LLM) để hiểu câu hỏi của người dùng.

1. Vào **Studio → DSAI → AI Providers → New Provider**.
2. Điền thông tin:

| Trường | Ví Dụ |
|--------|--------|
| **Name** | `OpenAI Production` |
| **Provider** | OpenAI |
| **API Key** | `sk-...` (lấy từ platform.openai.com) |
| **Capabilities** | Chọn `LLM` và `Embedding` |
| **Default LLM** | Bật — dùng làm mặc định cho AI Chat |

3. Nhấn **Save**.

**Các Provider được hỗ trợ:** OpenAI (GPT-4o, GPT-4), Anthropic (Claude Sonnet, Opus), Google Gemini, DeepSeek, Ollama (self-hosted).

### 4.2 Tạo AI Assistant

1. Vào **Studio → DSAI → AI Assistants → New Assistant**.
2. Điền thông tin:

| Trường | Ví Dụ |
|--------|--------|
| **Name** | `Trợ lý Kinh doanh` |
| **Context** | Chọn Context vừa tạo (`sales_analysis`) |
| **AI Provider** | Chọn Provider vừa thêm |
| **Model** | `gpt-4o` hoặc `gpt-4-turbo` |
| **Language** | `vi` (tiếng Việt) |
| **Greeting Message** | `Xin chào! Tôi có thể giúp bạn phân tích dữ liệu kinh doanh. Hãy hỏi tôi bất cứ điều gì!` |

3. **Personality (system prompt)** — định hướng cách AI trả lời:
   ```
   Bạn là trợ lý phân tích kinh doanh của công ty. Trả lời bằng tiếng Việt, 
   ngắn gọn và chuyên nghiệp. Luôn trình bày số liệu dạng bảng hoặc biểu đồ. 
   Đơn vị tiền tệ là VNĐ. Khi không chắc, hãy hỏi lại người dùng.
   ```
4. Nhấn **Save**.

---

## Bước 5 — Bắt Đầu Phân Tích AI Chat

1. Nhấn vào **AI Chat** trên thanh điều hướng chính (menu trên cùng).
2. Chọn AI Assistant vừa tạo từ danh sách bên trái.
3. Đặt câu hỏi bằng tiếng Việt tự nhiên, ví dụ:

```
Tổng doanh thu tháng này theo từng sản phẩm
Top 10 khách hàng doanh thu cao nhất quý vừa rồi
So sánh doanh thu tháng 5 và tháng 6 năm nay
Tỷ lệ đơn hủy theo khu vực trong 30 ngày qua
```

4. Semantix sẽ:
   - Hiểu ý định câu hỏi
   - Tự động sinh SQL và chạy trên database của bạn
   - Trả về kết quả kèm biểu đồ phù hợp

5. Bạn có thể nhấn **View SQL** để xem câu truy vấn đã được tạo ra.
6. Nhấn **biểu tượng ghim (📌)** để lưu biểu đồ vào Dashboard.

---

## Bước 6 — Tạo Dashboard (Tùy Chọn)

Dashboard giúp bạn lưu và theo dõi các số liệu quan trọng hàng ngày.

1. Nhấn **Dashboards** trên thanh điều hướng.
2. Nhấn **New Dashboard** → đặt tên → **Create**.
3. Thêm widget bằng cách:
   - Ghim kết quả từ AI Chat (cách nhanh nhất), hoặc
   - Nhấn **Add Widget** trong Dashboard Editor và tự cấu hình.
4. Kéo thả để sắp xếp lại các widget theo ý muốn.
5. Nhấn **Save**.

---

## Bước 7 — Khám Phá Thêm (Tùy Chọn)

| Tính Năng | Mô Tả | Hướng Dẫn |
|-----------|--------|-----------|
| **Data Portal** | Cho phép người dùng cuối xuất báo cáo theo mẫu không cần SQL | [Xem →](../data-portal/README.md) |
| **Notifications** | Gửi cảnh báo qua Telegram, Zalo, Teams khi số liệu vượt ngưỡng | [Xem →](../notifications/README.md) |
| **Row-Level Security** | Phân quyền theo dòng dữ liệu — mỗi user chỉ thấy dữ liệu của mình | [Xem →](../contexts/rls.md) |
| **Data Pipelines** | Tự động đồng bộ dữ liệu theo lịch | [Xem →](../studio/pipelines.md) |
| **Knowledge Bases** | Cho AI đọc tài liệu nội bộ (PDF, Word) | [Xem →](../studio/knowledge-bases.md) |

---

## Câu Hỏi Thường Gặp Khi Bắt Đầu

**Q: AI trả lời sai hoặc không liên quan?**
→ Kiểm tra lại Description của các cột và Metrics. Description càng rõ ràng, AI càng chính xác.

**Q: Kết nối database bị lỗi?**
→ Kiểm tra firewall — cho phép IP của Semantix kết nối vào database. Liên hệ team của bạn để whitelist IP.

**Q: Không thấy bảng nào khi tạo Data Model?**
→ Kiểm tra user database có quyền `SELECT` trên các bảng cần dùng không.

**Q: AI không hiểu câu hỏi tiếng Việt có dấu?**
→ Đảm bảo Language trong AI Assistant được đặt là `vi`. Thêm các từ đồng nghĩa vào Metrics và Columns.
