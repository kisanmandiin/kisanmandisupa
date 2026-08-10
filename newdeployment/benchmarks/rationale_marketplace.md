# Marketplace.jsx Performance Optimization Rationale

## The Problem
The `Marketplace` component was maintaining a derived state (`filteredProducts`) in a `useState` hook and updating it via a `useEffect` hook. This pattern is a known React anti-pattern because it causes a double-render:
1. First render: Dependency states (like `search`, `category`, or `sort`) change.
2. The component renders with the *old* `filteredProducts` array.
3. The `useEffect` triggers and calculates the new array.
4. `setFilteredProducts` is called.
5. Second render: The component re-renders with the *new* `filteredProducts` array.

Additionally, the old code was unconditionally cloning the array (`[...allProducts]`) on every execution of the `useEffect`, leading to unnecessary memory allocations even when no sorting was applied (or when filtering was already creating new array instances).

## The Solution
We replaced the `useEffect` block with a synchronous `useMemo` hook.
```javascript
const filteredProducts = useMemo(() => {
    // ...
}, [search, category, sort, allProducts]);
```
We also implemented delayed array cloning. We track whether a new array instance was already created via `.filter()` using an `isCloned` flag. If no filtering occurred, we only clone the array if `.sort()` is about to be called, which mutates in place.

## The Impact
- **Eliminated Double-Renders:** When a user types in the search box or changes a category, the component now renders exactly once per state change, computing the filtered list synchronously before generating the virtual DOM.
- **Reduced Memory Pressure:** Unconditional array cloning is avoided, reducing garbage collection overhead.
- **Low Risk:** The business logic (filtering rules and sorting conditions) remains exactly the same.
