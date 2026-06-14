# Attributes (Thuộc Tính Người Dùng)

**Điều hướng:** Admin → Access → Attributes

Attributes là các thuộc tính tùy chỉnh gắn vào người dùng hoặc tài nguyên trong hệ thống — dùng chủ yếu cho cơ chế **Row-Level Security (RLS)** theo thuộc tính. Ví dụ: mỗi nhân viên có thuộc tính `chi_nhanh = "HN"` và dữ liệu tự động được lọc theo chi nhánh đó.

## Mục Đích

- Kiểm soát phạm vi dữ liệu người dùng được xem dựa trên thuộc tính cá nhân
- Phân nhóm tài nguyên theo thuộc tính (phòng ban, khu vực, cấp bậc...)
- Ít cứng nhắc hơn so với phân quyền theo Role đơn thuần

## Tạo Attribute Key Mới

1. Vào **Admin → Access → Attributes → New Attribute**
2. Điền thông tin:

| Thuộc tính | Mô tả |
|------------|-------|
| **Name** | Tên kỹ thuật (ví dụ: `chi_nhanh`, `phong_ban`) |
| **Description** | Mô tả ý nghĩa |
| **Data Type** | `text`, `number`, `boolean`, `date` |
| **Icon** | Biểu tượng nhận diện |
| **Values** | Danh sách giá trị hợp lệ (tùy chọn) |

3. Nhấn **Save**

## Gán Attribute cho Người Dùng

Sau khi tạo Attribute Key, gán giá trị cụ thể cho từng người dùng trong trang **Admin → Users → chọn User → Attributes**.

## Dùng Attribute trong Row-Level Security

Trong phần cấu hình Context hoặc Model, khai báo điều kiện lọc dựa trên attribute của người dùng. Ví dụ:

```
{table}.chi_nhanh = {{user.chi_nhanh}}
```

Khi người dùng có `chi_nhanh = "HN"` truy vấn, hệ thống tự động thêm điều kiện `WHERE chi_nhanh = 'HN'`.

Xem thêm: [Row-Level Security](../contexts/rls.md)
