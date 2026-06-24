# Telegram Bot

Kết nối Semantix với Telegram để nhận cảnh báo dữ liệu, báo cáo định kỳ, và thậm chí truy vấn dữ liệu trực tiếp trong Telegram.

---

## Tính Năng

- Nhận cảnh báo Alert khi metric vượt ngưỡng (ví dụ: "Doanh thu ngày giảm > 20%")
- Nhận Scheduled Report theo lịch (PDF, CSV)
- Hỏi dữ liệu bằng ngôn ngữ tự nhiên trong Telegram chat
- Kết quả hiển thị dạng bảng văn bản gọn gàng

---

## Thiết Lập Bot Telegram

### Bước 1: Tạo Bot Mới Với BotFather

1. Mở Telegram → tìm kiếm **@BotFather**
2. Nhấn **Start**
3. Gửi lệnh: `/newbot`
4. BotFather hỏi tên bot → nhập tên hiển thị (ví dụ: `Semantix Analytics Bot`)
5. BotFather hỏi username → nhập username (phải kết thúc bằng `bot`): `MyCompanySemantixBot`
6. BotFather trả về **Bot Token**: `7123456789:AAFxxxxxxxxxxxxxxxxxxxxxxxx`
7. **Copy Bot Token** — cần dùng ở bước sau

### Bước 2: Lấy Chat ID

Bạn cần Chat ID để Semantix biết gửi thông báo đến đâu.

**Cho nhóm (Group):**
1. Thêm bot vào nhóm Telegram của công ty
2. Gửi bất kỳ tin nhắn nào trong nhóm (ví dụ: `/start`)
3. Truy cập URL này trên trình duyệt (thay `TOKEN` bằng bot token của bạn):
   ```
   https://api.telegram.org/botTOKEN/getUpdates
   ```
4. Trong kết quả JSON, tìm `"chat"` → `"id"` — Chat ID của nhóm thường có dấu `-` phía trước:
   ```json
   "chat": {
     "id": -1001234567890,
     "title": "Analytics Team",
     "type": "supergroup"
   }
   ```

**Cho cá nhân (Direct Message):**
1. Tìm bot trên Telegram và nhấn `/start`
2. Truy cập URL getUpdates như trên
3. Chat ID cá nhân là số dương (không có dấu `-`)

### Bước 3: Kết Nối Trong Semantix

1. Vào **Admin → Config → Platform Integrations → Tab: Channels**
2. Nhấn **New Channel → Telegram**
3. Điền các trường:

| Trường | Mô Tả | Ví Dụ |
|--------|--------|-------|
| **Name** | Tên kênh trong Semantix | "Nhóm Analytics Team" |
| **Bot Token** | Token từ BotFather | `7123456789:AAFxxx...` |
| **Chat ID** | ID nhóm hoặc cá nhân | `-1001234567890` |
| **Default Context** | Context dùng khi hỏi qua Telegram | (chọn từ danh sách) |

4. Nhấn **Test Connection** — bot sẽ gửi tin nhắn "Connection test from Semantix" vào nhóm
5. Nhấn **Save**

---

## Sử Dụng Cảnh Báo (Alerts)

Sau khi kết nối, tạo Alert và chọn Telegram channel để nhận thông báo:

1. Trong Dashboard → nhấn vào widget → **⋮ → Create Alert**
2. Hoặc: **Admin → Notifications → New Alert**
3. Chọn:
   - **Channel**: Kênh Telegram vừa tạo
   - **Condition**: Khi nào trigger (ví dụ: doanh thu < 10,000,000)
   - **Message Template**: Nội dung tin nhắn Telegram

**Ví dụ tin nhắn alert:**
```
🚨 CẢNH BÁO DOANH THU

Doanh thu ngày: {{value}} VNĐ
Giảm {{change_pct}}% so với hôm qua

📊 Xem Dashboard: {{dashboard_link}}
```

---

## Truy Vấn Dữ Liệu Qua Telegram

Nếu đã cấu hình **Default Context** cho kênh Telegram, thành viên có thể hỏi dữ liệu trực tiếp:

```
Người dùng: Doanh thu hôm nay bao nhiêu?

Bot: 📊 Kết quả (2026-06-22)
┌──────────────────────┐
│ Doanh thu: 45,230,000│
│ Đơn hàng: 127        │
└──────────────────────┘
```

> Kết quả bị giới hạn 10 hàng trên Telegram để dễ đọc. Xem đầy đủ trên Semantix.

---

## Xử Lý Lỗi Thường Gặp

| Lỗi | Nguyên Nhân | Giải Pháp |
|-----|-------------|-----------|
| Test Connection thất bại | Bot Token sai | Kiểm tra lại token từ BotFather |
| Không nhận được tin nhắn | Chat ID sai hoặc bot chưa được add vào nhóm | Thêm bot vào nhóm trước, lấy lại Chat ID |
| `Forbidden: bot was blocked` | User đã block bot | Unblock bot trong Telegram |
| Chat ID nhóm không hoạt động | Lấy Chat ID trước khi add bot | Add bot vào nhóm, gửi 1 tin, rồi lấy Chat ID |

---

## Bảo Mật

- Chỉ Admin Semantix có thể xem và thay đổi Bot Token
- Thiết lập biến môi trường `TELEGRAM_WEBHOOK_SECRET` nếu dùng webhook mode
- Giới hạn nhóm Telegram nhận cảnh báo chỉ gồm người có quyền xem dữ liệu tương ứng
