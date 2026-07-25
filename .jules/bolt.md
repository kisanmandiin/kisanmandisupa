## 2025-02-23 - Derived State Double-Render Avoidance
**Learning:** Using `useEffect` to synchronize derived state (like filtered lists) with props or other state causes an unavoidable double-render in React components. Furthermore, unconditional array spreading before immutable array operations causes unnecessary memory allocations.
**Action:** Always compute derived state synchronously during render (using `useMemo` if the computation is expensive or object references need to be preserved). Delay array cloning until just before a mutable method (like `.sort()`) actually requires it.
