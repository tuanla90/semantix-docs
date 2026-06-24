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
