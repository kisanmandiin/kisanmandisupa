# Rationale: Marketplace Derived State Optimization

## The Bottleneck
Previously, `Marketplace.jsx` used a `useState` and `useEffect` combination to compute `filteredProducts`. This created a "double-render" cycle:
1. `search`, `category`, `sort`, or `allProducts` changes -> Render 1
2. `useEffect` triggers -> sets `filteredProducts` state -> Render 2
Additionally, the effect cloned the `allProducts` array unconditionally `[...allProducts]`, even when filtering wasn't applied, creating an unnecessary memory allocation on every update.

## The Optimization
We refactored this derived state to use `useMemo`:
- **Single Render Cycle**: `filteredProducts` is computed directly during the main render cycle, avoiding the second render cascade.
- **Delayed Array Cloning**: `useMemo` applies mutations safely by deferring array cloning. It tracks `hasFiltered`, and only creates a new clone `[...filtered]` if sorting is requested and a filter operation (which inherently returns a new array) hasn't already occurred.

## Expected Impact
- Eliminates 1 redundant re-render for every filter/sort change or initial data load.
- Avoids O(N) memory allocations for the entire products array when simply switching between default sorts or when only displaying unfiltered products.