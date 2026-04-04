## 2025-02-14 - Prevent expensive array manipulations on every render with useMemo

**Learning:** This codebase had components like `BuyerQueries` that recalculate derived state (like sorting and filtering a list of records) on every render, which can take ~142ms for a larger set of items (e.g. 10,000 items). Using `useMemo` specifically targets derived values to only recalculate when their dependencies change.

**Action:** Whenever introducing derived state that requires mapping, filtering, or sorting large arrays of data, wrap the calculation in `useMemo` instead of calculating it raw in the component body. This avoids a performance bottleneck that was identified via baseline performance measurements.