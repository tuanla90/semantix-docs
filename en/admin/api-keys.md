# API Keys

API Keys allow external applications and services to access the Semantix API — to query data, manage dashboards, or create embed tokens.

---

## API Key Security Principles

- **Never put an API key in frontend code** (JavaScript, React, Vue...) — it will be exposed to end users
- Always call the API from your **backend server**
- Each application/service should have its own API key with the minimum required scope
- Set expiry dates on API keys — don't leave production keys "never expires"

---

## Creating a New API Key

1. Go to **Admin → Config → Platform Integrations → Tab: API Keys**
2. Click **New API Key**
3. Fill in the details:

| Field | Description | Example |
|-------|-------------|---------|
| **Name** | Descriptive name for the API caller | "Production Backend", "Analytics Dashboard" |
| **Scopes** | Permissions for this key | See table below |
| **Expiry Date** | Expiration date | `2027-01-01` (recommended) |
| **IP Whitelist** | Restrict which IPs can use this key | `203.45.67.89`, `10.0.0.0/24` |

4. Click **Create**
5. **Copy the key immediately** — it is only shown once

---

## Scopes (Permissions)

| Scope | Permission | Related Endpoints |
|-------|-----------|-------------------|
| `execute:query` | Run NL or raw SQL queries | `POST /v1/query` |
| `read:dashboards` | View dashboard list and details | `GET /v1/dashboards` |
| `manage:embeds` | Create embed tokens | `POST /v1/embed/token` |
| `*` | All permissions above | All endpoints |

**Least Privilege Principle:**
- Backend only needs to query data? → Only grant `execute:query`
- Portal embedding dashboards? → Only grant `manage:embeds`
- Don't grant `*` unless every scope is genuinely needed

---

## API Key Format

All API keys start with the `smx_live_` prefix:

```
smx_live_<your_key_here>
```

Used in the HTTP Authorization header:
```
Authorization: Bearer smx_live_<your_key_here>
```

---

## IP Whitelist

Restrict a key to specific IP addresses for significantly stronger security:

**Valid formats:**
```
203.45.67.89          ← Single IP
203.45.67.0/24        ← IP range (CIDR)
10.0.0.0/8            ← Internal network
```

**When IP Whitelist is empty:** The key works from any IP.

**When IP Whitelist is set:** Requests from IPs not in the list receive `403 Forbidden`.

---

## Viewing and Managing Keys

The API Keys page shows:
- Key name
- Granted scopes
- Creation date
- Expiry date
- Last used date
- Status (Active / Expired / Revoked)

Actions:
- **Edit**: Rename, add/remove scopes, extend expiry (cannot view the key value again)
- **Revoke**: Revoke the key immediately — cannot be undone

---

## Rotating an API Key

When a key is compromised or needs replacement after expiry:

1. Create a new key with the same scope and configuration
2. Update all applications currently using the old key
3. Test that the application works correctly with the new key
4. Revoke the old key

> **Revocation takes effect immediately.** Make sure all applications are updated before revoking the old key — otherwise they will receive `401 Unauthorized` instantly.

---

## Usage Examples

### Node.js Backend

```javascript
// Store in environment variable, NEVER hardcode
const SEMANTIX_API_KEY = process.env.SEMANTIX_API_KEY;

const response = await fetch('https://your-domain.com/api/v1/query', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${SEMANTIX_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    contextId: 'ctx_abc123',
    question: 'Total revenue this month',
  }),
});

const data = await response.json();
```

### Python Backend

```python
import os
import requests

api_key = os.environ['SEMANTIX_API_KEY']

response = requests.post(
    'https://your-domain.com/api/v1/query',
    headers={
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json',
    },
    json={
        'contextId': 'ctx_abc123',
        'question': 'Top 10 customers by revenue',
    }
)

data = response.json()
```

### cURL (Testing)

```bash
curl -X POST https://your-domain.com/api/v1/query \
  -H "Authorization: Bearer smx_live_your_key" \
  -H "Content-Type: application/json" \
  -d '{"contextId": "ctx_abc123", "question": "Yesterday revenue"}'
```

---

## Rate Limiting

| Limit | Value |
|-------|-------|
| Requests / hour / API key | 1,000 |
| Concurrent requests | 10 |

Headers returned in each response:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 987
X-RateLimit-Reset: 1719043200  (Unix timestamp when limit resets)
```

When the limit is exceeded → HTTP 429 Too Many Requests. Handle with exponential backoff.
