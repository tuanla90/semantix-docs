# Knowledge Bases

**Navigate to:** Studio → DSAI → Knowledge Bases

A Knowledge Base is a collection of internal documents (PDFs, Word files, text...) that are **vectorized** and stored so AI Assistants can search and answer questions based on document content — in addition to their standard database analytics capabilities.

---

## When Do You Need a Knowledge Base?

| Situation | Example |
|-----------|---------|
| **Internal processes and policies** | "Leave policy", "New employee onboarding procedure" |
| **Product documentation** | "Product user guide", "Customer FAQ" |
| **Technical documents** | "API documentation", "System operations manual" |
| **Reports and analysis** | "Market research 2024", "Competitive analysis" |
| **Legal and contracts** | "Terms of service", "Privacy policy" |

**Key advantage:** Combining a Knowledge Base + Database in the same AI Assistant enables hybrid questions like *"According to current policy, what revenue threshold qualifies a customer as VIP?"* — the AI reads the policy from the Knowledge Base and retrieves the numbers from the database.

---

## Prerequisites

You must have at least one **AI Provider with `Embedding` capability** active. The Embedding model converts documents into vectors for storage.

See [AI Providers](ai-providers.md) for setup.

**Supported embedding models:**
- OpenAI: `text-embedding-3-small`, `text-embedding-3-large`, `text-embedding-ada-002`
- Google: `text-embedding-004`, `embedding-001`
- Ollama: local embedding models

---

## Creating a New Knowledge Base

### Step 1 — Initialize

1. Go to **Studio → DSAI → Knowledge Bases → New Knowledge Base**.
2. Fill in the basic information:

| Property | Required | Example |
|----------|----------|---------|
| **Name** | Yes | `HR Policies 2024` |
| **Description** | Recommended | `Contains policies on leave, compensation, discipline, and benefits for employees. Updated January 2024.` |
| **Embedding Provider** | Yes | Select an AI Provider with Embedding capability |

3. Click **Save**.

### Step 2 — Add Documents

There are 3 ways to add documents to a Knowledge Base:

**Method 1 — Upload File:**
1. Click **Add Document → Upload File**.
2. Select a file from your computer (supported: PDF, DOCX, TXT, MD, HTML).
3. Add a descriptive name for the document (optional).
4. Click **Upload**.

**Supported file formats:**

| Format | Notes |
|--------|-------|
| `.pdf` | Best support — handles both text and tables |
| `.docx` | Word 2007 and later |
| `.txt` | Plain text, UTF-8 encoding |
| `.md` | Markdown |
| `.html` | Extracts text content only, ignores CSS/JS |

**Method 2 — Add a URL:**
1. Click **Add Document → Add URL**.
2. Enter the URL of the webpage to read.
3. Semantix will crawl the page content.

**Method 3 — Enter Text Directly:**
1. Click **Add Document → Enter Text**.
2. Type or paste the text content.
3. Add a title.
4. Click **Save**.

### Step 3 — Sync

After adding documents, click **Sync** to vectorize the content:

1. Click the **Sync** button (or **Sync All** if multiple documents are unsynced).
2. Status changes to **Syncing** — time depends on document size.
3. When complete, status changes to **Synced**.

**Estimated sync times:**
- 10-page PDF: ~10–30 seconds
- 100-page PDF: ~2–5 minutes
- Multiple files at once: run in parallel, faster overall

---

## Document Status

| Status | Icon | Meaning |
|--------|------|---------|
| **Pending** | ⏳ | Added but not yet synced |
| **Syncing** | 🔄 | Processing and vectorizing |
| **Synced** | ✅ | Complete — AI can search it |
| **Error** | ❌ | An error occurred during processing |
| **Outdated** | ⚠️ | Document was updated, needs re-sync |

---

## Linking a Knowledge Base to an AI Assistant

1. Go to **Studio → DSAI → AI Assistants** → select the Assistant.
2. In the configuration, find the **Knowledge Bases** section.
3. Click **Add** → select one or more Knowledge Bases.
4. Click **Save**.

From now on, when users chat with that Assistant, the AI will **automatically search** both the database and the Knowledge Base documents when answering — users don't need to specify the source.

**Example interaction:**

```
User: "Do new employees qualify for a year-end bonus?"
AI: [Searches Knowledge Base "HR Policies 2024"]
    "According to company policy, employees must have worked for at least 
    3 months before the year-end bonus date to qualify. Eligible employees 
    receive a bonus equivalent to 1 month of base salary..."

User: "How many employees currently qualify?"
AI: [Queries database] "Currently 87 employees have worked more than 3 months 
    and qualify for the year-end bonus."
```

---

## Updating Documents

When the source document changes:

1. Delete the old document (or upload the new version).
2. Click **Sync** to update the vectors.

> **Important:** Only click Sync after adding or updating documents. The AI can only search content that has been synced — newly uploaded documents that haven't been synced will not be accessible to the AI.

---

## Deleting Documents

1. In the document list, click **⋮** next to the document to delete.
2. Select **Delete**.
3. The document is removed from the Knowledge Base (both the original file and its vectors).
4. No re-sync needed — deletion takes effect immediately.

---

## Knowledge Base Permissions

| Permission | Allows |
|------------|--------|
| `create_knowledge` | Create new Knowledge Bases |
| `edit_knowledge` | Add, delete documents, Sync |
| `delete_knowledge` | Delete the entire Knowledge Base |

Users without these permissions can still **use an AI Assistant** that has a Knowledge Base linked — they ask, the AI searches and answers.

---

## Best Practices

### 1. Organize by Topic

Create multiple smaller Knowledge Bases by topic rather than one giant one:
- `HR - Policies` (labor policies, leave, compensation)
- `HR - Onboarding` (new employee guides)
- `IT - User Guides` (internal system documentation)
- `Product - FAQ` (common customer questions)

### 2. Write Clear Documents

The AI searches based on text content. Documents with clear structure (headings, bullet points, tables) are better understood and cited by the AI.

### 3. Update Regularly

Schedule reviews and updates to each Knowledge Base at least quarterly. Outdated documents cause the AI to give wrong answers.

### 4. Write a Thorough Description

A good Description helps the AI know when to search this Knowledge Base. Example: *"Contains current HR policies as of January 2024. Search when there are questions about leave, salary, bonuses, or discipline."*

---

## Troubleshooting

| Problem | Cause | Resolution |
|---------|-------|-----------|
| Status stuck at "Syncing" | Server busy or file too large | Wait longer or try Sync again in 5 minutes |
| Status shows "Error" | Corrupted file or unsupported format | Check the original file, try re-exporting as PDF |
| AI can't find information | Not synced, or content isn't in the documents | Check Sync status, verify document content |
| AI gives wrong answer despite having documents | Documents are ambiguous or contradictory | Review and clarify document content |
| "Embedding Provider not found" | No AI Provider with Embedding created | Create an AI Provider and enable Embedding capability |
