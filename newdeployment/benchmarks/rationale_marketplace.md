# Performance Rationale: Marketplace Derived State Optimization

## 💡 What
Refactored the `Marketplace.jsx` component to calculate `filteredProducts` using `useMemo` instead of deriving state via a `useEffect` hook. Additionally, delayed array cloning `[...array]` until right before `.sort()` is called.

## 🎯 Why
Previously, `filteredProducts` was stored as state (`useState`) and updated inside a `useEffect` hook whenever the `search`, `category`, `sort`, or `allProducts` dependencies changed.
This pattern is an anti-pattern in React because it causes double-render cycles:
1. The component renders when a dependency (like `search` input or `allProducts` load) changes.
2. The `useEffect` fires, computing the new filtered array and calling `setFilteredProducts`.
3. The state update triggers a *second*, unnecessary render cycle to display the new products.

By moving this to `useMemo`, the derived `filteredProducts` is computed synchronously during the *first* render cycle, preventing the second render entirely.

Furthermore, the old code unconditionally cloned the `allProducts` array `let filtered = [...allProducts];` on every effect run, which is an O(N) memory allocation operation. The new code delays this cloning step until sorting is actually required, as `.filter()` already returns a new array and doesn't mutate the original.

## 📊 Impact
* **Render Cycles:** Reduces render cycles during category changes, sorting, and initial load by 50% (from 2 renders to 1 render per state change).
* **Memory Allocation:** Prevents unnecessary array cloning when filtering operations occur without a sort selected, reducing memory churn and garbage collection pauses.

## 🔬 Measurement
This optimization can be verified by observing React DevTools Profiler during filter/sort interactions. The component will now only commit a single render per interaction instead of cascading updates.
