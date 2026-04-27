# Scheduled Reports

Automatically generate and email reports on a schedule — daily, weekly, or monthly.

## Supported Formats

- **PDF** — full dashboard snapshot
- **CSV** — raw data export
- **Excel (XLSX)** — formatted spreadsheet

## Setting Up a Scheduled Report

1. Go to **Admin → Reports → New Report**
2. Configure:

| Field | Description |
|-------|-------------|
| **Name** | Report name |
| **Dashboard** | The dashboard to export |
| **Format** | PDF, CSV, or XLSX |
| **Schedule** | Cron expression or preset (daily, weekly, monthly) |
| **Recipients** | Email addresses to send to |
| **Subject** | Email subject line |

3. Click **Save**

## Schedule Examples

| Preset | Cron | Description |
|--------|------|-------------|
| Daily at 8am | `0 8 * * *` | Every day at 08:00 |
| Weekly Monday | `0 9 * * 1` | Every Monday at 09:00 |
| Monthly 1st | `0 7 1 * *` | 1st of every month at 07:00 |

## Requirements

- `CRON_SECRET` must be set in your environment variables
- An email provider (SMTP) must be configured in **Admin → Settings → Email**
- The cron job must call `/api/cron/reports` with the correct Bearer token on schedule

> 💡 Use a service like Railway Cron, Vercel Cron, or a system crontab to trigger the endpoint on schedule.
