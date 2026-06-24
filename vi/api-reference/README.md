# Tài Liệu API (API Reference)

Public API của Semantix cho phép tích hợp truy vấn dữ liệu, quản lý dashboards, và nhúng dashboard vào ứng dụng của bạn.

---

## Base URL

```
https://your-semantix-domain.com/api/v1
```

Thay `your-semantix-domain.com` bằng domain thực của Semantix instance.

---

## Xác Thực (Authentication)

Mọi API request đều cần **Bearer token** trong HTTP header:

```
Authorization: Bearer sk_live_your_api_key
```

### Lấy API Key

1. **Admin → Config → Platform Integrations → Tab: API Keys**
2. Nhấn **New API Key**
3. Chọn scope cần thiết
4. Copy key (chỉ hiển thị một lần)

Xem chi tiết: [API Keys](../admin/api-keys.md)

---

## Các Endpoints

| Phương Thức | Endpoint | Scope | Mô Tả |
|-------------|----------|-------|--------|
| `POST` | [/v1/query](query.md) | `execute:query` | Truy vấn bằng NL hoặc SQL thô |
| `GET` | [/v1/dashboards](dashboards.md) | `read:dashboards` | Liệt kê dashboards |
| `GET` | [/v1/dashboards/:id](dashboards.md) | `read:dashboards` | Chi tiết một dashboard |
| `POST` | [/v1/embed/token](embed-token.md) | `manage:embeds` | Tạo embed token cho iframe |

---

## Response Format

Tất cả endpoints trả về JSON theo format chuẩn:

### Thành Công

```json
{
  "data": [...],
  "metadata": {
    "rowCount": 42,
    "durationMs": 312,
    "sql": "SELECT region, SUM(revenue) FROM orders WHERE ...",
    "source": "PostgreSQL Production",
    "lastUpdated": "2026-06-22T08:00:00.000Z",
    "fromCache": true
  }
}
```

| Trường Metadata | Mô Tả |
|----------------|--------|
| `rowCount` | Số dòng trong kết quả |
| `durationMs` | Thời gian thực thi query (milliseconds) |
| `sql` | Câu SQL đã được tạo và chạy |
| `source` | Tên connection database |
| `lastUpdated` | Thời điểm dữ liệu (từ cache hoặc query thực) |
| `fromCache` | `true` nếu kết quả từ cache |

### Lỗi

```json
{
  "error": "Mô tả lỗi chi tiết"
}
```

---

## HTTP Status Codes

| Code | Ý Nghĩa |
|------|---------|
| `200` | Thành công |
| `400` | Request không hợp lệ (thiếu trường, sai format) |
| `401` | Thiếu hoặc sai API key |
| `403` | API key không có scope cần thiết |
| `404` | Không tìm thấy resource (dashboard, context...) |
| `429` | Vượt rate limit |
| `500` | Lỗi server nội bộ |

---

## Rate Limiting

| Giới Hạn | Giá Trị |
|----------|---------|
| Requests / giờ / API key | 1,000 |
| Concurrent requests | 10 |

Headers trong mỗi response:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 987
X-RateLimit-Reset: 1719043200
```

**Khi vượt rate limit** → HTTP 429. Xử lý với exponential backoff:

```javascript
async function queryWithRetry(payload, retries = 3) {
  for (let i = 0; i < retries; i++) {
    const res = await fetch('/api/v1/query', { ... });
    if (res.status !== 429) return res;
    
    const resetAt = parseInt(res.headers.get('X-RateLimit-Reset')) * 1000;
    const waitMs = Math.max(resetAt - Date.now(), 1000 * Math.pow(2, i));
    await new Promise(r => setTimeout(r, waitMs));
  }
}
```

---

## Ví Dụ Nhanh

### Query Bằng Ngôn Ngữ Tự Nhiên

```bash
curl -X POST https://your-domain.com/api/v1/query \
  -H "Authorization: Bearer sk_live_your_api_key" \
  -H "Content-Type: application/json" \
  -d '{
    "contextId": "ctx_abc123",
    "question": "Tổng doanh thu tháng này theo từng chi nhánh"
  }'
```

### Tạo Embed Token

```bash
curl -X POST https://your-domain.com/api/v1/embed/token \
  -H "Authorization: Bearer sk_live_your_api_key" \
  -H "Content-Type: application/json" \
  -d '{
    "dashboardId": "dash_abc123",
    "expiryDays": 1,
    "lockedFilters": {
      "customer_id": "12345"
    }
  }'
```

---

## SDK & Libraries

Hiện tại Semantix cung cấp HTTP API chuẩn — hoạt động với bất kỳ ngôn ngữ nào hỗ trợ HTTP:

| Ngôn Ngữ | Thư Viện HTTP Gợi Ý |
|----------|---------------------|
| JavaScript / TypeScript | `fetch` (native), `axios` |
| Python | `requests`, `httpx` |
| Go | `net/http` |
| PHP | `Guzzle`, `cURL` |
| Java | `OkHttp`, `HttpClient` |
| Ruby | `Faraday`, `Net::HTTP` |

---

## Bảo Mật API

- **Không bao giờ** đặt API key trong frontend code (JavaScript/React/Vue)
- Luôn gọi API từ backend server
- Sử dụng scope tối thiểu cần thiết
- Đặt ngày hết hạn cho API keys
- Sử dụng IP whitelist cho production keys

Xem thêm: [API Keys](../admin/api-keys.md) | [Bảo Mật](../admin/security.md)
