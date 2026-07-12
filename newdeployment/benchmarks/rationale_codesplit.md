# Code Splitting Optimization

## Objective
Reduce the main application bundle size to improve initial load time and prevent the ">500 kB" chunk warning from Vite.

## Rationale
Currently, all pages (Marketplace, Dashboards, Auth pages, etc.) are imported synchronously in `App.jsx`. This means a user downloading the site has to download the code for the Seller Dashboard, Buyer Dashboard, and all authentication pages even if they are just visiting the Landing page or Marketplace.

By using `React.lazy()` and `<Suspense>`, we can split these route components into separate JavaScript chunks. These chunks are only loaded over the network when the user navigates to those specific routes, significantly reducing the initial payload (Time to Interactive).

## Performance Impact
- Reduces initial JS bundle size significantly (resolving Vite's large chunk warning).
- Faster First Contentful Paint (FCP) and Time to Interactive (TTI) on initial load.
