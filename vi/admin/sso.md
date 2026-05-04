# SSO (SAML / OIDC)

Semantix supports Single Sign-On via **SAML 2.0** and **OpenID Connect (OIDC)**.

## Supported Providers

| Protocol | Compatible With |
|----------|----------------|
| SAML 2.0 | Okta, Azure AD, Google Workspace, OneLogin, any SAML IdP |
| OIDC | Google, Microsoft, Auth0, Keycloak, any OIDC provider |

## Setting Up SSO

### Step 1 — Create an SSO Configuration

1. Go to **Admin → SSO → New Configuration**
2. Choose the protocol: **SAML** or **OIDC**
3. Enter your IdP details (see below)
4. Click **Save**

### SAML Configuration

| Field | Description |
|-------|-------------|
| **Entity ID / Issuer** | Your IdP's entity ID |
| **SSO URL** | Your IdP's SAML login endpoint |
| **Certificate** | Your IdP's X.509 certificate (for signature verification) |

**Semantix SP Metadata:**
- **ACS URL (callback):** `https://your-domain.com/api/auth/sso/{id}/callback`
- **SP Entity ID:** `https://your-domain.com/api/auth/sso/{id}/metadata`

### OIDC Configuration

| Field | Description |
|-------|-------------|
| **Issuer URL** | Your IdP's issuer URL (e.g. `https://accounts.google.com`) |
| **Client ID** | OAuth client ID |
| **Client Secret** | OAuth client secret |

**Redirect URI to register with your IdP:**
```
https://your-domain.com/api/auth/sso/{id}/callback
```

### Step 2 — Enable Auto-Provisioning (Optional)

When enabled, users who log in via SSO for the first time are automatically created in Semantix with the **Default Role** you specify.

If disabled, only users who already exist in Semantix can log in via SSO.

### Step 3 — Test the Connection

1. Click **Test SSO** on the configuration page
2. You'll be redirected to your IdP login page
3. After successful login, you'll be redirected back to Semantix

> 💡 Keep at least one local admin account active in case SSO is misconfigured.
