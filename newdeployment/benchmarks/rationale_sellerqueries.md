# Performance Optimization: SellerQueries Real-time Subscription

## What
Refactored the real-time Supabase subscription in `SellerQueries.jsx` to use a dynamic channel name and apply `postgres_changes` database-level filters based on the `activeTab` (`farmer_uid` or `buyer_uid`) and the current user's ID.

## Why
Previously, the subscription was listening globally to all events on the `queries` table (`event: '*', schema: 'public', table: 'queries'`). This created a severe N+1 refetch bottleneck where *any* query update globally (by any user) would trigger a `fetchQueries()` call for *every* connected client.

## Impact
- **Network & DB Load:** Drastically reduces unnecessary network traffic and database load by ensuring clients only receive real-time updates for queries relevant to them.
- **Client Performance:** Prevents wasteful React re-renders and `fetchQueries` network calls caused by unrelated global data changes.
- **Scalability:** The application can now scale to many concurrent users without degrading database or client performance due to broadcast noise.

## Measurement
- The impact is structural and observable via network tabs and Supabase dashboard metrics. Previously, 100 connected users would trigger 100 `fetchQueries` calls on a single query update. Now, only the specific buyer and seller involved will trigger a refetch (2 calls vs 100).
