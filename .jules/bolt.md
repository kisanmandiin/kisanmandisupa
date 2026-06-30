## 2024-06-30 - [Derived State Optimization in Marketplace]
**Learning:** Maintaining derived state (like filtered/sorted lists) in a `useState` that is updated via `useEffect` introduces an unavoidable double-render cycle. It causes the component to render once with updated criteria but stale data, and then again when the effect runs and updates the data state.
**Action:** When state can be calculated entirely from other state or props, compute it synchronously during render, optionally wrapping it in a `useMemo` to prevent unnecessary recalculations. Always prefer derived state over synchronized state.

## 2024-06-30 - [Array Clone Memory Optimization]
**Learning:** `Array.filter()` returns a new array instance. If you need to chain mutative methods like `.sort()` after filtering, you don't need to clone the array again (`[...filtered].sort()`), as it's already a new reference. Unconditional cloning causes unnecessary memory allocation on every render.
**Action:** Delay array clone operations until right before a mutation operation actually demands it, and only clone if the array reference hasn't already been broken by an earlier operation like `filter`.