import { useEffect, useState } from 'react';
import { useAuth } from '@futureverse/auth-react';
import { useNavigate } from "react-router";

import type { UserSession } from '@futureverse/auth';
import { useAuthUi } from '@futureverse/auth-ui';

export default function Login() {
  const { openLogin } = useAuthUi();
  const { authClient } = useAuth();
  const [signInState, setSignInState] = useState<null | boolean>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userStateChange = (user: UserSession | undefined) => {
      if (user) {
        console.log('User signed in:', user);
        setSignInState(true);
        navigate('/');
      } else {
        setSignInState(false);
      }
    };
    authClient.addUserStateListener(userStateChange);
    return () => {
      authClient.removeUserStateListener(userStateChange);
    };
  }, [authClient, navigate]);

  if (signInState === true) {
    return <div>Redirecting, please wait...</div>;
  }

  if (signInState === false) {
    return (
      <div>
        <div>Not Authenticated - Please Log In...</div>
        <button onClick={openLogin}>Log In</button>
      </div>
    );
  }

  return <div>Authenticating...</div>;
} 