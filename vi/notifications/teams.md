# Microsoft Teams

Kết nối Semantix với Microsoft Teams để truy vấn dữ liệu và nhận cảnh báo trực tiếp trong các kênh Teams.

## Các Tính Năng

- Đặt các câu hỏi bằng ngôn ngữ tự nhiên trong bất kỳ kênh hoặc chat nào trên Teams
- Kết quả được hiển thị dưới dạng các Adaptive Cards phong phú
- Có các lời nhắc làm rõ (clarification prompts) khi câu hỏi không rõ ràng

## Thiết Lập

### Bước 1 — Đăng Ký Một Azure Bot

1. Đi tới [portal.azure.com](https://portal.azure.com)
2. Tạo một tài nguyên **Azure Bot** mới
3. Lưu ý **App ID** và tạo một **Client Secret**
4. Trong phần **Channels**, bật tính năng **Microsoft Teams**
5. Thiết lập **Messaging Endpoint** thành:
   ```
   https://your-semantix-domain.com/api/teams/webhook?channelId=CHANNEL_ID
   ```

### Bước 2 — Kết Nối Trong Semantix

1. Đi tới **Admin → Channels → New Channel → Microsoft Teams**
2. Nhập vào:
   - **App ID** — lấy từ Azure Bot đã đăng ký
   - **App Password** — lấy từ client secret
   - **Default Context ID** — context mà người dùng sẽ truy vấn
   - **Semantix API Key** — để thực thi truy vấn
3. Sao chép **Channel ID** đã được sinh ra
4. Cập nhật Azure Bot Messaging Endpoint với Channel ID này
5. Nhấn **Save**

### Bước 3 — Cài Đặt Bot Vào Teams

1. Trong Teams, đi tới **Apps → Upload a custom app**
2. Tải lên file bot manifest hoặc thêm nó thông qua App ID
3. Thêm bot vào kênh hoặc chat mong muốn

## Truy Vấn Trong Teams

Nhắc đến (Mention) bot hoặc gửi một tin nhắn trong một nhóm chat đã được kết nối:

```
@SemantixBot Hiển thị xu hướng doanh thu hàng tuần
@SemantixBot Những sản phẩm nào đang hoạt động kém hiệu quả?
```

Kết quả sẽ xuất hiện dưới dạng các Adaptive Cards kèm theo các bảng dữ liệu và một link để xem kết quả đầy đủ trên Semantix.

## Bảo Mật

Các webhook requests trên Teams được xác thực (validated) bằng các JWT tokens có chữ ký số của Microsoft's Bot Framework — đảm bảo chỉ xử lý những tin nhắn Teams hợp lệ.
