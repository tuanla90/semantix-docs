# Embedding Dashboards

Embed a Semantix Dashboard into your application, website, or internal portal via iframe with full security.

---

## Overview

The Embed feature lets you:
- Display Dashboards inside a SaaS application (each customer sees only their data)
- Embed in an internal company portal
- Share Dashboards with partners who don't have a Semantix account
- White-label analytics — viewers don't see the Semantix interface

---

## How Embedding Works

```
Your Backend                             Semantix
       │                                    │
       │── POST /api/v1/embed/token ────→   │
       │   (using secret API key)           │
       │←── { token, expiresAt } ────────   │
       │                                    │
       │── Return token to Frontend ──→     │
       │                                    │
       Frontend                             │
       │── Render iframe with token ───────→│
                                            │
                              Semantix validates token
                              Applies lockedFilters
                              Displays Dashboard
```

**Security principle**: The API key is only used on the backend server — never sent to the frontend.

---

## Step 1: Preparation

### Requirements

- A Dashboard already created in Semantix
- An API key with the `manage:embeds` scope
- A backend server (Node.js, Python, PHP, Go, etc.)

### Find the Dashboard ID

Open the Dashboard in Semantix → the browser URL looks like:
```
https://your-domain.com/en/dashboards/dash_abc123/view
```
The Dashboard ID is: `dash_abc123`

---

## Step 2: Generate an Embed Token from the Backend

Call the API from **server-side** to create a token:

```javascript
// Node.js / Express
app.get('/api/embed-token/:dashboardId', requireAuth, async (req, res) => {
  const { dashboardId } = req.params;
  const user = req.user;  // The currently logged-in user in your app

  const response = await fetch(`${SEMANTIX_URL}/api/v1/embed/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SEMANTIX_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      dashboardId,
      expiryMinutes: 60,
      lockedFilters: {
        // Restrict data to this user's scope
        customer_id: user.customerId,
        organization_id: user.orgId,
      },
      userContext: {
        name: user.name,
        email: user.email,
      },
    }),
  });

  const { data } = await response.json();
  res.json({ token: data.token, dashboardId });
});
```

```python
# Python / Flask
@app.route('/api/embed-token/<dashboard_id>')
@require_auth
def get_embed_token(dashboard_id):
    user = g.current_user
    
    response = requests.post(
        f'{SEMANTIX_URL}/api/v1/embed/token',
        headers={
            'Authorization': f'Bearer {os.environ["SEMANTIX_API_KEY"]}',
            'Content-Type': 'application/json',
        },
        json={
            'dashboardId': dashboard_id,
            'expiryMinutes': 60,
            'lockedFilters': {
                'customer_id': user.customer_id,
            },
        }
    )
    
    data = response.json()['data']
    return jsonify({'token': data['token'], 'dashboardId': dashboard_id})
```

---

## Step 3: Render the iframe in the Frontend

```html
<!-- Plain HTML -->
<iframe
  id="semantix-dashboard"
  src="https://your-semantix-domain.com/en/embed/dashboard/dash_abc123?token=eyJhbG..."
  width="100%"
  height="700"
  frameborder="0"
  allowfullscreen
  style="border: none; border-radius: 8px;"
></iframe>
```

```jsx
// React
function EmbeddedDashboard({ dashboardId }) {
  const [src, setSrc] = useState('');

  useEffect(() => {
    fetch(`/api/embed-token/${dashboardId}`)
      .then(r => r.json())
      .then(({ token, dashboardId }) => {
        setSrc(`https://semantix.company.com/en/embed/dashboard/${dashboardId}?token=${token}`);
      });
  }, [dashboardId]);

  return src ? (
    <iframe
      src={src}
      width="100%"
      height="700"
      style={{ border: 'none', borderRadius: '8px' }}
      allowFullScreen
      title="Analytics Dashboard"
    />
  ) : (
    <div>Loading...</div>
  );
}
```

---

## Locked Filters — Data Isolation

`lockedFilters` bakes filter conditions directly into the token — viewers cannot bypass them:

```json
{
  "lockedFilters": {
    "customer_id": "12345",
    "region": "North",
    "year": 2026
  }
}
```

When rendering, Semantix automatically adds:
```sql
WHERE customer_id = '12345' AND region = 'North' AND year = 2026
```

**Multi-tenant SaaS use case:**
```javascript
// Each of your customers only sees their own data
lockedFilters: {
  tenant_id: currentTenant.id,
}
```

**Branch-based access control use case:**
```javascript
lockedFilters: {
  branch_code: currentUser.branch,
  department: currentUser.department,
}
```

---

## Token Options

| Parameter | Description | Default |
|-----------|-------------|---------|
| `expiryDays` | Token valid for X days | 30 days |
| `expiryMinutes` | Token valid for X minutes (takes priority over expiryDays) | — |
| `lockedFilters` | Fixed filter object | — |
| `userContext` | User info for audit logging | — |

**Expiry strategy:**

| Scenario | Recommendation |
|----------|---------------|
| Internal app (employees logged in) | `expiryMinutes: 480` (8-hour workday) |
| Customer portal | `expiryMinutes: 60`, refresh on expiry |
| Unauthenticated share link | `expiryDays: 30` |
| Highly sensitive data | `expiryMinutes: 15` |

---

## Auto-Refresh Token

```javascript
class DashboardEmbed {
  constructor(dashboardId, containerId) {
    this.dashboardId = dashboardId;
    this.container = document.getElementById(containerId);
    this.refreshTimer = null;
  }

  async init() {
    await this.loadDashboard();
  }

  async loadDashboard() {
    const { token, expiresAt } = await this.fetchToken();
    this.renderIframe(token);
    this.scheduleRefresh(new Date(expiresAt));
  }

  async fetchToken() {
    const res = await fetch(`/api/embed-token/${this.dashboardId}`);
    return res.json();
  }

  renderIframe(token) {
    const url = `https://semantix.company.com/en/embed/dashboard/${this.dashboardId}?token=${token}`;
    this.container.innerHTML = `<iframe src="${url}" width="100%" height="600" frameborder="0" allowfullscreen></iframe>`;
  }

  scheduleRefresh(expiresAt) {
    // Refresh 5 minutes before expiry
    const refreshIn = expiresAt - Date.now() - 5 * 60 * 1000;
    if (refreshIn > 0) {
      this.refreshTimer = setTimeout(() => this.loadDashboard(), refreshIn);
    }
  }
}

// Usage
const embed = new DashboardEmbed('dash_abc123', 'dashboard-container');
embed.init();
```

---

## Appearance Options

Add query params to the embed URL to customize the interface:

| Param | Values | Effect |
|-------|--------|--------|
| `theme` | `light` / `dark` | Light or dark UI theme |
| `hideHeader` | `true` | Hide the dashboard header (title, buttons) |
| `hideFilters` | `true` | Hide filters (viewers cannot change them) |
| `lang` | `vi` / `en` | Display language |

```html
<iframe
  src="https://semantix.company.com/en/embed/dashboard/dash_abc123
       ?token=eyJhbG...
       &theme=light
       &hideHeader=true
       &lang=en"
  ...
></iframe>
```

---

## Security Checklist

- [ ] API key stored ONLY in the backend server's environment variable
- [ ] Backend endpoint for token generation is protected by authentication
- [ ] `lockedFilters` set correctly to isolate data per tenant/user
- [ ] Token expiry is appropriate (don't set too long for sensitive data)
- [ ] API key for embed only needs `manage:embeds` scope (not `execute:query`)
- [ ] Tokens are not logged in application logs
