## 2025-01-20 - Derived State Optimization
**Learning:** In React components like `Marketplace.jsx`, using `useEffect` to synchronize derived state (`filteredProducts`) with its source (`allProducts`, `category`, `search`) creates a performance bottleneck through double-renders.
**Action:** Always prefer computing derived state synchronously during render with `useMemo`. When sorting within a `useMemo` that already conditionally clones an array (via `filter`), ensure you don't unnecessarily clone again for `sort`, preserving memory while avoiding mutation of the original source.
