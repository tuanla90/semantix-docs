# SSO (SAML / OIDC)

Semantix hỗ trợ Đăng Nhập Một Lần (Single Sign-On) thông qua **SAML 2.0** và **OpenID Connect (OIDC)**.

## Các Provider Được Hỗ Trợ

| Giao Thức | Tương Thích Với |
|----------|----------------|
| SAML 2.0 | Okta, Azure AD, Google Workspace, OneLogin, bất kỳ IdP SAML nào |
| OIDC | Google, Microsoft, Auth0, Keycloak, bất kỳ provider OIDC nào |

## Thiết Lập SSO

### Bước 1 — Tạo Cấu Hình SSO

1. Đi tới **Admin → SSO → New Configuration**
2. Chọn giao thức: **SAML** hoặc **OIDC**
3. Nhập chi tiết IdP của bạn (xem bên dưới)
4. Nhấn **Save**

### Cấu Hình SAML

| Trường | Mô Tả |
|-------|-------------|
| **Entity ID / Issuer** | Entity ID của IdP của bạn |
| **SSO URL** | Endpoint đăng nhập SAML của IdP của bạn |
| **Certificate** | Chứng chỉ X.509 của IdP (dành cho xác minh chữ ký) |

**Metadata của Semantix SP:**
- **ACS URL (callback):** `https://your-domain.com/api/auth/sso/{id}/callback`
- **SP Entity ID:** `https://your-domain.com/api/auth/sso/{id}/metadata`

### Cấu Hình OIDC

| Trường | Mô Tả |
|-------|-------------|
| **Issuer URL** | URL nhà phát hành (issuer) của IdP của bạn (ví dụ: `https://accounts.google.com`) |
| **Client ID** | ID client OAuth |
| **Client Secret** | Secret client OAuth |

**Redirect URI cần đăng ký với IdP của bạn:**
```
https://your-domain.com/api/auth/sso/{id}/callback
```

### Bước 2 — Bật Tính Năng Tự Động Cấp Tài Khoản (Tùy chọn)

Khi được bật, những người dùng đăng nhập qua SSO lần đầu tiên sẽ tự động được tạo tài khoản trong Semantix với **Default Role** do bạn chỉ định.

Nếu tắt, chỉ những người dùng đã có tài khoản sẵn trong Semantix mới có thể đăng nhập qua SSO.

### Bước 3 — Kiểm Tra Kết Nối

1. Nhấn **Test SSO** trên trang cấu hình
2. Bạn sẽ được chuyển hướng đến trang đăng nhập IdP của bạn
3. Sau khi đăng nhập thành công, bạn sẽ được chuyển hướng trở lại Semantix

> 💡 Nên giữ ít nhất một tài khoản admin đăng nhập kiểu local đang hoạt động, phòng trường hợp SSO bị cấu hình sai dẫn đến mất quyền truy cập.
