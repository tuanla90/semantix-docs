# Building a Data Model

## Step 1 — Create a Context

1. Go to **Admin → Contexts → New Context**
2. Give it a name (e.g. "Sales Analytics")
3. Select the **Connection** to use
4. Click **Save**

## Step 2 — Add Tables

1. Open the context → **Scope tab**
2. Click **Add Table**
3. Select tables from your database schema
4. Assign a friendly **Display Name** if needed
5. Choose which **Columns** to include (you can hide sensitive columns)

## Step 3 — Define Relationships

If your data spans multiple tables, define how they join:

1. In the **Scope tab** → **Relationships**
2. Click **Add Relationship**
3. Select the **From Table**, **From Column**, **To Table**, and **To Column**
4. Choose the join type (**LEFT JOIN** recommended for most cases)

## Step 4 — Add Calculated Columns

Calculated columns let you define business logic once:

1. Go to the **Model tab** → **Calculated Columns**
2. Click **Add**
3. Enter a name and SQL expression, e.g.:
   ```sql
   price * quantity
   ```
4. Set the data type (Number, Text, Date)

## Step 5 — Define Metrics

Metrics are aggregated measures the AI can use directly:

| Example Metric | Expression |
|---------------|------------|
| Total Revenue | `SUM(orders.price * orders.quantity)` |
| Avg Order Value | `AVG(orders.total)` |
| Unique Customers | `COUNT(DISTINCT orders.customer_id)` |

## Step 6 — Configure an Assistant

Assign an AI Assistant to the context so users can start chatting:

1. Go to the **Overview tab** → **Assistant**
2. Select an existing assistant or create one

## Step 7 — Test It

Use the **Query Preview** panel on the context page to test natural language questions before sharing with your team.
