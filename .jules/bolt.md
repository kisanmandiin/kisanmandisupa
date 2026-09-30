## 2024-05-18 - Replacing `useState` and `useEffect` with `useMemo` for derived states
**Learning:** Derived states like `filteredProducts` from base arrays and inputs in React cause unnecessary double re-render cycles when computed inside a `useEffect` hook. A single re-render happens when inputs change, followed by a second re-render when the `useState` is updated from the `useEffect`.
**Action:** Use `useMemo` for computing derived synchronous arrays immediately during render so it’s only performed once and prevents double rendering components, reducing main thread blockages.
