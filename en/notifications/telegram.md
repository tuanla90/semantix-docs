# Telegram Bot

Connect Semantix to Telegram to receive data alerts, scheduled reports, and even query data directly in Telegram chat.

---

## Features

- Receive Alert notifications when a metric crosses a threshold (e.g. "Daily revenue drops > 20%")
- Receive Scheduled Reports on a schedule (PDF, CSV)
- Query data in natural language directly in Telegram
- Results displayed as clean formatted text tables

---

## Setting Up the Telegram Bot

### Step 1: Create a New Bot with BotFather

1. Open Telegram → search for **@BotFather**
2. Click **Start**
3. Send the command: `/newbot`
4. BotFather asks for a bot name → enter a display name (e.g. `Semantix Analytics Bot`)
5. BotFather asks for a username → enter a username (must end with `bot`): `MyCompanySemantixBot`
6. BotFather returns a **Bot Token**: `7123456789:AAFxxxxxxxxxxxxxxxxxxxxxxxx`
7. **Copy the Bot Token** — you'll need it in the next step

### Step 2: Get the Chat ID

You need the Chat ID so Semantix knows where to send notifications.

**For a Group:**
1. Add the bot to your company's Telegram group
2. Send any message in the group (e.g. `/start`)
3. Open this URL in your browser (replace `TOKEN` with your bot token):
   ```
   https://api.telegram.org/botTOKEN/getUpdates
   ```
4. In the JSON response, find `"chat"` → `"id"` — the group Chat ID typically starts with `-`:
   ```json
   "chat": {
     "id": -1001234567890,
     "title": "Analytics Team",
     "type": "supergroup"
   }
   ```

**For an Individual (Direct Message):**
1. Find the bot on Telegram and click `/start`
2. Access the getUpdates URL as above
3. A personal Chat ID is a positive number (no leading `-`)

### Step 3: Connect in Semantix

1. Go to **Admin → Config → Platform Integrations → Tab: Channels**
2. Click **New Channel → Telegram**
3. Fill in the fields:

| Field | Description | Example |
|-------|-------------|---------|
| **Name** | Channel name in Semantix | "Analytics Team Group" |
| **Bot Token** | Token from BotFather | `7123456789:AAFxxx...` |
| **Chat ID** | Group or individual ID | `-1001234567890` |
| **Default Context** | Context used for Telegram queries | (select from list) |

4. Click **Test Connection** — the bot sends "Connection test from Semantix" to the group
5. Click **Save**

---

## Using Alerts

After connecting, create an Alert and select the Telegram channel to receive notifications:

1. On a Dashboard → click a widget → **⋮ → Create Alert**
2. Or: **Admin → Notifications → New Alert**
3. Configure:
   - **Channel**: The Telegram channel you just created
   - **Condition**: When to trigger (e.g. revenue < 10,000)
   - **Message Template**: Telegram message content

**Example alert message:**
```
🚨 REVENUE ALERT

Daily revenue: {{value}}
Down {{change_pct}}% from yesterday

📊 View Dashboard: {{dashboard_link}}
```

---

## Querying Data via Telegram

If a **Default Context** is configured for the Telegram channel, members can query data directly:

```
User: What's today's revenue?

Bot: 📊 Result (2026-06-22)
┌──────────────────────┐
│ Revenue:   $45,230   │
│ Orders:    127       │
└──────────────────────┘
```

> Results are limited to 10 rows in Telegram for readability. View full results in Semantix.

---

## Troubleshooting

| Error | Cause | Solution |
|-------|-------|----------|
| Test Connection fails | Wrong Bot Token | Verify the token from BotFather |
| Not receiving messages | Wrong Chat ID or bot not added to group | Add bot to the group first, then get the Chat ID |
| `Forbidden: bot was blocked` | User blocked the bot | Unblock the bot in Telegram |
| Group Chat ID not working | Got Chat ID before adding bot | Add bot to group, send a message, then get the Chat ID |

---

## Security

- Only Semantix Admins can view or change the Bot Token
- Set the environment variable `TELEGRAM_WEBHOOK_SECRET` if using webhook mode
- Limit the Telegram groups receiving alerts to members who have permission to view the corresponding data
