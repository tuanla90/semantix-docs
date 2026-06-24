# Data Portal — Cổng Xuất Dữ Liệu

**Điều hướng:** Data Portal (menu trên cùng)

Data Portal là module cho phép **người dùng cuối** tra cứu và xuất dữ liệu theo các mẫu báo cáo (Data Templates) được Admin chuẩn bị sẵn — không cần biết SQL, không cần hiểu cấu trúc database.

---

## Dành Cho Ai?

| Đối Tượng | Cách Dùng |
|-----------|-----------|
| **Nhân viên nghiệp vụ** | Xuất báo cáo định kỳ theo ngày/tuần/tháng mà không cần nhờ IT |
| **Kế toán, Tài chính** | Tải file Excel đúng định dạng template của bộ phận |
| **Quản lý chi nhánh** | Lọc dữ liệu theo chi nhánh của mình, tải về để phân tích |
| **Nhân sự** | Xuất bảng lương, danh sách nhân viên theo phòng ban |

---

## Cách Sử Dụng (Dành Cho Người Dùng Cuối)

### Bước 1 — Mở Data Portal

1. Đăng nhập vào Semantix.
2. Nhấn **Data Portal** trên thanh điều hướng chính (menu trên cùng).
3. Trang hiển thị danh sách các **mẫu báo cáo** Admin đã tạo sẵn cho bạn.

> Bạn chỉ thấy các template mà bạn có quyền truy cập (do Admin phân quyền).

### Bước 2 — Tìm Template Báo Cáo

**Tìm kiếm:**
- Gõ từ khóa vào ô **Search** (ví dụ: "doanh thu", "lương tháng", "tồn kho")
- Kết quả lọc theo tên và mô tả template

**Duyệt danh sách:**
- Mỗi card hiển thị: tên template, mô tả ngắn, và định dạng xuất (CSV/Excel/PDF)
- Nhấn vào card để mở template

### Bước 3 — Điền Tham Số Lọc

Mỗi template có thể có các trường lọc khác nhau tùy thiết kế của Admin:

| Loại Tham Số | Ví Dụ Trường | Ví Dụ Giá Trị |
|--------------|-------------|--------------|
| **Text** | Mã khách hàng, Tên sản phẩm | `KH001`, `Áo thun` |
| **Number** | Giá trị tối thiểu, Số lượng | `1000000`, `10` |
| **Date** | Ngày bắt đầu | `01/06/2024` |
| **Date Range** | Từ ngày → Đến ngày | `01/06/2024` → `30/06/2024` |
| **Select (Đơn)** | Khu vực, Trạng thái | Chọn `Miền Bắc` |
| **Select (Nhiều)** | Nhiều chi nhánh, nhiều sản phẩm | Chọn `HN`, `HCM`, `ĐN` |

> Các trường đánh dấu `*` (dấu sao) là **bắt buộc** phải điền trước khi xuất.

**Ví dụ cụ thể cho template "Báo cáo Doanh thu Chi nhánh":**

```
Từ ngày *:      [01/06/2024]
Đến ngày *:     [30/06/2024]
Chi nhánh *:    [Hà Nội ▼] (dropdown)
Trạng thái:     [Tất cả ▼] (tùy chọn)
Xuất định dạng: ● Excel  ○ CSV  ○ PDF
```

### Bước 4 — Xuất Dữ Liệu

Tùy theo cấu hình của template, có thể xuất theo một hoặc nhiều định dạng:

| Nút | Định Dạng | Khi Nào Dùng |
|-----|-----------|-------------|
| **Tải xuống CSV** | File `.csv` thô | Muốn import vào Excel/Sheets tự làm đẹp |
| **Tải xuống Excel** | File `.xlsx` có định dạng | Template có màu sắc, logo, layout sẵn |
| **Tải xuống PDF** | File `.pdf` | Báo cáo in ấn, gửi email |

**Với báo cáo lớn:**

Nếu dataset quá lớn (ví dụ: xuất 1 triệu dòng), hệ thống sẽ xử lý bất đồng bộ:
1. Nhấn Export → hệ thống thông báo "Đang xử lý..."
2. Khi hoàn tất, nhận thông báo (email hoặc notification trong app)
3. File tự động tải xuống hoặc có link tải trong thông báo

---

## Lưu Ý Khi Sử Dụng

- **Dữ liệu theo thời gian thực:** Tùy vào cấu hình, dữ liệu có thể được cache từ 5 phút đến 1 giờ. Nếu cần dữ liệu mới nhất, hỏi Admin về thời gian cập nhật.
- **File Excel định dạng sẵn:** Khi xuất Excel với template, file giữ nguyên màu sắc, font chữ và bố cục của template gốc. Dữ liệu được điền vào đúng vị trí placeholder.
- **Quyền truy cập:** Nếu không thấy template cần dùng, liên hệ Admin để được phân quyền.

---

## Dành Cho Admin — Tạo Data Template

