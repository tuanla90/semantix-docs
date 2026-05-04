# POST /v1/query

Thực thi một truy vấn trên dữ liệu của bạn — thông qua ngôn ngữ tự nhiên (NL) hoặc SQL thô.

## Request

```
POST /api/v1/query
Authorization: Bearer sk_live_your_api_key
Content-Type: application/json
```

## Chế Độ 1 (Mode 1) — Truy Vấn Bằng Ngôn Ngữ Tự Nhiên

Hỏi một câu bằng ngôn ngữ tự nhiên sử dụng context đã được cấu hình:

```json
{
  "contextId": "ctx_abc123",
  "question": "Show me total revenue by region for last month"
}
```

| Trường | Kiểu Dữ Liệu | Bắt Buộc | Mô Tả |
|-------|------|----------|-------------|
| `contextId` | string (UUID) | ✅ | ID của context cần truy vấn |
| `question` | string | ✅ | Câu hỏi bằng ngôn ngữ tự nhiên (tối đa 5.000 ký tự) |

## Chế Độ 2 (Mode 2) — Truy Vấn SQL Thô

Thực thi lệnh SQL trực tiếp qua một connection:

```json
{
  "connectionId": "conn_xyz789",
  "sql": "SELECT region, SUM(revenue) FROM orders GROUP BY region"
}
```

| Trường | Kiểu Dữ Liệu | Bắt Buộc | Mô Tả |
|-------|------|----------|-------------|
| `connectionId` | string (UUID) | ✅ | ID của connection cần truy vấn |
| `sql` | string | ✅ | Truy vấn SQL cần thực thi (tối đa 50.000 ký tự) |

> ⚠️ SQL thô yêu cầu scope `execute:query` và chạy trực tiếp trên database của bạn. Cần sử dụng cẩn thận.

## Phản Hồi (Response)

```json
{
  "data": [
    { "region": "Asia", "total_revenue": 142500 },
    { "region": "Europe", "total_revenue": 98200 }
  ],
  "metadata": {
    "rowCount": 2,
    "durationMs": 245,
    "sql": "SELECT region, SUM(revenue) as total_revenue FROM orders WHERE ...",
    "lastUpdated": "2026-04-28T08:00:00.000Z",
    "source": "PostgreSQL Production (postgresql)"
  }
}
```

## Ví Dụ — cURL

```bash
curl -X POST https://your-domain.com/api/v1/query \
  -H "Authorization: Bearer sk_live_your_api_key" \
  -H "Content-Type: application/json" \
  -d '{
    "contextId": "ctx_abc123",
    "question": "Total orders this week"
  }'
```

## Ví Dụ — JavaScript

```javascript
const response = await fetch('https://your-domain.com/api/v1/query', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sk_live_your_api_key',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    contextId: 'ctx_abc123',
    question: 'Total orders this week',
  }),
});

const result = await response.json();
console.log(result.data);
```
