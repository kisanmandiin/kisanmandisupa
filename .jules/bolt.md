
## 2024-07-03 - [Vite Large Chunk Warning Mitigation]
**Learning:** The main application bundle was generating a warning because it exceeded 500kB due to statically importing all route components in `App.jsx`.
**Action:** Use React `lazy` and `Suspense` for route components to implement code splitting, which significantly reduces the initial bundle size and improves Time To Interactive (TTI). This is a safe and high-impact optimization for single-page applications.
