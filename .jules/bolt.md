## 2026-08-03 - SellerQueries Real-time Subscription Filter
**Learning:** Unfiltered global `postgres_changes` subscriptions in Supabase cause an O(N) refetch bottleneck across all connected clients whenever any record is updated.
**Action:** Always apply database-level filters (e.g., `filter: farmer_uid=eq.${user.id}`) and use dynamic channel names to isolate events to the relevant user.
