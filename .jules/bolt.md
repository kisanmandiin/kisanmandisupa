
## 2024-04-24 - React Anti-Pattern: useEffect for Derived State
**Learning:** Three core components (`Marketplace.jsx`, `SearchOverlay.jsx`, and `BuyerQueries.jsx`) suffered from a severe performance anti-pattern: using `useEffect` to manage filtered lists in state. This triggers unnecessary double-render cycles on every filter/search change, allocating arrays repeatedly before sorting them.
**Action:** Always compute derived state synchronously during render using `useMemo`. When sorting within `useMemo`, delay the `[...array]` cloning operation until the moment before calling `.sort()` to prevent unnecessary memory allocations if the filtering steps result in empty or small arrays.
