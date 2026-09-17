# SQL Leak Prevention & Technical Redaction

An in-depth guide to Semantix's security architecture for protecting internal SQL queries, proprietary business calculation formulas, and technical engine metadata.

---

## 1. Architectural Overview

In financial institutions, banking environments, and enterprise organizations, **SQL code is intellectual property and a business secret**, encompassing:
- Proprietary KPI calculations, non-performing loan (NPL) formulas, net interest margin (NIM) definitions, and risk models.
- Physical database topology (internal schema names, physical table names, foreign key relationships, and sensitive column identifiers).
- Row-Level Security (RLS) partition constraints and tenant isolation logic.

Semantix implements a multi-layered defense-in-depth pipeline to ensure that SQL statements, model reasoning traces, and execution artifacts are never exposed to unauthorized audiences:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       SEMANTIX SQL REDACTION PIPELINE                       │
├─────────────────────────────────────────────────────────────────────────────┤
│  1. Access Control Gate: `view_context`                                     │
│     • Session check: Has `view_context` or super-admin `*`?                 │
│     • Granted    ──▶ Return full payload: SQL + Reasoning + Engine Errors   │
│     • Denied     ──▶ Activate Redaction Engine (Removed / Sealed tokens)    │
├─────────────────────────────────────────────────────────────────────────────┤
│  2. Chat Session & Collaboration Sanitization (Agentic & Structured Chat)   │
│     • Strips technical fields: `sql`, `code`, `reasoning`, `verifySql`      │
│     • Sanitizes engine errors to safe generic messages                      │
├─────────────────────────────────────────────────────────────────────────────┤
│  3. Export Sanitization (PowerPoint, Excel, Image & Clipboard)              │
│     • Purges CTEs, prompt traces, and query metadata                        │
│     • Retains strictly business metrics, data tables, and visualizations    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. The `view_context` Permission Gatekeeper

### 2.1. Definition and Operating Principles
The `view_context` permission is the core technical boundary in Semantix's RBAC catalog (`lib/permissions/catalog.ts`):

- **Users with `view_context` (or Super Admin `*`)**: Permitted to inspect all underlying technical artifacts: executed SQL (`executedSql`), self-repaired SQL (`repairedSql`), generated Python data manipulation scripts, internal model reasoning traces (`reasoning`), and verbose database engine error diagnostics.
- **Users without `view_context` (e.g., `Viewer`, `Business User`, external embed clients)**: The interface and API responses completely redact all technical artifacts. Users interact exclusively with business analytics answers, aggregated KPI summaries, and interactive charts.

### 2.2. Server-Side Enforcement
Technical detail redaction is never delegated to client-side CSS or UI toggles; it is enforced 100% on the server before payloads leave the API boundary (`lib/chat/technical-details-access.ts`):

```typescript
// Evaluate technical access permissions on the current session
export function sessionCanSeeChatTechnicalDetails(session: Session | null): boolean {
    const permissions = session?.user?.permissions || [];
    // Super-admin (*) or explicit view_context permission
    return permissions.includes("*") || permissions.includes("view_context");
}
```

> [!NOTE]
> When an Administrator utilizes the "View As" feature to impersonate another user role (e.g., testing as a `Viewer`), the system swaps the active permission context. The administrator's view is subjected to identical SQL redaction rules as an authentic business viewer.

### 2.3. Removed vs. Sealed Modes
When a user lacks `view_context`, technical artifacts are processed through one of two server-side sanitization strategies (`lib/chat/agentic-technical-redaction.ts`):

| Mode | Target Audience | Processing Mechanism |
|---|---|---|
| **Removed** | Public share links, colleagues viewing shared chats | Technical keys (`sql`, `code`, `reasoning`) are completely purged from the JSON response before leaving the server. They cannot be recovered from browser memory, DOM, or Network inspection. |
| **Sealed** | Session owner who lacks technical permissions | The executed SQL is encrypted into an **opaque sealed token**. The client application can echo this sealed token back to the server to pin widgets to dashboards or trigger query re-execution, but the browser client cannot decrypt or inspect the raw SQL string. |

### 2.4. Database Engine Error Sanitization
Native database engine errors often leak physical schema names, data types, column constraints, or RLS conditions. Semantix intercepts raw engine errors and replaces them with a standardized, safe error mask:

```typescript
// Raw database errors containing internal schema details are replaced with:
export const HIDDEN_TOOL_ERROR = 
  'This step failed. Technical details are hidden for your role.';
```

Only standardized, whitelisted business validation errors are permitted to display to unprivileged users, such as:
- *"Only read-only queries are allowed. Data-modifying statements are forbidden."*
- *"Only SELECT or WITH queries are allowed."*
- *"Multiple SQL statements are not allowed."*

---

## 3. Chat Session Sharing & Collaboration Protection

When an analyst shares an analysis session via a public link or invites colleagues into a shared thread, the server-side redaction pipeline (`redactChatMessages`) triggers automatically.

### 3.1. Absolute Redaction Key Catalog
The following keys are permanently stripped from the JSON response payload before transmission to viewers lacking `view_context`:

```json
[
  "sql",
  "sqlQuery",
  "rawSql",
  "customSql",
  "executedSql",
  "generatedSql",
  "repairedSql",
  "repairNote",
  "verifySql",
  "threeLayerSpecNote",
  "code",
  "consoleLogs",
  "reasoning"
]
```

