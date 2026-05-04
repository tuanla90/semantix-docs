# Nhật Ký Hệ Thống (Audit Logs)

Audit Logs ghi lại tất cả các thao tác quan trọng được thực hiện trong Semantix nhằm mục đích bảo mật và tuân thủ quy định.

## Truy Cập Audit Logs

Đi tới **Admin → Audit Logs**

## Những Gì Được Ghi Lại

| Hạng Mục | Các Sự Kiện |
|----------|--------|
| **Authentication** | Đăng nhập, đăng xuất, đăng nhập thất bại, đăng nhập qua SSO |
| **User Management** | Người dùng được tạo, cập nhật, vô hiệu hóa, thay đổi role |
| **Connections** | Connection được tạo, cập nhật, xóa, kiểm tra kết nối (health check) |
| **Data Access** | Các truy vấn được thực thi qua API, các phiên chat |
| **Dashboards** | Dashboard được tạo, chia sẻ, xóa |
| **Admin Actions** | API key được tạo/thu hồi, thay đổi cài đặt |

## Các Trường Trong Nhật Ký

| Trường | Mô Tả |
|-------|-------------|
| **Timestamp** | Thời gian thao tác xảy ra (UTC) |
| **User** | Người đã thực hiện thao tác |
| **Action** | Thao tác đã thực hiện (ví dụ: `login`, `create`, `delete`) |
| **Resource** | Tài nguyên bị tác động (ví dụ: `Connection`, `Dashboard`) |
| **Resource ID** | ID của mục bị tác động |
| **IP Address** | IP gốc của request |
| **User Agent** | Định danh trình duyệt hoặc API client |
| **Details** | Context bổ sung (ví dụ: các trường đã thay đổi) |

## Lọc Nhật Ký (Filtering Logs)

Sử dụng các bộ lọc ở đầu trang Audit Logs để tìm kiếm theo:
- Khoảng thời gian (Date range)
- Người dùng (User)
- Loại thao tác (Action type)
- Loại tài nguyên (Resource type)

## Thời Gian Lưu Trữ (Retention)

Mặc định, nhật ký hệ thống được lưu trữ vô thời hạn. Hãy liên hệ với quản trị viên database của bạn để thiết lập việc lưu trữ (archiving) log nếu bạn lo ngại về dung lượng ổ cứng.
