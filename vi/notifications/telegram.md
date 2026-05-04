# Telegram Bot

Connect a Telegram bot to Semantix to query your data and receive alerts directly in Telegram.

## Features

- Ask natural language questions via Telegram chat
- Receive metric alerts when thresholds are crossed
- Results are formatted as clean text tables

## Setup

### Step 1 — Create a Telegram Bot

1. Open Telegram → search for **@BotFather**
2. Send `/newbot` and follow the prompts
3. Copy the **Bot Token** (format: `123456789:AAF...`)

### Step 2 — Connect in Semantix

1. Go to **Admin → Channels → New Channel → Telegram**
2. Enter your **Bot Token**
3. Optionally set a **Default Context** (the data source users will query by default)
4. Optionally set a **Semantix API Key** (required for NL queries)
5. Click **Save**

### Step 3 — Verify the Bot

1. Semantix generates a **verification code**
2. Open your Telegram bot → send `/start <verification_code>`
3. The bot confirms the connection

## Querying Data via Telegram

Once connected, send any question to the bot:

```
Show me sales by region this week
Top 5 customers by revenue
Total orders yesterday
```

The bot responds with a formatted table of results.

## Security

- Set `TELEGRAM_WEBHOOK_SECRET` in your environment variables to protect the webhook endpoint
- Only verified channels can receive and send messages

> 💡 Results are limited to 10 rows in Telegram for readability. View full results in Semantix.
