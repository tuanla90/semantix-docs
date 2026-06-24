# Row-Level Security (RLS)

Row-Level Security tự động giới hạn dữ liệu người dùng có thể xem — dựa trên role hoặc thuộc tính cá nhân — mà không cần thay đổi bất kỳ code nào trong ứng dụng.

---

## Cơ Chế Hoạt Động

Khi người dùng đặt câu hỏi, Semantix:

1. Xác định người dùng là ai (email, role, attributes)
2. Tìm RLS policy áp dụng cho người dùng đó
3. **Tự động thêm** điều kiện WHERE vào câu SQL được tạo
4. Người dùng chỉ thấy kết quả đã được lọc

```sql
-- Câu hỏi: "Doanh thu theo sản phẩm"
-- Người dùng: thuộc chi nhánh HN

-- SQL thực tế chạy (tự động thêm WHERE):
SELECT product_name, SUM(revenue) as total
FROM orders
WHERE chi_nhanh = 'HN'        -- ← Tự động thêm từ RLS
GROUP BY product_name
ORDER BY total DESC
```

Người dùng **không thể thấy** điều kiện này và **không thể bypass** nó — filter được áp dụng ở tầng server, trước khi dữ liệu về đến trình duyệt.

---

## Hai Loại RLS

### 1. Role-Based RLS (Theo Vai Trò)

Tất cả user trong cùng Role thấy cùng một tập dữ liệu cố định.

**Phù hợp khi:** Đơn giản — nhóm ít, phân vùng rõ ràng.

**Ví dụ:** Role "Sales North" chỉ xem data `region = 'North'`

### 2. Attribute-Based RLS (Theo Thuộc Tính Cá Nhân)

Mỗi user có attribute riêng, filter tự động dùng attribute của user hiện tại.

**Phù hợp khi:** Nhiều nhóm nhỏ, hoặc mỗi user có phạm vi riêng.

**Ví dụ:** Nhân viên A có `chi_nhanh = 'HN'`, nhân viên B có `chi_nhanh = 'HCM'` — cùng role nhưng thấy dữ liệu khác nhau.

---

## Thiết Lập RLS — Attribute-Based

### Bước 1: Tạo Attribute

1. **Admin → Access → Attributes → New Attribute**
2. Ví dụ: Attribute `chi_nhanh` (text)

Xem chi tiết: [Attributes](../admin/attributes.md)

### Bước 2: Gán Giá Trị Cho User

1. **Admin → Access → Users → Chọn user → Tab Attributes**
2. Gán: `chi_nhanh = "HN"` cho nhân viên Hà Nội

### Bước 3: Cấu Hình RLS Trong Data Model

1. Studio → DABI → Data Models → Chọn model
2. Tab **Access Control**
3. Nhấn **Add Rule**
4. Điền điều kiện:

```
{orders}.chi_nhanh = {{user.chi_nhanh}}
```

Syntax:
- `{table_name}.column` = cột trong bảng
- `{{user.attribute_name}}` = giá trị attribute của user đang đăng nhập

### Bước 4: Kiểm Tra

Đăng nhập bằng tài khoản user (không phải Admin) → vào AI Chat → đặt câu hỏi → kiểm tra View SQL có chứa điều kiện lọc không.

---

## Thiết Lập RLS — Role-Based

### Bước 1: Tạo Role

1. **Admin → Access → Users & Roles → Roles → New Role**
2. Đặt tên: "Sales North Team"
3. Gán users vào role này

### Bước 2: Cấu Hình RLS Trong Data Model

1. Tab **Access Control → Add Rule**
2. Chọn **Role**: "Sales North Team"
3. Điền điều kiện cố định:

```
{orders}.region = 'North'
```

---

## Toán Tử Hỗ Trợ

