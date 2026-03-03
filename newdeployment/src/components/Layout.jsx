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
            {/* ⚡ Bolt Optimization: Suspense boundary added to handle loading states for lazy-loaded routes in App.jsx.
                This ensures a smooth user experience while split chunks are downloaded over the network. */}
            <Suspense fallback={<div className="flex h-screen w-screen items-center justify-center bg-[#F2F4EB]"><div className="h-12 w-12 animate-spin rounded-full border-4 border-[#2D5A27] border-t-transparent"></div></div>}>
                <Outlet />
            </Suspense>
            {!hideGlobalNav && <MobileBottomNav />}
        </>
    );
}
