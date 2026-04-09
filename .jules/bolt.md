## 2026-04-09 - Memoization of sorting with dates in React
**Learning:** Parsing dates inside an array `.sort` method within a component render without memoization is an expensive O(N log N) operation that can bottleneck performance on list re-renders.
**Action:** Use `useMemo` to memoize derived sorted lists, specifically when the sorting logic involves costly operations like date instantiations.
