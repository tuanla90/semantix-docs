# API Reference

The Semantix Public API lets you query data, manage dashboards, and generate embed tokens programmatically.

## Base URL

```
https://your-semantix-domain.com/api/v1
```

## Authentication

All API requests require a **Bearer token** in the `Authorization` header:

```bash
Authorization: Bearer sk_live_your_api_key
```

### Getting an API Key

1. Go to **Admin → API Keys → New API Key**
2. Give it a name and select the required scopes
3. Copy the key — **it will only be shown once**

### Available Scopes

| Scope | Description |
|-------|-------------|
| `execute:query` | Run NL or raw SQL queries |
| `read:dashboards` | List and read dashboards |
| `manage:embeds` | Generate embed tokens |
| `*` | All scopes |

## Rate Limiting

| Limit | Value |
|-------|-------|
| Requests per hour | 1,000 per API key |

Rate limit headers are included in every response:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 987
X-RateLimit-Reset: 1714300800
```

## Response Format

All endpoints return JSON:

```json
{
  "data": [...],
  "metadata": {
    "rowCount": 42,
    "durationMs": 312,
    "sql": "SELECT ...",
    "lastUpdated": "2026-04-28T08:00:00.000Z"
  }
}
```

Errors return:

```json
{
  "error": "Description of what went wrong"
}
```

## Endpoints

| Method | Endpoint | Scope | Description |
|--------|----------|-------|-------------|
| POST | [/v1/query](query.md) | `execute:query` | Run a NL or SQL query |
| GET | [/v1/dashboards](dashboards.md) | `read:dashboards` | List dashboards |
| GET | [/v1/dashboards/:id](dashboards.md) | `read:dashboards` | Get a dashboard |
| POST | [/v1/embed/token](embed-token.md) | `manage:embeds` | Generate embed token |
