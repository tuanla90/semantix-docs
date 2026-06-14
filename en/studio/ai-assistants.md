# AI Assistants

**Navigate to:** Studio → DSAI → AI Assistants

AI Assistants are configurable AI agents with their own personality, language, data context, and AI provider. A single system can have multiple Assistants serving different departments or use cases.

## Create a New AI Assistant

1. Go to **Studio → DSAI → AI Assistants → New Assistant**
2. Fill in the configuration:

| Field | Description |
|-------|-------------|
| **Name** | Assistant name (e.g., "Sales Analyst") |
| **Icon** | Identifying icon |
| **Context** | Attach a Semantic Context |
| **AI Provider** | Select provider (OpenAI, Anthropic, Gemini...) |
| **Model** | Specific model name (e.g., `gpt-4o`, `claude-3-5-sonnet`) |
| **Personality** | Response style guidance (system prompt) |
| **Language** | Primary communication language |
| **Greeting Message** | Default greeting shown when chat opens |
| **Active** | Enable/disable the assistant |

## Personality — Writing Guide

The Personality (system prompt) sets the tone for AI responses. Example:

```
You are a business analytics assistant for Company XYZ. Answer concisely 
and professionally. Focus on actionable business insights. Always present 
data in tables when possible, and highlight key trends.
```

## Using an AI Assistant

Once created, users can:
1. Open **AI Chat** (top navigation)
2. Select the AI Assistant from the list
3. Start asking questions

## Access Control

Each Assistant can be permission-restricted to specific Roles or Users via **Access Control**. Users only see Assistants they have access to.

## Knowledge Bases

An AI Assistant can be linked to one or more **Knowledge Bases** to answer questions based on internal documents. See [Knowledge Bases](knowledge-bases.md).
