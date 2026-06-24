# Tags (Nhãn)

**Điều hướng:** Admin → Access → Tags

Tags là nhãn phân loại tài nguyên trong hệ thống — giúp tổ chức, lọc và tìm kiếm nhanh khi số lượng Pipelines, Data Templates, AI Assistants, và Models tăng lên.

---

## Tài Nguyên Hỗ Trợ Tags

Tags có thể gán cho:
- Data Pipelines
- Data Templates
- AI Assistants
- Data Models
- Connections

---

## Ví Dụ Sử Dụng Tags

| Tag | Tài Nguyên Gán | Mục Đích |
|-----|----------------|---------|
| `sales` | Pipelines, Templates, Assistants liên quan Sales | Lọc nhanh tài nguyên của team Sales |
| `finance` | Models, Templates tài chính | Phân nhóm cho Finance team |
| `production` | Connections, Pipelines đang live | Phân biệt production vs staging |
| `deprecated` | Template/Pipeline không còn dùng | Đánh dấu cần xóa |
| `high-priority` | Pipelines quan trọng | Ưu tiên monitoring |

---

## Tạo Tag Mới

1. Vào **Admin → Access → Tags → New Tag**
2. Điền:
   - **Name**: Tên tag (slug, không dấu, dùng `-` thay khoảng trắng): `sales`, `high-priority`
   - **Color**: Màu nhãn để nhận diện nhanh
   - **Description**: Mô tả mục đích của tag
3. Nhấn **Save**

---

## Gán Tag Cho Tài Nguyên

Tags có thể gán khi tạo hoặc chỉnh sửa tài nguyên:

1. Mở form tạo/chỉnh sửa tài nguyên (Pipeline, Template, Assistant...)
2. Tìm trường **Tags** (thường ở cuối form)
3. Gõ tên tag hoặc chọn từ dropdown
4. Nhấn **Save**

Một tài nguyên có thể có **nhiều tags** cùng lúc.

---

## Lọc Theo Tag

Trên các trang danh sách (Pipelines, Templates, Assistants...):
1. Nhấn bộ lọc **Tags** trên thanh tìm kiếm
2. Chọn một hoặc nhiều tags
3. Danh sách tự động lọc chỉ hiển thị tài nguyên có tag đó

---

## Quản Lý Tags

Trang **Admin → Access → Tags** hiển thị:
- Danh sách tất cả tags
- Số lượng tài nguyên đang dùng mỗi tag
- Tùy chọn **Edit** (đổi tên, màu, description)
- Tùy chọn **Delete** (chỉ xóa được khi không còn tài nguyên nào dùng tag đó)

---

## Thực Tiễn Tốt Nhất

- **Ít hơn là tốt hơn**: 10-20 tags rõ ràng tốt hơn 100 tags chồng chéo
- **Nhất quán**: Dùng cùng một quy ước đặt tên (`sales`, không phải `Sales`, `SALES`, `sale`)
- **Theo bộ phận**: Tạo tag cho từng team/bộ phận chính
- **Theo môi trường**: `production`, `staging`, `dev` giúp phân biệt tài nguyên live với test
- **Lifecycle tags**: `active`, `deprecated`, `archive` giúp quản lý vòng đời tài nguyên
