# POST /v1/embed/token

Generate a signed JWT token to embed a dashboard in an external application.

## Request

```
POST /api/v1/embed/token
Authorization: Bearer sk_live_your_api_key
Content-Type: application/json
```

```json
{
  "dashboardId": "dash_abc123",
  "expiryDays": 30,
  "lockedFilters": {
    "region": "Asia",
    "customer_id": "12345"
  }
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `dashboardId` | string | ✅ | ID of the dashboard to embed |
| `expiryDays` | number | ❌ | Token validity in days (max 365, default 30) |
| `lockedFilters` | object | ❌ | Filters baked into the token — users cannot override these |

## Response

```json
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresAt": "2026-05-28T00:00:00.000Z",
    "dashboardId": "dash_abc123"
  }
}
```

## Using the Token

Render the dashboard in an iframe on your frontend:

```html
<iframe
  src="https://your-domain.com/en/embed/dashboard/dash_abc123?token=eyJhbGci..."
  width="100%"
  height="600"
  frameborder="0"
></iframe>
```

## Security Notes

- **Never generate embed tokens on the frontend** — your API key would be exposed
- Generate tokens on your **backend server** and pass them to the frontend
- Use `lockedFilters` to enforce data isolation per user/tenant
- Tokens expire after `expiryDays` — generate a fresh token for each session if needed

## Example — Node.js Backend

```javascript
// Server-side only
const res = await fetch('https://your-domain.com/api/v1/embed/token', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.SEMANTIX_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    dashboardId: 'dash_abc123',
    expiryDays: 1,
    lockedFilters: {
      customer_id: currentUser.id,
    },
  }),
});

const { data } = await res.json();
// Pass data.token to the frontend
```
