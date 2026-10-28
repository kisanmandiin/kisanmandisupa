
## 2025-02-23 - Avoid Double-Renders with Derived State
**Learning:** In React, updating a `useState` variable (e.g., `filteredProducts`) inside a `useEffect` that listens to other state variables (e.g., `allProducts`, `search`) always triggers a double-render: first for the initial dependency change, and second for the derived state update.
**Action:** Always compute derived state synchronously during render using `useMemo` instead of storing it in a separate `useState` updated via `useEffect`. When using `useMemo`, be mindful to only clone arrays when necessary to avoid unnecessary memory allocations before applying mutative methods like `.sort()`.
