# Nhúng Dashboards (Embedding)

Nhúng các dashboards của Semantix vào ứng dụng hoặc trang web của riêng bạn bằng cách sử dụng **iframe** và một **embed token** đã được ký.

## Cách Hoạt Động

1. Backend của bạn yêu cầu một embed token từ API của Semantix
2. Token này được truyền tới frontend của bạn
3. Frontend của bạn render một iframe chứa token trong URL
4. Semantix xác thực token và hiển thị dashboard

## Bước 1 — Tạo Một Embed Token

Gọi API của Semantix từ **backend** của bạn (không bao giờ gọi từ frontend — API key phải được giữ bí mật):

```bash
POST /api/v1/embed/token
Authorization: Bearer sk_live_your_api_key
Content-Type: application/json

{
  "dashboardId": "your-dashboard-id",
  "expiryDays": 30,
  "lockedFilters": {
    "region": "Asia"
  }
}
```

**Phản Hồi (Response):**
```json
{
  "data": {
    "token": "eyJhbGci...",
    "expiresAt": "2026-05-28T00:00:00.000Z",
    "dashboardId": "your-dashboard-id"
  }
}
```

## Bước 2 — Render iframe

```html
<iframe
  src="https://your-semantix-domain.com/en/embed/dashboard/your-dashboard-id?token=eyJhbGci..."
  width="100%"
  height="600"
  frameborder="0"
  allowfullscreen
></iframe>
```

## Các Bộ Lọc Bị Khóa (Locked Filters)

Sử dụng `lockedFilters` để nhúng sẵn các giới hạn truy cập trực tiếp vào trong token. Người dùng xem dashboard được nhúng không thể bỏ qua các bộ lọc này:

```json
{
  "lockedFilters": {
    "customer_id": "12345",
    "region": "Asia"
  }
}
```

## Các Tùy Chọn Của Token (Token Options)

| Tùy Chọn | Kiểu Dữ Liệu | Mô Tả | Mặc Định |
|--------|------|-------------|---------|
| `dashboardId` | string | ID của dashboard cần nhúng | Bắt buộc |
| `expiryDays` | number | Thời hạn hợp lệ của token tính bằng ngày (tối đa 365) | `30` |
| `lockedFilters` | object | Các bộ lọc được nhúng cứng vào token | Không có |

> ⚠️ Embed tokens bị giới hạn trong một dashboard cụ thể. Hãy tạo một token mới cho mỗi dashboard mà bạn muốn nhúng.
