# Caching & Performance Optimization

The multi-layer cache system ensures dashboards load instantly and reduces load on your source databases.

---

## How Caching Works

When a user views a Dashboard or asks a question via AI Chat:

```
User opens Dashboard
        ↓
Semantix generates SQL from widget config
        ↓
Check Redis cache: is the SQL hash cached?
     ↙ Yes (Cache Hit)          ↘ No (Cache Miss)
Return result from cache     Execute SQL on Database
(< 100ms)                           ↓
                              Save result to Redis
                                    ↓
                             Return to user
```

**Cache Hit** — the most common case: results are returned immediately from Redis without touching the database.

**Cache Key** is generated from: `hash(SQL + connection_id + user_filters)`. If the SQL changes by even one character, cache is bypassed.

---

## Three Levels of Cache TTL

### 1. Connection Level (Default)

**Navigation:** Studio → DE → Connections → Select connection → **Default Cache TTL** field

Applies to all queries run through this connection. Acts as a fallback if a widget doesn't override it.

**Recommended TTL by database type:**

| Database Type | Recommended TTL | Reason |
|--------------|----------------|--------|
| PostgreSQL/MySQL (OLTP) | `3600` (1 hour) | Data changes frequently but real-time is not required |
| BigQuery/Snowflake | `14400` (4 hours) | Warehouse data is typically updated in batches |
| Google Sheets | `1800` (30 minutes) | Changes more frequently than a warehouse |
| ClickHouse Analytics | `7200` (2 hours) | Analytics data rarely changes instantaneously |

### 2. Widget Level (Override)

**Navigation:** Dashboard → Edit widget → Settings tab → **Cache TTL**

Override the connection TTL for a specific widget:

| TTL | When to Use |
|-----|-------------|
| `0` | Real-time — queries the database on every view |
| `300` | Data updates every 5 minutes (live ops, support queue) |
| `3600` | Normal hourly reporting |
| `86400` | Daily reports — 24-hour cache, cleared at 7am via cron |

### 3. Cache TTL = 0 — Disable Cache

Set TTL to 0 to **always query the database directly**, bypassing cache entirely. Use for:
- Real-time monitoring screens (orders in progress, open tickets)
- CEO dashboards that require up-to-the-minute figures
- Data that changes every second (IoT, trading)

> **Warning**: TTL = 0 significantly increases database load. If many users view the dashboard simultaneously, each triggers a separate query.

---

## Manual Cache Refresh

### Refresh Entire Dashboard

Click the **Refresh** button (🔄) in the top-right corner of the Dashboard — clears cache for all widgets and re-queries.

### Refresh a Single Widget

Click **⋮** on the widget → **Refresh Data** — clears only that widget's cache.

---

## Redis Backend

Semantix uses **Redis** as its cache backend. Monitor and optimize it:

### Check That Redis Is Running

```bash
# On the server running Redis
redis-cli ping
# Result: PONG → Redis is running

# Check memory usage
redis-cli info memory | grep used_memory_human
```

### Redis Configuration for Production

In `/etc/redis/redis.conf`:

```conf
# Set Redis memory limit (example: 2GB)
maxmemory 2gb

# Policy when memory is full: evict least recently used keys
maxmemory-policy allkeys-lru

# Save snapshots for recovery after restart
save 900 1
save 300 10
save 60 10000
```

### Estimating Required Redis Capacity

Each widget cache entry typically uses 10KB - 500KB depending on the number of data rows.

| Dashboards | Widgets | Estimate |
|------------|---------|---------|
| 10 dashboards | 5 widgets/dashboard | ~50 entries × 100KB = ~5MB |
| 50 dashboards | 8 widgets/dashboard | ~400 entries × 100KB = ~40MB |
| 200 dashboards | 10 widgets/dashboard | ~2,000 entries × 100KB = ~200MB |

For 200 dashboards, Redis with 256MB - 512MB is sufficient.

---

## Auto-Refresh Dashboard

In addition to cache TTL, Dashboards have an **Auto-Refresh** feature — automatically reloading on a fixed interval:

**Navigation:** Dashboard → ⚙️ Settings → **Auto-Refresh Interval**

| Interval | When to Use |
|----------|-------------|
| Off | Default — users refresh manually |
| 1 minute | Ops/support dashboards requiring continuous updates |
| 5 minutes | KPI dashboards for team leads |
| 15 minutes | Daily reports monitored frequently |
| 30 minutes / 1 hour | Overview dashboards that change infrequently |

> Auto-Refresh and Cache TTL work independently. If Auto-Refresh = 5 minutes but Cache TTL = 1 hour, every 5 minutes the widget reloads — but data still comes from cache until the cache expires.

---

## Cache Strategies by Use Case

### Daily Reporting Dashboard (Most Common)

```
Connection TTL: 3600 (1 hour)
Widget TTL: default (inherit from connection)
Auto-Refresh: Off
```

Employees open the dashboard in the morning → data cached from when ETL finished → fast, no DB load.

### Ops / Live Monitoring Dashboard

```
Connection TTL: 60 (1 minute)
Widget TTL: 0 for critical widgets (orders pending, open tickets)
Auto-Refresh: 1 minute
```

Data is near-real-time; critical widgets always show the latest figures.

### BigQuery Dashboard (Cost-Sensitive)

```
Connection TTL: 86400 (24 hours)
Widget TTL: 86400 for all widgets
Auto-Refresh: Off
```

Maximizes BigQuery cost savings — data cached all day, manual refresh when needed.

---

## Monitoring Cache Performance

In **Admin → Monitoring → Audit Logs**, filter by action `query_executed`:
- Identify queries that run slowly (> 5 seconds)
- Find which widgets consume the most resources
- Determine whether increasing TTL would reduce query frequency
