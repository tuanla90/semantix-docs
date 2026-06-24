# AI Providers

**Navigate to:** Studio → DSAI → AI Providers

AI Providers manages the AI model providers (LLM and Embedding) connected to Semantix. This step is required — without an AI Provider, all AI Chat and AI Assistant features will not work.

---

## Overview

Semantix requires at least:
- **1 LLM Provider** (Language Model) → for AI Chat and AI Assistants to understand questions and generate SQL
- **1 Embedding Provider** → for Knowledge Bases to vectorize documents (if using Knowledge Bases)

You can configure multiple Providers — each AI Assistant can select its own Provider.

---

## Supported Providers

| Provider | Model Types | Notes |
|----------|------------|-------|
| **OpenAI** | LLM + Embedding | Most popular, high quality, great multilingual support |
| **Anthropic** | LLM | Claude Sonnet/Opus — strong reasoning, low hallucination |
| **Google Gemini** | LLM + Embedding | Very long context (1M tokens), multimodal |
| **DeepSeek** | LLM | High-performance open-source model, very low cost |
| **Ollama** | LLM (local) | Self-hosted — no data leaves your server |
| **Custom / Local** | LLM | Any model with an OpenAI-compatible API |

---

## Creating a New AI Provider

### Step 1 — Open the Form

1. Go to **Studio → DSAI → AI Providers → New Provider**.
2. The configuration form appears.

### Step 2 — Fill in Basic Information

| Field | Required | Example | Description |
|-------|----------|---------|-------------|
| **Name** | Yes | `OpenAI Production` | Identifying name in Semantix |
| **Provider** | Yes | `OpenAI` | Select from the provider list |
| **API Key** | Yes | `sk-...` | API key (encrypted when saved) |
| **Base URL** | Optional | `https://api.openai.com/v1` | Only needed for Ollama or custom endpoints |
| **Active** | — | On | Toggle off to temporarily disable |

### Step 3 — Configure Capabilities

Select the feature types this Provider supports:

| Capability | Used For |
|-----------|---------|
| **LLM** | AI Chat, AI Assistants, natural language → SQL |
| **Embedding** | Knowledge Bases, semantic search |
| **Image** | Image analysis (if the model supports it) |
| **Audio** | Voice → text conversion (if supported) |

### Step 4 — Set as Default

| Setting | Meaning |
|---------|---------|
| **Default LLM** | This Provider is used by default for AI Chat when an AI Assistant doesn't specify its own Provider |
| **Default Embedding** | This Provider is used by default for Knowledge Bases when not specified |

### Step 5 — Save

Click **Save**. The Provider appears in the list.

---

## Provider-Specific Setup

### OpenAI

