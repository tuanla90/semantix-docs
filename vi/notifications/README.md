# Thông Báo & Cảnh Báo (Notifications & Alerts)

**Điều hướng:** Admin → Notifications (hoặc Admin → Channels và Admin → Alerts)

Semantix có thể tự động gửi **cảnh báo** khi số liệu vượt ngưỡng và **báo cáo định kỳ** qua nhiều kênh khác nhau — giúp đội ngũ luôn cập nhật mà không cần đăng nhập vào hệ thống.

---

## Tổng Quan

### Các Kênh Thông Báo Hỗ Trợ

| Kênh | Loại Thông Báo | Phù Hợp Với |
|------|---------------|------------|
| **Telegram Bot** | Cảnh báo real-time + hỏi AI qua chat | Đội vận hành, quản lý cần thông báo tức thì |
| **Zalo** | Cảnh báo, báo cáo | Người dùng Việt Nam quen dùng Zalo |
| **Microsoft Teams** | Cảnh báo + báo cáo vào channel | Doanh nghiệp dùng Microsoft 365 |
| **Email** | Báo cáo PDF/Excel định kỳ | Báo cáo hàng ngày/tuần/tháng gửi ban lãnh đạo |

### Các Loại Cảnh Báo

| Loại | Mô Tả | Ví Dụ |
|------|--------|--------|
| **Threshold Alert** | Gửi khi metric vượt qua ngưỡng cố định | Doanh thu ngày < 50 triệu |
| **Anomaly Alert** | AI tự phát hiện bất thường | Số đơn tăng đột biến gấp 3 lần trung bình |
| **Scheduled Report** | Báo cáo định kỳ theo lịch | Báo cáo KPI mỗi sáng 8 giờ |

---

## Thiết Lập Kênh Thông Báo

### Bước 1 — Tạo Channel Mới

1. Vào **Admin → Channels → New Channel**.
2. Chọn loại kênh.
3. Điền thông tin cấu hình (xem chi tiết từng kênh bên dưới).
4. Nhấn **Test Connection** để kiểm tra.
5. Nhấn **Save**.

### Cấu Hình Telegram Bot

**Bước chuẩn bị:**
1. Tạo Bot Telegram: Nhắn tin `@BotFather` trên Telegram → gõ `/newbot` → đặt tên và username → nhận **Bot Token**.
2. Tạo group hoặc channel Telegram → thêm Bot vào group.
3. Lấy **Chat ID**:
   - Cách đơn giản: nhắn `@username_bot /start` rồi gọi API `https://api.telegram.org/bot{TOKEN}/getUpdates` để lấy chat_id.
   - Hoặc dùng bot `@getmyid_bot`.

**Cấu hình trong Semantix:**

| Trường | Mô Tả |
|--------|--------|
| **Name** | Tên channel (ví dụ: "Telegram Sales Team") |
| **Bot Token** | Token từ BotFather (dạng `123456:ABC-DEF...`) |
| **Chat ID** | ID của group/channel nhận thông báo |
| **Message Template** | Mẫu tin nhắn (tùy chọn — có thể dùng mặc định) |

Xem hướng dẫn đầy đủ: [Telegram Bot](telegram.md)

### Cấu Hình Zalo

