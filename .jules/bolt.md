
## $(date +%Y-%m-%d) - App Route Code Splitting
**Learning:** React Router v7 and Vite can easily hit main bundle size limits (e.g., 500KB chunk size warning) when all page routes are statically imported in `App.jsx`, causing unnecessary frontend load overhead.
**Action:** Use `React.lazy()` and `<Suspense>` for route-level components in React router setups to offload distinct page bundles, reusing existing load states (like `SplashScreen`) as the fallback to maintain UX while optimizing TTI.
