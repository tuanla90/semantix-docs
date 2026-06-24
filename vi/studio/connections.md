# Kết Nối Dữ Liệu (Connections)

**Điều hướng:** Studio → DE → Connections

Connection khai báo cho Semantix biết nguồn dữ liệu nằm ở đâu và cách đăng nhập. Đây là bước nền tảng bắt buộc — mọi Data Model, Pipeline, và Data Template đều cần có ít nhất một Connection hoạt động.

---

## Tổng Quan

Semantix hỗ trợ kết nối với hầu hết các loại database phổ biến. Thông tin đăng nhập được **mã hóa AES-256** khi lưu trữ — mật khẩu không bao giờ hiển thị lại sau khi Save.

### Các Loại Nguồn Dữ Liệu Hỗ Trợ

| Loại Nguồn | Thông Tin Cần Thiết | Ghi Chú |
|------------|---------------------|---------|
| **PostgreSQL** | Host, Port, Database, User, Password | Hỗ trợ SSL/TLS |
| **MySQL / MariaDB** | Host, Port, Database, User, Password | Port mặc định: 3306 |
| **Microsoft SQL Server** | Host, Port, Database, User, Password | Port mặc định: 1433 |
| **Amazon Redshift** | Host, Port, Database, User, Password | Dựa trên PostgreSQL |
| **BigQuery** | JSON Service Account Key | Không cần host/port |
| **Snowflake** | Account, Warehouse, Database, User, Password | Cần Account identifier |
| **ClickHouse** | HTTP Endpoint, User, Password | Hỗ trợ HTTP và HTTPS |
| **Google Sheets** | Spreadsheet ID + Tên Sheet | Cần chia sẻ với Service Account |
| **DuckDB** | Đường dẫn file `.duckdb` | Dùng cho file local |
| **SQLite** | Đường dẫn file `.sqlite` | Dùng cho file local |

---

## Tạo Connection Mới

### Bước 1 — Mở Form Tạo Connection

1. Vào **Studio** từ sidebar trái.
2. Trong phần **DE**, chọn **Connections**.
3. Nhấn nút **New Connection** ở góc trên bên phải trang.
4. Danh sách Engine Templates hiện ra — chọn loại database phù hợp.

> **Engine Templates** là gì? Đây là các cấu hình mẫu có sẵn cho từng loại database. Admin có thể tạo thêm template tùy chỉnh (ví dụ: "AWS RDS PostgreSQL với SSL"). Xem [Engine Templates](engine-templates.md).

### Bước 2 — Điền Thông Tin Kết Nối

**Trường chung cho tất cả loại:**

| Trường | Bắt Buộc | Mô Tả |
|--------|----------|--------|
| **Name** | Có | Tên hiển thị trong Semantix (ví dụ: "Production Database", "Báo cáo Tháng") |
| **Description** | Không | Ghi chú mục đích của Connection |

**Trường cho PostgreSQL / MySQL / MSSQL / Redshift:**

| Trường | Ví Dụ | Ghi Chú |
|--------|--------|---------|
| **Host** | `db.company.com` hoặc `192.168.1.100` | Địa chỉ server database |
| **Port** | `5432` | Mặc định: PG=5432, MySQL=3306, MSSQL=1433 |
| **Database** | `analytics_db` | Tên database (schema) cụ thể |
| **Username** | `semantix_readonly` | Nên dùng tài khoản chỉ đọc (read-only) |
| **Password** | `••••••••` | Được mã hóa khi lưu |
| **SSL Mode** | `require` | Khuyến nghị bật trên production |
| **SSL Certificate** | (tùy chọn) | Paste nội dung certificate nếu server yêu cầu |

**Trường cho BigQuery:**

| Trường | Mô Tả |
|--------|--------|
| **Project ID** | ID của Google Cloud Project |
| **Service Account JSON** | Paste toàn bộ nội dung file JSON của Service Account |
| **Dataset** | (Tùy chọn) Dataset mặc định |

**Trường cho Snowflake:**

| Trường | Ví Dụ | Ghi Chú |
|--------|--------|---------|
| **Account** | `abc12345.us-east-1` | Xem trong Snowflake Admin → Organization |
| **Warehouse** | `COMPUTE_WH` | Warehouse để chạy query |
| **Database** | `ANALYTICS` | Database Snowflake |
| **Schema** | `PUBLIC` | (Tùy chọn) |
| **Username** | `semantix_user` | |
| **Password** | `••••••••` | |

**Trường cho ClickHouse:**

| Trường | Ví Dụ |
|--------|--------|
| **Host** | `clickhouse.company.com` |
| **Port** | `8123` (HTTP) hoặc `8443` (HTTPS) |
| **Database** | `default` |
| **Username** | `semantix` |
| **Password** | `••••••••` |

### Bước 3 — Kiểm Tra Kết Nối

Nhấn **Test Connection**. Semantix sẽ thử kết nối và trả về một trong hai kết quả:
- ✅ **Connection successful** — Sẵn sàng sử dụng.
- ❌ **Connection failed** + thông báo lỗi cụ thể (sai mật khẩu, không reach được host, sai port...).

### Bước 4 — Cài Đặt Cache (Tùy Chọn)

Trước khi Save, bạn có thể thiết lập **Default Cache TTL** — thời gian lưu kết quả truy vấn trong bộ nhớ đệm:

