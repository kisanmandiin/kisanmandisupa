## 2024-05-24 - Efficient Derived State with Arrays
**Learning:** When using derived state with arrays, such as chaining `.filter()` and `.sort()`, `useMemo` is ideal. Ensure safe sorting behavior without mutating the original array (e.g. `(result === allProducts ? [...result] : result).sort(...)`).
**Action:** Consistently use `useMemo` for computationally derived state that doesn't need to be tracked independently across renders.
