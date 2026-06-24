# Platform Integrations

**Điều hướng:** Admin → Config → Platform Integrations

Trang tập trung cấu hình tất cả tích hợp nền tảng của Semantix: email, kênh thông báo, công cụ AI, giới hạn sử dụng, và SQL templates.

---

## Tab: Email (SMTP)

Cấu hình máy chủ email để Semantix gửi được:
- Lời mời đăng ký cho người dùng mới
- Thông báo reset mật khẩu
- Báo cáo định kỳ (Scheduled Reports)
- Cảnh báo Alert khi vượt ngưỡng

### Các Trường Cấu Hình

| Trường | Mô Tả | Ví Dụ |
|--------|--------|-------|
| **SMTP Host** | Địa chỉ máy chủ SMTP | `smtp.gmail.com` |
| **SMTP Port** | Cổng SMTP | `587` (TLS) hoặc `465` (SSL) |
| **Username** | Tài khoản email gửi | `noreply@company.com` |
| **Password** | Mật khẩu hoặc App Password | `••••••` |
| **From Address** | Địa chỉ hiển thị trong email gửi đi | `Semantix <noreply@company.com>` |
| **Encryption** | Giao thức mã hóa | STARTTLS hoặc SSL/TLS |

### Cài Đặt Cho Các Provider Phổ Biến

**Gmail (Google Workspace):**
```
SMTP Host: smtp.gmail.com
SMTP Port: 587
Encryption: STARTTLS
Username: noreply@company.com
Password: App Password (tạo từ Google Account → Security → App passwords)
```

**SendGrid:**
```
SMTP Host: smtp.sendgrid.net
SMTP Port: 587
Username: apikey
Password: SG.xxxxx (API key của SendGrid)
```

**AWS SES:**
```
SMTP Host: email-smtp.us-east-1.amazonaws.com
SMTP Port: 587
Username: AKIAXXXXXXXX (SMTP credentials từ SES console)
Password: xxxx
```

**Office 365:**
```
SMTP Host: smtp.office365.com
SMTP Port: 587
Encryption: STARTTLS
Username: noreply@company.com
Password: Mật khẩu tài khoản
```

### Test Email

Sau khi điền thông tin → nhấn **Send Test Email** → nhập địa chỉ nhận → kiểm tra hộp thư (bao gồm Spam).

---

## Tab: Notification Channels (Kênh Thông Báo)

Quản lý các kênh nhận cảnh báo và báo cáo. Xem hướng dẫn chi tiết cho từng kênh:

| Kênh | Tài Liệu |
|------|---------|
| Telegram | [Telegram Bot](../notifications/telegram.md) |
| Zalo OA | [Zalo](../notifications/zalo.md) |
| Microsoft Teams | [Microsoft Teams](../notifications/teams.md) |
| Email | Cấu hình SMTP ở tab trên |

---

## Tab: AI Tools

Bật/tắt các công cụ (tools) mà AI Agent có thể sử dụng trong chế độ Agentic:

| Công Cụ | Mô Tả | Rủi Ro |
|---------|--------|--------|
| **SQL Executor** | AI thực thi SQL query trực tiếp | Thấp — chỉ SELECT |
| **Python Executor** | AI chạy code Python để phân tích | Trung bình — cần sandbox |
| **Web Search** | AI tìm kiếm thông tin trên internet | Thấp |
| **External API Call** | AI gọi API bên ngoài theo cấu hình sẵn | Phụ thuộc API |

**Khuyến nghị cho production**: Chỉ bật SQL Executor. Các công cụ khác bật theo nhu cầu cụ thể sau khi đánh giá rủi ro.

---

## Tab: API Keys

Quản lý API keys cho truy cập API từ bên ngoài.

Xem chi tiết: [API Keys](api-keys.md)

---

## Tab: Quota (Giới Hạn Sử Dụng)

Đặt giới hạn để kiểm soát chi phí AI và tải hệ thống:

### Giới Hạn Per User

| Giới Hạn | Mô Tả | Mặc Định |
|----------|--------|---------|
| **AI Queries / Ngày / User** | Số câu hỏi AI tối đa mỗi ngày | Không giới hạn |
| **Tokens / Tháng / User** | Số token LLM tối đa mỗi tháng | Không giới hạn |

### Giới Hạn Toàn Hệ Thống

| Giới Hạn | Mô Tả | Mặc Định |
|----------|--------|---------|
| **Concurrent AI Requests** | Số request AI đang chạy đồng thời | 10 |
| **Max Export Rows** | Số hàng tối đa khi export CSV | 100,000 |
| **Max Query Timeout** | Timeout tối đa cho DB query (giây) | 60 |

**Khi nào cần đặt quota:**
- Kiểm soát chi phí API khi dùng OpenAI/Anthropic trả theo token
- Ngăn một user chiếm toàn bộ capacity AI
- Production với nhiều người dùng đồng thời

---

## Tab: SQL Templates (Mẫu SQL)

Quản lý các mẫu SQL tái sử dụng trong toàn hệ thống — dùng cho các Advanced Analysis như Cohort, RFM, Funnel.

### Các Template Có Sẵn

| Template Key | Mục Đích |
|-------------|---------|
| `TEMPLATE_SQL_COHORT` | SQL mẫu cho Phân Tích Cohort |
| `TEMPLATE_SQL_RFM` | SQL mẫu cho Phân Tích RFM |
| `TEMPLATE_SQL_FUNNEL` | SQL mẫu cho Phân Tích Funnel |

**Khi nào cần chỉnh sửa template:**
- Database dùng dialect SQL khác (BigQuery thay vì PostgreSQL)
- Cần customize logic phân tích theo nghiệp vụ riêng
- Template mặc định không phù hợp với cấu trúc bảng

> **Cảnh báo**: Chỉ chỉnh sửa template nếu hiểu rõ format input/output. Template sai sẽ khiến Advanced Analysis trả về lỗi.

---

## Tab: Security Settings

Cấu hình bảo mật tổng thể:

| Cài Đặt | Mô Tả | Mặc Định |
|---------|--------|---------|
| **Session Timeout** | Tự động đăng xuất sau X phút không hoạt động | 480 phút (8 giờ) |
| **Max Login Attempts** | Số lần đăng nhập sai tối đa trước khi khóa | 5 lần |
| **Lockout Duration** | Thời gian khóa tài khoản sau khi vượt giới hạn | 30 phút |
| **Password Policy** | Yêu cầu độ phức tạp mật khẩu | Tùy chỉnh |
| **Allowed Email Domains** | Chỉ cho phép đăng ký từ domain cụ thể | (trống = tất cả) |

---

## Audit Trail

Mọi thay đổi trong Platform Integrations được ghi vào Audit Logs, bao gồm:
- Ai thay đổi
- Trường nào thay đổi (không bao gồm giá trị nhạy cảm như password)
- Thời điểm thay đổi

Chỉ tài khoản có quyền `admin:all` mới được phép truy cập và thay đổi Platform Integrations.
