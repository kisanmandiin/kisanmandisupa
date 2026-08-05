# Rationale: Marketplace Filtering & Sorting Optimization

## What
Removed the `filteredProducts` component state (`useState`) and its associated `useEffect` update logic. Replaced it with a synchronous `useMemo` computation. Also, deferred the array spread operation (`[...allProducts]`) until strictly needed right before `.sort()`.

## Why
1.  **Double Render Elimination:** Updating derived state (`filteredProducts`) inside a `useEffect` based on prop/state changes (`allProducts`, `category`, `search`, `sort`) triggers an unavoidable double-render cycle. The first render processes the dependency changes, and the subsequent `useEffect` triggers a second render to display the filtered items.
2.  **Memory Allocation Avoidance:** The previous `useEffect` performed an unconditional `[...allProducts]` array spread on every execution. Since `.filter()` automatically returns a new array instance, spreading is redundant if filtering occurs. Furthermore, spreading is completely unnecessary when neither filtering nor sorting modifies the original dataset order, wasting memory and garbage collection cycles on every re-render.

## Impact
-   **Render Cycles:** Reduces render cycles triggered by filter/sort interactions from 2 to 1 (50% reduction).
-   **Memory Overhead:** Avoids unconditional array allocations (O(N) memory operations) on every render, executing the clone strictly when sorting demands mutation on a raw dataset.

## Measurement
Using React DevTools Profiler, interactions with the Category Row or Sort Dropdown now result in a single commit phase instead of two. The elimination of the unconditional array clone reduces baseline memory pressure during standard component re-renders.
