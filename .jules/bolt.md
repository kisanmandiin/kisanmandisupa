## 2024-11-20 - [Supabase Realtime Optimization]
**Learning:** Global table subscriptions (`.channel("public:table")`) without filters broadcast every event to all connected clients, causing N+1 refetch bottlenecks on dashboards.
**Action:** Always use database-level `postgres_changes` filters (`filter: column=eq.value`) and scope dynamic channel names by user ID and context to ensure clients only receive and refetch relevant events.
