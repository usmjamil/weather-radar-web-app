export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
export const REFRESH_INTERVAL = parseInt(process.env.REACT_APP_REFRESH_INTERVAL || '120000');
export const MAP_DEFAULT_CENTER: [number, number] = [
  parseFloat(process.env.REACT_APP_MAP_DEFAULT_LAT || '37.7749'),
  parseFloat(process.env.REACT_APP_MAP_DEFAULT_LON || '-122.4194')
];
export const MAP_DEFAULT_ZOOM = parseInt(process.env.REACT_APP_MAP_DEFAULT_ZOOM || '6');
export const CANVAS_WIDTH = parseInt(process.env.REACT_APP_CANVAS_WIDTH || '1000');
export const CANVAS_HEIGHT = parseInt(process.env.REACT_APP_CANVAS_HEIGHT || '800');
export const RADAR_POINT_RADIUS = parseInt(process.env.REACT_APP_RADAR_POINT_RADIUS || '3');
export const RADAR_OPACITY = parseFloat(process.env.REACT_APP_RADAR_OPACITY || '0.7');
