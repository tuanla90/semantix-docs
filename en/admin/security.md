# Enterprise Data Security

An overview of Semantix's enterprise security architecture — explaining how your data, credentials, and business logic are protected across every layer.

---

## Core Principle: Zero Data Retention

**Semantix does not store or ingest your raw business data.**

When AI answers a user question, the workflow strictly adheres to the following sequence:

```
User Query (Natural Language)
        ↓
AI receives: Semantic Schema (table/column names) + Descriptions + Business Rules
[Raw enterprise data is NEVER sent to the AI]
        ↓
AI generates SQL query
        ↓
SQL executes directly on your internal Database / Data Warehouse
        ↓
Result rows return directly to the user's browser
[AI never sees or stores query results]
```

The AI model only receives **semantic metadata** (schema structure, column descriptions, and metric definitions). Enterprise records, transaction logs, balances, and PII never leave your on-premises or private VPC perimeter.

---

## Credential Encryption

All sensitive system credentials and integration secrets are encrypted using **AES-256-GCM** before persistence in the PostgreSQL database:

- Database connection passwords
- AI provider API keys (OpenAI, Anthropic, DeepSeek, etc.)
- Service account credentials and client secrets (SSO OIDC / SAML)
- SMTP authentication credentials

**Master Encryption Key** (`ENCRYPTION_KEY` in `.env`):
- Resides strictly on your private server or container environment.
- Semantix engineers and third parties have zero access to this key.

**Post-Persistence Behavior**:
- Credentials are write-only. They are never rendered back to the UI, never exposed via API responses, and never printed in server execution logs.
- Credentials can only be overwritten with new values by authorized administrators.

---

## Mandatory HTTPS (Transport Layer Security)

All network traffic to and from Semantix must be encrypted in transit via **HTTPS (TLS 1.2 or TLS 1.3)**:

- Reverse proxies (Nginx, Caddy, HAProxy, AWS ALB) terminate SSL/TLS.
- Internal application port (default: 3000) must never be directly exposed to the public internet.
- HTTP Strict Transport Security (`HSTS`) headers are enforced to prevent protocol downgrade attacks.

See production Nginx reverse proxy configuration: [System Requirements](../getting-started/requirements.md).

---

## Banking-Grade Enterprise Security Pack (S02 / S04 / S22 / S26)

To meet the rigorous compliance and threat-defense mandates of financial institutions, tier-1 banks, and enterprise SaaS providers, Semantix incorporates an in-depth security suite (**Security Pack S02/S04/S22/S26**):

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 SEMANTIX ENTERPRISE SECURITY ARCHITECTURE                   │
├─────────────────────────────────────────────────────────────────────────────┤
│  Dissemination Channels: Public Share  │   Embed Token   │  Scheduled Cron  │
│  Identity & RLS Context: Link Creator  │   Claim `uid`   │  Report Owner    │
├─────────────────────────────────────────────────────────────────────────────┤
│  Defense Layer 1: Deep SQL Identifier Sanitization & Verification (S26)     │
│                   • Rejects NUL bytes, control characters, quotes, breaks   │
│                   • Dialect-aware quoting (BigQuery, PostgreSQL, MSSQL)     │
├─────────────────────────────────────────────────────────────────────────────┤
│  Defense Layer 2: Base CTE Locked Filters (S22)                             │
│                   • Hard-codes tenant & partition constraints into SQL core │
├─────────────────────────────────────────────────────────────────────────────┤
│  Defense Layer 3: SQL & Technical Leak Prevention (`view_context`)          │
│                   • Strips raw SQL, repair notes, prompts, and engine errors│
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Enforced Row-Level Security (RLS) Across All Dissemination Channels

Row-Level Security (RLS) in Semantix is not limited to interactive dashboard sessions. It is **cryptographically enforced across all data dissemination channels**:

### 1. Public Share Links
- When a dashboard, chart, or analysis session is shared via a public or unauthenticated URL, queries do **not** run under an unconstrained super-admin context.
- The system automatically inherits the permission boundary and RLS policies of the link creator (Creator Context) or applies an explicit public partition filter. Unauthorized data rows outside the creator's scope are permanently pruned at the database query engine level.

