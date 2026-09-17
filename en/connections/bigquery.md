# Google BigQuery

A comprehensive guide for connecting Google BigQuery to Semantix via enterprise-grade Workload Identity Federation (WIF) / Application Default Credentials (ADC) without static JSON key files, or via a Google Apps Script proxy.

---

## Connection Methods Comparison

Semantix supports two distinct connection methods for Google BigQuery:

| Feature / Criteria | 1. Workload Identity Federation (WIF) / ADC | 2. Google Apps Script Proxy |
|---|---|---|
| **Target Deployment** | Enterprise, Banking, On-Premises | Small teams, Personal Google Workspace |
| **Security Standard** | **Banking-Grade** — Zero static keys, short-lived tokens | Standard — Uses personal/service Google account |
| **Auth Mechanism** | OIDC Token Exchange / STS Impersonation | Webhook Web App |
| **Static JSON Key File** | **Never stored or uploaded to server** | No key file required |
| **Supported Infrastructure** | Kubernetes, On-Premises Docker, GCP VM | Any environment with internet connectivity |

---

## Method 1: Workload Identity Federation (WIF) / ADC (Enterprise Recommended)

Designed for Semantix instances deployed on bare-metal servers, on-premises Kubernetes clusters, or enterprise private clouds where **storing static JSON Service Account Keys is strictly forbidden** by corporate security policies.

### 1. Keyless Authentication Architecture

```
┌─ Enterprise / Banking On-Premises Host ────────────────────┐
│                                                           │
│  ┌─ Semantix Node ──┐      ┌─ Python Worker ─┐            │
│  │ BigQuery Client  │      │ google-auth     │            │
│  │ (ADC)            │      │ (ADC)           │            │
│  └────────┬─────────┘      └────────┬────────┘            │
│           └───────────┬─────────────┘                     │
│     GOOGLE_APPLICATION_CREDENTIALS=/secrets/wif.json       │
│        (external_account configuration, contains no key)   │
│                       │                                   │
│  /secrets/oidc-token.jwt ◀── Cron refresh from internal IdP│
│           │                                               │
└───────────┼───────────────────────────────────────────────┘
            │
    (1) Transmit internal OIDC JWT
            ▼
    Google Security Token Service (sts.googleapis.com)
            │
    (2) Exchange for Federated Access Token
            ▼
    IAM Credentials Service (iamcredentials.googleapis.com)
            │
    (3) Impersonate target GCP Service Account
            ▼
    BigQuery API (bigquery.googleapis.com)
```

**Operating Workflow:**
1. Your corporate IdP (Keycloak, Microsoft Entra ID / ADFS, PingFederate, Okta) issues a short-lived OIDC JWT to the Semantix server via the OAuth2 `client_credentials` flow.
2. The Google ADC client library automatically forwards this internal token to Google STS to validate workload identity.
3. STS exchanges the token for a short-lived federated token and impersonates a GCP Service Account provisioned with Least Privilege permissions.
4. No private keys exist on disk; access tokens automatically rotate every 30–60 minutes.

---

### 2. Google Cloud Platform (GCP) Configuration

Define your configuration variables:
```bash
export PROJECT_ID="bank-analytics-prod"
export PROJECT_NUMBER="123456789012" # Obtain via: gcloud projects describe $PROJECT_ID
export POOL_ID="semantix-onprem-pool"
export PROVIDER_ID="bank-idp-provider"
export SA_EMAIL="semantix-bq@${PROJECT_ID}.iam.gserviceaccount.com"
export IDP_ISSUER="https://idp.bank.internal/realms/semantix"
```

#### Step 2.1: Enable Required Google Cloud APIs
```bash
gcloud services enable \
  iam.googleapis.com \
  iamcredentials.googleapis.com \
  sts.googleapis.com \
  bigquery.googleapis.com \
  aiplatform.googleapis.com \
  --project=$PROJECT_ID
```

#### Step 2.2: Create Workload Identity Pool & OIDC Provider
```bash
# Create Identity Pool
gcloud iam workload-identity-pools create $POOL_ID \
  --project=$PROJECT_ID --location=global \
  --display-name="Semantix On-Prem Pool"

# Create OIDC Provider with strict attribute conditions
gcloud iam workload-identity-pools providers create-oidc $PROVIDER_ID \
  --project=$PROJECT_ID --location=global \
  --workload-identity-pool=$POOL_ID \
  --display-name="Bank IdP Provider" \
  --issuer-uri="$IDP_ISSUER" \
  --attribute-mapping="google.subject=assertion.sub" \
  --attribute-condition="assertion.sub=='semantix-workload'"
```

> [!IMPORTANT]
> `--attribute-condition` is a mandatory security perimeter: It guarantees that only tokens with `sub` matching your Semantix workload (`semantix-workload`) can authenticate, blocking other internal clients in your corporate IdP from misusing this pool.

#### Step 2.3: Create Service Account and Grant Least Privilege
```bash
# Create the runtime Service Account
gcloud iam service-accounts create semantix-bq \
  --project=$PROJECT_ID \
  --display-name="Semantix BigQuery Runtime"

# Grant permission to execute query jobs at the project level
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/bigquery.jobUser"

# Grant read-only data access strictly on the authorized dataset
bq add-iam-policy-binding \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/bigquery.dataViewer" \
  ${PROJECT_ID}:core_banking_analytics
```

