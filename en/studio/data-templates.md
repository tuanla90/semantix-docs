# Data Templates

**Navigate to:** Studio → DE → Data Templates

Data Templates are reusable report definitions combining a SQL query with dynamic filter parameters and optionally a formatted Excel/Word file. End users access these templates through the [Data Portal](../data-portal/README.md).

## Purpose

- Define reports once; end users run them repeatedly
- Users only fill in parameters (dates, branches...) without knowing SQL
- Export to CSV, Excel (with pre-formatted template), and PDF

## Create a New Data Template

1. Go to **Studio → DE → Data Templates → New Template**
2. Fill in the basic information:

| Field | Description |
|-------|-------------|
| **Name** | Template name shown in the Data Portal |
| **Description** | Report purpose description |
| **Connection** | Data source Connection |
| **Export Type** | `csv`, `excel`, or `both` |
| **Template File** | Optional Excel/Word template file (preserves formatting) |

3. Write the **SQL Query** — use parameters like `{{param_name}}` in the query
4. Define **Parameters**:

| Parameter Field | Meaning |
|-----------------|---------|
| **ID** | Technical name — must match `{{id}}` in SQL |
| **Label** | User-friendly display label |
| **Data Type** | `text`, `number`, `date`, `date_range`, `select` |
| **Operator** | `equals`, `contains`, `between` (date range), `in` (multi-select) |
| **Required** | Whether the field must be filled |
| **Default Value** | Pre-filled default |
| **Static Options** | Fixed option list (for `select` type) |
| **Dynamic Options SQL** | SQL to fetch options dynamically from the database |

5. Configure the **Parameter Layout** (drag to arrange field positions)
6. Click **Save**

## Using Templates in Pipelines

Data Templates can also be used as a **Source** in a Data Pipeline. See [Data Pipelines](pipelines.md).

## Notes

- Excel/Word template files must use `{{column_name}}` placeholders or a standard table structure.
- PDF export requires a template file and server-side conversion support.
- Permissions: `create_data_template`, `edit_data_template`, `delete_data_template`.
