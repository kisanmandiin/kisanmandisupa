# Rationale: Marketplace Derived State Optimization

## The Problem
The `Marketplace` component was maintaining a secondary React state (`filteredProducts`) that was updated inside a `useEffect` whenever the primary state (`allProducts`), search text, or category changed. This is a known React anti-pattern that triggers a double-render cycle:
1. Render 1: `allProducts`, `search`, or `category` changes. Component renders.
2. `useEffect` runs, computes the filtered list, and calls `setFilteredProducts`.
3. Render 2: State has updated, component renders again with the new list.

Additionally, the original logic always spread the entire `allProducts` array (`let filtered = [...allProducts]`) on every dependency change, even if no sorting mutation was going to occur, leading to unnecessary memory allocations and garbage collection overhead.

## The Solution
Replaced `useState` and `useEffect` with `useMemo`. `filteredProducts` is now computed synchronously during the render phase.

```javascript
    // ⚡ Bolt: Use useMemo for derived state to prevent double-render cycle
    // Measure: Eliminates unnecessary re-renders when filtering/sorting. Avoids array spread memory allocation unless mutating.
    const filteredProducts = useMemo(() => {
        let filtered = allProducts;
        let isFiltered = false;

        // ... filtering logic ... (sets isFiltered = true)

        if (sort === 'price_asc') {
            if (!isFiltered) filtered = [...filtered];
            filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        }
        // ...
        return filtered;
    }, [search, category, sort, allProducts]);
```

We only clone the array (`[...filtered]`) if we need to sort AND we haven't already created a new array instance via the `.filter()` method.

## Impact
- **Re-renders:** Reduced by 50% during search typing or category switching.
- **Memory:** Avoids allocating a new array copy on every keystroke when filtering is active (since `.filter` already returns a new array, and we avoid the initial unconditional `[...allProducts]`).
