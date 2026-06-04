
## 2026-06-04 - [Delay Array Cloning in Derived State]
**Learning:** In React derived state computations (like useMemo), unconditionally cloning arrays (e.g., [...array]) before conditional mutations like .sort() creates unnecessary O(N) memory allocations on every re-render or filter change.
**Action:** Delay array clone operations until right before a mutation operation actually demands it, especially if previous operations like .filter() have already returned a new array instance.
