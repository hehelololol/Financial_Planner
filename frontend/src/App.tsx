import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { NavBar } from './components/NavBar';
import { SideNav } from './components/SideNav';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { SavedPortfolios } from './pages/SavedPortfolios';
import { FirebaseConfigErrorDisplay } from './components/FirebaseConfigError';
import { EnvDebug } from './components/EnvDebug';

function AppLayout() {
  return (
    <div className="min-h-screen bg-fidelity-gray-light">
      <NavBar />
      <div className="flex">
        <SideNav />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/saved-portfolios" element={<SavedPortfolios />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-right" />
        {/* Show Firebase config error if configuration is missing */}
        <FirebaseConfigErrorDisplay />
        {/* Debug component to view all environment variables (development only) */}
        {import.meta.env.DEV && <EnvDebug />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

