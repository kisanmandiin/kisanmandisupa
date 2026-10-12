## 2024-05-28 - Derived State Optimization
**Learning:** Using useState updated via useEffect for derived state causes unavoidable double-render cycles in React components.
**Action:** Always use useMemo to synchronously compute derived state during render instead.
