# AI Providers

**Navigate to:** Studio → DSAI → AI Providers

AI Providers manages the LLM and embedding model integrations connected to Semantix. Each provider requires an API key and can be designated as the default for specific capabilities.

## Supported Providers

| Provider | Model Types |
|----------|------------|
| **OpenAI** | LLM (GPT-4, GPT-4o...) + Embedding |
| **Anthropic** | LLM (Claude Sonnet, Opus...) |
| **Google Gemini** | LLM (Gemini Pro, Flash...) + Embedding |
| **DeepSeek** | LLM |
| **Ollama** | Local LLM (self-hosted) |
| **Local / Custom** | Self-hosted models with OpenAI-compatible API |

## Create a New AI Provider

1. Go to **Studio → DSAI → AI Providers → New Provider**
2. Fill in:

| Field | Description |
|-------|-------------|
| **Name** | Identifying name (e.g., `OpenAI Production`) |
| **Provider** | Select the provider |
| **API Key** | API key (encrypted on save) |
| **Base URL** | Endpoint URL (needed for Ollama or custom endpoints) |
| **Capabilities** | Select: `LLM`, `Embedding`, `Image`, `Audio` |
| **Default LLM** | Set as the default language model |
| **Default Embedding** | Set as the default embedding model |
| **Active** | Enable/disable this provider |

3. Click **Save**

## Recommended Setup

- At least **1 active LLM provider** is required for AI Chat and AI Assistants to work.
- At least **1 active Embedding provider** is required for Knowledge Bases to work.
- Multiple providers can be configured — each AI Assistant selects its own provider.

## Security Note

API keys are encrypted and never displayed again after saving. To update a key, you must re-enter it.
