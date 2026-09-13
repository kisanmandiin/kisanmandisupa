## 2023-09-13 - Optimize Marketplace Filtered Products State
**Learning:** Found a performance bottleneck where derived state (`filteredProducts`) was maintained via a separate `useState` updated by a `useEffect`. This anti-pattern forced an unnecessary double-render cycle whenever search, sorting, or product data changed.
**Action:** When filtering or sorting lists based on other state variables, always compute the derived state synchronously during render using `useMemo` instead of relying on `useEffect` and an extra state variable.
