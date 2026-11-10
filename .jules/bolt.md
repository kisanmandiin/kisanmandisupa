## 2026-11-10 - Derived State Re-render cycle
**Learning:** Derived states set via useEffect based on other states trigger an unavoidable double-render in React.
**Action:** Use useMemo instead to synchronously compute the derived state during the render cycle.