### 2. Application Embed Tokens (S02 & S22)
- Embed tokens are signed JWTs using HMAC-SHA256 with the secret `EMBED_JWT_SECRET`.
- **Cryptographic User Binding (S02)**: The server automatically binds the issuing user identity into the secret `uid` claim. Every query originated from an embedded iframe is evaluated against this issuing identity.
- **Locked Filters (S22)**: Security-critical filtering parameters (e.g., `customer_id`, `branch_code`, `organization_id`) are signed directly into the `lf` claim. The server transforms these claims into mandatory RLS clauses pushed into the **Base CTE** of every generated SQL query. External viewers cannot modify or bypass these constraints via browser developer tools or API manipulation.

### 3. Scheduled Reports (S04)
- Automated report deliveries (via email, Telegram, Slack, or webhooks) run as asynchronous background cron jobs without active interactive user sessions.
- Semantix issues internal rendering tokens carrying the audited `rid` (Report ID) claim.
- Query execution and RLS evaluation strictly inherit the permissions of the **Report Owner** recorded in the audited database registry, preventing unauthorized background privilege escalation.

---

## Deep SQL Identifier Sanitization & Verification (S26)

To defend against advanced SQL injection attacks targeting column filters, dynamic identifiers, and global date-range mappings, Semantix employs a **3-layer Fail-Closed verification mechanism**:

