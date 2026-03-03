import { Routes, Route } from 'react-router-dom';
import { useState, useEffect, lazy } from 'react';
import Layout from './components/Layout';
import SplashScreen from './components/SplashScreen';

// ⚡ Bolt Optimization: Implement route-based code splitting using React.lazy.
// This defers loading page components until their respective routes are visited,
// significantly reducing the initial JavaScript bundle size and improving initial load time.
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
  );
}

export default App;
