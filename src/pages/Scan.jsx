import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Camera, QrCode, CheckCircle, AlertCircle } from 'lucide-react'

function Scan() {
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const [stream, setStream] = useState(null)
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState(null)
  const [error, setError] = useState(null)

  const startCamera = async () => {
    try {
      setError(null)
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
      setIsScanning(true)
    } catch (err) {
      console.error('Error accessing camera:', err)
      setError('Unable to access camera. Please check permissions.')
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
    setIsScanning(false)
    setScanResult(null)
  }

  const simulateQRScan = () => {
    // Simulate QR code detection
    setScanResult({
      data: 'CARVENTURE_CHECKIN_2024',
      timestamp: new Date().toISOString()
    })
    stopCamera()
  }

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [stream])

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-white hover:text-gray-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-lg font-semibold text-white">Check-in Scanner</h1>
          <div className="w-16"></div>
        </div>
      </div>

      {/* Camera View */}
      <div className="relative flex-1">
        {!isScanning && !scanResult && (
          <div className="flex flex-col items-center justify-center h-96 bg-gray-800">
            <QrCode className="w-24 h-24 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Ready to Scan</h2>
            <p className="text-gray-400 text-center px-6 mb-6">
              Position the QR code within the frame to check-in
            </p>
            <button
              onClick={startCamera}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 hover:bg-blue-700 transition-colors"
            >
              <Camera className="w-5 h-5" />
              <span>Start Camera</span>
            </button>
          </div>
        )}

        {isScanning && (
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-96 object-cover"
            />
            
            {/* Scanning Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Scanning Frame */}
                <div className="w-64 h-64 border-2 border-white rounded-2xl relative">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-500 rounded-tl-2xl"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-500 rounded-tr-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-500 rounded-bl-2xl"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-500 rounded-br-2xl"></div>
                </div>
                
                {/* Scanning Line Animation */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-blue-500 animate-pulse"></div>
              </div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="flex space-x-4">
                <button
                  onClick={stopCamera}
                  className="bg-red-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-red-700 transition-colors"
                >
                  Stop
                </button>
                <button
                  onClick={simulateQRScan}
                  className="bg-green-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                >
                  Simulate Scan
                </button>
              </div>
            </div>
          </div>
        )}

        {scanResult && (
          <div className="flex flex-col items-center justify-center h-96 bg-gray-800 p-6">
            <CheckCircle className="w-24 h-24 text-green-500 mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Check-in Successful!</h2>
            <p className="text-gray-400 text-center mb-4">
              QR Code: {scanResult.data}
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Scanned at: {new Date(scanResult.timestamp).toLocaleString()}
            </p>
            <button
              onClick={() => {
                setScanResult(null)
                startCamera()
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Scan Again
            </button>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center h-96 bg-gray-800 p-6">
            <AlertCircle className="w-24 h-24 text-red-500 mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Camera Error</h2>
            <p className="text-gray-400 text-center mb-6">{error}</p>
            <button
              onClick={startCamera}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="bg-black/50 backdrop-blur-sm p-4">
        <div className="text-center text-white">
          <p className="text-sm text-gray-300">
            Point your camera at the QR code to check-in to the event
          </p>
        </div>
      </div>
    </div>
  )
}

export default Scan