#### Step 2.4: Allow Federated Identity to Impersonate the Service Account
```bash
gcloud iam service-accounts add-iam-policy-binding $SA_EMAIL \
  --project=$PROJECT_ID \
  --role="roles/iam.workloadIdentityUser" \
  --member="principal://iam.googleapis.com/projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${POOL_ID}/subject/semantix-workload"
```

#### Step 2.5: Generate Credential Configuration File
```bash
gcloud iam workload-identity-pools create-cred-config \
  projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${POOL_ID}/providers/${PROVIDER_ID} \
  --service-account=$SA_EMAIL \
  --service-account-token-lifetime-seconds=3600 \
  --credential-source-file=/secrets/oidc-token.jwt \
  --credential-source-type=text \
  --output-file=wif-credential-config.json
```

*The generated `wif-credential-config.json` contains only public identity descriptors, with zero private keys. It is safe to commit to version control or configuration repositories.*

---

### 3. Enterprise On-Premises Host Setup

#### Step 3.1: Periodic OIDC Token Refresh Script
Set up a systemd timer or cron job running every 30 minutes to fetch a fresh token from your corporate IdP:

```bash
#!/usr/bin/env bash
# /opt/semantix/refresh-oidc-token.sh
set -euo pipefail

# Request fresh token using OAuth2 Client Credentials Flow
RESP=$(curl -sf -X POST "https://idp.bank.internal/realms/semantix/protocol/openid-connect/token" \
  -d grant_type=client_credentials \
  -d client_id="semantix-workload" \
  -d client_secret="$(cat /secrets/idp-client-secret)" \
  -d audience="//iam.googleapis.com/projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${POOL_ID}/providers/${PROVIDER_ID}")

# Atomic write to avoid partial reads by Semantix
echo "$RESP" | jq -r .access_token > /secrets/oidc-token.jwt.tmp
mv /secrets/oidc-token.jwt.tmp /secrets/oidc-token.jwt
chmod 640 /secrets/oidc-token.jwt
```

#### Step 3.2: Docker Compose Configuration
Mount the configuration and token files as read-only volumes (`ro`):

```yaml
services:
  semantix:
    image: semantix:latest
    environment:
      SEMANTIX_ALLOW_ADC_CONNECTIONS: "1"
      GOOGLE_APPLICATION_CREDENTIALS: /secrets/wif.json
    volumes:
      - /secrets/wif-credential-config.json:/secrets/wif.json:ro
      - /secrets/oidc-token.jwt:/secrets/oidc-token.jwt:ro
```

---

### 4. Connect in Semantix UI

1. Ensure the environment variable is active on the server: `SEMANTIX_ALLOW_ADC_CONNECTIONS=1`.
2. Navigate to **Studio → DE → Connections → New Connection**.
3. Select connection type: **BigQuery**.
4. Configure connection parameters:
   - **Authentication Method**: Select `Workload Identity / ADC`.
   - **Project ID**: Enter your GCP Project ID (e.g., `bank-analytics-prod`).
   - **Location**: Enter your BigQuery Dataset region (e.g., `asia-southeast1` or `us-central1`).
5. Click **Test Connection** to verify token exchange and test query execution.
6. Click **Save**.

---

## Method 2: Google Apps Script Proxy (For Google Workspace)

Semantix can also connect to BigQuery through a **Google Apps Script** acting as a proxy. The script executes queries inside your Google account on Semantix's behalf without requiring a direct service account key.

