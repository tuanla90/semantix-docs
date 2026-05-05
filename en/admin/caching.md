# Caching & Performance Optimization

Querying large cloud data warehouses (like BigQuery or Snowflake) directly can be slow and expensive. Semantix provides a robust, multi-layer caching system to ensure dashboards load instantly and cloud compute costs remain low.

## How Caching Works

When a user views a dashboard or asks a question via AI Chat, Semantix checks if the exact SQL query has been executed recently.

1. **Cache Hit:** If the result exists in the cache and has not expired, it is returned immediately (usually in < 100ms). The underlying database is not queried.
2. **Cache Miss:** If the result does not exist or has expired, Semantix executes the query against the database, returns the result to the user, and saves it in the cache for future requests.

## Cache TTL (Time to Live)

By default, query results are cached for **1 hour**. You can customize the Cache TTL at two levels:

### 1. Connection-Level Cache
Go to **Admin → Connections**, edit a connection, and set the **Default Cache TTL**. This applies to all queries executed against this connection unless overridden.

### 2. Widget-Level Cache
For dashboards that require real-time data, you can override the connection TTL on a per-widget basis. 
Edit the widget, go to **Settings → Advanced**, and set a custom TTL (e.g., `5 minutes` or `0` to disable caching entirely).

## Manual Cache Invalidation

If you know the underlying data has just been updated (e.g., an ETL pipeline finished running), you can force a cache refresh:

- **On a Dashboard:** Click the **Refresh** button in the top right corner. This invalidates the cache for all widgets on the dashboard and fetches fresh data.
- **On a Widget:** Click the three dots `...` on the widget and select **Refresh Data**.

## Cache Storage Backend

Semantix uses **Redis** as its caching backend. Ensure your Redis instance is provisioned with enough memory to handle your expected payload size. If Redis runs out of memory, it will evict the oldest cached queries automatically (LRU policy).
