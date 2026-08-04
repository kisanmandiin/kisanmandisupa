# Marketplace - Derived State Optimization

## The Bottleneck
In `Marketplace.jsx`, the component managed `filteredProducts` using `useState` and updated it inside a `useEffect` whenever `search`, `category`, `sort`, or `allProducts` changed.

This is a well-known React anti-pattern for derived state because it causes a double-render cycle:
1. State changes (e.g., user types in `search` or changes `category`).
2. React re-renders the component with the old `filteredProducts`.
3. The `useEffect` fires, computing the new array and calling `setFilteredProducts`.
4. React re-renders *again* with the new `filteredProducts`.

Furthermore, the original code unconditionally cloned the entire array using `[...allProducts]` on every change, even if no sorting or filtering was strictly necessary, causing unnecessary memory allocations.

## The Optimization
Replaced the `useEffect` and `useState` pair with a single `useMemo` hook.

## Impact & Measurement
- **Renders:** Reduces the number of renders by 50% when changing filters, categories, or sort orders. The UI updates in a single synchronous pass.
- **Memory Allocation:** The new `useMemo` avoids unconditionally creating a new array `[...filtered]`. Since `.filter()` returns a new array natively, we only manually clone the array before `.sort()` if it's identical to `allProducts`.
