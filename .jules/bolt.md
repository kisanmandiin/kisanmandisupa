## 2025-02-27 - `useState` and `useEffect` performance anti-pattern in React

**Learning:** React components tracking derived state (like `filteredProducts` generated from `products` and user input) via `useState` updated within `useEffect` will trigger double render cycles. Because `useEffect` runs *after* the initial render, the component renders once with old data, and then re-renders again with the updated filtered data. In larger datasets, spreading arrays (`[...array]`) and chaining functional operations like `.sort()` and `.filter()` unconditionally within these loops generates significant garbage collection overhead.

**Action:** Replace `useState` + `useEffect` derived variables with single `useMemo` hooks. This ensures derived computation happens synchronously during the initial render pass, avoiding the double-render cycle entirely and minimizing array spreading/GC overhead.
