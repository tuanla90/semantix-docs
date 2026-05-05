# Users & Roles

![Admin Interface](../../assets/admin_walkthrough.webp)
## Users

Manage team members under **Admin → Users**.

### Inviting a User

1. Go to **Admin → Users → Invite User**
2. Enter their email address
3. Assign one or more roles
4. Click **Send Invite**

The user receives an email with a link to set their password.

### User Status

| Status | Description |
|--------|-------------|
| **Active** | Can log in and use Semantix |
| **Inactive** | Account disabled — cannot log in |

---

## Roles

Roles control what users can see and do in Semantix.

### Default Roles

| Role | Description |
|------|-------------|
| **Admin** | Full access to everything |
| **User** | Can view dashboards and use AI chat |

### Creating Custom Roles

1. Go to **Admin → Roles → New Role**
2. Give it a name (e.g. "Data Analyst", "Asia Sales Team")
3. Select permissions
4. Click **Save**
5. Assign users to this role from the **Users** page

### Permissions

| Permission | Description |
|------------|-------------|
| `view:dashboards` | View shared dashboards |
| `edit:dashboards` | Create and edit dashboards |
| `use:chat` | Use AI chat |
| `manage:connections` | Create/edit database connections |
| `manage:contexts` | Create/edit data contexts |
| `manage:users` | Invite and manage users |
| `admin:all` | Full admin access |

---

## Row-Level Security by Role

Roles can also have **data access policies** attached to them at the context level. See [Row-Level Security](../contexts/rls.md).
