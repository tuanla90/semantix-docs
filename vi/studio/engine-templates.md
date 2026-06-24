# Engine Templates

**Điều hướng:** Studio → DE → Engine Templates

Engine Templates là các **cấu hình kết nối tái sử dụng được** (reusable connection templates) dành cho các loại database engine cụ thể. Thay vì mỗi lần tạo Connection phải nhập lại toàn bộ thông số kỹ thuật, bạn định nghĩa một Engine Template và dùng lại nhiều lần.

---

## Mục Đích

Engine Templates giải quyết vấn đề:

| Tình Huống Thực Tế | Giải Pháp |
|--------------------|-----------|
| Toàn bộ database đều là PostgreSQL trên AWS RDS với SSL bắt buộc | Tạo 1 template "AWS RDS PostgreSQL (SSL)" — người dùng chỉ điền host/user/pass |
| Admin muốn ẩn cấu hình phức tạp (pool size, timeout) khỏi người dùng | Đặt cấu hình mặc định trong template |
| Nhiều team tạo Connection với cài đặt không nhất quán | Chuẩn hóa qua Engine Template |

---

## Các Engine Templates Mặc Định

Semantix đã có sẵn các template cơ bản cho:
- PostgreSQL
- MySQL
- Microsoft SQL Server
- BigQuery
- Snowflake
- ClickHouse
- Google Sheets
- DuckDB
- SQLite

Bạn có thể **tùy chỉnh** các template mặc định này hoặc **tạo thêm** template mới với cấu hình riêng.

---

## Tạo Engine Template Mới

### Bước 1 — Mở Form

1. Vào **Studio → DE → Engine Templates → New Template**.
2. Form cấu hình mở ra.

### Bước 2 — Thông Tin Cơ Bản

| Thuộc tính | Bắt Buộc | Ví Dụ | Mô Tả |
|------------|----------|--------|--------|
| **Name** | Có | `AWS RDS PostgreSQL (SSL Required)` | Tên hiển thị khi người dùng chọn template |
| **Engine Type** | Có | `PostgreSQL` | Loại database engine |
| **Icon** | Không | Upload file SVG/PNG | Biểu tượng nhận diện |
| **Description** | Không | `PostgreSQL trên AWS RDS, yêu cầu SSL` | Mô tả giúp người dùng chọn đúng template |
| **Active** | — | Bật | Tắt để ẩn khỏi danh sách khi tạo Connection |

### Bước 3 — Các Loại Engine Type Hỗ Trợ

| Engine Type | Dùng Cho |
|------------|---------|
| `PostgreSQL` | PostgreSQL, Amazon Redshift |
| `MySQL` | MySQL, MariaDB |
| `MSSQL` | Microsoft SQL Server |
| `BigQuery` | Google BigQuery |
| `Snowflake` | Snowflake |
| `ClickHouse` | ClickHouse |
| `GoogleSheets` | Google Sheets |
| `DuckDB` | DuckDB (file local) |
| `SQLite` | SQLite (file local) |

### Bước 4 — Default Config (Cấu Hình Mặc Định)

Default Config là JSON chứa các giá trị mặc định khi người dùng tạo Connection từ template này. Người dùng vẫn có thể ghi đè (override) từng giá trị.

**Ví dụ Default Config cho PostgreSQL với SSL:**

```json
{
  "port": 5432,
  "ssl_mode": "require",
  "ssl_reject_unauthorized": true,
  "connection_timeout": 30,
  "query_timeout": 300,
  "pool_min": 1,
  "pool_max": 10,
  "idle_timeout": 600
}
```

**Ví dụ Default Config cho BigQuery:**

```json
{
  "location": "asia-southeast1",
  "timeout": 60000,
  "maximum_bytes_billed": 1073741824
}
```

**Ví dụ Default Config cho ClickHouse:**

```json
{
  "port": 8443,
  "protocol": "https",
  "compress": true,
  "compression_method": "gzip"
}
```

