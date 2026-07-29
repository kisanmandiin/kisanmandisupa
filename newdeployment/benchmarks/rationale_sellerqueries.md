# Performance Rationale: SellerQueries Real-time Subscription

## What
Optimized the Supabase real-time subscription in `SellerQueries.jsx` by implementing a dynamic channel name (`queries_${user.id}_${activeTab}`) and adding a `postgres_changes` filter (`filter: ${filterField}=eq.${user.id}`).

## Why
Previously, the component subscribed to the global `public:queries` channel without any filters. This created a massive performance bottleneck because every connected user would receive a WebSocket message and trigger a full data refetch (`fetchQueries()`) whenever *any* query in the entire system was created, updated, or deleted. As the user base grows, this would cause excessive unnecessary database load (O(N) queries per single event) and client-side processing.

## Impact
- **Database:** Reduces N+1 refetch bottlenecks. Only the involved parties (buyer and farmer) fetch fresh data when a specific query changes, rather than all active users.
- **Client:** Reduces unnecessary re-renders and network requests by ignoring irrelevant WebSocket events.
- **Scaling:** Prevents channel collisions and ensures proper cleanup.

## Measurement
Network activity via browser DevTools will show significantly fewer WebSocket messages and XHR requests for queries data when other users are interacting with the system.
