# ClickHouse

## Các Trường Bắt Buộc

| Trường | Mô Tả | Mặc Định |
|-------|-------------|---------|
| Host | Hostname của server ClickHouse | |
| Port | Cổng giao tiếp HTTP | `8443` (HTTPS) / `8123` (HTTP) |
| Database | Tên database | |
| Username | Tài khoản ClickHouse | |
| Password | Mật khẩu | |
| Protocol | `https` hoặc `http` | `https` |

## Các Bước Thực Hiện

1. Đi tới **Admin → Connections → New Connection → ClickHouse**
2. Điền thông tin chi tiết kết nối
3. Nhấn **Test Connection → Save**

> ⚠️ Đối với ClickHouse Cloud, luôn sử dụng `https` với cổng `8443`.
