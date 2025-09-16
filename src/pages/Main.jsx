import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { QrCode, Home, MapPin, X, Ticket } from 'lucide-react'
import { getUserData, clearAllData } from '../utils/storage'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { motion } from 'framer-motion'
import Particles from '@tsparticles/react'
import { loadBasic } from '@tsparticles/basic'

function Main() {
  const navigate = useNavigate()
  const userData = getUserData()
  const [checkedInStores, setCheckedInStores] = useState([])
  const [showCamera, setShowCamera] = useState(false)
  const [stream, setStream] = useState(null)
  const [particlesInit, setParticlesInit] = useState(false)

  // Store data with coordinates and map links
  const stores = [
    { id: 1, name: 'Colonel Gold Fang', storeName: 'Dough Bros. (G Floor)', image: '/images/point-cars/Colonel Gold Fang.png', lat: 13.7563, lng: 100.5018, mapLink: 'https://share.google/5SV89Joyu3vSHJLvb' },
    { id: 2, name: 'Greenie & Elfie', storeName: 'Mickey Dinner (G Floor)', image: '/images/point-cars/Greenie & Elfie.png', lat: 13.7564, lng: 100.5019, mapLink: 'https://share.google/qwHpx8OfZWGyL3ju' },
    { id: 3, name: 'Splash', storeName: 'Villa Market (G Floor)', image: '/images/point-cars/Splash.png', lat: 13.7565, lng: 100.5020, mapLink: 'https://share.google/TbQCASan9zyxV4rPx' },
    { id: 4, name: 'Kongrit', storeName: 'Nico Nico (2nd Floor)', image: '/images/point-cars/Kongrit.png', lat: 13.7566, lng: 100.5021, mapLink: 'https://share.google/NwgFbWS3SApY5vThd' },
    { id: 5, name: 'Ai-Sam-Ta', storeName: 'Raynue (3rd Floor)', image: '/images/point-cars/Ai-Sam-Ta.png', lat: 13.7567, lng: 100.5022, mapLink: 'https://share.google/E1TbXn4NBWHzAWWYc' },
    { id: 6, name: 'Qtako', storeName: 'ToroTora (3rd Floor)', image: '/images/point-cars/Qtako.png', lat: 13.7568, lng: 100.5023, mapLink: 'https://share.google/b6zvE1H6qh42rS10M' },
    { id: 7, name: 'Dylie', storeName: 'Brewave (4th Floor)', image: '/images/point-cars/Dylie.png', lat: 13.7569, lng: 100.5024, mapLink: 'https://share.google/AveC9P3pi8ljrMpjs' },
    { id: 8, name: 'Korn Doll', storeName: 'Blue Cheri (4th Floor)', image: '/images/point-cars/Korn Doll.png', lat: 13.7570, lng: 100.5025, mapLink: 'https://share.google/vk3DaptEFUXRoHo7g' },
    { id: 9, name: 'World Boy', storeName: 'Jiaozi (4th Floor)', image: '/images/point-cars/World Boy.png', lat: 13.7571, lng: 100.5026, mapLink: 'https://share.google/UhEIh6LVzSOmvI8lL' }
  ]

  useEffect(() => {
    // Load checked-in stores from localStorage
    const saved = localStorage.getItem('checkedInStores')
    if (saved) {
      setCheckedInStores(JSON.parse(saved))
    }

    // Initialize particles
    loadBasic().then(() => {
      setParticlesInit(true)
    })
  }, [])

  const handleMapClick = (store) => {
    window.open(store.mapLink, '_blank')
  }

  const handleScanClick = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      })
      setStream(mediaStream)
      setShowCamera(true)
    } catch (error) {
      console.error('Error accessing camera:', error)
      alert('ไม่สามารถเข้าถึงกล้องได้ กรุณาอนุญาตการเข้าถึงกล้อง')
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
      
      // จำลอง URL ที่ได้จาก QR Code
      const checkinUrl = `/checkin/${store.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '')}`
      navigate(checkinUrl)
    }
  }

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
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
    setShowCamera(false)
  }

  const handleLogout = () => {
    clearAllData()
    navigate('/')
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#0f172a', // Dark blue background for car animation
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
          background: 'linear-gradient(to bottom, #1a0d2e, #6b1a4f, #8b0e1f)',
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
      
      {/* Car Animation */}
      <motion.div
        initial={{ x: '100vw', opacity: 0 }}
        animate={{ 
          x: '-100vw', 
          opacity: [0, 1, 1, 0]
        }}
        transition={{
          duration: 1.5, // Faster car movement
          ease: "easeInOut",
          opacity: {
            times: [0, 0.1, 0.9, 1],
            duration: 1.5
          }
        }}
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1000,
          pointerEvents: 'none'
        }}
      >
        {/* Car Image */}
        <img 
          src="/images/carOpen.png" 
          alt="Car"
          style={{
            width: '50vw',
            height: 'auto',
            filter: 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.8))'
          }}
        />
        
            {/* Speed Lines Effect */}
            <motion.div
              animate={{
                x: [0, -150, -300],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 0.2, // Faster speed lines
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '-300px',
                transform: 'translateY(-50%)',
                width: '300px',
                height: '6px',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.9), transparent)',
                borderRadius: '3px'
              }}
            />
        
            {/* Wind Effect */}
            <motion.div
              animate={{
                scaleX: [1, 2.5, 1],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 0.15, // Faster wind effect
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                position: 'absolute',
                top: '10%',
                left: '-200px',
                width: '200px',
                height: '80%',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                borderRadius: '50%',
                transform: 'skewX(-25deg)'
              }}
            />
        
            {/* Fire Effect */}
            <motion.div
              animate={{
                scale: [1, 2, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 0.1, // Faster fire effect
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                position: 'absolute',
                top: '55%',
                left: '-80px',
                width: '80px',
                height: '50px',
                background: 'radial-gradient(circle, rgba(255, 100, 0, 0.9), rgba(255, 200, 0, 0.6), transparent)',
                borderRadius: '50%'
              }}
            />
      </motion.div>
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }} // Faster header appearance
            style={{ 
              padding: '5px',
              textAlign: 'center',
              position: 'relative',
              zIndex: 3
            }}
      >
        
        {/* ROADMAP Text */}
        <h1 style={{ 
          color: '#FCD34D', 
          fontSize: '32px', 
          fontWeight: '900',
          fontFamily: "'Poppins', sans-serif",
          margin: '0',
          letterSpacing: '2px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          position: 'relative',
          zIndex: 2,

        }}>
          ROADMAP
        </h1>
      </motion.div>

          {/* Roadmap Area */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0, duration: 0.8 }} // Faster roadmap appearance
            style={{ 
              height: '100vh',
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
          wheel={{ step: 0.1 }}
          pinch={{ step: 5 }}
          doubleClick={{ disabled: true }}
          panning={{ 
            disabled: false,
            velocityDisabled: false,
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
                      objectFit: 'contain',
                      zIndex: 2
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
                  { top: '-20vh', left: '40vw' },   // Colonel Gold Fang
                  { top: '0vh', right: '15vw' },  // Greenie & Elfie
                  { top: '10vh', left: '12vw' },   // Splash
                  { top: '40vh', right: '50vw' },  // Kongrit
                  { top: '55vh', left: '5vw' },   // Ai-Sam-Ta
                  { top: '55vh', right: '5vw' },  // Qtako
                  { top: '70vh', left: '50vw' },   // Dylie
                  { top: '90vh', right: '30vw' },  // World Boy
                  { top: '100vh', left: '15vw' }    // Korn Doll
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
                          onClick={() => handleMapClick(store)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '0px'
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
                      <img 
                        src="/images/map.png" 
                        alt="Map Pin"
                        style={{
                          width: '100px',
                          height: '120px',
                          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                          '@media (min-width: 768px)': {
                            width: '150px',
                            height: '180px'
                          }
                        }}
                      />
                    </motion.button>

                    {/* Avatar */}
                    <motion.div 
                      style={{
                        marginTop: '5px',
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        overflow: 'hidden',
         
                        backgroundColor: isCheckedIn ? 'transparent' : '#374151',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        '@media (min-width: 768px)': {
                          width: '150px',
                          height: '150px'
                        }
                      }}
                      onClick={() => handleTestScan(store.id)}
                      whileHover={{ 
                        scale: 1.1,
                        boxShadow: '0 12px 25px rgba(0,0,0,0.4)',
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.9 }}
                      animate={isCheckedIn ? {
                        boxShadow: [
                          '0 4px 8px rgba(0,0,0,0.1)',
                          '0 12px 20px rgba(220, 38, 38, 0.4)',
                          '0 4px 8px rgba(0,0,0,0.1)'
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
                      {isCheckedIn ? (
                        <img 
                          src={store.image} 
                          alt={store.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      ) : (
                        <span style={{
                          color: 'white',
                          fontSize: '24px',
                          fontWeight: 'bold',
                          '@media (min-width: 768px)': {
                            fontSize: '36px'
                          }
                        }}>
                          ?
                        </span>
                      )}
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
                        maxWidth: '80px',
                        '@media (min-width: 768px)': {
                          fontSize: '16px',
                          maxWidth: '120px'
                        }
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

      {/* Camera Popup */}
      {showCamera && (
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
            {stream && (
              <video
                ref={(video) => {
                  if (video && stream) {
                    video.srcObject = stream
                    video.play()
                  }
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                autoPlay
                playsInline
                muted
              />
            )}

            {/* Scanning Overlay */}
            <div style={{
              position: 'absolute',
              top: '20%',
              left: '20%',
              right: '20%',
              bottom: '20%',
              border: '2px solid #dc2626',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                width: '80%',
                height: '80%',
                border: '2px dashed #dc2626',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(220, 38, 38, 0.1)'
              }}>
                <QrCode style={{ 
                  color: '#dc2626', 
                  width: '60px', 
                  height: '60px',
                  opacity: 0.7
                }} />
              </div>
            </div>

            {/* Corner Brackets */}
            <div style={{
              position: 'absolute',
              top: '20%',
              left: '20%',
              width: '30px',
              height: '30px',
              borderTop: '3px solid #dc2626',
              borderLeft: '3px solid #dc2626',
              borderTopLeftRadius: '10px'
            }} />
            <div style={{
              position: 'absolute',
              top: '20%',
              right: '20%',
              width: '30px',
              height: '30px',
              borderTop: '3px solid #dc2626',
              borderRight: '3px solid #dc2626',
              borderTopRightRadius: '10px'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '20%',
              left: '20%',
              width: '30px',
              height: '30px',
              borderBottom: '3px solid #dc2626',
              borderLeft: '3px solid #dc2626',
              borderBottomLeftRadius: '10px'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '20%',
              right: '20%',
              width: '30px',
              height: '30px',
              borderBottom: '3px solid #dc2626',
              borderRight: '3px solid #dc2626',
              borderBottomRightRadius: '10px'
            }} />
          </div>
        </div>
      )}

          {/* Bottom Navigation */}
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              delay: 2.5, // หลังรถวิ่งผ่าน (1.5s) + หน่วงเวลา 1s
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
              backgroundColor: '#2E1350',
              padding: '-20px 20px 5px 20px',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'flex-end',
              zIndex: 10,
              borderTopLeftRadius: '45px',
              borderTopRightRadius: '45px',
              boxShadow: '0 -8px 30px rgba(0, 0, 0, 0.3), 0 -4px 15px rgba(0, 0, 0, 0.2)'
            }}>
            {/* Home Button */}
            <motion.button
              onClick={() => navigate('/main')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '8px',
                transition: 'all 0.3s ease'
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
                onClick={handleScanClick}
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
                  overflow: 'hidden'
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
              onClick={() => navigate('/coupon')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'none',
                border: 'none',
                color: checkedInStores.length > 1 ? 'white' : '#8B5CF6',
                cursor: 'pointer',
                padding: '8px',
                transition: 'all 0.3s ease'
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
              <Ticket style={{ 
                width: '22px', 
                height: '22px', 
                marginBottom: '4px',
                color: checkedInStores.length > 1 ? 'white' : '#8B5CF6'
              }} />
              <span style={{ 
                fontSize: '10px', 
                fontWeight: '500', 
                fontFamily: "'Inter', sans-serif",
                color: checkedInStores.length > 1 ? 'white' : '#8B5CF6'
              }}>Coupon</span>
            </motion.button>
          </motion.div>
    </div>
  )
}

export default Main
