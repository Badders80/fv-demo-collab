import { useAuth } from "@futureverse/auth-react";
import { useAuthUi } from "@futureverse/auth-ui";
import "./Navbar.css";

export const Navbar = () => {
  const { userSession, signOutPass } = useAuth();
  const { openLogin } = useAuthUi();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <img src="/Logo-and-Evolution-Gold.svg" alt="Evolution Stables" className="logo" />
        </div>

        {/* Navigation Links */}
        <div className="navbar-nav">
          <a href="#home" className="nav-link">Home</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#mystable" className="nav-link">MyStable</a>
        </div>

        {/* Authentication */}
        <div className="navbar-auth">
          {userSession ? (
            <div className="user-section">
              <span className="user-info">
                Welcome, {userSession.futurepass.slice(0, 6)}...{userSession.futurepass.slice(-4)}
              </span>
              <button 
                onClick={() => signOutPass({disableConsent: true, flow: "redirect"})}
                className="logout-button"
              >
                Logout
              </button>
            </div>
          ) : (
            <button onClick={openLogin} className="login-button">
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
