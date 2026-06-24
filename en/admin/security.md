# Data Security

An overview of Semantix's security architecture — explaining how your data is protected at every layer.

---

## Core Principle: Zero Data Retention

**Semantix does not store your business data.**

When the AI answers a question, here is exactly what happens:

```
User's question
        ↓
AI receives: Schema (table names, column names) + Descriptions + Business rules
[Actual data is NEVER sent to the AI]
        ↓
AI generates a SQL query
        ↓
SQL runs directly on your Database
        ↓
Results go straight to the browser
[The AI never sees the query results]
```

The AI only receives **metadata** (schema) — it never receives actual data from your database.

---

## Credential Encryption

All sensitive information is encrypted with **AES-256-GCM** before being stored in the database:

- Database connection passwords
- AI provider API keys (OpenAI, Anthropic...)
- Service account JSON keys (Google)
- Client secrets (SSO OIDC)
- SMTP passwords

The **encryption key** (`ENCRYPTION_KEY` in `.env`) lives only on your server — Semantix never has access to it.

**After saving**: Passwords are not shown again in the UI, do not appear in API responses or server logs, and can only be overwritten with a new value.

---

## HTTPS Required

All connections to Semantix must go through **HTTPS (TLS 1.2 or higher)**:

- A reverse proxy (Nginx/Caddy/Apache) terminates SSL
- Semantix does not expose port 3000 to the internet
- HSTS headers are enabled to prevent downgrade attacks

See sample Nginx configuration: [System Requirements](../getting-started/requirements.md)

---

## Access Control (RBAC)

Semantix uses **Role-Based Access Control**:

- Every user has a **Role**
- The Role determines which features the user can access
- Admins can create custom Roles with specific permissions

**Example role structure:**

| Role | Permissions | Used For |
|------|-------------|---------|
| Viewer | `view:dashboards`, `use:chat` | Employees viewing reports |
| Analyst | + `edit:dashboards`, `view:data_models` | Data analysts |
| Data Engineer | + `manage:connections`, `manage:pipelines` | Data engineers |
| Admin | `admin:all` | System administrators |

---

## Row-Level Security (RLS)

Limits the data each user can see based on personal attributes:

```sql
-- Automatically added to every query for a user with branch = "NYC"
WHERE branch = 'NYC'
```

Users are unaware this filter exists — they simply see only the data they are permitted to view.

See details: [Row-Level Security](../contexts/rls.md)

---

## SSO & MFA

Semantix integrates with your company's IdP (Okta, Azure AD, Google Workspace...) — inheriting all existing security policies:

- **MFA** from the IdP automatically applies to Semantix
- **Session timeout** stays synchronized with the IdP
- **Auto-deactivate**: When a user is disabled in Okta, they automatically lose access to Semantix

See details: [SSO Configuration](sso.md)

---

## Audit Logs

Every action is recorded in an immutable audit trail:

| Event Type | Logged |
|------------|--------|
| Authentication | Successful/failed logins, SSO login, logout |
| User Management | Create/delete/edit user, role change |
| Data Access | Every query via AI Chat and API |
| Configuration | Changes to connections, data models, metrics |
| Admin Actions | API key created/revoked, settings changed |

See details: [Audit Logs](audit-logs.md)

---

## Data Isolation Between Tenants (Multi-Tenant)

When deploying Semantix for multiple companies or departments:

- Use **Embed Tokens with Locked Filters** to isolate data per tenant
- Each tenant sees only their data via `customer_id = {{tenant_id}}`
- Tokens are signed server-side — users cannot forge them

---

## Pre-Launch Security Checklist

**Infrastructure:**
- [ ] HTTPS with a valid SSL certificate (not self-signed)
- [ ] Port 3000 is not exposed to the internet
- [ ] `ENCRYPTION_KEY` generated randomly: `openssl rand -base64 32`
- [ ] `AUTH_SECRET` generated randomly: `openssl rand -hex 32`
- [ ] `.env` file is not committed to git

**Access Control:**
- [ ] SSO configured with company IdP (or at minimum MFA enabled)
- [ ] Roles designed following Least Privilege principle
- [ ] Row-Level Security configured for sensitive data
- [ ] API Keys have minimum required scopes only

**Database:**
- [ ] Semantix uses a read-only database user (SELECT only)
- [ ] IP whitelist allows only the Semantix server IP
- [ ] Connection credentials have been security-tested

**Monitoring:**
- [ ] Audit Logs reviewed regularly
- [ ] Alerts configured for repeated failed logins
- [ ] Sessions monitored via Admin → Sessions

---

## Reporting a Security Vulnerability

Found a security issue? Email **support@semantix.vn** with a detailed description. We are committed to responding within 24 business hours.