### 1. Malicious Identifier Rejection (`isSafeFilterIdentifier`)
Every filter column name submitted by the client (including `_mappedColumn` in global date range pickers) must pass strict sanitization:
- **Maximum Length**: 256 characters (`MAX_FILTER_IDENTIFIER_LENGTH = 256`).
- **Identifier Delimiters Prohibited**: Double quotes (`"`), single quotes (`'`), backticks (`` ` ``), square brackets (`[` and `]`).
- **Control and Escape Sequences Prohibited**: Backslashes (`\`), semicolons (`;`), ASCII control characters (`\x00-\x1f`), and NUL bytes (`\0`).
- **SQL Comment Syntax Prohibited**: Double dashes (`--`), block comments (`/*`, `*/`).

### 2. Filter Payload Sanitization (`sanitizeChartFilters`)
- Client payloads are strictly filtered to allowed keys: `{ column, operator, value, value2, values }`.
- Injected exploit properties (e.g., `type: 'sql'`, `sqlExpression`, or subqueries) are stripped before the filter payload reaches the Semantic Query Engine.
- For global date range filtering, invalid `_mappedColumn` identifiers are dropped immediately (fail-closed without guessing). The temporal grain (`grain`) is restricted to a closed whitelist: `auto`, `day`, `week`, `month`, `quarter`, `year`.

### 3. Dialect-Aware Quoting Adapter (`quoteAlias`)
Validated column identifiers are automatically escaped and quoted according to the target database dialect:
- **PostgreSQL / DuckDB / Google Sheets**: `"column_name"`
- **Google BigQuery / MySQL / ClickHouse / Databricks**: `` `column_name` ``
- **Microsoft SQL Server**: `[column_name]`

If an identifier does not match an authorized column in the underlying Data Model or Data View catalog, the filter is rejected (fail-closed) and an audit alert is logged on the server, mitigating error-based SQL inference attacks.

---

## Data Privacy & Zero Data Retention Architecture

Semantix enforces a strict **Zero Data Retention** boundary between enterprise infrastructure and third-party AI models:

- **AI Never Receives Raw Business Data**: During natural language queries, Semantix transmits only the semantic model (table schema, column names, data types, business descriptions, and calculated metric formulas).
- **Zero Exposure of Sensitive Records**: Customer transaction entries, credit balances, personally identifiable information (PII), and proprietary data points are never included in prompts.
- **On-Premise / VPC Query Execution**: AI-generated SQL is received by the Semantix backend and executed directly on your internal Data Warehouse (PostgreSQL, BigQuery, ClickHouse, Snowflake, MSSQL).
- **Direct-to-Client Data Delivery**: Query result sets stream directly to the client's web browser. AI providers never view, process, or store query output rows.

---

## Role-Based Access Control (RBAC) & Context Control

Semantix pairs enterprise **Role-Based Access Control (RBAC)** with granular technical context restrictions:

| Role | Default Permissions | Intended User Group |
|------|---------------------|---------------------|
| **Viewer** | `view:dashboards`, `use:chat` | Business stakeholders, executives, field operators |
| **Analyst** | + `edit:dashboards`, `view:data_models`, `view_context` | BI specialists, data analysts |
| **Data Engineer** | + `manage:connections`, `manage:pipelines`, `view_context` | Data engineers, database administrators |
| **Admin** | `admin:all` (`*`) | System administrators, SecOps leads |

### The `view_context` Security Gate
- **`view_context`**: A critical security permission that governs access to executed SQL statements, automated repair scripts, Python calculation code, and AI reasoning traces.
- **Audience Segregation**: Business users interact exclusively with natural language insights, KPI scorecards, and visual charts. Only authorized data engineers and analysts with `view_context` can inspect underlying SQL statements and schema internals.

For full architectural details, see [SQL Leak Prevention](sql-leak-prevention.md).

---

## SSO & Identity Provider Integration

Semantix integrates with enterprise Identity Providers (Okta, Microsoft Entra ID / Azure AD, Google Workspace, Keycloak) via OIDC and SAML 2.0:

- **Inherited MFA**: Multi-factor authentication policies configured in your corporate IdP automatically safeguard Semantix.
- **Session Lifecycle Sync**: Session timeouts, revocation, and re-authentication follow corporate IdP policies.
- **Automated Deprovisioning**: Disabling an employee in your corporate IdP immediately revokes access to Semantix on the next token refresh.

See complete setup instructions: [Single Sign-On (SSO) Configuration](sso.md).

---

## Audit Logs & Monitoring

All critical system interactions and data operations are recorded in an immutable audit trail:

| Event Category | Logged Actions |
|----------------|----------------|
| **Authentication** | Interactive login, SSO assertions, failed attempts, logout, session revocation |
| **User & Access** | User creation, role modifications, attribute assignments, token generation |
| **Data Queries** | Natural language queries, dashboard refreshes, SQL execution metadata, user identity |
| **Semantic Config** | Changes to data models, calculated metrics, relationships, database connections |
| **Administrative** | API key issuance/revocation, encryption updates, system settings adjustments |

See audit log administration: [Audit Logs](audit-logs.md).

---

## Multi-Tenant Data Isolation

For SaaS providers and multi-entity enterprises running Semantix across multiple tenants:
- Embed tokens combined with **Locked Filters (S22)** guarantee data isolation per client.
- Each tenant's queries are restricted at the query compilation layer (e.g., `tenant_id = 'T_98765'`).
- Cryptographically signed server-side tokens ensure tenant parameters cannot be forged or tampered with by client applications.

---

## Pre-Launch Security Checklist

**Infrastructure & Network:**
- [ ] HTTPS enabled with a valid, trusted SSL/TLS certificate (not self-signed)
- [ ] Internal port (3000) blocked from direct internet exposure; reverse proxy deployed
- [ ] `ENCRYPTION_KEY` generated cryptographically: `openssl rand -base64 32`
- [ ] `AUTH_SECRET` generated cryptographically: `openssl rand -hex 32`
- [ ] `.env` file excluded from version control repositories (`.gitignore`)

**Access Control & Roles:**
- [ ] Enterprise SSO configured with corporate IdP and mandatory MFA
- [ ] Roles assigned according to the Principle of Least Privilege
- [ ] `view_context` restricted to technical personnel (disabled for general business users)
- [ ] Row-Level Security (RLS) policies configured and validated for sensitive tables
- [ ] API keys granted minimum required scopes (`manage:embeds` vs `admin:all`)

**Database Security:**
- [ ] Dedicated read-only database user provisioned for Semantix (`SELECT` only)
- [ ] Database firewall / IP whitelist restricts incoming connections to Semantix server IPs
- [ ] Workload Identity Federation (WIF) or ADC enabled where available to eliminate static key files

**Auditing & Incident Response:**
- [ ] Audit logging verified under Admin → Audit Logs
- [ ] Repeated authentication failure alerts monitored
- [ ] Active sessions audited under Admin → Sessions

---

## Reporting a Security Vulnerability

If you discover a potential vulnerability or security concern within Semantix, please notify our security team directly at **support@semantix.vn** with detailed reproduction steps. We are committed to responding within 24 business hours.

