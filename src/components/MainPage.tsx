import React from 'react';
import { useAuth } from '@futureverse/auth-react';
import { useAuthUi } from '@futureverse/auth-ui';
import './MainPage.css';

const MainPage: React.FC = () => {
  const { userSession } = useAuth();
  const { openLogin } = useAuthUi();

  return (
    <div className="main-page">
      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to Evolution Stables</h1>
            <p className="hero-subtitle">Experience the future of digital horse ownership and racing</p>
            <div className="hero-buttons">
              {userSession ? (
                <a href="#mystable" className="primary-button">Go to MyStable</a>
              ) : (
                <button onClick={openLogin} className="primary-button">Get Started</button>
              )}
              <a href="#about" className="secondary-button">Learn More</a>
            </div>
          </div>
          <div className="hero-image">
            <img src="/Hero-Home-Page.png" alt="Evolution Stables Hero" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="about-container">
          <h2 className="section-title">About Evolution Stables</h2>
          <div className="about-content">
            <div className="about-text">
              <h3>The Future of Digital Racing</h3>
              <p>
                Evolution Stables represents the next generation of digital horse racing and ownership. 
                Built on cutting-edge blockchain technology, we provide a unique platform where 
                passion meets innovation.
              </p>
              <p>
                Own, breed, and race digital horses in a fully immersive metaverse experience. 
                Each horse is a unique NFT with distinct characteristics, bloodlines, and racing capabilities.
              </p>
            </div>
            <div className="about-features">
              <div className="feature">
                <h4>Own Unique Horses</h4>
                <p>Each horse is a one-of-a-kind NFT with unique traits and abilities</p>
              </div>
              <div className="feature">
                <h4>Breed Champions</h4>
                <p>Create the next generation of racing champions through strategic breeding</p>
              </div>
              <div className="feature">
                <h4>Compete & Earn</h4>
                <p>Race your horses and earn rewards in our competitive ecosystem</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MyStable Section */}
      <section id="mystable" className="mystable-section">
        <div className="mystable-container">
          <h2 className="section-title">MyStable</h2>
          {userSession ? (
            <div className="mystable-content">
              <div className="user-welcome">
                <h3>Welcome to your stable!</h3>
                <p>Manage your horses, view race history, and plan your next moves.</p>
              </div>
              <div className="stable-features">
                <div className="stable-card">
                  <h4>My Horses</h4>
                  <p>View and manage your horse collection</p>
                  <button className="primary-button">View Horses</button>
                </div>
                <div className="stable-card">
                  <h4>Race History</h4>
                  <p>Track your racing performance and earnings</p>
                  <button className="primary-button">View History</button>
                </div>
                <div className="stable-card">
                  <h4>Breeding</h4>
                  <p>Plan and execute breeding strategies</p>
                  <button className="primary-button">Start Breeding</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="mystable-login">
              <h3>Connect your wallet to access MyStable</h3>
              <p>Login to view your horses, race history, and manage your stable</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MainPage;
