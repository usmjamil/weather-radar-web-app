import React from 'react';
import './Header.css';

interface HeaderProps {
  loading: boolean;
  error: string | null;
  lastUpdate: Date | null;
  onRefresh: () => void;
}

const Header: React.FC<HeaderProps> = ({ loading, error, lastUpdate, onRefresh }) => {
  return (
    <div className="map-header">
      <h1>Weather Radar</h1>
      <div className="status-info">
        {loading && <span className="loading">Loading...</span>}
        {error && <span className="error">{error}</span>}
        {lastUpdate && (
          <span className="timestamp">
            Last Update: {lastUpdate.toLocaleTimeString()}
          </span>
        )}
        <button
          className="refresh-button"
          onClick={onRefresh}
          disabled={loading}
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
    </div>
  );
};

export default Header;
