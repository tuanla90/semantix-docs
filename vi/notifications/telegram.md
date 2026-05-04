# Telegram Bot

Kết nối Telegram bot với Semantix để truy vấn dữ liệu và nhận cảnh báo trực tiếp trong Telegram.

## Các Tính Năng

- Đặt các câu hỏi bằng ngôn ngữ tự nhiên qua Telegram chat
- Nhận cảnh báo metric khi vượt ngưỡng
- Kết quả được định dạng thành các bảng văn bản rõ ràng, dễ nhìn

## Thiết Lập

### Bước 1 — Tạo Một Telegram Bot

1. Mở Telegram → tìm kiếm **@BotFather**
2. Gửi lệnh `/newbot` và làm theo hướng dẫn
3. Sao chép **Bot Token** (định dạng: `123456789:AAF...`)

### Bước 2 — Kết Nối Trong Semantix

1. Đi tới **Admin → Channels → New Channel → Telegram**
2. Nhập **Bot Token** của bạn
3. (Tùy chọn) Đặt một **Default Context** (nguồn dữ liệu mặc định mà người dùng sẽ truy vấn)
4. (Tùy chọn) Đặt một **Semantix API Key** (bắt buộc đối với các truy vấn bằng ngôn ngữ tự nhiên)
5. Nhấn **Save**

### Bước 3 — Xác Minh Bot

1. Semantix sẽ sinh ra một **mã xác minh (verification code)**
2. Mở Telegram bot của bạn → gửi lệnh `/start <mã_xác_minh>`
3. Bot sẽ xác nhận việc kết nối thành công

## Truy Vấn Dữ Liệu Qua Telegram

Sau khi đã kết nối, bạn có thể gửi bất kỳ câu hỏi nào tới bot:

```
Hiển thị doanh thu theo khu vực trong tuần này
Top 5 khách hàng theo doanh thu
Tổng số đơn hàng ngày hôm qua
```

Bot sẽ phản hồi lại bằng một bảng kết quả đã được định dạng.

## Bảo Mật

- Đặt biến môi trường `TELEGRAM_WEBHOOK_SECRET` để bảo vệ webhook endpoint của bạn
- Chỉ các kênh (channels) đã được xác minh mới có thể nhận và gửi tin nhắn

> 💡 Kết quả bị giới hạn tối đa 10 dòng trên Telegram để dễ đọc. Hãy xem kết quả đầy đủ trên Semantix.
