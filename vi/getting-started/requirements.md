# System Requirements

## For Self-Hosted Deployments

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| CPU | 2 vCPU | 4 vCPU |
| RAM | 2 GB | 4 GB |
| Storage | 10 GB | 20 GB |
| Node.js | 18+ | 20+ |
| PostgreSQL | 14+ | 15+ (for the app database) |

## Supported Browsers

| Browser | Minimum Version |
|---------|----------------|
| Chrome | 110+ |
| Firefox | 110+ |
| Safari | 16+ |
| Edge | 110+ |

## Network Requirements

- Outbound access to your database hosts
- Outbound HTTPS for AI provider APIs (OpenAI, Anthropic, Google, etc.)
- Port 3000 (default) or your configured port

## Required Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection URL for the app database | ✅ |
| `AUTH_SECRET` | Random secret for session signing (min 32 chars) | ✅ |
| `NEXTAUTH_URL` | Public URL of your Semantix instance | ✅ |
| `ENCRYPTION_KEY` | Key for encrypting stored credentials | ✅ |
| `CRON_SECRET` | Secret to protect cron endpoints | ✅ |

> ⚠️ Never share or commit your `.env` file to version control.
