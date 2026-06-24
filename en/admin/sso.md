# SSO (Single Sign-On)

Semantix supports Single Sign-On (SSO) via **SAML 2.0** and **OpenID Connect (OIDC)** — integrating with Okta, Azure AD, Google Workspace, Auth0, Keycloak, and any standard IdP.

---

## Benefits of SSO

- Users don't need to remember another password — they use their existing company account
- Admins don't need to manage passwords manually
- Automatic deactivation when an employee leaves (via IdP)
- MFA support from the IdP
- **Auto-provisioning**: Semantix accounts are created automatically when a user logs in for the first time

---

## Supported Protocols

| Protocol | Compatible IdPs |
|----------|----------------|
| **SAML 2.0** | Okta, Azure AD / Microsoft Entra, Google Workspace, OneLogin, JumpCloud, Ping Identity, ADFS |
| **OIDC** | Google Workspace, Microsoft Azure AD, Auth0, Keycloak, GitHub, Cognito |

---

## Step 1: Create an SSO Configuration

1. Go to **Admin → Access → SSO → New Configuration**
2. Set a **Name** (display name, e.g. "Okta Corporate SSO")
3. Choose the **Protocol**: SAML or OIDC
4. Fill in the IdP details (see each protocol below)
5. Click **Save** — the system generates a unique **SSO ID**

---

## SAML 2.0 Configuration

### Information to Obtain from Your IdP

| Field | Description | Example |
|-------|-------------|---------|
| **Entity ID / Issuer** | The IdP's identifier | `http://www.okta.com/exkXXXXX` |
| **SSO URL (Login URL)** | SAML login endpoint | `https://company.okta.com/app/xxx/sso/saml` |
| **X.509 Certificate** | IdP certificate for SAML signature verification | PEM certificate (starts with `-----BEGIN CERTIFICATE-----`) |

### Information to Provide to Your IdP (SP Metadata)

After creating the SSO config in Semantix, copy these values from the detail page:

| Field | Value |
|-------|-------|
| **ACS URL (Assertion Consumer Service)** | `https://your-domain.com/api/auth/sso/{sso-id}/callback` |
| **SP Entity ID** | `https://your-domain.com/api/auth/sso/{sso-id}/metadata` |
| **Metadata URL** | `https://your-domain.com/api/auth/sso/{sso-id}/metadata` |

### Setting Up in Okta (Example)

1. Okta Admin Console → **Applications → Create App Integration**
2. Select **SAML 2.0**
3. Fill in:
   - **Single sign-on URL**: Semantix ACS URL
   - **Audience URI (SP Entity ID)**: Semantix SP Entity ID
   - **Name ID format**: EmailAddress
   - **Application username**: Email
4. **Attribute Statements** (claim mapping):
   - `email` → `user.email`
   - `firstName` → `user.firstName`
   - `lastName` → `user.lastName`
5. Complete setup → get **Identity Provider metadata** → paste into Semantix

### Setting Up in Azure AD (Microsoft Entra)

1. Azure Portal → **Azure Active Directory → Enterprise applications → New application**
2. **Create your own application** → Select "Integrate any other application you don't find in the gallery"
3. Tab **Single sign-on → SAML**
4. **Basic SAML Configuration**:
   - **Identifier (Entity ID)**: Semantix SP Entity ID
   - **Reply URL (ACS URL)**: Semantix ACS URL
5. **Attributes & Claims**: Ensure the `emailaddress` claim is mapped
6. Download **Federation Metadata XML** → upload or copy the info into Semantix

---

## OIDC Configuration

### Information to Obtain from Your IdP

| Field | Description | Example |
|-------|-------------|---------|
| **Issuer URL** | IdP base URL | `https://accounts.google.com` |
| **Client ID** | OAuth 2.0 Client ID | `1234567890-xxx.apps.googleusercontent.com` |
| **Client Secret** | OAuth 2.0 Client Secret | `GOCSPX-xxx...` |

### Redirect URI to Register with Your IdP

```
https://your-domain.com/api/auth/sso/{sso-id}/callback
```

### Setting Up with Google Workspace

1. Google Cloud Console → **APIs & Services → Credentials → Create Credentials → OAuth 2.0 Client IDs**
2. Application type: **Web application**
3. **Authorized redirect URIs**: Add the Semantix Redirect URI
4. Copy **Client ID** and **Client Secret** → paste into Semantix
5. **Issuer URL**: `https://accounts.google.com`

### Setting Up with Auth0

1. Auth0 Dashboard → **Applications → Create Application → Regular Web Applications**
2. Settings:
   - **Allowed Callback URLs**: Semantix Redirect URI
   - **Allowed Logout URLs**: `https://your-domain.com`
3. Copy **Domain** (Issuer URL = `https://your-auth0-domain.auth0.com`), **Client ID**, **Client Secret**
4. Paste into Semantix SSO config

---

## Step 2: Enable Auto-Provisioning (Optional)

When **Auto-Provisioning** is enabled:
- Users who log in via SSO for the first time have a Semantix account created automatically
- Users are assigned the **Default Role** configured in the SSO config

When disabled:
- Only users who already have a Semantix account can log in via SSO
- Admins must create accounts first

**Recommendation**: Enable Auto-Provisioning to reduce admin workload.

---

## Step 3: Test SSO

1. On the SSO config page → click **Test SSO Login**
2. A new browser window opens → redirects to the IdP login page
3. Log in with your company account
4. If successful: redirected back to Semantix with "SSO test successful" message
5. If failed: review the error message to debug

---

## Step 4: Enable SSO for Users

After a successful test:
1. In the SSO config → toggle **Active** to ON
2. A "Sign in with [SSO Name]" button appears on the Semantix login page

---

## Claim / Attribute Mapping

Semantix needs the following information from the IdP to create/update accounts:

| Field | SAML Attribute Name | OIDC Claim |
|-------|--------------------|-----------| 
| Email (required) | `email` or `emailaddress` | `email` |
| First Name | `firstName` or `given_name` | `given_name` |
| Last Name | `lastName` or `family_name` | `family_name` |
| Avatar | `picture` | `picture` |

---

## Troubleshooting SSO

| Symptom | Cause | Solution |
|---------|-------|----------|
| Redirect to `/login?error=sso_failed` | ACS URL incorrect in IdP | Check the ACS URL — copy exactly from Semantix |
| `Invalid signature` (SAML) | IdP certificate expired or wrong | Re-download the certificate from IdP and update in Semantix |
| `Issuer mismatch` | Entity ID doesn't match | Ensure the SP Entity ID in IdP matches Semantix |
| `User not found` with Auto-Provisioning off | User has no Semantix account | Create the user in Semantix first, or enable Auto-Provisioning |
| OIDC: `Invalid client` | Wrong Client ID/Secret | Verify credentials in the IdP dashboard |
| Login succeeds but wrong role | Default Role not set correctly | Adjust Default Role in the SSO config |

---

## Important Note

> **Always keep at least one local Admin account** (email/password login) as a backup. If SSO fails, you can still access Semantix via this account to troubleshoot.

See also: [Users & Permissions](README.md)
