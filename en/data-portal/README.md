# Data Portal

**Navigate to:** Data Portal (top navigation bar)

The Data Portal allows end users to browse and export data using pre-built report templates (Data Templates) prepared by Admins — no SQL knowledge or database understanding required.

## Use Cases

The Data Portal is ideal when:
- Business users need periodic report exports without knowing SQL
- Downloading Excel/CSV files filtered by date, branch, product, etc.
- Exporting formatted Excel/Word reports (payroll, invoices, monthly reports)

## How to Use

### Step 1 — Select a Template

1. Open **Data Portal** from the top navigation.
2. Browse the list of report templates created by your Admin.
3. Use the **Search** box to find by name or description.
4. Click on a template card to open it.

### Step 2 — Fill in Filter Parameters

Each template may have different filter parameters:

| Parameter Type | Example |
|----------------|---------|
| **Text** | Customer name, order code |
| **Number** | Minimum value, ID |
| **Date** | Specific date |
| **Date Range** | From date... to date... |
| **Single Select** | Choose a branch, choose a status |
| **Multi Select** | Choose multiple products, regions |

Fields marked with `*` are required.

### Step 3 — Export Data

Depending on the template configuration, you can export in one or more formats:

| Button | Format |
|--------|--------|
| **Download CSV** | Raw CSV file — suitable for importing into Excel or Google Sheets |
| **Download Excel** | Formatted Excel file using a pre-defined template (preserves colors, fonts, layout) |
| **Download PDF** | Convert template to PDF (if configured) |

> Large templates process asynchronously — the system notifies you when the file is ready and downloads automatically.

## For Admins — Creating Data Templates

To create new templates for the Data Portal, see [Studio → Data Templates](../studio/data-templates.md).
