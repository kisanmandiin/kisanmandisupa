
## 2026-10-01 - Derived State Re-render cycle
**Learning:** In React components like Marketplace, maintaining derived state (like `filteredProducts`) with `useState` that is subsequently updated via `useEffect` introduces an unavoidable double-render cycle for every dependency change.
**Action:** Use `useMemo` to synchronously compute derived state during render. Also, ensure redundant cloning (e.g., using spread operator on array returned by `.filter()`) is avoided before applying mutative methods like `.sort()`.
