# Quan Hệ (Relations)

**Điều hướng:** Studio → DABI → Data Models → chọn Model → tab Relations

Relations khai báo cách **JOIN** giữa các Model trong Semantix. Nhờ đó, khi người dùng đặt câu hỏi liên quan đến nhiều bảng, AI có thể tự động kết hợp dữ liệu mà người dùng không cần viết SQL JOIN thủ công.

**Ví dụ:**
- Không có Relation: Câu hỏi "doanh thu theo tỉnh thành của khách hàng" sẽ thất bại vì AI không biết cách nối bảng đơn hàng với bảng khách hàng.
- Có Relation: AI tự động JOIN `don_hang.customer_id = khach_hang.id` và trả về kết quả đúng.

---

## Tạo Relation Mới

### Bước 1 — Mở Tab Relations

1. Vào **Studio → DABI → Data Models** → chọn Model nguồn (ví dụ: `don_hang`).
2. Chuyển sang tab **Relations**.
3. Nhấn **Add Relation**.

### Bước 2 — Cấu Hình Quan Hệ

| Thuộc tính | Bắt Buộc | Ví Dụ | Mô Tả |
|------------|----------|--------|--------|
| **Source Model** | Có | `don_hang` | Model hiện tại (model bạn đang chỉnh sửa) |
| **Source Column** | Có | `customer_id` | Cột khóa ngoại trong model nguồn |
| **Target Model** | Có | `khach_hang` | Model muốn JOIN đến |
| **Target Column** | Có | `id` | Cột khóa chính trong model đích |
| **Join Type** | Có | `LEFT JOIN` | Loại JOIN |
| **Label** | Không | `Khách hàng` | Tên hiển thị của quan hệ này |
| **Description** | Không | `Liên kết đơn hàng với thông tin khách hàng` | Giúp AI hiểu khi nào dùng relation này |

### Bước 3 — Lưu

Nhấn **Save** trong form Relation. Relation xuất hiện trong danh sách trên tab Relations của Model.

---

## Các Loại JOIN

| Join Type | Ý Nghĩa | Dùng Khi |
|-----------|---------|---------|
| **LEFT JOIN** | Giữ tất cả bản ghi của bảng nguồn, lấy thêm dữ liệu bảng đích nếu có | **Dùng phổ biến nhất** — đảm bảo không mất đơn hàng dù khách hàng đã bị xóa |
| **INNER JOIN** | Chỉ giữ bản ghi có dữ liệu khớp ở cả hai bảng | Khi chắc chắn mọi bản ghi nguồn đều có bản ghi tương ứng ở đích |
| **RIGHT JOIN** | Giữ tất cả bản ghi của bảng đích | Hiếm dùng — thường có thể chuyển thành LEFT JOIN theo hướng ngược lại |

> **Khuyến nghị:** Hầu hết trường hợp phân tích nên dùng `LEFT JOIN`. INNER JOIN có thể làm mất dữ liệu không mong muốn (ví dụ: đơn hàng của khách hàng đã bị xóa sẽ biến mất khỏi kết quả nếu dùng INNER JOIN).

---

## Các Loại Quan Hệ Phổ Biến

### One-to-Many (1:N) — Một-Nhiều

Phổ biến nhất. Một bản ghi ở bảng A tương ứng với nhiều bản ghi ở bảng B.

**Ví dụ: Khách hàng → Đơn hàng**
```
1 Khách hàng → N Đơn hàng
khach_hang.id ← don_hang.customer_id
```

Cấu hình trong Model `don_hang`:
- Source Column: `customer_id`
- Target Model: `khach_hang`
- Target Column: `id`
- Join Type: `LEFT JOIN`

### Many-to-One (N:1) — Nhiều-Một

Ngược lại của 1:N — nhìn từ phía bảng "nhiều".

**Ví dụ: Đơn hàng → Khách hàng**
Đây thực ra vẫn là cùng quan hệ 1:N, nhưng định nghĩa từ phía bảng đơn hàng.

### Many-to-Many (N:N) — Nhiều-Nhiều

Ví dụ: Đơn hàng ↔ Sản phẩm (một đơn có nhiều sản phẩm, một sản phẩm xuất hiện trong nhiều đơn).

Xử lý qua **bảng trung gian** (junction table):
```
don_hang ←→ chi_tiet_don_hang ←→ san_pham
```

