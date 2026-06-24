# Sessions (Phiên Đăng Nhập)

**Điều hướng:** Admin → Monitoring → Sessions

Trang Sessions cho phép Admin giám sát và quản lý tất cả phiên đăng nhập đang hoạt động trong hệ thống — phát hiện truy cập bất thường và xử lý sự cố bảo mật.

---

## Xem Active Sessions

Trang hiển thị danh sách tất cả người dùng đang đăng nhập với thông tin:

| Thông Tin | Mô Tả |
|-----------|-------|
| **Email / Tên** | Danh tính người dùng |
| **Role** | Vai trò trong hệ thống |
| **Login Method** | Email/Password hoặc SSO (tên provider) |
| **Lần đăng nhập** | Thời điểm đăng nhập hiện tại |
| **Last Active** | Lần cuối tương tác với hệ thống |
| **IP Address** | Địa chỉ IP kết nối |
| **Location** | Vị trí địa lý ước tính từ IP |
| **User Agent** | Trình duyệt và hệ điều hành |
| **Số lần đăng nhập** | Tổng số lần đăng nhập trong kỳ lọc |

---

## Lọc Sessions

**Bộ lọc Date Range:** Xem lịch sử đăng nhập trong khoảng thời gian cụ thể — không chỉ sessions đang active.

**Tìm theo Email:** Gõ email user để xem lịch sử đăng nhập của họ.

---

## Kết Thúc Phiên

### Terminate Một Session

1. Tìm người dùng trong danh sách
2. Nhấn **Terminate** bên cạnh
3. Xác nhận → User bị đăng xuất ngay lập tức
4. Lần tiếp theo họ thao tác, sẽ được redirect về trang login

**Khi nào cần:**
- Nhân viên báo bị mất laptop/điện thoại → kết thúc session để bảo vệ tài khoản
- Phát hiện đăng nhập từ IP lạ → kết thúc session nghi ngờ
- Sau khi thay đổi quyền user → buộc login lại với quyền mới

### Terminate All Sessions

Nhấn **Terminate All Sessions** — kết thúc toàn bộ phiên đang hoạt động của tất cả users.

**Khi nào dùng:**
- Phát hiện breach bảo mật → buộc tất cả đăng nhập lại
- Cập nhật lớn về permissions — tất cả users phải login lại để nhận quyền mới
- Bảo trì hệ thống — đảm bảo không ai đang thao tác khi restart

> Hành động Terminate All được ghi vào Audit Logs với thông tin Admin thực hiện.

---

## Phát Hiện Truy Cập Bất Thường

Sử dụng Sessions để phát hiện các dấu hiệu đáng ngờ:

### Đăng Nhập Từ IP Lạ

**Dấu hiệu:** User thường đăng nhập từ IP công ty (203.x.x.x) nhưng xuất hiện session từ IP nước ngoài.

**Hành động:**
1. Terminate session nghi ngờ
2. Kiểm tra Audit Logs → action `user.login` của user đó
3. Liên hệ user để xác nhận
4. Nếu xác nhận bị hack: yêu cầu đổi mật khẩu ngay

### Session Hoạt Động Ngoài Giờ Làm Việc

**Dấu hiệu:** Last Active lúc 2 giờ sáng trong khi user bình thường làm việc 8-17h.

**Hành động:**
1. Kiểm tra Audit Logs → xem query nào đã chạy
2. Nếu không bình thường: terminate session + yêu cầu đổi mật khẩu

### Nhiều Session Từ Nhiều Nơi

**Dấu hiệu:** Cùng một tài khoản có session từ 3 IP khác nhau cùng lúc.

**Hành động:**
1. Terminate tất cả sessions của user đó
2. Yêu cầu đặt lại mật khẩu
3. Cân nhắc bắt buộc SSO + MFA

---

## Chính Sách Session Timeout

Cấu hình trong **Admin → Config → Security Settings**:

| Cài Đặt | Mô Tả | Mặc Định |
|---------|--------|---------|
| **Idle Timeout** | Tự động đăng xuất sau X phút không hoạt động | 480 phút (8 giờ) |
| **Absolute Timeout** | Tự động đăng xuất sau X giờ dù đang dùng | 24 giờ |
| **Remember Me Duration** | Thời hạn session khi chọn "Ghi nhớ đăng nhập" | 30 ngày |

**Khuyến nghị cho tổ chức có dữ liệu nhạy cảm:**
- Idle Timeout: 120 phút (2 giờ)
- Absolute Timeout: 10 giờ
- Tắt "Remember Me" hoặc giới hạn 7 ngày
