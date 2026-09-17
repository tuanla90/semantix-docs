# User Memory & Personalization

**User Memory** enables the Semantix AI Assistant to understand and adapt to your personal working style and analytical habits across chat sessions. Instead of repeatedly specifying preferences such as *"show currency in millions"* or *"keep answers concise"* every time you start a conversation, the assistant automatically retains your preferences and applies them consistently without complex manual configuration.

---

## 1. Design Philosophy: Work Preferences, Not Personality Profiles

Unlike conventional AI systems that attempt to infer sentiment, psychographic attributes, or emotional states, Semantix operates under a strict ethical and architectural principle:

> [!IMPORTANT]
> **Core Philosophy**: Semantix User Memory **only records presentation preferences and analytical business habits**. The system **strictly NEVER infers, evaluates, or stores** personal traits, emotional states, psychological profiles, or human behavioral judgments.

This guardrail is enforced at the server level through strict code-level validation:
* Every piece of remembered data must pass through a strict **whitelist** verified by hardcoded application logic (`validateMemoryEntry`).
* Any attempt to store unlisted attributes—whether inferred autonomously by an LLM or injected via user prompts—is immediately rejected.
* User Memory serves a single, dedicated objective: **Ensuring reports and AI responses match your operational needs from the very first prompt.**

---

## 2. Whitelist of 5 Core Preferences

The system defines an immutable, standardized whitelist of 5 core presentation preferences:

| Preference Key | Description | Valid Values | Default Value |
|----------------|-------------|--------------|---------------|
| `answerLanguage` | Preferred language for assistant responses | `vi` (Vietnamese), `en` (English) | Auto-detected from UI locale |
| `numberScale` | Unit scale for abbreviating currency and large quantities | `full` (raw), `thousand` (K), `million` (M), `billion` (B) | `full` |
| `defaultPeriod` | Default timeframe when query does not specify dates | `day` (today), `week` (this week), `month` (this month), `quarter` (this quarter), `year` (this year) | `month` |
| `detailLevel` | Depth and granularity of assistant responses | `brief` (concise conclusion), `standard` (balanced), `detailed` (in-depth breakdown) | `standard` |
| `preferredChart` | Preferred visualization chart type | `bar`, `line`, `area`, `pie`, `pivot_table`, `scorecard` | Context-dependent |

### Real-World Impact of Stored Preferences

Consider a concise question: *"How is revenue performing recently?"*

* **Without User Memory:**
  > "Revenue for September 2026 reached $15,420,500.00, representing an 8.2% increase compared to August 2026. Below is a detailed breakdown across product categories..." *(followed by an extensive data table)*.
* **With Active Memory (`numberScale: million`, `detailLevel: brief`, `preferredChart: scorecard`):**
  > "Monthly revenue reached **$15.42M** (▲ 8.2% vs. last month)." *(rendered as a single KPI Scorecard widget)*.

---

## 3. Deterministic Habit Accumulation (`accumulateHabit`)

Beyond preferences explicitly declared by the user, Semantix automatically discovers your most frequently queried metrics and dimensions using a **deterministic habit accumulation** engine.

```
[Chat Session #1] ───┐
                     ├──> Tally Session Frequency ──> Rank Top 10 ──> Auto-prune after 90 days
[Chat Session #2] ───┘    (Anti-duplication)         (Sessions & Recency) (Inferred Pruning)
```

### Operational Architecture

1. **Fully Deterministic, Zero LLM Calls**:
   - The engine does not rely on generative AI to guess what you like. Instead, it deterministically counts distinct operational sessions (`sessions`) where you query specific metrics (`frequentMetrics`) or dimensions (`frequentDimensions`).
2. **Session Anti-Duplication (`recentSessions`)**:
   - If you query the metric "Net Revenue" 5 times within the same session, it counts as only **1 session**.
   - Semantix tracks up to 5 recent session IDs to ensure habits reflect enduring analytical patterns rather than temporary drill-down investigations.
3. **Capacity Limits and Ranking**:
   - Capped at **10 items** per habit group.
   - Priority ranking: Items appearing across **more distinct sessions** rank higher; ties are broken by **most recent access** (`lastSeen`).
4. **Natural Forgetting Mechanism (`pruneForgotten`)**:
   - System-inferred habits (`source = 'inferred'`) are automatically pruned and deleted if unreferenced for **90 days** (`INFERRED_FORGET_DAYS = 90`).
   - This ensures memory stays fresh and prevents outdated projects or historical queries from polluting current analytics.

---

