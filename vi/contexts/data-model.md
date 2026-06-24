# Xây Dựng Data Model Chuyên Sâu

Hướng dẫn đầy đủ quy trình xây dựng Data Model chất lượng cao — nền tảng của độ chính xác AI.

---

## Data Model Là Gì?

Data Model trong Semantix là bản mô tả ngữ nghĩa của một bảng (hoặc view) trong database. Nó không thay đổi dữ liệu gốc — chỉ thêm tầng mô tả giúp AI hiểu dữ liệu.

**Cấu trúc:**
```
Data Model "Đơn Hàng"
├── Connection: PostgreSQL Production
├── Table: public.orders
├── Columns:
│   ├── order_id → "Mã Đơn Hàng" (Number, PK)
│   ├── customer_id → "Mã Khách Hàng" (Number, FK)
│   ├── status → "Trạng Thái" (Text, với description enum values)
│   ├── revenue → "Doanh Thu" (Number, VNĐ, không bao gồm đơn hủy)
│   └── created_at → "Ngày Đặt Hàng" (DateTime, UTC+7)
├── Calculated Fields:
│   └── gross_margin = (revenue - cost) / revenue * 100
├── Metrics:
│   ├── "Tổng Doanh Thu" = SUM(revenue) WHERE status IN ('paid','delivered')
│   └── "Số Đơn" = COUNT(*) WHERE status != 'cancelled'
└── Relations:
    ├── customer_id → Customers.id (LEFT JOIN)
    └── product_id → Products.id (LEFT JOIN)
```

---

## Bước 1: Tạo Data Model Mới

1. **Studio → DABI → Data Models → New Data Model**
2. Điền:
   - **Name**: Tên thân thiện (ví dụ: "Đơn Hàng", "Khách Hàng", "Sản Phẩm")
   - **Connection**: Chọn connection database
   - **Table/View**: Chọn bảng hoặc view nguồn
   - **Description**: Mô tả model này đại diện cho gì (2-3 câu)
3. Nhấn **Save**

---

## Bước 2: Cấu Hình Columns

Đây là bước quan trọng nhất. Vào tab **Columns**:

### Cho Mỗi Cột, Điền:

| Trường | Quan Trọng | Hướng Dẫn |
|--------|-----------|-----------|
| **Label** | Cao | Tên thân thiện, tiếng Việt, không viết tắt |
| **Description** | Rất Cao | Giải thích dữ liệu đại diện cho gì, đơn vị, các giá trị enum |
| **Type** | Cao | Text / Number / Date / DateTime / Boolean |
| **Is Hidden** | Trung Bình | Ẩn cột nhạy cảm (lương, CMND...) khỏi AI |
| **Is Primary Key** | Thấp | Đánh dấu cột ID chính |
| **Is Foreign Key** | Thấp | Đánh dấu cột tham chiếu bảng khác |

### Ví Dụ Description Cho Các Loại Cột

**Cột numeric (số tiền):**
```
Doanh thu thuần của đơn hàng, tính bằng VNĐ (đã trừ giảm giá, chưa trừ chi phí).
Không bao gồm: đơn có status='cancelled' hoặc status='refunded'.
Chỉ số chính cho báo cáo doanh thu tháng.
```

**Cột enum/categorical:**
```
Trạng thái xử lý đơn hàng.
Giá trị hợp lệ:
- 'pending': Chờ xác nhận (đặt hàng nhưng chưa thanh toán)
- 'confirmed': Đã xác nhận và thanh toán
- 'shipping': Đang giao hàng
- 'delivered': Đã giao thành công
- 'cancelled': Đã hủy bởi khách hoặc hệ thống
- 'refunded': Đã hoàn tiền
Chỉ tính doanh thu với status IN ('confirmed','delivered').
```

**Cột datetime:**
```
Thời điểm khách hàng đặt đơn hàng (múi giờ UTC+7 / Asia/Ho_Chi_Minh).
Dùng làm cột thời gian chính để phân tích theo ngày/tuần/tháng/quý/năm.
Lưu ý: khác với payment_date (ngày thanh toán thực tế) và shipped_date (ngày xuất kho).
```

**Cột boolean:**
```
Xác định đây có phải đơn hàng đầu tiên của khách hàng không.
TRUE = đây là lần mua đầu tiên của customer_id này.
FALSE = khách hàng đã từng mua trước đó.
Dùng để phân tích new vs returning customers.
```

---

## Bước 3: Tạo Calculated Fields

**Điều hướng:** Tab **Calculated Fields** trong Data Model

Calculated Fields là cột ảo được tính từ cột thực — AI có thể dùng trực tiếp mà không cần tính lại.

### Cú Pháp

```sql
-- Toán học
revenue - cost

-- CASE WHEN
CASE 
  WHEN revenue > 10000000 THEN 'High Value'
  WHEN revenue > 1000000 THEN 'Medium Value'
  ELSE 'Low Value'
END

-- Xử lý NULL
COALESCE(discount, 0)

-- Tính ngày
DATE_DIFF('day', created_at, delivered_at)

-- Chuỗi
UPPER(TRIM(customer_name))
```

### Ví Dụ Calculated Fields Thực Tế

