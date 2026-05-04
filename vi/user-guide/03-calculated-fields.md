# 3. Khai Báo Calculated Field

Calculated Field (Trường tính toán) là một cột mới được tạo ra bằng cách sử dụng các công thức toán học hoặc logic từ các cột dữ liệu hiện có. Nó không tồn tại trong cơ sở dữ liệu gốc của bạn.

**Điều hướng:** Admin → Models → chọn Model → tab **Columns** → **Add Calculated Column**

## Các Ví Dụ Thực Tế Phổ Biến

```sql
-- Tính tỷ suất lợi nhuận gộp
(revenue - cost) / revenue * 100

-- Phân nhóm phân khúc doanh thu
CASE
  WHEN revenue >= 100000000 THEN 'Lớn'
  WHEN revenue >= 10000000  THEN 'Vừa'
  ELSE 'Nhỏ'
END

-- Lấy ngày trong tuần từ cột ngày tháng
CASE DAYOFWEEK(order_date)
  WHEN 1 THEN 'Chủ Nhật'
  WHEN 2 THEN 'Thứ Hai'
  WHEN 3 THEN 'Thứ Ba'
  WHEN 4 THEN 'Thứ Tư'
  WHEN 5 THEN 'Thứ Năm'
  WHEN 6 THEN 'Thứ Sáu'
  WHEN 7 THEN 'Thứ Bảy'
END
```

## Cấu Hình Calculated Field

| Thuộc tính | Mô tả |
|------------|-------|
| **Name** | Tên kỹ thuật của trường (ví dụ: `profit_margin`). |
| **Label** | Tên hiển thị thân thiện trên giao diện. |
| **Expression** | Biểu thức SQL hoặc công thức dùng để tính toán giá trị. |
| **Return Type** | Kiểu dữ liệu của kết quả trả về (ví dụ: Number, String). |
| **Description** | Giải thích ý nghĩa của trường này để AI biết khi nào nên sử dụng. |
