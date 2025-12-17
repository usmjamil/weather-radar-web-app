import React from 'react';
import { legendItems } from '../utils/colors';

const Legend: React.FC = () => {
  return (
    <div className="legend">
      <h3>Reflectivity (dBZ)</h3>
      <div className="legend-items">
        {legendItems.map((item, index) => (
          <div key={index} className="legend-item">
            <span
              className="color"
              style={{ backgroundColor: item.color }}
            />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Legend;
