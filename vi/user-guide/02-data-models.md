# 2. Tạo Model (Mô Hình Dữ Liệu)

Model là lớp ánh xạ chuyển đổi từ cấu trúc vật lý của cơ sở dữ liệu (các bảng/sheet) sang các khái niệm kinh doanh giúp AI có thể hiểu được.

**Điều hướng:** Admin → Models → **New Model**

## Bước 1 — Chọn Connection & Table

1. Chọn **Connection** mà bạn vừa tạo ở bước trước.
2. Hệ thống sẽ tải và hiển thị danh sách các bảng (table) hoặc sheet có sẵn.
3. Chọn table bạn cần dùng → nhấn **Import**.

## Bước 2 — Đặt Tên & Mô Tả Model

- **Name**: Tên ngắn gọn dùng trong hệ thống. Nên dùng tiếng Anh hoặc tiếng Việt không dấu, không khoảng trắng (ví dụ: `don_hang`, `sales_order`).
- **Label**: Tên hiển thị thân thiện trên giao diện (ví dụ: `Đơn hàng bán`).
- **Description**: Mô tả mục đích của model. AI sẽ đọc thông tin này để hiểu ngữ cảnh của dữ liệu trong bảng.

## Bước 3 — Cấu Hình Các Cột (Physical Columns)

Với mỗi cột được import, bạn cần khai báo:

| Thuộc tính | Ý nghĩa |
|------------|---------|
| **Label** | Tên hiển thị thân thiện, có thể dùng tiếng Việt có dấu. |
| **Data Type** | Định dạng dữ liệu của hệ thống: `string`, `number`, `date`, `boolean`. |
| **Description** | Mô tả ý nghĩa của cột (điều này rất quan trọng để AI match chính xác câu hỏi của người dùng). |

## Bước 4 — Khai Báo Primary Key

Đánh dấu cột đóng vai trò là **Primary Key (Khóa chính)**. Hệ thống sẽ sử dụng khóa này để xác định bản ghi duy nhất, đặc biệt hữu ích khi thực hiện lệnh JOIN với các bảng khác.

## Bước 5 — Lưu Model

Nhấn **Save** để hoàn tất quá trình tạo model.
