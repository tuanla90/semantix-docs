# Microsoft Teams

Connect Semantix to Microsoft Teams to query data and receive alerts directly in Teams channels.

## Features

- Ask natural language questions in any Teams channel or chat
- Results displayed as rich Adaptive Cards
- Clarification prompts when the question is ambiguous

## Setup

### Step 1 — Register an Azure Bot

1. Go to [portal.azure.com](https://portal.azure.com)
2. Create a new **Azure Bot** resource
3. Note the **App ID** and create a **Client Secret**
4. Under **Channels**, enable **Microsoft Teams**
5. Set the **Messaging Endpoint** to:
   ```
   https://your-semantix-domain.com/api/teams/webhook?channelId=CHANNEL_ID
   ```

### Step 2 — Connect in Semantix

1. Go to **Admin → Channels → New Channel → Microsoft Teams**
2. Enter:
   - **App ID** — from the Azure Bot registration
   - **App Password** — the client secret
   - **Default Context ID** — the context users will query
   - **Semantix API Key** — for executing queries
3. Copy the generated **Channel ID**
4. Update the Azure Bot Messaging Endpoint with this Channel ID
5. Click **Save**

### Step 3 — Install the Bot in Teams

1. In Teams, go to **Apps → Upload a custom app**
2. Upload the bot manifest or add it via the App ID
3. Add the bot to the desired channel or chat

## Querying in Teams

Mention the bot or send a message in a connected chat:

```
@SemantixBot Show me weekly revenue trend
@SemantixBot Which products are underperforming?
```

Results appear as Adaptive Cards with data tables and a link to view full results in Semantix.

## Security

Teams webhook requests are validated using JWT tokens signed by Microsoft's Bot Framework — only legitimate Teams messages are processed.
