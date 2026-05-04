# Báo Cáo Định Kỳ (Scheduled Reports)

Tự động tạo và gửi báo cáo qua email theo lịch trình — hàng ngày, hàng tuần hoặc hàng tháng.

## Các Định Dạng Hỗ Trợ

- **PDF** — ảnh chụp toàn bộ dashboard
- **CSV** — xuất dữ liệu thô (raw data)
- **Excel (XLSX)** — bảng tính đã được định dạng

## Thiết Lập Một Báo Cáo Định Kỳ

1. Đi tới **Admin → Reports → New Report**
2. Cấu hình:

| Trường | Mô Tả |
|-------|-------------|
| **Name** | Tên báo cáo |
| **Dashboard** | Dashboard cần xuất báo cáo |
| **Format** | PDF, CSV, hoặc XLSX |
| **Schedule** | Lịch trình dưới dạng biểu thức Cron hoặc tùy chọn có sẵn (hàng ngày, hàng tuần, hàng tháng) |
| **Recipients** | Các địa chỉ email người nhận |
| **Subject** | Tiêu đề email |

3. Nhấn **Save**

## Các Ví Dụ Về Lịch Trình (Schedule Examples)

| Tùy Chọn Có Sẵn | Cron | Mô Tả |
|--------|------|-------------|
| Daily at 8am | `0 8 * * *` | Hàng ngày vào lúc 08:00 sáng |
| Weekly Monday | `0 9 * * 1` | Thứ Hai hàng tuần lúc 09:00 sáng |
| Monthly 1st | `0 7 1 * *` | Ngày 1 hàng tháng lúc 07:00 sáng |

## Các Yêu Cầu

- Biến `CRON_SECRET` phải được thiết lập trong biến môi trường (environment variables)
- Một nhà cung cấp email (email provider - SMTP) phải được cấu hình trong **Admin → Settings → Email**
- Lịch trình cron job phải gọi đến endpoint `/api/cron/reports` bằng Bearer token chính xác theo đúng lịch trình

> 💡 Có thể sử dụng các dịch vụ như Railway Cron, Vercel Cron, hoặc một crontab của hệ thống để gọi tới endpoint theo lịch trình.
