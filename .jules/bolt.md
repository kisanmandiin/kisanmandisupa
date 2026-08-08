## 2025-02-08 - Array Cloning in React Derived State
**Learning:** When using `useMemo` to filter and sort arrays for derived state in React, unconditionally cloning the source array (`[...array]`) before applying `.filter()` is a wasted memory allocation because `.filter()` natively returns a new array instance.
**Action:** Always track if a mutative filter operation has occurred in the memoized block and conditionally apply the spread operator only immediately before `.sort()` if the array hasn't already been cloned.
