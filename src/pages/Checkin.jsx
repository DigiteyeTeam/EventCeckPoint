import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CheckCircle, Gift, ArrowLeft } from 'lucide-react'
import Confetti from 'react-confetti'
import { getUserData } from '../utils/storage'
import ImageWithLoading from '../components/ImageWithLoading'

function Checkin() {
  const { storeSlug } = useParams()
  const navigate = useNavigate()
  const [store, setStore] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showConfetti, setShowConfetti] = useState(true)
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 })
  const [celebrationSound, setCelebrationSound] = useState(null)

  // Store data mapping
  const stores = [
    { id: 1, name: 'Colonel Gold Fang', storeName: 'Dough Bros. Pizza & Doughnuts', slug: 'colonel-gold-fang', image: '/images/point-cars/Colonel Gold Fang.png', storeImage: '/images/restaurant/r1.png', logo: '/images/restaurant-logo/l1.png', couponLink: 'https://line.me/R/ti/p/@colonel-gold-fang' },
    { id: 2, name: 'Greenie & Elfie', storeName: "Mickey's Diner BKK", slug: 'greenie-elfie', image: '/images/point-cars/Greenie & Elfie.png', storeImage: '/images/restaurant/r2.png', logo: '/images/restaurant-logo/l2.png', couponLink: 'https://line.me/R/ti/p/@greenie-elfie' },
    { id: 3, name: 'Splash', storeName: 'Villa Market - Gaysorn Amarin', slug: 'splash', image: '/images/point-cars/Splash.png', storeImage: '/images/restaurant/r3.png', logo: '/images/restaurant-logo/l3.png', couponLink: 'https://line.me/R/ti/p/@splash' },
    { id: 4, name: 'Kongrit', storeName: 'NICO NICO - Gaysorn Amarin', slug: 'kongrit', image: '/images/point-cars/Kongrit.png', storeImage: '/images/restaurant/r4.png', logo: '/images/restaurant-logo/l4.png', couponLink: 'https://line.me/R/ti/p/@kongrit' },
    { id: 5, name: 'Ai-Sam-Ta', storeName: 'Raynue', slug: 'ai-sam-ta', image: '/images/point-cars/Ai-Sam-Ta.png', storeImage: '/images/restaurant/r5.png', logo: '/images/restaurant-logo/l5.png', couponLink: 'https://line.me/R/ti/p/@ai-sam-ta' },
    { id: 6, name: 'Qtako', storeName: 'ToroTora', slug: 'qtako', image: '/images/point-cars/Qtako.png', storeImage: '/images/restaurant/r6.png', logo: '/images/restaurant-logo/l6.png', couponLink: 'https://line.me/R/ti/p/@qtako' },
    { id: 7, name: 'Dylie', storeName: 'Brewave Gaysorn Amarin', slug: 'dylie', image: '/images/point-cars/Dylie.png', storeImage: '/images/restaurant/r7.png', logo: '/images/restaurant-logo/l7.png', couponLink: 'https://line.me/R/ti/p/@dylie' },
    { id: 8, name: 'Korn Doll', storeName: 'Jiaozi Jiuba', slug: 'korn-doll', image: '/images/point-cars/Korn Doll.png', storeImage: '/images/restaurant/r8.png', logo: '/images/restaurant-logo/l8.png', couponLink: 'https://line.me/R/ti/p/@korn-doll' },
    { id: 9, name: 'World Boy', storeName: 'Blue Chéri Gaysorn Amarin', slug: 'world-boy', image: '/images/point-cars/World Boy.png', storeImage: '/images/restaurant/r9.png', logo: '/images/restaurant-logo/l9.png', couponLink: 'https://line.me/R/ti/p/@world-boy' }
  ]

  useEffect(() => {
    // Check if user is registered first
    const userData = getUserData()
    if (!userData) {
      // User not registered, redirect to start page
      navigate('/')
      return
    }

    // Set window dimensions
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    })

    // Initialize celebration sound
    const audio = new Audio('/sounds/celebration.mp3')
    audio.volume = 0.7
    audio.preload = 'auto'
    setCelebrationSound(audio)

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
      
      // Play celebration sound
      audio.play().catch(e => {
        console.log('Could not play sound:', e)
        // Fallback: Create a simple beep sound using Web Audio API
        try {
          const audioContext = new (window.AudioContext || window.webkitAudioContext)()
          const oscillator = audioContext.createOscillator()
          const gainNode = audioContext.createGain()
          
          oscillator.connect(gainNode)
          gainNode.connect(audioContext.destination)
          
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
          oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1)
          oscillator.frequency.setValueAtTime(1200, audioContext.currentTime + 0.2)
          
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
          
          oscillator.start(audioContext.currentTime)
          oscillator.stop(audioContext.currentTime + 0.5)
        } catch (fallbackError) {
          console.log('Fallback sound also failed:', fallbackError)
        }
      })
    }
    setIsLoading(false)

    // Stop confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 5000)

    return () => {
      clearTimeout(timer)
      if (audio) {
        audio.pause()
        audio.currentTime = 0
      }
    }
  }, [storeSlug, navigate])

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
        <ImageWithLoading
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
          skeletonStyle={{
            width: '100vw',
            height: '180px',
            borderRadius: '0'
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
        
      </div>

      {/* Success Content */}
      <div style={{
        padding: '15px',
        maxWidth: '100vw',
        boxSizing: 'border-box'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '16px',
          textAlign: 'center',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          marginBottom: '12px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background Decoration */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '100px',
            height: '100px',
            background: 'linear-gradient(135deg, #dc2626, #ef4444)',
            borderRadius: '50%',
            opacity: 0.1
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-30px',
            left: '-30px',
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #f59e0b, #f97316)',
            borderRadius: '50%',
            opacity: 0.1
          }} />

          {/* Success Message */}
          <div style={{
            position: 'relative',
            zIndex: 2
          }}>
            <h2 style={{
              color: '#1f2937',
              fontSize: '18px',
              fontWeight: 'bold',
              margin: '0 0 12px 0',
              lineHeight: '1.3'
            }}>
              เช็คอินสำเร็จ!
            </h2>
            
            <p style={{
              color: '#6b7280',
              fontSize: '14px',
              margin: '0 0 12px 0',
              lineHeight: '1.4'
            }}>
              คุณได้เช็กอินที่
            </p>

            {/* Store Name with Logo */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              margin: '0 0 12px 0',
              padding: '8px',
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <ImageWithLoading
                src={store.logo}
                alt={`${store.storeName} Logo`}
                style={{
                  width: '32px',
                  height: '32px',
                  objectFit: 'contain',
                  borderRadius: '4px'
                }}
                skeletonStyle={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '4px'
                }}
                showSkeleton={false}
              />
              <h3 style={{
                color: '#dc2626',
                fontSize: '16px',
                fontWeight: 'bold',
                margin: '0',
                lineHeight: '1.3'
              }}>
                {store.storeName}
              </h3>
            </div>

            {/* Large Store Image */}
            <div style={{
              width: '160px',
              height: '120px',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
              margin: '0 auto 12px auto',
              position: 'relative'
            }}>
              <ImageWithLoading
                src={store.storeImage}
                alt={store.storeName}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                skeletonStyle={{
                  borderRadius: '12px'
                }}
                fallbackSrc={store.image}
              />
            </div>

            <p style={{
              color: '#059669',
              fontSize: '14px',
              fontWeight: '600',
              margin: '0',
              lineHeight: '1.4'
            }}>
              พร้อมรับรางวัลและคูปองส่วนลด!
            </p>
          </div>
        </div>
      </div>

      {/* Button Section */}
      <div style={{
        padding: '15px',
        backgroundColor: 'white',
        borderTop: '1px solid #e5e7eb',
        marginTop: '8px'
      }}>
        {/* Buttons Row */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {/* Back Button */}
          <button
            onClick={handleBackToRoadmap}
            style={{
              flex: '1',
              padding: '12px',
              backgroundColor: 'white',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              fontFamily: "'Inter', sans-serif",
              color: '#374151',
              cursor: 'pointer',
              letterSpacing: '0.3px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f9fafb'
              e.target.style.borderColor = '#9ca3af'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'white'
              e.target.style.borderColor = '#d1d5db'
            }}
          >
            <ArrowLeft style={{ width: '16px', height: '16px' }} />
            กลับ
          </button>

          {/* Main Reward Button */}
          <div style={{
            flex: '2',
            position: 'relative',
            background: 'linear-gradient(135deg, #ef4444, #ec4899)',
            borderRadius: '12px',
            padding: '3px',
            boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)',
            animation: 'pulse 2s infinite'
          }}>
            <button
              onClick={handleGetCoupon}
              style={{
                width: '100%',
                padding: '12px',
                background: 'linear-gradient(135deg, #ef4444, #ec4899)',
                border: 'none',
                borderRadius: '9px',
                fontSize: '14px',
                fontWeight: 'bold',
                fontFamily: "'Inter', sans-serif",
                color: 'white',
                cursor: 'pointer',
                letterSpacing: '0.3px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                transition: 'all 0.3s ease',
                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-1px)'
                e.target.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 2px 8px rgba(239, 68, 68, 0.3)'
              }}
              onMouseDown={(e) => {
                e.target.style.transform = 'translateY(0) scale(0.98)'
              }}
              onMouseUp={(e) => {
                e.target.style.transform = 'translateY(-1px) scale(1)'
              }}
            >
              <Gift style={{ width: '18px', height: '18px' }} />
              รับคูปอง
            </button>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.01); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  )
}

export default Checkin
