## Rationale: BuyerQueries optimization

**What:** The `BuyerQueries` component calculates `filteredQueries` on every render by mapping over `queries`, filtering them based on `filterStatus`, and sorting them with `Date` parsing. It lacks `useMemo`.

**Why:** The filtering and sorting operations recreate arrays and sort based on potentially expensive `new Date()` parsing on every render, even when the `queries`, `filterStatus`, and `sortDate` haven't changed.

**Impact:** By utilizing `useMemo` and changing the sort function to use direct string comparison for ISO 8601 dates instead of `new Date()`, we avoid unnecessary double-render cycles, memory allocations, and parsing overhead, reducing main thread blocking during updates.

**Measurement:** Run a similar benchmark as the one used for the date parsing benchmark previously to see the speedup.
