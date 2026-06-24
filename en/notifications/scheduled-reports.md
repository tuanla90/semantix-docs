# Scheduled Reports

Automatically generate and send reports on a schedule — no one needs to remember to export a report every day, week, or month.

---

## Report Formats

| Format | Description | Best For |
|--------|-------------|---------|
| **PDF** | Full dashboard snapshot, preserves layout | Presentation reports, sending to leadership |
| **CSV** | Raw data from each widget, one file per widget | Further analysis in Excel |
| **Excel (XLSX)** | Formatted spreadsheet from widgets | Accounting, finance teams |

---

## Creating a Scheduled Report

1. Go to the Dashboard you want to report on
2. Click **⋮** (menu in the top-right) → **Schedule Report**
3. Or: **Admin → Notifications → Scheduled Reports → New Report**

### Configuration Fields

| Field | Description | Example |
|-------|-------------|---------|
| **Name** | Report name | "Daily Revenue - Sales Team" |
| **Dashboard** | Dashboard to export | Select from list |
| **Format** | File format | PDF / CSV / XLSX |
| **Schedule** | Send schedule | Select a preset or cron expression |
| **Time Zone** | Timezone for the schedule | America/New_York |
| **Recipients** | Email recipient list | john@company.com, team@company.com |
| **CC** | CC emails | manager@company.com |
| **Email Subject** | Email subject line | "📊 Revenue Report {{date}}" |
| **Email Body** | Custom email body text | Customize the accompanying text |

### Variables in Subject and Body

| Variable | Value | Example Result |
|----------|-------|---------------|
| `{{date}}` | Report send date | `2026-06-22` |
| `{{date_formatted}}` | Nicely formatted date | `Monday, June 22, 2026` |
| `{{dashboard_name}}` | Dashboard name | `Revenue Report` |
| `{{period}}` | Reporting period (if applicable) | `Week 25/2026` |

---

## Setting the Schedule

### Built-in Presets

| Name | Cron | When |
|------|------|------|
| Daily 7am | `0 7 * * *` | Every day at 7:00am |
| Daily 8am | `0 8 * * *` | Every day at 8:00am |
| Weekly Monday | `0 8 * * 1` | Every Monday at 8:00am |
| Monthly 1st | `0 8 1 * *` | 1st of every month at 8:00am |
| Monthly Last Day | `0 8 L * *` | Last day of every month at 8:00am |
| Quarterly | `0 8 1 1,4,7,10 *` | 1st of January, April, July, October |

### Custom Cron Expression

Enter a cron expression directly if no preset fits:

```
* * * * *
│ │ │ │ │
│ │ │ │ └─ Day of week (0-7, 0/7=Sunday, 1=Monday...)
│ │ │ └─── Month (1-12)
│ │ └───── Day of month (1-31)
│ └─────── Hour (0-23)
└───────── Minute (0-59)
```

**Specific examples:**

| Requirement | Cron Expression |
|-------------|----------------|
| 7:30am on weekdays (Mon-Fri) | `30 7 * * 1-5` |
| 8am on Monday and Thursday | `0 8 * * 1,4` |
| 15th of every month at 9am | `0 9 15 * *` |
| Every 6 hours | `0 */6 * * *` |
| 11:59pm on New Year's Eve | `59 23 31 12 *` |

---

## Technical Requirements

### SMTP Must Be Configured

To send email reports, SMTP must be set up:
1. Go to **Admin → Config → Platform Integrations → Tab: Email**
2. Fill in the SMTP server details
3. Test email delivery before setting up Scheduled Reports

### CRON_SECRET

The environment variable `CRON_SECRET` must be set in `.env`:
```env
CRON_SECRET=random_secret_string_here
```

Semantix uses this secret to protect the cron job endpoint:
```
GET /api/cron/reports
Authorization: Bearer CRON_SECRET
```

### Cron Job Trigger

Scheduled Reports require an **external cron job** to call the endpoint on schedule. Choose one:

**Linux system (crontab):**
```bash
# Crontab entry: check and send due reports every minute
* * * * * curl -s -H "Authorization: Bearer YOUR_CRON_SECRET" https://your-domain.com/api/cron/reports
```

**Vercel Cron (if deployed on Vercel):**
```json
// vercel.json
{
  "crons": [
    {
      "path": "/api/cron/reports",
      "schedule": "* * * * *"
    }
  ]
}
```

**Railway Cron:**
Create a service that runs the curl command on schedule.

---

## Managing Reports

### View the List

**Admin → Notifications → Scheduled Reports** — displays:
- Report name
- Target dashboard
- Schedule
- Last sent time and status (Success / Failed)
- Enable/disable toggle

### View Send History

Click on a report → **History** tab:
- See each individual send
- Download the file that was sent
- View error details if a send failed

### Send Now

Click **Send Now** to send the report immediately without waiting for the schedule — useful for testing or sending an ad-hoc report.

---

## Troubleshooting

| Error | Cause | Solution |
|-------|-------|----------|
| Email not received | SMTP not configured | Configure SMTP in Platform Integrations |
| Email goes to Spam | Domain missing SPF/DKIM | Configure SPF/DKIM DNS records for your domain |
| Report sent at wrong time | Wrong Time Zone | Change Time Zone in Report settings |
| PDF is blank or missing widgets | Dashboard has broken widgets | Fix widget errors before scheduling |
| `CRON_SECRET not set` | Missing environment variable | Add `CRON_SECRET` to `.env` and restart |
| Report not auto-sending | Cron job not running | Verify crontab / Vercel Cron is active |
