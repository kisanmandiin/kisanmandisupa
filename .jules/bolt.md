## 2024-06-10 - [Seller Queries Realtime Subscription Filter]
**Learning:** Found a global N+1 query refetching bottleneck via `postgres_changes` in real-time subscriptions, where users would re-fetch on every query updated in the database regardless of whether it applied to them.
**Action:** Always filter real-time subscription events at the database level by using the `filter` option (e.g. `filter: 'farmer_uid=eq.' + user.id`) to reduce network overhead and unnecessary re-renders.
