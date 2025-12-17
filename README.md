# Weather Radar Frontend

Interactive frontend for the Weather Radar application, built with React and TypeScript.

## Features

- Interactive map with radar overlay using Leaflet
- Real-time data visualization
- Auto-refreshing radar display
- Responsive design for desktop and mobile
- Clean UI with legend and timestamp

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
3. Copy `.env.example` to `.env` and update with your configuration

### Development

```bash
# Start development server
npm start
```

### Production Build

```bash
# Create production build
npm run build

# Serve the production build locally
npm install -g serve
serve -s build
```

## Environment Variables

- `REACT_APP_API_URL` - Backend API URL (default: http://localhost:3001)
- `REACT_APP_REFRESH_INTERVAL` - Data refresh interval in ms (default: 120000)
- `REACT_APP_MAP_DEFAULT_LAT` - Default map latitude (default: 39.5)
- `REACT_APP_MAP_DEFAULT_LON` - Default map longitude (default: -98.35)
- `REACT_APP_MAP_DEFAULT_ZOOM` - Default map zoom level (default: 4)
- `REACT_APP_CANVAS_WIDTH` - Canvas width (default: 700)
- `REACT_APP_CANVAS_HEIGHT` - Canvas height (default: 700)
- `REACT_APP_RADAR_POINT_RADIUS` - Radar point radius (default: 2)
- `REACT_APP_RADAR_OPACITY` - Radar overlay opacity (default: 0.8)

## Technologies Used

- React 18 with TypeScript
- Leaflet for map visualization
- Axios for API requests
- Tailwind CSS for styling
- Vite for build tooling

## Project Structure

```
frontend/
├── public/            # Static files
├── src/
│   ├── components/    # Reusable UI components
│   ├── hooks/         # Custom React hooks
│   ├── services/      # API and data services
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Utility functions
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Application entry point
├── .env.example      # Example environment variables
└── package.json      # Project dependencies and scripts
```

## License

MIT