### Bước 5 — Cấu Hình Fields (Các Trường Nhập Liệu)

Định nghĩa các trường mà người dùng sẽ thấy khi tạo Connection từ template này. Có thể **ẩn** các trường kỹ thuật phức tạp:

| Trường | Loại | Có Thể Ẩn | Ví Dụ |
|--------|------|-----------|--------|
| `host` | text | Không | Địa chỉ database server |
| `port` | number | Có (dùng giá trị mặc định) | 5432 |
| `database` | text | Không | Tên database |
| `username` | text | Không | Tài khoản đăng nhập |
| `password` | password | Không | Mật khẩu |
| `ssl_mode` | select | Có | Cố định = "require" |
| `pool_max` | number | Có | Cố định = 10 |

### Bước 6 — Lưu

Nhấn **Save**. Template xuất hiện trong danh sách và sẵn sàng dùng khi tạo Connection mới.

---

## Quản Lý Templates

### Xem Danh Sách

Trang Engine Templates hiển thị:
- Tên và icon của template
- Engine Type
- Số Connection đang dùng template này
- Trạng thái Active/Inactive

### Chỉnh Sửa Template

1. Nhấn vào tên template hoặc biểu tượng **Edit (✏️)**.
2. Cập nhật Default Config hoặc thông tin khác.
3. Nhấn **Save**.

> **Lưu ý:** Thay đổi template **không ảnh hưởng** đến các Connection đã tạo từ template đó. Chỉ Connection mới mới dùng config mới.

### Bật/Tắt Template

- **Bật** (`Active = On`): Template hiển thị trong danh sách khi tạo Connection mới.
- **Tắt** (`Active = Off`): Template ẩn khỏi danh sách — người dùng không thể chọn khi tạo Connection mới. Connection cũ không bị ảnh hưởng.

### Xóa Template

Template chỉ xóa được khi **không còn Connection nào đang dùng**. Nếu vẫn còn Connection tham chiếu, hệ thống sẽ cảnh báo và liệt kê danh sách Connection đó.

---

## Mối Quan Hệ Template → Connection

Khi người dùng tạo Connection mới:
1. Chọn Engine Template (ví dụ: "AWS RDS PostgreSQL")
2. Template cung cấp cấu hình mặc định (port=5432, ssl_mode="require"...)
3. Người dùng chỉ cần điền thêm: Host, Database, Username, Password
4. Nhấn Test và Save

```
Engine Template "AWS RDS PostgreSQL"
    ↓ (cung cấp: port, ssl, timeout...)
Connection "Production Database" (người dùng điền: host, user, pass)
Connection "Staging Database"   (người dùng điền: host, user, pass)
Connection "Analytics DB"       (người dùng điền: host, user, pass)
```

---

## Ví Dụ Template Thực Tế

### Template: Google BigQuery (Vietnam Region)

```
Name: BigQuery (Vietnam - asia-southeast1)
Engine Type: BigQuery
Description: Google BigQuery với dataset ở region Đông Nam Á để giảm latency
Default Config:
{
  "location": "asia-southeast1",
  "timeout": 60000,
  "maximum_bytes_billed": 5368709120,
  "use_query_cache": true
}
```

### Template: ClickHouse HTTPS

```
Name: ClickHouse (HTTPS)
Engine Type: ClickHouse
Description: ClickHouse qua HTTPS với compression
Default Config:
{
  "port": 8443,
  "protocol": "https",
  "compress": true,
  "compression_method": "gzip",
  "send_progress_in_http_headers": false
}
```

### Template: PostgreSQL Read-Only (Local Network)

```
Name: PostgreSQL Read-Only (Internal)
Engine Type: PostgreSQL
Description: PostgreSQL trên mạng nội bộ, không cần SSL
Default Config:
{
  "port": 5432,
  "ssl_mode": "disable",
  "connection_timeout": 10,
  "query_timeout": 120,
  "pool_max": 5
}
```
