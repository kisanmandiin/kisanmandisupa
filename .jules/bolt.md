## 2024-05-24 - Efficient ISO 8601 Date Sorting
**Learning:** Parsing ISO 8601 strings into `Date` objects inside array sort functions is a significant performance bottleneck, particularly for large arrays that may be sorted frequently (like in React render loops).
**Action:** Use direct string comparison for ISO 8601 dates (e.g., `a < b ? 1 : -1`) rather than `new Date(a) - new Date(b)`. Ensure the comparator returns `0` for equality to satisfy the strict weak ordering contract.
