# Attributes (Thuộc Tính Người Dùng)

**Điều hướng:** Admin → Access → Attributes

Attributes là các thuộc tính tùy chỉnh gắn vào từng người dùng — dùng chủ yếu để triển khai **Row-Level Security (RLS)** theo đặc điểm cá nhân. Thay vì tạo role riêng cho từng chi nhánh/phòng ban, bạn tạo một role chung và dùng Attributes để phân biệt phạm vi dữ liệu.

---

## Tại Sao Cần Attributes?

**Vấn đề với Role-only RLS:**

Giả sử có 50 chi nhánh, mỗi chi nhánh cần xem dữ liệu riêng của mình. Nếu dùng Role:
- Phải tạo 50 Role (role_HN, role_HCM, role_DNG...)
- Phải gán từng user vào đúng role
- Mỗi khi thêm chi nhánh mới: tạo thêm role + cập nhật cấu hình

**Giải pháp với Attributes:**
- Tạo 1 Role "Nhân viên chi nhánh"
- Tạo 1 Attribute `chi_nhanh` (text)
- Gán `chi_nhanh = "HN"` cho nhân viên Hà Nội, `"HCM"` cho nhân viên TP.HCM...
- Context tự động lọc: `WHERE chi_nhanh = {{user.chi_nhanh}}`

---

## Tạo Attribute Key Mới

1. Vào **Admin → Access → Attributes → New Attribute**
2. Điền các trường:

| Trường | Mô Tả | Ví Dụ |
|--------|--------|-------|
| **Name** | Tên kỹ thuật — dùng trong cấu hình RLS | `chi_nhanh`, `phong_ban`, `cap_bac` |
| **Label** | Tên hiển thị thân thiện trong UI | Chi nhánh, Phòng ban, Cấp bậc |
| **Description** | Giải thích mục đích của attribute | "Chi nhánh làm việc của nhân viên" |
| **Data Type** | Kiểu dữ liệu | `text`, `number`, `boolean`, `date` |
| **Allowed Values** | Danh sách giá trị hợp lệ (tùy chọn) | HN, HCM, DNG, CT... |
| **Required** | Bắt buộc phải có giá trị | Tắt (mặc định) |

3. Nhấn **Save**

---

## Ví Dụ Attributes Phổ Biến

| Attribute Name | Data Type | Mô Tả | Ví Dụ Giá Trị |
|---------------|-----------|--------|--------------|
| `chi_nhanh` | text | Chi nhánh làm việc | HN, HCM, DNG, CT |
| `phong_ban` | text | Phòng ban | sales, marketing, hr, finance |
| `cap_bac` | text | Cấp bậc nhân viên | staff, manager, director, c_level |
| `khu_vuc` | text | Khu vực địa lý | north, central, south |
| `customer_id` | number | ID khách hàng (cho B2B SaaS) | 12345, 67890 |
| `max_revenue_view` | number | Giới hạn doanh thu được xem | 1000000 |

---

## Gán Attribute Cho Người Dùng

### Gán Thủ Công (Một Người)

1. **Admin → Access → Users → Chọn user**
2. Tab **Attributes**
3. Nhấn **Add Attribute**
4. Chọn Attribute Key → Điền Value
5. Nhấn **Save**

### Gán Qua Import CSV

Khi có nhiều người dùng cần gán attribute:

1. Export danh sách user từ Admin → Users
2. Thêm cột với tên attribute vào CSV
3. Import lại qua **Admin → Users → Import**

### Gán Tự Động Qua SSO (SAML/OIDC)

Nếu dùng SSO, có thể map claims từ IdP thành Attributes:

**Okta:** Trong SAML configuration → Attribute Statements:
```
Attribute Name: chi_nhanh
Attribute Value: user.department
```

Khi user đăng nhập qua Okta, giá trị `department` từ Okta tự động thành `chi_nhanh` trong Semantix.

---

## Sử Dụng Attributes Trong Row-Level Security

Sau khi tạo Attribute và gán cho users, cấu hình RLS trong Context:

**Điều hướng:** Studio → DABI → Data Models → Chọn model → Tab Access Control

**Cú pháp filter RLS:**
```
{ten_bang}.ten_cot = {{user.ten_attribute}}
```

**Ví dụ thực tế:**

| Use Case | Filter RLS |
|----------|-----------|
| Nhân viên chỉ xem đơn hàng chi nhánh mình | `orders.chi_nhanh = {{user.chi_nhanh}}` |
| Nhân viên HR chỉ xem data phòng ban mình | `employees.department = {{user.phong_ban}}` |
| Khách hàng SaaS chỉ xem data của họ | `data.customer_id = {{user.customer_id}}` |
| Manager xem tất cả, Staff xem một phần | Dùng Role kết hợp: nếu Role = manager → không filter |

**Kết hợp nhiều điều kiện:**
```
{orders}.chi_nhanh = {{user.chi_nhanh}} AND {orders}.status != 'deleted'
```

---

## Giá Trị Đặc Biệt

| Giá Trị | Ý Nghĩa |
|---------|---------|
| `*` (dấu sao) | Bỏ qua filter — user thấy tất cả dữ liệu |
| (để trống) | Không có attribute → filter trả về không có dữ liệu |
| Nhiều giá trị cách nhau bởi `,` | Filter dạng IN: `chi_nhanh IN ('HN','HCM')` |

**Ví dụ dùng `*` cho Manager:**
- Staff: `chi_nhanh = "HN"` → chỉ thấy data Hà Nội
- Manager: `chi_nhanh = "*"` → thấy toàn bộ data

---

## Kiểm Tra RLS Đang Hoạt Động

1. Đăng nhập bằng tài khoản user bình thường (không phải Admin)
2. Vào AI Chat → hỏi câu hỏi về dữ liệu
3. Nhấn **View SQL** trong kết quả
4. Kiểm tra câu SQL có chứa điều kiện lọc theo attribute không

Xem chi tiết triển khai: [Row-Level Security](../contexts/rls.md)
