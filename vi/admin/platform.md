# Platform Integrations (Tích Hợp Nền Tảng)

**Điều hướng:** Admin → Config → Platform Integrations

Platform Integrations tập trung các cấu hình tích hợp nền tảng quan trọng vào một nơi, bao gồm: SSO, API Keys, AI Tools, Kênh thông báo, Quota, và SQL Templates.

## Các Tab Cấu Hình

### SSO (Single Sign-On)
Cấu hình đăng nhập một lần qua SAML 2.0 hoặc OIDC. Xem chi tiết: [SSO](sso.md).

### API Keys
Quản lý các API key dùng để truy cập Semantix API từ bên ngoài. Xem chi tiết: [API Keys](api-keys.md).

### AI Tools
Bật/tắt và cấu hình các công cụ AI Agent (tools) — ví dụ: khả năng AI thực thi code Python, gọi API bên ngoài, v.v.

| Công Cụ | Mô Tả |
|---------|-------|
| **SQL Executor** | AI thực thi truy vấn SQL trực tiếp |
| **Python Executor** | AI chạy code Python để phân tích |
| **Web Search** | AI tìm kiếm thông tin trên internet |
| **External API** | AI gọi API bên ngoài theo cấu hình |

### Channels (Kênh Thông Báo)
Cấu hình các kênh nhận thông báo và báo cáo: Telegram, Zalo, Microsoft Teams, Email. Xem chi tiết: [Notifications](../notifications/README.md).

### Quota (Giới Hạn Sử Dụng)
Đặt giới hạn sử dụng cho người dùng hoặc toàn hệ thống:
- Số câu hỏi AI tối đa / ngày / người dùng
- Số token tối đa / tháng
- Giới hạn export file

### SQL Templates
Quản lý các câu truy vấn SQL mẫu (template) tái sử dụng được trong toàn hệ thống — dùng cho các truy vấn chuẩn hóa hoặc macro.

## Lưu Ý

Tất cả thay đổi trong Platform Integrations được ghi vào Audit Logs. Chỉ Admin mới có quyền truy cập trang này.
