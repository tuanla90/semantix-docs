# Data Templates (Mẫu Báo Cáo)

**Điều hướng:** Studio → DE → Data Templates

Data Template là **mẫu báo cáo tái sử dụng được** — kết hợp một câu truy vấn SQL với các tham số lọc động và (tùy chọn) file Excel/Word định sẵn. Người dùng cuối không cần biết SQL — họ chỉ điền tham số và nhấn xuất.

---

## Vị Trí Trong Hệ Sinh Thái

```
Admin (Studio) tạo Data Template
    ↓
Người dùng cuối dùng qua Data Portal
    ↓ (hoặc)
Data Pipeline dùng template như một Source
```

---

## Tạo Data Template Mới

### Bước 1 — Khởi Tạo

1. Vào **Studio → DE → Data Templates → New Template**.
2. Điền thông tin cơ bản:

| Trường | Bắt Buộc | Ví Dụ |
|--------|----------|--------|
| **Name** | Có | `Báo cáo Doanh thu Chi nhánh` |
| **Description** | Khuyến nghị | `Xuất doanh thu theo chi nhánh và khoảng thời gian. Dùng cho báo cáo tháng của Regional Manager.` |
| **Connection** | Có | Chọn database nguồn dữ liệu |
| **Export Type** | Có | `excel`, `csv`, hoặc `both` |
| **Template File** | Không | Upload file Excel/Word mẫu |

### Bước 2 — Viết SQL Query

SQL Query là câu truy vấn lấy dữ liệu. Dùng cú pháp `{{param_name}}` để nhúng tham số người dùng điền.

**Ví dụ SQL cơ bản:**

```sql
SELECT 
  DATE(o.order_date) AS ngay,
  b.branch_name AS chi_nhanh,
  COUNT(DISTINCT o.order_id) AS so_don_hang,
  SUM(o.revenue) AS doanh_thu,
  AVG(o.revenue) AS gia_tri_don_tb,
  SUM(o.revenue - o.cost) AS loi_nhuan_gop
FROM don_hang o
INNER JOIN chi_nhanh b ON o.branch_id = b.id
WHERE 
  o.order_date BETWEEN {{from_date}} AND {{to_date}}
  AND o.status IN ('paid', 'delivered')
  AND b.branch_name = {{branch}}
GROUP BY DATE(o.order_date), b.branch_name
ORDER BY ngay DESC, chi_nhanh
```

**Ví dụ SQL với điều kiện tùy chọn (Handlebars-style):**

```sql
SELECT p.product_name, c.category_name, 
       SUM(oi.quantity) as so_luong, SUM(oi.revenue) as doanh_thu
FROM order_items oi
JOIN san_pham p ON oi.product_id = p.id
JOIN danh_muc c ON p.category_id = c.id
WHERE oi.order_date BETWEEN {{start_date}} AND {{end_date}}
{{#if category_id}}
  AND c.id = {{category_id}}
{{/if}}
{{#if min_revenue}}
  AND oi.revenue >= {{min_revenue}}
{{/if}}
GROUP BY p.id, c.id
ORDER BY doanh_thu DESC
LIMIT {{top_n}}
```

### Bước 3 — Khai Báo Parameters (Tham Số)

Với mỗi `{{param}}` trong SQL, tạo một Parameter tương ứng. Mỗi Parameter là một trường trong form người dùng sẽ điền.

**Cấu hình một Parameter:**

| Thuộc Tính | Bắt Buộc | Mô Tả |
|------------|----------|--------|
| **ID** | Có | Tên kỹ thuật, phải khớp với `{{id}}` trong SQL |
| **Label** | Có | Tên hiển thị thân thiện (ví dụ: "Từ ngày", "Chi nhánh") |
| **Data Type** | Có | Loại dữ liệu (xem bên dưới) |
| **Operator** | Có | Cách dùng giá trị trong SQL |
| **Required** | — | Bắt buộc điền hay không |
| **Default Value** | Không | Giá trị mặc định điền sẵn |
| **Placeholder** | Không | Gợi ý hiển thị trong ô trống |
| **Static Options** | Không | Danh sách lựa chọn cố định |
| **Dynamic Options SQL** | Không | SQL lấy danh sách lựa chọn từ database |

### Các Data Type

| Data Type | Hiển Thị Trong Form | Ví Dụ |
|-----------|--------------------|----|
| `text` | Ô nhập văn bản | Tên khách hàng, mã đơn |
| `number` | Ô nhập số | Giá trị tối thiểu, số lượng |
| `date` | Date picker | Ngày bắt đầu |
| `date_range` | 2 date picker (từ - đến) | Khoảng ngày báo cáo |
| `select` | Dropdown đơn | Chọn chi nhánh, chọn trạng thái |
| `multiselect` | Dropdown nhiều lựa chọn | Chọn nhiều sản phẩm |
| `boolean` | Toggle/Checkbox | Chỉ lấy khách hàng mới |

### Các Operator

| Operator | Áp Dụng Trong SQL | Dùng Với Type |
|----------|-------------------|--------------|
| `equals` | `column = {{param}}` | text, number, select |
| `not_equals` | `column != {{param}}` | text, select |
| `contains` | `column LIKE '%{{param}}%'` | text |
| `starts_with` | `column LIKE '{{param}}%'` | text |
| `greater_than` | `column > {{param}}` | number |
| `less_than` | `column < {{param}}` | number |
| `between` | `column BETWEEN {{from}} AND {{to}}` | date_range |
| `in` | `column IN ({{param}})` | multiselect |
| `gte` | `column >= {{param}}` | number, date |
| `lte` | `column <= {{param}}` | number, date |