### 3.2. Component-Level Sanitization Breakdown
1. **Agentic Result Turns (`Agentic Result Content`)**:
   - The `reasoning` attribute (where the model describes table joins, schema traversal, and filtering logic) is removed.
   - Tool calls (`toolCalls`) are traversed: technical inputs (`redactAgenticToolInput`) and technical outputs (`redactAgenticToolOutput`) are stripped.
   - The `verifySql` field within cross-check answer objects (`cross_check_answer`) is purged.
2. **Standard Analysis Cards**:
   - Plan cards (`analysis_plan`): `sqlPreview` and debug specs are removed.
   - Data table cards (`data_table`): `metadata.sql` is purged.
   - Query error cards (`query_error`): Raw `sql` expressions are redacted.
3. **Message-Level Metadata (`message.metadata`)**:
   - JSON strings containing chart query definitions or debug traces are sanitized before serialization.

### 3.3. Payload Comparison: Server vs. Client Viewer

**Server Payload (For Data Engineers with `view_context`):**
```json
{
  "role": "assistant",
  "content": {
    "text": "Quarter 3 revenue for the Singapore branch reached $12,500,000.",
    "reasoning": "Querying core_banking.fact_transactions joined with dim_branches where branch_code = 'SG_01'...",
    "toolCalls": [
      {
        "tool": "execute_query",
        "input": {
          "sql": "SELECT SUM(amount) AS rev FROM core_banking.fact_transactions WHERE branch_id = 'SG_01' AND qtr = '2026-Q3'"
        },
        "result": {
          "data": [{ "rev": 12500000 }],
          "sql": "SELECT SUM(amount) AS rev..."
        }
      }
    ]
  }
}
```

**Client Payload (For Business Viewers without `view_context`):**
```json
{
  "role": "assistant",
  "content": {
    "text": "Quarter 3 revenue for the Singapore branch reached $12,500,000.",
    "toolCalls": [
      {
        "tool": "execute_query",
        "input": {},
        "result": {
          "data": [{ "rev": 12500000 }]
        }
      }
    ]
  }
}
```

---

## 4. Export Sanitization (PowerPoint, Excel & Images)

When generating exports for external reporting or office productivity tools, Semantix enforces strict metadata sanitization:

### 4.1. PowerPoint (.pptx) Presentations
- Slide generation embeds strictly:
  - Executive summaries and analytical narrative titles.
  - High-resolution chart visuals (Vector SVG / 2x PNG rendering).
  - Aggregated KPI metrics and summarized tables.
- **Strictly Excluded**: Raw SQL code blocks, internal CTE expressions, connection aliases, and LLM system prompts.

### 4.2. Excel Spreadsheets (.xlsx / .csv)
- Generated workbooks include only the computed tabular result set.
- Sensitive query metadata (`metadata.sqlQuery`) and system annotations are stripped prior to workbook compilation.
- Workbooks contain no hidden worksheets, cell notes, or document metadata properties containing SQL strings.

### 4.3. Image & Clipboard Exports (DOM & Chart Snapshots)
- The export snapshot engine (`exportDOMAsImage` / `exportEChartsAsImage`) applies an automated exclusion filter:
  - Action button toolbars (`widget-action-buttons`), debug popovers, tooltips, and drawer drawers are removed from the capture tree.
  - Only clean visualization surfaces and metric cards are rendered to image buffers, preventing accidental capture of open SQL inspect panels.

---

## 5. Administrator Configuration Guide

To configure SQL leak prevention across roles in your enterprise:

1. Navigate to **Admin → Users & Roles → Roles & Permissions**.
2. Select an existing role or click **Create Role** (e.g., `Executive Viewer` or `External Partner`).
3. Set permissions according to function:
   - **Disable `view_context`**: Users in this role cannot inspect SQL in Chat, Dashboards, Embeds, or Export files.
   - **Enable `view:dashboards` & `use:chat`**: Users can ask natural language questions, view insights, and interact with visual dashboards.
4. Click **Save Role**.

### Recommended `view_context` Permission Matrix

| Enterprise Persona | Require `view_context`? | Strategic Rationale |
|---|:---:|---|
| **C-Suite & Executives** | ❌ No | Focus on high-level KPIs; eliminates UI clutter and prevents accidental schema disclosure |
| **Branch / Business Unit Staff** | ❌ No | Restricts knowledge of underlying database architecture and proprietary calculation logic |
| **External Partners & Clients (Embed)** | ❌ No | Critical security boundary; prevents extraction of proprietary business rules |
| **Data Analysts & BI Specialists** | ✅ Yes | Required to audit formula translations, join logic, and model accuracy |
| **Data Engineers & DBAs** | ✅ Yes | Required to inspect indexing performance, CTE execution plans, and query optimization |
| **External Security Auditors** | Optional | Enabled temporarily on audited time-bound accounts for compliance verification |

---

## 6. Pre-Go-Live Audit Checklist

Before production release or formal SecOps sign-off, verify the following:

- [ ] Business roles (`Viewer`, `Business User`, external roles) have `view_context` explicitly unchecked.
- [ ] Public share links opened in an incognito browser show no "View SQL", "Inspect", or CTE inspect options.
- [ ] Browser Developer Tools (Network tab) verify that zero keys from the `TECHNICAL_KEYS` catalog appear in response JSON.
- [ ] Exported `.pptx` and `.xlsx` files contain no hidden comments, invisible cells, or metadata properties containing SQL queries.
- [ ] Simulated database query errors render the safe `HIDDEN_TOOL_ERROR` message to non-technical users.
