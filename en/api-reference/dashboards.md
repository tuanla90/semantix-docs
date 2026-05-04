# Dashboards Endpoints

## GET /v1/dashboards

List all dashboards accessible with your API key.

```
GET /api/v1/dashboards
Authorization: Bearer sk_live_your_api_key
```

### Response

```json
{
  "data": [
    {
      "id": "dash_abc123",
      "name": "Sales Overview",
      "description": "Monthly sales performance",
      "createdAt": "2026-01-15T10:00:00.000Z",
      "updatedAt": "2026-04-20T08:30:00.000Z"
    }
  ],
  "metadata": {
    "total": 1
  }
}
```

---

## GET /v1/dashboards/:id

Get details of a specific dashboard.

```
GET /api/v1/dashboards/dash_abc123
Authorization: Bearer sk_live_your_api_key
```

### Response

```json
{
  "data": {
    "id": "dash_abc123",
    "name": "Sales Overview",
    "description": "Monthly sales performance",
    "widgets": [
      {
        "id": "widget_1",
        "title": "Revenue by Month",
        "chartType": "line"
      }
    ],
    "createdAt": "2026-01-15T10:00:00.000Z"
  }
}
```

### Error Responses

| Status | Meaning |
|--------|---------|
| `401` | Missing or invalid API key |
| `403` | API key lacks `read:dashboards` scope |
| `404` | Dashboard not found |
| `429` | Rate limit exceeded |
