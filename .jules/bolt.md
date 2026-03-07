## 2024-05-15 - [Derived State Optimization]
**Learning:** `useState` coupled with `useEffect` to derive state causes unnecessary double rendering.
**Action:** Used `useMemo` in `SearchOverlay.jsx` to compute `filteredProducts` immediately during render, reducing re-renders.
