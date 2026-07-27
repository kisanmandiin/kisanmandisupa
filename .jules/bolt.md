## 2025-02-14 - Marketplace State Optimization
**Learning:** `Marketplace.jsx` suffered from unnecessary double renders when filtering and sorting due to the usage of `useEffect` paired with a separate `useState` for `filteredProducts`. Further, the component was unconditionally cloning arrays even when not needed.
**Action:** Replaced `useEffect` derived state pattern with `useMemo` to synchronously compute `filteredProducts` on render. Also optimized array cloning to only happen immediately before mutating functions like `sort()`.

## 2025-02-14 - SearchOverlay State Optimization
**Learning:** Just like Marketplace, `SearchOverlay.jsx` was triggering double-renders per keystroke by using `useEffect` and a separate state hook to filter products.
**Action:** Replaced the `useEffect` block with `useMemo` to prevent the extraneous re-render cycle, a crucial optimization for search-as-you-type components.
