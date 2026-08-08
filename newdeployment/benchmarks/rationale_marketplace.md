# Marketplace Derived State Optimization

## What
Refactored `filteredProducts` in `Marketplace.jsx` to use `useMemo` instead of being a separate `useState` updated via a `useEffect`. Also optimized array cloning inside the `useMemo` block.

## Why
Previously, when filter parameters (`search`, `category`, `sort`) or `allProducts` changed, the component would render once (with old `filteredProducts`), the `useEffect` would run to compute new filtered products and call `setFilteredProducts`, and then the component would render a *second* time with the new data. This is a classic React double-render anti-pattern.
Additionally, the previous implementation unconditionally cloned the `allProducts` array (`[...allProducts]`) before applying filters. Since `Array.filter()` creates a new array instance anyway, this initial clone was a wasted memory allocation.

## Impact
- **Re-renders**: Reduced re-renders by 50% when changing filters, as the derived state is now computed synchronously during the initial render pass.
- **Memory**: Avoids unnecessary array allocation when filtering is applied. Cloning is now delayed until right before sorting, and only if a new array hasn't already been created by a filter.

## Measurement
Using React Profiler, switching categories or typing in the search bar previously resulted in two discrete commit phases. With the `useMemo` implementation, this is reduced to a single commit phase, providing a smoother UI experience and less work for the main thread.
