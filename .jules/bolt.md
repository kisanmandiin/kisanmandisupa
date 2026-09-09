## 2024-05-18 - Derived State Anti-Pattern in React
**Learning:** Both `Marketplace.jsx` and `SearchOverlay.jsx` were using a `useState` + `useEffect` combination to maintain `filteredProducts`. This is a classic React anti-pattern that causes unavoidable double-render cycles (initial render -> effect runs -> state updates -> re-render), degrading performance on every search keystroke or category change.
**Action:** Always prefer computing derived state synchronously during the render phase using `useMemo` instead of syncing it via `useEffect`.
