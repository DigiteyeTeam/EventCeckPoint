import { useNavigate } from 'react-router-dom'
import { Car } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { getUserData } from '../utils/storage'
import LoadingScreen from '../components/LoadingScreen'
import ImageWithLoading from '../components/ImageWithLoading'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'

function Landing() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const spotlightRef = useRef(null)
  const raysRef = useRef(null)
  const particlesRef = useRef([])
  const topStartRef = useRef(null)

  // Check if user is already registered, redirect to main
  useEffect(() => {
    console.log('Landing: Checking user data...')
    const userData = getUserData()
    console.log('Landing: userData =', userData)
    if (userData) {
      console.log('Landing: User registered, redirecting to /main')
      navigate('/main')
      return
    }
    console.log('Landing: User not registered, showing landing page')
  }, [navigate])

  // Simplified GSAP Effects (Lightweight)
  useEffect(() => {
    if (!isLoading) {
      // Simple spotlight pulse (reduced intensity)
      gsap.to(spotlightRef.current, {
        scale: 1.1,
        opacity: 0.6,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      })

      // Slower rotating rays
      gsap.to(raysRef.current, {
        rotation: 360,
        duration: 30,
        ease: "none",
        repeat: -1
      })

      // Reduced particles animation
      particlesRef.current.forEach((particle, index) => {
        gsap.to(particle, {
          y: -15,
          x: Math.random() * 10 - 5,
          opacity: 0.5,
          scale: 1.1,
          duration: 4 + Math.random() * 2,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
          delay: index * 0.2
        })
      })

      // Gentle top start image animation
      gsap.to(topStartRef.current, {
        y: -5,
        rotation: 0.5,
        duration: 4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      })
    }
  }, [isLoading])

  // Handle zoom and resize events
  useEffect(() => {
    const handleResize = () => {
      // Kill all GSAP animations on resize/zoom
      gsap.killTweensOf([spotlightRef.current, raysRef.current, particlesRef.current, topStartRef.current])
      
      // Restart animations after a short delay
      setTimeout(() => {
        if (!isLoading) {
          // Restart simplified animations
          gsap.to(spotlightRef.current, {
            scale: 1.1,
            opacity: 0.6,
            duration: 3,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1
          })

          gsap.to(raysRef.current, {
            rotation: 360,
            duration: 30,
            ease: "none",
            repeat: -1
          })

          particlesRef.current.forEach((particle, index) => {
            gsap.to(particle, {
              y: -15,
              x: Math.random() * 10 - 5,
              opacity: 0.5,
              scale: 1.1,
              duration: 4 + Math.random() * 2,
              ease: "power2.inOut",
              yoyo: true,
              repeat: -1,
              delay: index * 0.2
            })
          })

          gsap.to(topStartRef.current, {
            y: -5,
            rotation: 0.5,
            duration: 4,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1
          })
        }
      }, 100)
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [isLoading])

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }


  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />
  }

  return (
    <div style={{ 
      position: 'relative', 
      minHeight: '100vh',
      animation: 'fadeIn 0.8s ease-out',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* GSAP Spotlight Effect - In front of bg-start.png */}
      <div 
        ref={spotlightRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(255,165,0,0.5) 0%, rgba(255,140,0,0.4) 20%, rgba(255,69,0,0.3) 40%, rgba(255,20,147,0.15) 70%, transparent 100%)',
          borderRadius: '50%',
          zIndex: 2,
          pointerEvents: 'none',
          boxShadow: '0 0 80px rgba(255,165,0,0.4), 0 0 150px rgba(255,140,0,0.3), 0 0 220px rgba(255,69,0,0.2), 0 0 300px rgba(255,20,147,0.1)'
        }} 
      />

      {/* GSAP Rotating Light Rays - In front of bg-start.png */}
      <div 
        ref={raysRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '1500px',
          height: '1500px',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      >
        {[...Array(360)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '3px',
              height: '750px',
              background: 'linear-gradient(to bottom, rgba(255,165,0,0.5) 0%, rgba(255,140,0,0.4) 20%, rgba(255,69,0,0.25) 50%, rgba(255,20,147,0.08) 80%, transparent 100%)',
              transformOrigin: '50% 0%',
              transform: `translate(-50%, -50%) rotate(${i}deg)`,
              opacity: 0.4,
              boxShadow: '0 0 8px rgba(255,165,0,0.3), 0 0 15px rgba(255,140,0,0.15)'
            }}
          />
        ))}
      </div>

      {/* GSAP Floating Particles - In front of bg-start.png */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          ref={el => particlesRef.current[i] = el}
          style={{
            position: 'absolute',
            width: '7px',
            height: '7px',
            background: 'radial-gradient(circle, rgba(255,165,0,0.5) 0%, rgba(255,140,0,0.25) 70%, transparent 100%)',
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            zIndex: 2,
            boxShadow: '0 0 10px rgba(255,165,0,0.4), 0 0 20px rgba(255,140,0,0.2), 0 0 30px rgba(255,69,0,0.1)'
          }}
        />
      ))}

      {/* GSAP Glowing Orbs - In front of bg-start.png */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '130px',
          height: '130px',
          background: 'radial-gradient(circle, rgba(255,165,0,0.35) 0%, rgba(255,140,0,0.18) 50%, transparent 100%)',
          borderRadius: '50%',
          zIndex: 2,
          boxShadow: '0 0 35px rgba(255,165,0,0.3), 0 0 70px rgba(255,140,0,0.2), 0 0 100px rgba(255,69,0,0.15)'
        }}
      />
      
      <div
        style={{
          position: 'absolute',
          bottom: '30%',
          right: '15%',
          width: '110px',
          height: '110px',
          background: 'radial-gradient(circle, rgba(255,69,0,0.35) 0%, rgba(255,69,0,0.18) 50%, transparent 100%)',
          borderRadius: '50%',
          zIndex: 2,
          boxShadow: '0 0 35px rgba(255,69,0,0.3), 0 0 70px rgba(255,20,147,0.2), 0 0 100px rgba(255,165,0,0.15)'
        }}
      />
      {/* Header: Top Start Image */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: 'auto',
        zIndex: 3,
        textAlign: 'center'
      }}>
        <ImageWithLoading
          ref={topStartRef}
          src="/images/top-start.png"
          alt="Header"
          style={{
            width: '90%',
            height: 'auto',
            maxHeight: '24vh',
            objectFit: 'contain',
            display: 'block',
            margin: '0 auto',
            filter: 'drop-shadow(0 0 3px rgba(255, 165, 0, 0.4)) drop-shadow(0 0 6px rgba(255, 200, 100, 0.3)) drop-shadow(0 0 9px rgba(255, 255, 200, 0.2))',
            animation: 'glowPulse 3s ease-in-out infinite alternate'
          }}
        />
      </div>

      {/* Body: Background Image (bg-start.png) */}
      <div style={{
        position: 'absolute',
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
      
      {/* Body Section */}
      <div style={{
        position: 'relative',
        flex: 1,
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: '-29%'
      }}>
        {/* Body Content Image (body-start.png) - Responsive */}
        <ImageWithLoading
          src="/images/body-start.png" 
          alt="Event Background"
          style={{
            width: '90%',
            height: 'auto',
            maxHeight: '70vh',
            objectFit: 'contain',
            display: 'block',
            margin: '0 auto'
          }}
          skeletonStyle={{
            width: '90%',
            height: '50vh',
            borderRadius: '0'
          }}
        />
      </div>
      
      
      {/* Layer 5: Start Button (Front) */}
      <div style={{ 
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        right: '20px',
        zIndex: 5,
        animation: 'slideUp 0.8s ease-out 0.6s both'
      }}>
        <button
          onClick={() => navigate('/profile')}
          style={{
            width: '100%',
            backgroundColor: 'white',
            color: 'black',
            padding: '12px',
            borderRadius: '24px',
            fontWeight: '700',
            fontSize: '20px',
            fontFamily: "'Poppins', sans-serif",
            border: 'none',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            transform: 'scale(1)',
            letterSpacing: '0.5px'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#f3f4f6'
            e.target.style.transform = 'scale(1.05)'
            e.target.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.2)'
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'white'
            e.target.style.transform = 'scale(1)'
            e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)'
          }}
          onMouseDown={(e) => {
            e.target.style.transform = 'scale(0.95)'
          }}
          onMouseUp={(e) => {
            e.target.style.transform = 'scale(1.05)'
          }}
        >
          Start
        </button>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .landing-content {
          animation: slideUp 0.6s ease-out 0.2s both;
        }
      `}</style>
    </div>
  )
}

export default Landing
