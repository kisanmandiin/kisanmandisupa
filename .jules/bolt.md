## 2026-10-08 - Prevent Double-Render Cycles with useMemo
**Learning:** When managing derived state in React (like filtered results), maintaining a separate `useState` updated via `useEffect` introduces an unavoidable double-render cycle.
**Action:** Use `useMemo` to synchronously compute derived state during render, avoiding redundant re-renders.
