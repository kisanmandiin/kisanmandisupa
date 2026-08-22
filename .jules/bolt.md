## 2024-05-19 - React Anti-Pattern: useEffect for Derived State
**Learning:** Found `useEffect` updating state based on props/other state (`searchTerm` mapping to `filteredProducts`) in `SearchOverlay.jsx`. This causes an unnecessary double-render cycle in React, which can block the main thread slightly on every keypress when searching.
**Action:** Replace `useState` + `useEffect` combinations for derived state with synchronous `useMemo` hooks. This computes the derived state synchronously during render without triggering another render cycle.
