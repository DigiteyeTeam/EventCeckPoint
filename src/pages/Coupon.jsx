import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Ticket, ExternalLink } from 'lucide-react'

function Coupon() {
  const navigate = useNavigate()
  const [checkedInStores, setCheckedInStores] = useState([])
  const [availableStores, setAvailableStores] = useState([])

  // Store data with coupon links
  const stores = [
    { 
      id: 1, 
      name: 'Colonel Gold Fang', 
      storeName: 'Dough Bros. (G Floor)',
      image: '/images/point-cars/Colonel Gold Fang.png', 
      couponLink: 'https://line.me/R/ti/p/@colonel-gold-fang' // ใส่ลิงก์ LINE ของคุณเอง
    },
    { 
      id: 2, 
      name: 'Greenie & Elfie', 
      storeName: 'Mickey Dinner (G Floor)',
      image: '/images/point-cars/Greenie & Elfie.png', 
      couponLink: 'https://line.me/R/ti/p/@greenie-elfie' // ใส่ลิงก์ LINE ของคุณเอง
    },
    { 
      id: 3, 
      name: 'Splash', 
      storeName: 'Villa Market (G Floor)',
      image: '/images/point-cars/Splash.png', 
      couponLink: 'https://line.me/R/ti/p/@splash' // ใส่ลิงก์ LINE ของคุณเอง
    },
    { 
      id: 4, 
      name: 'Kongrit', 
      storeName: 'Nico Nico (2nd Floor)',
      image: '/images/point-cars/Kongrit.png', 
      couponLink: 'https://line.me/R/ti/p/@kongrit' // ใส่ลิงก์ LINE ของคุณเอง
    },
    { 
      id: 5, 
      name: 'Ai-Sam-Ta', 
      storeName: 'Raynue (3rd Floor)',
      image: '/images/point-cars/Ai-Sam-Ta.png', 
      couponLink: 'https://line.me/R/ti/p/@ai-sam-ta' // ใส่ลิงก์ LINE ของคุณเอง
    },
    { 
      id: 6, 
      name: 'Qtako', 
      storeName: 'ToroTora (3rd Floor)',
      image: '/images/point-cars/Qtako.png', 
      couponLink: 'https://line.me/R/ti/p/@qtako' // ใส่ลิงก์ LINE ของคุณเอง
    },
    { 
      id: 7, 
      name: 'Dylie', 
      storeName: 'Brewave (4th Floor)',
      image: '/images/point-cars/Dylie.png', 
      couponLink: 'https://line.me/R/ti/p/@dylie' // ใส่ลิงก์ LINE ของคุณเอง
    },
    { 
      id: 8, 
      name: 'Korn Doll', 
      storeName: 'Blue Cheri (4th Floor)',
      image: '/images/point-cars/Korn Doll.png', 
      couponLink: 'https://line.me/R/ti/p/@korn-doll' // ใส่ลิงก์ LINE ของคุณเอง
    },
    { 
      id: 9, 
      name: 'World Boy', 
      storeName: 'Jiaozi (4th Floor)',
      image: '/images/point-cars/World Boy.png', 
      couponLink: 'https://line.me/R/ti/p/@world-boy' // ใส่ลิงก์ LINE ของคุณเอง
    }
  ]

  useEffect(() => {
    // Load checked-in stores from localStorage
    const saved = localStorage.getItem('checkedInStores')
    if (saved) {
      const checkedInIds = JSON.parse(saved)
      setCheckedInStores(checkedInIds)
      
      // Get stores for checked-in stores
      const availableStores = stores.filter(store => checkedInIds.includes(store.id))
      setAvailableStores(availableStores)
    }
  }, [])

  const handleGetCoupon = (store) => {
    // Open LINE coupon link
    window.open(store.couponLink, '_blank')
  }

  const handleBack = () => {
    navigate('/main')
  }

  if (checkedInStores.length === 0) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        {/* Header */}
        <div style={{
          backgroundColor: 'white',
          position: 'relative'
        }}>
          <img
            src="/images/hl-1.png"
            alt="Coupon Highlight"
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
          }}>Coupon</p>
          <h1 style={{
            color: '#1f2937',
            fontSize: '24px',
            fontWeight: '700',
            fontFamily: "'Poppins', sans-serif",
            margin: '0 0 8px 0',
            letterSpacing: '0.5px'
          }}>คูปองของคุณ</h1>
          
          {/* Check-in Status */}
          <div style={{
            display: 'inline-block',
            padding: '6px 12px',
            backgroundColor: '#dc2626',
            borderRadius: '16px',
            fontSize: '12px',
            fontWeight: '600',
            color: 'white',
            margin: '0'
          }}>
            เช็คอินแล้ว {checkedInStores.length}/9 ร้าน
          </div>
        </div>
        </div>

        {/* Empty State */}
        <div style={{
          padding: '40px 20px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '120px',
            height: '120px',
            backgroundColor: '#f3f4f6',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto'
          }}>
            <Ticket style={{ color: '#9ca3af', width: '60px', height: '60px' }} />
          </div>
          
          <h2 style={{
            color: '#1f2937',
            fontSize: '20px',
            fontWeight: 'bold',
            margin: '0 0 10px 0'
          }}>
            ยังไม่มีคูปอง
          </h2>
          
          <p style={{
            color: '#6b7280',
            fontSize: '14px',
            lineHeight: '1.5',
            margin: '0 0 30px 0'
          }}>
            เช็คอินที่ร้านค้าต่างๆ เพื่อรับคูปองพิเศษ
          </p>

          <button
            onClick={handleBack}
            style={{
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '15px 30px',
              fontSize: '16px',
              fontWeight: '600',
              fontFamily: "'Inter', sans-serif",
              cursor: 'pointer',
              letterSpacing: '0.3px'
            }}
          >
            กลับไปหน้าแรก
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        position: 'relative'
      }}>
        <img
          src="/images/hl-1.png"
          alt="Coupon Highlight"
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
          }}>Coupon</p>
          <h1 style={{
            color: '#1f2937',
            fontSize: '24px',
            fontWeight: '700',
            fontFamily: "'Poppins', sans-serif",
            margin: '0 0 8px 0',
            letterSpacing: '0.5px'
          }}>คูปองของคุณ</h1>
          
          {/* Check-in Status */}
          <div style={{
            display: 'inline-block',
            padding: '6px 12px',
            backgroundColor: '#dc2626',
            borderRadius: '16px',
            fontSize: '12px',
            fontWeight: '600',
            color: 'white',
            margin: '0'
          }}>
            เช็คอินแล้ว {checkedInStores.length}/9 ร้าน
          </div>
        </div>
      </div>

      {/* Store List */}
      <div style={{
        padding: '20px',
        maxWidth: '100vw',
        boxSizing: 'border-box'
      }}>
        {availableStores.map((store, index) => (
          <button
            key={store.id}
            onClick={() => handleGetCoupon(store)}
            style={{
              width: '100%',
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '20px',
              marginBottom: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              border: '2px solid #f3f4f6',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f8f9fa'
              e.target.style.borderColor = '#dc2626'
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.15)'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'white'
              e.target.style.borderColor = '#f3f4f6'
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            {/* Store Info */}
            <div style={{
              display: 'flex',
              alignItems: 'center'
            }}>
              <img
                src={store.image}
                alt={store.name}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginRight: '12px'
                }}
              />
              <div>
                        <h3 style={{
                          color: '#1f2937',
                          fontSize: '16px',
                          fontWeight: 'bold',
                          margin: '0 0 4px 0',
                          textAlign: 'left'
                        }}>
                          {store.storeName}
                        </h3>
                <p style={{
                  color: '#6b7280',
                  fontSize: '12px',
                  margin: '0',
                  textAlign: 'left'
                }}>
                  เช็คอินแล้ว
                </p>
              </div>
            </div>

            {/* Arrow Icon */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              color: '#dc2626'
            }}>
              <ExternalLink style={{ width: '20px', height: '20px' }} />
            </div>
          </button>
        ))}
      </div>

      {/* Back Button */}
      <div style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        zIndex: 100
      }}>
        <button
          onClick={handleBack}
          style={{
            width: '40px',
            height: '40px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            border: 'none',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
            e.target.style.transform = 'scale(1.1)'
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
            e.target.style.transform = 'scale(1)'
          }}
        >
          <ArrowLeft style={{ color: 'white', width: '20px', height: '20px' }} />
        </button>
      </div>
    </div>
  )
}

export default Coupon
