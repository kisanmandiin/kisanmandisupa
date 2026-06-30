# Performance Rationale: Marketplace Derived State Optimization

## The Problem
The `Marketplace` component was maintaining a secondary React state for `filteredProducts` which was updated via a `useEffect` hook listening to `search`, `category`, `sort`, and `allProducts`.

This pattern creates an **unavoidable double-render cycle**:
1. Render 1: The user changes a filter (e.g., types in search, changing URL params which updates `search`). The component renders with the *new* search term, but the *old* `filteredProducts` array.
2. The `useEffect` triggers, applying the filter to the data and calling `setFilteredProducts`.
3. Render 2: The component renders again with the updated `filteredProducts`.

Furthermore, the old implementation unconditionally copied the array `[...allProducts]` on every filter change, even if no mutations (like sort) were going to happen, causing unnecessary memory allocation.

## The Solution
We replaced the `useState` and `useEffect` with a synchronous `useMemo` hook:
```javascript
const filteredProducts = useMemo(() => {
    // ... compute derived state synchronously
}, [search, category, sort, allProducts]);
```

We also optimized memory usage within the hook:
- We track an `isCloned` flag.
- Array cloning (`[...filtered]`) is delayed until right before the mutative `.sort()` method.
- It only clones if the array hasn't already been shallow-cloned by the preceding `.filter()` calls.

## Impact
- **Eliminates UI tearing / Double Renders**: The UI now updates exactly once in sync with the filter state.
- **Reduces Main Thread Blocking**: By skipping the intermediate render cycle, interactions feel snappier.
- **Lower Memory Overhead**: Reduced unnecessary array cloning for users who just filter without sorting.