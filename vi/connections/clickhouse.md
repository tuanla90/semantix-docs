# ClickHouse

Hướng dẫn kết nối ClickHouse với Semantix — phù hợp cho analytics trên dữ liệu lớn với hiệu năng cao.

---

## Các Trường Kết Nối

| Trường | Mô Tả | Mặc Định |
|--------|--------|---------|
| **Display Name** | Tên hiển thị trong Semantix | |
| **Host** | Hostname hoặc IP của ClickHouse server | |
| **Port** | Cổng HTTP interface | `8443` (HTTPS) hoặc `8123` (HTTP) |
| **Database** | Tên database | |
| **Username** | Tài khoản ClickHouse | `default` |
| **Password** | Mật khẩu (để trống nếu không đặt password) | |
| **Protocol** | `https` hoặc `http` | `https` |
| **Default Cache TTL** | Thời gian cache kết quả (giây) | `3600` |

---

## Các Bước Kết Nối

1. Vào **Studio → DE → Connections → New Connection**
2. Chọn **ClickHouse**
3. Điền các trường kết nối
4. Nhấn **Test Connection**
5. Nhấn **Save**

---

## HTTP vs HTTPS

Semantix kết nối ClickHouse qua **HTTP interface** (không phải native TCP protocol):

| Cấu Hình | Port | Khi Nào Dùng |
|----------|------|-------------|
| `https` + `8443` | 8443 | **Khuyến nghị** — ClickHouse Cloud, production có SSL |
| `http` + `8123` | 8123 | Local/development, kết nối nội mạng |

**ClickHouse Cloud:** Luôn dùng `https` với port `8443`.

**ClickHouse tự cài:**
- Kiểm tra port có mở không: `curl http://HOST:8123/ping` — kết quả `Ok.` là hoạt động
- Kiểm tra HTTPS: `curl https://HOST:8443/ping`

---

## Tạo User Chỉ Đọc

```sql
-- Tạo user với quyền chỉ đọc
CREATE USER semantix_reader
IDENTIFIED WITH plaintext_password BY 'MatKhauAnToan123!';

-- Cấp quyền SELECT trên database cụ thể
GRANT SELECT ON ten_database.* TO semantix_reader;

-- Cấp quyền xem schema
GRANT SHOW ON ten_database.* TO semantix_reader;
```

**Nếu dùng ClickHouse Cloud**, tạo user trong Cloud Console:
1. Vào Services → Chọn service → **SQL console**
2. Chạy các lệnh SQL trên

---

## Cấu Hình Firewall

**ClickHouse tự cài (self-hosted):**

Mở firewall cho IP Semantix:
```bash
# UFW
sudo ufw allow from IP_SEMANTIX to any port 8123
sudo ufw allow from IP_SEMANTIX to any port 8443

# iptables
iptables -A INPUT -s IP_SEMANTIX -p tcp --dport 8123 -j ACCEPT
iptables -A INPUT -s IP_SEMANTIX -p tcp --dport 8443 -j ACCEPT
```

Trong `/etc/clickhouse-server/config.xml`, đảm bảo HTTP interface đang lắng nghe:
```xml
<http_port>8123</http_port>
<https_port>8443</https_port>
<listen_host>0.0.0.0</listen_host>
```

---

## Xử Lý Lỗi Thường Gặp

| Lỗi | Nguyên Nhân | Giải Pháp |
|-----|-------------|-----------|
| `Connection refused` | Port không mở hoặc ClickHouse chưa chạy | Kiểm tra `systemctl status clickhouse-server` |
| `Authentication failed` | Sai username/password | Test trực tiếp: `curl http://HOST:8123/?user=semantix_reader&password=XXX&query=SELECT+1` |
| `SSL handshake failed` | Chọn HTTPS nhưng server không có SSL | Đổi sang HTTP hoặc cài SSL cho ClickHouse |
| `Database not found` | Sai tên database | Kiểm tra: `SHOW DATABASES` trong ClickHouse |
| `Code 516: Authentication failed` | User không tồn tại | Tạo lại user, kiểm tra: `SELECT * FROM system.users` |
| `Timeout` | Query chạy quá lâu | Thêm index, giảm phạm vi dữ liệu trong query |

---

## Tối Ưu ClickHouse Cho Analytics

ClickHouse được thiết kế cho analytics, nhưng cần cấu hình đúng:

### 1. Dùng MergeTree Engine

```sql
-- Bảng tối ưu cho analytics
CREATE TABLE orders (
    order_id    UInt64,
    customer_id UInt64,
    created_at  DateTime,
    amount      Decimal(10, 2),
    status      String
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(created_at)
ORDER BY (customer_id, created_at);
```

### 2. Partitioning Theo Thời Gian

Partition theo tháng giúp query có điều kiện ngày chỉ scan partition cần thiết:
```sql
PARTITION BY toYYYYMM(created_at)
```

### 3. Primary Key / Sorting Key

ClickHouse sort data theo `ORDER BY` — đây chính là primary key. Đặt cột thường dùng trong WHERE đầu tiên:
```sql
ORDER BY (customer_id, created_at)
-- Query: WHERE customer_id = 123 → rất nhanh
-- Query: WHERE created_at > '2026-01-01' → trung bình
```

---

## Hàm ClickHouse Phổ Biến

Trong Calculated Fields và Metrics, ClickHouse có một số hàm riêng mạnh:

```sql
-- Đếm distinct chính xác
uniq(user_id)                          -- xấp xỉ, nhanh hơn
countDistinct(user_id)                 -- chính xác

-- Quantile (phân vị)
quantile(0.95)(response_time_ms)       -- P95 latency

-- Toán tử ngày
toStartOfMonth(created_at)            -- đầu tháng
dateDiff('day', start_date, end_date) -- số ngày giữa 2 ngày
formatDateTime(created_at, '%Y-%m')   -- định dạng ngày

-- Chuỗi
splitByString(',', tags)[1]           -- lấy phần tử đầu tiên
arrayJoin(splitByString(',', tags))   -- unnest mảng
```

> Khi viết Calculated Fields cho ClickHouse, dùng hàm ClickHouse, không dùng cú pháp PostgreSQL/MySQL.
