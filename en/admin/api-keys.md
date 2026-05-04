# API Keys

API Keys allow external applications to access the Semantix API.

## Creating an API Key

1. Go to **Admin → API Keys → New API Key**
2. Enter a descriptive name (e.g. "Production Backend", "Analytics Dashboard")
3. Select the required **scopes**
4. Optionally set an **expiry date**
5. Optionally set an **IP whitelist** (restrict to specific IPs)
6. Click **Create**
7. **Copy the key immediately** — it will not be shown again

## API Key Format

All keys start with `sk_live_`:

```
sk_live_abc123def456...
```

## Scopes

| Scope | Description |
|-------|-------------|
| `execute:query` | Run NL and raw SQL queries |
| `read:dashboards` | List and read dashboards |
| `manage:embeds` | Generate embed tokens |
| `*` | All scopes |

## IP Whitelist

Restrict an API key to specific IP addresses for additional security:

- Enter one IP per line or comma-separated
- Supports CIDR notation (e.g. `192.168.1.0/24`)
- Requests from non-whitelisted IPs return `403 Forbidden`

## Rotating a Key

If a key is compromised:

1. Go to **Admin → API Keys**
2. Find the key → click **Revoke**
3. Create a new key with the same scopes
4. Update your applications with the new key

> ⚠️ Revoking a key is immediate and irreversible. Applications using the old key will get `401 Unauthorized` instantly.
