import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CheckCircle, Gift, ArrowLeft } from 'lucide-react'
import Confetti from 'react-confetti'

function Checkin() {
  const { storeSlug } = useParams()
  const navigate = useNavigate()
  const [store, setStore] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showConfetti, setShowConfetti] = useState(true)
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 })

  // Store data mapping
  const stores = [
    { id: 1, name: 'Colonel Gold Fang', storeName: 'Dough Bros. (G Floor)', slug: 'colonel-gold-fang', image: '/images/point-cars/Colonel Gold Fang.png', couponLink: 'https://line.me/R/ti/p/@colonel-gold-fang' },
    { id: 2, name: 'Greenie & Elfie', storeName: 'Mickey Dinner (G Floor)', slug: 'greenie-elfie', image: '/images/point-cars/Greenie & Elfie.png', couponLink: 'https://line.me/R/ti/p/@greenie-elfie' },
    { id: 3, name: 'Splash', storeName: 'Villa Market (G Floor)', slug: 'splash', image: '/images/point-cars/Splash.png', couponLink: 'https://line.me/R/ti/p/@splash' },
    { id: 4, name: 'Kongrit', storeName: 'Nico Nico (2nd Floor)', slug: 'kongrit', image: '/images/point-cars/Kongrit.png', couponLink: 'https://line.me/R/ti/p/@kongrit' },
    { id: 5, name: 'Ai-Sam-Ta', storeName: 'Raynue (3rd Floor)', slug: 'ai-sam-ta', image: '/images/point-cars/Ai-Sam-Ta.png', couponLink: 'https://line.me/R/ti/p/@ai-sam-ta' },
    { id: 6, name: 'Qtako', storeName: 'ToroTora (3rd Floor)', slug: 'qtako', image: '/images/point-cars/Qtako.png', couponLink: 'https://line.me/R/ti/p/@qtako' },
    { id: 7, name: 'Dylie', storeName: 'Brewave (4th Floor)', slug: 'dylie', image: '/images/point-cars/Dylie.png', couponLink: 'https://line.me/R/ti/p/@dylie' },
    { id: 8, name: 'Korn Doll', storeName: 'Blue Cheri (4th Floor)', slug: 'korn-doll', image: '/images/point-cars/Korn Doll.png', couponLink: 'https://line.me/R/ti/p/@korn-doll' },
    { id: 9, name: 'World Boy', storeName: 'Jiaozi (4th Floor)', slug: 'world-boy', image: '/images/point-cars/World Boy.png', couponLink: 'https://line.me/R/ti/p/@world-boy' }
  ]

  useEffect(() => {
    // Set window dimensions
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    })

    // Find store by slug
    const foundStore = stores.find(s => s.slug === storeSlug)
    if (foundStore) {
      setStore(foundStore)
      // Mark as checked in
      const checkedInStores = JSON.parse(localStorage.getItem('checkedInStores') || '[]')
      if (!checkedInStores.includes(foundStore.id)) {
        checkedInStores.push(foundStore.id)
        localStorage.setItem('checkedInStores', JSON.stringify(checkedInStores))
      }
    }
    setIsLoading(false)

    // Stop confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [storeSlug])

  const handleGetCoupon = () => {
    if (store?.couponLink) {
      window.open(store.couponLink, '_blank')
    }
  }

  const handleBackToRoadmap = () => {
    navigate('/main')
  }

  if (isLoading) {
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
          <p style={{ color: '#6b7280', fontSize: '14px' }}>กำลังโหลด...</p>
        </div>
      </div>
    )
  }

  if (!store) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#dc2626', fontSize: '24px', marginBottom: '16px' }}>ไม่พบร้านค้า</h1>
          <p style={{ color: '#6b7280', marginBottom: '20px' }}>QR Code ไม่ถูกต้อง</p>
          <button
            onClick={() => navigate('/main')}
            style={{
              padding: '12px 24px',
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            กลับไป Roadmap
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8f9fa',
      overflowY: 'auto',
      paddingBottom: '20px'
    }}>
      {/* Confetti Effect */}
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={200}
          colors={['#dc2626', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899']}
          gravity={0.3}
          initialVelocityY={20}
          initialVelocityX={5}
        />
      )}
      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        position: 'relative'
      }}>
        {/* Success Highlight */}
        <img
          src="/images/hl-1.png"
          alt="Success Highlight"
          style={{
            width: '100vw',
            height: 'auto',
            maxHeight: '180px',
            margin: '0',
            padding: '0',
            display: 'block',
            objectFit: 'cover',
            marginLeft: 'calc(-50vw + 50%)'
          }}
        />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            backgroundColor: 'white',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 15px rgba(0,0,0,0.2)'
          }}>
            <CheckCircle style={{ color: '#dc2626', width: '40px', height: '40px' }} />
          </div>
        </div>
        
        <div style={{ padding: '15px', textAlign: 'center' }}>
          <p style={{
            color: '#dc2626',
            fontSize: '12px',
            fontWeight: '500',
            margin: '0 0 8px 0'
          }}>เช็กอินสำเร็จ</p>
          <h1 style={{
            color: '#1f2937',
            fontSize: '18px',
            fontWeight: '700',
            fontFamily: "'Poppins', sans-serif",
            margin: '0',
            letterSpacing: '0.5px'
          }}>ยินดีด้วย!</h1>
        </div>
      </div>

      {/* Success Content */}
      <div style={{
        padding: '15px',
        maxWidth: '100vw',
        boxSizing: 'border-box'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '16px',
          textAlign: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginBottom: '12px'
        }}>
          <h2 style={{
            color: '#1f2937',
            fontSize: '16px',
            fontWeight: 'bold',
            margin: '0 0 12px 0'
          }}>
            คุณได้เช็กอิน<br />
            <span style={{ color: '#dc2626' }}>{store.storeName}</span> แล้ว!
          </h2>

          {/* Store Avatar */}
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid #dc2626',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            margin: '0 auto 12px auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img
              src={store.image}
              alt={store.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>

          <p style={{
            color: '#6b7280',
            fontSize: '12px',
            lineHeight: '1.4',
            margin: '0'
          }}>
            รับรางวัลและคูปองพิเศษจากร้านค้า
          </p>
        </div>
      </div>

      {/* Footer Buttons */}
      <div style={{
        padding: '15px',
        backgroundColor: 'white',
        borderTop: '1px solid #e5e7eb',
        marginTop: '12px'
      }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={handleBackToRoadmap}
            style={{
              flex: 1,
              padding: '12px',
              backgroundColor: 'white',
              border: '1px solid #d1d5db',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '600',
              fontFamily: "'Inter', sans-serif",
              color: '#374151',
              cursor: 'pointer',
              letterSpacing: '0.3px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <ArrowLeft style={{ width: '18px', height: '18px' }} />
            Back
          </button>
          <button
            onClick={handleGetCoupon}
            style={{
              flex: 1,
              padding: '12px',
              background: 'linear-gradient(135deg, #dc2626, #ef4444)',
              border: 'none',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '600',
              fontFamily: "'Inter', sans-serif",
              color: 'white',
              cursor: 'pointer',
              letterSpacing: '0.3px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <Gift style={{ width: '18px', height: '18px' }} />
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default Checkin
