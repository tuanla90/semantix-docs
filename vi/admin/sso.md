# SSO (Single Sign-On)

Semantix hỗ trợ đăng nhập một lần (SSO) qua **SAML 2.0** và **OpenID Connect (OIDC)** — tích hợp với Okta, Azure AD, Google Workspace, Auth0, Keycloak, và bất kỳ IdP chuẩn nào.

---

## Lợi Ích Của SSO

- Người dùng không cần nhớ thêm mật khẩu — dùng tài khoản công ty sẵn có
- Admin không cần quản lý mật khẩu thủ công
- Tự động deactivate khi nhân viên nghỉ việc (qua IdP)
- Hỗ trợ MFA từ IdP
- **Auto-provision**: Tài khoản Semantix tự tạo khi user đăng nhập lần đầu

---

## Giao Thức Hỗ Trợ

| Giao Thức | IdP Tương Thích |
|-----------|----------------|
| **SAML 2.0** | Okta, Azure AD / Microsoft Entra, Google Workspace, OneLogin, JumpCloud, Ping Identity, ADFS |
| **OIDC** | Google Workspace, Microsoft Azure AD, Auth0, Keycloak, GitHub, Cognito |

---

## Bước 1: Tạo Cấu Hình SSO

1. Vào **Admin → Access → SSO → New Configuration**
2. Đặt **Name** (tên hiển thị, ví dụ: "Okta Corporate SSO")
3. Chọn **Protocol**: SAML hoặc OIDC
4. Điền thông tin IdP (xem chi tiết theo từng protocol bên dưới)
5. Nhấn **Save** — hệ thống sinh ra **SSO ID** duy nhất

---

## Cấu Hình SAML 2.0

### Thông Tin Bạn Cần Lấy Từ IdP

| Trường | Mô Tả | Ví Dụ |
|--------|--------|-------|
| **Entity ID / Issuer** | ID của IdP | `http://www.okta.com/exkXXXXX` |
| **SSO URL (Login URL)** | Endpoint đăng nhập SAML | `https://company.okta.com/app/xxx/sso/saml` |
| **X.509 Certificate** | Chứng chỉ IdP để xác minh chữ ký SAML | Certificate PEM (bắt đầu `-----BEGIN CERTIFICATE-----`) |

### Thông Tin Bạn Cần Cung Cấp Cho IdP (SP Metadata)

Sau khi tạo SSO config trong Semantix, lấy các thông tin này từ trang detail:

| Trường | Giá Trị |
|--------|---------|
| **ACS URL (Assertion Consumer Service)** | `https://your-domain.com/api/auth/sso/{sso-id}/callback` |
| **SP Entity ID** | `https://your-domain.com/api/auth/sso/{sso-id}/metadata` |
| **Metadata URL** | `https://your-domain.com/api/auth/sso/{sso-id}/metadata` |

### Thiết Lập Trong Okta (Ví Dụ)

1. Okta Admin Console → **Applications → Create App Integration**
2. Chọn **SAML 2.0**
3. Điền:
   - **Single sign-on URL**: ACS URL của Semantix
   - **Audience URI (SP Entity ID)**: SP Entity ID của Semantix
   - **Name ID format**: EmailAddress
   - **Application username**: Email
4. **Attribute Statements** (ánh xạ claim):
   - `email` → `user.email`
   - `firstName` → `user.firstName`
   - `lastName` → `user.lastName`
5. Hoàn tất → lấy **Identity Provider metadata** → dán vào Semantix

### Thiết Lập Trong Azure AD (Microsoft Entra)

1. Azure Portal → **Azure Active Directory → Enterprise applications → New application**
2. **Create your own application** → Chọn "Integrate any other application you don't find in the gallery"
3. Tab **Single sign-on → SAML**
4. **Basic SAML Configuration**:
   - **Identifier (Entity ID)**: SP Entity ID của Semantix
   - **Reply URL (ACS URL)**: ACS URL của Semantix
5. **Attributes & Claims**: Đảm bảo `emailaddress` claim được map
6. Download **Federation Metadata XML** → upload hoặc copy thông tin vào Semantix

---

## Cấu Hình OIDC

### Thông Tin Bạn Cần Lấy Từ IdP

