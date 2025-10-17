import { useState, useEffect } from 'react'
import ImageWithLoading from '../components/ImageWithLoading'

function GoToStart() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'rgba(255, 255, 255, 255)',
      overflowY: 'auto',
      paddingBottom: '20px',
      fontFamily: "'Kanit', 'Prompt', 'Sarabun', 'Noto Sans Thai', sans-serif"
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        overflow: 'hidden'
      }}>
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '3px',
              height: '3px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div style={{ 
        position: 'relative',
        zIndex: 1
      }}>
        {/* Highlight Image and Title */}
        <div>
          <ImageWithLoading
            src="/images/hl-1.png"
            alt="Go To Start Highlight"
            style={{
              width: '100vw',
              height: 'auto',
              maxHeight: '140px',
              padding: '0',
              display: 'block',
              objectFit: 'cover',
              objectPosition: 'top center',
            }}
            skeletonStyle={{
              width: '100vw',
              height: '140px',
              borderRadius: '0'
            }}
          />
          <div style={{ 
            padding: '20px', 
            textAlign: 'center',
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.6s ease-out'
          }}>
            <h1 style={{
              color: '#1f2937',
              fontSize: '22px',
              fontWeight: '800',
              fontFamily: "'Kanit', 'Prompt', sans-serif",
              margin: '0 0 16px 0',
              letterSpacing: '-0.02em',
              lineHeight: '1.3'
            }}>โปรดไปที่งาน<br/>"The Retro Ride-in"</h1>
            
            <div style={{
              color: '#374151',
              fontSize: '15px',
              lineHeight: '1.6',
              textAlign: 'left',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '16px'
            }}>
              <p style={{ margin: '0 0 12px 0' }}>
                <strong>สถานที่:</strong> ชั้น G ของห้าง Gaysorn
              </p>
              <p style={{ margin: '0 0 16px 0' }}>
                <strong>วิธีเล่น:</strong> ค้นหาป้าย "Start" ในงาน สแกน QR Code เพื่อเริ่มเล่น
              </p>
              
              <p style={{
                color: '#6b7280',
                fontSize: '12px',
                margin: '0 0 8px 0',
                textAlign: 'center',
                fontWeight: '600'
              }}>ป้าย Start ที่ต้องค้นหา</p>
              
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <ImageWithLoading
                  src="/images/tablestart.png"
                  alt="Start Sign"
                  style={{
                    width: '180px',
                    height: '180px',
                    objectFit: 'contain',
                    borderRadius: '8px',
                    animation: 'signFloat 3s ease-in-out infinite'
                  }}
                  skeletonStyle={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '8px'
                  }}
                  showSkeleton={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Car */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '-100px',
        width: 'calc(100vw + 200px)',
        height: '80px',
        zIndex: 9999,
        pointerEvents: 'none',
        overflow: 'visible'
      }}>
        <ImageWithLoading
          src="/images/carOpen.png"
          alt="Moving Car"
          style={{
            width: '400px',
            height: '72px',
            objectFit: 'contain',
            animation: 'carMove 4s linear infinite',
            position: 'absolute',
            left: 'calc(100vw + 100px)',
            top: '0'
          }}
          skeletonStyle={{
            width: '96px',
            height: '72px'
          }}
          showSkeleton={false}
        />
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        
        @keyframes carMove {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100vw - 200px)); }
        }
        
        @keyframes signFloat {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(8px); }
        }
      `}</style>
    </div>
  )
}

export default GoToStart
