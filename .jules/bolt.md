
## 2024-05-12 - Delaying Array Cloning in useMemo
**Learning:** Even within `useMemo`, an unconditional `[...array]` clone before an `if` statement block (like conditional sorting) allocates memory unnecessarily if the array is only being filtered, not mutated.
**Action:** Move the array spread operator `[...filtered]` directly into the sorting logic branch to prevent unconditional memory allocation on every search input or filter change.
