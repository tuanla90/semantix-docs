# Câu Hỏi Thường Gặp (FAQs) & Khắc Phục Sự Cố

Tổng hợp các câu hỏi và sự cố phổ biến nhất khi sử dụng Semantix, kèm hướng dẫn giải quyết chi tiết.

---

## Kết Nối Dữ Liệu

### ❌ Lỗi "Connection refused" hoặc "Timeout"

**Triệu chứng:** Nhấn Test Connection → thất bại với lỗi "Connection refused" hoặc bị timeout sau vài giây.

**Nguyên nhân phổ biến:**
1. Database server không chạy
2. Sai địa chỉ Host hoặc Port
3. Firewall chặn kết nối từ IP của Semantix

**Cách xử lý:**
1. Kiểm tra database server đang chạy: `ping [host]` và `telnet [host] [port]`
2. Đảm bảo firewall/security group **whitelist IP Semantix** cho phép kết nối inbound
3. Kiểm tra lại Host và Port trong Connection settings
4. Với RDS/Cloud database: kiểm tra Security Group, VPC rules

---

### ❌ Lỗi "Authentication failed" hoặc "Wrong password"

**Nguyên nhân:** Sai username hoặc password.

**Cách xử lý:**
1. Thử kết nối trực tiếp từ terminal để xác nhận credentials còn đúng:
   ```bash
   psql -h [host] -U [user] -d [database]
   ```
2. Reset mật khẩu user database nếu cần
3. Nhập lại credentials trong Connection (mật khẩu cũ không hiển thị)

---

### ❌ Lỗi "Permission denied" hoặc "Access denied"

**Triệu chứng:** Kết nối thành công nhưng không đọc được dữ liệu.

**Cách xử lý — PostgreSQL:**
```sql
GRANT CONNECT ON DATABASE [database_name] TO semantix_user;
GRANT USAGE ON SCHEMA public TO semantix_user;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO semantix_user;
-- Cho bảng mới trong tương lai:
ALTER DEFAULT PRIVILEGES IN SCHEMA public 
  GRANT SELECT ON TABLES TO semantix_user;
```

**Cách xử lý — MySQL:**
```sql
GRANT SELECT ON [database_name].* TO 'semantix_user'@'%';
FLUSH PRIVILEGES;
```

---

### ❌ Google Sheets không kết nối được

**Triệu chứng:** Lỗi "Spreadsheet not found" hoặc "Permission denied".

**Cách xử lý:**
1. Kiểm tra đã **Share file Google Sheets** với đúng địa chỉ service account:
   ```
   semantix@gen-lang-client-0852507499.iam.gserviceaccount.com
   ```
2. Quyền Share phải là **Viewer** trở lên (không phải Restricted)
3. Kiểm tra Spreadsheet ID có đúng không (lấy từ URL)
4. Kiểm tra tên Sheet (tab) có viết đúng chính xác (phân biệt hoa/thường)

---

## AI Chat & Truy Vấn

### ❌ AI trả lời sai số liệu

**Triệu chứng:** Kết quả AI trả về khác với số liệu thực trong database.

**Cách kiểm tra:**
1. Nhấn **View SQL** trong kết quả chat — xem câu SQL đã tạo ra
2. Chạy câu SQL đó trực tiếp trong database tool để so sánh
3. Phân tích xem AI tạo SQL sai ở đâu

**Nguyên nhân và giải pháp:**

| Triệu Chứng Cụ Thể | Nguyên Nhân | Giải Pháp |
|--------------------|-------------|-----------|
| Tính cả đơn hủy vào doanh thu | Metric thiếu Filter | Thêm `Filter: status != 'cancelled'` vào Metric |
| Dùng sai cột | Cột chưa có Description | Viết Description chi tiết, thêm Synonyms |
| Tính trùng bản ghi | Dùng COUNT thay vì COUNT_DISTINCT | Đổi Aggregation sang COUNT_DISTINCT |
| JOIN sai bảng | Relations chưa đúng | Kiểm tra Relations trong Data Model |
| Kết quả NULL/0 | Điều kiện lọc quá hẹp | Xem lại Filter trong Metric |

---

### ❌ AI không hiểu câu hỏi tiếng Việt

**Triệu chứng:** AI trả lời "Tôi không hiểu câu hỏi này" hoặc trả về kết quả hoàn toàn không liên quan.

**Cách xử lý:**
1. Kiểm tra **Language** trong AI Assistant được đặt là `vi`
2. Thêm **Synonyms** cho Metrics: nếu người dùng gõ "doanh thu" nhưng Metric tên là `revenue`, cần thêm synonym "doanh thu"
3. Viết mô tả (Description) bằng cả tiếng Việt và tiếng Anh
4. Thử gõ lại câu hỏi cụ thể hơn: thêm tên cột, thêm khoảng thời gian
5. Kiểm tra AI Provider có đang Active không

---

### ❌ Lỗi "Column not found" trong SQL

**Nguyên nhân:** Schema database đã thay đổi (thêm/đổi tên cột) nhưng Data Model chưa cập nhật.

**Cách xử lý:**
1. Vào **Studio → DABI → Data Models** → chọn model bị ảnh hưởng
2. Tab **Columns** → nhấn **Sync Schema** để tải lại danh sách cột từ database
3. Kiểm tra và cập nhật các cột bị thay đổi tên hoặc bị xóa
4. Nhấn **Save**

---

### ❌ AI Chat bị chậm hoặc timeout

**Nguyên nhân có thể:**
- Query database chạy lâu
- AI Provider đang tải chậm
- Dữ liệu cache cũ

