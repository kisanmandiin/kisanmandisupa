
## 2025-06-02 - React Router Code Splitting
**Learning:** By default, all imported React Route components inside a central `App.jsx` entry file are bundled synchronously by Vite/Rollup into a single massive chunk (often triggering the 500kB warning). Because not all user roles access all routes (e.g., Buyers don't need the `SellerDashboard`), serving a monolithic bundle blocks the main thread with unnecessary JavaScript parsing.
**Action:** Always refactor top-level `<Route element={<Component />}>` declarations to dynamically import components using `React.lazy(() => import('...'))` wrapped in a `<Suspense>` boundary. This ensures Vite correctly chunks out route-specific code, improving Time to Interactive (TTI) metrics, especially for multi-role applications.
