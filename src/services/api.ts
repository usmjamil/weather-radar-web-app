import axios from 'axios';
import { RadarData } from '../types';
import { API_BASE_URL } from '../constants/config';

export const fetchLatestRadar = async (): Promise<RadarData> => {
  try {
    const response = await axios.get<{ success: boolean, data: RadarData }>(`${API_BASE_URL}/api/radar/latest`);

    if (!response.data.success) {
      throw new Error('API returned unsuccessful response');
    }

    return response.data.data;
  } catch (error) {
    console.error('Error fetching radar data:', error);
    throw error;
  }
};
