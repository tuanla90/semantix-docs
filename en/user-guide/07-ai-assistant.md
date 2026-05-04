# 7. Querying with the AI Assistant

Once your Context is fully configured, users can start asking business questions in natural language.

**Navigation:** Analysis → select a Context → **Chat**

## How to Ask Effective Questions

**Good Questions (Specific & Direct):**

```text
Revenue this month by product, ordered descending
```
```text
Top 10 customers with the highest revenue last quarter
```
```text
Compare this month's revenue with last month by sales channel
```

**Deep Analytical Questions:**

```text
Why did revenue drop in March compared to February?
```
```text
Which products are showing the strongest growth trend?
```

## How the AI Processes Your Question

Behind the scenes, the system follows a secure, deterministic pipeline:

```text
1. Natural Language Question
         ↓
2. Intent & Entity Analysis
         ↓
3. Automated SQL Generation
         ↓
4. Context & Security Validation
         ↓
5. Database Execution
         ↓
6. Automatic Chart & Insight Generation
```

## Configuring the AI Assistant

Administrators can customize how the AI behaves.

**Navigation:** Admin → Assistants → **New Assistant**

| Property | Description |
|----------|-------------|
| **Name** | The name of the assistant (e.g., "Sales Copilot"). |
| **Context** | The semantic Context this assistant operates within. |
| **AI Provider** | Choose between OpenAI, Gemini, or Anthropic. |
| **Personality** | System prompt instructions. For example: "Answer concisely, use professional language, and focus on actionable insights." |
| **Language** | The primary language of interaction (e.g., English or Vietnamese). |
| **Greeting Message** | The default welcome message displayed when opening the chat. |
