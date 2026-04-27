# Row-Level Security (RLS)

Row-Level Security (RLS) lets you restrict which rows a user can see based on their role — without changing your database permissions.

## How It Works

1. You define **Access Policies** per role on a context
2. Each policy contains **row filters** (e.g. `region = 'Asia'`)
3. When a user queries data, Semantix automatically appends the filters to the generated SQL

The user never sees the filters — they just see the data they're allowed to see.

## Setting Up RLS

### Step 1 — Create a Role

1. Go to **Admin → Users & Roles → Roles → New Role**
2. Name it (e.g. "Asia Sales Team")
3. Assign users to this role

### Step 2 — Create an Access Policy

1. Open the context → **Access tab**
2. Click **Add Policy**
3. Select the **Role**
4. Add row filters:

| Column | Operator | Value |
|--------|----------|-------|
| `region` | `=` | `Asia` |
| `status` | `IN` | `active, pending` |

5. Click **Save**

## Supported Operators

| Operator | Example |
|----------|---------|
| `=` | `region = 'Asia'` |
| `!=` | `status != 'deleted'` |
| `IN` | `country IN ('VN', 'TH', 'SG')` |
| `NOT IN` | `tier NOT IN ('free')` |
| `>`, `>=`, `<`, `<=` | `revenue >= 1000` |
| `LIKE` | `name LIKE 'A%'` |
| `IS NULL` | `deleted_at IS NULL` |
| `BETWEEN` | `created_at BETWEEN date1 AND date2` |

## Example

A user in the **"Asia Sales Team"** role queries:

> *"Show me total revenue by product"*

Semantix generates:

```sql
SELECT product, SUM(revenue) as total_revenue
FROM orders
WHERE region = 'Asia'   -- ← automatically injected from RLS policy
GROUP BY product
```

The user sees only their region's data without knowing the filter exists.

> ⚠️ RLS filters are applied server-side and cannot be bypassed by users.
