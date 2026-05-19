## 2026-05-19 - Marketplace Derived State Double Render
**Learning:** Using `useEffect` to update derived state (like filtered lists) causes inefficient double-render cycles in React. Additionally, unconditionally cloning arrays (`[...array]`) before filtering causes unnecessary memory allocations because `.filter()` already returns a new array.
**Action:** Use `useMemo` to compute derived state synchronously during render. Delay array cloning until immediately before mutating methods (like `.sort()`) are called.
