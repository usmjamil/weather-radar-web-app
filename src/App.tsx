import React from 'react';
import './App.css';
import Header from './components/Header';
import RadarMap from './components/RadarMap';
import Legend from './components/Legend';
import { useRadarData } from './hooks/useRadarData';

function App() {
  const { radarData, loading, error, lastUpdate, refreshData } = useRadarData();

  return (
    <div className="App">
      <Header
        loading={loading}
        error={error}
        lastUpdate={lastUpdate}
        onRefresh={refreshData}
      />
      <RadarMap radarData={radarData} />
      <Legend />
    </div>
  );
}

export default App;
