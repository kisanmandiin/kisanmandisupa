## 2024-07-15 - Optimize Supabase Real-time Subscriptions
**Learning:** Subscribing to global Supabase channels (e.g., `postgres_changes` on a whole table) without database-level filters creates a massive client-side refetch bottleneck as the app scales. Every global change triggers local refetches on all active clients, flooding the database.
**Action:** Always use database-level `postgres_changes` filters (e.g., `filter: farmer_uid=eq.[user.id]`) and dynamic channel names when setting up real-time subscriptions for user-specific data to ensure efficiency.
