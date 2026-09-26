## 2026-09-26 - [Supabase Realtime Optimization]
**Learning:** Global realtime subscriptions without filters cause global N+1 refetch bottlenecks.
**Action:** Always use database-level postgres_changes filters and dynamic channel names.