## 4. Direct User Instructions via Chat (`remember_preference`)

You do not need to navigate to settings to configure how the assistant responds. You can instruct the AI directly in conversational natural language:

### Example Interaction

```text
User: "From now on, please answer in concise English and format monetary amounts in millions."
```

Upon receiving this instruction, Semantix triggers the dedicated `remember_preference` tool to persist preferences directly with an explicit source flag (`source: 'explicit'`):
* `answerLanguage`: `"en"`
* `detailLevel`: `"brief"`
* `numberScale`: `"million"`

The assistant confirms immediately:
> *"Preference saved! Going forward, I will provide concise responses in English with monetary values scaled in millions."*

> [!TIP]
> **Priority of Explicit Preferences**: User-directed explicit preferences hold top priority. They instantly overwrite system-inferred habits and **never expire or get pruned** by the 90-day forgetting rule. They remain active until you provide a new instruction or delete them in the settings UI.

---

## 5. Memory Management in the Profile UI

Users retain complete visibility and granular control over all stored memory items.

### Accessing the "My Memory" Tab

1. Click your avatar or profile name in the bottom-left corner of the sidebar.
2. Select **Profile Settings**.
3. Navigate to the **User Memory** tab.

```
┌────────────────────────────────────────────────────────────────────────┐
│ Profile Settings  >  User Memory                                       │
├────────────────────────────────────────────────────────────────────────┤
│ Feature Status: [ ENABLED / DISABLED MASTER TOGGLE ]                   │
│                                                                        │
│ ⚙️ PRESENTATION PREFERENCES (EXPLICIT)                                 │
│ ┌──────────────────────┬──────────────────────┬──────────────────────┐ │
│ │ Response Language    │ Number Scaling       │ Detail Level         │ │
│ │ [ English         ▾] │ [ Millions ($M)   ▾] │ [ Brief           ▾] │ │
│ └──────────────────────┴──────────────────────┴──────────────────────┘ │
│                                                                        │
│ 📊 LEARNED ANALYTICAL HABITS (INFERRED)                                │
│ • Frequent Metrics:    Net Revenue (12 sessions), Order Count (8 sessions)│
│ • Frequent Dimensions: Branch (9 sessions), Channel (6 sessions)       │
│                                                                        │
│ [ Delete Single Item ]                             [ Clear All Memory ]│
└────────────────────────────────────────────────────────────────────────┘
```

### Available Management Actions

* **Master Enable / Disable Toggle**:
  - Toggle `Enable User Memory`. When switched off, the assistant functions in standard baseline mode and ignores all personalized preferences and habits.
* **Edit Preferences**:
  - Use dropdown controls to modify preferred scales, languages, or default time grains directly.
* **Delete Individual Entries**:
  - Click the trash icon adjacent to any metric, dimension, or preference to delete that specific entry.
* **Clear All Memory**:
  - Permanently clears all explicit preferences and learned habits, resetting memory to factory defaults.

---

## 6. Enterprise Isolation & Privacy Architecture

Semantix adheres to enterprise-grade security standards to safeguard user privacy:

### Strict Multi-Tenant & User Boundaries
* Memory records are strictly isolated and keyed to each unique individual identifier (`userId`).
* User A's memory **never leaks** into User B's operational context, even when both collaborate within the same workspace, organization, or analytical project.

### Admin Impersonation Safety Gate ("View As" Lock)
For troubleshooting and technical support, administrators may use the "View As / Impersonate User" capability. When active:

> [!CAUTION]
> **Complete Memory Lock During Impersonation**: While impersonation mode is engaged, Semantix **completely locks** the memory layer:
> 1. The AI Assistant **does not read** any preferences or habits belonging to the impersonated user.
> 2. Administrator chat sessions **cannot write or mutate** any records in the user's memory repository.

This guarantees absolute data privacy for team members and prevents admin testing from distorting real user analytical profiles.

---

## 7. Quick Reference Prompt Commands

| Goal | Sample Prompt |
|------|---------------|
| Adjust currency number scale | *"From now on, please format all monetary amounts in millions."* |
| Request executive summary style | *"Keep answers concise and highlight key conclusions only."* |
| Require in-depth breakdown | *"Provide detailed analyses with root-cause explanations on each query."* |
| Default to quarterly timeframe | *"Unless I specify otherwise, default analysis to the current quarter."* |
| Prioritize bar charts | *"I prefer visualizing comparative data using Bar Charts."* |
| Reset specific preference | *"Forget my previous preference regarding number scaling."* |
