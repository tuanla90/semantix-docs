# Data Models (Mô Hình Dữ Liệu)

**Điều hướng:** Studio → DABI → Data Models

Data Model là lớp ánh xạ chuyển đổi từ cấu trúc vật lý của database (các bảng/sheet) sang các khái niệm kinh doanh mà AI có thể hiểu. Mỗi Model tương ứng với một bảng hoặc view trong nguồn dữ liệu.

## Tạo Model Mới

1. Vào **Studio → DABI → Data Models → New Model**
2. Chọn **Connection** và **Bảng** (table/sheet) cần dùng
3. Nhấn **Import** để tải danh sách cột

### Thông Tin Cơ Bản

| Thuộc tính | Mô tả |
|------------|-------|
| **Name** | Tên kỹ thuật, không dấu, không khoảng trắng (ví dụ: `don_hang`) |
| **Label** | Tên hiển thị thân thiện (ví dụ: `Đơn hàng bán`) |
| **Description** | AI đọc để hiểu ngữ cảnh của bảng |

### Cấu Hình Cột (Columns Tab)

Với mỗi cột, khai báo:

| Thuộc tính | Ý nghĩa |
|------------|---------|
| **Label** | Tên hiển thị, có thể tiếng Việt có dấu |
| **Data Type** | `TEXT`, `INTEGER`, `DOUBLE`, `BOOLEAN`, `DATE`, `DATETIME` |
| **Description** | Mô tả ý nghĩa cột — quan trọng để AI match đúng câu hỏi |
| **Primary Key** | Đánh dấu cột là khóa chính |
| **Searchable** | Cho phép AI lọc theo cột này |

### Trường Tính Toán (Calculated Fields)

Xem hướng dẫn chi tiết tại [Calculated Fields](calculated-fields.md).

### Chỉ Số Kinh Doanh (Metrics)

Xem hướng dẫn chi tiết tại [Metrics](metrics.md).

### Quan Hệ (Relations)

Xem hướng dẫn chi tiết tại [Relations](relations.md).

## Các Tab Trong Model Editor

| Tab | Nội Dung |
|-----|---------|
| **Overview** | Thông tin cơ bản, connection, bảng nguồn |
| **Tables** | Các bảng vật lý được liên kết vào model này |
| **Columns** | Danh sách cột, khai báo label, type, description |
| **Calculated Fields** | Tạo cột tính toán từ biểu thức SQL |
| **Metrics** | Định nghĩa KPI, chỉ số tổng hợp |
| **Relations** | Khai báo JOIN với các model khác |
| **Contexts** | Các Context đang dùng model này |
| **Access Control** | Phân quyền theo user/role |
| **Versions** | Lịch sử thay đổi |
| **Change Requests** | Yêu cầu thay đổi đang chờ duyệt |

## Lưu Ý Quan Trọng

> Hãy đầu tư thời gian viết **Description** cho mỗi cột và metric. AI sử dụng mô tả này để hiểu câu hỏi của người dùng — mô tả càng chi tiết, kết quả càng chính xác.
