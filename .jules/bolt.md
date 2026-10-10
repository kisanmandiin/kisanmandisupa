## 2026-10-10 - [Derived State Optimization]
**Learning:** Maintaining separate useState for filtered arrays updated via useEffect creates an unavoidable double-render cycle. Redundant spread operators inside these hooks also cause unnecessary memory allocations.
**Action:** Always use useMemo to synchronously compute derived state during render, and track whether an array was already cloned (e.g., via .filter()) before applying spread operators prior to mutative methods like .sort().
