## 2024-08-09 - React.lazy Code Splitting Route Chunks
**Learning:** The initial Vite production build output monolithic JS chunks over the >500kB warning threshold. Implementing route-level code splitting using `React.lazy()` and `<Suspense>` for top-level pages successfully chunks the bundle, avoiding downloading unused JavaScript on initial load.
**Action:** When working in Vite/React projects and noticing large chunk sizes in `npm run build` output, prefer utilizing `React.lazy()` on routing endpoints (inside the `react-router-dom` definitions) as a low-risk, high-impact performance win.
