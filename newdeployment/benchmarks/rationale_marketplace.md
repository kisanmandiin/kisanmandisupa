# Marketplace Derived State Optimization

## The Problem
The `Marketplace` component was storing `filteredProducts` in a separate `useState` that was updated via a `useEffect` whenever `allProducts`, `search`, `category`, or `sort` changed.
This is a classic React anti-pattern that causes an unavoidable double-render cycle:
1. First render: URL params or `allProducts` change.
2. `useEffect` runs, calculates the new filtered/sorted array, and calls `setFilteredProducts`.
3. Second render: The component re-renders with the new `filteredProducts`.

Furthermore, it was unconditionally cloning the array (`[...allProducts]`) on every change, even if sorting was not required.

## The Solution
We refactored `filteredProducts` to be synchronously computed during render using `useMemo`.
- We only clone the array if sorting is actually applied AND we haven't already created a new array via `.filter()`.

## Expected Impact
- Eliminates 1 unnecessary re-render whenever the user types in the search box, changes categories, or sorts products.
- Reduces memory allocations by avoiding unnecessary array spreads.
