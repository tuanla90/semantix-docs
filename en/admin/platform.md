# Platform Integrations

**Navigation:** Admin → Config → Platform Integrations

Platform Integrations is the central hub for configuring all Semantix platform-level settings: email, notification channels, AI tools, usage limits, and SQL templates.

---

## Tab: Email (SMTP)

Configure a mail server so Semantix can send:
- Invitation emails for new users
- Password reset notifications
- Scheduled reports
- Alert notifications when thresholds are exceeded

### Configuration Fields

| Field | Description | Example |
|-------|-------------|---------|
| **SMTP Host** | Mail server address | `smtp.gmail.com` |
| **SMTP Port** | SMTP port | `587` (TLS) or `465` (SSL) |
| **Username** | Sending email account | `noreply@company.com` |
| **Password** | Password or App Password | `••••••` |
| **From Address** | Display address in outgoing emails | `Semantix <noreply@company.com>` |
| **Encryption** | Encryption protocol | STARTTLS or SSL/TLS |

### Settings for Common Providers

**Gmail (Google Workspace):**
```
SMTP Host: smtp.gmail.com
SMTP Port: 587
Encryption: STARTTLS
Username: noreply@company.com
Password: App Password (create from Google Account → Security → App passwords)
```

**SendGrid:**
```
SMTP Host: smtp.sendgrid.net
SMTP Port: 587
Username: apikey
Password: SG.xxxxx (your SendGrid API key)
```

**AWS SES:**
```
SMTP Host: email-smtp.us-east-1.amazonaws.com
SMTP Port: 587
Username: AKIAXXXXXXXX (SMTP credentials from SES console)
Password: xxxx
```

**Office 365:**
```
SMTP Host: smtp.office365.com
SMTP Port: 587
Encryption: STARTTLS
Username: noreply@company.com
Password: Account password
```

### Test Email

After filling in the settings → click **Send Test Email** → enter a recipient address → check the inbox (including Spam).

---

## Tab: Notification Channels

Manage channels for receiving alerts and reports. See the detailed guide for each channel:

| Channel | Documentation |
|---------|--------------|
| Telegram | [Telegram Bot](../notifications/telegram.md) |
| Zalo OA | [Zalo](../notifications/zalo.md) |
| Microsoft Teams | [Microsoft Teams](../notifications/teams.md) |
| Email | Configure via the SMTP tab above |

---

## Tab: AI Tools

Enable or disable the tools that the AI Agent can use in Agentic mode:

| Tool | Description | Risk |
|------|-------------|------|
| **SQL Executor** | AI executes SQL queries directly | Low — SELECT only |
| **Python Executor** | AI runs Python code for analysis | Medium — requires sandbox |
| **Web Search** | AI searches the internet | Low |
| **External API Call** | AI calls pre-configured external APIs | Depends on the API |

**Recommendation for production**: Enable only SQL Executor. Enable other tools on a case-by-case basis after assessing the risk.

---

## Tab: API Keys

Manage API keys for external API access.

See details: [API Keys](api-keys.md)

---

## Tab: Quota (Usage Limits)

Set limits to control AI costs and system load:

### Per-User Limits

| Limit | Description | Default |
|-------|-------------|---------|
| **AI Queries / Day / User** | Maximum AI questions per day | Unlimited |
| **Tokens / Month / User** | Maximum LLM tokens per month | Unlimited |

### System-Wide Limits

| Limit | Description | Default |
|-------|-------------|---------|
| **Concurrent AI Requests** | Number of simultaneous AI requests | 10 |
| **Max Export Rows** | Maximum rows when exporting CSV | 100,000 |
| **Max Query Timeout** | Maximum timeout for DB queries (seconds) | 60 |

**When to set quotas:**
- Controlling API costs when using pay-per-token providers (OpenAI/Anthropic)
- Preventing one user from consuming all AI capacity
- Production environments with many simultaneous users

---

## Tab: SQL Templates

Manage reusable SQL templates across the system — used for Advanced Analysis features like Cohort, RFM, and Funnel.

### Available Templates

| Template Key | Purpose |
|-------------|---------|
| `TEMPLATE_SQL_COHORT` | Default SQL for Cohort Analysis |
| `TEMPLATE_SQL_RFM` | Default SQL for RFM Analysis |
| `TEMPLATE_SQL_FUNNEL` | Default SQL for Funnel Analysis |

**When to edit a template:**
- The database uses a different SQL dialect (e.g. BigQuery instead of PostgreSQL)
- Custom business logic is needed for the analysis
- The default template doesn't match your table structure

> **Warning**: Only edit templates if you fully understand the expected input/output format. An incorrect template will cause Advanced Analysis to return errors.

---

## Tab: Security Settings

Configure global security settings:

| Setting | Description | Default |
|---------|-------------|---------|
| **Session Timeout** | Automatic logout after X minutes of inactivity | 480 minutes (8 hours) |
| **Max Login Attempts** | Maximum failed logins before account lockout | 5 |
| **Lockout Duration** | Account lock duration after exceeding the limit | 30 minutes |
| **Password Policy** | Password complexity requirements | Configurable |
| **Allowed Email Domains** | Restrict registration to specific domains | (empty = all domains) |

---

## Audit Trail

All changes in Platform Integrations are recorded in Audit Logs, including:
- Who made the change
- Which fields were changed (excluding sensitive values like passwords)
- When the change occurred

Only accounts with `admin:all` permission can access and modify Platform Integrations.
