
## 2023-11-01 - Marketplace Performance: Derived State Anti-pattern
**Learning:** In React components like Marketplace.jsx, maintaining filtered/sorted data as a separate `useState` updated via a `useEffect` on every dependency change causes a double-render cycle. Filtering operations return new arrays anyway, so cloning with `[...filtered]` before sorting is only necessary if prior map/filter operations weren't executed.
**Action:** Always compute derived state synchronously during render using `useMemo` instead of duplicating it in a `useEffect` state synchronization pattern.