| TTL | Phù Hợp Với |
|-----|-------------|
| `0` | Dữ liệu real-time — không cache, mỗi lần hỏi đều query thẳng DB |
| `5 phút` | Dữ liệu cập nhật thường xuyên |
| `1 giờ` (mặc định) | Dashboard phân tích thông thường |
| `24 giờ` | Báo cáo theo ngày, dữ liệu lịch sử |

### Bước 5 — Lưu

Nhấn **Save**. Connection xuất hiện trong danh sách với trạng thái **Active**.

---

## Kết Nối Google Sheets — Hướng Dẫn Chi Tiết

Google Sheets yêu cầu thêm bước cấp quyền. Làm theo đúng thứ tự sau:

### Bước 1 — Chia sẻ file với Service Account

1. Mở Google Sheet bạn muốn kết nối.
2. Nhấn nút **Share** (Chia sẻ) ở góc trên bên phải.
3. Trong ô "Add people and groups", dán địa chỉ service account:
   ```
   semantix@gen-lang-client-0852507499.iam.gserviceaccount.com
   ```
4. Đổi quyền thành **Viewer** (Người xem).
5. Bỏ chọn "Notify people" nếu không muốn gửi email.
6. Nhấn **Share**.

### Bước 2 — Lấy Spreadsheet ID

Mở file Google Sheets trong trình duyệt. URL có dạng:
```
https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/edit#gid=0
```
Phần `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms` chính là **Spreadsheet ID**.

### Bước 3 — Tạo Connection trong Semantix

1. Chọn Engine Template **Google Sheets**.
2. Điền:
   - **Spreadsheet ID**: ID vừa lấy ở bước 2.
   - **Sheet Name**: Tên tab (sheet) cần kết nối (ví dụ: `Doanh thu T6`).
3. Nhấn **Test Connection** → **Save**.

> **Lưu ý:** Mỗi Connection Google Sheets chỉ kết nối đến **một tab** (sheet). Nếu file có nhiều tab cần dùng, tạo nhiều Connection riêng, mỗi cái cho một tab.

---

## Quản Lý Connections

### Xem Danh Sách

Trang **Studio → DE → Connections** liệt kê tất cả connections với các thông tin:
- **Name** và **Engine Type**
- **Trạng thái** (Active / Inactive)
- **Số lượng Models** đang dùng connection này
- **Cache TTL** mặc định
- **Người tạo** và **Ngày tạo**

### Chỉnh Sửa Connection

1. Nhấn vào tên Connection hoặc biểu tượng **Edit (✏️)**.
2. Cập nhật thông tin (Host mới, mật khẩu mới...).
3. Luôn **Test Connection** lại sau khi sửa.
4. Nhấn **Save**.

> **Lưu ý:** Khi chỉnh sửa mật khẩu, bạn phải nhập lại toàn bộ vì mật khẩu cũ không được hiển thị.

### Xóa Connection

Connection chỉ có thể xóa khi **không còn Data Model nào đang dùng**. Nếu vẫn còn model đang dùng, hệ thống sẽ cảnh báo và liệt kê các model đó.

---

## Kiến Trúc Mạng & Bảo Mật

### IP Whitelist (Mở Firewall)

Semantix kết nối từ các IP cố định. Bạn cần **whitelist các IP này** trên firewall / security group của database:

Liên hệ Semantix support để lấy danh sách IP chính xác cho môi trường của bạn.

### Kết Nối Qua SSH Tunnel (Sắp Có)

Nếu database không expose ra internet, bạn có thể kết nối qua SSH tunnel. Tính năng này đang được phát triển.

### Nguyên Tắc Tối Thiểu Quyền (Principle of Least Privilege)

Tạo một tài khoản database riêng cho Semantix với **chỉ quyền đọc** (SELECT):

```sql
-- PostgreSQL
CREATE USER semantix_user WITH PASSWORD 'strong_password';
GRANT CONNECT ON DATABASE analytics_db TO semantix_user;
GRANT USAGE ON SCHEMA public TO semantix_user;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO semantix_user;

-- MySQL
CREATE USER 'semantix_user'@'%' IDENTIFIED BY 'strong_password';
GRANT SELECT ON analytics_db.* TO 'semantix_user'@'%';
FLUSH PRIVILEGES;
```

---

## Hướng Dẫn Chi Tiết Theo Từng Database

Xem cấu hình đầy đủ cho từng loại database:

- [PostgreSQL / Redshift](../connections/postgresql.md)
- [MySQL](../connections/mysql.md)
- [BigQuery](../connections/bigquery.md)
- [Snowflake](../connections/snowflake.md)
- [ClickHouse](../connections/clickhouse.md)
- [Google Sheets](../connections/google-sheets.md)
- [Các Database Khác](../connections/others.md)

---

## Xử Lý Lỗi Kết Nối Thường Gặp

| Thông Báo Lỗi | Nguyên Nhân Thường Gặp | Cách Xử Lý |
|---------------|------------------------|------------|
| `Connection refused` | Database không chạy hoặc sai port | Kiểm tra service DB đang chạy, kiểm tra port |
| `Authentication failed` | Sai username hoặc password | Nhập lại credentials |
| `Database not found` | Sai tên database | Kiểm tra tên database chính xác (phân biệt hoa/thường) |
| `SSL connection required` | Server yêu cầu SSL | Bật SSL Mode trong Connection |
| `Timeout` | IP bị chặn bởi firewall | Whitelist IP của Semantix |
| `Permission denied` | User không có quyền SELECT | Cấp thêm quyền cho user |
| `Spreadsheet not found` | Google Sheets chưa chia sẻ đúng | Chia sẻ với service account email |
