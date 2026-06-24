# Microsoft Teams

Kết nối Semantix với Microsoft Teams để nhận cảnh báo và báo cáo dữ liệu trực tiếp trong các kênh Teams.

---

## Hai Phương Thức Tích Hợp

| Phương Thức | Mô Tả | Phù Hợp |
|-------------|--------|---------|
| **Incoming Webhook** | Chỉ nhận thông báo một chiều | Alerts, Scheduled Reports |
| **Teams Bot** | Hai chiều: nhận thông báo + truy vấn dữ liệu qua chat | Teams interactive |

---

## Phương Thức 1: Incoming Webhook (Đơn Giản Hơn)

Phù hợp nếu chỉ cần gửi cảnh báo vào kênh Teams, không cần chat tương tác.

### Tạo Incoming Webhook Trong Teams

1. Mở Microsoft Teams
2. Tìm kênh muốn nhận thông báo → nhấn **⋯** bên cạnh tên kênh
3. Chọn **Connectors** (hoặc **Manage channel → Connectors**)
4. Tìm **Incoming Webhook** → nhấn **Configure**
5. Đặt tên (ví dụ: "Semantix Alerts") và upload logo nếu muốn
6. Nhấn **Create** → Copy **Webhook URL**

URL có dạng:
```
https://company.webhook.office.com/webhookb2/xxx@xxx/IncomingWebhook/xxx/xxx
```

### Kết Nối Trong Semantix

1. Vào **Admin → Config → Platform Integrations → Tab: Channels**
2. Nhấn **New Channel → Microsoft Teams (Webhook)**
3. Điền:
   - **Name**: Tên kênh (ví dụ: "Teams Analytics Channel")
   - **Webhook URL**: URL từ bước trên
4. Nhấn **Test** — Teams sẽ nhận một tin nhắn test dạng Adaptive Card
5. Nhấn **Save**

---

## Phương Thức 2: Teams Bot (Tương Tác Hai Chiều)

Phù hợp nếu muốn team có thể hỏi dữ liệu trực tiếp trong Teams chat.

### Bước 1: Đăng Ký Azure Bot

1. Truy cập [portal.azure.com](https://portal.azure.com)
2. Tìm **"Azure Bot"** trong marketplace → **Create**
3. Điền:
   - **Bot handle**: Tên bot (ví dụ: `SemantixBot`)
   - **Subscription**: Subscription Azure của công ty
   - **Resource Group**: Tạo mới hoặc dùng có sẵn
   - **Pricing tier**: F0 (miễn phí cho dev) hoặc S1
4. Nhấn **Review + Create → Create**
5. Sau khi tạo xong → vào Bot resource → tab **Configuration**:
   - Lưu **Microsoft App ID**
   - Nhấn **Manage** → tạo **Client Secret** → lưu ngay (chỉ hiển thị một lần)

### Bước 2: Bật Kênh Teams

1. Trong Azure Bot → tab **Channels**
2. Nhấn **Microsoft Teams**
3. Chọn loại Teams: Commercial (cho tenant thông thường)
4. Nhấn **Apply**

### Bước 3: Kết Nối Trong Semantix

1. Vào **Admin → Config → Platform Integrations → Tab: Channels**
2. Nhấn **New Channel → Microsoft Teams (Bot)**
3. Điền:

| Trường | Mô Tả |
|--------|--------|
| **Name** | Tên kênh trong Semantix |
| **App ID** | Microsoft App ID từ Azure Bot |
| **App Password** | Client Secret từ Azure Bot |
| **Default Context ID** | Context để trả lời câu hỏi của user |
| **Semantix API Key** | API Key với scope `execute:query` |

4. Sau khi Save → Semantix sinh ra **Channel ID** và **Messaging Endpoint**
5. Quay lại Azure Bot → **Configuration**:
   - **Messaging endpoint**: URL từ Semantix (ví dụ: `https://your-domain.com/api/teams/webhook?channelId=CHANNEL_ID`)
6. Nhấn **Apply**

### Bước 4: Cài Bot Vào Teams

1. Trong Teams → **Apps** (thanh trái) → **Manage your apps**
2. Nhấn **Upload an app** → **Upload a custom app**
3. Upload file manifest (tải từ trang Channel trong Semantix)
4. Thêm bot vào workspace hoặc kênh cụ thể

---

## Tương Tác Với Bot Trong Teams

Sau khi cài xong, @mention bot trong bất kỳ kênh nào có bot:

```
@SemantixBot Doanh thu tháng này bao nhiêu?

@SemantixBot Top 5 sản phẩm bán chạy nhất tuần qua

@SemantixBot So sánh doanh thu tháng 6 và tháng 5
```

Bot trả lời dạng **Adaptive Card** với bảng dữ liệu và link xem đầy đủ trên Semantix.

---

## Sử Dụng Với Alerts và Scheduled Reports

Sau khi cấu hình một trong hai phương thức, chọn kênh Teams khi tạo Alert hoặc Scheduled Report.

**Alert Teams Adaptive Card** trông như sau:
```
🚨 CẢNH BÁO: Doanh thu thấp
─────────────────────────────
Giá trị hiện tại: 8,500,000 VNĐ
Ngưỡng: 10,000,000 VNĐ
Thay đổi: -15% so với hôm qua
─────────────────────────────
[Xem Dashboard] [Chi Tiết]
```

---

## Xử Lý Lỗi

| Lỗi | Nguyên Nhân | Giải Pháp |
|-----|-------------|-----------|
| Webhook test thất bại | Webhook URL sai hoặc đã hết hạn | Tạo lại Incoming Webhook trong Teams |
| Bot không nhận tin nhắn | Messaging Endpoint chưa cập nhật | Cập nhật endpoint trong Azure Bot |
| `401 Unauthorized` trong Bot | App ID/Password sai | Kiểm tra lại trong Azure Bot Configuration |
| Bot không hiển thị trong Teams | Manifest chưa upload hoặc sai format | Upload lại manifest từ Semantix |
