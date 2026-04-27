# Audit Logs

Audit Logs record all significant actions taken in Semantix for security and compliance purposes.

## Accessing Audit Logs

Go to **Admin → Audit Logs**

## What is Logged

| Category | Events |
|----------|--------|
| **Authentication** | Login, logout, failed login attempts, SSO login |
| **User Management** | User created, updated, deactivated, role changed |
| **Connections** | Connection created, updated, deleted, health check |
| **Data Access** | Queries executed via API, chat sessions |
| **Dashboards** | Dashboard created, shared, deleted |
| **Admin Actions** | API key created/revoked, settings changed |

## Log Entry Fields

| Field | Description |
|-------|-------------|
| **Timestamp** | When the action occurred (UTC) |
| **User** | Who performed the action |
| **Action** | What was done (e.g. `login`, `create`, `delete`) |
| **Resource** | What was affected (e.g. `Connection`, `Dashboard`) |
| **Resource ID** | The ID of the affected item |
| **IP Address** | The request's originating IP |
| **User Agent** | Browser or API client identifier |
| **Details** | Additional context (e.g. changed fields) |

## Filtering Logs

Use the filters at the top of the Audit Logs page to search by:
- Date range
- User
- Action type
- Resource type

## Retention

Audit logs are retained indefinitely by default. Contact your database administrator to set up log archiving if storage is a concern.
