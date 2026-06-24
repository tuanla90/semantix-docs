# MySQL / MariaDB

Hướng dẫn đầy đủ để kết nối MySQL hoặc MariaDB với Semantix.

---

## Các Trường Kết Nối

| Trường | Mô Tả | Mặc Định |
|--------|--------|---------|
| **Display Name** | Tên hiển thị trong Semantix | |
| **Host** | Hostname hoặc IP của MySQL server | |
| **Port** | Cổng MySQL | `3306` |
| **Database** | Tên database muốn kết nối | |
| **Username** | Tài khoản đăng nhập | |
| **Password** | Mật khẩu | |
| **SSL** | Bật/tắt kết nối SSL | Tắt |
| **Default Cache TTL** | Thời gian cache kết quả (giây) | `3600` |

---

## Các Bước Kết Nối

1. Vào **Studio → DE → Connections → New Connection**
2. Chọn **MySQL**
3. Điền đầy đủ thông tin kết nối
4. Nhấn **Test Connection** — chờ "Connection successful"
5. Nhấn **Save**

---

## Tạo User Chỉ Đọc

Luôn tạo user riêng cho Semantix với quyền SELECT tối thiểu:

```sql
-- Tạo user, chỉ cho phép kết nối từ IP của Semantix server
CREATE USER 'semantix_reader'@'IP_SERVER_SEMANTIX' IDENTIFIED BY 'MatKhauAnToan123!';

-- Cấp quyền SELECT trên toàn bộ database
GRANT SELECT ON ten_database.* TO 'semantix_reader'@'IP_SERVER_SEMANTIX';

-- Áp dụng ngay
FLUSH PRIVILEGES;
```

**Lưu ý quan trọng:**
- Thay `IP_SERVER_SEMANTIX` bằng IP thực của server Semantix để tăng bảo mật
- Nếu dùng `%` thay vì IP cụ thể, user có thể kết nối từ bất kỳ IP nào — không khuyến nghị cho production
- Chỉ cấp SELECT, không cấp INSERT/UPDATE/DELETE/DROP

**Kiểm tra user đã được tạo đúng:**
```sql
SHOW GRANTS FOR 'semantix_reader'@'IP_SERVER_SEMANTIX';
```

---

## Cấu Hình SSL

Bật SSL nếu MySQL server yêu cầu hoặc nếu kết nối qua internet:

```sql
-- Kiểm tra SSL status trên MySQL server
SHOW VARIABLES LIKE 'have_ssl';
-- Value: YES → server hỗ trợ SSL
-- Value: DISABLED → server không hỗ trợ SSL
```

**Yêu cầu SSL cho một user cụ thể:**
```sql
ALTER USER 'semantix_reader'@'IP_SERVER_SEMANTIX' REQUIRE SSL;
FLUSH PRIVILEGES;
```

---

## Whitelist IP Semantix

### MySQL trên server riêng

Kiểm tra cấu hình `bind-address` trong `/etc/mysql/mysql.conf.d/mysqld.cnf`:
```ini
# Cho phép kết nối từ tất cả IP (sau đó giới hạn bằng GRANT)
bind-address = 0.0.0.0
```

Nếu có firewall (UFW):
```bash
sudo ufw allow from IP_SEMANTIX to any port 3306
```

### MySQL trên AWS RDS

1. AWS Console → **RDS → Databases → Chọn instance**
2. Tab **Connectivity & security → VPC security groups**
3. Nhấn vào Security Group → **Inbound rules → Edit**
4. Thêm rule: **MySQL/Aurora (3306)** từ IP Semantix/32
5. **Save rules**

### MySQL trên Google Cloud SQL

1. Google Cloud Console → **SQL → Chọn instance → Connections**
2. **Authorized networks → Add network**
3. Điền IP Semantix với tên mô tả
4. **Save**

---

## Xử Lý Lỗi Thường Gặp

| Lỗi | Nguyên Nhân | Giải Pháp |
|-----|-------------|-----------|
| `Connection refused` | MySQL không chạy hoặc sai host/port | Kiểm tra `systemctl status mysql` trên server |
| `Access denied for user` | Sai password hoặc user chưa được cấp quyền từ IP này | Kiểm tra lại user và GRANT |
| `Host 'X' is not allowed` | IP Semantix chưa được phép kết nối | Tạo lại user với `'@'IP_SEMANTIX'` |
| `Unknown database` | Sai tên database (phân biệt hoa/thường trên Linux) | Kiểm tra lại tên database: `SHOW DATABASES;` |
| `SSL connection error` | SSL bắt buộc nhưng chưa bật trong Semantix | Bật SSL trong cài đặt connection |
| `Too many connections` | MySQL đạt giới hạn max_connections | Tăng `max_connections` hoặc dùng connection pool |

**Kiểm tra từ terminal trước khi cấu hình Semantix:**
```bash
mysql -h HOST -P 3306 -u semantix_reader -p ten_database
# Nhập password → thành công nếu hiện dấu nhắc mysql>
```

---

## MariaDB

MariaDB tương thích hoàn toàn với MySQL. Dùng cùng cấu hình kết nối MySQL:

| Điểm Khác | MySQL | MariaDB |
|-----------|-------|---------|
| Port mặc định | 3306 | 3306 (giống nhau) |
| SSL | Hỗ trợ | Hỗ trợ |
| JSON functions | Bản 5.7.8+ | Bản 10.2+ |
| Window functions | Bản 8.0+ | Bản 10.2+ |

> Nếu dùng MariaDB phiên bản cũ (< 10.2), một số Calculated Fields dùng Window Functions sẽ không hoạt động.

---

## Tối Ưu Hiệu Năng

Để AI queries chạy nhanh hơn, thêm INDEX vào các cột thường dùng trong WHERE và GROUP BY:

```sql
-- Kiểm tra các bảng lớn (nhiều dòng) trong database
SELECT table_name, table_rows
FROM information_schema.tables
WHERE table_schema = 'ten_database'
ORDER BY table_rows DESC;

-- Thêm index cho cột ngày/thời gian (thường dùng nhất)
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
```

> Sau khi thêm index, các query có điều kiện `WHERE created_at BETWEEN...` sẽ nhanh hơn đáng kể, đặc biệt với bảng hàng triệu dòng.
