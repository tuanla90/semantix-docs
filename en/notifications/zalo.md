# Zalo Official Account (Zalo OA)

Connect Semantix to a Zalo Official Account to send alerts and reports to Vietnamese users via Zalo — Vietnam's most popular messaging application.

---

## Overview

Semantix integrates with **Zalo Official Account (Zalo OA)** — not a personal Zalo account. Zalo OA is the official business channel that allows bulk messaging and receiving webhooks from users.

**You will need:**
- A verified Zalo Official Account
- Developer access to that Zalo OA

---

## Step 1: Register a Zalo Official Account

1. Go to [oa.zalo.me](https://oa.zalo.me)
2. Click **Create OA** → select type (Business)
3. Fill in details and upload verification documents
4. Wait for Zalo to approve (typically 3-7 business days)

If you already have a Zalo OA, skip this step.

---

## Step 2: Configure the Webhook on Zalo OA

1. Log in to [developers.zalo.me](https://developers.zalo.me)
2. Select your Zalo OA application (or create a new one)
3. Go to the **Webhook** tab
4. Enter the **Callback URL**:
   ```
   https://your-semantix-domain.com/api/webhooks/zalo
   ```
5. Enable the events you want to listen to:
   - `Message`: Receive messages from users (for chat integration)
   - `Follow/Unfollow`: Track follow/unfollow events
6. Click **Confirm** → Zalo sends a verification request to the Callback URL
7. Save the **App Secret** (needed for Step 3)

---

## Step 3: Get the Access Token

1. In the Zalo Developer console → **Access Token** tab
2. Click **Generate Access Token** or use an existing one
3. Save the **Access Token** (used to send messages)

> Zalo OA Access Tokens may need periodic refreshing (typically every 90 days). Configure automatic refresh or update manually when the token expires.

---

## Step 4: Connect in Semantix

1. Go to **Admin → Config → Platform Integrations → Tab: Channels**
2. Click **New Channel → Zalo**
3. Fill in the fields:

| Field | Description |
|-------|-------------|
| **Name** | Channel name in Semantix (e.g. "Company Zalo OA") |
| **OA Access Token** | Access Token from your Zalo OA |
| **App Secret** | App Secret for webhook signature verification |
| **OA ID** | Your Zalo OA ID (found in Developer Console) |

4. Click **Test Connection** — Semantix sends a test message to the OA
5. Click **Save**

---

## Environment Variable Configuration

Add to the `.env` file on your Semantix server:

```env
ZALO_WEBHOOK_SECRET=your_zalo_oa_app_secret
```

This variable is used to verify the HMAC signature of each webhook request from Zalo — preventing forged requests.

---

## Using with Alerts and Scheduled Reports

After configuration, select the Zalo channel when creating an Alert or Scheduled Report:

**Alert:** Admin → Notifications → New Alert → Channel: select Zalo channel

**Scheduled Report:** Dashboard → Export → Schedule Report → Delivery: Email + Zalo

**Example Alert message via Zalo:**
```
[ALERT] High cancellation count
Cancellations today: 45 orders (up 80% vs yesterday)
View details: https://your-domain.com/dashboards/orders
```

---

## Zalo OA Limitations

| Limit | Details |
|-------|---------|
| Messages / day | Depends on your Zalo OA plan (typically 10,000 - 100,000/day) |
| Recipients | Can only send to users who Follow the OA |
| Content types | Text, images, files, template messages |

> To send notifications to users who haven't followed the OA, you need Zalo Notification Service (ZNS) — a paid service from Zalo.

---

## Troubleshooting

| Error | Cause | Solution |
|-------|-------|----------|
| Webhook verification fails | Wrong App Secret | Check the App Secret in Developer Console |
| `Access token expired` | Token has expired | Refresh the Access Token in Zalo Developer Console |
| `OA not found` | Wrong OA ID | Verify the OA ID |
| User not receiving messages | User hasn't followed the OA | Ask users to Follow your OA on Zalo |
