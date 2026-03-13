## 2024-03-13 - [Derived State Anti-Pattern]
**Learning:** Setting filtered list state via a useEffect that depends on the full list and filter parameters causes unnecessary double renders.
**Action:** Use useMemo to compute derived state (filtered list) directly during the render cycle to skip an entire redundant React commit phase.
