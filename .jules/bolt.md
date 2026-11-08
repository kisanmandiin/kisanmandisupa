## 2024-05-19 - Derived State Optimization
**Learning:** Using `useEffect` to manage derived state (like filtered lists) causes unavoidable double-render cycles in React, degrading UI responsiveness.
**Action:** Replace `useState` and `useEffect` combinations for derived data with `useMemo` to synchronously compute it during rendering.
