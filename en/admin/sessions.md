# Sessions

**Navigation:** Admin → Monitoring → Sessions

The Sessions page lets Admins monitor and manage all active login sessions in the system — detecting unusual access and responding to security incidents.

---

## Viewing Active Sessions

The page displays a list of all logged-in users with the following information:

| Field | Description |
|-------|-------------|
| **Email / Name** | User identity |
| **Role** | Their role in the system |
| **Login Method** | Email/Password or SSO (provider name) |
| **Login Time** | When the current session started |
| **Last Active** | Last interaction with the system |
| **IP Address** | Connection IP address |
| **Location** | Estimated geographic location from IP |
| **User Agent** | Browser and operating system |
| **Login Count** | Total logins in the selected time period |

---

## Filtering Sessions

**Date Range filter:** View login history within a specific time window — not just currently active sessions.

**Search by Email:** Type a user's email to view their login history.

---

## Terminating Sessions

### Terminate a Single Session

1. Find the user in the list
2. Click **Terminate** next to them
3. Confirm → the user is logged out immediately
4. The next time they perform any action, they are redirected to the login page

**When to use:**
- An employee reports a lost laptop or phone → terminate the session to protect the account
- A login from an unfamiliar IP is detected → terminate the suspicious session
- After changing a user's permissions → force a re-login with the new permissions

### Terminate All Sessions

Click **Terminate All Sessions** — ends all active sessions for all users.

**When to use:**
- A security breach is detected → force everyone to log in again
- A major permission update — all users must re-login to receive new permissions
- System maintenance — ensure no one is active during a restart

> The Terminate All action is recorded in Audit Logs with the Admin's identity.

---

## Detecting Unusual Access

Use the Sessions page to spot suspicious signs:

### Login from an Unfamiliar IP

**Sign:** A user normally logs in from a company IP (203.x.x.x) but a session appears from a foreign IP.

**Action:**
1. Terminate the suspicious session
2. Check Audit Logs → filter by `user.login` for that user
3. Contact the user to confirm
4. If confirmed compromised: require an immediate password change

### Session Active Outside Working Hours

**Sign:** Last Active at 2am when the user normally works 9am-6pm.

**Action:**
1. Check Audit Logs → review which queries were run
2. If abnormal: terminate the session + require a password change

### Multiple Sessions from Different Locations

**Sign:** The same account has sessions from 3 different IPs simultaneously.

**Action:**
1. Terminate all sessions for that user
2. Require a password reset
3. Consider mandating SSO + MFA

---

## Session Timeout Policy

Configure in **Admin → Config → Security Settings**:

| Setting | Description | Default |
|---------|-------------|---------|
| **Idle Timeout** | Automatic logout after X minutes of inactivity | 480 minutes (8 hours) |
| **Absolute Timeout** | Automatic logout after X hours regardless of activity | 24 hours |
| **Remember Me Duration** | Session lifetime when "Remember me" is selected | 30 days |

**Recommendations for organizations with sensitive data:**
- Idle Timeout: 120 minutes (2 hours)
- Absolute Timeout: 10 hours
- Disable "Remember Me" or limit it to 7 days
