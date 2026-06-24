# System Administration (Admin)

**Navigation:** Admin (top menu) — only visible to users with Admin or specific management permissions.

The Admin area is where you manage the entire Semantix system: users, permissions, security, monitoring, and system configuration.

---

## Admin Module Overview

| Module | Navigation | Description |
|--------|-----------|-------------|
| **Users** | Admin → Access → Users | Manage user accounts |
| **Roles** | Admin → Access → Roles | Create and manage permission groups |
| **SSO** | Admin → Access → SSO | Single Sign-On (SAML/OIDC) |
| **Attributes** | Admin → Access → Attributes | User attributes for Row-Level Security |
| **Tags** | Admin → Access → Tags | Labels for organizing resources |
| **Audit Logs** | Admin → Monitoring → Audit Logs | System activity log |
| **Sessions** | Admin → Monitoring → Sessions | Active login sessions |
| **Security** | Admin → Config → Security | Security configuration |
| **Caching** | Admin → Config → Caching | Cache configuration |
| **Platform** | Admin → Config → Platform | External system integrations |
| **API Keys** | Admin → API Keys | Manage API keys |

---

## User Management

**Navigation:** Admin → Access → Users

### Inviting New Users

1. Go to **Admin → Access → Users → Invite User**.
2. Fill in:
   - **Email**: User's email address
   - **First Name / Last Name**: Full name (optional)
   - **Roles**: Select one or more permission Roles
3. Click **Send Invite**.

The user receives an email with an activation link. The link is valid for **48 hours**. After clicking, they create a password and log in for the first time.

### User List

The Users page shows:
- **Avatar, Name, Email** for each user
- Assigned **Roles**
- **Status**: Active / Inactive / Pending (invited but not yet activated)
- **Last login**
- **Action buttons**: Edit, Deactivate, Resend Invite

**Search and filter:**
- Search by name or email
- Filter by Role
- Filter by Status

### Editing a User

1. Click the user's name or the **Edit (✏️)** icon.
2. You can change:
   - Roles (add/remove permission groups)
   - Attributes (for Row-Level Security)
   - Status (Active/Inactive)
3. Click **Save**.

### Deactivating a User

When an employee leaves:
1. Find the user → click **Deactivate**.
2. The account is locked immediately — they cannot log in.
3. Data (dashboards, chat history) is preserved.

> Don't delete accounts entirely — that removes activity history from Audit Logs.

### User Statuses

| Status | Description |
|--------|-------------|
| **Active** | Can log in and use Semantix normally |
| **Inactive** | Deactivated — cannot log in |
| **Pending** | Invited but has not yet activated their account |

---

## Roles & Permissions

**Navigation:** Admin → Access → Roles

### Default Roles

| Role | Permissions |
|------|-------------|
| **Admin** | Full access — can view and change everything in the system |
| **User** | View dashboards, use AI Chat (no access to Studio or Admin) |

### Creating a Custom Role

1. Go to **Admin → Access → Roles → New Role**.
2. Enter a **Role Name** (e.g. `Data Analyst`, `Sales Manager`, `HR Viewer`).
3. Select the **Permissions** to include.
4. Click **Save**.

### Permission List

**Data Access:**

| Permission | Description |
|------------|-------------|
| `use:chat` | Use AI Chat to ask questions |
| `view:dashboards` | View shared Dashboards |
| `edit:dashboards` | Create, edit, delete own Dashboards |
| `share:dashboards` | Share Dashboards with others |
| `use:data_portal` | Access and export reports from the Data Portal |

**Studio — Data Engineering:**

| Permission | Description |
|------------|-------------|
| `manage:connections` | Create, edit, delete Connections |
| `manage:engine_templates` | Manage Engine Templates |
| `manage:data_templates` | Create, edit, delete Data Templates |
| `manage:pipelines` | Manage Data Pipelines |

**Studio — Data Analytics & BI:**

| Permission | Description |
|------------|-------------|
| `manage:data_models` | Create, edit, delete Data Models |
| `manage:contexts` | Create, edit, delete Semantic Contexts |
| `edit:suggestion` | Approve or reject Suggestions |

**Studio — Data Science & AI:**

