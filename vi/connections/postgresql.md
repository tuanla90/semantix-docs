# PostgreSQL / Redshift

## PostgreSQL

### Các Trường Bắt Buộc

| Trường | Mô Tả | Mặc Định |
|-------|-------------|---------|
| Host | Hostname hoặc IP của database server | |
| Port | Cổng (Port) database | `5432` |
| Database | Tên database | |
| Username | Tài khoản database | |
| Password | Mật khẩu database | |
| SSL | Bật kết nối SSL | Tắt (Off) |

### Các Bước Thực Hiện

1. Đi tới **Admin → Connections → New Connection**
2. Chọn **PostgreSQL**
3. Điền các thông tin chi tiết của kết nối
4. Nhấn **Test Connection**
5. Nhấn **Save**

### Cấu Hình SSL

Nếu PostgreSQL server của bạn yêu cầu SSL, hãy bật tùy chọn **SSL** lên. Theo mặc định, Semantix kết nối với `rejectUnauthorized: false` (chấp nhận các chứng chỉ tự ký - self-signed certificates).

Để cấu hình SSL chặt chẽ hơn, hãy thiết lập PostgreSQL server của bạn để bắt buộc sử dụng client certificates và liên hệ với quản trị viên (admin) của bạn.

### Phân Quyền (Permissions)

Semantix chỉ cần **quyền đọc (read access)** đối với các bảng mà bạn muốn truy vấn. Chúng tôi khuyên bạn nên tạo một tài khoản chỉ đọc riêng biệt:

```sql
CREATE USER semantix_reader WITH PASSWORD 'your_password';
GRANT CONNECT ON DATABASE your_database TO semantix_reader;
GRANT USAGE ON SCHEMA public TO semantix_reader;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO semantix_reader;

-- Dành cho các bảng sẽ tạo trong tương lai
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT ON TABLES TO semantix_reader;
```

---

## Amazon Redshift

Redshift sử dụng cùng một giao thức (protocol) với PostgreSQL. Hãy sử dụng cấu hình tương tự như PostgreSQL với các thông số mặc định sau:

| Trường | Giá Trị |
|-------|-------|
| Port | `5439` |
| SSL | Luôn bật |

> 💡 Đảm bảo rằng security group của Redshift cluster của bạn cho phép các kết nối đến (inbound) từ IP của server Semantix.
