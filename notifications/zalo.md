# Zalo

Connect Semantix to Zalo Official Account to receive alerts for Vietnamese users.

## Setup

### Step 1 — Configure a Zalo Official Account

1. Register a **Zalo Official Account (OA)** at [oa.zalo.me](https://oa.zalo.me)
2. Go to **Developer Tools** → enable **Webhook**
3. Set the webhook URL to:
   ```
   https://your-semantix-domain.com/api/webhooks/zalo
   ```
4. Copy the **App Secret** for signature verification

### Step 2 — Connect in Semantix

1. Go to **Admin → Channels → New Channel → Zalo**
2. Enter your Zalo OA credentials
3. Set `ZALO_WEBHOOK_SECRET` in your environment variables
4. Click **Save**

## Security

Set `ZALO_WEBHOOK_SECRET` in your `.env` to enable HMAC signature verification on incoming webhook requests.
