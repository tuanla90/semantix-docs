# PostgreSQL / Amazon Redshift

Hướng dẫn đầy đủ để kết nối PostgreSQL hoặc Amazon Redshift với Semantix.

---

## PostgreSQL

### Các Trường Kết Nối

| Trường | Mô Tả | Mặc Định |
|--------|--------|---------|
| **Display Name** | Tên hiển thị trong Semantix (ví dụ: "Production DB") | |
| **Host** | Hostname hoặc IP của PostgreSQL server | |
| **Port** | Cổng lắng nghe của PostgreSQL | `5432` |
| **Database** | Tên database muốn kết nối | |
| **Username** | Tài khoản đăng nhập database | |
| **Password** | Mật khẩu tài khoản | |
| **SSL** | Bật/tắt kết nối SSL | Tắt |
| **Default Cache TTL** | Thời gian cache kết quả truy vấn (giây) | `3600` |

### Các Bước Kết Nối

1. Vào **Studio → DE → Connections → New Connection**
2. Chọn **PostgreSQL**
3. Điền đầy đủ các trường trên
4. Nhấn **Test Connection** — chờ thông báo "Connection successful"
5. Nhấn **Save**

### Cấu Hình SSL

**Khi nào cần bật SSL:**
- PostgreSQL server yêu cầu SSL (cấu hình `ssl = on` trong `postgresql.conf`)
- Kết nối qua internet (không phải nội mạng)
- Database trên cloud (AWS RDS, Google Cloud SQL, Azure Database)

**Khi bật SSL, Semantix sẽ:**
- Mã hóa toàn bộ traffic giữa Semantix và PostgreSQL
- Chấp nhận cả chứng chỉ tự ký (self-signed) và chứng chỉ CA-signed

**Kiểm tra PostgreSQL có yêu cầu SSL không:**
```sql
SHOW ssl;
-- Kết quả: on → cần bật SSL trong Semantix
```

### Tạo User Chỉ Đọc (Khuyến Nghị)

Semantix chỉ cần quyền **SELECT**. Tạo user riêng để giảm thiểu rủi ro:

```sql
-- Tạo user
CREATE USER semantix_reader WITH PASSWORD 'MatKhauAnToan123!';

-- Cấp quyền kết nối database
GRANT CONNECT ON DATABASE ten_database TO semantix_reader;

-- Cấp quyền đọc schema
GRANT USAGE ON SCHEMA public TO semantix_reader;

-- Cấp SELECT tất cả bảng hiện có
GRANT SELECT ON ALL TABLES IN SCHEMA public TO semantix_reader;

-- Cấp SELECT cho bảng tạo trong tương lai
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT ON TABLES TO semantix_reader;
```

Nếu dữ liệu nằm trong nhiều schema:
```sql
-- Lặp lại cho từng schema
GRANT USAGE ON SCHEMA ten_schema TO semantix_reader;
GRANT SELECT ON ALL TABLES IN SCHEMA ten_schema TO semantix_reader;
ALTER DEFAULT PRIVILEGES IN SCHEMA ten_schema
  GRANT SELECT ON TABLES TO semantix_reader;
```

### Whitelist IP Semantix

Nếu PostgreSQL nằm sau firewall hoặc trên AWS/GCP/Azure, cần cho phép IP server Semantix kết nối:

**Kiểm tra trong `pg_hba.conf`:**
```
# Cho phép IP Semantix kết nối database với SSL
hostssl  ten_database  semantix_reader  IP_SEMANTIX/32  scram-sha-256
```

**Trên AWS RDS:** Vào Security Group → Inbound rules → Thêm rule: PostgreSQL (5432) từ IP Semantix.

**Trên Google Cloud SQL:** Vào Connections → Authorized networks → Thêm IP Semantix.

### Xử Lý Lỗi Thường Gặp

| Lỗi | Nguyên Nhân | Giải Pháp |
|-----|-------------|-----------|
| `Connection refused` | Server không chạy hoặc sai host/port | Kiểm tra `pg_ctl status` trên server, kiểm tra lại host/port |
| `authentication failed` | Sai username/password | Thử kết nối bằng `psql -h host -U user` để xác nhận |
| `no pg_hba.conf entry` | IP Semantix chưa được whitelist | Thêm IP vào `pg_hba.conf` rồi `pg_ctl reload` |
| `SSL required` | Server bắt buộc SSL nhưng Semantix chưa bật | Bật SSL trong cấu hình connection |
| `permission denied for table` | User thiếu quyền SELECT | Chạy lại lệnh GRANT SELECT |
| `database does not exist` | Sai tên database | Kiểm tra lại tên database (phân biệt hoa/thường) |

### Kiểm Tra Kết Nối Từ Terminal

Trước khi kết nối trong Semantix, xác nhận credentials từ terminal của server:
```bash
psql -h HOST -p 5432 -U semantix_reader -d ten_database
# Nhập password khi được hỏi
# Thành công → hiện dấu nhắc: ten_database=>
```

---

## Amazon Redshift

Redshift dùng cùng giao thức PostgreSQL nhưng với một số điểm khác biệt quan trọng.

### Thông Số Kết Nối

| Trường | Giá Trị |
|--------|---------|
| **Host** | Endpoint của Redshift cluster (ví dụ: `cluster.abc123.us-east-1.redshift.amazonaws.com`) |
| **Port** | `5439` (mặc định của Redshift, khác PostgreSQL) |
| **Database** | Tên database trong Redshift (thường là `dev` hoặc `analytics`) |
| **Username** | Master user hoặc user riêng cho Semantix |
| **Password** | Mật khẩu |
| **SSL** | **Luôn bật** — Redshift yêu cầu SSL |

### Tìm Endpoint Redshift

Trong AWS Console → **Amazon Redshift → Clusters → Tên cluster → Properties tab → Endpoint**. Copy phần host (không bao gồm cổng `:5439`).

### Tạo User Chỉ Đọc Trên Redshift

```sql
-- Tạo user
CREATE USER semantix_reader PASSWORD 'MatKhauAnToan123!';

-- Cấp quyền schema
GRANT USAGE ON SCHEMA public TO semantix_reader;

-- Cấp SELECT tất cả bảng
GRANT SELECT ON ALL TABLES IN SCHEMA public TO semantix_reader;
```

### Whitelist IP Trên AWS

1. Vào AWS Console → **EC2 → Security Groups**
2. Tìm Security Group của Redshift cluster
3. Tab **Inbound rules → Edit inbound rules**
4. Thêm rule:
   - Type: **Redshift**
   - Port: `5439`
   - Source: IP Semantix/32
5. **Save rules**

### Điểm Khác Biệt Redshift vs PostgreSQL

| Điểm | PostgreSQL | Redshift |
|------|-----------|---------|
| Port mặc định | 5432 | 5439 |
| SSL | Tùy chọn | Bắt buộc |
| Syntax | SQL chuẩn | Hỗ trợ một số hàm riêng (LISTAGG, APPROXIMATE COUNT…) |
| Hiệu năng | Tốt với OLTP | Tối ưu cho analytical queries lớn |
| Schema browser | psql | Redshift Query Editor |
