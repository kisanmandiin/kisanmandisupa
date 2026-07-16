# Performance Rationale: SellerQueries Real-time Optimization

## What
Added `filter` configuration and a dynamic channel name to the `postgres_changes` real-time subscription in `SellerQueries.jsx`.

## Why
By default, subscribing to `public:queries` without a filter means the client receives a WebSocket event for *every* query insert/update/delete happening across the entire platform, regardless of who it belongs to.

When a message is received, the client was calling `fetchQueries()`, which triggered a network request to Supabase to fetch the current user's queries.

As the platform scales and more farmers/buyers interact, this would create an **N+1 Client Refetch Storm**:
1. User A sends an inquiry to User B.
2. User C, D, E, F, G (who are on the dashboard) all receive the WebSocket event.
3. User C, D, E, F, G all trigger a refetch of their own queries, hitting the database simultaneously.

## Impact
- **Network Reduction:** Clients now only receive WebSocket events relevant to them (where `farmer_uid` or `buyer_uid` matches their user ID).
- **Database Load Reduction:** Eliminates unnecessary refetching of query lists on the client side triggered by unrelated global updates.
- **Connection Stability:** Dynamic channel names (`public:queries:${user.id}:${activeTab}`) prevent channel collisions when switching between 'sent' and 'received' tabs rapidly.