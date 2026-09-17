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

## Locked Filters Architecture (S22)

`lockedFilters` is a database-grade security mechanism integrated directly into Semantix's JWT signing and validation pipeline (`lib/embed-tokens.ts`).

### Signed JWT Payload Structure
When your backend requests an embed token, the Semantix server cryptographically signs the security claims into the JWT payload:

```json
{
  "iss": "semantix-embed",
  "did": "dash_abc123",
  "tv": 1,
  "lf": {
    "customer_id": "12345",
    "region": "West",
    "year": 2026
  },
  "uid": "usr_sec_admin_01",
  "iat": 1719039600,
  "exp": 1719043200
}
```

| Claim | Full Name | Security Purpose |
|---|---|---|
| `did` | Dashboard ID | Identifier of the authorized dashboard resource |
| `tv` | Token Version | Version marker utilized for instant token revocation |
| `lf` | Locked Filters (S22) | Mandatory row-level filter object, signed with `EMBED_JWT_SECRET` |
| `uid` | Issued By User ID (S02) | Identity of the token issuer, binding audit logs and RLS inheritance |

### Server-Side RLS Enforcement Principles
1. **Cryptographic Validation**: The server validates the HMAC-SHA256 signature using `EMBED_JWT_SECRET` (or `AUTH_SECRET`). Any token tampering or expiration immediately aborts the request (`401/403`).
2. **Base CTE Constraint Injection**: When executing widget queries, Semantix compiles the `lf` claim directly into the Base Common Table Expression (CTE) of the SQL query:
   ```sql
   WITH base_view AS (
       SELECT * FROM core_sales
       WHERE customer_id = '12345' AND region = 'West' AND year = 2026
   )
   SELECT category, SUM(amount) AS total FROM base_view GROUP BY category;
   ```
3. **Tamper-Proof Guarantee**: Locked filter constraints cannot be overridden, broadened, or replaced by client query parameters, WebSocket messages, or request bodies.

### Embedded Client Experience (UI Behavior)
- **Read-Only Lock Badges**: Inside the embedded dashboard, locked filter values are rendered as non-removable chip badges displaying a lock icon (🔒).
- **Disabled Interactions**: External users cannot remove the badge chips or alter values through dropdown menus.
- **Additive Filters Only**: Any additional interactive filters applied by the user are appended using the SQL `AND` operator, ensuring data visibility can only be restricted further, never expanded.

### Multi-Tenant Server Integration Example

```javascript
// Your backend generates a tenant-isolated token for the authenticated user
const tokenResponse = await fetch('https://semantix.company.com/api/v1/embed/token', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.SEMANTIX_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    dashboardId: 'dash_financial_summary',
    expiryMinutes: 120,
    lockedFilters: {
      tenant_id: currentSession.tenantId,
      branch_code: currentSession.branchCode,
    },
    userContext: {
      userId: currentSession.userId,
      email: currentSession.email,
    },
  }),
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
