## 2026-05-21 - [SearchOverlay Derived State]
**Learning:** Using `useState` + `useEffect` for derived state (like live filtering a search term against a list of products) causes a double-render anti-pattern that can block the main thread and cause UI tearing.
**Action:** Always prefer computing derived state synchronously during the render phase using `useMemo`. We refactored `SearchOverlay.jsx` to use `useMemo` for filtering products based on the search term.
