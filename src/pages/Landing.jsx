import { useNavigate } from 'react-router-dom'
import { Car } from 'lucide-react'

function Landing() {
  const navigate = useNavigate()

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Layer 1: Background Gradient (Behind everything) */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(to bottom, #3B82F6, #8B5CF6, #EC4899, #F97316)',
        zIndex: 1
      }} />
      
      {/* Layer 2: Background Cars Image */}
      <img 
        src="/images/background.png" 
        alt=""
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 2
        }}
      />
      
      {/* Layer 3: Logo and App Name */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 4,
        textAlign: 'center'
      }}>
        <img 
          src="/images/logo-app.png" 
          alt=""
          style={{
            maxWidth: '300px',
            width: '100%',
            height: 'auto'
          }}
        />
      </div>
      
      {/* Layer 4: Artists Text */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 3,
        textAlign: 'center'
      }}>
        <img 
          src="/images/artists-text.png" 
          alt=""
          style={{
            maxWidth: '250px',
            width: '100%',
            height: 'auto'
          }}
        />
      </div>
      
      {/* Layer 5: Start Button (Front) */}
      <div style={{ 
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        right: '20px',
        zIndex: 5
      }}>
        <button
          onClick={() => navigate('/profile')}
          style={{
            width: '100%',
            backgroundColor: 'white',
            color: 'black',
            padding: '20px',
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
    </div>
  )
}

export default Landing
