# Data Models

**Navigate to:** Studio → DABI → Data Models

A Data Model maps physical database tables or views to business concepts that AI can understand. Each Model corresponds to one table or view in your data source.

## Create a New Model

1. Go to **Studio → DABI → Data Models → New Model**
2. Select a **Connection** and **Table** (or sheet)
3. Click **Import** to load columns

### Basic Information

| Field | Description |
|-------|-------------|
| **Name** | Technical name, no spaces (e.g., `sales_orders`) |
| **Label** | User-friendly display name (e.g., `Sales Orders`) |
| **Description** | AI reads this to understand the table's purpose |

### Columns Tab

For each column, declare:

| Field | Meaning |
|-------|---------|
| **Label** | User-friendly display name |
| **Data Type** | `TEXT`, `INTEGER`, `DOUBLE`, `BOOLEAN`, `DATE`, `DATETIME` |
| **Description** | Column meaning — critical for AI to match user questions correctly |
| **Primary Key** | Mark the column as the primary key |
| **Searchable** | Allow AI to filter by this column |

### Calculated Fields

See the full guide at [Calculated Fields](calculated-fields.md).

### Metrics

See the full guide at [Metrics](metrics.md).

### Relations

See the full guide at [Relations](relations.md).

## Tabs in the Model Editor

| Tab | Content |
|-----|---------|
| **Overview** | Basic info, connection, source table |
| **Tables** | Physical tables linked to this model |
| **Columns** | Column list with labels, types, descriptions |
| **Calculated Fields** | Virtual columns from SQL expressions |
| **Metrics** | KPI definitions and aggregations |
| **Relations** | JOIN declarations to other models |
| **Contexts** | Contexts currently using this model |
| **Access Control** | User/role permissions |
| **Versions** | Change history |
| **Change Requests** | Pending change requests |

## Key Tip

> Invest time writing detailed **Descriptions** for every column and metric. AI uses these descriptions to match user questions — the more detailed, the more accurate the answers.
