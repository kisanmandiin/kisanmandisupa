## 2024-05-24 - React Derived State Rendering
**Learning:** Maintaining derived state (like filtered/sorted lists) in a separate `useState` updated via `useEffect` introduces an unavoidable double-render cycle.
**Action:** Use `useMemo` to synchronously compute derived state during render to avoid the extra render cycle and improve performance.