| Permission | Description |
|------------|-------------|
| `manage:ai_providers` | Add, edit AI Providers |
| `manage:ai_assistants` | Create, configure AI Assistants |
| `create_knowledge` | Create new Knowledge Bases |
| `edit_knowledge` | Edit Knowledge Bases |
| `delete_knowledge` | Delete Knowledge Bases |

**Admin:**

| Permission | Description |
|------------|-------------|
| `manage:users` | Invite, edit, deactivate users |
| `manage:roles` | Create, edit, delete Roles |
| `manage:sso` | Configure SSO |
| `view:audit_logs` | View Audit Logs |
| `manage:api_keys` | Create, revoke API Keys |
| `manage:alerts` | Create, edit alerts |
| `admin:all` | Full Admin access (includes all above) |

### Assigning Roles to Users

**From the Roles page:**
1. Open the Role.
2. **Members** tab → click **Add Member** → search and select a user.

**From the Users page:**
1. Open the user edit page.
2. Find the **Roles** section → select the Roles to assign.

---

## SSO — Single Sign-On

**Navigation:** Admin → Access → SSO

See the full guide: [SSO (SAML / OIDC)](sso.md)

**Summary:**
- Supports **SAML 2.0** and **OpenID Connect (OIDC)**
- Compatible with: Okta, Azure AD, Google Workspace, Auth0, Keycloak, and any standard IdP
- Supports **Auto Provisioning**: automatically creates a Semantix account when an SSO user logs in for the first time

---

## Audit Logs

**Navigation:** Admin → Monitoring → Audit Logs

Audit Logs record all significant system activity for security and compliance.

### What Gets Logged

| Category | Events |
|---------|---------|
| **Authentication** | Successful/failed logins, logouts, SSO logins |
| **Users** | Created, updated, Role changes, deactivated |
| **Connections** | Created, edited, deleted, tested |
| **Data Access** | AI Chat queries, data exported via Data Portal |
| **Dashboards** | Created, shared, deleted |
| **Admin** | API Key created/revoked, configuration changes |

### Search and Filter

- **Date Range**: Time range (from → to date)
- **User**: Filter by a specific user
- **Action**: Filter by action type (`login`, `create`, `delete`…)
- **Resource Type**: Filter by object type (`Connection`, `Dashboard`, `User`…)

### Log Fields

| Field | Description |
|-------|-------------|
| **Timestamp** | When it occurred (UTC) |
| **User** | Who performed the action |
| **Action** | The action (`login`, `create_connection`, `delete_dashboard`…) |
| **Resource** | The object affected |
| **Resource ID** | Specific ID of the object |
| **IP Address** | Source IP address |
| **User Agent** | Browser or API client |
| **Details** | Additional info (fields changed, old/new values) |

---

## Sessions

**Navigation:** Admin → Monitoring → Sessions

View all active login sessions:
- Who is currently online
- Device, browser
- IP Address
- Session start time

**Terminate a session:**
Click **Revoke** next to a session — the user is logged out immediately. Use when you detect suspicious access or a device is lost.

---

## API Keys

**Navigation:** Admin → API Keys

See the full guide: [API Keys](api-keys.md)

**Summary:**
- API Keys allow external applications to call the Semantix API
- Format: `sk_live_...`
- Supports Scope (permissions) and IP Whitelist
- Key is only shown once when created — save it immediately

---

## System Configuration

### Caching (Admin → Config → Caching)

See: [Caching & Performance](caching.md) — Default TTL: 1 hour, Redis backend, configurable per Connection or Widget.

### Security (Admin → Config → Security)

See: [Architecture & Security](security.md) — Session Timeout, Password Policy, registration controls.

### Platform (Admin → Config → Platform)

See: [Platform Integrations](platform.md) — SMTP, Webhooks, white-label branding.

---

## Admin Setup Checklist

When deploying a new Semantix instance:

- [ ] **Create the first Admin account** (beyond the default)
- [ ] **Configure SMTP** to send user invitation emails
- [ ] **Set up SSO** (if applicable) for convenient login
- [ ] **Create Roles** matching your organization's structure
- [ ] **Invite users** and assign Roles
- [ ] **Configure Caching** to match your data update frequency
- [ ] **Set up Notifications** (Telegram/Teams/email) for critical alerts
- [ ] **Create API Keys** for any external integrations
- [ ] **Enable Audit Logs** to monitor system activity
