## 2024-06-08 - Unnecessary Memory Allocation in Derived State

**Learning:** When using `useMemo` for derived state filtering and sorting, spreading/cloning an array (e.g., `[...allProducts]`) *before* filtering or if sorting isn't needed causes unconditional `O(N)` memory allocation on every render. Because methods like `.filter()` already return a new array instance, they can be safely mutated by `.sort()` later.

**Action:** Delay array clone operations (`[...array]`) in React derived state computations until right before a mutation operation like `.sort()` actually demands it. Never clone unconditionally at the top of a `useMemo` block.