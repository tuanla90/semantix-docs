# Zalo

Kết nối Semantix với Zalo Official Account (Zalo OA) để nhận cảnh báo dành cho người dùng Việt Nam.

## Thiết Lập

### Bước 1 — Cấu Hình Zalo Official Account

1. Đăng ký một **Zalo Official Account (OA)** tại [oa.zalo.me](https://oa.zalo.me)
2. Đi tới phần **Công cụ dành cho nhà phát triển (Developer Tools)** → bật **Webhook**
3. Thiết lập URL webhook thành:
   ```
   https://your-semantix-domain.com/api/webhooks/zalo
   ```
4. Sao chép **App Secret** dành cho việc xác minh chữ ký (signature verification)

### Bước 2 — Kết Nối Trong Semantix

1. Đi tới **Admin → Channels → New Channel → Zalo**
2. Nhập thông tin Zalo OA của bạn
3. Thiết lập biến môi trường `ZALO_WEBHOOK_SECRET`
4. Nhấn **Save**

## Bảo Mật

Hãy đặt biến `ZALO_WEBHOOK_SECRET` trong file `.env` của bạn để kích hoạt việc xác minh chữ ký HMAC (HMAC signature verification) đối với các request webhook gửi tới.
