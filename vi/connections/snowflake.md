# Snowflake

Hướng dẫn đầy đủ để kết nối Snowflake Data Cloud với Semantix.

---

## Các Trường Kết Nối

| Trường | Mô Tả | Mặc Định |
|--------|--------|---------|
| **Display Name** | Tên hiển thị trong Semantix | |
| **Account** | Account Identifier của Snowflake (ví dụ: `xy12345.us-east-1`) | |
| **Username** | Tài khoản Snowflake | |
| **Password** | Mật khẩu | |
| **Database** | Tên database trong Snowflake | |
| **Schema** | Tên schema | `PUBLIC` |
| **Warehouse** | Tên Virtual Warehouse để chạy queries | |
| **Role** | Role Snowflake (tùy chọn — dùng role mặc định nếu để trống) | |
| **Default Cache TTL** | Thời gian cache kết quả (giây) | `3600` |

---

## Các Bước Kết Nối

1. Vào **Studio → DE → Connections → New Connection**
2. Chọn **Snowflake**
3. Điền đầy đủ thông tin
4. Nhấn **Test Connection**
5. Nhấn **Save**

---

## Tìm Account Identifier

Account Identifier là chuỗi định danh duy nhất cho Snowflake account của bạn. Có hai format:

**Format cũ (Legacy):**
```
xy12345.us-east-1
```

**Format mới (Organization):**
```
myorg-myaccount
```

**Cách tìm trong Snowflake UI:**
1. Đăng nhập Snowflake
2. Nhấn vào tên account ở góc dưới trái
3. Copy **Account Identifier** (không phải URL đầy đủ)

Hoặc chạy trong Snowflake:
```sql
SELECT CURRENT_ACCOUNT();
-- Kết quả: XY12345
```

---

## Tạo User Và Role Chỉ Đọc

**Thực tiễn tốt nhất:** Tạo role riêng cho Semantix với quyền tối thiểu:

```sql
-- Bước 1: Tạo role
CREATE ROLE semantix_reader;

-- Bước 2: Cấp quyền warehouse
GRANT USAGE ON WAREHOUSE ten_warehouse TO ROLE semantix_reader;

-- Bước 3: Cấp quyền database
GRANT USAGE ON DATABASE ten_database TO ROLE semantix_reader;

-- Bước 4: Cấp quyền schema
GRANT USAGE ON SCHEMA ten_database.PUBLIC TO ROLE semantix_reader;

-- Bước 5: Cấp SELECT tất cả bảng hiện có
GRANT SELECT ON ALL TABLES IN SCHEMA ten_database.PUBLIC TO ROLE semantix_reader;

-- Bước 6: Cấp SELECT cho bảng tạo trong tương lai
GRANT SELECT ON FUTURE TABLES IN SCHEMA ten_database.PUBLIC TO ROLE semantix_reader;

-- Bước 7: Tạo user và gán role
CREATE USER semantix_user
  PASSWORD = 'MatKhauAnToan123!'
  DEFAULT_ROLE = semantix_reader
  DEFAULT_WAREHOUSE = ten_warehouse
  MUST_CHANGE_PASSWORD = FALSE;

GRANT ROLE semantix_reader TO USER semantix_user;
```

**Kiểm tra quyền:**
```sql
SHOW GRANTS TO ROLE semantix_reader;
```

---

## Chọn Warehouse Phù Hợp

Snowflake tính phí theo thời gian warehouse chạy. Để tối ưu chi phí:

| Warehouse Size | Phù Hợp Với |
|----------------|-------------|
| X-Small | Demo, phát triển, team nhỏ (< 10 người) |
| Small | Team trung bình, queries phức tạp vừa |
| Medium | Dashboard nhiều người dùng, queries phức tạp |
| Large+ | Analytics lớn, dữ liệu hàng TB |

**Khuyến nghị:** Tạo một warehouse riêng cho Semantix với **Auto Suspend = 60 giây** để tự động tắt khi không dùng:

```sql
CREATE WAREHOUSE semantix_wh
  WAREHOUSE_SIZE = 'X-SMALL'
  AUTO_SUSPEND = 60
  AUTO_RESUME = TRUE
  INITIALLY_SUSPENDED = TRUE;
```

---

## Bảo Mật Nâng Cao

### Network Policy

Giới hạn kết nối từ IP của Semantix server:
```sql
CREATE NETWORK POLICY semantix_policy
  ALLOWED_IP_LIST = ('IP_SERVER_SEMANTIX/32');

ALTER USER semantix_user SET NETWORK_POLICY = semantix_policy;
```

### Key Pair Authentication (Không Dùng Password)

Thay vì password, dùng RSA key pair cho bảo mật cao hơn:
```sql
-- Sau khi upload public key:
ALTER USER semantix_user SET RSA_PUBLIC_KEY = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A...';
```

---

## Xử Lý Lỗi Thường Gặp

| Lỗi | Nguyên Nhân | Giải Pháp |
|-----|-------------|-----------|
| `Incorrect username or password` | Sai credentials | Thử đăng nhập trực tiếp vào Snowflake UI để xác nhận |
| `IP not allowed` | Network Policy chặn IP Semantix | Thêm IP Semantix vào Network Policy |
| `Warehouse not found` | Tên warehouse sai hoặc đã xóa | Kiểm tra `SHOW WAREHOUSES;` |
| `Schema does not exist` | Sai tên schema | Kiểm tra `SHOW SCHEMAS IN DATABASE ten_db;` |
| `Insufficient privileges` | Role thiếu quyền | Chạy lại các lệnh GRANT |
| `Account must not be empty` | Chưa điền Account Identifier | Điền đúng format (không bao gồm `.snowflakecomputing.com`) |

---

## Điểm Mạnh Của Snowflake

- **Multi-cluster**: Tự động scale để xử lý nhiều query đồng thời
- **Time Travel**: Query dữ liệu tại một thời điểm trong quá khứ (`AT TIMESTAMP => '2026-01-01'`)
- **Data Sharing**: Chia sẻ dữ liệu giữa các Snowflake accounts mà không cần copy
- **Semi-structured Data**: Hỗ trợ JSON, Parquet, Avro native với kiểu VARIANT

> Khi dùng cột kiểu VARIANT (JSON), trong Calculated Fields của Semantix dùng cú pháp: `column:field_name::STRING`
