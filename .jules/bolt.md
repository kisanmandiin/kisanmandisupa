## 2026-10-22 - [React useMemo Refactor]
**Learning:** Replaced useEffect + useState with useMemo for derived state in Marketplace.jsx and SearchOverlay.jsx to eliminate unavoidable double-render cycles.
**Action:** Use useMemo for synchronously computing filtered datasets directly during render.
