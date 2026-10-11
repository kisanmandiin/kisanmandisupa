## 2024-06-25 - React Derived State Bottleneck in Marketplace

**Learning:** Managing derived state (e.g., filtered/sorted lists) via `useState` and updating it via `useEffect` causes a guaranteed, unavoidable double-render in React on every dependency change.
**Action:** When filtering or sorting data locally based on state, always use `useMemo` to compute the result synchronously during render.
