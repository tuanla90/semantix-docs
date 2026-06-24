# Quản Trị Hệ Thống (Admin)

**Điều hướng:** Admin (menu trên cùng) — chỉ hiển thị với người dùng có quyền Admin hoặc các quyền quản trị cụ thể.

Phần Admin là nơi quản lý toàn bộ hệ thống Semantix: người dùng, phân quyền, bảo mật, giám sát và cấu hình hệ thống.

---

## Tổng Quan Các Module Admin

| Module | Điều Hướng | Mô Tả |
|--------|-----------|--------|
| **Users** | Admin → Access → Users | Quản lý tài khoản người dùng |
| **Roles** | Admin → Access → Roles | Tạo và quản lý nhóm quyền |
| **SSO** | Admin → Access → SSO | Đăng nhập một lần (SAML/OIDC) |
| **Attributes** | Admin → Access → Attributes | Thuộc tính người dùng cho RLS |
| **Tags** | Admin → Access → Tags | Nhãn phân nhóm tài nguyên |
| **Audit Logs** | Admin → Monitoring → Audit Logs | Nhật ký hoạt động hệ thống |
| **Sessions** | Admin → Monitoring → Sessions | Phiên đăng nhập đang hoạt động |
| **Security** | Admin → Config → Security | Cấu hình bảo mật |
| **Caching** | Admin → Config → Caching | Cấu hình bộ nhớ đệm |
| **Platform** | Admin → Config → Platform | Tích hợp hệ thống bên ngoài |
| **API Keys** | Admin → API Keys | Quản lý khóa API |

---

## Quản Lý Người Dùng (Users)

**Điều hướng:** Admin → Access → Users

### Mời Người Dùng Mới

1. Vào **Admin → Access → Users → Invite User**.
2. Điền thông tin:
   - **Email**: Địa chỉ email người dùng
   - **First Name / Last Name**: Họ và tên (tùy chọn)
   - **Roles**: Chọn một hoặc nhiều Role phân quyền
3. Nhấn **Send Invite**.

Người dùng nhận email với link kích hoạt. Link có hiệu lực trong **48 giờ**. Sau khi nhấn link, họ tạo mật khẩu và đăng nhập lần đầu.

### Danh Sách Người Dùng

Trang Users hiển thị:
- **Avatar, Tên, Email** của từng người dùng
- **Roles** đang được gán
- **Trạng thái**: Active / Inactive / Pending (đã mời nhưng chưa kích hoạt)
- **Đăng nhập lần cuối**
- **Nút hành động**: Edit, Deactivate, Resend Invite

**Tìm kiếm và lọc:**
- Tìm theo tên hoặc email
- Lọc theo Role
- Lọc theo Status

### Chỉnh Sửa Người Dùng

1. Nhấn vào tên người dùng hoặc biểu tượng **Edit (✏️)**.
2. Có thể thay đổi:
   - Roles (thêm/bớt nhóm quyền)
   - Attributes (cho Row-Level Security)
   - Status (Active/Inactive)
3. Nhấn **Save**.

### Vô Hiệu Hóa Người Dùng

Khi nhân viên nghỉ việc:
1. Tìm người dùng → nhấn **Deactivate**.
2. Tài khoản bị khóa ngay lập tức — không thể đăng nhập.
3. Dữ liệu (dashboard, lịch sử chat) vẫn được giữ lại.

> Không nên xóa hẳn tài khoản vì sẽ mất lịch sử hoạt động trong Audit Logs.

### Trạng Thái Người Dùng

| Trạng Thái | Mô Tả |
|-----------|--------|
| **Active** | Có thể đăng nhập và sử dụng bình thường |
| **Inactive** | Bị vô hiệu hóa — không thể đăng nhập |
| **Pending** | Đã được mời nhưng chưa kích hoạt tài khoản |

---

## Phân Quyền (Roles)

**Điều hướng:** Admin → Access → Roles

### Các Role Mặc Định

| Role | Quyền |
|------|--------|
| **Admin** | Toàn quyền — xem và thay đổi mọi thứ trong hệ thống |
| **User** | Xem dashboard, sử dụng AI Chat (không thể vào Studio hay Admin) |

