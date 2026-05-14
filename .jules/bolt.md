
## 2024-05-14 - Redundant Array Cloning in useMemo
**Learning:** When using `useMemo` for filtering and sorting, spreading an array before filtering (`[...array].filter(...)`) introduces an unnecessary O(N) allocation because `.filter()` inherently returns a shallow copy.
**Action:** Remove redundant array spreads before functional array methods that return new copies natively inside `useMemo` blocks to save memory.
