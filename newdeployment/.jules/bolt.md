## 2024-06-18 - ISO 8601 Date Sorting Performance
**Learning:** Parsing ISO 8601 date strings into `Date` objects inside a `.sort()` comparator is an O(N log N) operation that can significantly block the main thread in JavaScript, taking ~216ms for 10,000 items compared to ~7.7ms for string comparison.
**Action:** Always use direct lexicographical string comparison (`a < b ? 1 : -1`) for ISO 8601 date strings instead of `new Date()` parsing when sorting arrays in React renders, and wrap the computation in `useMemo`.