**Get an API Key:**
1. Log in to [platform.openai.com](https://platform.openai.com).
2. Go to **API Keys** → click **Create new secret key**.
3. Enter a name (e.g., "Semantix Production") → **Create**.
4. Copy the key immediately — it won't be shown again.

**Configure in Semantix:**

| Field | Value |
|-------|-------|
| Provider | OpenAI |
| API Key | `sk-proj-...` or `sk-...` |
| Base URL | (leave blank — uses default) |
| Capabilities | LLM ✓, Embedding ✓ |

**Popular LLM models:**
- `gpt-4o` — fast, smart, great multilingual support (recommended)
- `gpt-4o-mini` — faster, cheaper, still high quality
- `gpt-4-turbo` — 128K token context window
- `gpt-3.5-turbo` — very fast, cheapest, good for simple questions

**Embedding models:**
- `text-embedding-3-small` — fast, affordable, works well (recommended)
- `text-embedding-3-large` — higher quality, slower and more expensive

### Anthropic (Claude)

**Get an API Key:**
1. Log in to [console.anthropic.com](https://console.anthropic.com).
2. Go to **API Keys** → **Create Key**.
3. Copy the key.

**Configure:**

| Field | Value |
|-------|-------|
| Provider | Anthropic |
| API Key | `sk-ant-...` |
| Capabilities | LLM ✓ (Embedding not supported) |

**Claude models:**
- `claude-sonnet-4-5` — good balance of speed and quality (recommended)
- `claude-opus-4-7` — most powerful, best for complex analysis
- `claude-haiku-4-5` — fastest and cheapest

> Anthropic has no Embedding model — combine with OpenAI or Gemini for Knowledge Bases.

### Google Gemini

**Get an API Key:**
1. Go to [aistudio.google.com](https://aistudio.google.com).
2. Click **Get API Key** → **Create API key in new project**.
3. Copy the key.

**Configure:**

| Field | Value |
|-------|-------|
| Provider | Google Gemini |
| API Key | `AIzaSy...` |
| Capabilities | LLM ✓, Embedding ✓ |

**Models:**
- `gemini-1.5-pro` — 2M token context, most capable
- `gemini-1.5-flash` — very fast, low cost
- `gemini-2.0-flash-exp` — next generation, experimental

### DeepSeek

**Configure:**

| Field | Value |
|-------|-------|
| Provider | DeepSeek |
| API Key | Get from [platform.deepseek.com](https://platform.deepseek.com) |
| Capabilities | LLM ✓ |

**Models:**
- `deepseek-chat` — general purpose, good performance, very low cost
- `deepseek-coder` — optimized for code/SQL generation

### Ollama (Self-Hosted)

Use when you want to run models **entirely on your own server** — no data sent to the internet.

**Preparation:**
1. Install Ollama: [ollama.ai](https://ollama.ai)
2. Pull a model: `ollama pull llama3.2` or `ollama pull mistral`
3. Ollama runs on `http://localhost:11434`

**Configure in Semantix:**

| Field | Value |
|-------|-------|
| Provider | Ollama |
| API Key | (leave blank) |
| Base URL | `http://localhost:11434` or your Ollama server URL |
| Capabilities | LLM ✓ (some models support Embedding) |

**Recommended models:**
- `qwen2.5:14b` — good multilingual support
- `llama3.2:3b` — lightweight, fast
- `mistral:7b` — well-balanced

---

## Managing AI Providers

### View the List

The **Studio → DSAI → AI Providers** page shows:
- Provider name and vendor icon
- Active capabilities (LLM, Embedding...)
- Default status (Default LLM, Default Embedding)
- Active / Inactive status

### Test the Connection

Click **Test** next to a Provider to:
- Send a test request to the API
- Confirm the API Key is still valid
- Measure response time

### Update an API Key

API Keys are never shown again after saving. When you need to change one:
1. Click **Edit** on the Provider.
2. Enter the new API Key.
3. Click **Save**.

### Disable a Provider

Toggle **Active** off to pause a Provider. AI Assistants using this Provider will report errors until it's re-enabled or they are switched to another Provider.

---

## Security Notes

- API Keys are encrypted with **AES-256** when stored in the database — no one can read the original key.
- Never share API Keys via email, chat, or git commits.
- Set a **spending limit** on your OpenAI/Anthropic/Gemini account to prevent unexpected costs.
- For sensitive data, use Ollama (self-hosted) so no data leaves your network.

---

## Recommended Configurations

### Basic Setup (1 Provider)

```
Provider: OpenAI
Capabilities: LLM ✓, Embedding ✓
Default LLM: Yes
Default Embedding: Yes
AI Assistant model: gpt-4o
Embedding model: text-embedding-3-small
```

### Optimal Setup (2 Providers)

```
Provider 1: OpenAI
  Capabilities: LLM ✓, Embedding ✓
  Default Embedding: Yes (for Knowledge Bases)

Provider 2: Anthropic
  Capabilities: LLM ✓
  Default LLM: Yes (for AI Chat by default)
  → Use Claude for complex analysis

Provider 3 (optional): Gemini Flash
  Capabilities: LLM ✓
  → For AI Assistants needing speed and low cost
```

### High-Security Setup (On-Premises)

```
Provider: Ollama (running on internal server)
Base URL: http://ollama.internal:11434
Capabilities: LLM ✓
→ All AI processing occurs within your internal network
→ Data never leaves your organization's systems
```
