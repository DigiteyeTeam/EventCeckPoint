import { useNavigate } from 'react-router-dom'
import { Car } from 'lucide-react'

function Landing() {
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <img 
        src="/images/background.png" 
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Fallback gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 opacity-30" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          {/* Empty space for background image to show */}
        </div>

        {/* Bottom Section - Start Button */}
        <div style={{ padding: '16px', margin: '10px', marginTop: '50px' }}>
          {/* Start Button */}
          <button
            onClick={() => navigate('/profile')}
            style={{
              width: '100%',
              backgroundColor: 'white',
              color: 'black',
              padding: '20px',
              borderRadius: '24px',
              fontWeight: 'bold',
              fontSize: '20px',
              border: 'none',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: 'scale(1)'
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
    </div>
  )
}

export default Landing
