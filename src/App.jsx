import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Landing from './pages/Landing'
import Profile from './pages/Profile'
import Tutorial from './pages/Tutorial'
import Main from './pages/Main'
import Scan from './pages/Scan'
import Maps from './pages/Maps'
import Checkin from './pages/Checkin'
import Coupon from './pages/Coupon'
import { isUserRegistered } from './utils/storage'

function App() {
  const [isRegistered, setIsRegistered] = useState(null)

  useEffect(() => {
    // Check if user is registered
    const registered = isUserRegistered()
    setIsRegistered(registered)
  }, [])

  // Show loading while checking registration status
  if (isRegistered === null) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f8f9fa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #e5e7eb',
            borderTop: '4px solid #dc2626',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px auto'
          }}></div>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Routes>
        <Route 
          path="/" 
          element={isRegistered ? <Navigate to="/main" replace /> : <Landing />} 
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tutorial" element={<Tutorial />} />
            <Route path="/main" element={<Main />} />
            <Route path="/scan" element={<Scan />} />
            <Route path="/maps" element={<Maps />} />
            <Route path="/checkin/:storeSlug" element={<Checkin />} />
            <Route path="/coupon" element={<Coupon />} />
      </Routes>
      
      {/* Add CSS for loading spinner */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default App
