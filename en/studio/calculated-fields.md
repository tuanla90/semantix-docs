# Calculated Fields

**Navigate to:** Studio → DABI → Data Models → select Model → Calculated Fields tab

A Calculated Field is a virtual column created from a SQL expression — it doesn't exist in the original database but AI and users can use it like any regular column.

## Create a Calculated Field

1. In the Model editor, switch to the **Calculated Fields** tab
2. Click **Add Calculated Field**
3. Fill in:

| Field | Description |
|-------|-------------|
| **Name** | Technical name (e.g., `profit_margin`) |
| **Label** | Display name (e.g., `Profit Margin`) |
| **Expression** | SQL expression to compute the value |
| **Return Type** | Result data type: Number, String, Boolean, Date |
| **Description** | Explains to AI when and how to use this field |

## Common Examples

```sql
-- Gross profit margin
(revenue - cost) / revenue * 100

-- Revenue segment classification
CASE
  WHEN revenue >= 100000 THEN 'Large'
  WHEN revenue >= 10000  THEN 'Medium'
  ELSE 'Small'
END

-- Day of week from a date column
CASE DAYOFWEEK(order_date)
  WHEN 1 THEN 'Sunday'
  WHEN 2 THEN 'Monday'
  WHEN 3 THEN 'Tuesday'
  WHEN 4 THEN 'Wednesday'
  WHEN 5 THEN 'Thursday'
  WHEN 6 THEN 'Friday'
  WHEN 7 THEN 'Saturday'
END

-- Age from birth date
DATEDIFF(CURRENT_DATE, birth_date) / 365
```

## Notes

- Expressions must be valid SQL for the database dialect in use.
- Calculated fields cannot reference other calculated fields (no nesting).
- If an expression is invalid, AI queries will fail — test carefully before saving.
