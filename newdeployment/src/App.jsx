import { Routes, Route } from 'react-router-dom';
import React, { useState, useEffect, Suspense } from 'react';
import Layout from './components/Layout';
import SplashScreen from './components/SplashScreen';

// Lazy load route components
const Landing = React.lazy(() => import('./pages/Landing'));
const Marketplace = React.lazy(() => import('./pages/Marketplace'));
const SellerDashboard = React.lazy(() => import('./pages/SellerDashboard'));
const BuyerDashboard = React.lazy(() => import('./pages/BuyerDashboard'));
const Login = React.lazy(() => import('./pages/auth/Login'));
const SignupBuyer = React.lazy(() => import('./pages/auth/SignupBuyer'));
const SignupFarmer = React.lazy(() => import('./pages/auth/SignupFarmer'));
const InstallGuide = React.lazy(() => import('./pages/InstallGuide'));
const EnquiryPage = React.lazy(() => import('./pages/EnquiryPage'));

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
    <Suspense fallback={<SplashScreen />}>
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
