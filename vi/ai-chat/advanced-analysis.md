# Tổng Quan Phân Tích Nâng Cao

Semantix tích hợp sẵn các mô hình phân tích nâng cao vượt xa các câu truy vấn SQL thông thường.

## Các Loại Phân Tích Có Sẵn

| Loại | Tốt nhất cho |
|------|----------|
| [Phân Tích Cohort](cohort.md) | Tỷ lệ giữ chân (retention), giá trị vòng đời (LTV) theo giai đoạn chuyển đổi |
| [Phân Tích RFM](rfm.md) | Phân khúc khách hàng theo hành vi |
| [Phân Tích Phễu (Funnel)](funnel.md) | Theo dõi tỷ lệ chuyển đổi qua từng bước |
| **Growth Analysis** | Tốc độ tăng trưởng so với cùng kỳ |
| **Vintage Analysis** | Hiệu suất danh mục (portfolio performance) theo thời điểm hình thành (origination cohort) |
| **Pareto Analysis** | Phân bổ 80/20 của khách hàng hoặc sản phẩm |

## Tìm Chúng Ở Đâu

Các tính năng phân tích nâng cao được cấu hình ở **cấp độ Context**:

1. Đi tới **Admin → Contexts → [Context của bạn]**
2. Nhấn vào tab **Advanced Analysis**
3. Nhấn **Add** và chọn loại phân tích

Sau khi được cấu hình, người dùng có thể truy cập các phân tích này từ trang **Analysis** bằng cách chọn context và chuyển sang tab tương ứng.

## Tùy Chỉnh Các Mẫu SQL (SQL Templates)

Mỗi loại phân tích đều có một mẫu SQL mặc định (default SQL template). Người dùng nâng cao có thể tùy chỉnh các mẫu này:

1. Đi tới **Admin → System Settings**
2. Tìm mẫu (template) cho loại phân tích của bạn (ví dụ: `TEMPLATE_SQL_COHORT`)
3. Chỉnh sửa mẫu SQL

> ⚠️ Chỉ sửa đổi các mẫu này nếu bạn hiểu rõ định dạng input/output được yêu cầu. Các mẫu bị sai sẽ khiến quá trình phân tích thất bại.
