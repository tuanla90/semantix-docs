# POST /v1/query

Thực thi truy vấn dữ liệu — hỗ trợ cả ngôn ngữ tự nhiên (AI-powered) và SQL thô.

---

## Endpoint

```
POST /api/v1/query
Authorization: Bearer sk_live_your_api_key
Content-Type: application/json
```

---

## Chế Độ 1: Truy Vấn Ngôn Ngữ Tự Nhiên

AI chuyển câu hỏi thành SQL dựa trên Context đã cấu hình.

### Request Body

```json
{
  "contextId": "ctx_abc123",
  "question": "Tổng doanh thu theo từng chi nhánh trong tháng 6"
}
```

| Trường | Kiểu | Bắt Buộc | Mô Tả |
|--------|------|---------|--------|
| `contextId` | string | ✅ | ID của Context (lấy từ URL khi mở Context trong Semantix) |
| `question` | string | ✅ | Câu hỏi bằng ngôn ngữ tự nhiên (tối đa 5,000 ký tự) |
| `filters` | object | ❌ | Bộ lọc bổ sung áp dụng lên kết quả |

### Ví Dụ Request Với Filters

```json
{
  "contextId": "ctx_abc123",
  "question": "Doanh thu theo tháng",
  "filters": {
    "chi_nhanh": "HCM",
    "nam": 2026
  }
}
```

---

## Chế Độ 2: SQL Thô

Thực thi câu SQL trực tiếp trên database.

### Request Body

```json
{
  "connectionId": "conn_xyz789",
  "sql": "SELECT chi_nhanh, SUM(doanh_thu) as tong FROM don_hang WHERE EXTRACT(YEAR FROM ngay) = 2026 GROUP BY chi_nhanh ORDER BY tong DESC"
}
```

| Trường | Kiểu | Bắt Buộc | Mô Tả |
|--------|------|---------|--------|
| `connectionId` | string | ✅ | ID của Connection (lấy từ URL khi mở Connection trong Semantix) |
| `sql` | string | ✅ | Câu SQL cần thực thi (tối đa 50,000 ký tự) |

> **Lưu ý bảo mật**: Chế độ SQL thô thực thi trực tiếp trên database. Chỉ được phép với API key có scope `execute:query`. Đảm bảo user database chỉ có quyền SELECT.

---

## Response

```json
{
  "data": [
    { "chi_nhanh": "HCM", "tong": 1250000000 },
    { "chi_nhanh": "HN", "tong": 980000000 },
    { "chi_nhanh": "DNG", "tong": 430000000 }
  ],
  "metadata": {
    "rowCount": 3,
    "durationMs": 245,
    "sql": "SELECT chi_nhanh, SUM(doanh_thu) as tong FROM don_hang WHERE ...",
    "source": "PostgreSQL Production (postgresql)",
    "lastUpdated": "2026-06-22T08:00:00.000Z",
    "fromCache": false
  }
}
```

### Cấu Trúc data[]

Mỗi phần tử trong `data` là một object với key = tên cột, value = giá trị ô:

```json
[
  { "column_a": "value_1", "column_b": 123, "column_c": null },
  { "column_a": "value_2", "column_b": 456, "column_c": "2026-01-15" }
]
```

**Kiểu dữ liệu trả về:**
- Text → string
- Number → number (integer hoặc float)
- Date/DateTime → string ISO 8601: `"2026-06-22"` hoặc `"2026-06-22T08:00:00.000Z"`
- Boolean → boolean
- NULL → `null`

---

## Xử Lý Lỗi

```json
{
  "error": "Context not found: ctx_abc123"
}
```

| HTTP Status | Error Message | Xử Lý |
|-------------|--------------|--------|
| `400` | "question is required" | Kiểm tra request body |
| `400` | "contextId and question, or connectionId and sql are required" | Phải có một trong hai cặp |
| `401` | "Invalid or missing API key" | Kiểm tra header Authorization |
| `403` | "API key missing scope: execute:query" | Tạo lại key với đúng scope |
| `404` | "Context not found: ctx_xxx" | Kiểm tra lại contextId |
| `408` | "Query timeout" | Query chạy quá `MAX_QUERY_TIMEOUT`. Tối ưu SQL hoặc tăng timeout |
| `429` | "Rate limit exceeded" | Chờ và retry với exponential backoff |
| `500` | "Database error: ..." | Lỗi từ database — xem chi tiết trong error message |

---

## Ví Dụ Code

### JavaScript (Node.js)

```javascript
const SEMANTIX_URL = process.env.SEMANTIX_URL;
const SEMANTIX_API_KEY = process.env.SEMANTIX_API_KEY;

async function querySemantics(question, contextId) {
  const response = await fetch(`${SEMANTIX_URL}/api/v1/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SEMANTIX_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ contextId, question }),
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(`Semantix API error: ${error}`);
  }

  const { data, metadata } = await response.json();
  console.log(`Query took ${metadata.durationMs}ms, returned ${metadata.rowCount} rows`);
  return data;
}

// Sử dụng
const results = await querySemantics(
  'Top 10 khách hàng theo doanh thu tháng này',
  'ctx_abc123'
);
```

### Python

```python
import os
import requests

SEMANTIX_URL = os.environ['SEMANTIX_URL']
SEMANTIX_API_KEY = os.environ['SEMANTIX_API_KEY']

def query_semantix(question: str, context_id: str) -> list[dict]:
    response = requests.post(
        f'{SEMANTIX_URL}/api/v1/query',
        headers={
            'Authorization': f'Bearer {SEMANTIX_API_KEY}',
            'Content-Type': 'application/json',
        },
        json={
            'contextId': context_id,
            'question': question,
        },
        timeout=90  # AI queries có thể mất đến 60-90 giây
    )
    response.raise_for_status()
    result = response.json()
    return result['data']

# Sử dụng
rows = query_semantix(
    'Doanh thu theo ngày trong tháng 6',
    'ctx_abc123'
)
for row in rows:
    print(f"{row['ngay']}: {row['doanh_thu']:,} VNĐ")
```

### cURL

```bash
# Ngôn ngữ tự nhiên
curl -X POST https://your-domain.com/api/v1/query \
  -H "Authorization: Bearer sk_live_your_key" \
  -H "Content-Type: application/json" \
  -d '{"contextId":"ctx_abc123","question":"Doanh thu hôm qua"}'

# SQL thô
curl -X POST https://your-domain.com/api/v1/query \
  -H "Authorization: Bearer sk_live_your_key" \
  -H "Content-Type: application/json" \
  -d '{"connectionId":"conn_xyz789","sql":"SELECT COUNT(*) as total FROM orders"}'
```

---

## Tìm contextId và connectionId

**contextId:** Vào Studio → DABI → Data Models → Chọn model → Semantic Contexts → Nhấn vào Context → xem URL: `.../contexts/ctx_abc123`

**connectionId:** Vào Studio → DE → Connections → Nhấn vào Connection → xem URL: `.../connections/conn_xyz789`
