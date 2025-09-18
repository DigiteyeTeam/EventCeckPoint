import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from 'lucide-react'
import { saveUserData, saveDeviceId, generateDeviceId } from '../utils/storage'
import ImageWithLoading from '../components/ImageWithLoading'

function Profile() {
  const navigate = useNavigate()
  const [deviceName, setDeviceName] = useState('')
  const [deviceId, setDeviceId] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)
  const [agreeToPrivacy, setAgreeToPrivacy] = useState(false)

  useEffect(() => {
    // Generate device name and ID based on browser info
    const userAgent = navigator.userAgent
    let deviceType = 'Mobile'
    
    if (userAgent.includes('iPad') || userAgent.includes('Tablet')) {
      deviceType = 'Tablet'
    } else if (userAgent.includes('Windows') || userAgent.includes('Mac')) {
      deviceType = 'Desktop'
    }
    
    const deviceName = `${deviceType} Device`
    const deviceId = generateDeviceId()
    
    setDeviceName(deviceName)
    setDeviceId(deviceId)
  }, [])

  const handleNext = () => {
    if (!agreeToPrivacy) {
      alert('กรุณายอมรับนโยบายความเป็นส่วนตัวก่อนดำเนินการต่อ')
      return
    }
    setShowConfirm(true)
  }

  const handleConfirm = () => {
    // Save device data
    const userData = {
      deviceName,
      deviceId,
      userAgent: navigator.userAgent,
      registeredAt: new Date().toISOString()
    }
    
    if (saveUserData(userData) && saveDeviceId(deviceId)) {
      setShowConfirm(false)
      navigate('/tutorial')
    } else {
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล')
    }
  }

  const handleBack = () => {
    navigate('/')
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8f9fa',
      overflowY: 'auto',
      paddingBottom: '20px'
    }}>
      {/* Header */}
      <div style={{ 
        backgroundColor: 'white'
      }}>
        {/* Profile Icon and Title */}
        <div>
          <ImageWithLoading
            src="/images/hl-1.png"
            alt="Profile Highlight"
            style={{
              width: '100vw',
              height: 'auto',
              maxHeight: '220px',
              padding: '0',
              display: 'block',
              objectFit: 'cover',
              objectPosition: 'top center',
            }}
            skeletonStyle={{
              width: '100vw',
              height: '220px',
              borderRadius: '0'
            }}
          />
          <div style={{ padding: '15px', textAlign: 'center' }}>
            <p style={{
              color: '#dc2626',
              fontSize: '12px',
              fontWeight: '500',
              margin: '0 0 8px 0'
            }}>Profile</p>
            <h1 style={{
              color: '#1f2937',
              fontSize: '18px',
              fontWeight: '700',
              fontFamily: "'Poppins', sans-serif",
              margin: '0',
              letterSpacing: '0.5px'
            }}>ข้อมูลของคุณ</h1>
          </div>
        </div>
      </div>

      {/* Device Info Body */}
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
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            backgroundColor: '#dc2626',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px auto'
          }}>
            <User style={{ color: 'white', width: '30px', height: '30px' }} />
          </div>

          <h2 style={{
            color: '#1f2937',
            fontSize: '16px',
            fontWeight: 'bold',
            margin: '0 0 8px 0'
          }}>
            {deviceName}
          </h2>

          <p style={{
            color: '#6b7280',
            fontSize: '12px',
            lineHeight: '1.4',
            margin: '0 0 12px 0'
          }}>
            ข้อมูลเครื่องจะถูกบันทึกเพื่อใช้เล่นต่อ
          </p>

          <div style={{
            backgroundColor: '#f3f4f6',
            borderRadius: '6px',
            padding: '8px',
            fontSize: '10px',
            color: '#6b7280',
            fontFamily: 'monospace'
          }}>
            Device ID: {deviceId}
          </div>
        </div>
        
        {/* Privacy Policy Consent */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '12px',
          marginTop: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <input
              type="checkbox"
              id="privacy-consent"
              checked={agreeToPrivacy}
              onChange={(e) => setAgreeToPrivacy(e.target.checked)}
              style={{
                width: '16px',
                height: '16px',
                marginTop: '2px',
                cursor: 'pointer'
              }}
            />
            <label
              htmlFor="privacy-consent"
              style={{
                fontSize: '11px',
                lineHeight: '1.4',
                color: '#374151',
                cursor: 'pointer',
                flex: 1
              }}
            >
              ฉันยอมรับ{' '}
              <a
                href="https://artventurenft.com/privacy-policy-n"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#dc2626',
                  textDecoration: 'underline',
                  fontWeight: '500'
                }}
              >
                นโยบายความเป็นส่วนตัว
              </a>
              {' '}และยินยอมให้บันทึกข้อมูลเครื่อง
            </label>
          </div>
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
            onClick={handleBack}
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
              letterSpacing: '0.3px'
            }}
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={!agreeToPrivacy}
            style={{
              flex: 1,
              padding: '12px',
              background: agreeToPrivacy
                ? 'linear-gradient(135deg, #dc2626, #ef4444)'
                : '#d1d5db',
              border: 'none',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '600',
              fontFamily: "'Inter', sans-serif",
              color: 'white',
              cursor: agreeToPrivacy ? 'pointer' : 'not-allowed',
              opacity: agreeToPrivacy ? 1 : 0.6,
              letterSpacing: '0.3px'
            }}
          >
            Next
          </button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '24px',
            margin: '20px',
            maxWidth: '400px',
            width: '100%'
          }}>
            <h3 style={{
              color: '#1f2937',
              fontSize: '18px',
              fontWeight: 'bold',
              margin: '0 0 16px 0',
              textAlign: 'center'
            }}>
              ยืนยันการบันทึกเครื่อง
            </h3>
            <p style={{
              color: '#6b7280',
              fontSize: '14px',
              lineHeight: '1.5',
              margin: '0 0 24px 0',
              textAlign: 'center'
            }}>
              เครื่อง <strong>{deviceName}</strong> จะถูกบันทึก<br/>
              เพื่อใช้เล่นต่อในครั้งต่อไป
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowConfirm(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: 'white',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  cursor: 'pointer'
                }}
              >
                ยกเลิก
              </button>
              <button
                onClick={handleConfirm}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: '#dc2626',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
