import "./App.css"
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@futureverse/auth-react';
import { useAuthUi } from '@futureverse/auth-ui';
import { FvProviders } from "./providers/providers";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { userSession } = useAuth();
  return userSession ? <>{children}</> : <Navigate to="/" />;
}

function NavBar() {
  const navigate = useNavigate();
  const { userSession, signOutPass } = useAuth();
  const { openLogin } = useAuthUi();

  const handleMyStable = () => {
    if (userSession) {
      navigate('/mystable');
    } else {
      const element = document.getElementById('mystable-section');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', borderBottom: '1px solid #ccc', width: '100%', boxSizing: 'border-box' }}>
      <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center' }}>
        <img src="/logo-grey.svg" alt="Evolution Stables Logo" style={{ height: '40px' }} />
      </div>
      <div style={{ flex: '1 1 auto', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <button onClick={() => navigate('/')} style={{ margin: '0 5px' }}>Home</button>
        <button onClick={() => navigate('/about')} style={{ margin: '0 5px' }}>About</button>
        <button onClick={handleMyStable} style={{ margin: '0 5px' }}>MyStable</button>
      </div>
      <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center' }}>
        {userSession ? (
          <button onClick={() => signOutPass({disableConsent: true, flow: "redirect"})}>Logout</button>
        ) : (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={openLogin}>Login</button>
            <button onClick={openLogin}>Sign Up</button>
          </div>
        )}
      </div>
    </nav>
  );
}

function MainPage() {
  const { userSession } = useAuth();
  const navigate = useNavigate();
  const { openLogin } = useAuthUi();

  return (
    <div style={{ width: '100%', minHeight: '100vh', margin: 0, padding: 0 }}>
      <NavBar />
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <section style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '10px', textAlign: 'center', borderRadius: '8px' }}>
          <h1>Hero</h1>
          <p>Welcome to Evolution Stables!</p>
        </section>
        <section style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '10px', textAlign: 'center', borderRadius: '8px' }}>
          <h1>About</h1>
        </section>
        <section id="mystable-section" style={{ border: '1px solid #ccc', padding: '20px', textAlign: 'center', borderRadius: '8px' }}>
          <h1>MyStable</h1>
          {userSession ? (
            <button onClick={() => navigate('/mystable')}>Go to MyStable</button>
          ) : (
            <button onClick={openLogin}>Login</button>
          )}
        </section>
      </div>
    </div>
  );
}

function MyStable() {
  const { userSession } = useAuth();
  return (
    <div style={{ width: '100%', minHeight: '100vh', margin: 0, padding: 0 }}>
      <NavBar />
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h1>MyStable</h1>
        <p>Your stable is ready! Wallet: {userSession?.futurepass || 'Loading...'}</p>
        <button onClick={() => window.history.back()}>Back to Home</button>
      </div>
    </div>
  );
}

function CallbackPage() {
  const navigate = useNavigate();
  const { userSession } = useAuth();

  // Check if user is authenticated and redirect
  React.useEffect(() => {
    if (userSession) {
      // User is authenticated, redirect to home
      navigate('/', { replace: true });
    } else {
      // Still processing authentication, wait a bit then redirect
      const timer = setTimeout(() => {
        navigate('/', { replace: true });
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [userSession, navigate]);

  return (
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Authenticating...</h2>
        <p>Please wait while we complete your login.</p>
        <div style={{ margin: '20px 0' }}>
          <div style={{ 
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #3498db',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            animation: 'spin 2s linear infinite',
            margin: '0 auto'
          }}></div>
        </div>
        <p><small>If this takes too long, <a href="/" style={{ color: '#3498db', textDecoration: 'underline' }}>click here to go home</a></small></p>
      </div>
    </div>
  );
}

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/about" element={<MainPage />} /> {/* Placeholder */}
      <Route path="/mystable" element={<ProtectedRoute><MyStable /></ProtectedRoute>} />
      <Route path="/callback" element={<CallbackPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <FvProviders>
      <Router>
        <AppContent />
      </Router>
    </FvProviders>
  );
}