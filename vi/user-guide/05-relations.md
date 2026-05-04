# 5. Khai Báo Relations (Quan Hệ)

Relations (Các mối quan hệ) cho phép AI tự động thực hiện lệnh `JOIN` giữa các bảng khi cần thiết. Điều này giúp người dùng cuối hoàn toàn không cần phải biết hoặc viết các câu lệnh SQL JOIN phức tạp.

**Điều hướng:** Admin → Models → chọn Model → tab **Relations** → **Add Relation**

## Các Loại Quan Hệ Hỗ Trợ

| Loại Quan Hệ | Ví dụ Thực Tế |
|--------------|---------------|
| **One-to-Many (1:N)** (Một-Nhiều) | 1 Đơn hàng → N Chi tiết đơn hàng |
| **Many-to-One (N:1)** (Nhiều-Một) | N Đơn hàng → 1 Khách hàng |
| **Many-to-Many (N:N)** (Nhiều-Nhiều) | Thường xử lý qua một bảng trung gian (Junction table) |

## Cấu Hình Một Relation

Khi tạo một Relation mới, bạn đang khai báo cách model hiện tại liên kết với một model khác:

| Thuộc tính | Ví dụ Cấu Hình |
|------------|----------------|
| **Source Model** | `don_hang` (model hiện tại) |
| **Source Column** | `customer_id` (khóa ngoại) |
| **Target Model** | `khach_hang` (model bạn muốn nối tới) |
| **Target Column** | `id` (khóa chính của model đích) |
| **Join Type** | `LEFT JOIN` (khuyên dùng cho phân tích) hoặc `INNER JOIN` |

> **Cơ chế hoạt động:** Sau khi khai báo Relation này, khi người dùng hỏi *"doanh thu theo tỉnh thành của khách hàng"*, AI sẽ tự động hiểu và `JOIN` bảng `don_hang` với bảng `khach_hang` để lấy thông tin địa chỉ mà không cần bất kỳ can thiệp thủ công nào.
