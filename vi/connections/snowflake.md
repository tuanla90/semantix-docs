# Snowflake

## Các Trường Bắt Buộc

| Trường | Mô Tả | Mặc Định |
|-------|-------------|---------|
| Account | Định danh tài khoản Snowflake (ví dụ: `xy12345.us-east-1`) | |
| Username | Tài khoản Snowflake | |
| Password | Mật khẩu | |
| Database | Tên database | |
| Schema | Tên schema | `PUBLIC` |
| Warehouse | Tên compute warehouse | |
| Role | Quyền (role) trên Snowflake (tùy chọn) | |

## Các Bước Thực Hiện

1. Đi tới **Admin → Connections → New Connection → Snowflake**
2. Điền thông tin chi tiết tài khoản của bạn
3. Nhấn **Test Connection → Save**

## Cách Tìm Định Danh Tài Khoản (Account Identifier)

Trong Snowflake, đi tới **Admin → Accounts** và sao chép định danh tài khoản. Nó trông giống như sau:

```
xy12345.us-east-1
```

hoặc đối với các tài khoản mới hơn:

```
myorg-myaccount
```

## Phân Quyền (Permissions)

Tạo một role riêng biệt dành cho Semantix với quyền chỉ đọc (read-only):

```sql
CREATE ROLE semantix_reader;
GRANT USAGE ON DATABASE your_db TO ROLE semantix_reader;
GRANT USAGE ON SCHEMA your_db.public TO ROLE semantix_reader;
GRANT SELECT ON ALL TABLES IN SCHEMA your_db.public TO ROLE semantix_reader;
GRANT ROLE semantix_reader TO USER semantix_user;
```