**Cách xử lý:**
1. Thêm **INDEX** vào database cho các cột thường dùng làm điều kiện lọc (WHERE, GROUP BY)
2. Kiểm tra trạng thái AI Provider trong **Studio → DSAI → AI Providers** — nhấn Test
3. Thêm điều kiện thời gian để thu hẹp dữ liệu (ví dụ: "tháng này" thay vì "tất cả")
4. Đặt Cache TTL hợp lý trong Connection settings

---

## Dashboards

### ❌ Widget bị kẹt "Loading..."

**Nguyên nhân phổ biến:**
- Query dưới widget chạy rất lâu
- Redis cache bị lỗi

**Cách xử lý:**
1. Click vào widget → **⋮** → **View SQL** để xem câu query
2. Test câu query đó trực tiếp trong database — đo thời gian chạy
3. Nếu query chậm: thêm INDEX cho cột WHERE/GROUP BY
4. Kiểm tra Redis đang chạy bình thường trong server logs
5. Nhấn **Refresh** (🔄) trên Dashboard để xóa cache

---

### ❌ Dashboard không cập nhật dữ liệu mới

**Nguyên nhân:** Dữ liệu đang được phục vụ từ cache cũ.

**Cách xử lý:**
1. Nhấn nút **Refresh** (🔄) ở góc trên phải Dashboard — làm mới toàn bộ widget
2. Hoặc nhấn **⋮** trên widget cụ thể → **Refresh Data**
3. Nếu muốn dữ liệu real-time: vào widget settings → Cache TTL = `0`

---

### ❌ Không chia sẻ được Dashboard

**Nguyên nhân:** Không có quyền `share:dashboards`.

**Cách xử lý:**
1. Liên hệ Admin để cấp thêm quyền `share:dashboards` cho Role của bạn
2. Admin vào: **Admin → Access → Roles** → chỉnh sửa Role của user

---

## Phân Quyền & Tài Khoản

### ❌ Không thấy một số tính năng hoặc menu

**Nguyên nhân:** Role của bạn không có permission tương ứng.

**Các tính năng và permission cần có:**

| Tính Năng | Permission Cần |
|-----------|---------------|
| Vào Studio | `manage:data_models` hoặc `manage:connections` (bất kỳ) |
| Dùng AI Chat | `use:chat` |
| Xem Dashboard | `view:dashboards` |
| Tạo/sửa Dashboard | `edit:dashboards` |
| Vào Admin | `manage:users` hoặc `admin:all` |
| Tạo Data Pipeline | `manage:pipelines` |

**Cách xử lý:** Liên hệ Admin để kiểm tra và cập nhật Role.

---

### ❌ Không nhận được email mời đăng ký

**Nguyên nhân có thể:**
- Email bị lọc vào Spam
- SMTP server chưa được cấu hình đúng
- Lỗi gõ email

**Cách xử lý:**
1. Kiểm tra thư mục **Spam/Junk** trong email
2. Yêu cầu Admin resend invitation: Admin → Users → tìm user → **Resend Invite**
3. Admin kiểm tra cấu hình SMTP trong **Admin → Config → Platform**

---

### ❌ SSO không hoạt động

**Triệu chứng:** Nhấn "Đăng nhập với [Provider]" → lỗi hoặc không chuyển hướng.

**Checklist kiểm tra:**
1. **ACS URL (Callback URL)** trong IdP (Okta/Azure AD) có đúng không:
   `https://your-domain.com/api/auth/sso/{id}/callback`
2. **Entity ID** của SP khớp giữa Semantix và IdP
3. **Certificate** (SAML) chưa hết hạn
4. **Client ID / Client Secret** (OIDC) đúng
5. Có ít nhất 1 tài khoản Admin local active để dùng khi SSO lỗi

Xem chi tiết: [SSO Configuration](../admin/sso.md)

---

## Notifications & Alerts

### ❌ Không nhận được cảnh báo Telegram

**Checklist:**
1. Bot đã được **thêm vào group** chưa?
2. **Chat ID** có đúng không? (Group ID thường có dấu `-` ở đầu, ví dụ: `-1001234567890`)
3. Bot Token còn hợp lệ không? (Kiểm tra với BotFather)
4. Alert đang ở trạng thái **Active** chưa?
5. Nhấn **Test Connection** trong Channel settings để test thử

---

### ❌ Scheduled Report không gửi email

**Checklist:**
1. Cấu hình SMTP trong **Admin → Config → Platform** đúng chưa?
2. Email của người nhận có tồn tại không?
3. Xem **Admin → Monitoring → Audit Logs** lọc theo action "send_report" để tìm lỗi
4. Kiểm tra email có bị lọc vào Spam không

---

## Hiệu Năng

### ❌ Hệ thống chạy chậm với nhiều user

**Giải pháp theo thứ tự ưu tiên:**

1. **Tăng Cache TTL:** Dashboard không cần real-time nên tăng cache lên 4-24 giờ
2. **Thêm INDEX database:** Cột thường dùng trong WHERE/GROUP BY phải có index
3. **Nâng cấp Redis:** Đảm bảo Redis có đủ RAM để lưu cache
4. **Scale server:** Tăng CPU/RAM của Semantix server
5. **Liên hệ hỗ trợ:** Để được tư vấn kiến trúc scale

---

## Liên Hệ Hỗ Trợ

Nếu không tìm thấy giải pháp trong tài liệu này:

| Kênh | Thông Tin |
|------|-----------|
| **Email** | support@semantix.vn |
| **Documentation** | Tài liệu đầy đủ tại thư mục này |
| **Logs** | Gửi server logs (đặc biệt error logs) khi báo lỗi |

**Thông tin cần cung cấp khi báo lỗi:**
- Phiên bản Semantix (xem trong Admin → About)
- Mô tả chi tiết sự cố và bước tái hiện
- Screenshot hoặc error message đầy đủ
- Server logs liên quan (nếu có quyền truy cập)
