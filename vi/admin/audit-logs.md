# Nhật Ký Hệ Thống (Audit Logs)

**Điều hướng:** Admin → Monitoring → Audit Logs

Audit Logs ghi lại mọi thao tác quan trọng trong Semantix — phục vụ giám sát bảo mật, debugging, và tuân thủ quy định.

---

## Tổng Quan

Mọi hành động đáng kể đều tạo ra một log entry. Log được lưu vào database của Semantix (không thể xóa hay sửa bởi user thông thường) và hiển thị theo thứ tự thời gian ngược (mới nhất trước).

---

## Các Sự Kiện Được Ghi Lại

### Xác Thực (Authentication)

| Sự Kiện | Khi Nào |
|---------|---------|
| `user.login` | Đăng nhập thành công |
| `user.login_failed` | Đăng nhập thất bại (sai password) |
| `user.login_sso` | Đăng nhập qua SSO |
| `user.logout` | Đăng xuất |
| `user.session_expired` | Phiên tự hết hạn |
| `user.locked` | Tài khoản bị khóa sau quá nhiều lần sai |

### Quản Lý Người Dùng

| Sự Kiện | Khi Nào |
|---------|---------|
| `user.created` | Admin tạo user mới hoặc user SSO auto-provision |
| `user.invited` | Gửi email mời |
| `user.activated` | User kích hoạt tài khoản |
| `user.deactivated` | Admin vô hiệu hóa user |
| `user.role_changed` | Thay đổi role |
| `user.deleted` | Xóa user |
| `user.password_reset` | Reset mật khẩu |

### Truy Vấn Dữ Liệu

| Sự Kiện | Khi Nào |
|---------|---------|
| `query.executed` | Query chạy qua AI Chat hoặc API |
| `query.failed` | Query thất bại (DB error, timeout) |
| `chat.session_started` | Người dùng mở AI Chat |

### Cấu Hình Hệ Thống

| Sự Kiện | Khi Nào |
|---------|---------|
| `connection.created` | Tạo connection mới |
| `connection.updated` | Sửa connection |
| `connection.deleted` | Xóa connection |
| `connection.tested` | Test connection |
| `data_model.created/updated/deleted` | Thay đổi Data Model |
| `metric.created/updated/deleted` | Thay đổi Metric |
| `context.created/updated/deleted` | Thay đổi Context |

### Dashboard & Sharing

| Sự Kiện | Khi Nào |
|---------|---------|
| `dashboard.created` | Tạo dashboard mới |
| `dashboard.updated` | Sửa dashboard |
| `dashboard.shared` | Chia sẻ dashboard |
| `dashboard.public_link_created` | Tạo public link |
| `dashboard.deleted` | Xóa dashboard |
| `report.sent` | Gửi Scheduled Report |

### Admin Actions

| Sự Kiện | Khi Nào |
|---------|---------|
| `api_key.created` | Tạo API key mới |
| `api_key.revoked` | Thu hồi API key |
| `sso.configured` | Cấu hình SSO |
| `settings.updated` | Thay đổi Platform Settings |

---

## Các Trường Trong Mỗi Log Entry

| Trường | Mô Tả | Ví Dụ |
|--------|--------|-------|
| **Timestamp** | Thời điểm xảy ra (UTC) | `2026-06-22 08:30:15 UTC` |
| **User** | Email người thực hiện | `nguyen.van.a@company.com` |
| **Action** | Loại sự kiện | `query.executed` |
| **Resource Type** | Loại tài nguyên bị tác động | `Dashboard`, `Connection` |
| **Resource ID** | ID của tài nguyên | `dash_abc123` |
| **Resource Name** | Tên tài nguyên (nếu có) | `Báo cáo Doanh thu Tháng` |
| **IP Address** | IP gốc của request | `203.45.67.89` |
| **User Agent** | Trình duyệt hoặc API client | `Chrome 124.0 / Windows 11` |
| **Status** | Thành công hay thất bại | `success` / `failed` |
| **Details** | Thông tin bổ sung | SQL đã chạy, các trường đã thay đổi |

---

## Lọc Và Tìm Kiếm Logs

### Bộ Lọc Có Sẵn

| Bộ Lọc | Tùy Chọn |
|--------|---------|
| **Date Range** | Chọn khoảng thời gian bất kỳ |
| **User** | Lọc theo email người dùng cụ thể |
| **Action** | Lọc theo loại sự kiện (login, query, create...) |
| **Resource Type** | Connection, Dashboard, User, API Key... |
| **Status** | Success / Failed / All |

### Ví Dụ Use Case Tìm Kiếm

**Kiểm tra ai đã truy cập dữ liệu nhạy cảm:**
- Action: `query.executed`
- Date Range: Tuần qua
- Xem cột Details để thấy SQL đã chạy

**Phát hiện đăng nhập thất bại bất thường:**
- Action: `user.login_failed`
- Date Range: Hôm nay
- Nếu cùng IP có > 5 lần thất bại → dấu hiệu brute force

**Kiểm tra thay đổi cấu hình gần đây:**
- Action: `connection.updated`, `data_model.updated`
- Date Range: 7 ngày qua

**Audit khi có sự cố dữ liệu:**
- Lọc theo Resource Name = tên Data Model bị ảnh hưởng
- Xem ai đã thay đổi gì và khi nào

---

## Export Logs

Nhấn **Export** trên trang Audit Logs để tải về file CSV với toàn bộ kết quả lọc hiện tại.

Phù hợp để:
- Gửi cho team security review
- Import vào SIEM (Splunk, Elastic, Datadog)
- Lưu trữ dài hạn theo yêu cầu compliance

---

## Thời Gian Lưu Trữ

Mặc định, logs được lưu vĩnh viễn. Để kiểm soát dung lượng database:

1. Định kỳ export và xóa logs cũ qua database
2. Hoặc cấu hình archive job chạy hàng tháng:

```sql
-- Xóa logs cũ hơn 1 năm (chạy định kỳ)
DELETE FROM audit_logs 
WHERE created_at < NOW() - INTERVAL '365 days';
```

> Tham khảo DBA trước khi xóa logs — đảm bảo đã backup/archive trước.
