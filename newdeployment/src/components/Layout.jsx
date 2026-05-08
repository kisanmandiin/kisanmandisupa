import { Outlet, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import MobileBottomNav from './MobileBottomNav';

export default function Layout() {
    const location = useLocation();

    // Hide global nav on auth pages AND the main landing page ('/')
    // Dashboards rely on this global nav now (duplicate imports were removed)
    const hideGlobalNav = ['/login', '/signup-buyer', '/signup-farmer', '/register', '/welcome'].some(path => location.pathname.startsWith(path)) || location.pathname === '/';

    return (
        <>
            {/* ⚡ Bolt: Added Suspense boundary to support lazy-loaded routes */}
            <Suspense fallback={
                <div className="flex h-screen w-full items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
                </div>
            }>
                <Outlet />
            </Suspense>
            {!hideGlobalNav && <MobileBottomNav />}
        </>
    );
}
