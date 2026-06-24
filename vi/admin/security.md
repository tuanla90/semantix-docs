# Bảo Mật Dữ Liệu

Tổng quan kiến trúc bảo mật của Semantix — giải thích cách dữ liệu của bạn được bảo vệ ở mọi lớp.

---

## Nguyên Tắc Cốt Lõi: Zero Data Retention

**Semantix không lưu trữ dữ liệu kinh doanh của bạn.**

Khi AI trả lời câu hỏi, đây là những gì xảy ra:

```
Câu hỏi người dùng
        ↓
AI nhận: Schema (tên bảng, tên cột) + Mô tả + Business rules
[Dữ liệu thực KHÔNG được gửi cho AI]
        ↓
AI tạo ra câu SQL
        ↓
SQL chạy trực tiếp trên Database của bạn
        ↓
Kết quả về thẳng trình duyệt
[AI không bao giờ thấy kết quả query]
```

AI chỉ nhận **metadata** (schema) — không bao giờ nhận dữ liệu thực tế từ database.

---

## Mã Hóa Credentials

Tất cả thông tin nhạy cảm được mã hóa **AES-256-GCM** trước khi lưu vào database:

- Mật khẩu database connections
- API keys của AI providers (OpenAI, Anthropic...)
- Service account JSON keys (Google)
- Client secrets (SSO OIDC)
- SMTP passwords

**Khóa mã hóa** (`ENCRYPTION_KEY` trong `.env`) chỉ tồn tại trên server của bạn — Semantix không biết khóa này.

**Sau khi lưu**: Mật khẩu không hiển thị lại trong UI, không xuất hiện trong API responses hay server logs. Chỉ có thể ghi đè bằng giá trị mới.

---

## HTTPS Bắt Buộc

Mọi kết nối đến Semantix phải qua **HTTPS (TLS 1.2 trở lên)**:

- Reverse proxy (Nginx/Caddy/Apache) terminate SSL
- Semantix không expose port 3000 ra internet
- HSTS header được bật để ngăn downgrade attack

Xem cấu hình Nginx mẫu: [Yêu Cầu Hệ Thống](../getting-started/requirements.md)

---

## Phân Quyền Truy Cập (RBAC)

Semantix dùng **Role-Based Access Control**:

- Mỗi người dùng có một **Role**
- Role quyết định những tính năng nào user được phép dùng
- Admin có thể tạo Role tùy chỉnh với permissions cụ thể

**Ví dụ phân quyền theo vai trò:**

| Role | Permissions | Dùng Cho |
|------|-------------|---------|
| Viewer | `view:dashboards`, `use:chat` | Nhân viên xem báo cáo |
| Analyst | + `edit:dashboards`, `view:data_models` | Data analyst |
| Data Engineer | + `manage:connections`, `manage:pipelines` | Kỹ sư dữ liệu |
| Admin | `admin:all` | Quản trị viên hệ thống |

---

## Row-Level Security (RLS)

Giới hạn dữ liệu người dùng thấy dựa trên thuộc tính cá nhân:

```sql
-- Tự động thêm vào mọi query của user có chi_nhanh = "HN"
WHERE chi_nhanh = 'HN'
```

Người dùng không biết filter này tồn tại — họ chỉ thấy dữ liệu được phép xem.

Xem chi tiết: [Row-Level Security](../contexts/rls.md)

---

## SSO & MFA

Semantix tích hợp với IdP của công ty (Okta, Azure AD, Google Workspace...) — tận dụng toàn bộ chính sách bảo mật đã có:

- **MFA** từ IdP tự động áp dụng cho Semantix
- **Session timeout** đồng bộ với IdP
- **Auto-deactivate**: Khi vô hiệu hóa user trong Okta, họ tự động mất quyền truy cập Semantix

Xem chi tiết: [SSO Configuration](sso.md)

---

## Audit Logs (Nhật Ký Kiểm Toán)

Mọi thao tác được ghi lại trong audit trail bất biến:

| Loại Sự Kiện | Được Ghi |
|-------------|---------|
| Authentication | Đăng nhập thành công/thất bại, SSO login, logout |
| User Management | Tạo/xóa/sửa user, thay đổi role |
| Data Access | Mọi query chạy qua AI Chat và API |
| Configuration | Thay đổi connection, data model, metric |
| Admin Actions | Tạo/thu hồi API key, thay đổi cài đặt |

Xem chi tiết: [Audit Logs](audit-logs.md)

---

## Cô Lập Dữ Liệu Giữa Tenants (Multi-tenant)

Nếu triển khai Semantix cho nhiều công ty/bộ phận:

- Dùng **Embed Token với Locked Filters** để cô lập dữ liệu theo tenant
- Mỗi tenant chỉ thấy data của mình qua `customer_id = {{tenant_id}}`
- Token được ký server-side — user không thể giả mạo

---

## Checklist Bảo Mật Trước Go-Live

**Hạ tầng:**
- [ ] HTTPS với chứng chỉ SSL hợp lệ (không phải self-signed)
- [ ] Port 3000 không được expose ra internet
- [ ] `ENCRYPTION_KEY` được tạo ngẫu nhiên: `openssl rand -base64 32`
- [ ] `AUTH_SECRET` được tạo ngẫu nhiên: `openssl rand -hex 32`
- [ ] File `.env` không được commit lên git

**Truy cập:**
- [ ] Đã cấu hình SSO với IdP công ty (hoặc ít nhất có MFA)
- [ ] Roles được thiết kế theo nguyên tắc Least Privilege
- [ ] Row-Level Security được cấu hình cho data nhạy cảm
- [ ] API Keys có scope tối thiểu cần thiết

**Database:**
- [ ] Semantix dùng user chỉ đọc (SELECT only)
- [ ] IP whitelist chỉ cho phép IP server Semantix
- [ ] Thông tin kết nối đã được test bảo mật

**Giám sát:**
- [ ] Audit Logs được kiểm tra định kỳ
- [ ] Cảnh báo cho đăng nhập thất bại nhiều lần
- [ ] Sessions được kiểm tra qua Admin → Sessions

---

## Báo Cáo Lỗ Hổng Bảo Mật

Phát hiện vấn đề bảo mật? Gửi email đến **support@semantix.vn** với mô tả chi tiết. Chúng tôi cam kết phản hồi trong 24 giờ làm việc.
