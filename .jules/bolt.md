## 2026-10-29 - [Supabase Realtime Optimization]
**Learning:** Subscribing to global Supabase channels without postgres_changes filters triggers unnecessary refetching across all connected clients for every database event.
**Action:** Always scope channels uniquely and apply database-level filters (e.g., farmer_uid=eq.[user.id]) to prevent N+1 refetch bottlenecks.
