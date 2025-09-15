import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from 'lucide-react'

function Profile() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    nickname: '',
    email: '',
    phone: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleNext = () => {
    // Navigate to tutorial page
    navigate('/tutorial')
  }

  const handleBack = () => {
    navigate('/')
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <div style={{ 
        backgroundColor: 'white'
      }}>
        {/* Profile Icon and Title */}
        <div>
          <img 
            src="/images/hl-1.png" 
            alt="Profile Highlight"
            style={{
              width: '100vw',
              height: 'auto',
              maxHeight: '250px',
              margin: '0',
              padding: '0',
              display: 'block',
              objectFit: 'cover',
              marginLeft: 'calc(-50vw + 50%)'
            }}
          />
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <p style={{ 
              color: '#dc2626', 
              fontSize: '14px', 
              fontWeight: '500',
              margin: '0 0 10px 0'
            }}>Profile</p>
            <h1 style={{ 
              color: '#1f2937', 
              fontSize: '24px', 
              fontWeight: 'bold',
              margin: '0'
            }}>กรอกข้อมูลของคุณ</h1>
          </div>
        </div>
      </div>

      {/* Form Body */}
      <div style={{ 
        padding: '20px',
        maxWidth: '100vw',
        boxSizing: 'border-box'
      }}>
        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          marginBottom: '15px',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name Surname"
            style={{
              flex: 1,
              padding: '15px',
              border: '1px solid #d1d5db',
              borderRadius: '12px',
              fontSize: '16px',
              backgroundColor: 'white',
              boxSizing: 'border-box',
              minWidth: '0'
            }}
          />
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleInputChange}
            placeholder="Nickname"
            style={{
              flex: 1,
              padding: '15px',
              border: '1px solid #d1d5db',
              borderRadius: '12px',
              fontSize: '16px',
              backgroundColor: 'white',
              boxSizing: 'border-box',
              minWidth: '0'
            }}
          />
        </div>
        
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          style={{
            width: '100%',
            padding: '15px',
            border: '1px solid #d1d5db',
            borderRadius: '12px',
            fontSize: '16px',
            backgroundColor: 'white',
            marginBottom: '15px',
            boxSizing: 'border-box'
          }}
        />
        
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Phone Number"
          style={{
            width: '100%',
            padding: '15px',
            border: '1px solid #d1d5db',
            borderRadius: '12px',
            fontSize: '16px',
            backgroundColor: 'white',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* Footer Buttons */}
      <div style={{ 
        position: 'fixed', 
        bottom: '0', 
        left: '0', 
        right: '0',
        padding: '20px',
        backgroundColor: 'white',
        borderTop: '1px solid #e5e7eb'
      }}>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button
            onClick={handleBack}
            style={{
              flex: 1,
              padding: '15px',
              backgroundColor: 'white',
              border: '1px solid #d1d5db',
              borderRadius: '12px',
              fontSize: '16px',
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
              padding: '15px',
              background: 'linear-gradient(135deg, #dc2626, #ef4444)',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
