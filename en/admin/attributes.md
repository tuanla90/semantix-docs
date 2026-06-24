# Attributes (User Attributes)

**Navigation:** Admin → Access → Attributes

Attributes are custom properties attached to individual users — used primarily to implement **Row-Level Security (RLS)** based on personal characteristics. Instead of creating a separate role for each branch or department, you create one shared role and use Attributes to define each user's data scope.

---

## Why Attributes?

**The problem with Role-only RLS:**

Suppose you have 50 branches, each needing to see only their own data. Using Roles:
- You'd need to create 50 Roles (role_NYC, role_LA, role_CHI...)
- Assign each user to the correct role
- Every new branch requires a new role and config update

**Solution with Attributes:**
- Create 1 Role "Branch Employee"
- Create 1 Attribute `branch` (text)
- Assign `branch = "NYC"` to New York employees, `"LA"` to Los Angeles employees...
- The Context automatically filters: `WHERE branch = {{user.branch}}`

---

## Creating a New Attribute Key

1. Go to **Admin → Access → Attributes → New Attribute**
2. Fill in the fields:

| Field | Description | Example |
|-------|-------------|---------|
| **Name** | Technical name — used in RLS configuration | `branch`, `department`, `level` |
| **Label** | Friendly display name in the UI | Branch, Department, Level |
| **Description** | Explains the purpose of this attribute | "Employee's working branch" |
| **Data Type** | Data type | `text`, `number`, `boolean`, `date` |
| **Allowed Values** | List of valid values (optional) | NYC, LA, CHI, HOU... |
| **Required** | Must have a value | Off (default) |

3. Click **Save**

---

## Common Attribute Examples

| Attribute Name | Data Type | Description | Example Values |
|---------------|-----------|-------------|---------------|
| `branch` | text | Working branch | NYC, LA, CHI, HOU |
| `department` | text | Department | sales, marketing, hr, finance |
| `level` | text | Employee level | staff, manager, director, c_level |
| `region` | text | Geographic region | north, central, south, west |
| `customer_id` | number | Customer ID (for B2B SaaS) | 12345, 67890 |
| `max_revenue_view` | number | Revenue visibility limit | 1000000 |

---

## Assigning Attributes to Users

### Manual Assignment (Individual User)

1. **Admin → Access → Users → Select user**
2. Tab **Attributes**
3. Click **Add Attribute**
4. Select an Attribute Key → Enter a Value
5. Click **Save**

### Bulk Assignment via CSV Import

When many users need attributes assigned:

1. Export the user list from Admin → Users
2. Add a column with the attribute name to the CSV
3. Re-import via **Admin → Users → Import**

### Automatic Assignment via SSO (SAML/OIDC)

If using SSO, you can map IdP claims to Attributes:

**Okta:** In the SAML configuration → Attribute Statements:
```
Attribute Name: branch
Attribute Value: user.department
```

When users log in via Okta, the `department` value from Okta automatically becomes `branch` in Semantix.

---

## Using Attributes in Row-Level Security

After creating Attributes and assigning them to users, configure RLS in the Context:

**Navigation:** Studio → DABI → Data Models → Select model → Tab Access Control

**RLS filter syntax:**
```
{table_name}.column_name = {{user.attribute_name}}
```

**Real-world examples:**

| Use Case | RLS Filter |
|----------|-----------|
| Employees see only their branch's orders | `orders.branch = {{user.branch}}` |
| HR staff see only their department's data | `employees.department = {{user.department}}` |
| SaaS customers see only their own data | `data.customer_id = {{user.customer_id}}` |
| Managers see all, staff see partial | Use Role combination: if Role = manager → no filter |

**Combining multiple conditions:**
```
{orders}.branch = {{user.branch}} AND {orders}.status != 'deleted'
```

---

## Special Values

| Value | Meaning |
|-------|---------|
| `*` (asterisk) | Bypass filter — user sees all data |
| (empty) | No attribute → filter returns no data |
| Multiple values separated by `,` | IN filter: `branch IN ('NYC','LA')` |

**Using `*` for Managers:**
- Staff: `branch = "NYC"` → only sees New York data
- Manager: `branch = "*"` → sees all data

---

## Verifying RLS Is Working

1. Log in as a regular user account (not Admin)
2. Go to AI Chat → ask a question about data
3. Click **View SQL** in the result
4. Check that the SQL contains filter conditions based on the attribute

See full implementation details: [Row-Level Security](../contexts/rls.md)
