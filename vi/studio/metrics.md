# Chỉ Số Kinh Doanh (Metrics)

**Điều hướng:** Studio → DABI → Data Models → chọn Model → tab Metrics

Metric là định nghĩa chuẩn hóa các chỉ số hiệu suất (KPI) của doanh nghiệp. Được định nghĩa **một lần**, dùng **nhất quán** trên toàn hệ thống — trong AI Chat, Dashboard, Notifications, và Contexts.

**Tại sao cần Metrics?** Nếu không định nghĩa Metric, mỗi lần người dùng hỏi "doanh thu" AI sẽ phải tự đoán xem tính từ cột nào, dùng hàm gì, có lọc trạng thái không. Khi đã có Metric "Tổng doanh thu" được định nghĩa rõ → AI luôn dùng đúng công thức đó mọi lúc.

---

## Tạo Metric Mới

### Bước 1 — Mở Tab Metrics

1. Vào **Studio → DABI → Data Models**.
2. Nhấn vào Model cần thêm Metric.
3. Chuyển sang tab **Metrics**.
4. Nhấn **New Metric**.

### Bước 2 — Điền Thông Tin Metric

#### Các Trường Bắt Buộc

| Trường | Ví Dụ | Quy Tắc |
|--------|--------|---------|
| **Name** | `total_revenue` | snake_case, không dấu, không khoảng trắng |
| **Label** | `Tổng doanh thu` | Tên hiển thị thân thiện, có thể tiếng Việt |
| **Aggregation** | `SUM` | Hàm tổng hợp (xem bảng bên dưới) |
| **Column** | `revenue` | Cột áp dụng hàm tổng hợp |

#### Các Trường Khuyến Nghị (Tăng Độ Chính Xác AI)

| Trường | Mô Tả | Ví Dụ |
|--------|--------|--------|
| **Description** | Giải thích chi tiết: công thức, điều kiện, đơn vị | Xem ví dụ bên dưới |
| **Synonyms** | Các cách người dùng thường gõ cho metric này | `doanh số`, `tiền thu`, `revenue` |
| **Format** | Cách hiển thị kết quả | `currency`, `number`, `percent` |

#### Các Trường Tùy Chọn

| Trường | Mô Tả |
|--------|--------|
| **Filter** | Điều kiện SQL lọc trước khi tính (ví dụ: `status = 'paid'`) |
| **Prefix** | Thêm trước giá trị (ví dụ: `₫`) |
| **Suffix** | Thêm sau giá trị (ví dụ: `đơn`, `%`) |
| **Round** | Số chữ số thập phân |

---

## Các Hàm Tổng Hợp (Aggregation)

| Hàm | Ý Nghĩa | Dùng Cho |
|-----|---------|----------|
| **SUM** | Tổng tất cả giá trị | Doanh thu, số lượng bán, chi phí |
| **COUNT** | Đếm số dòng (bao gồm NULL) | Số lần xuất hiện |
| **COUNT_DISTINCT** | Đếm giá trị duy nhất (không trùng) | Số khách hàng, số đơn hàng, số sản phẩm |
| **AVG** | Trung bình cộng | Giá trị đơn hàng TB, điểm đánh giá TB |
| **MIN** | Giá trị nhỏ nhất | Giá thấp nhất, ngày đầu tiên |
| **MAX** | Giá trị lớn nhất | Giá cao nhất, ngày mới nhất |

> **SUM vs COUNT vs COUNT_DISTINCT:**
> - Bảng đơn hàng có 1000 dòng, khách hàng A có 5 đơn.
> - `COUNT(order_id)` = 1000 (tổng số dòng)
> - `COUNT_DISTINCT(customer_id)` = số khách hàng duy nhất (khác nhau)
> - `COUNT_DISTINCT(order_id)` = số đơn hàng duy nhất (dùng khi có thể có dòng trùng)

---

## Định Dạng Hiển Thị (Format)

