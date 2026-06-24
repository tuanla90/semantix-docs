# Trường Tính Toán (Calculated Fields)

**Điều hướng:** Studio → DABI → Data Models → chọn Model → tab Calculated Fields

Calculated Field là **cột ảo** được tạo từ biểu thức SQL. Cột này không tồn tại trong database gốc nhưng được tính toán theo thời gian thực khi AI chạy truy vấn. AI và người dùng có thể dùng Calculated Field như một cột thông thường.

---

## Khi Nào Dùng Calculated Fields?

| Tình Huống | Ví Dụ |
|-----------|--------|
| **Tính toán từ nhiều cột** | Lợi nhuận = Doanh thu - Chi phí |
| **Chuyển đổi kiểu dữ liệu** | Chuyển timestamp → ngày, số → chuỗi |
| **Phân nhóm / Categorize** | Khách hàng "Lớn" / "Vừa" / "Nhỏ" theo doanh thu |
| **Xử lý logic** | Phân loại đơn hàng theo múa giờ, ngày trong tuần |
| **Làm sạch dữ liệu** | UPPER(name), TRIM(email), xử lý NULL |

---

## Tạo Calculated Field

### Bước 1 — Mở Tab Calculated Fields

1. Vào **Studio → DABI → Data Models** → chọn Model cần thêm.
2. Chuyển sang tab **Calculated Fields**.
3. Nhấn **Add Calculated Field**.

### Bước 2 — Điền Thông Tin

| Thuộc tính | Bắt Buộc | Ví Dụ | Mô Tả |
|------------|----------|--------|--------|
| **Name** | Có | `profit_margin` | Tên kỹ thuật: snake_case, không dấu |
| **Label** | Có | `Tỷ suất lợi nhuận (%)` | Tên hiển thị thân thiện |
| **Expression** | Có | `(revenue - cost) / revenue * 100` | Biểu thức SQL |
| **Return Type** | Có | `Number` | Kiểu dữ liệu kết quả trả về |
| **Description** | Khuyến nghị | `Phần trăm lợi nhuận gộp trên doanh thu` | Giúp AI hiểu khi nào dùng |
| **Format** | Không | `percent` | Cách hiển thị kết quả |

### Return Type

| Return Type | Dùng Khi |
|-------------|---------|
| **Number** | Kết quả là số (nguyên hoặc thập phân) |
| **String** | Kết quả là chuỗi ký tự (nhãn, phân loại) |
| **Boolean** | Kết quả là đúng/sai |
| **Date** | Kết quả là ngày tháng |
| **Datetime** | Kết quả là ngày giờ |

### Bước 3 — Viết Expression

Expression là một đoạn SQL hợp lệ. Tham chiếu cột bằng tên cột gốc trong database (không phải Label).

---

## Ví Dụ Thực Tế

### 1. Tính Toán Tài Chính

```sql
-- Lợi nhuận gộp (VNĐ)
revenue - cost

-- Tỷ suất lợi nhuận gộp (%)
CASE WHEN revenue > 0 THEN (revenue - cost) / revenue * 100 ELSE 0 END

-- Giá trị đơn hàng sau giảm giá
revenue * (1 - discount_rate / 100)

-- Quy đổi VNĐ → USD (tỷ giá tĩnh)
revenue / 25000
```

### 2. Phân Nhóm Khách Hàng (CASE WHEN)

```sql
-- Phân nhóm theo doanh thu tích lũy
CASE
  WHEN lifetime_revenue >= 100000000 THEN 'VIP'
  WHEN lifetime_revenue >= 20000000  THEN 'Gold'
  WHEN lifetime_revenue >= 5000000   THEN 'Silver'
  ELSE 'New'
END

-- Phân nhóm theo độ tuổi
CASE
  WHEN age < 25 THEN 'Gen Z (< 25)'
  WHEN age < 40 THEN 'Millennial (25-39)'
  WHEN age < 55 THEN 'Gen X (40-54)'
  ELSE 'Baby Boomer (55+)'
END

-- Phân nhóm giá trị đơn hàng
CASE
  WHEN revenue >= 10000000 THEN 'Đơn lớn (>= 10tr)'
  WHEN revenue >= 2000000  THEN 'Đơn vừa (2-10tr)'
  WHEN revenue >= 500000   THEN 'Đơn nhỏ (500k-2tr)'
  ELSE 'Đơn micro (< 500k)'
END
```

### 3. Xử Lý Ngày Tháng

