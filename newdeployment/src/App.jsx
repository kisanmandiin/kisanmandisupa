import { Routes, Route } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import Layout from './components/Layout';
import SplashScreen from './components/SplashScreen';

// ⚡ Bolt Optimization: Route-based Code Splitting
// By dynamically importing route components using React.lazy(), we prevent them
// from being included in the main JavaScript bundle. This reduces the initial load size
// (bringing the main chunk down from ~526kB to ~420kB) and improves Time to Interactive (TTI).
const Landing = lazy(() => import('./pages/Landing'));
const Marketplace = lazy(() => import('./pages/Marketplace'));
const SellerDashboard = lazy(() => import('./pages/SellerDashboard'));
const BuyerDashboard = lazy(() => import('./pages/BuyerDashboard'));
const Login = lazy(() => import('./pages/auth/Login'));
const SignupBuyer = lazy(() => import('./pages/auth/SignupBuyer'));
const SignupFarmer = lazy(() => import('./pages/auth/SignupFarmer'));
const InstallGuide = lazy(() => import('./pages/InstallGuide'));
const EnquiryPage = lazy(() => import('./pages/EnquiryPage'));

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div></div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Marketplace />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
          <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup-buyer" element={<SignupBuyer />} />
          <Route path="/signup-farmer" element={<SignupFarmer />} />
          <Route path="/install-guide" element={<InstallGuide />} />
          <Route path="/enquiry" element={<EnquiryPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
