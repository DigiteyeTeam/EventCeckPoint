import { useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Navigation, ExternalLink } from 'lucide-react'

function Maps() {
  const navigate = useNavigate()
  
  // Get destination coordinates from environment variables
  const destLat = import.meta.env.VITE_DEST_LAT || '13.7563'
  const destLng = import.meta.env.VITE_DEST_LNG || '100.5018'
  
  const openGoogleMaps = () => {
    // Open Google Maps with directions to the destination
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destLat},${destLng}&travelmode=driving`
    window.open(mapsUrl, '_blank')
  }

  const openAppleMaps = () => {
    // Open Apple Maps (for iOS devices)
    const mapsUrl = `http://maps.apple.com/?daddr=${destLat},${destLng}&dirflg=d`
    window.open(mapsUrl, '_blank')
  }

  const copyCoordinates = () => {
    navigator.clipboard.writeText(`${destLat}, ${destLng}`)
    alert('Coordinates copied to clipboard!')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-lg font-semibold text-gray-800">Directions</h1>
          <div className="w-16"></div>
        </div>
      </div>

      {/* Map Preview */}
      <div className="relative h-64 bg-gray-200">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-red-500 mx-auto mb-2" />
            <p className="text-gray-600 font-medium">Carventure Store Location</p>
            <p className="text-sm text-gray-500">Bangkok, Thailand</p>
          </div>
        </div>
        
        {/* Mock Map Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 opacity-50"></div>
      </div>

      {/* Location Details */}
      <div className="p-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <MapPin className="w-6 h-6 text-red-600" />
            <h2 className="text-lg font-semibold text-gray-800">Store Location</h2>
          </div>
          
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-600">Address</p>
              <p className="text-gray-800">123 Carventure Street, Bangkok, Thailand</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Coordinates</p>
              <p className="text-gray-800 font-mono">{destLat}, {destLng}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Estimated Distance</p>
              <p className="text-gray-800">~5.2 km from your location</p>
            </div>
          </div>
        </div>

        {/* Navigation Options */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Get Directions</h3>
          
          <button
            onClick={openGoogleMaps}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-3"
          >
            <Navigation className="w-6 h-6" />
            <span>Open Google Maps</span>
            <ExternalLink className="w-5 h-5" />
          </button>

          <button
            onClick={openAppleMaps}
            className="w-full bg-gray-800 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-gray-900 transition-colors duration-200 flex items-center justify-center space-x-3"
          >
            <Navigation className="w-6 h-6" />
            <span>Open Apple Maps</span>
            <ExternalLink className="w-5 h-5" />
          </button>

          <button
            onClick={copyCoordinates}
            className="w-full bg-gray-100 text-gray-800 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center space-x-3"
          >
            <MapPin className="w-6 h-6" />
            <span>Copy Coordinates</span>
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-blue-50 rounded-2xl p-6">
          <h4 className="font-semibold text-blue-800 mb-2">Travel Tips</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Free parking available on-site</li>
            <li>• Accessible by public transportation</li>
            <li>• Store hours: 9:00 AM - 8:00 PM</li>
            <li>• Contact: +66 2-123-4567</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Maps
