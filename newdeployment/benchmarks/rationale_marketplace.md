# Marketplace.jsx Filtering and Sorting Optimization

## What
Refactored the `filteredProducts` state in `Marketplace.jsx` to use `useMemo` instead of a separate `useState` updated via a `useEffect` hook.

## Why
The previous pattern maintained derived state manually. When any filter changed (like `search` or `category`), React would render once, then run `useEffect`, which called `setFilteredProducts`, triggering a second complete render of the component and all its children. This "double-render" pattern was unavoidable and inefficient.
Additionally, the previous code unconditionally cloned the `allProducts` array (`let filtered = [...allProducts]`) on every dependency change, even if it was just going to filter the array immediately after (which already creates a new array).

## Impact
- **Eliminates double-renders**: Computes derived state synchronously during the initial render.
- **Reduces memory allocation**: Only allocates new array instances when strictly necessary (by removing the initial `[...]` spread before `.filter()`, and only cloning before `.sort()` if no filtering was applied).
- **Cleaner code**: Less state synchronization to manage.

## Measurement
Visually tested using a mock execution script to verify that React's `useMemo` behavior avoids the extra `useEffect` state dispatch cycle.
