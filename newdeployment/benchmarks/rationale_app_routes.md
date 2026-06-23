# Performance Rationale: App Route Code Splitting

## Problem
The main application bundle (`index.js`) was getting large (~526 KB) because all route components were statically imported in `App.jsx`. This caused Vite to warn:
`(!) Some chunks are larger than 500 kB after minification.`
Static imports force the browser to download and parse the entire application (including Dashboard, Marketplace, Auth pages, etc.) before the initial render, increasing the Time to Interactive (TTI) for new users landing on the application.

## Solution
Implemented route-based code splitting using React's `lazy` and `Suspense`. Each route component is now dynamically imported only when its path is visited. The existing `<SplashScreen />` component was reused as the `Suspense` fallback.

## Impact
- The main bundle (`index.js`) size was reduced by ~20% (from 526 KB to 420 KB).
- Application pages are now split into separate chunks, allowing faster initial load.
- Users only download the code needed for the page they are currently visiting.
