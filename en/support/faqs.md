# FAQs & Troubleshooting

This guide covers common issues you might encounter while using Semantix and how to resolve them.

---

## Connection Issues

### ❌ Error: "Connection refused" or "Timeout"
**Cause:** Semantix cannot reach your database server.
**Solution:**
1. Check if your database server is running.
2. Ensure your firewall or cloud security group (e.g., AWS Security Group, GCP Firewall) allows inbound connections from the Semantix IP address.
3. Verify the Port number is correct.

### ❌ Error: "Permission denied for schema public"
**Cause:** The database user provided to Semantix does not have `USAGE` or `SELECT` permissions on the required schema/tables.
**Solution:**
Run the permission grants mentioned in the [Connections](../connections/README.md) setup guide for your specific database. Example for PostgreSQL:
```sql
GRANT USAGE ON SCHEMA public TO semantix_user;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO semantix_user;
```

---

## AI & Query Issues

### ❌ AI generates the wrong SQL
**Cause:** The AI doesn't have enough context or the column names are ambiguous.
**Solution:**
1. **Improve Descriptions:** Go to the Model and write a detailed Description for the problematic column or Metric.
2. **Add Synonyms:** Ensure the user's vocabulary matches the Synonyms defined in the Metric.
3. **Check Context Rules:** Ensure you haven't accidentally forbidden a required combination in the Context settings.

### ❌ Error: "Column not found" in generated SQL
**Cause:** The database schema has changed, but Semantix's cache hasn't updated.
**Solution:**
Go to **Admin → Connections**, select your connection, and click **Sync Schema** to fetch the latest columns and tables.

---

## Dashboard Issues

### ❌ Widgets are stuck on "Loading..."
**Cause:** The underlying query is taking too long to execute on your database, or the Redis cache is unreachable.
**Solution:**
1. Check your database performance. Optimize the query by adding indexes to frequently filtered columns.
2. Check the Semantix server logs for Redis connection errors.

### ❌ Changes to a Metric don't appear on the Dashboard
**Cause:** The dashboard widget is loading data from the cache.
**Solution:**
Click the **Refresh** button on the dashboard to invalidate the cache and fetch the latest data based on your new Metric definition.

---

## Authentication Issues (SSO)

### ❌ Users cannot log in via SSO
**Cause:** The SAML/OIDC configuration is incorrect or the certificate has expired.
**Solution:**
1. Check the **Identity Provider (IdP)** settings in Semantix Admin.
2. Ensure the `Entity ID` and `Assertion Consumer Service (ACS) URL` match exactly between Semantix and your IdP (e.g., Okta/Azure AD).
3. If using SAML, verify the X.509 certificate hasn't expired.
