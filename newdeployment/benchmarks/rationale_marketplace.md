## Client-side Filtering Optimization in Marketplace.jsx

**What:** Replaced the explicit `useState` for `filteredProducts` that was being updated within a `useEffect` with a dynamic client-side computation using `useMemo()`. Also optimized the spread operator usage (`[...array]`) so that it only executes when a `.sort()` operation is actually required and the array hasn't already been cloned by `.filter()`.

**Why:** Currently `Marketplace.jsx` manages `filteredProducts` using an explicit `useState` updated within a `useEffect`. This means every time a user types a search query or changes a category, it triggers a render cycle for the state change of `search`, then fires the `useEffect`, recalculates the list, and sets the state again, causing a second re-render. Additionally, unconditional array cloning `[...allProducts]` on every re-evaluation leads to unnecessary garbage collection and memory pressure.

**Impact:** By calculating `filteredProducts` synchronously as derived state during render using `useMemo()`, we eliminate redundant render cycles triggered by the state updates in `useEffect`. This improves UI snappiness, especially on mobile devices handling larger datasets.

**Measurement:** The optimization reduces 1 render cycle per filter interaction (search, category, sort). The conditional array spreading ensures lower memory allocations, which was previously happening sequentially across renders.
