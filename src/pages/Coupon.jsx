import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Ticket, ExternalLink, Home, QrCode, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { getUserData } from '../utils/storage'
import ImageWithLoading from '../components/ImageWithLoading'

function Coupon() {
  const navigate = useNavigate()
  const [checkedInStores, setCheckedInStores] = useState([])
  const [availableStores, setAvailableStores] = useState([])
  const [showPopup, setShowPopup] = useState(false)
  const [inputCode, setInputCode] = useState('')
  const [isRedeemed, setIsRedeemed] = useState(false)
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const [showErrorToast, setShowErrorToast] = useState(false)

  // Check if user is registered
  useEffect(() => {
    const userData = getUserData()
    if (!userData) {
      navigate('/')
      return
    }
  }, [navigate])

  // Store data with coupon links
  const stores = [
    { 
      id: 1, 
      name: 'Colonel Gold Fang', 
      storeName: 'Dough Bros. Pizza & Doughnuts',
      image: '/images/point-cars/Colonel Gold Fang.png', 
      couponLink: 'https://line.me/R/ti/p/@colonel-gold-fang'
    },
    { 
      id: 2, 
      name: 'Greenie & Elfie', 
      storeName: "Mickey's Diner BKK",
      image: '/images/point-cars/Greenie & Elfie.png', 
      couponLink: 'https://line.me/R/ti/p/@greenie-elfie'
    },
    { 
      id: 3, 
      name: 'Splash', 
      storeName: 'Villa Market - Gaysorn Amarin',
      image: '/images/point-cars/Splash.png', 
      couponLink: 'https://line.me/R/ti/p/@splash'
    },
    { 
      id: 4, 
      name: 'Kongrit', 
      storeName: 'NICO NICO - Gaysorn Amarin',
      image: '/images/point-cars/Kongrit.png', 
      couponLink: 'https://line.me/R/ti/p/@kongrit'
    },
    { 
      id: 5, 
      name: 'Ai-Sam-Ta', 
      storeName: 'Raynue',
      image: '/images/point-cars/Ai-Sam-Ta.png', 
      couponLink: 'https://line.me/R/ti/p/@ai-sam-ta'
    },
    { 
      id: 6, 
      name: 'Qtako', 
      storeName: 'ToroTora',
      image: '/images/point-cars/Qtako.png', 
      couponLink: 'https://line.me/R/ti/p/@qtako'
    },
    { 
      id: 7, 
      name: 'Dylie', 
      storeName: 'Brewave Gaysorn Amarin',
      image: '/images/point-cars/Dylie.png', 
      couponLink: 'https://line.me/R/ti/p/@dylie'
    },
    { 
      id: 8, 
      name: 'Korn Doll', 
      storeName: 'Jiaozi Jiuba',
      image: '/images/point-cars/Korn Doll.png', 
      couponLink: 'https://line.me/R/ti/p/@korn-doll'
    },
    { 
      id: 9, 
      name: 'World Boy', 
      storeName: 'Blue Chéri Gaysorn Amarin',
      image: '/images/point-cars/World Boy.png', 
      couponLink: 'https://line.me/R/ti/p/@world-boy'
    }
  ]

  useEffect(() => {
    // Load checked-in stores from localStorage
    const saved = localStorage.getItem('checkedInStores')
    if (saved) {
      const checkedInIds = JSON.parse(saved)
      setCheckedInStores(checkedInIds)
      
      // Filter stores that are checked in
      const available = stores.filter(store => checkedInIds.includes(store.id))
      setAvailableStores(available)
    }

    // Check if already redeemed
    const redeemed = localStorage.getItem('couponRedeemed')
    if (redeemed === 'true') {
      setIsRedeemed(true)
    }
  }, [])

  const handleRedeemCoupon = (store) => {
    if (store.couponLink) {
      window.open(store.couponLink, '_blank')
    }
  }

  const handleRedeemClick = () => {
    if (availableStores.length > 0 && !isRedeemed) {
      setShowPopup(true)
    }
  }

  const handleCodeSubmit = () => {
    if (inputCode === '123456') {
      // Correct code
      setIsRedeemed(true)
      localStorage.setItem('couponRedeemed', 'true')
      setShowPopup(false)
      setInputCode('')
      
      // Show success toast
      setShowSuccessToast(true)
      
      // Navigate to main page
      setTimeout(() => {
        // Clear the flag so user won't be redirected back
        sessionStorage.removeItem('fromCoupon')
        navigate('/main')
      }, 2000)
    } else {
      // Wrong code
      setShowErrorToast(true)
    }
  }

  const handleClosePopup = () => {
    setShowPopup(false)
    setInputCode('')
  }

  const handleBackToMain = () => {
    // Clear the flag so user can return to main without auto-redirect
    sessionStorage.removeItem('fromCoupon')
    navigate('/main')
  }

  return (
    <div style={{ 
      height: '100vh',
      backgroundColor: '#f8f9fa',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url(/images/bg-start.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: 1
      }} />

      {/* Content Container */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
      }}>
        
        {/* Highlight Section - 50% */}
        <div style={{
          height: '50vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          flexShrink: 0
        }}>
          <ImageWithLoading
            src="/images/hl-coupon.png"
            alt="Coupon Highlight"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center'
            }}
            skeletonStyle={{
              width: '100%',
              height: '100%',
              borderRadius: '0'
            }}
          />
          
          {/* Back Button */}
          <button
            onClick={handleBackToMain}
            style={{
              position: 'absolute',
              top: '15px',
              left: '15px',
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10
            }}
          >
            <ArrowLeft size={18} />
          </button>
        </div>

        {/* Body Section - 50% */}
        <div style={{
          height: '50vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '10px 5px',
          position: 'relative',
          flexShrink: 0
        }}>
          {/* Card Background */}
          <motion.div 
            style={{
              position: 'absolute',
              top: '-30px',
              transform: 'translateX(-50%)',
              width: '80%',
              maxWidth: '260px',
              height: '180px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 5,
              filter: 'drop-shadow(0 8px 25px rgba(0, 0, 0, 0.4)) drop-shadow(0 4px 15px rgba(0, 0, 0, 0.4))',
              '@media (min-width: 768px)': {
                width: '60%',
                maxWidth: '400px',
                height: '250px'
              },
              '@media (min-width: 1024px)': {
                width: '50%',
                maxWidth: '450px',
                height: '280px'
              }
            }}
            initial={{ 
              opacity: 0, 
              y: 50, 
              scale: 0.8,
              rotateY: -15
            }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              rotateY: 0
            }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              delay: 0.3
            }}
            whileHover={{ 
              scale: 1.05,
              rotateY: 5,
              transition: { duration: 0.3 }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.1 }
            }}
          >
            <motion.div
              style={{
                width: '100%',
                height: '100%',
                position: 'relative'
              }}
              animate={{
                rotateZ: [0, 1, -1, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ImageWithLoading
                src="/images/card-coupon.png"
                alt="Coupon Card"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 1
                }}
                skeletonStyle={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '12px'
                }}
              />
            </motion.div>

            {/* Floating Particles */}
            <motion.div
              style={{
                position: 'absolute',
                top: '10%',
                left: '10%',
                width: '6px',
                height: '6px',
                backgroundColor: '#FCD34D',
                borderRadius: '50%',
                zIndex: 2
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              style={{
                position: 'absolute',
                top: '20%',
                right: '15%',
                width: '4px',
                height: '4px',
                backgroundColor: '#F59E0B',
                borderRadius: '50%',
                zIndex: 2
              }}
              animate={{
                y: [10, -10, 10],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
            <motion.div
              style={{
                position: 'absolute',
                bottom: '15%',
                left: '20%',
                width: '5px',
                height: '5px',
                backgroundColor: '#EF4444',
                borderRadius: '50%',
                zIndex: 2
              }}
              animate={{
                y: [-8, 8, -8],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </motion.div>

          {/* REDEEM Button */}
          <button
            onClick={handleRedeemClick}
            disabled={availableStores.length === 0 || isRedeemed}
            style={{
              width: '75%',
              maxWidth: '280px',
              padding: '14px 24px',
              backgroundColor: (availableStores.length > 0 && !isRedeemed) ? 'white' : '#e5e7eb',
              color: (availableStores.length > 0 && !isRedeemed) ? '#1f2937' : '#9ca3af',
              border: 'none',
              borderRadius: '22px',
              fontSize: '17px',
              fontWeight: 'bold',
              cursor: (availableStores.length > 0 && !isRedeemed) ? 'pointer' : 'not-allowed',
              boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
              transition: 'all 0.3s ease',
              textShadow: 'none',
              marginTop: '-10px',
              marginBottom: '15px'
            }}
            onMouseEnter={(e) => {
              if (availableStores.length > 0 && !isRedeemed) {
                e.target.style.backgroundColor = '#f3f4f6'
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.4)'
              }
            }}
            onMouseLeave={(e) => {
              if (availableStores.length > 0 && !isRedeemed) {
                e.target.style.backgroundColor = 'white'
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)'
              }
            }}
          >
            {isRedeemed ? 'Redeemed' : 'Redeem'}
          </button>
        </div>

        {/* Popup Modal */}
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '20px'
            }}
            onClick={handleClosePopup}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              style={{
                backgroundColor: 'white',
                borderRadius: '20px',
                padding: '30px',
                maxWidth: '400px',
                width: '100%',
                textAlign: 'center',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                margin: '0 0 20px 0',
                color: '#1f2937'
              }}>
                ใส่รหัสคูปอง
              </h2>
              
              <p style={{
                fontSize: '16px',
                color: '#6b7280',
                margin: '0 0 25px 0'
              }}>
                กรุณาใส่รหัสที่ได้รับจากพนักงาน
              </p>

              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="ใส่รหัส 6 หลัก"
                maxLength="6"
                style={{
                  width: '100%',
                  padding: '15px',
                  fontSize: '18px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  textAlign: 'center',
                  letterSpacing: '2px',
                  marginBottom: '25px',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb'
                }}
              />

              <div style={{
                display: 'flex',
                gap: '15px',
                justifyContent: 'center'
              }}>
                <button
                  onClick={handleClosePopup}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#e5e7eb',
                    color: '#6b7280',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#d1d5db'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#e5e7eb'
                  }}
                >
                  ยกเลิก
                </button>

                <button
                  onClick={handleCodeSubmit}
                  disabled={inputCode.length !== 6}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: inputCode.length === 6 ? '#3b82f6' : '#e5e7eb',
                    color: inputCode.length === 6 ? 'white' : '#9ca3af',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: inputCode.length === 6 ? 'pointer' : 'not-allowed',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (inputCode.length === 6) {
                      e.target.style.backgroundColor = '#2563eb'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (inputCode.length === 6) {
                      e.target.style.backgroundColor = '#3b82f6'
                    }
                  }}
                >
                  ยืนยัน
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Success Toast */}
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 2000
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              style={{
                backgroundColor: 'white',
                borderRadius: '20px',
                padding: '25px',
                maxWidth: '280px',
                width: '80%',
                textAlign: 'center',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                border: '3px solid #10B981'
              }}
            >
              <div style={{
                width: '50px',
                height: '50px',
                backgroundColor: '#10B981',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 15px auto'
              }}
            >
              <motion.svg
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20,6 9,17 4,12"></polyline>
              </motion.svg>
              </div>
              
              <h2 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                margin: '0 0 8px 0',
                color: '#10B981'
              }}>
                สำเร็จแล้ว!
              </h2>
              
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                margin: '0 0 15px 0'
              }}>
                คุณการใช้ coupon สำเร็จแล้ว
              </p>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.6, duration: 1.5 }}
                style={{
                  height: '4px',
                  backgroundColor: '#10B981',
                  borderRadius: '2px',
                  marginTop: '15px'
                }}
              />
            </motion.div>
          </motion.div>
        )}

        {/* Error Toast */}
        {showErrorToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 3000
            }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              style={{
                backgroundColor: 'white',
                borderRadius: '20px',
                padding: '25px',
                maxWidth: '280px',
                width: '80%',
                textAlign: 'center',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                border: '3px solid #EF4444'
              }}
            >
              <div style={{
                width: '50px',
                height: '50px',
                backgroundColor: '#EF4444',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 15px auto'
              }}
            >
              <motion.svg
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </motion.svg>
              </div>
              
              <h2 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                margin: '0 0 8px 0',
                color: '#EF4444'
              }}>
                รหัสไม่ถูกต้อง
              </h2>
              
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                margin: '0 0 15px 0'
              }}>
                กรุณาติดต่อพนักงาน
              </p>

              <button
                onClick={() => setShowErrorToast(false)}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#EF4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#DC2626'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#EF4444'
                }}
              >
                ตกลง
              </button>
            </motion.div>
          </motion.div>
        )}

      </div>
    </div>
  )
}

export default Coupon