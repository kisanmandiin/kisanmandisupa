# Optimization Rationale: Route-Based Code Splitting

## Problem
Currently, all route components in `App.jsx` (`Marketplace`, `SellerDashboard`, `BuyerDashboard`, `Landing`, etc.) are imported synchronously at the top level. This means the JavaScript bundle for the entire application is downloaded and parsed before the initial page can render, increasing Initial Load Time and Time to Interactive (TTI), especially for users on slower connections (common for farmer apps).

## Solution
Implement route-based code splitting using `React.lazy()` and `<Suspense>` in `App.jsx`. By dynamically importing components, Vite (Rollup) will split the application into smaller chunks. The initial bundle will only include the core React library and the current route's code, lazily loading other routes on demand.

## Expected Impact
- Smaller initial bundle size.
- Faster Time to Interactive (TTI).
- Better performance on low-end devices.

## Measurement
Will measure the production build sizes before and after using `npm run build`.

## Before Optimization Build Output
```
> kisan-react@0.0.0 build
> vite build

vite v7.3.1 building client environment for production...
transforming...
✓ 106 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   1.01 kB │ gzip:   0.48 kB
dist/assets/index-i0AaF3Ag.css   77.80 kB │ gzip:  13.15 kB
dist/assets/index-DAurR4Q8.js   526.49 kB │ gzip: 143.35 kB
✓ built in 3.35s

(!) Some chunks are larger than 500 kB after minification. Consider:
- Using dynamic import() to code-split the application
```

## After Optimization Build Output
```
> kisan-react@0.0.0 build
> vite build

vite v7.3.1 building client environment for production...
transforming...
✓ 107 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                            1.01 kB │ gzip:   0.49 kB
dist/assets/index-C_uMN2Nq.css            78.05 kB │ gzip:  13.17 kB
dist/assets/InstallGuide-hcCIcopd.js       4.13 kB │ gzip:   1.33 kB
dist/assets/Landing-Cunbg-Pp.js            4.48 kB │ gzip:   1.69 kB
dist/assets/Navbar-BLIoHoSC.js             4.81 kB │ gzip:   1.98 kB
dist/assets/Login-BJsRula_.js              7.91 kB │ gzip:   2.78 kB
dist/assets/SignupBuyer-DKSn-I7S.js        9.20 kB │ gzip:   3.14 kB
dist/assets/EnquiryPage-D35_trEJ.js        9.20 kB │ gzip:   2.65 kB
dist/assets/SignupFarmer-DCPg_1jc.js      10.96 kB │ gzip:   3.28 kB
dist/assets/Marketplace-DptqhGqG.js       11.60 kB │ gzip:   3.98 kB
dist/assets/BuyerDashboard-ZbXxwCkT.js    17.66 kB │ gzip:   4.96 kB
dist/assets/SellerDashboard-CVIB2eVT.js   28.98 kB │ gzip:   7.48 kB
dist/assets/index-TN3WXU9h.js            420.61 kB │ gzip: 124.13 kB
✓ built in 3.87s
```

## Conclusion
The main bundle size `index-*.js` decreased from `526.49 kB` down to `420.61 kB`. Route components like `SellerDashboard`, `Marketplace`, and `BuyerDashboard` are now correctly bundled into their own lazy-loaded chunks (ranging from `4 kB` to `28 kB`), meaning users no longer download the whole application's UI on the first page load.
