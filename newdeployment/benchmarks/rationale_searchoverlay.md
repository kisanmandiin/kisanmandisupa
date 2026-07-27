# Rationale: SearchOverlay Derived State Optimization

## The Problem
`SearchOverlay.jsx` was using a `useState` and `useEffect` combination to manage `filteredProducts` based on the `searchTerm` dependency.
This anti-pattern caused a double-render on every keystroke in the search input:
1. Render 1: The user types a character, `searchTerm` state updates, and the component renders.
2. `useEffect` triggers, recalculates the filtered array, and calls `setFilteredProducts`.
3. Render 2: The component re-renders with the new `filteredProducts` state.

## The Solution
Replaced `useEffect` and `useState` with `useMemo`. The `filteredProducts` array is now synchronously computed during the initial render when the search term changes, entirely eliminating the second render cycle per keystroke.

## Impact
- **Re-renders:** Reduced by 50% during rapid typing in the search bar.
- **Lines of Code:** Simplified component state by removing a redundant setter and effect.
