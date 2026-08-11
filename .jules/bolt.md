## YYYY-MM-DD - [Title]
**Learning:** [Insight]
**Action:** [How to apply next time]
## 2024-08-11 - [Direct Date String Comparison vs new Date() in Sort]
**Learning:** Parsing ISO 8601 date strings via `new Date()` inside a `sort` function (which is evaluated O(N log N) times) is a major hidden computational bottleneck. Furthermore, recalculating derived state (like sorting/filtering) in the render body creates double-render issues or synchronous delays.
**Action:** Always wrap derived state arrays with `useMemo`, and for sorting chronological ISO 8601 strings, utilize direct string comparison (e.g., `a < b ? -1 : 1`) while explicitly handling the `0` equal case to satisfy strict weak ordering in JS engines.
