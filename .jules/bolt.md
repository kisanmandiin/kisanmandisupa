## 2024-11-04 - Unavoidable Double-Render Cycle in Derived State
**Learning:** The codebase heavily uses `useState` updated via `useEffect` to manage derived state (like filtered lists), which introduces an unavoidable double-render cycle in React.
**Action:** Replace `useEffect` and `useState` with `useMemo` for derived state to compute it synchronously during render. Avoid redundant spread operators by tracking if the array was already cloned (e.g., via `.filter()`) before mutating it with `.sort()`.
