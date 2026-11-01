## 2026-11-01 - [Derived State Optimization]
**Learning:** Managing derived state (like filtered/sorted products) with useState and useEffect introduces an unavoidable double-render cycle. Additionally, redundant array cloning during memoized sorting wastes memory.
**Action:** Use useMemo to compute derived state synchronously during render, and only clone arrays when prior mutative methods haven't already returned a new instance.
