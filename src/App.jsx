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
import StoreDetail from './pages/StoreDetail'
import { isUserRegistered } from './utils/storage'

function App() {
  const [isRegistered, setIsRegistered] = useState(null)
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    // Check if user is registered
    const registered = isUserRegistered()
    setIsRegistered(registered)
    
    // Check if running in LINE LIFF browser and redirect
    checkAndRedirectFromLIFF()
  }, [])

  const checkAndRedirectFromLIFF = () => {
    const userAgent = navigator.userAgent.toLowerCase()
    const isLineBrowser = userAgent.includes('line') && (
      userAgent.includes('line/') || 
      userAgent.includes('liff') ||
      userAgent.includes('naver')
    )
    
    // Check if we're in LINE browser or LIFF
    const isInLIFF = window.location.href.includes('liff') || 
                     window.location.href.includes('line') ||
                     isLineBrowser
    
    if (isInLIFF) {
      console.log('Detected LINE LIFF browser, redirecting to main browser...')
      setIsRedirecting(true)
      
      // Create a redirect URL that will open in the main browser
      const currentUrl = window.location.href
      
      // Method 1: Try to open in external browser using intent URL
      const intentUrl = `intent://${window.location.host}${window.location.pathname}${window.location.search}#Intent;scheme=https;package=com.android.chrome;end`
      
      // Method 2: Create a fallback URL
      const fallbackUrl = currentUrl
      
      // Try to redirect
      try {
        // For Android devices, try intent URL first
        if (userAgent.includes('android')) {
          window.location.href = intentUrl
        } else {
          // For other devices, try to open in new window
          window.open(currentUrl, '_blank')
        }
      } catch (error) {
        console.log('Redirect failed, using fallback:', error)
        // Fallback: show instruction to user
        showBrowserRedirectMessage()
      }
      
      // Set timeout to show message if redirect doesn't work
      setTimeout(() => {
        if (isInLIFF) {
          showBrowserRedirectMessage()
        }
      }, 3000)
    }
  }

  const showBrowserRedirectMessage = () => {
    // Create a modal to show redirect instructions
    const modal = document.createElement('div')
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      font-family: 'Inter', sans-serif;
    `
    
    modal.innerHTML = `
      <div style="
        background: white;
        padding: 30px;
        border-radius: 20px;
        max-width: 90%;
        text-align: center;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
      ">
        <h2 style="color: #dc2626; margin-bottom: 20px; font-size: 24px;">
          🌐 เปิดใน Browser หลัก
        </h2>
        <p style="color: #374151; margin-bottom: 25px; line-height: 1.6; font-size: 16px;">
          เพื่อประสบการณ์ที่ดีที่สุด กรุณาเปิดเว็บไซต์ใน Browser หลักของเครื่อง
        </p>
        <div style="margin-bottom: 25px;">
          <button onclick="window.open('${window.location.href}', '_blank')" style="
            background: linear-gradient(135deg, #dc2626, #ef4444);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            margin-right: 10px;
          ">
            เปิดใน Browser ใหม่
          </button>
          <button onclick="this.closest('.modal').remove()" style="
            background: #6b7280;
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
          ">
            ปิด
          </button>
        </div>
        <p style="color: #9ca3af; font-size: 14px;">
          💡 หลังจากเปิดใน Browser แล้ว สามารถปิดหน้าต่างนี้ได้
        </p>
      </div>
    `
    
    modal.className = 'modal'
    document.body.appendChild(modal)
    
    // Auto remove modal after 10 seconds
    setTimeout(() => {
      if (modal.parentNode) {
        modal.remove()
      }
    }, 10000)
  }

  // Show loading while checking registration status or redirecting
  if (isRegistered === null || isRedirecting) {
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
          <p style={{ color: '#6b7280', fontSize: '14px' }}>
            {isRedirecting ? 'กำลังเปิดใน Browser หลัก...' : 'Loading...'}
          </p>
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
            <Route path="/store/:storeId" element={<StoreDetail />} />
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
