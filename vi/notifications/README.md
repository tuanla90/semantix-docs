# Notifications & Alerts

Semantix can send automated alerts and reports through multiple channels.

## Supported Channels

| Channel | Use Case |
|---------|----------|
| [Telegram Bot](telegram.md) | NL queries + metric alerts |
| [Zalo](zalo.md) | Alerts for Vietnamese users |
| [Microsoft Teams](teams.md) | Enterprise NL queries + alerts |
| [Email](scheduled-reports.md) | Scheduled PDF/CSV/Excel reports |

## Alert Types

### Threshold Alerts
Trigger a notification when a metric crosses a defined threshold.

Example: *"Alert me when daily revenue drops below $10,000"*

### Anomaly Alerts
Semantix's anomaly detection engine automatically scans your KPIs and notifies you when it detects unusual patterns — without needing to define thresholds manually.

## Managing Notification Channels

1. Go to **Admin → Channels → New Channel**
2. Select the channel type
3. Follow the setup guide for that channel
4. Test the connection

## Managing Alerts

1. Go to **Admin → Alerts → New Alert**
2. Select the context and metric
3. Define the condition (threshold or anomaly)
4. Select the notification channel
5. Click **Save**
