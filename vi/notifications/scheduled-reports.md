# Báo Cáo Định Kỳ (Scheduled Reports)

Tự động tạo và gửi báo cáo theo lịch — không cần ai nhớ xuất báo cáo mỗi ngày/tuần/tháng.

---

## Các Định Dạng Báo Cáo

| Định Dạng | Mô Tả | Phù Hợp |
|-----------|--------|---------|
| **PDF** | Ảnh chụp toàn bộ Dashboard, đúng layout | Báo cáo trình bày, gửi ban lãnh đạo |
| **CSV** | Dữ liệu thô từ widget, mỗi widget một file | Phân tích thêm trong Excel |
| **Excel (XLSX)** | Bảng tính có định dạng từ widget | Kế toán, tài chính |

---

## Tạo Scheduled Report

1. Vào Dashboard cần gửi báo cáo
2. Nhấn nút **⋮** (menu góc trên phải) → **Schedule Report**
3. Hoặc: **Admin → Notifications → Scheduled Reports → New Report**

### Các Trường Cấu Hình

| Trường | Mô Tả | Ví Dụ |
|--------|--------|-------|
| **Name** | Tên báo cáo | "Doanh thu Hàng Ngày - Sales Team" |
| **Dashboard** | Dashboard cần xuất | Chọn từ danh sách |
| **Format** | Định dạng file | PDF / CSV / XLSX |
| **Schedule** | Lịch gửi | Chọn preset hoặc cron expression |
| **Time Zone** | Múi giờ áp dụng cho lịch | Asia/Ho_Chi_Minh |
| **Recipients** | Danh sách email nhận | nguyen@company.com, team@company.com |
| **CC** | Email CC | manager@company.com |
| **Email Subject** | Tiêu đề email | "📊 Báo Cáo Doanh Thu {{date}}" |
| **Email Body** | Nội dung email | Tùy chỉnh văn bản kèm báo cáo |

### Biến Trong Subject và Body

| Biến | Giá Trị | Ví Dụ Kết Quả |
|------|---------|--------------|
| `{{date}}` | Ngày gửi báo cáo | `2026-06-22` |
| `{{date_formatted}}` | Ngày định dạng đẹp | `Thứ Hai, 22/06/2026` |
| `{{dashboard_name}}` | Tên Dashboard | `Báo Cáo Doanh Thu` |
| `{{period}}` | Kỳ báo cáo (nếu có) | `Tuần 25/2026` |

---

## Cài Đặt Lịch Gửi

### Preset Có Sẵn

| Tên | Cron | Thời Điểm |
|-----|------|-----------|
| Daily 7am | `0 7 * * *` | Mỗi ngày 7:00 sáng |
| Daily 8am | `0 8 * * *` | Mỗi ngày 8:00 sáng |
| Weekly Monday | `0 8 * * 1` | Thứ Hai hàng tuần 8:00 sáng |
| Monthly 1st | `0 8 1 * *` | Ngày 1 hàng tháng 8:00 sáng |
| Monthly Last Day | `0 8 L * *` | Ngày cuối tháng 8:00 sáng |
| Quarterly | `0 8 1 1,4,7,10 *` | Ngày 1 của tháng 1, 4, 7, 10 |

### Custom Cron Expression

Nhập trực tiếp biểu thức cron nếu preset không phù hợp:

```
* * * * *
│ │ │ │ │
│ │ │ │ └─ Ngày trong tuần (0-7, 0/7=CN, 1=T2...)
│ │ │ └─── Tháng (1-12)
│ │ └───── Ngày trong tháng (1-31)
│ └─────── Giờ (0-23)
└───────── Phút (0-59)
```

**Ví dụ cụ thể:**

| Yêu Cầu | Cron Expression |
|---------|----------------|
| 7h30 sáng mỗi ngày làm việc (T2-T6) | `30 7 * * 1-5` |
| 8h sáng T2 và T5 | `0 8 * * 1,4` |
| Ngày 15 hàng tháng lúc 9h | `0 9 15 * *` |
| Mỗi 6 giờ | `0 */6 * * *` |
| 23h59 ngày cuối năm | `59 23 31 12 *` |

---

## Yêu Cầu Kỹ Thuật

### SMTP Phải Được Cấu Hình

Để gửi email báo cáo, SMTP phải được thiết lập:
1. Vào **Admin → Config → Platform Integrations → Tab: Email**
2. Điền thông tin SMTP server
3. Test gửi email trước khi cài Scheduled Report

### CRON_SECRET

Biến môi trường `CRON_SECRET` phải được đặt trong `.env`:
```env
CRON_SECRET=random_secret_string_here
```

Semantix dùng secret này để bảo vệ endpoint cron job:
```
GET /api/cron/reports
Authorization: Bearer CRON_SECRET
```

### Cron Job Trigger

Scheduled Reports cần một **cron job bên ngoài** gọi endpoint theo lịch. Chọn một trong các cách:

**Hệ thống Linux (crontab):**
```bash
# Crontab entry: mỗi phút kiểm tra và gửi báo cáo đến hạn
* * * * * curl -s -H "Authorization: Bearer YOUR_CRON_SECRET" https://your-domain.com/api/cron/reports
```

**Vercel Cron (nếu deploy trên Vercel):**
```json
// vercel.json
{
  "crons": [
    {
      "path": "/api/cron/reports",
      "schedule": "* * * * *"
    }
  ]
}
```

**Railway Cron:**
Tạo service chạy lệnh curl theo schedule.

---

## Quản Lý Reports

### Xem Danh Sách

**Admin → Notifications → Scheduled Reports** — hiển thị:
- Tên report
- Dashboard đích
- Lịch gửi
- Lần gửi gần nhất và trạng thái (Success/Failed)
- Bật/tắt report

### Xem Lịch Sử Gửi

Nhấn vào report → tab **History**:
- Xem từng lần gửi
- Download file đã gửi
- Xem lỗi nếu gửi thất bại

### Gửi Ngay (Send Now)

Nhấn **Send Now** để gửi báo cáo ngay lập tức mà không cần chờ lịch — hữu ích để test hoặc gửi báo cáo đột xuất.

---

## Xử Lý Lỗi Thường Gặp

| Lỗi | Nguyên Nhân | Giải Pháp |
|-----|-------------|-----------|
| Không nhận được email | SMTP chưa cấu hình | Cấu hình SMTP trong Platform Integrations |
| Email vào Spam | Domain không có SPF/DKIM | Cấu hình SPF/DKIM record cho domain |
| Report gửi sai giờ | Time Zone sai | Đổi Time Zone trong Report settings |
| PDF rỗng hoặc thiếu widget | Dashboard có widget lỗi | Kiểm tra và sửa lỗi widget trước khi schedule |
| `CRON_SECRET not set` | Thiếu biến môi trường | Thêm `CRON_SECRET` vào `.env` và restart |
| Report không tự gửi | Cron job chưa chạy | Kiểm tra crontab / Vercel Cron đang hoạt động |