| Tên Field | Công Thức | Mô Tả |
|-----------|-----------|-------|
| `gross_margin_pct` | `(revenue - cost) / revenue * 100` | Biên lợi nhuận gộp (%) |
| `customer_tier` | `CASE WHEN total_spent > 50000000 THEN 'VIP' WHEN total_spent > 10000000 THEN 'Gold' ELSE 'Standard' END` | Phân loại khách hàng |
| `days_to_deliver` | `DATEDIFF(delivered_at, order_date)` | Số ngày giao hàng |
| `order_month` | `DATE_FORMAT(created_at, '%Y-%m')` | Tháng đặt hàng (YYYY-MM) |
| `item_subtotal` | `unit_price * quantity * (1 - discount/100)` | Tổng tiền một dòng đơn |

### Giới Hạn Calculated Fields

- Chỉ tính theo từng **dòng** (row-level), không tính tổng hợp (aggregation)
- Không thể tham chiếu field khác trong cùng Data Model
- Không thể tham chiếu bảng khác (dùng Relations + Metrics cho trường hợp đó)

---

## Bước 4: Tạo Metrics

**Điều hướng:** Tab **Metrics** trong Data Model

Metrics là các chỉ số tổng hợp — AI dùng trực tiếp khi trả lời câu hỏi KPI.

### Cấu Hình Metric

| Trường | Mô Tả |
|--------|--------|
| **Name** | Tên kỹ thuật (không dấu): `tong_doanh_thu` |
| **Label** | Tên hiển thị: "Tổng Doanh Thu" |
| **Aggregation** | SUM / COUNT / COUNT_DISTINCT / AVG / MIN / MAX |
| **Column** | Cột cần tổng hợp |
| **Filter** | Điều kiện lọc TRƯỚC khi tổng hợp |
| **Format** | Số, Tiền tệ, Phần trăm, Ngày |
| **Description** | Giải thích chi tiết |
| **Synonyms** | Từ đồng nghĩa người dùng có thể dùng |

### Ví Dụ Các Metric Phổ Biến

**Doanh thu:**
```
Name: tong_doanh_thu
Label: Tổng Doanh Thu
Aggregation: SUM
Column: revenue
Filter: status IN ('confirmed', 'delivered')
Format: Currency (VNĐ)
Synonyms: doanh thu, doanh số, tiền bán hàng, revenue, sales
```

**Số khách hàng unique:**
```
Name: so_khach_hang
Label: Số Khách Hàng
Aggregation: COUNT_DISTINCT
Column: customer_id
Filter: (không có - đếm tất cả)
Format: Number
Synonyms: khách hàng, khách, số khách, customers
```

**Giá trị đơn trung bình:**
```
Name: gia_tri_don_tb
Label: Giá Trị Đơn Trung Bình (AOV)
Aggregation: AVG
Column: revenue
Filter: status IN ('confirmed', 'delivered')
Format: Currency (VNĐ)
Synonyms: AOV, giá trị trung bình, average order value, đơn trung bình
```

---

## Bước 5: Khai Báo Relations

**Điều hướng:** Tab **Relations** trong Data Model

Relations định nghĩa cách các bảng kết nối với nhau — AI dùng thông tin này để viết SQL JOIN đúng.

### Tạo Relation

1. Tab Relations → **Add Relation**
2. Điền:
   - **From Model/Column**: Model hiện tại, cột foreign key
   - **To Model/Column**: Model đích, cột primary key
   - **Join Type**: LEFT JOIN (khuyến nghị) hoặc INNER JOIN

**Ví dụ:**
- Model "Đơn Hàng": `customer_id` → Model "Khách Hàng": `id`
- Model "Đơn Hàng": `product_id` → Model "Sản Phẩm": `id`

### LEFT vs INNER JOIN

| Dùng LEFT JOIN | Dùng INNER JOIN |
|----------------|-----------------|
| Muốn giữ đơn hàng kể cả khi không có khách hàng match | Chỉ muốn đơn hàng có khách hàng hợp lệ |
| Analytics thường (đếm tất cả) | Trường hợp cần strict matching |
| **Mặc định khuyến nghị cho hầu hết trường hợp** | Dùng có chủ đích |

---

## Bước 6: Cấu Hình Context

Sau khi có Data Models với đầy đủ cấu hình, tạo Context để gắn kết mọi thứ:

1. Tab **Contexts** trong Data Model → **New Context** (hoặc thêm vào Context đã có)
2. Chọn Context → cấu hình:
   - **Default Time Column**: Cột ngày chính
   - **Instructions**: Hướng dẫn nghiệp vụ đặc thù
   - **Advanced Analysis**: Cohort/RFM/Funnel nếu cần
   - **Access Control**: RLS rules

---

## Kiểm Tra Model Trước Khi Go-Live

### Checklist

- [ ] Mọi cột có Description rõ ràng
- [ ] Mọi cột có Label thân thiện (không phải tên kỹ thuật)
- [ ] Các cột enum có giải thích đầy đủ tất cả giá trị
- [ ] Mọi Metric có Filter phù hợp và Synonyms
- [ ] Relations đã khai báo đúng giữa các bảng cần JOIN
- [ ] Default Time Column đã đặt trong Context
- [ ] Test 10+ câu hỏi và xem SQL được tạo ra

### Test Query

Trong tab **Contexts** → **Query Preview**: Gõ câu hỏi và xem SQL được tạo. Đây là cách nhanh nhất để phát hiện vấn đề cấu hình.
