# POST /v1/embed/token

Generate a signed JWT token to embed a Semantix dashboard in an external application via iframe.

---

## Endpoint

```
POST /api/v1/embed/token
Authorization: Bearer sk_live_your_api_key
Content-Type: application/json
```

---

## Request Body

```json
{
  "dashboardId": "dash_abc123",
  "expiryDays": 1,
  "lockedFilters": {
    "customer_id": "12345",
    "region": "West"
  },
  "userContext": {
    "name": "John Smith",
    "email": "john@customer.com"
  }
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `dashboardId` | string | ✅ | ID of the dashboard to embed |
| `expiryDays` | number | ❌ | Days the token is valid (1-365, default: 30) |
| `expiryMinutes` | number | ❌ | Minutes the token is valid (replaces `expiryDays` for short-lived tokens) |
| `lockedFilters` | object | ❌ | Fixed filters — viewers cannot change or bypass these |
| `userContext` | object | ❌ | Viewer information for audit log display |

---

## Response

```json
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXNoYm9hcmRJZCI6ImRhc2hfYWJjMTIzIiwiZXhwIjoxNzE5MDQzMjAwfQ.xxxx",
    "expiresAt": "2026-06-23T08:00:00.000Z",
    "dashboardId": "dash_abc123"
  }
}
```

---

## Render Dashboard in an iframe

After obtaining the token, render it in the frontend:

```html
<iframe
  src="https://your-semantix-domain.com/en/embed/dashboard/dash_abc123?token=eyJhbGci..."
  width="100%"
  height="600"
  frameborder="0"
  allowfullscreen
  style="border: none; border-radius: 8px;"
></iframe>
```

**Embed URL format:**
```
https://{domain}/en/embed/dashboard/{dashboardId}?token={token}
```

---

## Locked Filters (Fixed Filters)

`lockedFilters` bakes filter conditions into the token — viewers cannot bypass them:

```json
{
  "lockedFilters": {
    "customer_id": "12345",
    "region": "West",
    "year": 2026
  }
}
```

**How it works:**
1. Token is signed with the `lockedFilters`
2. When rendering the dashboard, Semantix reads filters from the token
3. Applies `WHERE customer_id = '12345' AND region = 'West' AND year = 2026` to all queries
4. Viewers only see data that matches those filters

**Multi-tenant use case:**

```javascript
// Each customer sees only their own data
const token = await createEmbedToken('dash_abc123', {
  customer_id: currentUser.tenantId,
});
```

---

## Token Expiry Strategy

| Scenario | Configuration | Reason |
|----------|--------------|--------|
| Dashboard embedded in customer app | `expiryDays: 30` | Token survives across multiple sessions |
| Dashboard embedded per-view | `expiryMinutes: 60` | Higher security |
| Public dashboard (no auth needed) | `expiryDays: 365` | Always accessible |
| Highly sensitive data | `expiryMinutes: 15` | Reduce risk if token is exposed |

---

## Backend → Frontend Workflow

**Never create embed tokens on the frontend** — the API key would be exposed in source code.

```
Frontend (React/Vue)        Backend Server           Semantix API
       │                         │                        │
       │── Request dashboard ──→ │                        │
       │                         │── POST /embed/token ──→│
       │                         │ (using secret API key) │
       │                         │←── { token } ──────────│
       │←── { token, dashId } ── │                        │
       │                         │                        │
       │── Render iframe with token ───────────────────────→│
```

### Node.js Backend Example (Express)

```javascript
// routes/embed.js
app.get('/api/dashboard-token/:dashboardId', authMiddleware, async (req, res) => {
  const { dashboardId } = req.params;
  const currentUser = req.user;

  try {
    const response = await fetch(`${process.env.SEMANTIX_URL}/api/v1/embed/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SEMANTIX_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dashboardId,
        expiryMinutes: 60,
        lockedFilters: {
          customer_id: currentUser.customerId,
        },
        userContext: {
          name: currentUser.name,
          email: currentUser.email,
        },
      }),
    });

    const { data } = await response.json();
    res.json({ token: data.token, expiresAt: data.expiresAt });
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate embed token' });
  }
});
```

### React Frontend Example

```jsx
function EmbeddedDashboard({ dashboardId }) {
  const [embedUrl, setEmbedUrl] = useState(null);
  
  useEffect(() => {
    // Get token from backend (not directly from Semantix)
    fetch(`/api/dashboard-token/${dashboardId}`)
      .then(res => res.json())
      .then(({ token }) => {
        const url = `https://semantix.company.com/en/embed/dashboard/${dashboardId}?token=${token}`;
        setEmbedUrl(url);
      });
  }, [dashboardId]);
  
  if (!embedUrl) return <div>Loading...</div>;
  
  return (
    <iframe
      src={embedUrl}
      width="100%"
      height="600"
      frameBorder="0"
      title="Dashboard"
    />
  );
}
```

---

## Handling Token Expiry

When a token expires → the iframe shows a "Token expired" screen. Handle it:

1. Listen for `message` events from the iframe:
```javascript
window.addEventListener('message', (event) => {
  if (event.data.type === 'SEMANTIX_TOKEN_EXPIRED') {
    // Call backend to get a new token
    refreshEmbedToken(dashboardId);
  }
});
```

2. Or schedule a proactive refresh before expiry:
```javascript
// Refresh 5 minutes before expiry
const refreshEarly = expiryMs - 5 * 60 * 1000;
setTimeout(() => refreshEmbedToken(), refreshEarly);
```

---

## Common Errors

| HTTP Status | Error | Solution |
|-------------|-------|----------|
| `400` | "dashboardId is required" | Check the request body |
| `403` | "API key missing scope: manage:embeds" | Create a key with `manage:embeds` scope |
| `404` | "Dashboard not found" | Verify the dashboardId is correct |
| `403` | "Token expired" (when rendering iframe) | Generate a new token from the backend |
