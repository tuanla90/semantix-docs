# API Keys

API Keys cho phép các ứng dụng bên ngoài truy cập vào API của Semantix.

## Tạo API Key

1. Đi tới **Admin → API Keys → New API Key**
2. Nhập một tên mô tả (ví dụ: "Production Backend", "Analytics Dashboard")
3. Chọn các **scopes** (phạm vi quyền) cần thiết
4. (Tùy chọn) Thiết lập **ngày hết hạn (expiry date)**
5. (Tùy chọn) Thiết lập **danh sách IP trắng (IP whitelist)** (hạn chế cho các IP cụ thể)
6. Nhấn **Create**
7. **Sao chép key này ngay lập tức** — nó sẽ không được hiển thị lại lần nào nữa

## Định Dạng API Key

Tất cả các key đều bắt đầu bằng `sk_live_`:

```
sk_live_abc123def456...
```

## Scopes (Phạm vi quyền)

| Scope | Mô Tả |
|-------|-------------|
| `execute:query` | Chạy truy vấn bằng ngôn ngữ tự nhiên (NL) và SQL thô |
| `read:dashboards` | Liệt kê và đọc các dashboard |
| `manage:embeds` | Tạo embed tokens |
| `*` | Tất cả scopes |

## Danh Sách IP Trắng (IP Whitelist)

Hạn chế một API key chỉ được truy cập từ các địa chỉ IP cụ thể để tăng cường bảo mật:

- Nhập một IP trên mỗi dòng hoặc cách nhau bằng dấu phẩy
- Hỗ trợ ký hiệu CIDR (ví dụ: `192.168.1.0/24`)
- Các request từ những IP không nằm trong danh sách trắng sẽ trả về lỗi `403 Forbidden`

## Thu Hồi và Cấp Lại Key (Rotating a Key)

Nếu một key bị lộ (compromised):

1. Đi tới **Admin → API Keys**
2. Tìm key đó → nhấn **Revoke**
3. Tạo một key mới với các scope tương tự
4. Cập nhật các ứng dụng của bạn với key mới

> ⚠️ Việc thu hồi (revoke) key sẽ có hiệu lực ngay lập tức và không thể đảo ngược. Các ứng dụng đang sử dụng key cũ sẽ nhận lỗi `401 Unauthorized` ngay lập tức.
