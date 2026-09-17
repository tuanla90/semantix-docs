# POST /v1/embed/token

Tạo JWT token đã ký để nhúng dashboard Semantix vào ứng dụng bên ngoài qua iframe.

***

## Endpoint

```plain
POST /api/v1/embed/token
Authorization: Bearer sk_live_your_api_key
Content-Type: application/json
```

***

## Request Body

```json
{
  "dashboardId": "dash_abc123",
  "expiryDays": 1,
  "lockedFilters": {
    "customer_id": "12345",
    "region": "HCM"
  },
  "userContext": {
    "name": "Nguyễn Văn B",
    "email": "nguyen@customer.com"
  }
}
```

| Trường | Kiểu | Bắt Buộc | Mô Tả |
| --- | --- | --- | --- |
| `dashboardId` | string | ✅ | ID của dashboard muốn nhúng |
| `expiryDays` | number | ❌ | Số ngày token hợp lệ (1-365, mặc định: 30) |
| `expiryMinutes` | number | ❌ | Số phút token hợp lệ (thay thế `expiryDays` cho token ngắn hạn) |
| `lockedFilters` | object | ❌ | Bộ lọc cố định — người xem không thể thay đổi |
| `userContext` | object | ❌ | Thông tin người xem để hiển thị trong audit log |

***

## Response

```json
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXNoYm9hcmRJZCI6ImRhc2hfYWJjMTIzIiwiZXhwIjoxNzE5MDQzMjAwfQ.xxxx",
    "expiresAt": "2026-06-23T08:00:00.000Z",
    "dashboardId": "dash_abc123"
  }
}
```

***

## Render Dashboard Qua iframe

Sau khi có token, render trong frontend:

```html
<iframe
  src="https://your-semantix-domain.com/vi/embed/dashboard/dash_abc123?token=eyJhbGci..."
  width="100%"
  height="600"
  frameborder="0"
  allowfullscreen
  style="border: none; border-radius: 8px;"
></iframe>
```

**Format URL embed:**

```plain
https://{domain}/vi/embed/dashboard/{dashboardId}?token={token}
```

***

## Cơ Chế Bộ Lọc Khóa (Locked Filters - S22)

`lockedFilters` là cơ chế bảo mật cấp cơ sở dữ liệu được tích hợp trực tiếp vào quy trình ký và thẩm định JWT của Semantix (`lib/embed-tokens.ts`).

### Cấu Trúc JWT Payload Sau Khi Ký
Khi API sinh mã nhúng, máy chủ mã hóa và đóng dấu các claims bảo mật:

```json
{
  "iss": "semantix-embed",
  "did": "dash_abc123",
  "tv": 1,
  "lf": {
    "customer_id": "12345",
    "region": "HCM",
    "year": 2026
  },
  "uid": "usr_sec_admin_01",
  "iat": 1719039600,
  "exp": 1719043200
}
```

| Claim | Tên Đầy Đủ | Mục Đích Bảo Mật |
|---|---|---|
| `did` | Dashboard ID | Định danh dashboard được cấp phép nhúng |
| `tv` | Token Version | Phiên bản token (dùng để thu hồi token tức thì khi cần) |
| `lf` | Locked Filters (S22) | Bộ lọc dòng bắt buộc, ký bằng khóa bí mật `EMBED_JWT_SECRET` |
| `uid` | Issued By User ID (S02) | Danh tính người phát hành token, dùng để kế thừa ngữ cảnh kiểm toán và RLS |

### Nguyên Tắc Hoạt Động Phía Máy Chủ (Server-side RLS Enforcement)
1. **Kiểm định chữ ký:** Máy chủ xác thực chữ ký HMAC-SHA256 bằng khóa bí mật `EMBED_JWT_SECRET` (hoặc `AUTH_SECRET`). Token hết hạn hoặc bị sửa đổi bất kỳ ký tự nào sẽ bị từ chối ngay.
2. **Chuyển đổi thành RLS Base CTE:** Khi thực thi truy vấn dữ liệu cho các widget, Semantix tự động bóc tách claim `lf` và ép buộc vào Base CTE của câu truy vấn:
   ```sql
   WITH base_view AS (
       SELECT * FROM core_sales
       WHERE customer_id = '12345' AND region = 'HCM' AND year = 2026
   )
   SELECT category, SUM(amount) AS total FROM base_view GROUP BY category;
   ```
3. **Chống giả mạo:** Bộ lọc khóa không thể bị ghi đè bởi bất kỳ query parameter hay body payload nào do client gửi lên.

