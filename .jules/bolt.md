## 2024-06-25 - React Component Derived State Optimization
**Learning:** Using `useEffect` to synchronize filtered or sorted derived state from a source state (like `allProducts` to `filteredProducts`) creates an unavoidable double-render cycle and forces the component to briefly render stale data while the effect runs.
**Action:** Always use `useMemo` to compute derived state synchronously during render instead of `useEffect`. Also ensure array mutation methods like `.sort()` are performed on a copy to avoid mutating the source state.
