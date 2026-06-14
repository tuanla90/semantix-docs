# Quan Hệ (Relations)

**Điều hướng:** Studio → DABI → Data Models → chọn Model → tab Relations

Relations khai báo cách JOIN giữa các Model. Nhờ đó, AI có thể tự động kết hợp dữ liệu từ nhiều bảng khi cần, mà người dùng không cần viết SQL JOIN.

## Tạo Relation Mới

1. Trong trang chỉnh sửa Model, chuyển sang tab **Relations**
2. Nhấn **Add Relation**
3. Điền thông tin:

| Thuộc tính | Ví Dụ Cấu Hình |
|------------|----------------|
| **Source Model** | `don_hang` (model hiện tại) |
| **Source Column** | `customer_id` (khóa ngoại) |
| **Target Model** | `khach_hang` (model muốn JOIN) |
| **Target Column** | `id` (khóa chính của đích) |
| **Join Type** | `LEFT JOIN` hoặc `INNER JOIN` |

## Các Loại Quan Hệ

| Loại | Ví Dụ |
|------|-------|
| **One-to-Many (1:N)** | 1 Đơn hàng → N Chi tiết đơn |
| **Many-to-One (N:1)** | N Đơn hàng → 1 Khách hàng |
| **Many-to-Many (N:N)** | Xử lý qua bảng trung gian |

## Cơ Chế Hoạt Động

Sau khi khai báo Relation, khi người dùng hỏi _"doanh thu theo tỉnh thành của khách hàng"_, AI tự động JOIN `don_hang` với `khach_hang` để lấy thông tin địa chỉ — không cần can thiệp thủ công.

> Nên dùng `LEFT JOIN` cho các phân tích để giữ lại tất cả bản ghi từ bảng nguồn, kể cả khi bảng đích không có dữ liệu tương ứng.
