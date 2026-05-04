# POST /v1/query

Execute a query against your data — either via natural language or raw SQL.

## Request

```
POST /api/v1/query
Authorization: Bearer sk_live_your_api_key
Content-Type: application/json
```

## Mode 1 — Natural Language Query

Ask a question in plain English using a configured context:

```json
{
  "contextId": "ctx_abc123",
  "question": "Show me total revenue by region for last month"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `contextId` | string (UUID) | ✅ | ID of the context to query |
| `question` | string | ✅ | Natural language question (max 5,000 chars) |

## Mode 2 — Raw SQL Query

Execute SQL directly against a connection:

```json
{
  "connectionId": "conn_xyz789",
  "sql": "SELECT region, SUM(revenue) FROM orders GROUP BY region"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `connectionId` | string (UUID) | ✅ | ID of the connection to query |
| `sql` | string | ✅ | SQL query to execute (max 50,000 chars) |

> ⚠️ Raw SQL requires the `execute:query` scope and runs directly on your database. Use with care.

## Response

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

## Example — cURL

```bash
curl -X POST https://your-domain.com/api/v1/query \
  -H "Authorization: Bearer sk_live_your_api_key" \
  -H "Content-Type: application/json" \
  -d '{
    "contextId": "ctx_abc123",
    "question": "Total orders this week"
  }'
```

## Example — JavaScript

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