### Trải Nghiệm Giao Diện Nhúng (Client-side Embed Behavior)
- **Chế độ chỉ đọc (Read-Only State):** Trên giao diện dashboard nhúng, các giá trị trong `lockedFilters` hiển thị dưới dạng huy hiệu cố định có biểu tượng ổ khóa (🔒).
- **Vô hiệu hóa chỉnh sửa:** Người dùng bên ngoài không thể xóa nhãn lọc, không thể bấm vào menu để đổi giá trị.
- **Bộ lọc bổ sung:** Mọi thao tác lọc bổ sung từ người dùng (nếu giao diện không ẩn thanh lọc) sẽ được nối thêm qua toán tử `AND` vào truy vấn, đảm bảo không bao giờ mở rộng ra ngoài phạm vi dữ liệu đã khóa.

### Ví Dụ Tích Hợp Đa Khách Hàng (Multi-Tenant)

```javascript
// Server của bạn tạo token cho từng khách hàng cụ thể
const tokenResponse = await fetch('https://semantix.company.com/api/v1/embed/token', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.SEMANTIX_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    dashboardId: 'dash_financial_summary',
    expiryMinutes: 120,
    lockedFilters: {
      tenant_id: currentSession.tenantId,
      branch_code: currentSession.branchCode,
    },
    userContext: {
      userId: currentSession.userId,
      email: currentSession.email,
    },
  }),
});
```

***

## Thời Hạn Token

| Scenario | Cấu Hình | Lý Do |
| --- | --- | --- |
| Dashboard nhúng trong app của khách hàng | `expiryDays: 30` | Token sống qua nhiều session |
| Dashboard nhúng cho mỗi lần xem | `expiryMinutes: 60` | Bảo mật cao hơn |
| Dashboard public (không cần auth) | `expiryDays: 365` | Luôn accessible |
| Dashboard nhạy cảm | `expiryMinutes: 15` | Giảm rủi ro nếu token bị lộ |

***

## Workflow Backend → Frontend

**Không bao giờ tạo embed token ở frontend** — API key sẽ bị lộ trong source code.

```plain
Frontend (React/Vue)        Backend Server           Semantix API
       │                         │                        │
       │── Request dashboard ──→ │                        │
       │                         │── POST /embed/token ──→│
       │                         │ (dùng API key bí mật)  │
       │                         │←── { token } ──────────│
       │←── { token, dashId } ── │                        │
       │                         │                        │
       │── Render iframe với token ────────────────────────→│
```

### Ví Dụ Node.js Backend (Express)

```javascript
// routes/embed.js
app.get('/api/dashboard-token/:dashboardId', authMiddleware, async (req, res) => {
  const { dashboardId } = req.params;
  const currentUser = req.user;

  try {
    const response = await fetch(`${process.env.SEMANTIX_URL}/api/v1/embed/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SEMANTIX_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dashboardId,
        expiryMinutes: 60,
        lockedFilters: {
          customer_id: currentUser.customerId,
          // Thêm filter khác theo business logic
        },
        userContext: {
          name: currentUser.name,
          email: currentUser.email,
        },
      }),
    });

    const { data } = await response.json();
    res.json({ token: data.token, expiresAt: data.expiresAt });
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate embed token' });
  }
});
```

### Ví Dụ React Frontend

```jsx
function EmbeddedDashboard({ dashboardId }) {
  const [embedUrl, setEmbedUrl] = useState(null);
  
  useEffect(() => {
    // Lấy token từ backend (không phải trực tiếp từ Semantix)
    fetch(`/api/dashboard-token/${dashboardId}`)
      .then(res => res.json())
      .then(({ token }) => {
        const url = `https://semantix.company.com/vi/embed/dashboard/${dashboardId}?token=${token}`;
        setEmbedUrl(url);
      });
  }, [dashboardId]);
  
  if (!embedUrl) return <div>Đang tải...</div>;
  
  return (
    <iframe
      src={embedUrl}
      width="100%"
      height="600"
      frameBorder="0"
      title="Dashboard"
    />
  );
}
```

***

## Xử Lý Token Hết Hạn

Token hết hạn → iframe hiển thị màn hình "Token expired". Xử lý:

1. Lắng nghe `message` event từ iframe:

```javascript
window.addEventListener('message', (event) => {
  if (event.data.type === 'SEMANTIX_TOKEN_EXPIRED') {
    // Gọi backend để lấy token mới
    refreshEmbedToken(dashboardId);
  }
});
```

2. Hoặc set interval refresh token trước khi hết hạn:

```javascript
// Refresh token 5 phút trước khi hết hạn
const refreshEarly = expiryMs - 5 * 60 * 1000;
setTimeout(() => refreshEmbedToken(), refreshEarly);
```

***

## Lỗi Thường Gặp

| HTTP Status | Error | Giải Pháp |
| --- | --- | --- |
| `400` | "dashboardId is required" | Kiểm tra request body |
| `403` | "API key missing scope: manage:embeds" | Tạo key với scope `manage:embeds` |
| `404` | "Dashboard not found" | Kiểm tra dashboardId đúng không |
| `403` | "Token expired" (khi render iframe) | Tạo token mới từ backend |
