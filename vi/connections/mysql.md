# MySQL

## Các Trường Bắt Buộc

| Trường | Mô Tả | Mặc Định |
|-------|-------------|---------|
| Host | Hostname của database server | |
| Port | Cổng (Port) database | `3306` |
| Database | Tên database | |
| Username | Tài khoản database | |
| Password | Mật khẩu database | |
| SSL | Bật SSL | Tắt (Off) |

## Các Bước Thực Hiện

1. Đi tới **Admin → Connections → New Connection → MySQL**
2. Điền các thông tin chi tiết của kết nối
3. Nhấn **Test Connection → Save**

## Phân Quyền (Permissions)

```sql
CREATE USER 'semantix_reader'@'%' IDENTIFIED BY 'your_password';
GRANT SELECT ON your_database.* TO 'semantix_reader'@'%';
FLUSH PRIVILEGES;
```

> 💡 Thay thế `%` bằng IP của server Semantix để tăng cường bảo mật.
