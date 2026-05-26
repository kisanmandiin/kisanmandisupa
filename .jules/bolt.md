## 2024-05-24 - Avoid Redundant Array Spreads Before Sorting
**Learning:** In React optimizations (e.g., `useMemo` hooks), if an array is already newly instantiated by an immutable method like `.filter()`, using the spread operator (`[...filtered].sort()`) before sorting forces a second, unnecessary array allocation.
**Action:** Always check the origin of the array reference before mutating. Only clone original state arrays before sorting; chained operations after a `.filter()` or `.map()` are already operating on safe, local references and can be sorted directly to save memory overhead.
