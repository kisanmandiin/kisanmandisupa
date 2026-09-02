
## 2025-05-18 - ISO Date String Sorting
**Learning:** For chronologically sorting ISO 8601 date strings, O(N log N) `Date` object parsing inside `Array.prototype.sort()` takes 13+ seconds for 1M iterations, whereas direct string comparison (`a < b ? -1 : 1`) is ~20x faster (650ms).
**Action:** Replace `new Date(a.created_at) - new Date(b.created_at)` with direct string comparisons for ISO dates, ensuring we return `0` for equality to maintain weak strict ordering, and wrap expensive derived state operations in `useMemo`.
