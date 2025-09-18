import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { QrCode, Home, MapPin, X, Ticket } from 'lucide-react'
import { getUserData, clearAllData } from '../utils/storage'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { motion } from 'framer-motion'
import Particles from '@tsparticles/react'
import { loadBasic } from '@tsparticles/basic'
import ImageWithLoading from '../components/ImageWithLoading'
import QrScanner from 'qr-scanner'

function Main() {
  const navigate = useNavigate()
  const location = useLocation()
  const userData = getUserData()
  const [checkedInStores, setCheckedInStores] = useState([])
  const [showCamera, setShowCamera] = useState(false)
  const [stream, setStream] = useState(null)
  const [particlesInit, setParticlesInit] = useState(false)
  const [qrScanner, setQrScanner] = useState(null)
  const [qrDetected, setQrDetected] = useState(false)
  const videoRef = useRef(null)

  // Check if user is registered
  useEffect(() => {
    console.log('Main: Checking user data...')
    console.log('Main: userData =', userData)
    if (!userData) {
      console.log('Main: User not registered, redirecting to /')
      navigate('/')
      return
    }
    console.log('Main: User registered, showing main page')
  }, [userData, navigate])

  // Store data with coordinates and map links
  const stores = [
    { id: 1, name: 'Colonel Gold Fang', storeName: 'Dough Bros. Pizza & Doughnuts', slug: 'colonel-gold-fang', image: '/images/point-cars/Colonel Gold Fang.png', imageBlack: '/images/point-cars-black/Colonel Gold Fang.png', lat: 13.7563, lng: 100.5018, mapLink: 'https://maps.app.goo.gl/swtgj2HKEG8jBRti8' },
    { id: 2, name: 'Greenie & Elfie', storeName: "Mickey's Diner BKK", slug: 'greenie-elfie', image: '/images/point-cars/Greenie & Elfie.png', imageBlack: '/images/point-cars-black/Greenie & Elfie.png', lat: 13.7564, lng: 100.5019, mapLink: 'https://maps.app.goo.gl/BvNV1PHRYoScZVHj9' },
    { id: 3, name: 'Splash', storeName: 'Villa Market - Gaysorn Amarin', slug: 'splash', image: '/images/point-cars/Splash.png', imageBlack: '/images/point-cars-black/Splash.png', lat: 13.7565, lng: 100.5020, mapLink: 'https://maps.app.goo.gl/W88CtzsNZeAAZFLA6' },
    { id: 4, name: 'Kongrit', storeName: 'NICO NICO - Gaysorn Amarin', slug: 'kongrit', image: '/images/point-cars/Kongrit.png', imageBlack: '/images/point-cars-black/Kongrit.png', lat: 13.7566, lng: 100.5021, mapLink: 'https://maps.app.goo.gl/e1Cy8iCXHPXo1pog9' },
    { id: 5, name: 'Ai-Sam-Ta', storeName: 'Raynue', slug: 'ai-sam-ta', image: '/images/point-cars/Ai-Sam-Ta.png', imageBlack: '/images/point-cars-black/Ai-Sam-Ta.png', lat: 13.7567, lng: 100.5022, mapLink: 'https://maps.app.goo.gl/fWDpCrXSph6RKT779' },
    { id: 6, name: 'Qtako', storeName: 'ToroTora', slug: 'qtako', image: '/images/point-cars/Qtako.png', imageBlack: '/images/point-cars-black/Qtako.png', lat: 13.7568, lng: 100.5023, mapLink: 'https://maps.app.goo.gl/yYv1v8YqwTohfY4U6' },
    { id: 7, name: 'Dylie', storeName: 'Brewave Gaysorn Amarin', slug: 'dylie', image: '/images/point-cars/Dylie.png', imageBlack: '/images/point-cars-black/Dylie.png', lat: 13.7569, lng: 100.5024, mapLink: 'https://maps.app.goo.gl/8cmZYMrFsP5rNWQo8' },
    { id: 8, name: 'Korn Doll', storeName: 'Jiaozi Jiuba', slug: 'korn-doll', image: '/images/point-cars/Korn Doll.png', imageBlack: '/images/point-cars-black/Korn Doll.png', lat: 13.7570, lng: 100.5025, mapLink: 'https://maps.app.goo.gl/x3uJkfpSoja8uPxs9' },
    { id: 9, name: 'World Boy', storeName: 'Blue Chéri Gaysorn Amarin', slug: 'world-boy', image: '/images/point-cars/World Boy.png', imageBlack: '/images/point-cars-black/World Boy.png', lat: 13.7571, lng: 100.5026, mapLink: 'https://maps.app.goo.gl/fW6d3AQniTgv69fx6' }
  ]

  useEffect(() => {
    // Load checked-in stores from localStorage
    const loadCheckedInStores = () => {
      const saved = localStorage.getItem('checkedInStores')
      if (saved) {
        const parsedStores = JSON.parse(saved)
        setCheckedInStores(parsedStores)
        console.log('Loaded checked-in stores:', parsedStores) // Debug log
      } else {
        setCheckedInStores([])
        console.log('No checked-in stores found, setting empty array')
      }
    }
    
    loadCheckedInStores()

    // Listen for storage changes (when user comes back from checkin page)
    const handleStorageChange = () => {
      console.log('Storage change detected, reloading...')
      loadCheckedInStores()
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    // Also check on focus (when user comes back to tab)
    window.addEventListener('focus', handleStorageChange)

    // Initialize particles
    try {
      loadBasic().then(() => {
        setParticlesInit(true)
      }).catch((error) => {
        console.error('Particles initialization failed:', error)
        setParticlesInit(false)
      })
    } catch (error) {
      console.error('Particles load error:', error)
      setParticlesInit(false)
    }

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('focus', handleStorageChange)
    }
  }, [])

  // Force state sync with localStorage
  useEffect(() => {
    const saved = localStorage.getItem('checkedInStores')
    if (saved) {
      const parsedStores = JSON.parse(saved)
      if (JSON.stringify(parsedStores) !== JSON.stringify(checkedInStores)) {
        console.log('State mismatch detected, syncing...', { localStorage: parsedStores, state: checkedInStores })
        setCheckedInStores(parsedStores)
      }
    }
  }, [checkedInStores])

  const handleMapClick = (store) => {
    console.log('Map clicked!', store)
    navigate(`/store/${store.id}`)
  }

  const handleScanClick = async () => {
    console.log('Scan clicked!')
    try {
      setShowCamera(true)
      
      // Wait for video element to be ready
      setTimeout(() => {
        if (videoRef.current) {
          const scanner = new QrScanner(
            videoRef.current,
            (result) => {
              console.log('QR Code detected:', result.data)
              handleQRCodeDetected(result.data)
            },
            {
              onDecodeError: (error) => {
                // Silently handle decode errors (normal during scanning)
                console.log('QR decode error:', error)
              },
              highlightScanRegion: false,
              highlightCodeOutline: false,
            }
          )
          
          scanner.start().catch((error) => {
            console.error('QR Scanner start error:', error)
            alert('ไม่สามารถเริ่มต้น QR Scanner ได้')
          })
          
          setQrScanner(scanner)
        }
      }, 100)
    } catch (error) {
      console.error('Error accessing camera:', error)
      alert('ไม่สามารถเข้าถึงกล้องได้ กรุณาอนุญาตการเข้าถึงกล้อง')
    }
  }

  const handleQRCodeDetected = (qrData) => {
    console.log('🔍 QR Code detected:', qrData)
    console.log('📋 Available slugs:', stores.map(s => s.slug))
    
    // More flexible QR code matching
    let store = null
    
    // Try exact slug match first
    store = stores.find(s => qrData.includes(s.slug))
    if (store) {
      console.log('✅ Exact slug match found:', store.name)
    }
    
    // If not found, try partial matches with slug
    if (!store) {
      store = stores.find(s => {
        const slug = s.slug.toLowerCase()
        const data = qrData.toLowerCase()
        const match = data.includes(slug) || slug.includes(data)
        if (match) console.log('✅ Partial slug match found:', store.name)
        return match
      })
    }
    
    // If still not found, try store name match
    if (!store) {
      store = stores.find(s => {
        const name = s.name.toLowerCase()
        const data = qrData.toLowerCase()
        const match = data.includes(name) || name.includes(data)
        if (match) console.log('✅ Store name match found:', store.name)
        return match
      })
    }
    
    // If still not found, try store ID match (for testing)
    if (!store) {
      const idMatch = qrData.match(/\d+/)
      if (idMatch) {
        const id = parseInt(idMatch[0])
        store = stores.find(s => s.id === id)
        if (store) console.log('✅ Store ID match found:', store.name)
      }
    }
    
    // If still not found, try any number in QR code as store ID
    if (!store) {
      const numbers = qrData.match(/\d+/g)
      if (numbers) {
        for (const num of numbers) {
          const id = parseInt(num)
          if (id >= 1 && id <= 9) {
            store = stores.find(s => s.id === id)
            if (store) {
              console.log('✅ Number-based match found:', store.name)
              break
            }
          }
        }
      }
    }
    
    if (store) {
      console.log('🎉 Store found:', store.name, 'ID:', store.id, 'Slug:', store.slug)
      
      // Stop scanner
      if (qrScanner) {
        qrScanner.stop()
        qrScanner.destroy()
        setQrScanner(null)
      }
      setShowCamera(false)
      
      // Sound Effect
      playCheckinSound()
      
      // Haptic Feedback
      triggerHapticFeedback()
      
      // Navigate to checkin page
      const checkinUrl = `/checkin/${store.slug}`
      console.log('🚀 Navigating to:', checkinUrl)
      navigate(checkinUrl)
    } else {
      console.log('❌ Store not found for QR data:', qrData)
      console.log('🔄 Continuing to scan...')
      
      // Show a brief visual feedback that QR was detected but not recognized
      setQrDetected(true)
      setTimeout(() => setQrDetected(false), 1000)
    }
  }

  const handleTestScan = (storeId) => {
    // จำลองการสแกน QR Code หน้าร้าน
    const store = stores.find(s => s.id === storeId)
    if (store) {
      // Sound Effect
      playCheckinSound()
      
      // Haptic Feedback
      triggerHapticFeedback()
      
      // ใช้ slug field ที่กำหนดไว้แล้ว
      const checkinUrl = `/checkin/${store.slug}`
      navigate(checkinUrl)
    }
  }

  // Force refresh when component becomes visible (when returning from checkin)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        const saved = localStorage.getItem('checkedInStores')
        if (saved) {
          const parsedStores = JSON.parse(saved)
          setCheckedInStores(parsedStores)
          console.log('Visibility change - refreshed checked-in stores:', parsedStores) // Debug log
        }
      }
    }

    // Also refresh on page show (when returning from another tab/page)
    const handlePageShow = () => {
      const saved = localStorage.getItem('checkedInStores')
      if (saved) {
        const parsedStores = JSON.parse(saved)
        setCheckedInStores(parsedStores)
        console.log('Page show - refreshed checked-in stores:', parsedStores) // Debug log
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('pageshow', handlePageShow)
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('pageshow', handlePageShow)
    }
  }, [])

  // Cleanup QR Scanner on unmount
  useEffect(() => {
    return () => {
      if (qrScanner) {
        qrScanner.stop()
        qrScanner.destroy()
      }
    }
  }, [qrScanner])

  const playCheckinSound = () => {
    // Create audio context for sound effect
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      // Create a pleasant check-in sound
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1)
      oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.2)
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.3)
    } catch (error) {
      console.log('Audio not supported')
    }
  }

  const triggerHapticFeedback = () => {
    // Haptic feedback for mobile devices
    if ('vibrate' in navigator) {
      // Short vibration pattern
      navigator.vibrate([50, 30, 50])
    }
  }

  const handleCloseCamera = () => {
    // Stop QR Scanner
    if (qrScanner) {
      qrScanner.stop()
      qrScanner.destroy()
      setQrScanner(null)
    }
    
    // Stop camera stream
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
    setShowCamera(false)
    setQrDetected(false)
  }

  const handleLogout = () => {
    clearAllData()
    navigate('/')
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#1e293b', // Brighter blue background for car animation
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Main Content Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }} // Faster curtain opening
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, #2D1350, #AA1D79, #ED162B)',
          zIndex: 1
        }}
      />

      {/* Roadmap Top Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '200px',
          zIndex: 1.5
        }}
      >
        <img
          src="/images/bg-roadmaptop.png"
          alt="Roadmap Top Background"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1
          }}
        />
      </motion.div>

      {/* Particles Background */}
      {particlesInit && (
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: {
              color: {
                value: "transparent",
              },
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: ["#FCD34D", "#dc2626", "#8b5cf6", "#ec4899"],
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.2,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 1,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 50,
              },
              opacity: {
                value: 0.3,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 3 },
              },
            },
            detectRetina: true,
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0
          }}
        />
      )}
      
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }} // Header appearance
            style={{ 
              padding: '5px',
              textAlign: 'center',
              position: 'relative',
              zIndex: 3,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%'
            }}
      >
        
        {/* ROADMAP Image */}
        <ImageWithLoading
          src="/images/roadmap.png" 
          alt="ROADMAP"
          style={{
            height: '60px',
            width: 'auto',
            maxWidth: '300px',
            objectFit: 'contain',
            filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
            position: 'relative',
            zIndex: 2
          }}
          skeletonStyle={{
            height: '60px',
            width: '200px',
            borderRadius: '8px'
          }}
        />
      </motion.div>

          {/* Roadmap Area */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }} // Roadmap appearance
            style={{ 
              height: '114vh',
              width: '100%',
              position: 'relative',
              zIndex: 2
            }}
      >

        <TransformWrapper
          initialScale={0.5}
          minScale={0.3}
          maxScale={3}
          centerOnInit={true}
          wheel={{ disabled: true }}
          pinch={{ disabled: true }}
          doubleClick={{ disabled: true }}
          panning={{ 
            disabled: true,
            velocityDisabled: true,
            lockAxisX: true,
            lockAxisY: false
          }}
          limitToBounds={true}
          centerZoomedOut={true}
        >
          <TransformComponent
            wrapperStyle={{
              width: '100%',
              height: '100%'
            }}
            contentStyle={{
              width: '100%',
              height: '100%',
              position: 'relative'
            }}
          >
            <div style={{ 
              position: 'relative',
              width: '150%',
              height: '150%',
              minHeight: '1000px',
              margin: '-25%'
            }}>
                  {/* Road Background */}
                  <img 
                    src="/images/road.png" 
                    alt="Road"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      zIndex: 1
                    }}
                  />

                  {/* Twinkling Stars Background */}
                  {[...Array(80)].map((_, index) => (
                    <motion.div
                      key={index}
                      style={{
                        position: 'absolute',
                        width: '4px',
                        height: '4px',
                        backgroundColor: '#FCD34D',
                        borderRadius: '50%',
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        zIndex: 1
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: Math.random() * 3 + 1, // 1-4 seconds
                        repeat: Infinity,
                        delay: Math.random() * 2, // 0-2 seconds delay
                        ease: "easeInOut"
                      }}
                    />
                  ))}

              {/* Store Points */}
              {stores.map((store, index) => {
                const isCheckedIn = checkedInStores.includes(store.id)
                const positions = [
                  { top: '-28vh', left: '15%' },   // Colonel Gold Fang
                  { top: '5vh', right: '15%' },  // Greenie & Elfie
                  { top: '20vh', left: '5%' },   // Splash
                  { top: '45vh', right: '20%' },  // Kongrit
                  { top: '65vh', left: '-5%' },   // Ai-Sam-Ta
                  { top: '65vh', right: '0%' },  // Qtako
                  { top: '85vh', left: '30%' },   // Dylie
                  { top: '105vh', right: '11%' },  // World Boy
                  { top: '125vh', left: '20%' }    // Korn Doll
                ]

                return (
                  <div key={store.id} style={{
                    position: 'absolute',
                    ...positions[index],
                        zIndex: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}>
                        {/* Map Pin */}
                        <motion.button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            console.log('Map clicked!', store)
                            handleMapClick(store)
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '0px',
                            zIndex: 1001,
                            position: 'relative'
                          }}
                          whileHover={{ 
                            scale: 1.2,
                            rotate: [0, -10, 10, 0],
                            transition: { duration: 0.2 }
                          }}
                          whileTap={{ scale: 0.9 }}
                          animate={{
                            y: [0, -15, 0],
                            rotate: [0, 3, -3, 0],
                            scale: [1, 1.05, 1]
                          }}
                          transition={{
                            y: {
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut"
                            },
                            rotate: {
                              duration: 2.5,
                              repeat: Infinity,
                              ease: "easeInOut"
                            },
                            scale: {
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }
                          }}
                        >
                      <ImageWithLoading
                        src="/images/map.png" 
                        alt="Map Pin"
                        style={{
                          width: '100px',
                          height: '120px',
                          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                        }}
                        skeletonStyle={{
                          width: '100px',
                          height: '120px',
                          borderRadius: '8px'
                        }}
                      />
                    </motion.button>

                    {/* Avatar */}
                    <motion.div 
                      style={{
                        marginTop: '5px',
                        width: '140px',
                        height: '140px',
         
                        backgroundColor: 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'default'
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: '0 12px 25px rgba(0,0,0,0.0)',
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.9 }}
                      animate={isCheckedIn ? {
                        boxShadow: [
                          '0 4px 8px rgba(0,0,0,0.0)',
                          '0 12px 20px rgba(0, 0, 0, 0.0)',
                          '0 4px 8px rgba(0,0,0,0.0)'
                        ],
                        scale: [1, 1.02, 1]
                      } : {
                        scale: [1, 1.01, 1]
                      }}
                      transition={{
                        boxShadow: {
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        },
                        scale: {
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }
                      }}
                    >
                      <img
                        src={isCheckedIn ? store.image : store.imageBlack} 
                        alt={store.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain'
                        }}
                        onLoad={() => console.log(`Image loaded for ${store.name}: ${isCheckedIn ? store.image : store.imageBlack}`)}
                        onError={() => console.log(`Image failed to load for ${store.name}: ${isCheckedIn ? store.image : store.imageBlack}`)}
                      />
                    </motion.div>

                    {/* Store Name */}
                    {isCheckedIn && (
                      <p style={{
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: '600',
                        fontFamily: "'Inter', sans-serif",
                        margin: '5px 0 0 0',
                        textAlign: 'center',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                        maxWidth: '80px'
                      }}>
                        {store.name}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </TransformComponent>
        </TransformWrapper>
      </motion.div>

      {/* Camera Popup - Only show in Main page */}
      {showCamera && location.pathname === '/main' && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          height: '60%',
          backgroundColor: 'white',
          borderRadius: '20px',
          zIndex: 1000,
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
        }}>
          {/* Close Button */}
          <button
            onClick={handleCloseCamera}
            style={{
              position: 'absolute',
              top: '15px',
              left: '15px',
              width: '40px',
              height: '40px',
              backgroundColor: 'rgba(0,0,0,0.5)',
              border: 'none',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 1001
            }}
          >
            <X style={{ color: 'white', width: '20px', height: '20px' }} />
          </button>

          {/* Camera Feed */}
          <div style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            backgroundColor: '#000'
          }}>
            <video
              ref={videoRef}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              autoPlay
              playsInline
              muted
            />

            {/* Modern Scanning Overlay - Light Theme */}
            <div style={{
              position: 'absolute',
              top: '15%',
              left: '15%',
              right: '15%',
              bottom: '15%',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '25px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)',
              animation: 'scanningPulse 2s ease-in-out infinite alternate'
            }}>
              <QrCode style={{ 
                color: 'rgba(255, 255, 255, 0.6)', 
                width: '70px', 
                height: '70px',
                opacity: 0.8,
                filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.4))',
                animation: 'qrCodeGlow 1.5s ease-in-out infinite alternate'
              }} />
            </div>

            {/* Enhanced Corner Brackets with Light Glow */}
            <div style={{
              position: 'absolute',
              top: '15%',
              left: '15%',
              width: '40px',
              height: '40px',
              borderTop: '4px solid rgba(255, 255, 255, 0.5)',
              borderLeft: '4px solid rgba(255, 255, 255, 0.5)',
              borderTopLeftRadius: '15px',
              boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
              animation: 'cornerGlow 2s ease-in-out infinite alternate'
            }} />
            <div style={{
              position: 'absolute',
              top: '15%',
              right: '15%',
              width: '40px',
              height: '40px',
              borderTop: '4px solid rgba(255, 255, 255, 0.5)',
              borderRight: '4px solid rgba(255, 255, 255, 0.5)',
              borderTopRightRadius: '15px',
              boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
              animation: 'cornerGlow 2s ease-in-out infinite alternate 0.5s'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '15%',
              left: '15%',
              width: '40px',
              height: '40px',
              borderBottom: '4px solid rgba(255, 255, 255, 0.5)',
              borderLeft: '4px solid rgba(255, 255, 255, 0.5)',
              borderBottomLeftRadius: '15px',
              boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
              animation: 'cornerGlow 2s ease-in-out infinite alternate 1s'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '15%',
              right: '15%',
              width: '40px',
              height: '40px',
              borderBottom: '4px solid rgba(255, 255, 255, 0.5)',
              borderRight: '4px solid rgba(255, 255, 255, 0.5)',
              borderBottomRightRadius: '15px',
              boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
              animation: 'cornerGlow 2s ease-in-out infinite alternate 1.5s'
            }} />

            {/* Scanning Instructions */}
            <div style={{
              position: 'absolute',
              bottom: '10%',
              left: '50%',
              transform: 'translateX(-50%)',
              color: qrDetected ? 'rgba(255, 100, 100, 0.9)' : 'rgba(255, 255, 255, 0.8)',
              fontSize: '16px',
              fontWeight: '600',
              textAlign: 'center',
              textShadow: qrDetected ? '0 0 10px rgba(255, 100, 100, 0.8)' : '0 0 10px rgba(255, 255, 255, 0.6)',
              animation: qrDetected ? 'none' : 'textPulse 2s ease-in-out infinite alternate',
              transition: 'all 0.3s ease'
            }}>
              {qrDetected ? 'QR Code ไม่ถูกต้อง' : 'สแกน QR Code'}
            </div>

            {/* QR Code Instructions */}
            <div style={{
              position: 'absolute',
              top: '2%',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '12px',
              fontWeight: '200',
              textAlign: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              padding: '5px 16px',
              borderRadius: '10px',
              maxWidth: '90%',
              lineHeight: '1.4'
            }}>
              หา QR Code ที่ตั้งอยู่หน้าร้านร่วมรายการ
            </div>

          </div>
        </div>
      )}

          {/* Bottom Navigation */}
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              delay: 1.0, // Bottom navigation appearance
              duration: 0.8,
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
            style={{ 
              position: 'fixed', 
              bottom: '0', 
              left: '0', 
              right: '0',
              width: '100%',
              height: '90px',
              padding: '0px 30px 5px 30px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              zIndex: 10,
              filter: 'drop-shadow(0 -13px 17px rgba(0, 0, 0, 0.25))',
              background: 'url("data:image/svg+xml,%3Csvg width=\'430\' height=\'106\' viewBox=\'0 0 430 106\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M216 0C228.578 0 239.649 6.45044 246.086 16.2237C251.927 25.0936 260.258 34 270.879 34H400C416.569 34 430 47.4315 430 64V103C430 104.657 428.657 106 427 106H3C1.34315 106 4.83196e-08 104.657 0 103V64C7.73159e-07 47.4315 13.4315 34 30 34H161.121C171.742 34 180.073 25.0936 185.914 16.2237C192.351 6.45044 203.422 0 216 0Z\' fill=\'%232E1350\'/%3E%3C/svg%3E") no-repeat center center',
              backgroundSize: '100% 100%'
            }}>
            {/* Button Container */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              width: '100%',
              maxWidth: '400px',
              gap: '20px',
              marginBottom: '-19px'
            }}>
            {/* Home Button */}
            <motion.button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                console.log('Home clicked!')
                navigate('/main')
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '8px',
                marginBottom: '-10px',
                transition: 'all 0.3s ease',
                zIndex: 1002,
                position: 'relative'
              }}
              whileHover={{ 
                scale: 1.1,
                color: '#FCD34D',
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                y: [0, -2, 0]
              }}
              transition={{
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <Home style={{ width: '22px', height: '22px', marginBottom: '4px' }} />
              <span style={{ fontSize: '10px', fontWeight: '500', fontFamily: "'Inter', sans-serif" }}>Home</span>
            </motion.button>

            {/* Scan Button - Elevated */}
            <div style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',

              borderRadius: '45px',
              padding: '6px',
              backgroundColor: '#2E1350',
              transform: 'translateY(-8px)'
            }}>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  console.log('Scan clicked!')
                  handleScanClick()
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  background: 'linear-gradient(135deg, #DC2626, #EF4444)',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '12px',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  zIndex: 1003
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.1)'
                  e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)'
                  e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)'
                }}
              >
                <QrCode style={{ width: '24px', height: '24px' }} />
              </button>
              <span style={{ 
                fontSize: '9px', 
                fontWeight: '600', 
                fontFamily: "'Inter', sans-serif",
                color: 'white',
                marginTop: '4px',
                textAlign: 'center',
                lineHeight: '1.1'
              }}>
                Scan to Check In
              </span>
              
              {/* Check-in Status */}
              <div style={{
                marginTop: '6px',
                padding: '4px 8px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                fontSize: '8px',
                fontWeight: '600',
                color: 'white',
                textAlign: 'center',
                minWidth: '40px'
              }}>
                {checkedInStores.length}/9
              </div>
            </div>

            {/* Coupon Button */}
            <motion.button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                console.log('Coupon clicked!', checkedInStores.length)
                if (checkedInStores.length === 9) {
                  navigate('/coupon')
                }
              }}
              disabled={checkedInStores.length !== 9}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'none',
                border: 'none',
                color: checkedInStores.length === 9 ? '#FCD34D' : '#9ca3af',
                cursor: checkedInStores.length === 9 ? 'pointer' : 'not-allowed',
                padding: '8px',
                marginBottom: '-10px',
                transition: 'all 0.3s ease',
                zIndex: 1002,
                position: 'relative'
              }}
              whileHover={checkedInStores.length === 9 ? { 
                scale: 1.1,
                color: '#F59E0B',
                transition: { duration: 0.2 }
              } : {}}
              whileTap={checkedInStores.length === 9 ? { scale: 0.95 } : {}}
              animate={checkedInStores.length === 9 ? {
                y: [0, -2, 0]
              } : {}}
              transition={checkedInStores.length === 9 ? {
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              } : {}}
            >
              <Ticket style={{ 
                width: '22px', 
                height: '22px', 
                marginBottom: '4px',
                color: checkedInStores.length === 9 ? '#FCD34D' : '#9ca3af'
              }} />
              <span style={{ 
                fontSize: '10px', 
                fontWeight: '500', 
                fontFamily: "'Inter', sans-serif",
                color: checkedInStores.length === 9 ? '#FCD34D' : '#9ca3af'
              }}>Coupon</span>
            </motion.button>
            </div>
          </motion.div>
    </div>
  )
}

export default Main
