# Platform Integrations

**Navigate to:** Admin → Config → Platform Integrations

Platform Integrations consolidates key platform-level configuration into one place: SSO, API Keys, AI Tools, Notification Channels, Quotas, and SQL Templates.

## Configuration Tabs

### SSO (Single Sign-On)
Configure single sign-on via SAML 2.0 or OIDC. See [SSO](sso.md) for details.

### API Keys
Manage API keys for accessing the Semantix API from external applications. See [API Keys](api-keys.md) for details.

### AI Tools
Enable/disable and configure AI Agent tools — for example, the ability for AI to execute Python code, call external APIs, etc.

| Tool | Description |
|------|-------------|
| **SQL Executor** | AI executes SQL queries directly |
| **Python Executor** | AI runs Python code for analysis |
| **Web Search** | AI searches the internet |
| **External API** | AI calls configured external APIs |

### Channels (Notification Channels)
Configure notification and report delivery channels: Telegram, Zalo, Microsoft Teams, Email. See [Notifications](../notifications/README.md).

### Quota (Usage Limits)
Set usage limits for users or the entire system:
- Maximum AI questions per day per user
- Maximum tokens per month
- File export limits

### SQL Templates
Manage reusable SQL query templates across the system — for standardized queries or macros.

## Notes

All changes in Platform Integrations are recorded in Audit Logs. Only Admins can access this page.
