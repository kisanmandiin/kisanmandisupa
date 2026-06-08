# Performance Rationale: Derived State Optimization (`useMemo`)

## Overview
This document outlines the performance optimization implemented in `Marketplace.jsx` and `SearchOverlay.jsx`. The optimization involves replacing the standard `useState` and `useEffect` combination used for derived state (filtering and sorting lists) with the `useMemo` hook.

## Problem Context
In React, maintaining state for "derived" values—such as a filtered list of products (`filteredProducts`) that depends purely on an original list (`allProducts`) and a search query (`searchTerm`)—often leads to a performance bottleneck known as the "double-render" cycle.

Previously, `Marketplace.jsx` and `SearchOverlay.jsx` used this pattern:
1. React renders because `searchTerm` changes.
2. The `useEffect` triggers, performing the filter/sort computation.
3. The `useEffect` calls `setFilteredProducts(results)`.
4. The state update triggers a **second**, subsequent render cycle to display the new list.

When the user types quickly or the underlying dataset is large, this pattern causes significant main thread blocking and jank.

## The Optimization
The `useState` and `useEffect` hooks for `filteredProducts` were replaced with a single `useMemo` computation.

```javascript
// BEFORE (Double render)
const [filteredProducts, setFilteredProducts] = useState([]);
useEffect(() => {
    const results = allProducts.filter(/* ... */);
    setFilteredProducts(results);
}, [searchTerm, allProducts]);

// AFTER (Single render)
const filteredProducts = useMemo(() => {
    return allProducts.filter(/* ... */);
}, [searchTerm, allProducts]);
```

### Additional Optimization (Marketplace.jsx)
In `Marketplace.jsx`, we also optimized array cloning during the sorting phase. Previously, the array was cloned on every render before filtering or sorting:
`let filtered = [...allProducts];`

This was changed to delay memory allocation until right before the mutative `.sort()` method requires it, ensuring that simply changing the category or search string doesn't incur an unnecessary memory allocation penalty.
```javascript
// Delay cloning until sort is required
if (sort === 'price_asc' || sort === 'price_desc') {
    filtered = [...filtered].sort((a, b) => { /* ... */ });
}
```

## Expected Performance Impact
- **Render Cycles:** Reduces render cycles by exactly 50% for every filter or sort interaction.
- **Main Thread Block Time:** By computing the array synchronously during the render phase and avoiding the state-update scheduler, the main thread is freed up faster, resulting in a more responsive UI during typing.
- **Memory Allocation:** Prevents unconditional array cloning (`O(N)` memory) on non-sort filter changes in `Marketplace.jsx`.