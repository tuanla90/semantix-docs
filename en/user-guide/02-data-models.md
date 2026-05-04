# 2. Creating a Data Model

A Model acts as a mapping layer that translates physical database tables or sheets into business concepts that the AI can understand.

**Navigation:** Admin → Models → **New Model**

## Step 1 — Select Connection & Table

1. Choose the **Connection** you created in the previous step.
2. The system will display a list of available tables or sheets.
3. Select the table you want to use → click **Import**.

## Step 2 — Name & Describe the Model

- **Name**: A short, technical name used by the system. Use English or lowercase alphanumeric characters without spaces (e.g., `orders`, `sales_order`).
- **Label**: A friendly display name (e.g., `Sales Orders`).
- **Description**: Describe the purpose of this model. The AI will read this description to understand the context of the data.

## Step 3 — Configure Columns (Physical Columns)

For each column in your table, you need to configure:

| Property | Meaning |
|----------|---------|
| **Label** | The display name for users. |
| **Data Type** | The system format: `string`, `number`, `date`, `boolean`. |
| **Description** | Explain the meaning of the column (crucial for the AI to accurately match user questions). |

## Step 4 — Declare the Primary Key

Mark the appropriate column as the **Primary Key**. The system uses this to uniquely identify records, especially when JOINing with other tables.

## Step 5 — Save the Model

Click **Save** to complete the model creation.