Cách cấu hình:
1. Tạo Model cho `chi_tiet_don_hang`.
2. Trong `don_hang`: thêm Relation đến `chi_tiet_don_hang` (qua `order_id`).
3. Trong `chi_tiet_don_hang`: thêm Relation đến `san_pham` (qua `product_id`).
4. AI có thể tự JOIN qua bảng trung gian khi cần.

---

## Ví Dụ Thực Tế

### Hệ Thống Bán Hàng Cơ Bản

```
don_hang (Đơn hàng)
├── Relation → khach_hang (qua customer_id = id)        [N:1]
├── Relation → nhan_vien (qua salesperson_id = id)      [N:1]
└── Relation → chi_tiet_don_hang (qua order_id = id)   [1:N]

chi_tiet_don_hang (Chi tiết đơn hàng)
├── Relation → don_hang (qua order_id = id)            [N:1]
└── Relation → san_pham (qua product_id = id)          [N:1]

san_pham (Sản phẩm)
├── Relation → danh_muc (qua category_id = id)         [N:1]
└── Relation → nha_cung_cap (qua supplier_id = id)     [N:1]
```

Với cấu hình trên, AI có thể trả lời:
- "Doanh thu theo tỉnh thành khách hàng" → JOIN với `khach_hang`
- "Top sản phẩm bán chạy theo danh mục" → JOIN qua `chi_tiet_don_hang` → `san_pham` → `danh_muc`
- "Hiệu suất bán hàng theo nhân viên" → JOIN với `nhan_vien`

---

## Các Câu Hỏi AI Có Thể Trả Lời Nhờ Relations

| Câu Hỏi Người Dùng | Relations Được Dùng |
|--------------------|---------------------|
| "Doanh thu theo tỉnh/thành phố" | `don_hang` → `khach_hang` (lấy tỉnh từ khách hàng) |
| "Top sản phẩm bán chạy" | `don_hang` → `chi_tiet_don_hang` → `san_pham` |
| "Doanh thu theo danh mục" | ... → `san_pham` → `danh_muc` |
| "Nhân viên nào bán được nhiều nhất" | `don_hang` → `nhan_vien` |
| "Khách hàng VIP ở khu vực nào" | `don_hang` → `khach_hang` (lọc VIP) |

---

## Lưu Ý và Thực Hành Tốt

### 1. Định Nghĩa Relation Từ Phía Bảng "Nhiều"

Convention: luôn định nghĩa Relation từ phía có **khóa ngoại** (foreign key). Ví dụ: trong quan hệ `don_hang.customer_id = khach_hang.id`, khai báo Relation trong Model `don_hang` (vì `don_hang` chứa foreign key `customer_id`).

### 2. Một Model Có Thể Có Nhiều Relations

```
don_hang
├── → khach_hang (customer_id)
├── → nhan_vien (salesperson_id)
├── → chi_nhanh (branch_id)
└── → chi_tiet_don_hang (ngược lại)
```

AI sẽ chỉ JOIN khi câu hỏi thực sự cần dữ liệu từ bảng đó. Không lo ngại việc định nghĩa nhiều Relations — AI đủ thông minh để chỉ dùng Relations cần thiết.

### 3. Luôn Dùng LEFT JOIN Trừ Khi Có Lý Do Cụ Thể

LEFT JOIN đảm bảo:
- Đơn hàng không bị mất dù khách hàng đã bị xóa khỏi hệ thống
- Sản phẩm không bị mất dù đã ngừng kinh doanh
- Kết quả phân tích hoàn chỉnh, không thiếu dữ liệu

### 4. Kiểm Tra Relation Sau Khi Tạo

Sau khi tạo Relation, thử hỏi AI câu hỏi cần dùng JOIN:
- "Doanh thu theo tỉnh thành của khách hàng tháng này"
- Xem SQL trong kết quả có JOIN đúng bảng không

---

## Xóa Relation

1. Trong tab **Relations**, tìm relation cần xóa.
2. Nhấn biểu tượng **Xóa (🗑️)**.
3. Xác nhận xóa.

> **Lưu ý:** Xóa Relation ảnh hưởng đến các câu hỏi AI cần JOIN bảng đó. Sau khi xóa, test lại các câu hỏi liên quan.
