# Dashboards — Full Feature Guide

**Navigation:** Dashboards (top menu)

A Dashboard is a space that combines charts, KPI numbers, and data tables into a single consistent screen for daily monitoring. Instead of asking AI every time you need a number, you save important analyses to a Dashboard and open it to see the latest data instantly.

---

## Overview: What Users Can Do

| Feature Group | Actions |
|---------------|---------|
| **Create & Manage** | Create new, rename, describe, duplicate, delete dashboards |
| **Add Content** | Pin from AI Chat, add widgets manually, import from analysis results |
| **Edit Widgets** | Change chart type, configure axes, colors, titles, SQL |
| **Layout** | Drag-and-drop, resize, organize into groups |
| **Interact While Viewing** | Hover tooltips, zoom, drill-down, view SQL, download widget data |
| **Filter Data** | Global filters applied across the dashboard, per-widget filters |
| **Refresh Data** | Manual refresh, auto-refresh on a schedule, clear cache |
| **Share** | Public link, share with specific users, embed via iframe in external apps |
| **Export** | Export PDF, download widget data (CSV/Excel), Scheduled Reports via email |
| **Settings** | Auto-refresh, cache TTL, permissions, fullscreen mode |

---

## 1. Creating a New Dashboard

### Step 1 — Open the Dashboards Page

Click **Dashboards** in the main navigation (top menu). The page lists all dashboards you own or that have been shared with you.

### Step 2 — Create New

Click the **New Dashboard** button (top right). A dialog asks for:

| Field | Required | Example | Description |
|-------|----------|---------|-------------|
| **Name** | Yes | `June Business KPIs` | Name shown in the list. Keep it short and clear. |
| **Description** | No | `Track revenue, orders, and new customers — updated daily` | Explain the purpose, audience, and update frequency. |

Click **Create** → an empty Dashboard is created and displayed immediately.

### Naming Conventions

| Pattern | Example |
|---------|---------|
| `[Department] + [Topic] + [Frequency]` | `Sales — Daily Revenue` |
| `[Purpose] + [Time]` | `Q2 / 2024 KPIs` |
| `[Person / Team Name]` | `Executive Dashboard` |

---

## 2. Adding Widgets to a Dashboard

There are **3 ways** to add content to a Dashboard:

### Method 1 — Pin from AI Chat *(Fastest)*

The most common way to build a Dashboard quickly:

1. Open **AI Chat** → ask any question.
2. After receiving the result (table or chart), click the **📌 Pin** icon at the top right of the result panel.
3. A dialog appears:
   - **Select Dashboard** from the list (or create a new Dashboard right here).
   - **Set a widget title** (defaults to your question — you can edit it).
4. Click **Pin** → the widget appears on the selected Dashboard immediately.

> **Tip:** Pin multiple results back-to-back, then arrange the layout in one pass — faster than configuring each widget manually.

### Method 2 — Add Widget Manually from the Dashboard Editor

Best when you want precise control over SQL and configuration:

1. Open a Dashboard → click **Edit** (pencil icon ✏️ or the Edit button in the top right).
2. The Dashboard enters **Edit Mode** — a toolbar and **Add Widget** button (or `+` icon) appear.
3. Click **Add Widget** → the Widget Builder opens.
4. Configure the widget (see Section 3 below).
5. Click **Save Widget** → the widget appears on the Dashboard.
6. Click **Save Dashboard** when finished.

### Method 3 — Add Text / Headers (Dividers)

Add section labels, descriptions, or dividing lines between widget groups:

1. In Edit Mode, click **Add Widget** → select **Text** or **Divider**.
2. Enter text content (Markdown supported: **bold**, *italic*, `## headings`).
3. Save.

Use this to structure Dashboards with many sections:
```
## 📊 Business Overview          ← Text widget
[Scorecard 1] [Scorecard 2] [Scorecard 3]

## 📦 Order Analysis             ← Text widget
[Line Chart] [Bar Chart]

## 👥 Customers                  ← Text widget
[Table widget]
```

---

## 3. Widget Configuration

Each widget is configured through the **Widget Builder** — 3 main tabs:

### Tab 1 — Query (Data)

Defines what data the widget shows:

**Option A — Ask in natural language:**
1. Select an **AI Assistant** (defines the data source and context).
2. Type a question into the **"Ask AI..."** field, e.g. `Revenue by region this month`.
3. Click **Run** → AI generates SQL and shows a data preview.
4. If it looks right → move to the Visualization tab.

