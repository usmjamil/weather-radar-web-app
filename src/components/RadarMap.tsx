import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { RadarData, RadarPoint } from '../types';
import { getReflectivityColor } from '../utils/colors';
import {
  MAP_DEFAULT_CENTER,
  MAP_DEFAULT_ZOOM,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  RADAR_POINT_RADIUS,
  RADAR_OPACITY
} from '../constants/config';
import 'leaflet/dist/leaflet.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface RadarOverlayProps {
  radarData: RadarData | null;
}

const RadarOverlay: React.FC<RadarOverlayProps> = ({ radarData }) => {
  const map = useMap();
  const overlayRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!radarData || !map) return;

    if (!radarData.bounds || !radarData.data) {
      console.warn('Invalid radar data structure:', radarData);
      return;
    }

    if (overlayRef.current) {
      map.removeLayer(overlayRef.current);
    }

    const bounds: [[number, number], [number, number]] = [
      [radarData.bounds.south, radarData.bounds.west],
      [radarData.bounds.north, radarData.bounds.east]
    ];

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    radarData.data.forEach((point: RadarPoint) => {

      if (!point || typeof point.lat !== 'number' || typeof point.lon !== 'number' || typeof point.value !== 'number') {
        console.warn('Invalid radar point:', point);
        return;
      }

      const x = ((point.lon - radarData.bounds.west) / (radarData.bounds.east - radarData.bounds.west)) * CANVAS_WIDTH;
      const y = ((radarData.bounds.north - point.lat) / (radarData.bounds.north - radarData.bounds.south)) * CANVAS_HEIGHT;

      if (x < 0 || x > CANVAS_WIDTH || y < 0 || y > CANVAS_HEIGHT) {
        return;
      }

      const color = getReflectivityColor(point.value);

      ctx.fillStyle = color;
      ctx.globalAlpha = RADAR_OPACITY;
      ctx.beginPath();
      ctx.arc(x, y, RADAR_POINT_RADIUS, 0, 2 * Math.PI);
      ctx.fill();
    });

    const imageOverlay = L.imageOverlay(canvas.toDataURL(), bounds);
    const layerGroup = L.layerGroup([imageOverlay]);

    overlayRef.current = layerGroup;
    layerGroup.addTo(map);

    return () => {
      if (overlayRef.current) {
        map.removeLayer(overlayRef.current);
      }
    };
  }, [radarData, map]);

  return null;
};

interface RadarMapProps {
  radarData: RadarData | null;
}

const RadarMap: React.FC<RadarMapProps> = ({ radarData }) => {
  const defaultBounds = radarData ? [
    [radarData.bounds.south, radarData.bounds.west],
    [radarData.bounds.north, radarData.bounds.east]
  ] as [[number, number], [number, number]] : undefined;

  return (
    <div className="map-wrapper">
      <MapContainer
        center={MAP_DEFAULT_CENTER}
        zoom={MAP_DEFAULT_ZOOM}
        style={{ height: 'calc(100vh - 80px)', width: '100%' }}
        bounds={defaultBounds}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <RadarOverlay radarData={radarData} />
      </MapContainer>
    </div>
  );
};

export default RadarMap;
