## 2026-10-05 - Supabase Real-time Optimization
**Learning:** Global real-time channels on tables (like `public:queries`) without database-level `filter` clauses cause client-side N+1 query bottlenecks as all users receive events for all changes and indiscriminately refetch.
**Action:** Always apply database-level filters (e.g. `filter: farmer_uid=eq.[user.id]`) and uniquely scope channel names based on context (`tab:userId`) in Supabase subscriptions to prevent frontend flooding.
