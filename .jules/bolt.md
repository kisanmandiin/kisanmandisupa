
## 2024-07-29 - Supabase Global Subscription Bottlenecks
**Learning:** Subscribing to real-time events on a table globally (e.g., `.channel('public:table').on(...)` without a filter) in a React component causes an N+1 refetch bottleneck where every single connected client re-fetches their data whenever any row in the entire table changes.
**Action:** Always optimize real-time Supabase subscriptions by using database-level `postgres_changes` filters (e.g., `filter: farmer_uid=eq.[user.id]`) and dynamic channel names based on the user ID to prevent global re-fetch cascades.
