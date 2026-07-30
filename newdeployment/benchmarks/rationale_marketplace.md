# Marketplace Derived State Optimization

## What
Removed `filteredProducts` from `useState` and the associated `useEffect` that was responsible for filtering and sorting the product list when search, category, or sorting parameters changed. Replaced it with a synchronous `useMemo` derived state computation.

## Why
When using `useEffect` to synchronize state based on changes to props or other state variables (like `search` or `category`), React has to perform two render cycles:
1. The first render happens with the updated `search` parameter, but with the old `filteredProducts` list.
2. The `useEffect` fires, computing the new filtered list, and calls `setFilteredProducts`.
3. A second render is triggered with the updated `filteredProducts`.

This double-render cycle causes UI jank, especially on mobile devices or larger product lists, and wastes CPU cycles rendering intermediate states that the user doesn't need to see.

## Impact
- **Eliminates Double Render:** Reduces render cycles by 50% when a user searches, filters, or sorts products.
- **Memory Optimization:** By delaying the array spread operator (`[...array]`) until right before the mutation operation (`.sort()`), we avoid unconditional memory allocation on every re-render when filtering is unchanged.
- **Simpler State:** Reduces the number of state variables to track and manage.

## Measurement
A profile of the component during a text search input change shows:
- **Before:** `Marketplace` renders twice per keystroke (once for input change, once for effect state update).
- **After:** `Marketplace` renders exactly once per keystroke, with the filtered items immediately available during that render pass.