### Step 1: Create a Google Apps Script
1. Open [script.google.com](https://script.google.com) → **New Project**.
2. Name the project: `Semantix BigQuery Connector`.
3. Replace the default code with the proxy script:

```javascript
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const projectId = payload.projectId;
    const sql = payload.sql;
    
    const request = {
      query: sql,
      useLegacySql: false,
      timeoutMs: 60000
    };
    
    const response = BigQuery.Jobs.query(request, projectId);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, data: response }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Under **Services (+)** → enable the **BigQuery API**.

### Step 2: Deploy the Apps Script
1. Click **Deploy → New deployment**.
2. Select type: **Web app**.
3. Configure:
   - **Execute as**: Me (your Google account).
   - **Who has access**: Anyone.
4. Click **Deploy** → Copy the **Web App URL** (`https://script.google.com/macros/s/XXXXX/exec`).

### Step 3: Grant BigQuery Permissions
The Google account executing the Apps Script must possess BigQuery IAM roles:
1. Google Cloud Console → **IAM & Admin → IAM**.
2. Find the Google account email.
3. Assign:
   - **BigQuery Data Viewer** — to read tables and views.
   - **BigQuery Job User** — to run query jobs.

### Step 4: Connect in Semantix
1. Navigate to **Studio → DE → Connections → New Connection**.
2. Select **BigQuery**.
3. Paste the **Web App URL** into the `Webhook URL` field.
4. Enter your **Project ID**.
5. Click **Test Connection** → **Save**.

---

## Finding Your Project ID

In the Google Cloud Console top navigation bar, click the project selector to find your **Project ID** (e.g., `bank-analytics-prod-123456`).

Alternatively, run:
```bash
gcloud config get-value project
```

---

## Browsing Schema After Connecting

Once connected, the Semantix Connection detail page allows you to:
- Inspect all **Datasets** within the project.
- Expand Datasets to explore **Tables** and **Views**.
- Inspect column **Schema** details (names, data types, modes).
- Trigger **Sync Schema** to refresh metadata whenever BigQuery structures change.

---

## Egress Firewall Requirements (Enterprise & Banking Environments)

For on-premises servers with restricted egress policies, open outbound **HTTPS (port 443)** communication to the following endpoints:

| Domain | Purpose | Mandatory |
|---|---|:---:|
| `sts.googleapis.com` | Exchanges OIDC token for federated access token | ✅ |
| `iamcredentials.googleapis.com` | Impersonates the target GCP Service Account | ✅ |
| `bigquery.googleapis.com` | Executes BigQuery queries and fetches schema | ✅ |
| `oauth2.googleapis.com` | Discovers endpoints and validates tokens | ✅ |
| `aiplatform.googleapis.com` | Accesses Google Vertex AI models (when using ADC) | Optional |
| Corporate IdP Domain | Issues internal OIDC token (`/protocol/openid-connect/token`) | ✅ |

---

## Troubleshooting

### Workload Identity Federation (WIF) / ADC Issues

| Symptom | Common Root Cause | Remediation |
|---|---|---|
| `STS invalid_target` / `invalid_request` | The `aud` claim in the OIDC JWT does not match the Provider resource name; or `PROJECT_NUMBER` was mistyped as a string Project ID | Ensure `aud` strictly equals `//iam.googleapis.com/projects/<PROJECT_NUMBER>/locations/global/workloadIdentityPools/<POOL_ID>/providers/<PROVIDER_ID>` |
| `STS unauthorized_client` | The `--attribute-condition` failed or does not match the `sub` claim in the JWT | Inspect token payload via `jwt.io` or `jq` to verify the exact `sub` claim string |
| `iam.serviceAccounts.getAccessToken denied` | Missing `roles/iam.workloadIdentityUser` binding on the Service Account | Re-run `gcloud iam service-accounts add-iam-policy-binding` (Step 2.4) |
| Connection fails after ~1 hour | Token refresh cron job failed or stopped; previous token expired | Inspect the status of `/opt/semantix/refresh-oidc-token.sh` systemd timer |
| Intermittent `invalid_grant` | Clock drift between the on-premises host and Google servers | Synchronize on-premises host time via NTP (`chronyd` / `ntpdate`) |
| Network timeout | Egress firewall blocking Google Cloud domains | Review the Egress Firewall table above |

### Apps Script Proxy Issues

| Error | Cause | Solution |
|---|---|---|
| `403 Forbidden` on Test Connection | Apps Script deployment access not set to "Anyone" | Redeploy script with Who has access = Anyone |
| `BigQuery API not enabled` | BigQuery API disabled in GCP project | GCP Console → APIs → Enable BigQuery API |
| `Access Denied` on queries | Google account lacks BigQuery Data Viewer role | Add role in IAM Console |
| `Quota exceeded` | Exceeded free BigQuery tier quotas | Inspect BigQuery quotas in GCP Console |
| Timeout | Query takes longer than 60 seconds | Optimize SQL query or increase `timeoutMs` in script |

---

## BigQuery Cost Optimization

BigQuery charges per byte scanned. To minimize costs in enterprise production:

1. **Partitioned Tables**: Partition tables by date/timestamp so queries only scan targeted partitions.
2. **Increase Cache TTL**: Configure high Cache TTL in Semantix (4–24 hours) — identical queries serve from cache with zero BigQuery cost.
3. **Clustered Tables**: Cluster tables on columns frequently used in `WHERE` and `JOIN` clauses.
4. **Materialized Views**: Maintain pre-aggregated views for heavy recurring calculations.

```sql
-- Example: create date-partitioned table
CREATE TABLE `project.dataset.orders`
PARTITION BY DATE(created_at) AS
SELECT * FROM `project.dataset.orders_raw`;
```

---

## BigQuery SQL Differences

Semantix compiles queries using BigQuery Standard SQL. Key syntax differences from PostgreSQL/MySQL:

| Operation | PostgreSQL / MySQL | BigQuery Standard SQL |
|-----------|--------------------|-----------------------|
| Current date | `CURRENT_DATE` | `CURRENT_DATE()` |
| Date subtraction | `created_at - INTERVAL '7 days'` | `DATE_SUB(created_at, INTERVAL 7 DAY)` |
| Date formatting | `TO_CHAR(date, 'YYYY-MM')` | `FORMAT_DATE('%Y-%m', date)` |
| String concatenation | `a \|\| b` | `CONCAT(a, b)` |
| Null coalescence | `COALESCE(a, 0)` | `IFNULL(a, 0)` |

> When writing Calculated Fields or Custom SQL models for BigQuery, always adhere to BigQuery Standard SQL syntax.

