## 2024-05-24 - Optimizing Supabase Real-time Subscriptions
**Learning:** Subscribing globally to large tables without filters can cause inefficient N+1 global refetch bottlenecks and channel collisions.
**Action:** Optimize real-time Supabase subscriptions (e.g., in `SellerQueries`) by using database-level `postgres_changes` filters (e.g., `filter: farmer_uid=eq.[user.id]`) and dynamic channel names based on the active tab and user ID.
