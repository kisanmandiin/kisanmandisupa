# Rationale: Marketplace Derived State Optimization

## The Problem
`Marketplace.jsx` was using a `useState` and `useEffect` combination to manage `filteredProducts` based on `search`, `category`, and `sort` dependencies.
This anti-pattern caused an unavoidable double-render on every filter change:
1. Render 1: The dependency changes (e.g., `search` updates).
2. `useEffect` triggers, recalculates the filtered array, and calls `setFilteredProducts`.
3. Render 2: The component re-renders with the new `filteredProducts` state.

Additionally, the code was unconditionally cloning the entire array (`[...allProducts]`) on every execution before applying filters, resulting in unnecessary memory allocation, especially for large lists of products.

## The Solution
We replaced `useEffect` and `useState` with `useMemo`. This computes the `filteredProducts` synchronously during the first render when dependencies change, entirely eliminating the second render.
Furthermore, we delayed the array cloning operation. Since `Array.prototype.filter()` returns a new array instance, we only need to clone the array if no filtering occurred and a mutative operation (like `.sort()`) is about to be applied.

## Impact
- **Re-renders:** Reduced by 50% for every filter or sort interaction.
- **Memory Allocation:** Avoids unnecessary array cloning when no filters are active or when `filter()` naturally returns a new array.
- **Lines of Code:** Simplified state management by removing a redundant `useState` and `useEffect`.
