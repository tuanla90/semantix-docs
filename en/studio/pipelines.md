# Data Pipelines

**Navigate to:** Studio → DE → Data Pipelines

Data Pipelines automate data synchronization from a source to a destination on a schedule or via manual trigger. Use pipelines to move data between databases, to Google Sheets, or using structured templates.

## Key Concepts

| Concept | Meaning |
|---------|---------|
| **Source** | Data origin — a Connection or Data Template |
| **Destination** | Data target — a Connection, Google Sheet, etc. |
| **Schedule** | Cron expression for automatic execution |
| **Sync** | Manual run triggered immediately |

## Create a New Pipeline

1. Go to **Studio → DE → Data Pipelines → New Pipeline**
2. Set a **Name** and **Description**
3. Configure the **Source**:
   - **Database Query**: Connect directly from a Connection, select a table or write SQL
   - **Google Sheets Source**: Pull data from a Google Sheet
   - **Data Template**: Use an existing Data Template with preset parameters
4. Configure the **Destination**:
   - A write-enabled database Connection
   - A Google Sheets destination
5. Set a **Schedule** (cron expression) for automatic runs
6. Click **Save**

## Running a Pipeline

- **Sync now**: Click the **Run Sync** button on the pipeline card or inside the detail page
- **Automated schedule**: The system runs automatically per the configured cron expression
- After each sync, the system shows records synced and status

## Pipeline Access Levels

| Level | Access |
|-------|--------|
| **Owner** | Full edit and delete rights |
| **Approver** | Review and approve changes |
| **Editor** | Edit configuration |
| **Viewer** | View only |

## Notes

- Pipelines support **Change Requests** — changes require approval before taking effect (if enabled).
- Version history is recorded automatically.
- The destination Connection must support **write mode**.
