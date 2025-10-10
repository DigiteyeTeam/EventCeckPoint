import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserData } from '../utils/storage'
import ImageWithLoading from '../components/ImageWithLoading'

function Tutorial() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)

  // Check if user is registered
  useEffect(() => {
    const userData = getUserData()
    if (!userData) {
      navigate('/')
      return
    }
  }, [navigate])

  const steps = [
    {
      title: "สาธิตวิธีการใช้งาน",
      image: "/images/tutorial-1.png", // ภาพหน้า Scan to Check-in
      description: "เข้าสู่หน้าแผ่นที่การเดินทาง\nกดปุ่ม Scan to Check In เพื่อเปิดกล้องสแกน\nQR Code ตามจุดต่างๆในงาน"
    },
    {
      title: "สาธิตวิธีการใช้งาน", 
      image: "/images/tutorial-2.png", // ภาพหน้า Roadmap
      description: "กดปุ่ม Map เพื่อนำทางไปยังร้าน"
    }
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      navigate('/main')
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    } else {
      navigate('/profile')
    }
  }

  const currentStepData = steps[currentStep]
  console.log('Tutorial - Current Step:', currentStep, 'Image:', currentStepData.image) // Debug log

  return (
    <div style={{ 
      height: '100vh',
      backgroundColor: '#f8f9fa',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{ 
        backgroundColor: 'white',
        textAlign: 'center',
        padding: '12px 0',
        flexShrink: 0
      }}>
        <h1 style={{ 
          color: '#dc2626', 
          fontSize: '18px', 
          fontWeight: '700',
          fontFamily: "'Poppins', sans-serif",
          margin: '0',
          letterSpacing: '0.5px'
        }}>
          {currentStepData.title}
        </h1>
      </div>

      {/* Tutorial Image */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        padding: '10px 15px',
        backgroundColor: 'white',
        flex: '1 1 auto',
        minHeight: 0
      }}>
        <img
          src={currentStepData.image} 
          alt={`Tutorial Step ${currentStep + 1}`}
          style={{
            maxWidth: '100%',
            height: 'auto',
            maxHeight: '100%',
            objectFit: 'contain',
            width: '100%'
          }}
          onLoad={() => console.log(`Tutorial image loaded: ${currentStepData.image}`)}
          onError={() => console.log(`Tutorial image failed to load: ${currentStepData.image}`)}
        />
      </div>

      {/* Page Indicators */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '8px',
        padding: '10px 0',
        flexShrink: 0
      }}>
        {steps.map((_, index) => (
          <div
            key={index}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: index === currentStep ? '#dc2626' : '#d1d5db'
            }}
          />
        ))}
      </div>

      {/* Description */}
      <div style={{ 
        padding: '0 15px 10px 15px',
        textAlign: 'center',
        flexShrink: 0
      }}>
        <p style={{ 
          color: '#374151',
          fontSize: '16px',
          lineHeight: '1.5',
          margin: '0',
          whiteSpace: 'pre-line'
        }}>
          {currentStepData.description.split('\n').map((line, index) => (
            <span key={index}>
              {line.split(' ').map((word, wordIndex) => {
                if (word === 'Scan' || word === 'to' || word === 'Check' || word === 'In' || 
                    word === 'QR' || word === 'Code' || word === 'Map' || word === 'Google' || word === 'Map') {
                  return (
                    <span key={wordIndex} style={{ color: '#dc2626', fontWeight: 'bold' }}>
                      {word}{' '}
                    </span>
                  )
                }
                return word + ' '
              })}
              {index < currentStepData.description.split('\n').length - 1 && <br />}
            </span>
          ))}
        </p>
      </div>

      {/* Footer Buttons */}
      <div style={{ 
        padding: '12px 15px',
        backgroundColor: 'white',
        borderTop: '1px solid #e5e7eb',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={handleBack}
            style={{
              flex: 1,
              padding: '12px',
              backgroundColor: 'white',
              border: '1px solid #d1d5db',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: '600',
              color: '#374151',
              cursor: 'pointer'
            }}
          >
            Back
          </button>
          <button
            onClick={handleNext}
            style={{
              flex: 1,
              padding: '12px',
              background: 'linear-gradient(135deg, #dc2626, #ef4444)',
              border: 'none',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: '600',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            {currentStep === steps.length - 1 ? 'Start' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Tutorial
