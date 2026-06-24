# Data Models (Mô Hình Dữ Liệu)

**Điều hướng:** Studio → DABI → Data Models

Data Model là lớp dịch nghĩa (semantic layer) chuyển đổi cấu trúc vật lý của database (tên cột kỹ thuật, kiểu dữ liệu thô) sang ngôn ngữ nghiệp vụ mà AI và người dùng có thể hiểu. Mỗi Model thường tương ứng với một bảng hoặc view trong database.

**Ví dụ:** Bảng `ord_tbl` trong database sẽ được map thành Model "Đơn hàng bán" với các cột `cust_id` → "Mã khách hàng", `rev_usd` → "Doanh thu (VNĐ)"...

---

## Tại Sao Data Model Quan Trọng?

AI không đọc trực tiếp database của bạn. Thay vào đó, AI đọc **Data Model** để hiểu:
- Bảng này chứa dữ liệu gì?
- Cột `status` có các giá trị nào? Mỗi giá trị nghĩa là gì?
- "Doanh thu" được tính từ cột nào? Có bao gồm đơn hủy không?

Đầu tư mô tả kỹ lưỡng trong Data Model → AI trả lời chính xác và ít cần chỉnh sửa câu hỏi.

---

## Danh Sách Data Models

Trang **Studio → DABI → Data Models** hiển thị tất cả models với:
- **Tên và Label** của model
- **Connection** (nguồn dữ liệu)
- **Số Columns / Metrics / Relations**
- **Contexts** đang dùng model này
- **Trạng thái** (Active / Inactive)
- **Phiên bản** (Version) và người chỉnh sửa gần nhất

Dùng ô **Search** và bộ lọc **Connection** để tìm nhanh.

---

## Tạo Model Mới

### Bước 1 — Khởi Tạo

1. Nhấn **New Model** ở góc trên bên phải.
2. Cửa sổ chọn nguồn hiện ra:
   - Chọn **Connection** (database đã kết nối)
   - Chọn **Schema** (nếu database có nhiều schema)
   - Chọn **Table** hoặc **View** cần map
3. Nhấn **Import** — Semantix tự động tải danh sách cột và kiểu dữ liệu từ database.

### Bước 2 — Thông Tin Cơ Bản (Tab Overview)

| Thuộc tính | Bắt Buộc | Ví Dụ | Quy Tắc |
|------------|----------|--------|---------|
| **Name** | Có | `don_hang` | Chỉ chữ thường, gạch dưới, không dấu, không khoảng trắng. Đây là ID kỹ thuật. |
| **Label** | Có | `Đơn hàng bán` | Tên thân thiện — AI và người dùng thấy tên này trong giao diện chat |
| **Description** | Khuyến nghị | (xem ví dụ bên dưới) | AI đọc description để hiểu khi nào nên dùng bảng này |
| **Active** | — | Bật | Tắt để ẩn khỏi AI chat nhưng không xóa |

**Ví dụ Description chất lượng cao:**
```
Bảng lưu toàn bộ đơn hàng phát sinh từ website thương mại điện tử và 
cửa hàng vật lý. Mỗi dòng là một đơn hàng. Chỉ tính doanh thu cho đơn 
có status = 'paid'. Đơn hủy (status = 'cancelled') không được tính vào 
doanh thu. Đơn vị tiền tệ: VNĐ. Dữ liệu cập nhật theo thời gian thực.
```

### Bước 3 — Cấu Hình Cột (Tab Columns)

Đây là bước quan trọng nhất. Mỗi cột có các thuộc tính:

#### Thuộc Tính Bắt Buộc

| Thuộc Tính | Mô Tả | Ví Dụ |
|------------|--------|--------|
| **Label** | Tên hiển thị, có thể tiếng Việt có dấu | `Ngày đặt hàng`, `Mã khách hàng` |
| **Data Type** | Kiểu dữ liệu (xem bảng bên dưới) | `DATE`, `INTEGER`, `TEXT` |

#### Thuộc Tính Khuyến Nghị

