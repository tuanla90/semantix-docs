# Chụp screenshot app Semantix → trang tutorial

Tự động đăng nhập app live rồi chụp từng màn hình theo danh sách bạn điền.

## 1. Cài (1 lần) — trong thư mục `landing/`
```
npm i -D playwright-core
```
Script dùng **Chrome đã cài sẵn** trên máy (`channel: 'chrome'`), không tải Chromium → tránh lỗi SSL/proxy.

## 2. Điền cấu hình
Mở `scripts/screenshots/screens.config.mjs`:
- `baseUrl` — gốc app live (vd `https://app.semantix.vn`).
- `auth.username` / `auth.password` — tài khoản **đã có dữ liệu thật**.
- `screens` — dán **link từng màn** (đã set sẵn dữ liệu đẹp). Để trống → bỏ qua.

## 3. Chạy — trong thư mục `landing/`
```
node scripts/screenshots/capture.mjs
```
Ảnh lưu ở `public/tutorial/*.png`. Trang login được chụp **tự động trước** khi đăng nhập (`01-dang-nhap.png`).

## Ghi chú
- `screens.config.mjs` chứa mật khẩu → đã `.gitignore`, không commit.
- Login mặc định là form email/mật khẩu. Nếu app dùng **SSO/Google**, báo để chỉnh script (dùng phiên đăng nhập sẵn).
- Lỗi login? Đặt `options.headful: true` để xem trình duyệt thao tác.
- Ảnh nặng? Đặt `deviceScaleFactor: 1`, hoặc convert PNG → WebP trước khi nhúng vào trang.
