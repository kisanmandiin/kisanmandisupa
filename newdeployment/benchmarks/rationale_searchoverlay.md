# SearchOverlay Performance Optimization Rationale

## The Problem
The `SearchOverlay` component was using an anti-pattern for derived state:
```javascript
const [filteredProducts, setFilteredProducts] = useState([]);
useEffect(() => {
    // filtering logic...
    setFilteredProducts(results);
}, [searchTerm, allProducts]);
```
When `searchTerm` changes, React triggers a re-render. Then the `useEffect` runs, performs the filter, and calls `setFilteredProducts(results)`. This queues *another* re-render, resulting in a double-render cycle for every keystroke during a search.

## The Solution
We replaced the `useState` + `useEffect` combination with `useMemo`.
```javascript
const filteredProducts = useMemo(() => {
    // filtering logic...
    return results;
}, [searchTerm, allProducts]);
```

## Impact
- **Eliminates double-renders**: The DOM updates in a single render pass when the user types.
- **Improves typing responsiveness**: The main thread is less blocked since React isn't committing to the DOM twice.
- **Reduces memory allocation**: We don't allocate an empty array on the initial state setup just to overwrite it later.