| Thuộc Tính | Mô Tả | Tại Sao Quan Trọng |
|------------|--------|-------------------|
| **Description** | Mô tả ý nghĩa cột, đặc điểm, các giá trị có thể có | AI dùng để match câu hỏi đúng cột |
| **Searchable** | Cho phép AI dùng cột này làm điều kiện lọc (WHERE) | Bật cho: trạng thái, loại, ngày tháng, tên |
| **Primary Key** | Đánh dấu khóa chính | Giúp AI biết cách đếm bản ghi duy nhất |

#### Thuộc Tính Tùy Chọn

| Thuộc Tính | Mô Tả |
|------------|--------|
| **Hidden** | Ẩn cột khỏi AI (cột nhạy cảm, cột kỹ thuật không cần phân tích) |
| **Synonyms** | Từ đồng nghĩa người dùng hay gõ. Ví dụ: cột "revenue" → synonyms: "doanh thu", "tiền hàng", "doanh số" |
| **Format** | Định dạng hiển thị: `currency`, `percent`, `number` |

#### Các Kiểu Dữ Liệu (Data Types)

| Data Type | Dùng Cho | Phép Toán AI Có Thể Áp Dụng |
|-----------|----------|------------------------------|
| `TEXT` | Chuỗi ký tự, mã, tên | Lọc, nhóm, đếm |
| `INTEGER` | Số nguyên | Cộng, trung bình, so sánh, nhóm |
| `DOUBLE` | Số thập phân | Cộng, trung bình, so sánh |
| `BOOLEAN` | Đúng/Sai | Lọc (true/false) |
| `DATE` | Ngày (YYYY-MM-DD) | Lọc theo khoảng, trích xuất tháng/quý/năm |
| `DATETIME` | Ngày giờ (YYYY-MM-DD HH:MM:SS) | Như DATE + thêm giờ phút |

#### Ví Dụ Mô Tả Cột Chất Lượng Cao

```
Cột: order_status
Label: Trạng thái đơn hàng
Data Type: TEXT
Description: Trạng thái xử lý của đơn hàng. Các giá trị:
  - 'pending': Đơn mới tạo, chưa thanh toán
  - 'paid': Đã thanh toán, đang xử lý
  - 'shipped': Đã giao cho đơn vị vận chuyển
  - 'delivered': Giao hàng thành công
  - 'cancelled': Đơn hủy, không tính doanh thu
  - 'refunded': Đã hoàn tiền
Khi tính doanh thu, chỉ dùng status IN ('paid', 'shipped', 'delivered').
Searchable: Có
```

```
Cột: revenue
Label: Doanh thu
Data Type: DOUBLE
Description: Tổng giá trị đơn hàng đã bao gồm phí vận chuyển và 
đã trừ mã giảm giá. Đơn vị: VNĐ. Chưa trừ chi phí hàng bán (COGS).
Searchable: Không (không dùng làm điều kiện lọc)
Format: currency
```

### Bước 4 — Các Tab Bổ Sung

| Tab | Nội Dung | Xem Chi Tiết |
|-----|---------|--------------|
| **Calculated Fields** | Tạo cột ảo tính toán từ SQL (lợi nhuận %, phân nhóm...) | [Calculated Fields](calculated-fields.md) |
| **Metrics** | Định nghĩa KPI: tổng doanh thu, số đơn, trung bình... | [Metrics](metrics.md) |
| **Relations** | Khai báo JOIN với model khác | [Relations](relations.md) |
| **Contexts** | Xem các Context đang dùng model này | |
| **Access Control** | Phân quyền xem/chỉnh sửa model | |
| **Versions** | Lịch sử thay đổi — xem ai thay đổi gì và khi nào | |
| **Change Requests** | Yêu cầu thay đổi đang chờ phê duyệt (nếu bật workflow) | |

### Bước 5 — Lưu

Nhấn **Save** (hoặc **Submit for Review** nếu hệ thống yêu cầu phê duyệt trước).

---

## Tất Cả Các Tab Trong Model Editor — Chi Tiết

### Tab Tables

Khi một Model cần lấy dữ liệu từ **nhiều bảng vật lý** (ví dụ: JOIN sẵn khi import), bạn có thể thêm bảng thứ hai vào đây và khai báo điều kiện JOIN tại tầng Model. Điều này khác với Relations (Relations là JOIN giữa hai Model khác nhau).

