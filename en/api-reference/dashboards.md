# Dashboards Endpoints

Endpoints for listing and retrieving dashboard information via the API.

---

## GET /v1/dashboards

List all dashboards that the API key has access to.

### Request

```
GET /api/v1/dashboards
Authorization: Bearer sk_live_your_api_key
```

### Optional Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | number | Page number (starts at 1, default: 1) |
| `limit` | number | Results per page (max 100, default: 20) |
| `search` | string | Search by dashboard name |

**Example with pagination:**
```
GET /api/v1/dashboards?page=2&limit=10&search=revenue
```

### Response

```json
{
  "data": [
    {
      "id": "dash_abc123",
      "name": "Revenue Report",
      "description": "Monthly revenue by branch",
      "createdAt": "2026-01-15T10:00:00.000Z",
      "updatedAt": "2026-06-20T08:30:00.000Z",
      "widgetCount": 8,
      "isPublic": false,
      "owner": {
        "id": "user_123",
        "email": "john@company.com",
        "name": "John Smith"
      }
    },
    {
      "id": "dash_def456",
      "name": "KPI Overview",
      "description": null,
      "createdAt": "2026-02-10T09:00:00.000Z",
      "updatedAt": "2026-06-21T15:00:00.000Z",
      "widgetCount": 4,
      "isPublic": true,
      "owner": {
        "id": "user_456",
        "email": "jane@company.com",
        "name": "Jane Doe"
      }
    }
  ],
  "metadata": {
    "total": 45,
    "page": 1,
    "limit": 20,
    "totalPages": 3
  }
}
```

---

## GET /v1/dashboards/:id

Get the details of a specific dashboard, including the widget list.

### Request

```
GET /api/v1/dashboards/dash_abc123
Authorization: Bearer sk_live_your_api_key
```

### Response

```json
{
  "data": {
    "id": "dash_abc123",
    "name": "Revenue Report",
    "description": "Monthly revenue by branch",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-06-20T08:30:00.000Z",
    "isPublic": false,
    "owner": {
      "id": "user_123",
      "email": "john@company.com",
      "name": "John Smith"
    },
    "widgets": [
      {
        "id": "widget_1",
        "title": "Total Revenue This Month",
        "chartType": "scorecard",
        "position": { "x": 0, "y": 0, "w": 3, "h": 2 }
      },
      {
        "id": "widget_2",
        "title": "Revenue by Month",
        "chartType": "line",
        "position": { "x": 3, "y": 0, "w": 9, "h": 4 }
      },
      {
        "id": "widget_3",
        "title": "Top 10 Branches",
        "chartType": "bar",
        "position": { "x": 0, "y": 2, "w": 6, "h": 4 }
      }
    ]
  }
}
```

### Widget chartType Values

| chartType | Widget |
|-----------|--------|
| `scorecard` | Scorecard (KPI number) |
| `line` | Line chart |
| `bar` | Bar chart |
| `area` | Area chart |
| `pie` | Pie chart |
| `donut` | Donut chart |
| `table` | Data table |
| `scatter` | Scatter/bubble chart |
| `treemap` | Treemap |
| `funnel` | Funnel chart |
| `radar` | Radar chart |
| `text` | Text/markdown widget |

---

## Error Responses

| HTTP Status | Situation |
|-------------|-----------|
| `401` | Missing or invalid API key |
| `403` | API key lacks `read:dashboards` scope |
| `404` | Dashboard not found or deleted |
| `429` | Rate limit exceeded |

**Example error response:**
```json
{
  "error": "Dashboard not found: dash_abc123"
}
```

---

## Code Examples

### JavaScript — List All Dashboards

```javascript
async function listDashboards() {
  let allDashboards = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const res = await fetch(
      `https://your-domain.com/api/v1/dashboards?page=${page}&limit=50`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.SEMANTIX_API_KEY}`,
        }
      }
    );
    const { data, metadata } = await res.json();
    allDashboards = allDashboards.concat(data);
    totalPages = metadata.totalPages;
    page++;
  }

  return allDashboards;
}
```

### Python — Get a Specific Dashboard

```python
import requests
import os

def get_dashboard(dashboard_id: str) -> dict:
    response = requests.get(
        f'https://your-domain.com/api/v1/dashboards/{dashboard_id}',
        headers={
            'Authorization': f'Bearer {os.environ["SEMANTIX_API_KEY"]}',
        }
    )
    response.raise_for_status()
    return response.json()['data']

dashboard = get_dashboard('dash_abc123')
print(f"Dashboard: {dashboard['name']}")
print(f"Widgets: {len(dashboard['widgets'])}")
for widget in dashboard['widgets']:
    print(f"  - {widget['title']} ({widget['chartType']})")
```

---

## Use Cases

**Build a dashboard catalog:**
```javascript
// Fetch all dashboards and display them in your app
const dashboards = await listDashboards();
// Let users select a dashboard to embed
```

**Auto-generate embed tokens for each dashboard:**
```javascript
for (const dashboard of dashboards) {
  const token = await createEmbedToken(dashboard.id, { customer_id: userId });
  saveTokenForDashboard(dashboard.id, token);
}
```
