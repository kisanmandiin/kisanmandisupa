## 2024-08-16 - Date Parsing in React Sort Loops
**Learning:** Using `new Date(string)` inside an `Array.prototype.sort()` comparator for large lists of React derived state (like queries) blocks the main thread heavily (~216ms vs ~7ms for 10,000 items). Also, computing this derived state inline on every render causes the bottleneck to trigger constantly.
**Action:** Always wrap `.filter().sort()` chains in `useMemo` for derived lists, and prefer direct lexicographical string comparison for ISO 8601 dates provided by APIs like Supabase.
