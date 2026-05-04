# Người Dùng & Phân Quyền (Users & Roles)

## Users (Người dùng)

Quản lý các thành viên trong team dưới menu **Admin → Users**.

### Mời người dùng (Inviting a User)

1. Đi tới **Admin → Users → Invite User**
2. Nhập địa chỉ email của họ
3. Gán một hoặc nhiều quyền (roles)
4. Nhấn **Send Invite**

Người dùng sẽ nhận được một email kèm theo link để thiết lập mật khẩu của họ.

### Trạng Thái Người Dùng (User Status)

| Trạng Thái | Mô Tả |
|--------|-------------|
| **Active** | Có thể đăng nhập và sử dụng Semantix |
| **Inactive** | Tài khoản bị vô hiệu hóa — không thể đăng nhập |

---

## Roles (Phân Quyền)

Phân quyền kiểm soát những gì người dùng có thể xem và thực hiện trong Semantix.

### Các Quyền Mặc Định (Default Roles)

| Quyền | Mô Tả |
|------|-------------|
| **Admin** | Có toàn quyền truy cập vào mọi thứ |
| **User** | Có thể xem dashboards và sử dụng AI chat |

### Tạo Quyền Tùy Chỉnh (Custom Roles)

1. Đi tới **Admin → Roles → New Role**
2. Đặt tên cho quyền (ví dụ: "Data Analyst", "Asia Sales Team")
3. Chọn các quyền chi tiết (permissions)
4. Nhấn **Save**
5. Gán người dùng vào quyền này từ trang **Users**

### Các Quyền Chi Tiết (Permissions)

| Quyền | Mô Tả |
|------------|-------------|
| `view:dashboards` | Xem các dashboard được chia sẻ |
| `edit:dashboards` | Tạo và chỉnh sửa dashboards |
| `use:chat` | Sử dụng AI chat |
| `manage:connections` | Tạo/chỉnh sửa các connection database |
| `manage:contexts` | Tạo/chỉnh sửa các data context |
| `manage:users` | Mời và quản lý người dùng |
| `admin:all` | Có toàn quyền truy cập admin |

---

## Row-Level Security theo Role

Các role cũng có thể đính kèm **chính sách truy cập dữ liệu** ở cấp độ context. Xem thêm phần [Row-Level Security](../contexts/rls.md).
