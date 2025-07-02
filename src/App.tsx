// App.tsx
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FutureverseAuthProvider } from '@futureverse/auth-react';
import { FutureverseAuthClient } from '@futureverse/auth-react/auth';
import { useAuth } from '@futureverse/auth-react';

const authClient = new FutureverseAuthClient({
  clientId: 'Ug3k_XbN1wXZlPDvgK_Ge',
  environment: 'staging',
  redirectUri: 'http://localhost:5173/',
  postLogoutRedirectUri: 'http://localhost:5173/',
});

const queryClient = new QueryClient();

function AppContent() {
  const { userSession, signIn, authClient } = useAuth();

  const handleLogin = async () => {
    try {
      await signIn({ authFlow: 'redirect' });
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await authClient.signOutPass({ flow: 'redirect' });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (userSession) {
    return (
      <div style={{ textAlign: 'center', marginTop: '4rem' }}>
        <h2>Welcome!</h2>
        <p>You are signed in with Pass</p>
        <p>User ID: {userSession.user?.profile?.sub}</p>
        <button onClick={handleLogout}>Sign Out</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h2>Sign In with Pass</h2>
      <p>Click the button below to sign in using Futureverse Pass</p>
      <button onClick={handleLogin}>Sign In with Pass</button>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FutureverseAuthProvider authClient={authClient}>
        <AppContent />
      </FutureverseAuthProvider>
    </QueryClientProvider>
  );
}
