# POST /v1/embed/token

Tạo một JWT token đã được ký để nhúng dashboard vào ứng dụng bên ngoài.

## Request

```
POST /api/v1/embed/token
Authorization: Bearer sk_live_your_api_key
Content-Type: application/json
```

```json
{
  "dashboardId": "dash_abc123",
  "expiryDays": 30,
  "lockedFilters": {
    "region": "Asia",
    "customer_id": "12345"
  }
}
```

| Trường | Kiểu Dữ Liệu | Bắt Buộc | Mô Tả |
|-------|------|----------|-------------|
| `dashboardId` | string | ✅ | ID của dashboard cần nhúng |
| `expiryDays` | number | ❌ | Thời hạn hợp lệ của token tính bằng ngày (tối đa 365, mặc định 30) |
| `lockedFilters` | object | ❌ | Các bộ lọc được nhúng cứng vào token — người dùng không thể ghi đè (override) các bộ lọc này |

## Phản Hồi (Response)

```json
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresAt": "2026-05-28T00:00:00.000Z",
    "dashboardId": "dash_abc123"
  }
}
```

## Sử Dụng Token

Render dashboard trong một iframe ở phía frontend của bạn:

```html
<iframe
  src="https://your-domain.com/en/embed/dashboard/dash_abc123?token=eyJhbGci..."
  width="100%"
  height="600"
  frameborder="0"
></iframe>
```

## Lưu Ý Về Bảo Mật (Security Notes)

- **Không bao giờ tạo embed tokens ở frontend** — API key của bạn sẽ bị lộ
- Hãy tạo tokens ở **backend server** của bạn và truyền chúng tới frontend
- Sử dụng `lockedFilters` để bắt buộc việc cách ly dữ liệu (data isolation) cho mỗi người dùng/khách thuê (tenant)
- Các tokens sẽ hết hạn sau số ngày `expiryDays` — hãy tạo một token mới cho mỗi phiên (session) nếu cần

## Ví Dụ — Node.js Backend

```javascript
// Server-side only
const res = await fetch('https://your-domain.com/api/v1/embed/token', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.SEMANTIX_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    dashboardId: 'dash_abc123',
    expiryDays: 1,
    lockedFilters: {
      customer_id: currentUser.id,
    },
  }),
});

const { data } = await res.json();
// Truyền data.token sang frontend
```
