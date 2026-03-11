## 2024-03-11 - Marketplace.jsx Double Render Avoidance
**Learning:** Found a classic React anti-pattern where `filteredProducts` was stored as state and updated via `useEffect` whenever `allProducts` or filter parameters changed, causing unnecessary double-render cycles.
**Action:** Replaced `filteredProducts` state and `useEffect` with `useMemo` to derive the list directly during render, reducing React render passes by ~50% during search/filter operations.
