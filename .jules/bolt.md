## 2024-05-18 - React Double-Render Cycle from Derived State in Marketplace
**Learning:** Found an anti-pattern in `Marketplace.jsx` where `filteredProducts` was managed via `useState` and updated in `useEffect`, causing an unnecessary double-render cycle whenever filters or data changed. Also unconditionally allocated memory by spreading the array before sorting.
**Action:** Replaced with `useMemo` to synchronously compute derived state during render. Avoid redundant spreads by checking `filtered === allProducts` before sorting. Ensure to import `useMemo` from `react`.
