## 2026-10-23 - [UseMemo for Derived State in React]
**Learning:** When managing derived state in React components (like filtered/sorted products), using `useState` updated via `useEffect` introduces an unavoidable double-render cycle. The first render updates the base state (e.g., fetching products), and the second render is triggered by the effect updating the derived state.
**Action:** Use `useMemo` to synchronously compute derived state during render rather than maintaining a separate state updated via effects.