### Tab Access Control

Kiểm soát ai có thể **nhìn thấy** và **chỉnh sửa** Model này:

| Cấp Độ | Ý Nghĩa |
|--------|---------|
| **Owner** | Toàn quyền, kể cả xóa |
| **Approver** | Phê duyệt Change Requests |
| **Editor** | Chỉnh sửa cấu hình |
| **Viewer** | Chỉ xem (không thể dùng trong chat trừ khi có quyền use:chat) |

### Tab Versions

Mỗi lần Save tạo ra một Version mới. Bạn có thể:
- Xem ai thay đổi gì
- **Rollback** (khôi phục) về version trước nếu có lỗi

---

## Thực Hành Tốt Nhất

### 1. Quy Tắc Đặt Tên

| Đối Tượng | Quy Tắc | Ví Dụ Đúng | Ví Dụ Sai |
|-----------|---------|------------|-----------|
| **Name** | snake_case, không dấu | `don_hang_2024` | `Đơn Hàng`, `DonHang` |
| **Label** | Tiếng Việt đầy đủ, rõ nghĩa | `Đơn hàng bán lẻ 2024` | `Orders`, `DH` |
| **Description** | Câu hoàn chỉnh, nêu rõ đặc điểm | (xem ví dụ trên) | `Bảng đơn hàng` |

### 2. Ưu Tiên Cột Nào Cần Mô Tả Kỹ

- Cột **trạng thái** (status, type, category): Liệt kê tất cả giá trị có thể có và ý nghĩa
- Cột **số tiền** (revenue, cost, amount): Nêu rõ đơn vị (VNĐ, USD), bao gồm/loại trừ gì
- Cột **ngày tháng** (created_at, order_date): Nêu rõ múi giờ (UTC hay local), sự kiện gì xảy ra
- Cột **khóa ngoại** (customer_id, product_id): Ghi chú đây là ID liên kết sang bảng nào

### 3. Kiểm Tra Trước Khi Publish

Sau khi tạo Model, thử hỏi AI Chat một vài câu đơn giản:
- "Tổng doanh thu tháng này là bao nhiêu?"
- "Có bao nhiêu đơn hàng đã thanh toán?"

Nếu AI trả lời sai → kiểm tra lại Description của Metrics và cột trạng thái.

---

## Ví Dụ Thực Tế: Model Đơn Hàng

Dưới đây là ví dụ hoàn chỉnh về cách cấu hình Model cho bảng đơn hàng:

**Thông Tin Cơ Bản:**
- Name: `don_hang`
- Label: `Đơn hàng`
- Description: `Bảng ghi lại toàn bộ đơn hàng từ kênh online và offline. Doanh thu tính từ cột revenue, chỉ cho đơn status = 'paid' hoặc 'delivered'. Đơn vị: VNĐ.`

**Cấu Hình Cột:**

| Tên Cột DB | Label | Type | Description | Searchable |
|------------|-------|------|-------------|------------|
| `order_id` | Mã đơn hàng | INTEGER | Khóa chính, mỗi đơn có một mã duy nhất | Có |
| `customer_id` | Mã khách hàng | INTEGER | Khóa ngoại tham chiếu bảng khách hàng | Có |
| `order_date` | Ngày đặt hàng | DATE | Ngày khách tạo đơn, múi giờ UTC+7 | Có |
| `status` | Trạng thái | TEXT | paid/pending/cancelled/delivered (xem mô tả chi tiết) | Có |
| `revenue` | Doanh thu | DOUBLE | Tổng tiền đơn hàng sau giảm giá, đơn vị VNĐ | Không |
| `cost` | Chi phí hàng bán | DOUBLE | Giá vốn hàng hóa, đơn vị VNĐ | Không |
| `channel` | Kênh bán | TEXT | 'online' hoặc 'offline' | Có |
| `region` | Khu vực | TEXT | Miền Bắc / Miền Trung / Miền Nam | Có |

**Metrics:**
- `total_revenue`: SUM(revenue) — chỉ đơn paid/delivered
- `order_count`: COUNT_DISTINCT(order_id)
- `avg_order_value`: AVG(revenue)
- `gross_profit`: SUM(revenue - cost)
