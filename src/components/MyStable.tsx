import React from 'react';
import { useAuth } from '@futureverse/auth-react';
import './MyStable.css';

const MyStable: React.FC = () => {
  const { userSession } = useAuth();

  if (!userSession) {
    return (
      <div className="mystable-page">
        <div className="mystable-container">
          <div className="access-denied">
            <h1>Access Restricted</h1>
            <p>Please login to access your stable.</p>
            <button className="primary-button" onClick={() => window.location.href = '/'}>
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mystable-page">
      <div className="mystable-container">
        <div className="mystable-header">
          <h1>My Stable</h1>
          <p>Welcome back, {userSession.futurepass.slice(0, 6)}...{userSession.futurepass.slice(-4)}</p>
        </div>

        <div className="stable-grid">
          {/* My Horses Section */}
          <div className="stable-section">
            <div className="section-header">
              <h2>My Horses</h2>
              <button className="primary-button">Add New Horse</button>
            </div>
            <div className="horses-grid">
              <div className="horse-card placeholder">
                <div className="horse-image-placeholder">
                  <span>🐎</span>
                </div>
                <div className="horse-info">
                  <h3>No horses yet</h3>
                  <p>Get your first horse to start your racing journey</p>
                </div>
              </div>
            </div>
          </div>

          {/* Race History Section */}
          <div className="stable-section">
            <div className="section-header">
              <h2>Recent Races</h2>
              <button className="secondary-button">View All</button>
            </div>
            <div className="race-history">
              <div className="race-item placeholder">
                <span>No race history available</span>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="stable-section">
            <div className="section-header">
              <h2>Your Stats</h2>
            </div>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">0</div>
                <div className="stat-label">Horses Owned</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">0</div>
                <div className="stat-label">Races Won</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">0</div>
                <div className="stat-label">Total Earnings</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">0</div>
                <div className="stat-label">Breeding Sessions</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="stable-section">
            <div className="section-header">
              <h2>Quick Actions</h2>
            </div>
            <div className="actions-grid">
              <button className="action-button">
                <span className="action-icon">🏇</span>
                <span>Enter Race</span>
              </button>
              <button className="action-button">
                <span className="action-icon">🧬</span>
                <span>Breed Horses</span>
              </button>
              <button className="action-button">
                <span className="action-icon">🏪</span>
                <span>Marketplace</span>
              </button>
              <button className="action-button">
                <span className="action-icon">📊</span>
                <span>Analytics</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyStable;
