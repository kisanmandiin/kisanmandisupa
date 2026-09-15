## 2024-05-18 - React state performance optimization
**Learning:** This codebase previously synced derived data (filtering and sorting arrays) to a local component `useState` by computing them in a `useEffect`. This pattern forces a redundant double render cycle any time dependencies change.
**Action:** When filtering or sorting data, apply `useMemo` so that the final derived array is returned synchronously during the initial main render loop, saving an entire React component lifecycle run.
