## 2026-11-07 - Optimize Derived State with useMemo
**Learning:** Maintaining a separate useState updated via useEffect for derived state like filtered results introduces an unavoidable double-render cycle.
**Action:** Use useMemo to synchronously compute derived state during render, and avoid redundant spread operations when chaining mutative array methods.
