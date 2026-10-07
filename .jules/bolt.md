## 2026-10-07 - Derived State Double Render Anti-Pattern
**Learning:** Managing derived state (like filtered products) in a separate useState updated via useEffect introduces an unavoidable double-render cycle.
**Action:** Use useMemo to synchronously compute derived state during render to prevent double rendering and avoid redundant array cloning for mutative operations like sort.