| Toán Tử | Ví Dụ | Ý Nghĩa |
|---------|-------|---------|
| `=` | `chi_nhanh = {{user.chi_nhanh}}` | Bằng chính xác |
| `!=` | `status != 'deleted'` | Khác |
| `IN` | `region IN ('North','Central')` | Thuộc một trong nhiều giá trị |
| `NOT IN` | `tier NOT IN ('trial')` | Không thuộc danh sách |
| `>`, `>=`, `<`, `<=` | `revenue >= {{user.min_revenue}}` | So sánh số |
| `LIKE` | `customer_name LIKE {{user.customer_prefix}}` | Khớp pattern |
| `IS NULL` | `deleted_at IS NULL` | Chưa bị xóa (soft delete) |
| `IS NOT NULL` | `activated_at IS NOT NULL` | Đã kích hoạt |
| `BETWEEN` | `created_at BETWEEN {{user.start_date}} AND {{user.end_date}}` | Trong khoảng |

---

## Kết Hợp Nhiều Điều Kiện

```sql
-- AND: User phải thỏa mãn cả hai điều kiện
{orders}.chi_nhanh = {{user.chi_nhanh}} AND {orders}.status != 'draft'

-- Nhiều rule được kết hợp bằng AND theo mặc định
```

Nếu cần OR, dùng một rule duy nhất với điều kiện phức tạp hơn hoặc liên hệ support.

---

## Giá Trị Đặc Biệt

| Giá Trị Attribute | Hành Vi |
|-----------------|---------|
| `*` (dấu sao) | Bypass filter — user thấy tất cả dữ liệu |
| `(để trống)` | Filter trả về không có kết quả |
| `HN,HCM` (nhiều giá trị cách nhau dấu phẩy) | Tự động chuyển thành `IN ('HN','HCM')` |

**Ví dụ dùng `*` cho Manager:**
- Nhân viên: `chi_nhanh = "HN"` → chỉ thấy data HN
- Manager: `chi_nhanh = "*"` → thấy toàn bộ
- Director: không có attribute chi_nhanh + Admin bypass → thấy tất cả

---

## Trường Hợp Đặc Biệt

### Admin Bypass

Tài khoản có role `admin:all` KHÔNG bị ảnh hưởng bởi RLS — luôn thấy toàn bộ dữ liệu. Điều này cho phép Admin kiểm tra cấu hình mà không bị lọc.

### Nhiều RLS Rules

Khi có nhiều rules áp dụng cho cùng một user (rule theo Role + rule theo Attribute), tất cả được kết hợp bằng AND:

```sql
WHERE chi_nhanh = 'HN'           -- từ Attribute rule
  AND status != 'deleted'        -- từ Role rule
  AND deleted_at IS NULL         -- từ Rule thứ 3
```

### RLS Trong Dashboard Embed

Với Dashboard được nhúng qua API, `lockedFilters` trong embed token cũng có tác dụng tương tự RLS:

```json
{
  "lockedFilters": {
    "customer_id": "12345"
  }
}
```

→ Thêm `WHERE customer_id = '12345'` vào mọi query trong dashboard nhúng.

---

## Debug RLS

### Kiểm Tra Rule Đang Áp Dụng

1. Vào AI Chat với tài khoản user bình thường
2. Đặt câu hỏi đơn giản: "Cho tôi xem 5 đơn hàng"
3. Nhấn **View SQL** trong kết quả
4. Xác nhận câu SQL có chứa điều kiện WHERE từ RLS rules

### Không Thấy Dữ Liệu

Nếu user không thấy bất kỳ dữ liệu nào:
1. Kiểm tra attribute của user có giá trị không: Admin → Users → User → Attributes
2. Kiểm tra giá trị attribute có khớp với giá trị trong database không (phân biệt hoa/thường)
3. Kiểm tra syntax của RLS rule có đúng không

### RLS Không Hoạt Động

Nếu user thấy dữ liệu không bị lọc:
1. Kiểm tra user có role Admin không — Admin bypass mọi RLS
2. Kiểm tra RLS rule được khai báo đúng Model không
3. Kiểm tra Context đang dùng có bật Access Control không