### Tạo Role Tùy Chỉnh

1. Vào **Admin → Access → Roles → New Role**.
2. Điền **Tên Role** (ví dụ: `Data Analyst`, `Sales Manager`, `HR Viewer`).
3. Chọn các **Permissions** (quyền chi tiết).
4. Nhấn **Save**.

### Danh Sách Permissions (Quyền Chi Tiết)

**Quyền Truy Cập Dữ Liệu:**

| Permission | Mô Tả |
|------------|--------|
| `use:chat` | Sử dụng AI Chat để đặt câu hỏi |
| `view:dashboards` | Xem các Dashboard được chia sẻ |
| `edit:dashboards` | Tạo, chỉnh sửa, xóa Dashboard của mình |
| `share:dashboards` | Chia sẻ Dashboard với người khác |
| `use:data_portal` | Truy cập và xuất báo cáo từ Data Portal |

**Quyền Studio — Data Engineering:**

| Permission | Mô Tả |
|------------|--------|
| `manage:connections` | Tạo, sửa, xóa Connections |
| `manage:engine_templates` | Quản lý Engine Templates |
| `manage:data_templates` | Tạo, sửa, xóa Data Templates |
| `manage:pipelines` | Quản lý Data Pipelines |

**Quyền Studio — Data Analytics & BI:**

| Permission | Mô Tả |
|------------|--------|
| `manage:data_models` | Tạo, sửa, xóa Data Models |
| `manage:contexts` | Tạo, sửa, xóa Semantic Contexts |
| `edit:suggestion` | Phê duyệt hoặc từ chối Suggestions |

**Quyền Studio — Data Science & AI:**

| Permission | Mô Tả |
|------------|--------|
| `manage:ai_providers` | Thêm, sửa AI Providers |
| `manage:ai_assistants` | Tạo, cấu hình AI Assistants |
| `create_knowledge` | Tạo Knowledge Base mới |
| `edit_knowledge` | Chỉnh sửa Knowledge Base |
| `delete_knowledge` | Xóa Knowledge Base |

**Quyền Admin:**

| Permission | Mô Tả |
|------------|--------|
| `manage:users` | Mời, chỉnh sửa, vô hiệu hóa người dùng |
| `manage:roles` | Tạo, sửa, xóa Roles |
| `manage:sso` | Cấu hình SSO |
| `view:audit_logs` | Xem Audit Logs |
| `manage:api_keys` | Tạo, thu hồi API Keys |
| `manage:alerts` | Tạo, sửa cảnh báo |
| `admin:all` | Toàn quyền Admin (bao gồm tất cả ở trên) |

### Gán Role cho Người Dùng

**Từ trang Roles:**
1. Mở Role cần gán.
2. Tab **Members** → nhấn **Add Member** → tìm và chọn người dùng.

**Từ trang Users:**
1. Mở trang chỉnh sửa người dùng.
2. Tìm phần **Roles** → chọn các Role cần gán.

---

## SSO — Đăng Nhập Một Lần

**Điều hướng:** Admin → Access → SSO

Xem hướng dẫn chi tiết: [SSO (SAML / OIDC)](sso.md)

**Tóm tắt:**
- Hỗ trợ **SAML 2.0** và **OpenID Connect (OIDC)**
- Tương thích với: Okta, Azure AD, Google Workspace, Auth0, Keycloak, và mọi IdP chuẩn
- Hỗ trợ **Auto Provision**: tự động tạo tài khoản Semantix khi người dùng đăng nhập SSO lần đầu

---

## Audit Logs — Nhật Ký Hoạt Động

**Điều hướng:** Admin → Monitoring → Audit Logs

Audit Logs ghi lại toàn bộ hoạt động quan trọng trong hệ thống phục vụ bảo mật và tuân thủ quy định.

### Những Gì Được Ghi Lại

| Hạng Mục | Sự Kiện |
|---------|---------|
| **Xác thực** | Đăng nhập thành công/thất bại, đăng xuất, đăng nhập SSO |
| **Người dùng** | Tạo mới, cập nhật thông tin, thay đổi Role, vô hiệu hóa |
| **Connections** | Tạo, sửa, xóa, test connection |
| **Data Access** | Truy vấn AI Chat, xuất dữ liệu qua Data Portal |
| **Dashboards** | Tạo, chia sẻ, xóa dashboard |
| **Admin** | Tạo/thu hồi API Key, thay đổi cấu hình |

