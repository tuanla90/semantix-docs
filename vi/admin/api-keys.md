# API Keys

API Keys cho phép ứng dụng và dịch vụ bên ngoài truy cập Semantix API — để query dữ liệu, quản lý dashboards, hoặc tạo embed tokens.

---

## Nguyên Tắc Bảo Mật API Key

- **Không bao giờ đặt API key trong frontend code** (JavaScript, React, Vue...) — sẽ bị lộ cho người dùng cuối
- Luôn gọi API từ **backend server** của bạn
- Mỗi ứng dụng/dịch vụ nên có API key riêng với scope tối thiểu cần thiết
- Đặt ngày hết hạn cho API keys — không để "không hết hạn" cho production

---

## Tạo API Key Mới

1. Vào **Admin → Config → Platform Integrations → Tab: API Keys**
2. Nhấn **New API Key**
3. Điền thông tin:

| Trường | Mô Tả | Ví Dụ |
|--------|--------|-------|
| **Name** | Tên mô tả nguồn gọi API | "Production Backend", "Analytics Dashboard" |
| **Scopes** | Quyền của key này | Xem bảng bên dưới |
| **Expiry Date** | Ngày hết hạn | `2027-01-01` (khuyến nghị) |
| **IP Whitelist** | Giới hạn IP được phép dùng key | `203.45.67.89`, `10.0.0.0/24` |

4. Nhấn **Create**
5. **Copy key ngay** — chỉ hiển thị một lần duy nhất

---

## Scopes (Phạm Vi Quyền)

| Scope | Quyền | Endpoint Liên Quan |
|-------|-------|-------------------|
| `execute:query` | Chạy query NL hoặc SQL thô | `POST /v1/query` |
| `read:dashboards` | Xem danh sách và chi tiết dashboard | `GET /v1/dashboards` |
| `manage:embeds` | Tạo embed tokens | `POST /v1/embed/token` |
| `*` | Tất cả quyền trên | Tất cả endpoints |

**Nguyên tắc Least Privilege:**
- Backend chỉ cần query dữ liệu? → Chỉ cấp `execute:query`
- Portal nhúng dashboard? → Chỉ cấp `manage:embeds`
- Không cần cấp `*` trừ khi thực sự cần tất cả

---

## Format API Key

Tất cả API keys có prefix `smx_live_`:

```
smx_live_<your_key_here>
```

Dùng trong HTTP header:
```
Authorization: Bearer smx_live_<your_key_here>
```

---

## IP Whitelist

Giới hạn key chỉ hoạt động từ IP cụ thể — tăng bảo mật đáng kể:

**Format hợp lệ:**
```
203.45.67.89          ← IP đơn lẻ
203.45.67.0/24        ← Dải IP (CIDR)
10.0.0.0/8            ← Mạng nội bộ
```

**Khi không điền IP Whitelist:** Key hoạt động từ mọi IP.

**Khi điền IP Whitelist:** Request từ IP không trong danh sách nhận lỗi `403 Forbidden`.

---

## Xem Và Quản Lý Keys

Trang API Keys hiển thị:
- Tên key
- Scopes đã cấp
- Ngày tạo
- Ngày hết hạn
- Ngày sử dụng gần nhất
- Trạng thái (Active / Expired / Revoked)

Các tác vụ:
- **Edit**: Đổi tên, thêm/bớt scope, gia hạn (không thể xem lại giá trị key)
- **Revoke**: Thu hồi key ngay lập tức — không thể hoàn tác

---

## Rotate (Thay Thế) API Key

Khi key bị lộ hoặc hết hạn cần thay thế:

1. Tạo key mới với cùng scope và cấu hình
2. Cập nhật key mới vào tất cả ứng dụng đang dùng
3. Test ứng dụng với key mới hoạt động đúng
4. Revoke key cũ

> **Revoke có hiệu lực ngay lập tức.** Đảm bảo đã cập nhật ứng dụng trước khi revoke key cũ — nếu không ứng dụng sẽ nhận lỗi `401 Unauthorized` ngay.

---

## Ví Dụ Sử Dụng API Key

### Node.js Backend

```javascript
// Lưu trong environment variable, KHÔNG hardcode
const SEMANTIX_API_KEY = process.env.SEMANTIX_API_KEY;

const response = await fetch('https://your-domain.com/api/v1/query', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${SEMANTIX_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    contextId: 'ctx_abc123',
    question: 'Tổng doanh thu tháng này',
  }),
});

const data = await response.json();
```

### Python Backend

```python
import os
import requests

api_key = os.environ['SEMANTIX_API_KEY']

response = requests.post(
    'https://your-domain.com/api/v1/query',
    headers={
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json',
    },
    json={
        'contextId': 'ctx_abc123',
        'question': 'Top 10 khách hàng theo doanh thu',
    }
)

data = response.json()
```

### cURL (Test)

```bash
curl -X POST https://your-domain.com/api/v1/query \
  -H "Authorization: Bearer smx_live_your_key" \
  -H "Content-Type: application/json" \
  -d '{"contextId": "ctx_abc123", "question": "Doanh thu hôm qua"}'
```

---

## Rate Limiting

| Giới Hạn | Giá Trị |
|----------|---------|
| Requests / giờ / API key | 1,000 |
| Concurrent requests | 10 |

Headers trả về trong mỗi response:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 987
X-RateLimit-Reset: 1719043200  (Unix timestamp khi reset)
```

Khi vượt giới hạn → HTTP 429 Too Many Requests. Xử lý bằng exponential backoff.
