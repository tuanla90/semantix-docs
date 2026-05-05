# Architecture & Data Security

Enterprise data security is our top priority. Semantix is designed with a strict **Zero Data Retention** architecture, ensuring your business data remains under your control at all times.

## How the AI Reads Your Data

One of the most common questions from IT teams is: *"Does Semantix send my company's data to OpenAI/LLMs?"*

**The answer is NO.**

Semantix uses an advanced technique called **Schema-Only Retrieval Augmented Generation (RAG)**:
1. **Metadata Only:** When you create a Data Model, Semantix only reads the *schema* (table names, column names, data types) and your custom descriptions.
2. **No Row Data Sent:** The AI is never exposed to the actual rows of data in your database. It uses the schema and context descriptions to generate a SQL query.
3. **Execution on Your DB:** The generated SQL query is executed directly against your database, and the results are returned directly to the user's browser. The LLM never sees the query results.

## Credential Encryption

All sensitive connection credentials (database passwords, API keys, service account JSONs) are encrypted at rest using **AES-256-GCM** encryption before being saved to the Semantix database.

- The encryption key (`ENCRYPTION_KEY` environment variable) is stored exclusively on your server.
- Passwords are never exposed in any API response or frontend interface. Once a password is saved, it cannot be retrieved, only overwritten.

## Single Sign-On (SSO) & Access Control

Semantix integrates seamlessly with your existing identity providers:
- **SAML 2.0:** Microsoft Entra ID (Azure AD), Okta, JumpCloud, etc.
- **OIDC:** Google Workspace, Auth0.
- **Role-Based Access Control (RBAC):** Restrict access to specific dashboards, connections, or contexts based on user roles.

## Audit Logs

Every action performed within Semantix is logged in an immutable audit trail. This includes:
- Failed login attempts
- Changes to database connections
- Edits to Data Models or Metrics
- Generated SQL queries and who executed them

You can export these logs to your SIEM system for compliance monitoring.
