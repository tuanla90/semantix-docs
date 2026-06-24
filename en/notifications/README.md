# Notifications & Alerts

**Navigation:** Admin → Notifications (or Admin → Channels and Admin → Alerts)

Semantix can automatically send **alerts** when metrics cross a threshold and **scheduled reports** through multiple channels — keeping your team informed without needing to log into the system.

---

## Overview

### Supported Notification Channels

| Channel | Notification Type | Best For |
|---------|-------------------|---------|
| **Telegram Bot** | Real-time alerts + AI queries via chat | Operations teams, managers needing instant notifications |
| **Zalo** | Alerts, reports | Vietnamese users who prefer Zalo |
| **Microsoft Teams** | Alerts + reports into channels | Enterprises using Microsoft 365 |
| **Email** | Scheduled PDF/CSV/Excel reports | Daily/weekly/monthly reports for management |

### Alert Types

| Type | Description | Example |
|------|-------------|---------|
| **Threshold Alert** | Sends when a metric crosses a fixed threshold | Daily revenue < $10,000 |
| **Anomaly Alert** | AI automatically detects anomalies | Orders spike 3× above average |
| **Scheduled Report** | Periodic reports on a schedule | KPI report every morning at 8am |

---

## Setting Up Notification Channels

### Step 1 — Create a New Channel

1. Go to **Admin → Channels → New Channel**.
2. Select the channel type.
3. Fill in the configuration details (see each channel guide below).
4. Click **Test Connection** to verify.
5. Click **Save**.

### Telegram Bot Configuration

**Preparation:**
1. Create a Telegram Bot: Message **@BotFather** on Telegram → type `/newbot` → set a name and username → get the **Bot Token**.
2. Create a Telegram group or channel → add the Bot to the group.
3. Get the **Chat ID**:
   - Easy method: message the bot `/start`, then call `https://api.telegram.org/bot{TOKEN}/getUpdates` to find the chat_id.
   - Or use the bot `@getmyid_bot`.

**Configure in Semantix:**

| Field | Description |
|-------|-------------|
| **Name** | Channel name (e.g. "Telegram Analytics Team") |
| **Bot Token** | Token from BotFather (format `123456:ABC-DEF...`) |
| **Chat ID** | ID of the group/channel that receives notifications |
| **Default Context** | Context to use when querying via Telegram |

Full guide: [Telegram Bot](telegram.md)

### Zalo Configuration

**Preparation:**
1. Create a Zalo Official Account (OA) at [oa.zalo.me](https://oa.zalo.me).
2. Create an application at [developers.zalo.me](https://developers.zalo.me) → get App ID and Secret Key.
3. Get an Access Token with messaging permissions.

**Configure in Semantix:**

| Field | Description |
|-------|-------------|
| **Name** | Channel name |
| **OA Access Token** | Token from Zalo Developers |
| **User ID / Group ID** | ID of the recipient or receiving group |

Full guide: [Zalo](zalo.md)

### Microsoft Teams Configuration

**Preparation:**
1. Open Microsoft Teams → go to the channel that should receive notifications.
2. Click `...` → **Connectors** → **Incoming Webhook** → **Add**.
3. Set a name and optional avatar → **Create** → Copy the **Webhook URL**.

**Configure in Semantix:**

| Field | Description |
|-------|-------------|
| **Name** | Channel name |
| **Webhook URL** | Webhook URL from Teams |

Full guide: [Microsoft Teams](teams.md)

### Email Configuration

Email is configured at the system level (SMTP server). See SMTP settings in **Admin → System Settings**.

See the email report guide: [Scheduled Reports](scheduled-reports.md)

---

## Creating Alerts

### Threshold Alert

Sends a notification when a metric goes above or below a threshold you define.

**Steps:**

1. Go to **Admin → Alerts → New Alert**.
2. Fill in the configuration:

| Field | Required | Example |
|-------|----------|---------|
| **Name** | Yes | `Low daily revenue alert` |
| **Context** | Yes | Select the context containing the metric to monitor |
| **Metric** | Yes | `daily_revenue` |
| **Condition** | Yes | `is less than` |
| **Threshold** | Yes | `10000` |
| **Time Window** | Yes | `Today` |
| **Check Every** | Yes | `1 hour` |
| **Channel** | Yes | Select the notification channel |
| **Message** | No | Custom notification content |
| **Active** | — | Enable to activate |

**Supported Conditions:**

| Condition | Meaning |
|-----------|---------|
| `is greater than` | Metric > Threshold |
| `is less than` | Metric < Threshold |
| `is greater than or equal to` | Metric ≥ Threshold |
| `is less than or equal to` | Metric ≤ Threshold |
| `increases by more than` | Increases by more than X% vs previous period |
| `decreases by more than` | Decreases by more than X% vs previous period |

**Real-World Alert Examples:**

```
[Example 1] Alert when daily revenue is low
Metric: Total daily revenue
Condition: is less than 10,000
Check Every: 1 hour (at 6pm daily)
Message: "⚠️ Revenue today is only {{value}}, below the $10K target. Please investigate."
Channel: Telegram Sales Team

[Example 2] Alert when cancellation rate is high
Metric: Cancellation rate (%)
Condition: is greater than 10
Time Window: Today
Message: "🔴 Today's cancellation rate is {{value}}%, exceeding 10%. Needs immediate attention."
Channel: Teams - Ops Channel

[Example 3] Goal achievement notification
Metric: Total daily revenue
Condition: is greater than 50,000
Message: "🎉 Congratulations! Today's revenue has passed $50K: {{value}}"
Channel: Slack Sales Channel
```

### Anomaly Alert

The AI analyzes historical data, calculates the "normal range" for a metric, and sends an alert when it detects an anomaly.

**Advantage:** No need to manually set thresholds — the AI learns from the data. It can detect seasonal anomalies (e.g. low revenue on Sunday is normal, but low revenue on Friday is not).

**Anomaly Alert configuration:**

| Field | Description |
|-------|-------------|
| **Metric** | Metric to monitor |
| **Sensitivity** | `Low` (fewer alerts) / `Medium` / `High` (more sensitive) |
| **Learning Period** | Days of history for the AI to learn the "normal range" (recommended: 30-90 days) |
| **Channel** | Notification channel |

---

## Managing Alerts

### View All Alerts

**Admin → Alerts** → displays all alerts with:
- Name and type (Threshold / Anomaly)
- Metric being monitored
- Status (Active / Paused)
- Last trigger time
- Notification channel

### Pause an Alert

Toggle **Active** → Off to pause without deleting the configuration. Useful during system maintenance or holiday periods when data doesn't follow normal patterns.

### View Trigger History

Click on an Alert → tab **History** → see a list of all past triggers, the metric value at each trigger, and the notification that was sent.

---

## Special Feature: Query Data via Telegram

Beyond automated alerts, the Semantix Telegram Bot also lets users **query data directly in Telegram**:

```
User: revenue today
Bot: 📊 Today (2026-06-22): $87,432
     (+12% vs yesterday)

User: top 5 products this month
Bot: [Top 5 products table...]
```

Full configuration: [Telegram Bot](telegram.md)

---

## Testing the Channel Connection

After creating a Channel, always click **Test Connection** to:
- Confirm that the configuration is correct
- Send a test message to the channel
- Verify that you receive the test notification

If the test fails, check:
- Whether the Bot Token / Webhook URL is still valid
- Whether the Bot has been added to the group
- Whether the Group ID is correct (group IDs often have a leading `-`)
