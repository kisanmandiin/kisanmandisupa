## 2024-11-20 - [Delayed Array Cloning in React State]
**Learning:** When using `useMemo` for filtering and sorting arrays in React, unconditional cloning (e.g., `let filtered = [...array]`) causes unnecessary memory allocations on every re-render. Since `Array.prototype.filter()` returns a new array instance, `.sort()` can mutate it safely without cloning again.
**Action:** Track if a new array was generated (e.g., via `.filter()`) and conditionally clone only if no previous immutable operation occurred before a mutative method like `.sort()` is applied.