| Format | Ví Dụ Kết Quả | Dùng Cho |
|--------|--------------|----------|
| `number` | `1,234,567` | Số lượng thông thường |
| `currency` | `₫1,234,567` | Tiền tệ, doanh thu |
| `percent` | `23.5%` | Tỷ lệ, conversion rate |
| `decimal` | `1234567.89` | Số thập phân thô |

---

## Mẫu Công Thức Chỉ Số Hai Vế (Metric Formula Templates)

Bên cạnh các chỉ số cơ bản tính từ một cột vật lý (Basic Metric), Semantix cung cấp hệ thống **Mẫu công thức hai vế (Two-Metric Formula Templates)**. Thay vì để người dùng viết tự do các biểu thức SQL phức tạp dễ gây lỗi khi gộp dòng, Semantix chuẩn hóa công thức thành 2 vế độc lập: **Vế A (Numerator / Metric thứ nhất)** và **Vế B (Denominator / Metric thứ hai)**.

Mô hình này giúp bảo toàn đồ thị phụ thuộc giữa các chỉ số, hỗ trợ tính toán chính xác bảo mật RLS, chống lỗi chia cho 0, và đồng bộ tự động với cơ chế bọc snapshot số dư.

### 1. Chi Tiết 4 Mẫu Công Thức Chuẩn

| Mẫu | Ký Hiệu Hiển Thị | Công Thức Toán Học | SQL Biên Dịch Tự Động | Đơn Vị Đo Lường |
|---|---|---|---|---|
| **Tổng (Sum)** | `A + B` | $[A] + [B]$ | `(COALESCE(A, 0) + COALESCE(B, 0))` | Giữ nguyên đơn vị của A & B (currency, number) |
| **Chênh Lệch (Difference)** | `A − B` | $[A] - [B]$ | `(COALESCE(A, 0) - COALESCE(B, 0))` | Giữ nguyên đơn vị của A & B (currency, number) |
| **Tăng Trưởng (Growth %)** | `A ÷ B − 1` | $\frac{[A] - [B]}{[B]}$ | `(A / NULLIF(B, 0) - 1)` | Tỷ lệ phần trăm (`percent`) |
| **Biên / Tỷ Suất (Margin %)** | `(A − B) ÷ A` | $\frac{[A] - [B]}{[A]}$ | `((A - B) / NULLIF(A, 0))` | Tỷ lệ phần trăm (`percent`) |
| *(Mặc định) Tỷ Lệ (Ratio)* | `A ÷ B` | $\frac{[A]}{[B]}$ | `A / NULLIF(B, 0)` | Tỷ lệ phần trăm (`percent`) hoặc số thập phân |

> [!NOTE]
> **Bảo Vệ Tính Toàn Vẹn Số Liệu:**
> - **Chống lỗi chia cho 0:** Các mẫu phép chia (`growth`, `margin`, `ratio`) luôn được bọc hàm `NULLIF(..., 0)` ở mẫu số, ngăn chặn hoàn toàn lỗi sập truy vấn database (`division by zero`).
> - **Xử lý thiếu dòng dữ liệu (Null Handling):** Phép cộng (`sum`) và phép trừ (`difference`) tự động bọc `COALESCE(..., 0)`. Ví dụ: trong một ngày chỉ có dòng tiền vào mà không có dòng tiền ra, công thức dòng tiền ròng vẫn trả về đúng giá trị thu vào thay vì bị biến thành `NULL`.
> - **Kiểm soát xung đột thời gian (Temporal Conflict Guard):** Hệ thống chủ động ngăn chặn việc cộng/trừ giữa một chỉ số số dư thời điểm (Snapshot như dư nợ, tồn kho) với một chỉ số luồng phát sinh trong kỳ (Period như doanh thu bán hàng).

---

### 2. Cách Cấu Hình Trên Giao Diện Studio

