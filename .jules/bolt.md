
## 2025-02-12 - [Optimized Marketplace Filters]
**Learning:** Derived state in React components (like filtered arrays) computed via `useState` and `useEffect` creates unnecessary double render cycles that negatively impact performance. The `Marketplace.jsx` component updated `filteredProducts` whenever `category`, `search`, or `sort` changed, leading to this anti-pattern.
**Action:** Replace `useEffect` and `useState` with `useMemo` for synchronously computing derived state during render. Furthermore, when combining array operations like `filter` and `sort`, ensure unnecessary cloning (e.g. `[...filtered]`) is avoided if a previous operation (`filter`) has already created a new array instance.
