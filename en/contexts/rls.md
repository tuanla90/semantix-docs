# Row-Level Security (RLS)

Row-Level Security automatically restricts which data each user can see — based on their role or personal attributes — without changing any code in your application.

---

## How It Works

When a user asks a question, Semantix:

1. Identifies who the user is (email, role, attributes)
2. Finds the RLS policy that applies to that user
3. **Automatically appends** a WHERE condition to the generated SQL
4. The user sees only filtered results

```sql
-- Question: "Revenue by product"
-- User: belongs to branch NYC

-- Actual SQL executed (WHERE automatically added):
SELECT product_name, SUM(revenue) as total
FROM orders
WHERE branch = 'NYC'        -- ← Automatically added by RLS
GROUP BY product_name
ORDER BY total DESC
```

Users **cannot see** this condition and **cannot bypass** it — the filter is applied at the server layer, before any data reaches the browser.

---

## Two Types of RLS

### 1. Role-Based RLS

All users in the same Role see the same fixed dataset.

**Best for:** Simple setups — few groups, clear partitions.

**Example:** Role "Sales North" only sees data where `region = 'North'`

### 2. Attribute-Based RLS

Each user has their own attribute, and filters automatically use the current user's attribute value.

**Best for:** Many small groups, or where each user has a unique scope.

**Example:** Employee A has `branch = 'NYC'`, Employee B has `branch = 'LA'` — same role but they see different data.

---

## Setting Up RLS — Attribute-Based

### Step 1: Create an Attribute

1. **Admin → Access → Attributes → New Attribute**
2. Example: Attribute `branch` (text)

See details: [Attributes](../admin/attributes.md)

### Step 2: Assign a Value to the User

1. **Admin → Access → Users → Select user → Tab Attributes**
2. Assign: `branch = "NYC"` for New York employees

### Step 3: Configure RLS in the Data Model

1. Studio → DABI → Data Models → Select model
2. Tab **Access Control**
3. Click **Add Rule**
4. Enter the condition:

```
{orders}.branch = {{user.branch}}
```

Syntax:
- `{table_name}.column` = column in the table
- `{{user.attribute_name}}` = value of the currently logged-in user's attribute

### Step 4: Verify

Log in as a regular user (not Admin) → go to AI Chat → ask a question → check that View SQL contains the filter condition.

---

## Setting Up RLS — Role-Based

### Step 1: Create a Role

1. **Admin → Access → Users & Roles → Roles → New Role**
2. Name it: "Sales North Team"
3. Assign users to this role

### Step 2: Configure RLS in the Data Model

1. Tab **Access Control → Add Rule**
2. Select **Role**: "Sales North Team"
3. Enter a fixed condition:

```
{orders}.region = 'North'
```

---

## Supported Operators

| Operator | Example | Meaning |
|----------|---------|---------|
| `=` | `branch = {{user.branch}}` | Exact match |
| `!=` | `status != 'deleted'` | Not equal |
| `IN` | `region IN ('North','Central')` | Belongs to one of several values |
| `NOT IN` | `tier NOT IN ('trial')` | Not in list |
| `>`, `>=`, `<`, `<=` | `revenue >= {{user.min_revenue}}` | Numeric comparison |
| `LIKE` | `customer_name LIKE {{user.customer_prefix}}` | Pattern match |
| `IS NULL` | `deleted_at IS NULL` | Not deleted (soft delete) |
| `IS NOT NULL` | `activated_at IS NOT NULL` | Has been activated |
| `BETWEEN` | `created_at BETWEEN {{user.start_date}} AND {{user.end_date}}` | Within a range |

---

## Combining Multiple Conditions

```sql
-- AND: User must satisfy both conditions
{orders}.branch = {{user.branch}} AND {orders}.status != 'draft'

-- Multiple rules are combined with AND by default
```

If OR logic is needed, use a single rule with a more complex condition, or contact support.

---

## Special Values

| Attribute Value | Behavior |
|----------------|---------|
| `*` (asterisk) | Bypass filter — user sees all data |
| `(empty)` | Filter returns no results |
| `NYC,LA` (multiple comma-separated values) | Automatically converted to `IN ('NYC','LA')` |

**Using `*` for Managers:**
- Staff: `branch = "NYC"` → sees only NYC data
- Manager: `branch = "*"` → sees all data
- Director: no `branch` attribute + Admin bypass → sees everything

---

## Special Cases

### Admin Bypass

Accounts with the `admin:all` role are NOT affected by RLS — they always see all data. This allows Admins to inspect configuration without being filtered.

### Multiple RLS Rules

When multiple rules apply to the same user (a Role rule + an Attribute rule), all are combined with AND:

```sql
WHERE branch = 'NYC'           -- from Attribute rule
  AND status != 'deleted'      -- from Role rule
  AND deleted_at IS NULL       -- from a third rule
```

### RLS in Embedded Dashboards

For Dashboards embedded via API, `lockedFilters` in the embed token works similarly to RLS:

```json
{
  "lockedFilters": {
    "customer_id": "12345"
  }
}
```

→ Adds `WHERE customer_id = '12345'` to every query in the embedded dashboard.

---

## Debugging RLS

### Verify Which Rule Is Applied

1. Go to AI Chat as a regular user (not Admin)
2. Ask a simple question: "Show me 5 orders"
3. Click **View SQL** in the result
4. Confirm the SQL contains a WHERE condition from the RLS rules

### User Sees No Data

If a user sees no data at all:
1. Check that the user's attribute has a value: Admin → Users → User → Attributes
2. Check that the attribute value matches the actual values in the database (case-sensitive)
3. Check that the RLS rule syntax is correct

### RLS Not Working

If a user sees unfiltered data:
1. Check whether the user has the Admin role — Admin bypasses all RLS
2. Verify the RLS rule is declared on the correct Model
3. Check that the Context being used has Access Control enabled
