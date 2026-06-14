# Engine Templates

**Điều hướng:** Studio → DE → Engine Templates

Engine Templates là các cấu hình kết nối tái sử dụng được (reusable connection templates) dành cho các loại database engine cụ thể. Thay vì mỗi lần tạo Connection phải nhập lại toàn bộ thông số kỹ thuật, bạn có thể định nghĩa một Engine Template và dùng lại nhiều lần.

## Mục Đích

Engine Templates hữu ích khi:
- Nhiều Connection dùng cùng một loại engine (ví dụ: tất cả đều là PostgreSQL trên AWS RDS)
- Muốn chuẩn hóa cấu hình kết nối (SSL, timeout, pool size...) cho toàn tổ chức
- Ẩn các thông số kỹ thuật phức tạp khỏi người dùng khi tạo Connection

## Tạo Engine Template Mới

1. Vào **Studio → DE → Engine Templates → New Template**
2. Điền thông tin:

| Thuộc tính | Mô tả |
|------------|-------|
| **Name** | Tên template (ví dụ: `AWS RDS PostgreSQL`) |
| **Engine Type** | Loại database: PostgreSQL, MySQL, BigQuery, Snowflake, v.v. |
| **Icon** | Biểu tượng hiển thị |
| **Default Config** | Cấu hình mặc định (JSON) — host, port, SSL, pool size... |
| **Active** | Bật/tắt template này |

3. Nhấn **Save**.

## Quản Lý Template

- **Bật/tắt** (toggle): Tắt một template để ẩn nó khỏi danh sách khi tạo Connection mới.
- **Sửa**: Cập nhật cấu hình mặc định.
- **Xóa**: Chỉ xóa được khi không còn Connection nào đang dùng template này.

## Lưu Ý

Engine Templates được dùng làm nền tảng cho module **Connections**. Khi tạo Connection mới, người dùng chọn Engine Template trước, sau đó chỉ cần điền thêm thông tin xác thực (credentials) cụ thể.