**Option B — Write SQL manually** *(for technical users)*:
1. Click the **SQL Editor** tab.
2. Write SQL directly:
   ```sql
   SELECT region, SUM(revenue) as total_revenue
   FROM orders
   WHERE status = 'paid'
     AND MONTH(order_date) = MONTH(CURRENT_DATE)
   GROUP BY region
   ORDER BY total_revenue DESC
   ```
3. Click **Run** to preview results.

**Advanced query settings:**

| Setting | Description | Example |
|---------|-------------|---------|
| **Cache TTL** | Cache duration for this widget (overrides Connection TTL) | `0` = real-time, `3600` = 1-hour cache |
| **Refresh Interval** | Widget auto-refreshes after X seconds (independent of Dashboard auto-refresh) | `300` = every 5 minutes |

### Tab 2 — Visualization (Display)

Controls how data is visualized:

**Basic settings (most chart types):**

| Setting | Description | Example |
|---------|-------------|---------|
| **Chart Type** | Chart type | Bar, Line, Pie, Scorecard, Table… |
| **Title** | Heading shown on the widget | `Revenue by Region — June` |
| **X Axis** | Column for the horizontal axis (categories) | `region` |
| **Y Axis** | Column/metric for the vertical axis (values) | `total_revenue` |
| **Color By** | Column to color-code different data groups | `channel` (online vs offline) |
| **Sort** | Sort order | `Y Axis Descending` (highest value first) |
| **Limit** | Max number of rows/groups displayed | `10` (top 10 regions only) |
| **Show Legend** | Show color-coded legend | On/Off |
| **Show Data Labels** | Show numbers directly on the chart | On/Off |

**Axis settings:**

| Setting | Description |
|---------|-------------|
| **Y Axis Min/Max** | Set vertical axis limits (e.g. 0–100 for percentages) |
| **Y Axis Label** | Label shown alongside the axis (e.g. "Million USD") |
| **X Axis Label Rotation** | Rotate horizontal axis labels when names are long (45°, 90°) |
| **Dual Y Axis** | Enable a second Y axis on the right (e.g. revenue + growth rate) |

**Color settings:**

| Setting | Description |
|---------|-------------|
| **Color Palette** | Choose a color scheme: Default, Pastel, Dark, Monochrome |
| **Custom Colors** | Assign fixed colors to specific groups/categories |
| **Conditional Colors** | Color cells based on conditions (see Conditional Formatting section) |

### Tab 3 — Settings

| Setting | Description |
|---------|-------------|
| **Description** | Small description shown below the widget title |
| **Show Border** | Show/hide widget border |
| **Background Color** | Widget background color |
| **Header Style** | Style of the title bar |

---

## 4. Widget Types — Quick Reference

Full documentation for each chart type: [Charts & Widget Configuration](charts.md)

**Quick summary:**

| Type | Best For | Real-World Example |
|------|----------|--------------------|
| **Scorecard** | Single KPI + period comparison | This Month Revenue: 1.2B ▲ 15% |
| **Bar Chart** | Comparing values across categories | Revenue by branch |
| **Line Chart** | Trends over time | Daily revenue this month |
| **Area Chart** | Cumulative trends or multiple series | Cumulative revenue 2024 vs 2023 |
| **Pie / Donut** | Percentage share of components | Market share by sales channel |
| **Table** | Detailed multi-column list | Top 20 customers by revenue |
| **Scatter** | Correlation between 2 variables | Orders vs Revenue by product |
| **Treemap** | 2-level hierarchical proportions | Revenue: Category → Product |
| **Funnel** | Step-by-step conversion rates | View → Cart → Checkout |
| **Radar** | Multi-dimensional comparison | 5-criteria performance score by branch |
| **Text / Markdown** | Section headers, notes, instructions | `## Week 25 Report` |

---

## 5. Dashboard Layout

### Drag and Drop

In **Edit Mode**:

1. **Move a widget**: Place the cursor on the widget title bar → hold left mouse → drag to new position → release.
2. Widgets automatically **snap to the grid** — no overlapping or misalignment.
3. Surrounding widgets adjust positions automatically.

### Resize

In **Edit Mode**:

1. Place the cursor on the **bottom-right corner** of a widget → cursor changes to a resize arrow.
2. Hold and drag to resize.
3. Widgets only resize in grid multiples — keeping the layout clean.

**Common sizes:**
- **Scorecard**: 1/4 width, 1 row tall (4 side-by-side in one row)
- **Bar/Line Chart**: 1/2 or 2/3 width, 2–3 rows tall
- **Table**: Full width, 3–4 rows tall
- **Pie Chart**: 1/3 width, 2 rows tall

