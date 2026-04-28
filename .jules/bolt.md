## 2024-04-28 - Optimize Filtering and Realtime
**Learning:** Performing `new Date()` parsing inside of `.sort()` callbacks on every re-render is a severe anti-pattern in React, scaling terribly with list size (131.52ms for 10k items).
**Action:** Always prefer direct ISO string comparison (`a < b ? 1 : -1`) and memoize the filter/sort pipeline using `useMemo` so it only runs when data or filter dependencies change. Additionally, always add database-level `postgres_changes` filters to Supabase subscriptions to prevent unnecessary global N+1 client refetches.