**Bước chuẩn bị:**
1. Tạo Zalo Official Account (OA) tại [oa.zalo.me](https://oa.zalo.me).
2. Tạo ứng dụng tại [developers.zalo.me](https://developers.zalo.me) → lấy App ID và Secret Key.
3. Lấy Access Token với quyền gửi tin nhắn.

**Cấu hình trong Semantix:**

| Trường | Mô Tả |
|--------|--------|
| **Name** | Tên channel |
| **OA Access Token** | Token từ Zalo Developers |
| **User ID / Group ID** | ID người nhận hoặc group nhận thông báo |

Xem hướng dẫn đầy đủ: [Zalo](zalo.md)

### Cấu Hình Microsoft Teams

**Bước chuẩn bị:**
1. Mở Microsoft Teams → đi đến channel muốn nhận thông báo.
2. Nhấn `...` → **Connectors** → **Incoming Webhook** → **Add**.
3. Đặt tên và tải ảnh đại diện (tùy chọn) → **Create** → Copy **Webhook URL**.

**Cấu hình trong Semantix:**

| Trường | Mô Tả |
|--------|--------|
| **Name** | Tên channel |
| **Webhook URL** | URL webhook vừa tạo từ Teams |

Xem hướng dẫn đầy đủ: [Microsoft Teams](teams.md)

### Cấu Hình Email

Email được cấu hình ở cấp hệ thống (SMTP server). Liên hệ Admin hoặc xem cài đặt SMTP trong **Admin → System Settings**.

Xem hướng dẫn báo cáo email: [Báo Cáo Định Kỳ](scheduled-reports.md)

---

## Tạo Cảnh Báo (Alerts)

### Threshold Alert — Cảnh Báo Vượt Ngưỡng

Gửi thông báo khi một metric vượt qua hoặc thấp hơn ngưỡng bạn đặt.

**Bước tạo:**

1. Vào **Admin → Alerts → New Alert**.
2. Điền cấu hình:

| Trường | Bắt Buộc | Ví Dụ |
|--------|----------|--------|
| **Name** | Có | `Cảnh báo doanh thu ngày thấp` |
| **Context** | Có | Chọn Context chứa metric cần theo dõi |
| **Metric** | Có | `daily_revenue` (Doanh thu ngày) |
| **Condition** | Có | `is less than` (nhỏ hơn) |
| **Threshold** | Có | `50000000` (50 triệu VNĐ) |
| **Time Window** | Có | `Today` (trong ngày hôm nay) |
| **Check Every** | Có | `1 hour` (kiểm tra mỗi giờ) |
| **Channel** | Có | Chọn kênh thông báo đã tạo |
| **Message** | Không | Nội dung thông báo tùy chỉnh |
| **Active** | — | Bật để kích hoạt |

**Các Điều Kiện Hỗ Trợ:**

| Điều Kiện | Ý Nghĩa |
|-----------|---------|
| `is greater than` | Metric > Ngưỡng |
| `is less than` | Metric < Ngưỡng |
| `is greater than or equal to` | Metric ≥ Ngưỡng |
| `is less than or equal to` | Metric ≤ Ngưỡng |
| `increases by more than` | Tăng hơn X% so với kỳ trước |
| `decreases by more than` | Giảm hơn X% so với kỳ trước |

**Ví Dụ Cảnh Báo Thực Tế:**

```
[Ví dụ 1] Cảnh báo khi doanh thu ngày thấp
Metric: Tổng doanh thu ngày
Condition: is less than 50,000,000
Check Every: 1 giờ (lúc 18:00 mỗi ngày)
Message: "⚠️ Doanh thu hôm nay chỉ đạt {{value}}đ, thấp hơn mục tiêu 50tr. Vui lòng kiểm tra."
Channel: Telegram Sales Team

[Ví dụ 2] Cảnh báo số đơn hủy cao
Metric: Tỷ lệ đơn hủy (%)
Condition: is greater than 10
Time Window: Today
Message: "🔴 Tỷ lệ đơn hủy hôm nay là {{value}}%, vượt ngưỡng 10%. Cần kiểm tra ngay."
Channel: Teams - Ops Channel

[Ví dụ 3] Thông báo đạt mục tiêu
Metric: Tổng doanh thu ngày  
Condition: is greater than 200,000,000
Message: "🎉 Chúc mừng! Doanh thu hôm nay đã vượt 200 triệu: {{value}}đ"
Channel: Zalo Group Kinh Doanh
```

### Anomaly Alert — Cảnh Báo Bất Thường

AI tự phân tích dữ liệu lịch sử, tính toán "vùng bình thường" (normal range) của metric, và gửi cảnh báo khi phát hiện điểm bất thường.

**Ưu điểm:** Không cần đặt ngưỡng thủ công — AI tự học từ dữ liệu. Phát hiện được các bất thường theo mùa vụ (ví dụ: doanh thu thấp vào Chủ Nhật là bình thường, nhưng thấp vào Thứ Sáu thì bất thường).

**Cấu hình Anomaly Alert:**

| Trường | Mô Tả |
|--------|--------|
| **Metric** | Metric cần giám sát |
| **Sensitivity** | `Low` (ít báo hơn) / `Medium` / `High` (báo nhạy hơn) |
| **Learning Period** | Số ngày lịch sử để AI học "vùng bình thường" (khuyến nghị: 30-90 ngày) |
| **Channel** | Kênh nhận thông báo |

---

## Quản Lý Alerts

### Xem Danh Sách

**Admin → Alerts** → hiển thị tất cả alerts với:
- Tên và loại (Threshold / Anomaly)
- Metric đang theo dõi
- Trạng thái (Active / Paused)
- Lần kích hoạt (trigger) gần nhất
- Kênh thông báo

### Tạm Dừng Alert

Toggle **Active** → Off để tạm dừng mà không xóa cấu hình. Hữu ích khi bảo trì hệ thống hoặc trong kỳ lễ/Tết khi số liệu không theo mùa thường.

### Xem Lịch Sử Trigger

Nhấn vào một Alert → tab **History** → xem danh sách các lần alert đã kích hoạt, giá trị metric tại thời điểm đó, và thông báo đã gửi.

---

## Cảnh Báo Theo Kênh

### Thông Báo Qua Telegram — Tính Năng Đặc Biệt

Ngoài cảnh báo tự động, Bot Telegram Semantix còn cho phép người dùng **hỏi dữ liệu ngay trong Telegram**:

```
User: doanh thu hôm nay
Bot: 📊 Doanh thu hôm nay (22/06/2024): 87,432,000₫ 
     (tăng 12% so với hôm qua)

User: top 5 sản phẩm tháng này
Bot: [Bảng top 5 sản phẩm...]
```

Xem cấu hình chi tiết: [Telegram Bot](telegram.md)

---

## Kiểm Tra Kết Nối Kênh

Sau khi tạo Channel, luôn nhấn **Test Connection** để:
- Xác nhận thông tin cấu hình đúng
- Gửi tin nhắn test đến kênh
- Kiểm tra bạn nhận được thông báo thử nghiệm

Nếu test thất bại, kiểm tra:
- Bot Token / Webhook URL còn hợp lệ không
- Bot đã được thêm vào group chưa
- Group ID đúng chưa (đôi khi cần thêm dấu `-` ở đầu cho group)
