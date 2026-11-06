## 2024-03-22 - [Derived State with useEffect]
**Learning:** The `Marketplace.jsx` component uses a `useEffect` to derive `filteredProducts` from `allProducts`, search, and category states. This forces a double-render cycle when state changes.
**Action:** Replace derived state handled in `useEffect` with `useMemo` for synchronous evaluation during the render phase. When modifying arrays from `useMemo`, avoid unneeded clones (spread operator) if an earlier operation like `filter()` has already created a new array instance.
