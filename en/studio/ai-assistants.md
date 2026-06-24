# AI Assistants

**Navigate to:** Studio → DSAI → AI Assistants

An AI Assistant is a **custom-configured AI agent** with its own personality, language, data scope (Context), and AI model. A single Semantix system can have multiple AI Assistants serving different departments or purposes.

**Real-world examples:**
- "Sales Assistant" — analyzes revenue and orders, uses GPT-4o, responds in English
- "HR Bot" — looks up HR information, uses Gemini Flash, only visible to the HR team
- "Finance Analyst" — analyzes financial pipeline, uses Claude Sonnet, high accuracy

---

## Creating a New AI Assistant

### Step 1 — Open the Form

1. Go to **Studio → DSAI → AI Assistants → New Assistant**.
2. The configuration form opens.

### Step 2 — Basic Information

| Field | Required | Example | Description |
|-------|----------|---------|-------------|
| **Name** | Yes | `Sales Assistant` | Display name in the chat interface |
| **Icon** | No | 🤖 or upload image | Identifying icon in the assistant list |
| **Description** | No | `Analyzes revenue and orders` | Short description of function |
| **Active** | — | On | Turn off to hide from users |

### Step 3 — Select Context and AI Provider

| Field | Required | Description |
|-------|----------|-------------|
| **Context** | Yes | Select the Semantic Context you created — defines which data the AI can access |
| **AI Provider** | Yes | Select the AI provider (OpenAI, Anthropic, Gemini...) |
| **Model** | Yes | Specific model name (e.g., `gpt-4o`, `claude-sonnet-4-5`, `gemini-1.5-pro`) |

**Model selection guide:**

| Model | Strengths | Best For |
|-------|-----------|---------|
| `gpt-4o` (OpenAI) | Fast, high accuracy, great multilingual support | Complex data analysis, many users |
| `gpt-4-turbo` (OpenAI) | Longer context window | Contexts with many complex Models |
| `claude-sonnet-4-5` (Anthropic) | Strong reasoning, low hallucination | High-accuracy analysis required |
| `gemini-1.5-pro` (Google) | Very long context | When Knowledge Base has long documents |
| `gemini-1.5-flash` (Google) | Very fast, low cost | Simple questions, many concurrent users |
| Ollama model (local) | No data leaves your server | High security requirements, sensitive data |

### Step 4 — Language and Greeting Message

| Field | Example | Description |
|-------|---------|-------------|
| **Language** | `en` | Language for AI responses (`en` = English, `vi` = Vietnamese) |
| **Greeting Message** | (see example) | First message shown when a user opens the chat |

**Example Greeting Message:**
```
Hello! I'm the Sales Analytics Assistant for [Company Name].
You can ask me about revenue, orders, and customer data.
Example: "What is our revenue by region this month?"
```

### Step 5 — Personality (System Prompt)

The Personality is **instructions for the AI's tone and response style** — also called a system prompt. It determines how the AI answers questions.

**Effective Personality structure:**

```
[1. ROLE] You are the [name/role] for [company].

[2. STYLE] Respond in English, [concisely/in detail], [professionally/friendly].

[3. PRIORITIES] Focus on [types of metrics/analysis to prioritize].

[4. FORMAT] Always present numbers as [tables/charts]. Currency is [USD/EUR].

[5. SCOPE] Only answer questions related to [scope]. If unsure, say so clearly.

[6. UNCERTAINTY] When data is insufficient, say so and suggest alternative questions.
```

**Example Personality for a Sales Assistant:**

```
You are the Business Analytics Assistant for ABC Company. Your role is to 
help the Sales and Management teams analyze sales data quickly and accurately.

Style:
- Respond in English, concisely and professionally
- Always present numbers in a table when there are more than 3 values
- Currency: USD, formatted with comma separators ($1,234,567)
- Round to the nearest dollar when needed

Analysis priorities:
- Year-over-year and month-over-month growth
- Top products/customers/regions
- Target completion rate

Scope:
- Only analyze sales data in the assigned Context
- Do not make future predictions unless explicitly asked
- If unsure about a metric definition, ask the user for clarification
```

**Example Personality for an HR Assistant:**

```
You are the HR Analytics Assistant, supporting the HR team and managers in 
analyzing workforce data.

Privacy: Never display detailed personal information about individual employees 
(specific salaries, addresses) — aggregate only by department or level.

Style: Accurate, objective. Respond in English.
Salary unit: USD.
```

### Step 6 — Knowledge Bases

If you want the AI to answer questions from internal documents (not just the database), link a Knowledge Base:

1. In the **Knowledge Bases** section, click **Add**.
2. Select one or more Knowledge Bases you have created.
3. The AI will automatically search both the database and the documents when answering.

See [Knowledge Bases](knowledge-bases.md) for how to create them.

### Step 7 — Access Control

The **Access Control** tab lets you specify who can use this Assistant:

| Level | Meaning |
|-------|---------|
| **Public** (default) | All logged-in users can see it |
| **Role-based** | Only users with a specific Role can see and use it |
| **User-based** | Specify individual users |

Users only see Assistants they have permission to access.

### Step 8 — Save

Click **Save**. The Assistant appears in the list and is immediately ready to use.

---

## Using an AI Assistant

### Open AI Chat

1. Click **AI Chat** in the main navigation bar (top menu).
2. The list of AI Assistants appears in the left sidebar — only shows Assistants you have access to.
3. Click an Assistant name to start a new conversation.

### Chat Interface

| Component | Function |
|-----------|----------|
| **Chat area** | Type questions in natural language |
| **Greeting message** | The configured Greeting Message |
| **Results** | Data table or chart |
| **View SQL** | See the generated SQL query |
| **Pin (📌)** | Pin a chart to a Dashboard |
| **Export** | Download as CSV or Excel |
| **Suggest** | Propose sample questions to add as Suggestions |

### Analysis Modes

| Mode | Description | Use When |
|------|-------------|---------|
| **Structured** | NL → SQL → Results | Clear questions needing specific numbers |
| **Agentic** | AI plans, runs multiple queries, synthesizes | Complex questions requiring multi-step analysis |

---

## Managing AI Assistants

### Edit an Assistant

1. Go to **Studio → DSAI → AI Assistants** → click the Assistant name.
2. Change any settings.
3. Click **Save**.

Changes take effect immediately for new conversations. Ongoing conversations are not affected.

### Temporarily Disable

Toggle **Active** off to hide the Assistant from users. Useful when updating configuration or when the Context is under maintenance.

### Review Performance

View chat history and user responses in **Admin → Audit Logs** to assess response quality and improve configuration.

---

## Common Questions

**Q: How many AI Assistants can I create?**
No limit. It's recommended to create one per department or function.

**Q: Can users see the Personality (system prompt)?**
No. Personality is a system configuration — users only see the AI's responses.

**Q: Does changing the Context affect an open chat?**
No, it doesn't affect the current chat. It only applies to new conversations.

**Q: Can one Assistant use multiple Contexts?**
Currently each Assistant uses one Context. To serve multiple data sources, either combine Models into one Context or create separate Assistants.
