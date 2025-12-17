export interface RadarPoint {
  lat: number;
  lon: number;
  value: number;
}

export interface RadarData {
  timestamp: string;
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  data: RadarPoint[];
}
