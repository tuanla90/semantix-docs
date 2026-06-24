# Các Nguồn Dữ Liệu Hỗ Trợ

Semantix kết nối trực tiếp đến database hoặc kho dữ liệu của bạn — không cần copy dữ liệu ra ngoài. Mọi truy vấn đều chạy **real-time trên nguồn gốc**, giúp đảm bảo dữ liệu luôn mới nhất.

---

## Danh Sách Nguồn Dữ Liệu

| Loại | Engine/Database | Tài Liệu Chi Tiết |
|------|----------------|-------------------|
| **Cơ sở dữ liệu quan hệ** | PostgreSQL | [PostgreSQL / Redshift](postgresql.md) |
| | MySQL / MariaDB | [MySQL](mysql.md) |
| | SQL Server (MSSQL) | [Các Database Khác](others.md) |
| | SQLite | [Các Database Khác](others.md) |
| **Kho dữ liệu đám mây** | Google BigQuery | [BigQuery](bigquery.md) |
| | Snowflake | [Snowflake](snowflake.md) |
| | ClickHouse | [ClickHouse](clickhouse.md) |
| | Amazon Redshift | [PostgreSQL / Redshift](postgresql.md) |
| | Databricks | [Các Database Khác](others.md) |
| | Trino / Presto | [Các Database Khác](others.md) |
| **File / Spreadsheet** | Google Sheets | [Google Sheets](google-sheets.md) |
| | DuckDB | [Các Database Khác](others.md) |

---

## Cơ Chế Kết Nối

Semantix **không lưu trữ dữ liệu của bạn**. Khi người dùng đặt câu hỏi:

```
[Câu hỏi người dùng]
        ↓
  AI tạo SQL dựa trên Schema
        ↓
  SQL chạy trực tiếp trên Database của bạn
        ↓
  Kết quả trả về trình duyệt (có thể được cache theo TTL)
```

Chỉ **cấu trúc bảng (schema)** được gửi đến AI — không có dữ liệu thực.

---

## Quản Lý Connections

### Xem Danh Sách Connections

Vào **Studio → DE → Connections** để xem toàn bộ connections trong hệ thống.

Mỗi connection hiển thị:
- Tên và loại database
- Trạng thái kết nối (Healthy / Error)
- Thời điểm kiểm tra lần cuối
- Số Data Models đang dùng connection này

### Tạo Connection Mới

1. Nhấn **New Connection** ở góc trên phải
2. Chọn loại database từ danh sách
3. Điền thông tin kết nối (host, port, user, password, database)
4. Nhấn **Test Connection** — đảm bảo kết nối thành công trước khi lưu
5. Nhấn **Save**

### Chỉnh Sửa Connection

Nhấn vào tên connection → chỉnh sửa các trường → **Save**.

> Khi thay đổi thông tin connection, tất cả Data Models đang dùng connection này sẽ tự động sử dụng thông tin mới.

### Xóa Connection

Nhấn **⋮** bên cạnh connection → **Delete**. Chỉ xóa được nếu không có Data Model nào đang dùng connection này.

---

## Bảo Mật Credentials

- Tất cả mật khẩu và API key được mã hóa bằng **AES-256-GCM** trước khi lưu vào database
- Khóa mã hóa (`ENCRYPTION_KEY`) chỉ tồn tại trên server của bạn
- Sau khi lưu, mật khẩu không hiển thị lại — chỉ có thể ghi đè bằng giá trị mới
- Credentials không bao giờ xuất hiện trong API response hay logs

---

## Cache & Hiệu Năng

Mỗi connection có cài đặt **Default Cache TTL** — thời gian kết quả truy vấn được lưu cache:

| TTL | Phù Hợp Với |
|-----|-------------|
| `0` | Dữ liệu real-time (giao dịch, stock, IoT) |
| `5 phút` | Dashboard cần cập nhật thường xuyên |
| `1 giờ` | Dashboard báo cáo ngày |
| `24 giờ` | Dữ liệu lịch sử, ít thay đổi |

> Cache được lưu trong Redis. Nhấn **Refresh** (🔄) trên Dashboard để xóa cache thủ công.

---

## Tạo User Chỉ Đọc

Semantix chỉ cần quyền **SELECT** — không cần INSERT, UPDATE, DELETE. Luôn tạo user riêng với quyền tối thiểu:

**PostgreSQL:**
```sql
CREATE USER semantix_reader WITH PASSWORD 'mat_khau_an_toan';
GRANT CONNECT ON DATABASE ten_database TO semantix_reader;
GRANT USAGE ON SCHEMA public TO semantix_reader;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO semantix_reader;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT ON TABLES TO semantix_reader;
```

**MySQL:**
```sql
CREATE USER 'semantix_reader'@'IP_SERVER_SEMANTIX' IDENTIFIED BY 'mat_khau_an_toan';
GRANT SELECT ON ten_database.* TO 'semantix_reader'@'IP_SERVER_SEMANTIX';
FLUSH PRIVILEGES;
```

---

## Whitelist IP Semantix

Nếu database nằm sau firewall hoặc security group (AWS, GCP, Azure), bạn cần **cho phép IP của Semantix server** kết nối vào cổng database.

Xem IP của Semantix server:
- Nếu self-hosted: IP là IP của server chạy Semantix
- Nếu cloud: liên hệ support@semantix.vn để lấy danh sách IP

---

## Tiếp Theo

Chọn loại database để xem hướng dẫn chi tiết:

- [PostgreSQL / Redshift](postgresql.md)
- [MySQL / MariaDB](mysql.md)
- [BigQuery](bigquery.md)
- [Snowflake](snowflake.md)
- [ClickHouse](clickhouse.md)
- [Google Sheets](google-sheets.md)
- [SQL Server, DuckDB, Databricks, Trino](others.md)
