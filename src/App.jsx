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
import GoToStart from './pages/GoToStart'
import { isUserRegistered } from './utils/storage'

function App() {
  const [isRegistered, setIsRegistered] = useState(null)

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
      console.log('Detected LINE LIFF browser, showing redirect message...')
      
      // Show message immediately
      showBrowserRedirectMessage()
    }
  }

  const showBrowserRedirectMessage = () => {
    // Create a modern modal
    const modal = document.createElement('div')
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.75);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      backdrop-filter: blur(10px);
    `
    
    modal.innerHTML = `
      <div style="
        background: white;
        padding: 40px 32px;
        border-radius: 24px;
        max-width: 400px;
        width: 90%;
        text-align: center;
        box-shadow: 0 25px 50px rgba(0,0,0,0.15);
        border: 1px solid rgba(0,0,0,0.05);
        animation: modalSlideIn 0.3s ease-out;
      ">
        <!-- Title -->
        <h2 style="
          color: #1a1a1a;
          margin: 0 0 20px 0;
          font-size: 24px;
          font-weight: 700;
          letter-spacing: -0.02em;
        ">
          ไม่รองรับ Browser นี้
        </h2>
        
        <!-- Message -->
        <p style="
          color: #666;
          margin: 0 0 32px 0;
          line-height: 1.6;
          font-size: 16px;
          font-weight: 400;
        ">
          ระบบนี้รองรับเฉพาะ Chrome, Safari และ Firefox เท่านั้น<br>
          กรุณาคัดลอกลิงก์แล้วเปิดใน Browser ที่รองรับ
        </p>
        
        <!-- Action Buttons -->
        <div style="
          display: flex;
          flex-direction: column;
          gap: 12px;
        ">
          <button 
            onclick="
              const url = '${window.location.href}';
              navigator.clipboard.writeText(url).then(() => {
                alert('คัดลอกลิงก์เรียบร้อย! กรุณาเปิดใน Chrome, Safari หรือ Firefox');
              });
            " 
            style="
              background: linear-gradient(135deg, #667eea, #764ba2);
              color: white;
              border: none;
              padding: 16px 24px;
              border-radius: 16px;
              font-size: 16px;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.2s ease;
              box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
            "
            onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 24px rgba(102, 126, 234, 0.4)'"
            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 16px rgba(102, 126, 234, 0.3)'"
          >
            คัดลอกลิงก์
          </button>
          
          <button 
            onclick="this.closest('.browser-modal').remove()" 
            style="
              background: #f8f9fa;
              color: #6c757d;
              border: 1px solid #e9ecef;
              padding: 16px 24px;
              border-radius: 16px;
              font-size: 16px;
              font-weight: 500;
              cursor: pointer;
              transition: all 0.2s ease;
            "
            onmouseover="this.style.background='#e9ecef'"
            onmouseout="this.style.background='#f8f9fa'"
          >
            ปิด
          </button>
        </div>
      </div>
      
      <style>
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      </style>
    `
    
    modal.className = 'browser-modal'
    document.body.appendChild(modal)
    
    // Auto remove modal after 15 seconds
    setTimeout(() => {
      if (modal.parentNode) {
        modal.remove()
      }
    }, 15000)
  }

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
            <Route path="/store/:storeId" element={<StoreDetail />} />
            <Route path="/go-to-start" element={<GoToStart />} />
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
