# Sessions (Phiên Đăng Nhập)

**Điều hướng:** Admin → Monitoring → Sessions

Sessions cho phép Admin xem và quản lý các phiên đăng nhập đang hoạt động trong hệ thống — bao gồm lịch sử đăng nhập, thiết bị, IP, và khả năng kết thúc phiên từ xa.

## Tính Năng Chính

- Xem danh sách người dùng đang đăng nhập
- Xem lịch sử đăng nhập theo người dùng (số lần, IP, thiết bị, thời điểm)
- Kết thúc phiên (terminate session) của một người dùng cụ thể
- Kết thúc tất cả phiên (terminate all) trong trường hợp khẩn cấp
- Lọc theo khoảng thời gian đăng nhập

## Xem Active Sessions

1. Vào **Admin → Monitoring → Sessions**
2. Trang hiển thị danh sách người dùng đang active với thông tin:

| Thông Tin | Mô Tả |
|-----------|-------|
| **Email / Tên** | Danh tính người dùng |
| **Lần đăng nhập cuối** | Thời điểm đăng nhập gần nhất |
| **IP Address** | Địa chỉ IP kết nối |
| **User Agent** | Trình duyệt / thiết bị |
| **Số lần đăng nhập** | Tổng số lần đăng nhập trong kỳ |

## Kết Thúc Phiên

- **Terminate Session**: Nhấn nút **Terminate** bên cạnh người dùng để đăng xuất họ ngay lập tức.
- **Terminate All Sessions**: Kết thúc toàn bộ phiên đang hoạt động — dùng trong tình huống khẩn cấp về bảo mật.

## Lọc Theo Thời Gian

Dùng bộ chọn **Date Range** để xem lịch sử đăng nhập trong một khoảng thời gian cụ thể.

## Lưu Ý

Tính năng này chỉ dành cho Admin. Hoạt động terminate session được ghi vào Audit Logs.
