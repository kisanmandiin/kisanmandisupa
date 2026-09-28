## 2026-09-28 - UseMemo for Derived State
**Learning:** In React components managing large lists (like Marketplace), using useEffect to filter and set derived state causes unavoidable double-render cycles.
**Action:** Use useMemo to synchronously compute derived state (filtered and sorted arrays) during render instead of maintaining a separate useState updated via useEffect.