| Trường | Mô Tả | Ví Dụ |
|--------|--------|-------|
| **Issuer URL** | URL cơ sở của IdP | `https://accounts.google.com` |
| **Client ID** | OAuth 2.0 Client ID | `1234567890-xxx.apps.googleusercontent.com` |
| **Client Secret** | OAuth 2.0 Client Secret | `GOCSPX-xxx...` |

### Redirect URI Đăng Ký Với IdP

```
https://your-domain.com/api/auth/sso/{sso-id}/callback
```

### Thiết Lập Trong Google Workspace

1. Google Cloud Console → **APIs & Services → Credentials → Create Credentials → OAuth 2.0 Client IDs**
2. Application type: **Web application**
3. **Authorized redirect URIs**: Thêm Redirect URI của Semantix
4. Copy **Client ID** và **Client Secret** → dán vào Semantix
5. **Issuer URL**: `https://accounts.google.com`

### Thiết Lập Với Auth0

1. Auth0 Dashboard → **Applications → Create Application → Regular Web Applications**
2. Settings:
   - **Allowed Callback URLs**: Redirect URI của Semantix
   - **Allowed Logout URLs**: `https://your-domain.com`
3. Lấy **Domain** (Issuer URL = `https://your-auth0-domain.auth0.com`), **Client ID**, **Client Secret**
4. Dán vào Semantix SSO config

---

## Bước 2: Bật Auto-Provisioning (Tùy Chọn)

Khi bật **Auto-Provisioning**:
- User đăng nhập SSO lần đầu → tài khoản Semantix tự động được tạo
- User được gán **Default Role** (cấu hình trong SSO config)

Khi tắt:
- Chỉ user đã có tài khoản trong Semantix mới đăng nhập được qua SSO
- Admin phải tạo tài khoản trước

**Khuyến nghị**: Bật Auto-Provisioning để giảm workload admin.

---

## Bước 3: Test SSO

1. Trong trang SSO config → nhấn **Test SSO Login**
2. Trình duyệt mở cửa sổ mới → chuyển đến trang đăng nhập IdP
3. Đăng nhập bằng tài khoản công ty
4. Nếu thành công: chuyển hướng về Semantix với thông báo "SSO test successful"
5. Nếu thất bại: xem error message để debug

---

## Bước 4: Bật SSO Cho Người Dùng

Sau khi test thành công:
1. Trong SSO config → toggle **Active** thành ON
2. Nút "Đăng nhập với [Tên SSO]" sẽ xuất hiện trên trang login của Semantix

---

## Ánh Xạ Claim / Attribute

Semantix cần các thông tin sau từ IdP để tạo/update tài khoản:

| Thông Tin | SAML Attribute Name | OIDC Claim |
|-----------|--------------------|-----------| 
| Email (bắt buộc) | `email` hoặc `emailaddress` | `email` |
| Tên | `firstName` hoặc `given_name` | `given_name` |
| Họ | `lastName` hoặc `family_name` | `family_name` |
| Avatar | `picture` | `picture` |

---

## Troubleshooting SSO

| Triệu Chứng | Nguyên Nhân | Giải Pháp |
|-------------|-------------|-----------|
| Redirect về `/login?error=sso_failed` | ACS URL sai trong IdP | Kiểm tra lại ACS URL — copy chính xác từ Semantix |
| `Invalid signature` (SAML) | Certificate IdP hết hạn hoặc sai | Re-download certificate từ IdP và update trong Semantix |
| `Issuer mismatch` | Entity ID không khớp | Đảm bảo SP Entity ID trong IdP khớp với Semantix |
| `User not found` và Auto-Provisioning tắt | User chưa có tài khoản | Tạo user trước trong Semantix hoặc bật Auto-Provisioning |
| OIDC: `Invalid client` | Client ID/Secret sai | Kiểm tra lại credentials trong IdP dashboard |
| Đăng nhập thành công nhưng role sai | Default Role chưa đặt đúng | Chỉnh Default Role trong SSO config |

---

## Lưu Ý Quan Trọng

> **Luôn giữ ít nhất một tài khoản Admin local** (đăng nhập bằng email/password) làm backup. Nếu SSO gặp sự cố, bạn vẫn có thể vào Semantix qua tài khoản này để khắc phục.

Xem thêm: [Người Dùng & Phân Quyền](README.md)