### Recommended Layout

```
┌─────────────┬─────────────┬─────────────┬─────────────┐
│  Scorecard  │  Scorecard  │  Scorecard  │  Scorecard  │  ← Row 1: Top-line KPIs
│  Revenue    │  Orders     │  New Users  │  Cancel %   │
└─────────────┴─────────────┴─────────────┴─────────────┘
┌───────────────────────────┬─────────────────────────────┐
│  Line Chart               │  Bar Chart                  │  ← Row 2: Trends
│  Daily Revenue            │  Top 10 Products            │
└───────────────────────────┴─────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│  Table — Full Width                                     │  ← Row 3: Detail
│  Orders pending action                                  │
└─────────────────────────────────────────────────────────┘
```

---

## 6. Interacting While Viewing

These actions work even when **not in Edit Mode** — available to all users with view access.

### Hover Tooltips

Hover over any data point on a chart → a **tooltip** appears showing:
- The exact value at that point
- Category label (e.g. product name, region)
- All series at the same point (if the chart has multiple series)

### Zoom

For Line, Area, and Bar charts:
- **Click and drag** on the chart area to zoom into a specific time range.
- **Double-click** to reset to original scale.
- **Scroll** to zoom in/out along the X axis.

### Show/Hide Series

If the chart has multiple series (multiple colored lines/bars):
- **Click a series name in the Legend** → hide that series.
- **Click again** → show it again.
- Useful for focusing on one channel without creating a new chart.

### View Widget SQL

Click the **⋮** (three dots) at the widget's top right → select **View SQL**:
- Shows the SQL currently running to generate this widget's data.
- Useful for verifying logic or debugging unexpected numbers.
- Copy the SQL to run manually in a database tool.

### Download Widget Data

Click **⋮** → **Download**:

| Format | Contents |
|--------|---------|
| **CSV** | Raw data, all rows in the query |
| **Excel (.xlsx)** | Excel file with basic formatting |
| **PNG** | Screenshot of the current chart (including zoom state) |
| **SVG** | Vector image — high quality when scaled up |

### Refresh Widget Data

Click **⋮** → **Refresh Data** to:
- Clear this widget's cache.
- Re-run the query and fetch the latest data from the database.
- Only affects this widget, not others.

### Expand to Full Screen

Click **⋮** → **Expand** (or the expand icon):
- Widget fills the entire screen.
- Useful for reading long tables or complex charts in detail.
- Press **Esc** or **✕** to collapse.

---

## 7. Global Filters

Global Filters apply **simultaneously to all widgets** on the Dashboard. When a user selects a filter value, every chart updates automatically — no need to edit individual widgets.

### Adding a Global Filter

In **Edit Mode**:

