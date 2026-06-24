# System Requirements

This page is for **Admins deploying Semantix** on self-managed infrastructure (self-hosted). If you are using the Semantix cloud version, you don't need to read this page.

---

## Server Requirements (Self-Hosted)

### Minimum Configuration

| Component | Minimum | Recommended | Notes |
|-----------|---------|-------------|-------|
| **CPU** | 2 vCPU | 4+ vCPU | Each AI query uses ~1 CPU thread |
| **RAM** | 2 GB | 8 GB | Higher concurrent users require more RAM |
| **Storage** | 10 GB | 50 GB | For app database, logs, Knowledge Base embeddings |
| **Node.js** | v18 LTS | v20 LTS | Required — Semantix runs on Next.js |
| **PostgreSQL** | v14 | v15+ | Application database for Semantix (not your data database) |
| **Redis** | v6 | v7 | Used for caching and job queues |

### Sizing by Concurrent Users

| Concurrent Users | CPU | RAM | Notes |
|-----------------|-----|-----|-------|
| 1–10 users | 2 vCPU | 4 GB | Suitable for demos, small teams |
| 10–50 users | 4 vCPU | 8 GB | Medium-sized teams |
| 50–200 users | 8 vCPU | 16 GB | Use a load balancer |
| 200+ users | Scale horizontally | 32 GB+ | Contact us for architecture guidance |

---

## Supported Browsers

Semantix is a web application. Users need one of the following browsers:

| Browser | Minimum Version | Notes |
|---------|----------------|-------|
| **Google Chrome** | 110+ | ✅ Recommended |
| **Mozilla Firefox** | 110+ | ✅ Well supported |
| **Microsoft Edge** | 110+ | ✅ Well supported |
| **Apple Safari** | 16+ | ⚠️ Supported, but minor differences may occur in some features |

> Internet Explorer is not supported. **Chrome** is recommended for the best experience.

---

## Network Requirements

### From Semantix Server Outbound

| Destination | Port | Purpose |
|-------------|------|---------|
| Your database server | 5432 / 3306 / 1433 / … | Read data for analysis |
| `api.openai.com` | 443 | Call OpenAI API (if used) |
| `api.anthropic.com` | 443 | Call Anthropic API (if used) |
| `generativelanguage.googleapis.com` | 443 | Call Google Gemini API (if used) |
| `accounts.google.com` | 443 | Read Google Sheets (if used) |
| Your SMTP server | 25 / 465 / 587 | Send emails (invitations, alerts) |

### From Users Inbound to Semantix Server

| Port | Protocol | Purpose |
|------|----------|---------|
| 443 (HTTPS) | TCP | Web application |
| 80 (HTTP) | TCP | Redirect to HTTPS |

### Firewall / VPN

If your database is behind a firewall, you need to **whitelist Semantix's server IP** to allow connections. See detailed configuration in [Data Connections](../studio/connections.md).

---

## Required Environment Variables

Declare in a `.env` file or your server's environment variables:

### Required

| Variable | Example | Description |
|----------|---------|-------------|
| `DATABASE_URL` | `postgresql://user:pass@host:5432/semantix` | PostgreSQL connection for the Semantix app database |
| `AUTH_SECRET` | (random 64-character string) | Secret for signing JWT sessions. Generate with `openssl rand -hex 32` |
| `NEXTAUTH_URL` | `https://semantix.company.com` | Public URL of your Semantix instance |
| `ENCRYPTION_KEY` | (random 32-byte base64 string) | Key for encrypting credentials (API keys, DB passwords). Generate with `openssl rand -base64 32` |
| `CRON_SECRET` | (random string) | Protects the cron job endpoint |

### Recommended

| Variable | Example | Description |
|----------|---------|-------------|
| `REDIS_URL` | `redis://localhost:6379` | Redis for caching (if omitted, uses in-memory cache) |
| `SMTP_HOST` | `smtp.gmail.com` | SMTP server for email |
| `SMTP_PORT` | `587` | SMTP port |
| `SMTP_USER` | `noreply@company.com` | Sender email account |
| `SMTP_PASS` | `••••••••` | Email password |
| `SMTP_FROM` | `Semantix <noreply@company.com>` | Display name in outgoing emails |

### Optional

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | HTTP server listening port |
| `NODE_ENV` | `production` | Environment (`production` / `development`) |
| `LOG_LEVEL` | `info` | Log verbosity (`debug`, `info`, `warn`, `error`) |
| `MAX_QUERY_TIMEOUT` | `60000` | Maximum timeout for DB queries (milliseconds) |
| `MAX_ROWS_LIMIT` | `10000` | Maximum rows returned per query |
| `TZ` | `UTC` | Server timezone — affects cron job schedules |

---

## Installation and Startup

### Install Dependencies

```bash
npm install
```

### Set Up the Database

```bash
# Run migrations
npx prisma migrate deploy

# (First time only) Seed initial data
npx prisma db seed
```

### Build and Run

```bash
# Production build
npm run build

# Start server
npm start
```

Semantix runs by default on `http://localhost:3000`.

### Using PM2 (Recommended for Production)

```bash
# Install PM2
npm install -g pm2

# Start with PM2
pm2 start npm --name "semantix" -- start

# Auto-start on reboot
pm2 startup
pm2 save
```

---

## HTTPS Configuration (Required in Production)

Semantix must run behind a **reverse proxy** (Nginx, Apache, Caddy) with HTTPS. Do not expose port 3000 directly to the internet.

**Example Nginx configuration:**

```nginx
server {
    listen 80;
    server_name semantix.company.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name semantix.company.com;

    ssl_certificate /etc/letsencrypt/live/semantix.company.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/semantix.company.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Extended timeout for AI queries (can take up to 60s)
        proxy_read_timeout 120;
        proxy_connect_timeout 120;
    }
}
```

---

## Pre-Launch Checklist

- [ ] HTTPS configured with a valid SSL certificate
- [ ] `NEXTAUTH_URL` set to the correct production domain
- [ ] `AUTH_SECRET` and `ENCRYPTION_KEY` generated randomly (do not use default examples)
- [ ] `.env` file is not committed to git
- [ ] Redis is running and configured in `REDIS_URL`
- [ ] SMTP configured to send user invitation emails
- [ ] Semantix's PostgreSQL database has automated backups
- [ ] Firewall exposes only ports 443 and 80 from the internet
- [ ] First Admin account has been created
- [ ] Full flow tested: Connection → Data Model → AI Chat

---

## Upgrading Versions

When a new version is available:

```bash
# Pull new code
git pull

# Install new dependencies (if any)
npm install

# Run database migrations
npx prisma migrate deploy

# Rebuild
npm run build

# Restart
pm2 restart semantix
```

> **Note:** Always back up the database before upgrading a major version.
