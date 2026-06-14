# Trường Tính Toán (Calculated Fields)

**Điều hướng:** Studio → DABI → Data Models → chọn Model → tab Calculated Fields

Calculated Field là cột ảo được tạo từ biểu thức SQL — không tồn tại trong database gốc nhưng AI và người dùng có thể dùng như một cột thông thường.

## Tạo Calculated Field

1. Trong trang chỉnh sửa Model, chuyển sang tab **Calculated Fields**
2. Nhấn **Add Calculated Field**
3. Điền thông tin:

| Thuộc tính | Mô tả |
|------------|-------|
| **Name** | Tên kỹ thuật (ví dụ: `profit_margin`) |
| **Label** | Tên hiển thị (ví dụ: `Tỷ suất lợi nhuận`) |
| **Expression** | Biểu thức SQL tính toán giá trị |
| **Return Type** | Kiểu dữ liệu kết quả: Number, String, Boolean, Date |
| **Description** | Giải thích ý nghĩa để AI hiểu khi nào dùng |

## Ví Dụ Thực Tế

```sql
-- Tỷ suất lợi nhuận gộp
(revenue - cost) / revenue * 100

-- Phân nhóm theo doanh thu
CASE
  WHEN revenue >= 100000000 THEN 'Lớn'
  WHEN revenue >= 10000000  THEN 'Vừa'
  ELSE 'Nhỏ'
END

-- Lấy ngày trong tuần
CASE DAYOFWEEK(order_date)
  WHEN 1 THEN 'Chủ Nhật'
  WHEN 2 THEN 'Thứ Hai'
  WHEN 3 THEN 'Thứ Ba'
  WHEN 4 THEN 'Thứ Tư'
  WHEN 5 THEN 'Thứ Năm'
  WHEN 6 THEN 'Thứ Sáu'
  WHEN 7 THEN 'Thứ Bảy'
END

-- Tuổi tính từ ngày sinh
DATEDIFF(CURRENT_DATE, birth_date) / 365
```

## Lưu Ý

- Expression phải hợp lệ với SQL dialect của database đang dùng.
- Calculated Fields không thể dùng trong các biểu thức của nhau (không hỗ trợ nested calculated fields).
- Nếu expression sai, truy vấn AI sẽ báo lỗi — kiểm tra kỹ trước khi lưu.
