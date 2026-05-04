# Kết Nối (Connections)

Một **Connection** là cách Semantix truy cập vào dữ liệu của bạn. Bạn có thể kết nối tới nhiều database và nguồn dữ liệu cùng một lúc.

## Các Nguồn Dữ Liệu Hỗ Trợ

| Loại | Engine |
|------|--------|
| **Cơ sở dữ liệu quan hệ (Relational)** | PostgreSQL, MySQL, SQL Server (MSSQL), SQLite |
| **Kho dữ liệu đám mây (Cloud Data Warehouses)** | BigQuery, Snowflake, Redshift, ClickHouse, Databricks, Trino/Presto |
| **File / Spreadsheet** | Google Sheets, DuckDB |
| **Khác** | Webhook (custom HTTP adapter) |

## Quản Lý Kết Nối

Đi tới **Admin → Connections** để xem, tạo, chỉnh sửa, hoặc xóa các kết nối.

### Trạng Thái Kết Nối (Connection Health)

Semantix tự động kiểm tra trạng thái của từng kết nối theo lịch trình. Bạn có thể xem trạng thái (Khỏe mạnh / Có vấn đề) trên trang danh sách các kết nối.

### Bảo Mật

- Tất cả các thông tin đăng nhập đều được **mã hóa ở trạng thái nghỉ (encrypted at rest)** bằng thuật toán AES-256 trước khi lưu vào database
- Các cấu hình kết nối không bao giờ bị lộ ra ngoài qua các phản hồi (responses) API
- Mỗi kết nối có thể được giới hạn phạm vi (scoped) cho các data model cụ thể

## Bước Tiếp Theo

Chọn loại database của bạn để bắt đầu:

- [PostgreSQL / Redshift](postgresql.md)
- [MySQL](mysql.md)
- [BigQuery](bigquery.md)
- [Snowflake](snowflake.md)
- [ClickHouse](clickhouse.md)
- [Google Sheets](google-sheets.md)