### Tìm Kiếm và Lọc

Trên trang Audit Logs, dùng các bộ lọc:
- **Date Range**: Khoảng thời gian (từ ngày → đến ngày)
- **User**: Lọc theo người dùng cụ thể
- **Action**: Lọc theo loại hành động (`login`, `create`, `delete`...)
- **Resource Type**: Lọc theo đối tượng (`Connection`, `Dashboard`, `User`...)

### Các Trường Trong Log

| Trường | Mô Tả |
|--------|--------|
| **Timestamp** | Thời gian xảy ra (UTC) |
| **User** | Người thực hiện |
| **Action** | Hành động (`login`, `create_connection`, `delete_dashboard`...) |
| **Resource** | Đối tượng bị tác động |
| **Resource ID** | ID cụ thể của đối tượng |
| **IP Address** | Địa chỉ IP nguồn |
| **User Agent** | Trình duyệt hoặc API client |
| **Details** | Thông tin bổ sung (trường nào đã thay đổi, giá trị cũ/mới) |

---

## Sessions — Phiên Đăng Nhập

**Điều hướng:** Admin → Monitoring → Sessions

Xem tất cả phiên đăng nhập đang hoạt động:
- Người dùng nào đang online
- Thiết bị, trình duyệt
- IP Address
- Thời gian bắt đầu phiên

**Hủy phiên đăng nhập:**
Nhấn **Revoke** bên cạnh phiên cần kết thúc — người dùng bị đăng xuất ngay lập tức. Dùng khi phát hiện truy cập đáng ngờ hoặc thiết bị bị mất.

---

## API Keys

**Điều hướng:** Admin → API Keys

Xem hướng dẫn chi tiết: [API Keys](api-keys.md)

**Tóm tắt:**
- API Key cho phép ứng dụng bên ngoài gọi Semantix API
- Định dạng: `sk_live_...`
- Hỗ trợ cấu hình Scope (quyền) và IP Whitelist
- Key chỉ hiển thị một lần khi tạo — cần lưu ngay

---

## Cấu Hình Hệ Thống

### Caching (Admin → Config → Caching)

Xem chi tiết: [Caching & Hiệu Suất](caching.md)

**Điểm chính:**
- Cache mặc định: **1 giờ**
- Có thể cấu hình per-Connection hoặc per-Widget
- Nền tảng: **Redis** — đảm bảo Redis có đủ RAM
- Manual invalidation: nhấn Refresh trên Dashboard

### Security (Admin → Config → Security)

Xem chi tiết: [Kiến Trúc & Bảo Mật](security.md)

**Điểm chính:**
- Cài đặt Session Timeout
- Cấu hình Password Policy
- Bật/tắt tính năng đăng ký mới
- Whitelist domain email được phép đăng ký

### Platform (Admin → Config → Platform)

Xem chi tiết: [Platform Integrations](platform.md)

**Điểm chính:**
- Cấu hình SMTP server cho email
- Webhook URL cho các tích hợp bên ngoài
- Cài đặt tên, logo thương hiệu (white-label)

---

## Checklist Thiết Lập Admin

Khi triển khai Semantix mới, Admin cần hoàn thành:

- [ ] **Tạo tài khoản Admin** đầu tiên (ngoài tài khoản mặc định)
- [ ] **Cấu hình SMTP** để gửi email mời người dùng
- [ ] **Thiết lập SSO** (nếu có) để người dùng đăng nhập tiện lợi hơn
- [ ] **Tạo Roles** phù hợp với cơ cấu tổ chức
- [ ] **Mời người dùng** và gán Role
- [ ] **Cấu hình Caching** phù hợp với tần suất cập nhật dữ liệu
- [ ] **Thiết lập Notifications** (Telegram/Zalo/Teams) cho cảnh báo quan trọng
- [ ] **Tạo API Keys** nếu có tích hợp bên ngoài
- [ ] **Bật Audit Logs** để theo dõi hoạt động hệ thống
