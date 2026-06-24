# Zalo Official Account (Zalo OA)

Kết nối Semantix với Zalo Official Account để gửi cảnh báo và báo cáo cho người dùng Việt Nam qua Zalo — ứng dụng nhắn tin phổ biến nhất Việt Nam.

---

## Tổng Quan

Semantix tích hợp với **Zalo Official Account (Zalo OA)** — không phải tài khoản Zalo cá nhân. Zalo OA là kênh chính thức dành cho doanh nghiệp, cho phép gửi tin nhắn hàng loạt và nhận webhook từ người dùng.

**Bạn cần có:**
- Zalo Official Account đã được xác minh
- Quyền Developer trên Zalo OA đó

---

## Bước 1: Đăng Ký Zalo Official Account

1. Truy cập [oa.zalo.me](https://oa.zalo.me)
2. Nhấn **Tạo OA** → chọn loại OA (Doanh nghiệp)
3. Điền thông tin và upload giấy tờ xác minh
4. Chờ Zalo duyệt (thường 3-7 ngày làm việc)

Nếu đã có Zalo OA, bỏ qua bước này.

---

## Bước 2: Cấu Hình Webhook Trên Zalo OA

1. Đăng nhập [developers.zalo.me](https://developers.zalo.me)
2. Chọn ứng dụng Zalo OA của bạn (hoặc tạo ứng dụng mới)
3. Vào tab **Webhook**
4. Nhập **Callback URL**:
   ```
   https://your-semantix-domain.com/api/webhooks/zalo
   ```
5. Bật các sự kiện cần lắng nghe:
   - `Message`: Nhận tin nhắn từ người dùng (nếu muốn tích hợp chat)
   - `Follow/Unfollow`: Theo dõi/bỏ theo dõi OA
6. Nhấn **Xác nhận** → Zalo sẽ gửi request xác minh đến Callback URL
7. Lưu **App Secret** (cần cho bước 3)

---

## Bước 3: Lấy Access Token

1. Trong Zalo Developer console → tab **Access Token**
2. Nhấn **Tạo Access Token** hoặc lấy token hiện có
3. Lưu **Access Token** (dùng để gửi tin nhắn)

> Access Token Zalo OA có thể cần refresh định kỳ (thường 90 ngày). Cấu hình refresh tự động hoặc cập nhật thủ công khi token hết hạn.

---

## Bước 4: Kết Nối Trong Semantix

1. Vào **Admin → Config → Platform Integrations → Tab: Channels**
2. Nhấn **New Channel → Zalo**
3. Điền các trường:

| Trường | Mô Tả |
|--------|--------|
| **Name** | Tên kênh trong Semantix (ví dụ: "Zalo OA Công ty") |
| **OA Access Token** | Access Token của Zalo OA |
| **App Secret** | App Secret để xác minh chữ ký webhook |
| **OA ID** | ID của Zalo OA (lấy từ Developer Console) |

4. Nhấn **Test Connection** — Semantix gửi tin nhắn test đến OA
5. Nhấn **Save**

---

## Cấu Hình Biến Môi Trường

Thêm vào file `.env` trên server Semantix:

```env
ZALO_WEBHOOK_SECRET=app_secret_cua_zalo_oa
```

Biến này dùng để xác minh chữ ký HMAC của mỗi request webhook từ Zalo — ngăn chặn request giả mạo.

---

## Sử Dụng Với Alerts và Scheduled Reports

Sau khi cấu hình, chọn kênh Zalo khi tạo Alert hoặc Scheduled Report:

**Alert:** Admin → Notifications → New Alert → Channel: chọn kênh Zalo

**Scheduled Report:** Dashboard → Export → Schedule Report → Delivery: Email + Zalo

**Ví dụ tin nhắn Alert qua Zalo:**
```
[CẢNH BÁO] Số đơn hủy cao
Số đơn hủy hôm nay: 45 đơn (tăng 80% so với hôm qua)
Xem chi tiết: https://your-domain.com/dashboards/orders
```

---

## Giới Hạn Zalo OA

| Giới Hạn | Mô Tả |
|----------|-------|
| Tin nhắn / ngày | Phụ thuộc gói Zalo OA (thường 10,000 - 100,000/ngày) |
| Người nhận | Chỉ gửi cho người đã Follow OA |
| Loại nội dung | Text, hình ảnh, file, template message |

> Để gửi thông báo cho người dùng chưa Follow OA, cần dùng Zalo Notification Service (ZNS) — dịch vụ tính phí riêng của Zalo.

---

## Xử Lý Lỗi

| Lỗi | Nguyên Nhân | Giải Pháp |
|-----|-------------|-----------|
| Webhook xác minh thất bại | App Secret sai | Kiểm tra lại App Secret trong Developer Console |
| `Access token expired` | Token hết hạn | Làm mới Access Token trong Zalo Developer Console |
| `OA not found` | OA ID sai | Kiểm tra lại OA ID |
| Người dùng không nhận được tin | Chưa Follow OA | Yêu cầu người dùng Follow OA trên Zalo |
