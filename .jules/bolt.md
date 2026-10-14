## 2024-10-14 - Replace derived state useEffects with useMemo
**Learning:** React state (`useState`) that is entirely computed from other state (like `allProducts`, `category`, `search`, and `sort`) introduces a double-render cycle when managed via `useEffect` and `setFilteredProducts`.
**Action:** Replace `useState` and `useEffect` with `useMemo` for derived state to compute filtering/sorting synchronously during the render phase.
