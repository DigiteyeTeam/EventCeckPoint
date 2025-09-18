import { useState, useEffect } from 'react'
import { ClipLoader } from 'react-spinners'

function LoadingScreen({ onLoadingComplete }) {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('กำลังโหลด...')

  // รายการภาพที่ต้อง preload
  const imagesToPreload = [
    '/images/bg-start.png',
    '/images/body-start.png',
    '/images/top-start.png',
    '/images/logo-app.png',
    '/images/artists-text.png',
    '/images/hl-1.png',
    '/images/tutorial-1.png',
    '/images/tutorial-2.png',
    // ภาพรถสีปกติ
    '/images/point-cars/Colonel Gold Fang.png',
    '/images/point-cars/Greenie & Elfie.png',
    '/images/point-cars/Splash.png',
    '/images/point-cars/Kongrit.png',
    '/images/point-cars/Ai-Sam-Ta.png',
    '/images/point-cars/Qtako.png',
    '/images/point-cars/Dylie.png',
    '/images/point-cars/Korn Doll.png',
    '/images/point-cars/World Boy.png',
    // ภาพรถสีดำ
    '/images/point-cars-black/Colonel Gold Fang.png',
    '/images/point-cars-black/Greenie & Elfie.png',
    '/images/point-cars-black/Splash.png',
    '/images/point-cars-black/Kongrit.png',
    '/images/point-cars-black/Ai-Sam-Ta.png',
    '/images/point-cars-black/Qtako.png',
    '/images/point-cars-black/Dylie.png',
    '/images/point-cars-black/Korn Doll.png',
    '/images/point-cars-black/World Boy.png',
    // ภาพร้านอาหาร
    '/images/restaurant/r1.png',
    '/images/restaurant/r2.png',
    '/images/restaurant/r3.png',
    '/images/restaurant/r4.png',
    '/images/restaurant/r5.png',
    '/images/restaurant/r6.png',
    '/images/restaurant/r7.png',
    '/images/restaurant/r8.png',
    '/images/restaurant/r9.png',
    // Logo ร้านอาหาร
    '/images/restaurant-logo/l1.png',
    '/images/restaurant-logo/l2.png',
    '/images/restaurant-logo/l3.png',
    '/images/restaurant-logo/l4.png',
    '/images/restaurant-logo/l5.png',
    '/images/restaurant-logo/l6.png',
    '/images/restaurant-logo/l7.png',
    '/images/restaurant-logo/l8.png',
    '/images/restaurant-logo/l9.png'
  ]

  useEffect(() => {
    let loadedCount = 0
    const totalImages = imagesToPreload.length

    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => {
          loadedCount++
          const progress = Math.round((loadedCount / totalImages) * 100)
          setLoadingProgress(progress)
          
          if (loadedCount === totalImages) {
            setLoadingText('เสร็จสิ้น!')
            setTimeout(() => {
              onLoadingComplete()
            }, 500)
          }
          resolve()
        }
        img.onerror = () => {
          loadedCount++
          const progress = Math.round((loadedCount / totalImages) * 100)
          setLoadingProgress(progress)
          
          if (loadedCount === totalImages) {
            setLoadingText('เสร็จสิ้น!')
            setTimeout(() => {
              onLoadingComplete()
            }, 500)
          }
          resolve()
        }
        img.src = src
      })
    }

    // โหลดภาพทั้งหมด
    const loadAllImages = async () => {
      setLoadingText('กำลังโหลดภาพ...')
      await Promise.all(imagesToPreload.map(loadImage))
    }

    loadAllImages()
  }, [onLoadingComplete])

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: '#000000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      color: 'white'
    }}>
      {/* Top Start Image */}
      <div style={{
        marginBottom: '40px',
        animation: 'pulse 2s infinite',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <img 
          src="/images/top-start.png" 
          alt="Loading"
          style={{
            width: '200px',
            height: 'auto',
            filter: 'brightness(0) invert(1)'
          }}
        />
      </div>

      {/* Spinner */}
      <div style={{
        marginBottom: '30px'
      }}>
        <ClipLoader
          color="#ffffff"
          loading={true}
          size={50}
          speedMultiplier={0.8}
        />
      </div>

      {/* Progress Bar */}
      <div style={{
        width: '200px',
        height: '4px',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: '2px',
        overflow: 'hidden',
        marginBottom: '20px'
      }}>
        <div style={{
          width: `${loadingProgress}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #ffffff, #f0f0f0)',
          borderRadius: '2px',
          transition: 'width 0.3s ease'
        }} />
      </div>

      {/* Progress Text */}
      <div style={{
        fontSize: '16px',
        fontWeight: '500',
        marginBottom: '10px'
      }}>
        {loadingText}
      </div>

      {/* Progress Percentage */}
      <div style={{
        fontSize: '14px',
        opacity: 0.8
      }}>
        {loadingProgress}%
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .loading-screen {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}

export default LoadingScreen
