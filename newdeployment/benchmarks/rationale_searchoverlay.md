## Performance Rationale: SearchOverlay Derived State Computation

### Problem Context
In `newdeployment/src/components/SearchOverlay.jsx`, the component maintains three pieces of related state:
1. `searchTerm`
2. `allProducts` (all loaded products)
3. `filteredProducts` (the subset matching the search)

Currently, the filtering logic is implemented inside a `useEffect` that triggers when `searchTerm` or `allProducts` changes, and calls `setFilteredProducts(results)`.

**Why is this sub-optimal?**
This is an anti-pattern in React because it causes redundant render cycles:
1. User types in input -> `setSearchTerm` updates state.
2. React re-renders component with new `searchTerm` (Render 1).
3. `useEffect` runs, calculates new `filteredProducts`, and calls `setFilteredProducts`.
4. State change triggers *another* re-render with new `filteredProducts` (Render 2).

### Solution
Instead of `useEffect` + `useState`, `filteredProducts` should be a derived value computed directly during render using `useMemo`.

```javascript
const filteredProducts = useMemo(() => {
    if (!searchTerm) return [];
    const lower = searchTerm.toLowerCase();
    return allProducts.filter(p =>
        p.name.toLowerCase().includes(lower) ||
        (p.category || "").toLowerCase().includes(lower) ||
        (p.description || "").toLowerCase().includes(lower)
    );
}, [searchTerm, allProducts]);
```

### Expected Impact
- Eliminates 1 unnecessary render cycle per keystroke in the search bar.
- Eliminates 1 piece of state (`filteredProducts` state variable).
- Guarantees `filteredProducts` is always completely in sync with `searchTerm` and `allProducts` with zero frames of "stale" state.
