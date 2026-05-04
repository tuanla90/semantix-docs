# Embedding Dashboards

Embed Semantix dashboards into your own application or website using an **iframe** and a signed **embed token**.

## How It Works

1. Your backend requests an embed token from the Semantix API
2. The token is passed to your frontend
3. Your frontend renders an iframe with the token in the URL
4. Semantix validates the token and displays the dashboard

## Step 1 — Generate an Embed Token

Call the Semantix API from your **backend** (never from the frontend — the API key must stay secret):

```bash
POST /api/v1/embed/token
Authorization: Bearer sk_live_your_api_key
Content-Type: application/json

{
  "dashboardId": "your-dashboard-id",
  "expiryDays": 30,
  "lockedFilters": {
    "region": "Asia"
  }
}
```

**Response:**
```json
{
  "data": {
    "token": "eyJhbGci...",
    "expiresAt": "2026-05-28T00:00:00.000Z",
    "dashboardId": "your-dashboard-id"
  }
}
```

## Step 2 — Render the iframe

```html
<iframe
  src="https://your-semantix-domain.com/en/embed/dashboard/your-dashboard-id?token=eyJhbGci..."
  width="100%"
  height="600"
  frameborder="0"
  allowfullscreen
></iframe>
```

## Locked Filters

Use `lockedFilters` to bake access restrictions directly into the token. Users viewing the embedded dashboard cannot bypass these filters:

```json
{
  "lockedFilters": {
    "customer_id": "12345",
    "region": "Asia"
  }
}
```

## Token Options

| Option | Type | Description | Default |
|--------|------|-------------|---------|
| `dashboardId` | string | ID of the dashboard to embed | Required |
| `expiryDays` | number | Token validity in days (max 365) | `30` |
| `lockedFilters` | object | Filters baked into the token | None |

> ⚠️ Embed tokens are scoped to a specific dashboard. Generate a new token for each dashboard you want to embed.
