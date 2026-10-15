## 2024-10-15 - React useEffect Anti-Pattern
**Learning:** Found an unavoidable double-render bottleneck in `Marketplace.jsx` caused by deriving state (`filteredProducts`) using `useEffect` whenever `allProducts` or filter parameters changed. This forces React to render twice per update.
**Action:** Always replace `useEffect` + `useState` pairs used for derived state with synchronous `useMemo` hooks. This ensures exactly one render pass and eliminates layout thrashing.
