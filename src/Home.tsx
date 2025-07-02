import { useAuth } from "@futureverse/auth-react";
import { useAuthUi } from "@futureverse/auth-ui";

export const Home = () => {

  const { userSession, signOutPass } = useAuth();
  const { openLogin } = useAuthUi();
  

  return (
    <div>
      <h2>Pass Demo App</h2>
      <p>This is a simple demo for the Pass Auth Flow</p>

      {userSession ? (
        <div>
          <h2>Pass Address</h2>
          <div style={{ marginBottom: '16px'}}>{userSession.futurepass.slice(0, 8)}...{userSession.futurepass.slice(-6)}</div>
          <button onClick={() => signOutPass({disableConsent: true, flow: "redirect"})}>Logout</button>
        </div>
      ) : (
        <button onClick={openLogin}>Log In</button>
      )}
    </div>
  );
}