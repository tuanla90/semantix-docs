# Microsoft Teams

Connect Semantix to Microsoft Teams to receive data alerts and reports directly in Teams channels.

---

## Two Integration Methods

| Method | Description | Best For |
|--------|-------------|---------|
| **Incoming Webhook** | One-way notifications only | Alerts, Scheduled Reports |
| **Teams Bot** | Two-way: receive notifications + query data in chat | Interactive Teams experience |

---

## Method 1: Incoming Webhook (Simpler)

Use this if you only need to send alerts into a Teams channel without interactive chat.

### Create an Incoming Webhook in Teams

1. Open Microsoft Teams
2. Find the channel to receive notifications → click **⋯** next to the channel name
3. Select **Connectors** (or **Manage channel → Connectors**)
4. Find **Incoming Webhook** → click **Configure**
5. Set a name (e.g. "Semantix Alerts") and upload a logo if desired
6. Click **Create** → Copy the **Webhook URL**

The URL looks like:
```
https://company.webhook.office.com/webhookb2/xxx@xxx/IncomingWebhook/xxx/xxx
```

### Connect in Semantix

1. Go to **Admin → Config → Platform Integrations → Tab: Channels**
2. Click **New Channel → Microsoft Teams (Webhook)**
3. Fill in:
   - **Name**: Channel name (e.g. "Teams Analytics Channel")
   - **Webhook URL**: URL from the step above
4. Click **Test** — Teams receives a test message as an Adaptive Card
5. Click **Save**

---

## Method 2: Teams Bot (Two-Way Interactive)

Use this if you want your team to be able to query data directly in Teams chat.

### Step 1: Register an Azure Bot

1. Go to [portal.azure.com](https://portal.azure.com)
2. Search for **"Azure Bot"** in the marketplace → **Create**
3. Fill in:
   - **Bot handle**: Bot name (e.g. `SemantixBot`)
   - **Subscription**: Your company's Azure subscription
   - **Resource Group**: Create new or use existing
   - **Pricing tier**: F0 (free for dev) or S1
4. Click **Review + Create → Create**
5. After creation → go to the Bot resource → **Configuration** tab:
   - Save the **Microsoft App ID**
   - Click **Manage** → create a **Client Secret** → save immediately (only shown once)

### Step 2: Enable the Teams Channel

1. In the Azure Bot → **Channels** tab
2. Click **Microsoft Teams**
3. Choose Teams type: Commercial (for standard tenants)
4. Click **Apply**

### Step 3: Connect in Semantix

1. Go to **Admin → Config → Platform Integrations → Tab: Channels**
2. Click **New Channel → Microsoft Teams (Bot)**
3. Fill in:

| Field | Description |
|-------|-------------|
| **Name** | Channel name in Semantix |
| **App ID** | Microsoft App ID from Azure Bot |
| **App Password** | Client Secret from Azure Bot |
| **Default Context ID** | Context to answer user questions |
| **Semantix API Key** | API Key with `execute:query` scope |

4. After saving → Semantix generates a **Channel ID** and **Messaging Endpoint**
5. Go back to Azure Bot → **Configuration**:
   - **Messaging endpoint**: URL from Semantix (e.g. `https://your-domain.com/api/teams/webhook?channelId=CHANNEL_ID`)
6. Click **Apply**

### Step 4: Install the Bot in Teams

1. In Teams → **Apps** (left sidebar) → **Manage your apps**
2. Click **Upload an app** → **Upload a custom app**
3. Upload the manifest file (download from the Channel page in Semantix)
4. Add the bot to your workspace or a specific channel

---

## Interacting with the Bot in Teams

After installation, @mention the bot in any channel that has the bot:

```
@SemantixBot What's revenue this month?

@SemantixBot Top 5 best-selling products last week

@SemantixBot Compare revenue in June vs May
```

The bot replies as an **Adaptive Card** with a data table and a link to view full results in Semantix.

---

## Using with Alerts and Scheduled Reports

After configuring either method, select the Teams channel when creating an Alert or Scheduled Report.

**Teams Alert Adaptive Card example:**
```
🚨 ALERT: Low Revenue
─────────────────────────────
Current value: $8,500
Threshold: $10,000
Change: -15% vs yesterday
─────────────────────────────
[View Dashboard] [Details]
```

---

## Troubleshooting

| Error | Cause | Solution |
|-------|-------|----------|
| Webhook test fails | Webhook URL wrong or expired | Recreate the Incoming Webhook in Teams |
| Bot not receiving messages | Messaging Endpoint not updated | Update the endpoint in Azure Bot |
| `401 Unauthorized` in Bot | Wrong App ID/Password | Check the Azure Bot Configuration |
| Bot not showing in Teams | Manifest not uploaded or wrong format | Re-upload the manifest from Semantix |
