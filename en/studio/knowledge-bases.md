# Knowledge Bases

**Navigate to:** Studio → DSAI → Knowledge Bases

Knowledge Bases are collections of internal documents (PDFs, Word files, text...) vectorized so AI Assistants can search and answer questions based on document content — in addition to their standard database analytics capabilities.

## Purpose

- Allow AI to answer questions about internal processes, policies, technical docs
- Combine structured data (database) with unstructured content (documents)
- Build knowledge chatbots for HR, IT, Legal, and other departments

## Create a New Knowledge Base

1. Go to **Studio → DSAI → Knowledge Bases → New Knowledge Base**
2. Fill in:

| Field | Description |
|-------|-------------|
| **Name** | Knowledge Base name (e.g., "HR Policies 2024") |
| **Description** | Content description |
| **Embedding Provider** | Select an AI Provider with `Embedding` capability |

3. Click **Save**
4. Add documents to the Knowledge Base (upload files or add URLs)
5. Click **Sync** to vectorize the documents

## Sync Status

| Status | Meaning |
|--------|---------|
| **Idle** | Not yet synced or waiting |
| **Syncing** | Processing and vectorizing documents |
| **Synced** | Complete, ready to use |
| **Error** | An error occurred during sync |

## Linking to an AI Assistant

1. Open the AI Assistant to link (Studio → DSAI → AI Assistants → select Assistant)
2. In the configuration, select one or more Knowledge Bases
3. Save

Once linked, when users chat with that Assistant, AI will search both the database and the documents in the Knowledge Base.

## Notes

- An active Embedding Provider is required before creating a Knowledge Base.
- Re-sync after updating documents to refresh the vectors.
- Permissions: `create_knowledge`, `edit_knowledge`, `delete_knowledge`.