1. Click **Add Filter** (in the Dashboard's top bar).
2. The filter configuration dialog opens:

| Field | Required | Description |
|-------|----------|-------------|
| **Label** | Yes | Display name of the filter (e.g. "Month", "Branch") |
| **Column** | Yes | Database column used for filtering |
| **Type** | Yes | Filter type (see table below) |
| **Default Value** | No | Default value when the Dashboard opens |
| **Required** | No | Must be selected before data loads |

**Filter Types:**

| Type | UI | Best For |
|------|----|---------|
| **Date Range Picker** | Select from-to date range | Time-based filtering |
| **Date Picker** | Select a single date | Viewing one day's data |
| **Relative Date** | "Last 7 days", "This month", "This quarter"… | Flexible time filtering |
| **Dropdown (single)** | Select one value from a list | Branch, order status |
| **Dropdown (multi)** | Select multiple values | Multiple regions, multiple products |
| **Text Input** | Type a search string | Search by name or code |
| **Number Range** | Enter min-max values | Filter by order value range |
| **Toggle/Boolean** | On/off for a condition | Only show new customers |

3. Click **Save Filter**.
4. The filter appears in the horizontal bar at the top of the Dashboard.

### Using Global Filters

Users can change filters at any time (even without Edit Mode):

1. Click the filter control (e.g. "Branch" dropdown).
2. Select the desired value.
3. All widgets automatically reload with the new filter applied.

**Example Dashboard with 3 Global Filters:**
```
[ From: 01/06/2024 ] [ To: 30/06/2024 ] [ Branch: Hanoi ▾ ]
↓
All charts automatically filter: June, Hanoi branch
```

---

## 8. Auto-Refresh

Auto-refresh keeps the Dashboard updated automatically without user action — ideal for monitoring screens (TV dashboards, NOC screens).

### Configure Auto-Refresh

1. Click **⚙️ Settings** at the top right of the Dashboard.
2. Find **Auto-refresh interval**.
3. Select a frequency:

| Option | Best For |
|--------|---------|
| **Off** | Historical analysis dashboards that don't need constant updates |
| **1 minute** | Real-time monitoring (new orders, system errors) |
| **5 minutes** | Tracking KPIs during working hours |
| **10 minutes** | Dashboard on an office TV screen |
| **30 minutes** | Internal reports updated every half hour |
| **1 hour** | Daily analysis result dashboards |

4. Click **Save**.

When Auto-refresh is on:
- A small countdown timer shows on the Dashboard (e.g. "Refreshing in 4:32").
- When it reaches 0: all widgets fetch new data simultaneously.
- Refresh happens **in the background** — no disruption to the viewer.

---

## 9. Sharing a Dashboard

### Share with Users in the Organization

1. Open Dashboard → click **Share** (share icon or Share button).
2. Select the **People** tab.
3. Enter the Semantix user's email.
4. Choose permission level:

| Permission | Recipients Can |
|-----------|----------------|
| **Viewer** | View Dashboard, hover tooltips, download widget data — but not edit |
| **Editor** | View + add/edit/delete widgets, change layout |
| **Owner** | Full control including deleting the Dashboard, managing shared users |

5. Click **Invite** → the user receives an in-app notification.

**Remove access:** In the People list, click **×** next to the user → confirm.

### Share a Public Link (No Login Required)

Create a link that lets anyone with the link view the Dashboard **without a Semantix account**:

1. Open Dashboard → click **Share**.
2. Select the **Public Link** tab.
3. Toggle **Enable public link** on → a link is generated.
4. (Optional) Set an **expiry date** — the link automatically deactivates after that date.
5. Copy the link and share it.

**Public link characteristics:**
- Viewers can **only view** — they cannot edit anything.
- Viewers **can use Global Filters** (if the Dashboard has them).
- Viewers **cannot see SQL** or internal configuration.
- The link can be revoked any time by toggling it off.

> **Security:** Only create public links for Dashboards without sensitive data. For sensitive data, use Embed with Locked Filters instead.

### Embed in an App or Website

Embed the Dashboard in an internal portal, customer-facing app, or website:

1. In the Dashboard, click **Share → Embed**.
2. Copy the generated `<iframe>` HTML snippet.
3. Paste it into your web page.

For secure embedding with per-user data isolation (each user sees only their data):

See the full guide at [Embedding Dashboards](embed.md).

---

## 10. Exporting Data & Reports

### Export the Full Dashboard as PDF

1. Click **⋮** at the top right of the Dashboard → select **Export as PDF**.
2. Options:

| Option | Description |
|--------|-------------|
| **Paper Size** | A4, A3, Letter, Legal |
| **Orientation** | Portrait / Landscape — Landscape suits wide dashboards |
| **Include Filters** | Show active Global Filter values on the PDF |
| **Timestamp** | Print the export date/time in the page corner |

3. Click **Export** → the PDF downloads automatically.

> **Tip:** Before exporting, set Global Filters to the correct reporting period so the PDF reflects the right data.

### Download Data from Individual Widgets

Click **⋮** on a widget → **Download**:
- **CSV**: All raw data (no chart limit constraint).
- **Excel**: Excel file with headers and basic formatting.
- **PNG/SVG**: Chart image (no raw data).

### Automated Reports via Email (Scheduled Reports)

Set up the system to **automatically capture and email the Dashboard** on a fixed schedule:

**Use cases:**
- A manager wants to receive a KPI report every Monday morning at 8:00.
- Send monthly revenue summaries on the 1st of each month to the whole team.
- Receive an end-of-day dashboard alert before the close of business.

**Setup:**

1. Click **⚙️ Settings** on the Dashboard → select **Scheduled Reports**.
2. Click **New Schedule**.
3. Fill in the configuration:

| Field | Required | Example |
|-------|----------|---------|
| **Name** | Yes | `Monday KPI Report` |
| **Recipients** | Yes | `manager@company.com, team@company.com` |
| **Format** | Yes | PDF, CSV, or Excel |
| **Subject** | No | `[Semantix] Weekly Business KPIs — Week {{week}}` |
| **Message** | No | Body text in the email |
| **Schedule** | Yes | Select a preset or enter a cron expression |

**Common schedules:**

| Schedule | Cron Expression | Best For |
|----------|----------------|---------|
| Every day at 8:00 AM | `0 8 * * *` | Daily KPIs for operations team |
| Monday 9:00 AM | `0 9 * * 1` | Weekly summary for managers |
| 1st of every month at 7:00 | `0 7 1 * *` | Monthly report for executives |
| Friday 5:00 PM | `0 17 * * 5` | End-of-week summary |
| Twice daily (9 AM & 5 PM) | `0 9,17 * * *` | Critical real-time dashboards |

4. Click **Save** → the schedule activates.

---

## 11. Managing Dashboards

### Dashboard List

Click **Dashboards** in the menu → the list page shows:
- Small **thumbnail preview** of each Dashboard
- Name and description
- **Owner** (creator)
- **Last modified** date
- **Shared** (who it's shared with)
- Quick action buttons: Edit, Share, Delete

**Search and filter:**
- **Search** box — search by Dashboard name
- **My Dashboards** tab — only shows Dashboards you created
- **Shared with me** tab — Dashboards others shared with you
- **All** tab — all Dashboards you have Viewer access to

### Duplicate a Dashboard

Click **⋮** next to a Dashboard → select **Duplicate**:
- Creates a copy named `[Original Name] (Copy)`.
- The copy has all the same widgets and configuration.
- The two Dashboards are independent — changes to the copy don't affect the original.

**When to duplicate:**
- Create a new month's Dashboard from last month's template.
- Experiment with a new layout without risking the original.
- Create a Dashboard for a different branch from a shared template.

### Delete a Widget

In **Edit Mode**:
- **Option 1**: Hover over the widget → click **✕** in the corner → confirm.
- **Option 2**: Click **⋮** on the widget → **Delete Widget** → confirm.

Deleting a widget **does not affect** the underlying data in the database — only removes the chart from the Dashboard.

### Delete a Dashboard

1. Click **⚙️ Settings** → **Delete Dashboard**.
2. A confirmation dialog shows the Dashboard name — retype it to confirm.
3. Click **Delete** → the Dashboard is permanently deleted.

> ⚠️ **Cannot be undone.** Deleting a Dashboard also deletes all widgets in it. Data in the database **is not affected**.

---

## 12. Fullscreen Mode (TV / Kiosk Mode)

Use the Dashboard on a large office or NOC screen:

1. Open the Dashboard.
2. Click the **⛶ Fullscreen** icon (or press `F11`).
3. The Dashboard fills the screen, hiding the navigation bar and menu.
4. Combine with Auto-refresh for automatic data updates.

Press **Esc** or `F11` to exit fullscreen.

---

## 13. Dashboard Permissions

| Permission | Allowed Actions |
|-----------|----------------|
| **Viewer** | View, hover tooltips, use Global Filters, download widget data (CSV/Excel/PNG) |
| **Editor** | Viewer + add/edit/delete widgets, change layout, configure filters |
| **Owner** | Editor + delete Dashboard, manage shared users, configure Scheduled Reports |
| **Admin** | Full access to all Dashboards in the organization |

Users only see Dashboards where they have Viewer access or above.

---

## 14. Tips & Best Practices

### Designing Effective Dashboards

**1. The "5-second rule":** Viewers should understand the Dashboard in 5 seconds — put the most important KPIs at the top in large format.

**2. Layer information:**
```
Layer 1 (Top row):   Large KPI numbers, overview     → Answers "Good or bad?"
Layer 2 (Middle):    Trends, comparisons              → Answers "Why?"
Layer 3 (Bottom):    Details, lists                   → Answers "Specifically what?"
```

**3. Less is more:** A Dashboard with 6–8 widgets is usually more effective than one with 20 cluttered widgets.

**4. Consistent colors:** Use the same color for the same category throughout the Dashboard (e.g. Hanoi always blue, HCM always red).

**5. Always show time context:** Every Dashboard should clearly indicate the time period — use a Global Date Filter or write it in the widget title.

### Fast Dashboard Building Workflow

```
Step 1: List 3–5 key questions you need to answer
   ↓
Step 2: Ask AI Chat each question → get the right result → Pin to Dashboard
   ↓
Step 3: Open Dashboard → Edit Mode → rearrange the layout
   ↓
Step 4: Add Global Filters (date, branch)
   ↓
Step 5: Rename widget titles to be clear and meaningful
   ↓
Step 6: Save and share
```

The whole process typically takes **15–30 minutes** for a basic 6–8 widget Dashboard.