1. Trong Data Model, chuyển sang tab **Metrics** → Nhấn **New Metric**.
2. Tại mục **Formula Type (Loại công thức)**, chọn **Two-Metric Formula** (hoặc Ratio).
3. Tại mục **Template (Mẫu công thức)**, chọn 1 trong các mẫu:
   - `Sum (Tổng)`
   - `Difference (Chênh lệch)`
   - `Growth % (Tăng trưởng)`
   - `Margin % (Biên / Tỷ suất)`
4. Chọn **Metric Vế A** và **Metric Vế B** từ danh sách các Metric đã có sẵn trong Model.
5. Xem trước (Preview) công thức và SQL được sinh tự động ngay bên dưới.
6. Nhấn **Save Metric**.

---

### 3. Cách AI Tự Động Nhận Diện Mẫu Công Thức

Khi người dùng sử dụng tính năng **Generate Metrics by AI** hoặc trò chuyện với trợ lý thông minh:

#### Cơ chế khớp ngữ nghĩa (Semantic Intent Matching):
AI của Semantix được huấn luyện để phân tích ngôn ngữ tự nhiên và tự động ánh xạ vào đúng template:
- Nhận diện **Sum (`template: "sum"`):** Các từ khóa *"tổng của A và B"*, *"A cộng B"*, *"total transaction = inflow + outflow"*.
- Nhận diện **Difference (`template: "difference"`):** Các từ khóa *"lợi nhuận = doanh thu trừ chi phí"*, *"chênh lệch thu chi"*, *"dòng tiền ròng"*, *"net amount = A - B"*.
- Nhận diện **Growth (`template: "growth"`):** Các từ khóa *"tăng trưởng doanh thu"*, *"tỷ lệ tăng trưởng so với kỳ trước"*, *"growth rate of A vs B"*.
- Nhận diện **Margin (`template: "margin"`):** Các từ khóa *"biên lợi nhuận gộp"*, *"gross margin"*, *"tỷ suất lợi nhuận trên doanh thu"*.
- Nhận diện **Ratio (`template: "ratio"`):** Các từ khóa *"trung bình mỗi đơn"*, *"doanh thu trên khách hàng"*, *"tỷ lệ chuyển đổi"*, *"A per B"*.

#### Quy trình tự động phân giải phụ thuộc (Dependency Resolution):
1. **Kiểm tra chỉ số thành phần:** AI kiểm tra xem cả hai chỉ số A và B đã tồn tại trong Data Model chưa.
2. **Tự động sinh chỉ số nền tảng:** Nếu một hoặc cả hai chỉ số thành phần chưa có (ví dụ: yêu cầu tính *Lợi nhuận gộp = Doanh thu - Chi phí*, nhưng Model mới chỉ có cột `revenue` và `cost` thô), AI sẽ:
   - Tự động tạo trước 2 Basic Metrics: `Tổng doanh thu` (`SUM(revenue)`) và `Tổng chi phí` (`SUM(cost)`).
   - Tiếp theo, tạo Two-Metric Formula với template `difference` tham chiếu đến ID của 2 metric vừa tạo.
3. Không bao giờ biến công thức hai vế thành một biểu thức custom chắp vá thiếu cấu trúc.

---

## Ví Dụ Metrics Thường Gặp

### Metrics Cho Bảng Đơn Hàng

```
Metric: total_revenue
Label: Tổng doanh thu
Aggregation: SUM
Column: revenue
Filter: status IN ('paid', 'delivered')
Format: currency
Description: Tổng giá trị các đơn hàng đã thanh toán và đã giao thành công.
             Không bao gồm đơn hủy (cancelled) và đơn hoàn tiền (refunded).
             Đơn vị: VNĐ.
Synonyms: doanh số, tiền thu, doanh thu bán hàng, revenue
```

```
Metric: order_count
Label: Số đơn hàng
Aggregation: COUNT_DISTINCT
Column: order_id
Filter: status != 'cancelled'
Format: number
Description: Số lượng đơn hàng duy nhất đã phát sinh, không tính đơn hủy.
Synonyms: số đơn, lượng đơn, number of orders
```