---

## Ví Dụ Cấu Hình Parameters Thực Tế

### Template: Báo Cáo Doanh Thu Chi Nhánh

| ID | Label | Type | Required | Cấu Hình |
|----|-------|------|----------|---------|
| `from_date` | Từ ngày | `date` | Có | Default: đầu tháng hiện tại |
| `to_date` | Đến ngày | `date` | Có | Default: hôm nay |
| `branch` | Chi nhánh | `select` | Có | Dynamic SQL: `SELECT branch_name FROM chi_nhanh ORDER BY branch_name` |

### Template: Xuất Khách Hàng Theo Phân Khúc

| ID | Label | Type | Required | Cấu Hình |
|----|-------|------|----------|---------|
| `segment` | Phân khúc | `multiselect` | Có | Static Options: VIP, Gold, Silver, New |
| `min_revenue` | Doanh thu tối thiểu (VNĐ) | `number` | Không | Default: 0 |
| `region` | Khu vực | `select` | Không | Static Options: Miền Bắc, Miền Trung, Miền Nam, Tất cả |
| `export_date` | Tính đến ngày | `date` | Có | Default: hôm nay |

---

## Upload Template File (Excel/Word)

Nếu người dùng cần nhận file Excel **có định dạng sẵn** (logo, màu sắc, font, tiêu đề cố định):

### Chuẩn Bị File Template Excel

1. Tạo file Excel với layout mong muốn (logo, tiêu đề, định dạng cột).
2. Trong vùng cần điền dữ liệu, đặt placeholder:
   - Dạng cột: đặt tên cột SQL ở dòng header: `ngay`, `chi_nhanh`, `so_don_hang`...
   - Dữ liệu sẽ tự động điền từ dòng tiếp theo xuống
3. Có thể giữ các ô cố định (tiêu đề, footer, đơn vị) — chúng không bị ghi đè

### Upload và Mapping

1. Trong tab **Template File**, nhấn **Upload File**.
2. Chọn file Excel `.xlsx` từ máy tính.
3. Hệ thống hiển thị preview file và yêu cầu mapping:
   - Chỉ định **Sheet nào** trong file dùng để điền dữ liệu
   - Chỉ định **dòng bắt đầu** để ghi dữ liệu
4. Nhấn **Save Mapping**.

---

## Cấu Hình Layout Tham Số

Sau khi tạo xong Parameters, tab **Layout** cho phép:
- **Kéo thả** để sắp xếp thứ tự hiển thị các trường
- **Nhóm thành hàng**: 2 trường trong 1 hàng (hiển thị song song)
- **Thêm tiêu đề nhóm**: Phân chia form thành các section

**Ví dụ Layout:**

```
[Thông tin báo cáo]
Từ ngày [____]    Đến ngày [____]
Chi nhánh [____________________]

[Bộ lọc nâng cao]
Phân khúc [____]    Khu vực [____]
Giá trị tối thiểu [____]
```

---

## Phân Quyền Truy Cập Template

Tab **Access Control** → chỉ định ai có thể dùng template trong Data Portal:

| Phân Quyền | Dùng Khi |
|------------|---------|
| **Public** | Mọi user đã đăng nhập đều dùng được |
| **Role-based** | Chỉ user có Role cụ thể (ví dụ: Sales Manager) |
| **User-based** | Chỉ định từng user cụ thể |

---

## Sử Dụng Template Trong Pipeline

Data Template cũng có thể là **Source** trong Data Pipeline để tự động chạy và đẩy kết quả:

1. Tạo Pipeline mới (Studio → DE → Data Pipelines).
2. Source Type: **Data Template**.
3. Chọn Template.
4. Điền tham số cố định (ví dụ: `from_date = yesterday`, `branch = HN`).
5. Đặt lịch chạy định kỳ.

Xem [Data Pipelines](pipelines.md).

---

## Kiểm Tra Template

Trước khi publish, test template với dữ liệu thực:

1. Trong trang chỉnh sửa template, nhấn **Preview / Test Run**.
2. Điền tham số test.
3. Nhấn **Run** — hệ thống chạy SQL và hiển thị kết quả mẫu (100 dòng đầu).
4. Kiểm tra số liệu có đúng không.
5. Nếu có template file, nhấn **Download Sample** để xem file Excel mẫu.

---

## Lỗi Thường Gặp

| Lỗi | Nguyên Nhân | Cách Xử Lý |
|-----|-------------|------------|
| SQL syntax error | Lỗi cú pháp trong câu SQL | Kiểm tra lại SQL, chạy thử trong database tool |
| Parameter not found | Tên param trong SQL không khớp ID của Parameter | Đảm bảo `{{from_date}}` trong SQL = ID `from_date` trong Parameters |
| Empty result | Tham số lọc quá hẹp hoặc không có dữ liệu | Test với tham số rộng hơn |
| Excel template error | Placeholder không khớp tên cột SQL | Kiểm tra tên cột trong SQL và tên header trong Excel |
| Timeout | Query quá phức tạp, dataset quá lớn | Thêm INDEX vào database, hoặc thêm điều kiện lọc bắt buộc |
