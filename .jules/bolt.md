## 2026-10-20 - [Optimize Marketplace Filtering]
**Learning:** In the React component 'Marketplace.jsx', a derived state pattern was used (`useState` updated via `useEffect`) for filtering/sorting products. This caused unavoidable double-render cycles.
**Action:** Use `useMemo` to synchronously compute derived state during render. This efficiently filters and sorts arrays, bypassing expensive state updates.
