# Carventure Mobile Web App

A mobile-only web application built with Vite + React + TailwindCSS for event check-in and navigation.

## Features

- **Landing Page**: Beautiful background with logo overlay and navigation cards
- **Profile Form**: Complete user information setup with modern UI
- **QR Scanner**: Camera-based check-in with QR code scanning (demo mode)
- **Google Maps Integration**: Direct navigation to store location

## Tech Stack

- **Frontend**: React (JavaScript only)
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Routing**: react-router-dom
- **Icons**: lucide-react
- **QR Scanner**: @yudiel/react-qr-scanner (optional)

## Mobile-First Design

- Optimized for portrait mobile devices only
- CSS guards prevent desktop/landscape usage
- Touch-friendly interface with large buttons
- Responsive design with TailwindCSS

## Environment Variables

Create a `.env` file with:

```
VITE_DEST_LAT=13.7563
VITE_DEST_LNG=100.5018
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect the Vite configuration
4. The app will be deployed with the included `vercel.json` configuration

## Project Structure

```
src/
├── pages/
│   ├── Landing.jsx    # Landing page with navigation
│   ├── Profile.jsx    # User profile form
│   ├── Scan.jsx       # QR code scanner
│   └── Maps.jsx       # Google Maps integration
├── App.jsx            # Main app with routing
├── main.jsx           # Entry point
└── index.css          # TailwindCSS imports
```

## Camera Permissions

The QR scanner requires camera access. Make sure to:
- Test on HTTPS (required for camera access)
- Grant camera permissions when prompted
- Use a mobile device for best experience

## Browser Support

- Modern mobile browsers (Chrome, Safari, Firefox)
- Requires camera API support for QR scanning
- Optimized for iOS and Android devices