```sql
-- Lấy tên ngày trong tuần (tiếng Việt)
CASE DAYOFWEEK(order_date)
  WHEN 1 THEN 'Chủ Nhật'
  WHEN 2 THEN 'Thứ Hai'
  WHEN 3 THEN 'Thứ Ba'
  WHEN 4 THEN 'Thứ Tư'
  WHEN 5 THEN 'Thứ Năm'
  WHEN 6 THEN 'Thứ Sáu'
  WHEN 7 THEN 'Thứ Bảy'
END

-- Quý trong năm
CASE
  WHEN MONTH(order_date) IN (1,2,3)   THEN 'Q1'
  WHEN MONTH(order_date) IN (4,5,6)   THEN 'Q2'
  WHEN MONTH(order_date) IN (7,8,9)   THEN 'Q3'
  WHEN MONTH(order_date) IN (10,11,12) THEN 'Q4'
END

-- Số ngày từ khi đặt hàng đến giao hàng
DATEDIFF(delivery_date, order_date)

-- Tuổi tài khoản (số ngày)
DATEDIFF(CURRENT_DATE, created_at)

-- Tuổi khách hàng (năm)
FLOOR(DATEDIFF(CURRENT_DATE, birth_date) / 365)

-- Trích xuất tháng/năm dạng chuỗi (dùng để group)
CONCAT(YEAR(order_date), '-', LPAD(MONTH(order_date), 2, '0'))
```

### 4. Xử Lý Chuỗi

```sql
-- Chuẩn hóa email về chữ thường
LOWER(TRIM(email))

-- Lấy tên miền email
SUBSTRING(email, LOCATE('@', email) + 1)

-- Ghép họ và tên
CONCAT(first_name, ' ', last_name)

-- Rút gọn tên (chỉ lấy chữ đầu)
UPPER(LEFT(first_name, 1))

-- Che số điện thoại (privacy)
CONCAT(LEFT(phone, 3), '****', RIGHT(phone, 3))
```

### 5. Xử Lý NULL

```sql
-- Thay NULL bằng 0
COALESCE(revenue, 0)

-- Thay NULL bằng chuỗi mặc định
COALESCE(region, 'Chưa xác định')

-- Kiểm tra NULL
CASE WHEN email IS NULL THEN 'Chưa có email' ELSE 'Có email' END
```

### 6. Tính Toán Thống Kê Phức Tạp

```sql
-- Phần trăm đóng góp (dùng trong window function — tùy database hỗ trợ)
revenue / SUM(revenue) OVER () * 100

-- Rank theo doanh thu trong cùng nhóm
RANK() OVER (PARTITION BY region ORDER BY revenue DESC)

-- Running total (tích lũy theo ngày)
SUM(revenue) OVER (ORDER BY order_date ROWS UNBOUNDED PRECEDING)
```

---

## SQL Dialect Theo Từng Database

Expression phải hợp lệ với SQL dialect của database bạn đang dùng:

| Database | Ngày hiện tại | Trích ngày | Trích tháng | Khác biệt |
|----------|--------------|------------|------------|-----------|
| **PostgreSQL** | `CURRENT_DATE` | `EXTRACT(day FROM col)` | `EXTRACT(month FROM col)` | `DATE_PART`, `TO_CHAR` |
| **MySQL** | `CURDATE()` | `DAY(col)` | `MONTH(col)` | `DAYOFWEEK`, `DATE_FORMAT` |
| **BigQuery** | `CURRENT_DATE()` | `EXTRACT(DAY FROM col)` | `EXTRACT(MONTH FROM col)` | `FORMAT_DATE`, `DATE_DIFF` |
| **Snowflake** | `CURRENT_DATE()` | `DAY(col)` | `MONTH(col)` | `DATEDIFF`, `TO_CHAR` |
| **ClickHouse** | `today()` | `toDayOfMonth(col)` | `toMonth(col)` | `dateDiff`, `formatDateTime` |

---

## Kiểm Tra Expression

Trước khi lưu, bạn có thể nhấn **Preview** (nếu có) để chạy thử expression trên một mẫu dữ liệu nhỏ và xem kết quả.

---

## Hạn Chế Cần Biết

| Hạn Chế | Chi Tiết |
|---------|----------|
| **Không hỗ trợ nested** | Calculated Field không thể tham chiếu Calculated Field khác |
| **Không có Aggregation** | Calculated Field là biểu thức tính theo hàng (row-level), không phải tổng hợp. Dùng Metrics cho aggregation |
| **Phụ thuộc dialect** | Expression phải đúng cú pháp của database đang dùng |
| **Không debug SQL chi tiết** | Nếu expression sai, AI sẽ báo lỗi SQL chung chung — cần tự kiểm tra expression |

---

## Lỗi Thường Gặp

| Lỗi | Nguyên Nhân | Cách Sửa |
|-----|-------------|----------|
| `Column not found` | Tên cột sai (dùng tên DB, không dùng Label) | Kiểm tra tên cột chính xác trong database |
| `Function not supported` | Dùng hàm không tồn tại trong database | Xem SQL Dialect đúng cho database đang dùng |
| `Division by zero` | Chia cho cột có thể = 0 | Thêm `CASE WHEN denominator > 0 THEN ... ELSE 0 END` |
| `Type mismatch` | Return Type không khớp kết quả thực | Kiểm tra lại Return Type |
