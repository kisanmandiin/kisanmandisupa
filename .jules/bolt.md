## 2023-10-24 - Supabase Real-time Subscription Global Refetch Bottleneck
**Learning:** Found a critical performance anti-pattern in `SellerQueries.jsx` where a global real-time subscription (`public:queries`) without filters caused all connected clients to fetch queries whenever any query was updated (broadcast storm).
**Action:** Always use database-level `postgres_changes` filters (e.g., `filter: field=eq.[user.id]`) and dynamic channel names when subscribing to tables to avoid global N+1 refetches.
