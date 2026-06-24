# Audit Logs

**Navigation:** Admin → Monitoring → Audit Logs

Audit Logs record all significant actions taken in Semantix — for security monitoring, debugging, and compliance purposes.

---

## Overview

Every significant action creates a log entry. Logs are stored in the Semantix database (cannot be deleted or modified by regular users) and displayed in reverse chronological order (newest first).

---

## Events That Are Logged

### Authentication

| Event | When |
|-------|------|
| `user.login` | Successful login |
| `user.login_failed` | Failed login (wrong password) |
| `user.login_sso` | Login via SSO |
| `user.logout` | Logout |
| `user.session_expired` | Session timed out automatically |
| `user.locked` | Account locked after too many failed attempts |

### User Management

| Event | When |
|-------|------|
| `user.created` | Admin creates a new user, or SSO auto-provisioning creates one |
| `user.invited` | Invitation email sent |
| `user.activated` | User activates their account |
| `user.deactivated` | Admin deactivates a user |
| `user.role_changed` | Role assignment changed |
| `user.deleted` | User deleted |
| `user.password_reset` | Password reset |

### Data Queries

| Event | When |
|-------|------|
| `query.executed` | Query run via AI Chat or API |
| `query.failed` | Query failed (DB error, timeout) |
| `chat.session_started` | User opens AI Chat |

### System Configuration

| Event | When |
|-------|------|
| `connection.created` | New connection created |
| `connection.updated` | Connection edited |
| `connection.deleted` | Connection deleted |
| `connection.tested` | Connection tested |
| `data_model.created/updated/deleted` | Data Model changed |
| `metric.created/updated/deleted` | Metric changed |
| `context.created/updated/deleted` | Context changed |

### Dashboard & Sharing

| Event | When |
|-------|------|
| `dashboard.created` | New dashboard created |
| `dashboard.updated` | Dashboard edited |
| `dashboard.shared` | Dashboard shared |
| `dashboard.public_link_created` | Public share link created |
| `dashboard.deleted` | Dashboard deleted |
| `report.sent` | Scheduled report sent |

### Admin Actions

| Event | When |
|-------|------|
| `api_key.created` | New API key created |
| `api_key.revoked` | API key revoked |
| `sso.configured` | SSO configured |
| `settings.updated` | Platform settings changed |

---

## Log Entry Fields

| Field | Description | Example |
|-------|-------------|---------|
| **Timestamp** | When it occurred (UTC) | `2026-06-22 08:30:15 UTC` |
| **User** | Email of the person who acted | `john.smith@company.com` |
| **Action** | Event type | `query.executed` |
| **Resource Type** | Type of resource affected | `Dashboard`, `Connection` |
| **Resource ID** | ID of the resource | `dash_abc123` |
| **Resource Name** | Resource name (if available) | `Monthly Revenue Report` |
| **IP Address** | Original IP of the request | `203.45.67.89` |
| **User Agent** | Browser or API client | `Chrome 124.0 / Windows 11` |
| **Status** | Success or failure | `success` / `failed` |
| **Details** | Additional info | SQL executed, fields changed |

---

## Filtering and Searching Logs

### Available Filters

| Filter | Options |
|--------|---------|
| **Date Range** | Any time range |
| **User** | Filter by specific user email |
| **Action** | Filter by event type (login, query, create...) |
| **Resource Type** | Connection, Dashboard, User, API Key... |
| **Status** | Success / Failed / All |

### Search Use Case Examples

**Check who accessed sensitive data:**
- Action: `query.executed`
- Date Range: Last week
- View the Details column to see the SQL that was run

**Detect unusual failed login attempts:**
- Action: `user.login_failed`
- Date Range: Today
- If the same IP has > 5 failures → possible brute force attempt

**Review recent configuration changes:**
- Action: `connection.updated`, `data_model.updated`
- Date Range: Last 7 days

**Audit after a data incident:**
- Filter by Resource Name = name of the affected Data Model
- See who changed what and when

---

## Exporting Logs

Click **Export** on the Audit Logs page to download a CSV file with all current filtered results.

Useful for:
- Sending to a security team for review
- Importing into a SIEM (Splunk, Elastic, Datadog)
- Long-term archiving for compliance requirements

---

## Log Retention

By default, logs are stored indefinitely. To manage database storage:

1. Periodically export and delete old logs via the database
2. Or configure an archive job to run monthly:

```sql
-- Delete logs older than 1 year (run periodically)
DELETE FROM audit_logs 
WHERE created_at < NOW() - INTERVAL '365 days';
```

> Consult your DBA before deleting logs — ensure data has been backed up or archived first.
