## 2024-05-24 - React Derived State
**Learning:** `useEffect` causing double renders when updating state based on props/other state.
**Action:** Use `useMemo` for derived state to synchronously compute it during render.

## 2024-05-24 - Sorting ISO 8601 strings
**Learning:** Parsing `new Date(string)` inside a `.sort()` loop is extremely slow (O(n log n)).
**Action:** Use direct string comparison for ISO 8601 date strings, since their lexical order perfectly matches chronological order.
