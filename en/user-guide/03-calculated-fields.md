# 3. Defining Calculated Fields

A Calculated Field is a new column derived from existing data using mathematical or logical formulas. It does not exist in your original raw data source.

**Navigation:** Admin → Models → select a Model → **Columns** tab → **Add Calculated Column**

## Common Practical Examples

```sql
-- Gross Profit Margin
(revenue - cost) / revenue * 100

-- Revenue Tiering
CASE
  WHEN revenue >= 100000000 THEN 'Large'
  WHEN revenue >= 10000000  THEN 'Medium'
  ELSE 'Small'
END

-- Day of the Week Extraction
CASE DAYOFWEEK(order_date)
  WHEN 1 THEN 'Sunday'
  WHEN 2 THEN 'Monday'
  WHEN 3 THEN 'Tuesday'
  WHEN 4 THEN 'Wednesday'
  WHEN 5 THEN 'Thursday'
  WHEN 6 THEN 'Friday'
  WHEN 7 THEN 'Saturday'
END
```

## Configuring a Calculated Field

| Property | Description |
|----------|-------------|
| **Name** | The technical name of the field (e.g., `profit_margin`). |
| **Label** | The friendly display name shown to users. |
| **Expression** | The underlying SQL expression or formula used to calculate the value. |
| **Return Type** | The resulting data type (e.g., Number, String). |
| **Description** | Explain what this field represents so the AI knows when to apply it. |
