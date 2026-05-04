# Thông Báo & Cảnh Báo (Notifications & Alerts)

Semantix có thể gửi các cảnh báo và báo cáo tự động thông qua nhiều kênh khác nhau.

## Các Kênh Hỗ Trợ

| Kênh | Use Case |
|---------|----------|
| [Telegram Bot](telegram.md) | Truy vấn ngôn ngữ tự nhiên (NL) + cảnh báo metric |
| [Zalo](zalo.md) | Các cảnh báo dành cho người dùng Việt Nam |
| [Microsoft Teams](teams.md) | Truy vấn NL doanh nghiệp + cảnh báo |
| [Email](scheduled-reports.md) | Lên lịch gửi báo cáo dạng PDF/CSV/Excel |

## Các Loại Cảnh Báo (Alert Types)

### Cảnh Báo Vượt Ngưỡng (Threshold Alerts)
Gửi thông báo khi một metric vượt qua một ngưỡng (threshold) đã được thiết lập trước.

Ví dụ: *"Cảnh báo cho tôi khi doanh thu hàng ngày giảm xuống dưới 10.000$"*

### Cảnh Báo Bất Thường (Anomaly Alerts)
Engine phát hiện bất thường của Semantix tự động quét các KPI của bạn và thông báo khi phát hiện các mẫu (patterns) bất thường — mà không cần phải thiết lập ngưỡng một cách thủ công.

## Quản Lý Các Kênh Thông Báo

1. Đi tới **Admin → Channels → New Channel**
2. Chọn loại kênh
3. Làm theo hướng dẫn thiết lập cho kênh đó
4. Nhấn kiểm tra kết nối (Test connection)

## Quản Lý Các Cảnh Báo

1. Đi tới **Admin → Alerts → New Alert**
2. Chọn context và metric
3. Định nghĩa điều kiện (ngưỡng hoặc sự bất thường)
4. Chọn kênh thông báo
5. Nhấn **Save**
