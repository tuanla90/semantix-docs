# API Reference

The Semantix Public API allows you to integrate data queries, dashboard management, and dashboard embedding into your application.

---

## Base URL

```
https://your-semantix-domain.com/api/v1
```

Replace `your-semantix-domain.com` with your actual Semantix instance domain.

---

## Authentication

Every API request requires a **Bearer token** in the HTTP header:

```
Authorization: Bearer sk_live_your_api_key
```

### Getting an API Key

1. **Admin → Config → Platform Integrations → Tab: API Keys**
2. Click **New API Key**
3. Select the required scopes
4. Copy the key (shown only once)

See details: [API Keys](../admin/api-keys.md)

---

## Endpoints

| Method | Endpoint | Scope | Description |
|--------|----------|-------|-------------|
| `POST` | [/v1/query](query.md) | `execute:query` | Query using NL or raw SQL |
| `GET` | [/v1/dashboards](dashboards.md) | `read:dashboards` | List dashboards |
| `GET` | [/v1/dashboards/:id](dashboards.md) | `read:dashboards` | Get dashboard details |
| `POST` | [/v1/embed/token](embed-token.md) | `manage:embeds` | Create an embed token for iframe |

---

## Response Format

All endpoints return JSON in a standard format:

### Success

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

| Metadata Field | Description |
|----------------|-------------|
| `rowCount` | Number of rows in the result |
| `durationMs` | Query execution time (milliseconds) |
| `sql` | The SQL that was generated and executed |
| `source` | Database connection name |
| `lastUpdated` | Data timestamp (from cache or live query) |
| `fromCache` | `true` if result came from cache |

### Error

```json
{
  "error": "Detailed error description"
}
```

---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| `200` | Success |
| `400` | Invalid request (missing field, wrong format) |
| `401` | Missing or invalid API key |
| `403` | API key lacks the required scope |
| `404` | Resource not found (dashboard, context...) |
| `429` | Rate limit exceeded |
| `500` | Internal server error |

---

## Rate Limiting

| Limit | Value |
|-------|-------|
| Requests / hour / API key | 1,000 |
| Concurrent requests | 10 |

Headers in every response:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 987
X-RateLimit-Reset: 1719043200
```

**When rate limit is exceeded** → HTTP 429. Handle with exponential backoff:

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

## Quick Examples

### Natural Language Query

```bash
curl -X POST https://your-domain.com/api/v1/query \
  -H "Authorization: Bearer sk_live_your_api_key" \
  -H "Content-Type: application/json" \
  -d '{
    "contextId": "ctx_abc123",
    "question": "Total revenue this month by branch"
  }'
```

### Create Embed Token

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

Semantix provides a standard HTTP API — works with any language that supports HTTP:

| Language | Recommended HTTP Library |
|----------|--------------------------|
| JavaScript / TypeScript | `fetch` (native), `axios` |
| Python | `requests`, `httpx` |
| Go | `net/http` |
| PHP | `Guzzle`, `cURL` |
| Java | `OkHttp`, `HttpClient` |
| Ruby | `Faraday`, `Net::HTTP` |

---

## API Security

- **Never** put an API key in frontend code (JavaScript/React/Vue)
- Always call the API from a backend server
- Use minimum required scopes
- Set expiry dates on API keys
- Use IP whitelist for production keys

See also: [API Keys](../admin/api-keys.md) | [Security](../admin/security.md)
