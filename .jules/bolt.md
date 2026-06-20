
## 2024-06-20 - Fast ISO Date Sorting in React Renders
**Learning:** Instantiating `new Date()` inside an `Array.prototype.sort()` comparator during a React render cycle creates an O(N log N) performance bottleneck due to excessive garbage collection and CPU overhead, particularly when the derived state is unmemoized and triggers on every re-render.
**Action:** When filtering/sorting arrays of data with ISO 8601 strings (like Supabase's `created_at`), wrap the computation in `useMemo` and use direct string comparison (e.g., `a < b ? 1 : -1`) inside `.sort()`. Ensure the comparator explicitly returns `0` for equality to maintain strict weak ordering requirements.
