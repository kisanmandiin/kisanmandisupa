## 2026-10-03 - Prevent Double Render in Filtered Products
**Learning:** Derived state (like filtered lists) updated via useEffect causes an unavoidable double-render cycle. Additionally, chaining mutative array methods like .sort() directly on cloned arrays [...arr] is inefficient if a prior method like .filter() already returns a new array instance.
**Action:** Always compute derived state synchronously during render using useMemo, and explicitly clone only when prior non-mutative methods are absent.
