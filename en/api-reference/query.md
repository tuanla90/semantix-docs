# POST /v1/query

Execute a data query — supports both natural language (AI-powered) and raw SQL.

---

## Endpoint

```
POST /api/v1/query
Authorization: Bearer sk_live_your_api_key
Content-Type: application/json
```

---

## Mode 1: Natural Language Query

The AI converts your question into SQL based on the configured Context.

### Request Body

```json
{
  "contextId": "ctx_abc123",
  "question": "Total revenue by branch in June"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `contextId` | string | ✅ | Context ID (found in the URL when opening a Context in Semantix) |
| `question` | string | ✅ | Natural language question (max 5,000 characters) |
| `filters` | object | ❌ | Additional filters applied to the result |

### Example Request with Filters

```json
{
  "contextId": "ctx_abc123",
  "question": "Revenue by month",
  "filters": {
    "region": "West",
    "year": 2026
  }
}
```

---

## Mode 2: Raw SQL

Execute SQL directly against a database connection.

### Request Body

```json
{
  "connectionId": "conn_xyz789",
  "sql": "SELECT branch, SUM(revenue) as total FROM orders WHERE EXTRACT(YEAR FROM order_date) = 2026 GROUP BY branch ORDER BY total DESC"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `connectionId` | string | ✅ | Connection ID (found in the URL when opening a Connection in Semantix) |
| `sql` | string | ✅ | SQL query to execute (max 50,000 characters) |

> **Security note**: Raw SQL mode executes directly on the database. Only available with API keys that have the `execute:query` scope. Ensure the database user has SELECT-only permissions.

---

## Response

```json
{
  "data": [
    { "branch": "West", "total": 1250000 },
    { "branch": "East", "total": 980000 },
    { "branch": "South", "total": 430000 }
  ],
  "metadata": {
    "rowCount": 3,
    "durationMs": 245,
    "sql": "SELECT branch, SUM(revenue) as total FROM orders WHERE ...",
    "source": "PostgreSQL Production (postgresql)",
    "lastUpdated": "2026-06-22T08:00:00.000Z",
    "fromCache": false
  }
}
```

### data[] Structure

Each element in `data` is an object with key = column name, value = cell value:

```json
[
  { "column_a": "value_1", "column_b": 123, "column_c": null },
  { "column_a": "value_2", "column_b": 456, "column_c": "2026-01-15" }
]
```

**Returned data types:**
- Text → string
- Number → number (integer or float)
- Date/DateTime → ISO 8601 string: `"2026-06-22"` or `"2026-06-22T08:00:00.000Z"`
- Boolean → boolean
- NULL → `null`

---

## Error Handling

```json
{
  "error": "Context not found: ctx_abc123"
}
```

| HTTP Status | Error Message | How to Handle |
|-------------|--------------|---------------|
| `400` | "question is required" | Check the request body |
| `400` | "contextId and question, or connectionId and sql are required" | Must provide one of the two pairs |
| `401` | "Invalid or missing API key" | Check the Authorization header |
| `403` | "API key missing scope: execute:query" | Recreate the key with the correct scope |
| `404` | "Context not found: ctx_xxx" | Verify the contextId |
| `408` | "Query timeout" | Query exceeded `MAX_QUERY_TIMEOUT`. Optimize the SQL or increase timeout |
| `429` | "Rate limit exceeded" | Wait and retry with exponential backoff |
| `500` | "Database error: ..." | Error from the database — check error details |

---

## Code Examples

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

// Usage
const results = await querySemantics(
  'Top 10 customers by revenue this month',
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
        timeout=90  # AI queries can take up to 60-90 seconds
    )
    response.raise_for_status()
    result = response.json()
    return result['data']

# Usage
rows = query_semantix(
    'Daily revenue in June',
    'ctx_abc123'
)
for row in rows:
    print(f"{row['order_date']}: ${row['revenue']:,}")
```

### cURL

```bash
# Natural language
curl -X POST https://your-domain.com/api/v1/query \
  -H "Authorization: Bearer sk_live_your_key" \
  -H "Content-Type: application/json" \
  -d '{"contextId":"ctx_abc123","question":"Yesterday revenue"}'

# Raw SQL
curl -X POST https://your-domain.com/api/v1/query \
  -H "Authorization: Bearer sk_live_your_key" \
  -H "Content-Type: application/json" \
  -d '{"connectionId":"conn_xyz789","sql":"SELECT COUNT(*) as total FROM orders"}'
```

---

## Finding contextId and connectionId

**contextId:** Go to Studio → DABI → Data Models → Select model → Semantic Contexts → Click on a Context → see the URL: `.../contexts/ctx_abc123`

**connectionId:** Go to Studio → DE → Connections → Click on a Connection → see the URL: `.../connections/conn_xyz789`
