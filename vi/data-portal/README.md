# Data Portal — Cổng Dữ Liệu

**Điều hướng:** Data Portal (thanh menu trên cùng)

Data Portal là module cho phép người dùng cuối tra cứu và xuất dữ liệu theo các mẫu báo cáo (Data Templates) được Admin chuẩn bị sẵn — không cần viết SQL hay hiểu cấu trúc database.

## Mục Đích

Data Portal phù hợp với các tình huống:
- Nhân viên nghiệp vụ cần xuất báo cáo định kỳ nhưng không biết SQL
- Tải xuống file Excel/CSV theo bộ lọc (ngày, chi nhánh, sản phẩm...)
- Xuất theo template Excel/Word có định dạng sẵn (bảng lương, hóa đơn, báo cáo tháng)

## Cách Sử Dụng

### Bước 1 — Chọn Template

1. Mở **Data Portal** từ thanh điều hướng chính.
2. Trang hiển thị danh sách các template báo cáo đã được Admin tạo sẵn.
3. Dùng ô **Search** để tìm nhanh theo tên hoặc mô tả.
4. Nhấn vào card của template muốn dùng.

### Bước 2 — Điền Tham Số Lọc

Mỗi template có thể có các tham số lọc khác nhau:

| Loại Tham Số | Ví Dụ |
|--------------|-------|
| **Text** | Tên khách hàng, mã đơn hàng |
| **Number** | Giá trị tối thiểu, ID |
| **Date** | Ngày cụ thể |
| **Date Range** | Khoảng ngày từ... đến... |
| **Select (đơn)** | Chọn chi nhánh, chọn trạng thái |
| **Select (nhiều)** | Chọn nhiều sản phẩm, nhiều khu vực |

Các trường đánh dấu `*` là bắt buộc phải điền.

### Bước 3 — Xuất Dữ Liệu

Tùy theo cấu hình của template, bạn có thể xuất theo một hoặc nhiều định dạng:

| Nút | Định Dạng |
|-----|-----------|
| **Tải xuống CSV** | File CSV thô, phù hợp để import vào Excel hoặc Google Sheets |
| **Tải xuống Excel** | File Excel theo template định dạng sẵn (giữ màu sắc, font, bố cục) |
| **Tải xuống PDF** | Chuyển đổi template sang PDF (nếu được cấu hình) |

> Một số template lớn sẽ xử lý bất đồng bộ — hệ thống sẽ thông báo khi file đã sẵn sàng và tự động tải xuống.

## Dành Cho Admin — Tạo Data Template

Để tạo template mới cho Data Portal, xem hướng dẫn tại [Studio → Data Templates](../studio/data-templates.md).
