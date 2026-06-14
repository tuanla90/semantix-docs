# Data Pipelines

**Điều hướng:** Studio → DE → Data Pipelines

Data Pipelines tự động hoá việc đồng bộ dữ liệu từ nguồn (source) sang đích (destination) theo lịch định sẵn hoặc kích hoạt thủ công. Pipeline phù hợp khi bạn cần chuyển dữ liệu từ database sang Google Sheets, giữa các database, hoặc theo cấu trúc template.

## Khái Niệm Cơ Bản

| Khái Niệm | Ý Nghĩa |
|-----------|---------|
| **Source** | Nguồn dữ liệu — một Connection hoặc Data Template |
| **Destination** | Đích nhận dữ liệu — Connection, Google Sheet, v.v. |
| **Schedule** | Lịch chạy tự động (cron expression) |
| **Sync** | Chạy pipeline thủ công ngay lập tức |

## Tạo Pipeline Mới

1. Vào **Studio → DE → Data Pipelines → New Pipeline**
2. Đặt **Tên** và **Mô tả**
3. Chọn **Source** (nguồn):
   - **Database Query**: Kết nối trực tiếp từ một Connection, chọn bảng hoặc viết SQL
   - **Google Sheets Source**: Lấy dữ liệu từ Google Sheet
   - **Data Template**: Dùng một Data Template đã có với tham số đặt sẵn
4. Chọn **Destination** (đích nhận):
   - Connection database đích (write mode)
   - Google Sheets đích
5. Cấu hình **Schedule** (cron) nếu muốn chạy tự động
6. Nhấn **Save**

## Chạy Pipeline

- **Sync ngay**: Nhấn nút **Run Sync** trên card pipeline hoặc trong trang chi tiết
- **Tự động theo lịch**: Hệ thống sẽ tự chạy theo cron expression đã đặt
- Sau khi sync, hệ thống hiển thị số bản ghi đã đồng bộ và trạng thái

## Quyền Truy Cập Pipeline

Mỗi pipeline có thể phân quyền theo cấp độ:

| Cấp Độ | Quyền |
|--------|-------|
| **Owner** | Toàn quyền chỉnh sửa và xóa |
| **Approver** | Xem xét và phê duyệt thay đổi |
| **Editor** | Chỉnh sửa cấu hình |
| **Viewer** | Chỉ xem |

## Lưu Ý

- Pipeline có hỗ trợ **Change Requests** — thay đổi cần được phê duyệt trước khi áp dụng (nếu bật).
- Lịch sử thay đổi (Versions) được ghi lại tự động.
- Kết nối đích phải hỗ trợ **write mode** (có quyền ghi).
