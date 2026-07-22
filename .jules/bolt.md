## 2024-07-22 - Optimize Real-time Supabase Subscriptions
**Learning:** Supabase `postgres_changes` subscriptions without filters cause inefficient global N+1 refetch bottlenecks across the client base, as every client receives every event and triggers a refetch.
**Action:** Always use dynamic channel names (to avoid collisions) and add database-level `postgres_changes` filters (e.g., `filter: farmer_uid=eq.${user.id}`) to real-time subscriptions so clients only process relevant events.
