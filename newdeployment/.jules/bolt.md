## 2024-03-20 - Derived State Anti-pattern causing double renders
**Learning:** Using `useEffect` to sync derived state (like `filteredProducts`) from props or other state variables causes unnecessary double re-renders. The component renders once with old data, the `useEffect` fires, updates state, and forces a second render.
**Action:** Use `useMemo` to derive state directly during the render phase instead of syncing it via `useEffect`. This completely avoids the second render cycle and guarantees the derived data is always up-to-date with its dependencies.
