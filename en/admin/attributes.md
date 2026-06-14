# Attributes

**Navigate to:** Admin → Access → Attributes

Attributes are custom properties attached to users or resources — primarily used for **Attribute-Based Row-Level Security (RLS)**. For example, each employee has an attribute `branch = "NYC"` and data is automatically filtered by their branch.

## Purpose

- Control the data scope users can see based on personal attributes
- Group resources by attribute (department, region, rank...)
- More flexible than pure Role-based access control

## Create a New Attribute Key

1. Go to **Admin → Access → Attributes → New Attribute**
2. Fill in:

| Field | Description |
|-------|-------------|
| **Name** | Technical name (e.g., `branch`, `department`) |
| **Description** | Meaning description |
| **Data Type** | `text`, `number`, `boolean`, `date` |
| **Icon** | Identifying icon |
| **Values** | List of valid values (optional) |

3. Click **Save**

## Assigning Attributes to Users

After creating Attribute Keys, assign specific values to individual users at **Admin → Users → select User → Attributes**.

## Using Attributes in Row-Level Security

In Context or Model configuration, declare filter conditions based on user attributes. Example:

```
{table}.branch = {{user.branch}}
```

When a user with `branch = "NYC"` queries data, the system automatically adds `WHERE branch = 'NYC'`.

See also: [Row-Level Security](../contexts/rls.md)
