## 2024-03-01 - [BuyerQueries Optimization]
**Learning:** Filtering and sorting lists inside the component body on every render can cause performance issues, especially when other state changes trigger a re-render.
**Action:** Use `useMemo` to memoize the filtered and sorted array, ensuring it only recalculates when the relevant dependencies (`queries`, `filterStatus`, or `sortDate`) change.