### Tổng Quan Data Template

Data Template là "khuôn" của một báo cáo, gồm:
1. **SQL Query** với các tham số `{{param}}` nhúng trong câu truy vấn
2. **Form Parameters** — các trường lọc người dùng điền
3. **Template File** (tùy chọn) — file Excel/Word có placeholder để giữ định dạng

### Tạo Template Mới

1. Vào **Studio → DE → Data Templates → New Template**.
2. Điền thông tin cơ bản:

| Trường | Bắt Buộc | Ví Dụ |
|--------|----------|--------|
| **Name** | Có | `Báo cáo Doanh thu Chi nhánh` |
| **Description** | Khuyến nghị | `Xuất doanh thu theo chi nhánh và khoảng thời gian chọn` |
| **Connection** | Có | Chọn database nguồn |
| **Export Type** | Có | `excel`, `csv`, hoặc `both` |

3. **Viết SQL Query:**

```sql
SELECT 
  o.order_date,
  b.branch_name AS chi_nhanh,
  COUNT(DISTINCT o.order_id) AS so_don,
  SUM(o.revenue) AS doanh_thu,
  AVG(o.revenue) AS don_tb
FROM don_hang o
JOIN chi_nhanh b ON o.branch_id = b.id
WHERE 
  o.order_date BETWEEN {{from_date}} AND {{to_date}}
  AND b.branch_name = {{branch}}
  AND o.status IN ('paid', 'delivered')
GROUP BY o.order_date, b.branch_name
ORDER BY o.order_date
```

4. **Khai Báo Parameters:**

Mỗi `{{param}}` trong SQL cần một Parameter tương ứng:

| Parameter | Label | Type | Operator | Bắt Buộc |
|-----------|-------|------|----------|---------|
| `from_date` | Từ ngày | `date` | `>=` | Có |
| `to_date` | Đến ngày | `date` | `<=` | Có |
| `branch` | Chi nhánh | `select` | `=` | Có |

**Cấu hình Select (dropdown):**

Có 2 cách tạo danh sách lựa chọn:

*Static Options (cố định):*
```
Miền Bắc
Miền Trung
Miền Nam
```

*Dynamic Options SQL (lấy từ database):*
```sql
SELECT DISTINCT branch_name FROM chi_nhanh ORDER BY branch_name
```

5. **Upload Template File (Tùy Chọn):**

Nếu muốn xuất Excel giữ định dạng (màu sắc, logo, tiêu đề cố định):
- Chuẩn bị file Excel mẫu với các ô placeholder như `{{order_date}}`, `{{chi_nhanh}}`
- Upload file lên và map placeholder với tên cột trong SQL

6. **Cấu Hình Layout Tham Số:**

Kéo thả để sắp xếp thứ tự hiển thị các tham số trong form.

7. **Phân Quyền:**

Tab **Access Control** → chọn Role hoặc User được phép dùng template này.

8. Nhấn **Save** và **Publish**.

### Ví Dụ SQL Phức Tạp Hơn

```sql
-- Template: Top sản phẩm bán chạy theo danh mục
SELECT 
  c.category_name AS danh_muc,
  p.product_name AS san_pham,
  SUM(oi.quantity) AS so_luong_ban,
  SUM(oi.revenue) AS doanh_thu,
  RANK() OVER (PARTITION BY c.id ORDER BY SUM(oi.revenue) DESC) AS xep_hang
FROM order_items oi
JOIN san_pham p ON oi.product_id = p.id
JOIN danh_muc c ON p.category_id = c.id
WHERE 
  oi.order_date BETWEEN {{start_date}} AND {{end_date}}
  {{#if category_ids}}
  AND c.id IN ({{category_ids}})
  {{/if}}
GROUP BY c.category_name, c.id, p.product_name, p.id
HAVING RANK() <= {{top_n}}
ORDER BY c.category_name, xep_hang
```

### Sử Dụng Template Trong Pipeline

Data Template cũng có thể làm **Source** trong một Data Pipeline để tự động chạy báo cáo và đẩy dữ liệu đến đích khác (Google Sheets, database khác...).

Xem [Data Pipelines](../studio/pipelines.md).

---

## Xử Lý Sự Cố Thường Gặp

| Vấn Đề | Nguyên Nhân | Cách Xử Lý |
|---------|-------------|------------|
| Không thấy template | Chưa được phân quyền | Liên hệ Admin để cấp quyền |
| File Excel trống | Template file có lỗi placeholder | Admin kiểm tra lại file template |
| Xuất mãi không xong | Dataset quá lớn, server timeout | Giảm khoảng thời gian lọc, hoặc thêm điều kiện lọc hơn |
| Số liệu sai | SQL template có lỗi logic | Admin kiểm tra lại SQL và test với nhiều tham số |
| Không có quyền xuất PDF | Server chưa cài PDF converter | Liên hệ Admin cấu hình tính năng PDF |