```
Metric: avg_order_value
Label: Giá trị TB mỗi đơn
Aggregation: AVG
Column: revenue
Filter: status IN ('paid', 'delivered')
Format: currency
Description: Giá trị trung bình của mỗi đơn hàng đã thanh toán thành công.
Synonyms: AOV, giá trị đơn trung bình, average order value
```

```
Metric: unique_customers
Label: Số khách hàng
Aggregation: COUNT_DISTINCT
Column: customer_id
Format: number
Description: Số lượng khách hàng duy nhất đã đặt hàng trong kỳ.
Synonyms: số khách, lượng khách, khách mua hàng
```

### Metrics Cho Bảng Sản Phẩm / Kho

```
Metric: total_quantity_sold
Label: Số lượng bán ra
Aggregation: SUM
Column: quantity
Format: number
Suffix: sản phẩm
Description: Tổng số lượng sản phẩm bán ra (tính theo đơn vị sản phẩm).
```

### Metrics Cho Bảng Khách Hàng

```
Metric: active_customer_count
Label: Khách hàng hoạt động
Aggregation: COUNT_DISTINCT
Column: customer_id
Filter: status = 'active'
Format: number
Description: Số khách hàng có trạng thái active (không bị khóa tài khoản).
```

---

## Mẹo Nâng Cao

### Dùng Filter Để Tính Metric Có Điều Kiện

Filter trong Metric giúp tính chính xác, ví dụ:

| Metric | Filter |
|--------|--------|
| Doanh thu thực | `status = 'paid'` |
| Đơn online | `channel = 'online'` |
| Khách hàng mới | `is_new_customer = true` |
| Tỷ lệ hoàn tiền | (dùng trong Calculated Field, không phải Filter Metric) |

### Synonyms — Chìa Khóa Để AI Hiểu Đúng

Người dùng gõ câu hỏi theo nhiều cách khác nhau. Thêm Synonyms đầy đủ để AI match đúng Metric:

```
Metric: total_revenue
Synonyms:
  - doanh thu
  - doanh số
  - tiền thu được
  - revenue
  - sales
  - doanh thu bán hàng
  - tổng tiền
  - tiền hàng
```

### Description Nên Bao Gồm

1. **Công thức tính:** "Tổng giá trị... tính từ cột..."
2. **Điều kiện bao gồm/loại trừ:** "Chỉ tính đơn status = 'paid', không bao gồm đơn hủy"
3. **Đơn vị:** "VNĐ", "đơn", "sản phẩm", "%"
4. **Bối cảnh:** "Dùng để đánh giá hiệu quả kinh doanh theo tháng"

---

## Thứ Tự Ưu Tiên Tạo Metrics

Với một Data Model mới, nên tạo Metrics theo thứ tự:

1. **Metric đếm bản ghi duy nhất** (COUNT_DISTINCT của khóa chính): Số đơn hàng, số khách hàng
2. **Metric tổng giá trị chính** (SUM): Tổng doanh thu, tổng chi phí
3. **Metric trung bình** (AVG): Giá trị đơn trung bình, điểm đánh giá trung bình
4. **Metric phụ** (MIN, MAX): Đơn nhỏ nhất, đơn lớn nhất

---

## Lỗi Thường Gặp

| Vấn Đề | Nguyên Nhân | Cách Sửa |
|---------|-------------|----------|
| AI tính sai doanh thu | Không có Filter loại đơn hủy | Thêm `Filter: status != 'cancelled'` |
| COUNT cho kết quả lớn hơn thực tế | Dùng COUNT thay vì COUNT_DISTINCT | Đổi Aggregation sang COUNT_DISTINCT |
| AI không hiểu "doanh thu" | Thiếu Synonyms | Thêm các từ đồng nghĩa phổ biến |
| Số hiển thị không có đơn vị | Chưa chọn Format | Đặt Format = `currency` hoặc thêm Suffix |
