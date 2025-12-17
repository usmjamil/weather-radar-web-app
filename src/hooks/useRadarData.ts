import { useState, useEffect, useCallback } from 'react';
import { RadarData } from '../types';
import { fetchLatestRadar } from '../services/api';
import { REFRESH_INTERVAL } from '../constants/config';

interface UseRadarDataReturn {
  radarData: RadarData | null;
  loading: boolean;
  error: string | null;
  lastUpdate: Date | null;
  refreshData: () => Promise<void>;
}

export const useRadarData = (refreshInterval: number = REFRESH_INTERVAL): UseRadarDataReturn => {
  const [radarData, setRadarData] = useState<RadarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const loadRadarData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchLatestRadar();

      if (!data || typeof data !== 'object') {
        throw new Error('Invalid data format received');
      }

      if (!data.timestamp || !data.bounds || !data.data) {
        throw new Error('Missing required data fields');
      }

      if (!data.bounds.north || !data.bounds.south || !data.bounds.east || !data.bounds.west) {
        throw new Error('Invalid bounds data');
      }

      if (!Array.isArray(data.data)) {
        throw new Error('Invalid radar data array');
      }

      setRadarData(data);
      setLastUpdate(new Date(data.timestamp));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load radar data';
      setError(errorMessage);
      console.error('Radar data loading error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshData = useCallback(async () => {
    await loadRadarData();
  }, [loadRadarData]);

  useEffect(() => {
    loadRadarData();
    const interval = setInterval(loadRadarData, refreshInterval);
    return () => clearInterval(interval);
  }, [loadRadarData, refreshInterval]);

  return {
    radarData,
    loading,
    error,
    lastUpdate,
    refreshData
  };
};
