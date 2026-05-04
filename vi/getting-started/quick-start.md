# Bắt Đầu Nhanh

Khởi chạy và sử dụng Semantix trong vòng chưa đầy 10 phút.

## Bước 1 — Kết Nối Database

1. Đi tới **Admin → Connections → New Connection**
2. Chọn loại database của bạn (PostgreSQL, MySQL, BigQuery, v.v.)
3. Nhập thông tin đăng nhập connection của bạn
4. Nhấn **Test Connection** để xác minh, sau đó nhấn **Save**

> 💡 Semantix mã hóa tất cả thông tin đăng nhập ở trạng thái nghỉ (at rest). Mật khẩu của bạn không bao giờ được lưu dưới dạng plain text.

## Bước 2 — Tạo Data Model

1. Đi tới **Admin → Contexts → New Context**
2. Chọn connection bạn vừa tạo
3. Chọn các bảng (tables) mà bạn muốn mở để truy vấn
4. Định nghĩa các quan hệ (relations) giữa các bảng nếu cần
5. Nhấn **Save**

## Bước 3 — Cấu Hình AI Assistant

1. Đi tới **Admin → AI Providers → New Provider**
2. Nhập API key của bạn (OpenAI, Anthropic, Gemini, hoặc hãng khác)
3. Đi tới **Admin → Assistants → New Assistant**
4. Chỉ định AI provider và liên kết nó với context của bạn

## Bước 4 — Bắt Đầu Trò Chuyện (Chatting)

1. Mở **Analysis** từ thanh điều hướng chính
2. Chọn context của bạn
3. Nhập câu hỏi bằng ngôn ngữ tự nhiên, ví dụ:
   - *"Hiển thị tổng doanh thu theo tháng của năm 2024"*
   - *"Sản phẩm nào có tỷ lệ hoàn trả cao nhất trong quý trước?"*
4. Semantix tạo ra SQL, chạy nó và trả về kết quả kèm theo biểu đồ

## Bước 5 — Xây Dựng Dashboard

1. Đi tới **Dashboards → New Dashboard**
2. Thêm các widget từ các truy vấn đã lưu của bạn
3. Sắp xếp và điều chỉnh kích thước biểu đồ (charts) theo nhu cầu
4. Chia sẻ URL của dashboard với team của bạn

## Bước Tiếp Theo?

- [Kết nối thêm các databases](../connections/README.md)
- [Thiết lập Row-Level Security](../contexts/rls.md)
- [Khám phá Public API](../api-reference/README.md)
- [Cấu hình cảnh báo trên Telegram](../notifications/telegram.md)
