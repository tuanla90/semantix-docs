# Các Database Khác

Hướng dẫn kết nối SQL Server, DuckDB, Databricks, Trino/Presto, và SQLite với Semantix.

---

## Microsoft SQL Server (MSSQL)

### Các Trường Kết Nối

| Trường | Mô Tả | Mặc Định |
|--------|--------|---------|
| **Display Name** | Tên hiển thị trong Semantix | |
| **Host** | Hostname hoặc IP của SQL Server | |
| **Port** | Cổng SQL Server | `1433` |
| **Database** | Tên database | |
| **Username** | Tài khoản SQL Server | |
| **Password** | Mật khẩu | |
| **Encrypt** | Mã hóa kết nối TLS | Bật |
| **Trust Server Certificate** | Chấp nhận self-signed certificate | Tắt |

### Cấu Hình Kết Nối

1. Vào **Studio → DE → Connections → New Connection → SQL Server**
2. Điền thông tin kết nối
3. Nếu gặp lỗi SSL với certificate tự ký: bật **Trust Server Certificate**
4. **Test Connection → Save**

### Tạo User Chỉ Đọc

```sql
-- Tạo login
CREATE LOGIN semantix_reader WITH PASSWORD = 'MatKhauAnToan123!';

-- Tạo user trong database cụ thể
USE ten_database;
CREATE USER semantix_reader FOR LOGIN semantix_reader;

-- Cấp quyền SELECT
ALTER ROLE db_datareader ADD MEMBER semantix_reader;
```

### Whitelist IP Trên Windows Server

Mở Windows Firewall:
1. **Control Panel → Windows Firewall → Advanced Settings**
2. **Inbound Rules → New Rule**
3. Chọn Port → TCP → Specific local ports: `1433`
4. Allow the connection → chỉ from IP Semantix

### Lỗi Thường Gặp SQL Server

| Lỗi | Giải Pháp |
|-----|-----------|
| `Login failed for user` | Kiểm tra SQL Server Authentication mode (phải bật Mixed Mode) |
| `Cannot open database` | User chưa được cấp quyền database |
| `A network-related error` | Kiểm tra firewall, SQL Server Browser service đang chạy không |
| `SSL Provider error` | Bật "Trust Server Certificate" trong kết nối |

---

## DuckDB

DuckDB là database nhúng (embedded) chạy ngay trong process — không cần server riêng. Phù hợp cho phân tích dữ liệu cục bộ với file CSV, Parquet.

### Các Trường Kết Nối

| Trường | Mô Tả | Mặc Định |
|--------|--------|---------|
| **Display Name** | Tên hiển thị | |
| **File Path** | Đường dẫn tuyệt đối đến file `.duckdb` trên server | `:memory:` |

### Chế Độ In-Memory

Dùng `:memory:` để tạo database chỉ tồn tại trong RAM — hữu ích khi muốn import và phân tích file CSV nhanh:

```sql
-- Trong DuckDB: đọc trực tiếp file CSV
SELECT * FROM read_csv_auto('/path/to/data.csv');

-- Đọc file Parquet
SELECT * FROM parquet_scan('/path/to/data.parquet');

-- Đọc nhiều file cùng lúc
SELECT * FROM read_csv_auto('/data/*.csv');
```

### File Path Cần Truy Cập Được

File `.duckdb` phải nằm trên **cùng server chạy Semantix** và Semantix process phải có quyền đọc file đó.

---

## Databricks

### Các Trường Kết Nối

| Trường | Mô Tả | Ví Dụ |
|--------|--------|-------|
| **Display Name** | Tên hiển thị | |
| **Host** | Databricks workspace hostname | `adb-1234567890.12.azuredatabricks.net` |
| **HTTP Path** | Đường dẫn HTTP của SQL Warehouse | `/sql/1.0/warehouses/abc123` |
| **Token** | Personal Access Token hoặc Service Principal token | `dapi...` |
| **Catalog** | Unity Catalog tên (nếu có) | `main` |
| **Schema** | Tên schema | `default` |

### Lấy HTTP Path

1. Trong Databricks workspace → **SQL Warehouses**
2. Chọn warehouse → tab **Connection details**
3. Copy **HTTP path**

### Lấy Personal Access Token

1. Databricks workspace → ảnh avatar góc trên phải → **Settings**
2. Tab **Developer → Access tokens → Generate new token**
3. Đặt tên và thời hạn → **Generate**
4. Copy token (chỉ hiển thị một lần)

### Quyền Cần Có

Tài khoản/service principal cần:
- `CAN USE` trên SQL Warehouse
- `SELECT` trên các bảng trong catalog/schema muốn query

---

## Trino / Presto

### Các Trường Kết Nối

| Trường | Mô Tả | Mặc Định |
|--------|--------|---------|
| **Display Name** | Tên hiển thị | |
| **Host** | Hostname Trino coordinator | |
| **Port** | Cổng Trino | `443` (HTTPS) / `8080` (HTTP) |
| **Catalog** | Tên catalog (ví dụ: `hive`, `mysql`, `postgresql`) | |
| **Schema** | Tên schema trong catalog | |
| **Username** | Tên user | |
| **Password** | Mật khẩu (tùy chọn, tùy cấu hình auth) | |
| **Protocol** | `https` hoặc `http` | `https` |

### Lưu Ý Trino vs Presto

Trino (fork của Presto) và PrestoSQL tương thích về giao thức — dùng cùng cấu hình kết nối. Semantix hỗ trợ cả hai.

### Xác Thực Trino

Trino hỗ trợ nhiều phương thức xác thực:
- **PASSWORD**: Username + password (cấu hình trong Trino `config.properties`)
- **CERTIFICATE**: Client certificate
- **KERBEROS**: Môi trường Hadoop enterprise
- **NONE**: Không cần xác thực (dev/test)

---

## SQLite

### Các Trường Kết Nối

| Trường | Mô Tả |
|--------|--------|
| **Display Name** | Tên hiển thị |
| **File Path** | Đường dẫn tuyệt đối đến file `.sqlite` hoặc `.db` trên server |

### Yêu Cầu

- File SQLite phải nằm trên **cùng server chạy Semantix**
- Semantix process phải có quyền **đọc** file
- File path phải là đường dẫn tuyệt đối (bắt đầu bằng `/`)

**Ví dụ:**
```
/var/data/myapp.sqlite
/home/ubuntu/databases/analytics.db
```

### Giới Hạn SQLite

- Không hỗ trợ đa người dùng đồng thời tốt
- Không có khái niệm user/permission native
- Phù hợp cho: ứng dụng nhỏ, testing, phân tích nhanh từ app mobile export

---

## So Sánh Nhanh Các Database

| Database | Phù Hợp Với | Không Phù Hợp |
|----------|-------------|--------------|
| **SQL Server** | Enterprise Windows, hệ thống ERP, SAP | Cloud-native, cost-sensitive |
| **DuckDB** | Phân tích file CSV/Parquet, prototyping | Đa người dùng, production OLTP |
| **Databricks** | Big Data Lakehouse, ML + Analytics | Dữ liệu nhỏ (quá expensive) |
| **Trino/Presto** | Query nhiều nguồn dữ liệu cùng lúc | Single-database simple analytics |
| **SQLite** | Dev, testing, ứng dụng nhỏ | Production, dữ liệu lớn |
