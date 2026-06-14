# Data Templates

**Điều hướng:** Studio → DE → Data Templates

Data Templates là các mẫu báo cáo có thể tái sử dụng, kết hợp một câu truy vấn SQL với các tham số lọc động và tùy chọn một file template Excel/Word định sẵn. Người dùng cuối sử dụng các template này qua [Data Portal](../data-portal/README.md).

## Mục Đích

- Cho phép Admin định nghĩa báo cáo một lần, người dùng cuối dùng nhiều lần
- Người dùng chỉ điền tham số (ngày, chi nhánh...) mà không cần biết SQL
- Hỗ trợ xuất CSV, Excel (với định dạng template sẵn), và PDF

## Tạo Data Template Mới

1. Vào **Studio → DE → Data Templates → New Template**
2. Điền thông tin cơ bản:

| Thuộc tính | Mô tả |
|------------|-------|
| **Name** | Tên template hiển thị trong Data Portal |
| **Description** | Mô tả mục đích báo cáo |
| **Connection** | Nguồn dữ liệu (Connection) |
| **Export Type** | `csv`, `excel`, hoặc `both` |
| **Template File** | File Excel/Word mẫu (tùy chọn — dùng để giữ định dạng) |

3. Viết **SQL Query** — câu truy vấn lấy dữ liệu, có thể dùng tham số dạng `{{param_name}}`
4. Khai báo **Parameters** (tham số):

| Thuộc tính Tham Số | Ý Nghĩa |
|-------------------|---------|
| **ID** | Tên kỹ thuật, phải khớp với `{{id}}` trong SQL |
| **Label** | Tên hiển thị thân thiện cho người dùng |
| **Data Type** | `text`, `number`, `date`, `date_range`, `select` |
| **Operator** | `equals`, `contains`, `between` (khoảng ngày), `in` (chọn nhiều) |
| **Required** | Bắt buộc điền hay không |
| **Default Value** | Giá trị mặc định |
| **Static Options** | Danh sách lựa chọn cố định (cho type `select`) |
| **Dynamic Options SQL** | SQL để lấy danh sách lựa chọn động từ database |

5. Cấu hình **Layout** tham số (kéo thả để sắp xếp vị trí các trường)
6. Nhấn **Save**

## Sử Dụng Template trong Pipeline

Data Templates cũng có thể được dùng làm **Source** trong một Data Pipeline. Xem [Data Pipelines](pipelines.md).

## Lưu Ý

- Template file Excel/Word phải có các placeholder `{{column_name}}` hoặc theo cấu trúc bảng chuẩn.
- Để xuất PDF, cần có template file và cấu hình server hỗ trợ chuyển đổi.
- Phân quyền: `create_data_template`, `edit_data_template`, `delete_data_template`.
