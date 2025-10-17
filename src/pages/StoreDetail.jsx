import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { X, MapPin, Clock, Phone } from 'lucide-react'
import { getUserData } from '../utils/storage'
import ImageWithLoading from '../components/ImageWithLoading'

function StoreDetail() {
  const navigate = useNavigate()
  const { storeId } = useParams()

  // Check if user is registered
  useEffect(() => {
    const userData = getUserData()
    if (!userData) {
      navigate('/go-to-start')
      return
    }
  }, [navigate])

  // Store data with detailed information
  const stores = [
    {
      id: 1,
      name: 'Colonel Gold Fang',
      storeName: 'Start Gaysorn Amarin',
      image: '/images/point-cars/Colonel Gold Fang.png',
      storeImage: '/images/restaurant/start.png',
      logo: '/images/restaurant-logo/lstart.png',
      location: {
        floor: 'G Floor',
        address: '502 ถนน เพลินจิต แขวงลุมพินี',
        district: 'เขตปทุมวัน กรุงเทพมหานคร',
        postalCode: '10330'
      },
      hours: '10:00–21:00',
      phone: '026504703',
      mapLink: 'https://maps.app.goo.gl/TH8DSRpoDUbcBpQr7'
    },
    {
      id: 2,
      name: 'Greenie & Elfie',
      storeName: "Dough Bros. Pizza & Doughnuts",
      image: '/images/point-cars/Greenie & Elfie.png',
      storeImage: '/images/restaurant/r1.png',
      logo: '/images/restaurant-logo/l1.png',
      location: {
        floor: 'G Floor',
        address: 'เกษรอัมรินทร์ ถนน เพลินจิต แขวงลุมพินี  10330',
        district: 'เขตปทุมวัน กรุงเทพมหานคร',
        postalCode: '10330'
      },
      hours: '10:00–0:00',
      phone: '0909232871',
      mapLink: 'https://maps.app.goo.gl/CrAcngF7JzYNifYQ8'
    },
    {
      id: 3,
      name: 'Splash',
      storeName: 'NICO NICO',
      image: '/images/point-cars/Splash.png',
      storeImage: '/images/restaurant/r2.jpg',
      logo: '/images/restaurant-logo/l2.png',
      location: {
        floor: '2 Floor',
        address: '496 502 ถนน เพลินจิต แขวงลุมพินี',
        district: 'เขตปทุมวัน กรุงเทพมหานคร',
        postalCode: '10330'
      },
      hours: '7:30–0:00',
      phone: '0658468633',
      mapLink: 'https://maps.app.goo.gl/3RhMJPaBrvEJjizX6'
    },
    {
      id: 4,
      name: 'Kongrit',
      storeName: 'Raynue',
      image: '/images/point-cars/Kongrit.png',
      storeImage: '/images/restaurant/r3.png',
      logo: '/images/restaurant-logo/l3.png',
      location: {
        floor: '3 Floor',
        address: '502 ถนน เพลินจิต แขวงลุมพินี',
        district: 'เขตปทุมวัน กรุงเทพมหานคร',
        postalCode: '10330'
      },
      hours: '8:00–0:00',
      phone: '0929766995',
      mapLink: 'https://maps.app.goo.gl/o3jAUDi9qbQdKzLn7'
    },
    {
      id: 5,
      name: 'Ai-Sam-Ta',
      storeName: 'Jiaozi Jiuba',
      image: '/images/point-cars/Ai-Sam-Ta.png',
      storeImage: '/images/restaurant/r4.png',
      logo: '/images/restaurant-logo/l4.png',
      location: {
        floor: '4 Floor',
        address: '496 502 ถนน เพลินจิต แขวงลุมพินี',
        district: 'เขตปทุมวัน กรุงเทพมหานคร',
        postalCode: '10330'
      },
      hours: '11:00–21:00',
      phone: '0808357504',
      mapLink: 'https://maps.app.goo.gl/AVmFwZvWNNaDTBHo9'
    },
    {
      id: 6,
      name: 'Qtako',
      storeName: 'Blue Chéri',
      image: '/images/point-cars/Qtako.png',
      storeImage: '/images/restaurant/r5.png',
      logo: '/images/restaurant-logo/l5.png',
      location: {
        floor: '4 Floor',
        address: '502 10330 ถนน เพลินจิต แขวงลุมพินี',
        district: 'เขตปทุมวัน กรุงเทพมหานคร',
        postalCode: '10330'
      },
      hours: '7:00–19:00',
      phone: '0613917649',
      mapLink: 'https://maps.app.goo.gl/yMPdmqLC319fQWgu5'
    },
    {
      id: 7,
      name: 'Dylie',
      storeName: 'The Urban GFloor',
      image: '/images/point-cars/Dylie.png',
      storeImage: '/images/restaurant/start.png',
      logo: '/images/restaurant-logo/lstart.png',
      location: {
        floor: 'G Floor',
        address: '502 ถนน เพลินจิต แขวงลุมพินี',
        district: 'เขตปทุมวัน กรุงเทพมหานคร',
        postalCode: '10330'
      },
      hours: '10:00–21:00',
      phone: '026504703',
      mapLink: 'https://maps.app.goo.gl/TH8DSRpoDUbcBpQr7'
    },
    {
      id: 8,
      name: 'Korn Doll',
      storeName: 'The Urban 2Floor',
      image: '/images/point-cars/Korn Doll.png',
      storeImage: '/images/restaurant/start.png',
      logo: '/images/restaurant-logo/lstart.png',
      location: {
        floor: '2 Floor',
        address: '502 ถนน เพลินจิต แขวงลุมพินี',
        district: 'เขตปทุมวัน กรุงเทพมหานคร',
        postalCode: '10330'
      },
      hours: '10:00–21:00',
      phone: '026504703',
      mapLink: 'https://maps.app.goo.gl/TH8DSRpoDUbcBpQr7'
    },
    {
      id: 9,
      name: 'World Boy',
      storeName: 'The Urban',
      image: '/images/point-cars/World Boy.png',
      storeImage: '/images/restaurant/start.png',
      logo: '/images/restaurant-logo/lstart.png',
      location: {
        floor: '3 Floor',
        address: '502 ถนน เพลินจิต แขวงลุมพินี',
        district: 'เขตปทุมวัน กรุงเทพมหานคร',
        postalCode: '10330'
      },
      hours: '10:00–21:00',
      phone: '026504703',
      mapLink: 'https://maps.app.goo.gl/TH8DSRpoDUbcBpQr7'
    }
  ]

  const store = stores.find(s => s.id === parseInt(storeId))

  if (!store) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#f8f9fa'
      }}>
        <p>ไม่พบข้อมูลร้าน</p>
      </div>
    )
  }

  const handleMapClick = () => {
    window.open(store.mapLink, '_blank')
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(to bottom, #1a0d2e, #6b1a4f, #8b0e1f)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        overflow: 'hidden',
        maxWidth: '400px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
      }}>
        {/* Close Button */}
        <button
          onClick={() => navigate('/main')}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            backgroundColor: '#8B5CF6',
            border: 'none',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          <X size={16} />
        </button>

        {/* Store Image */}
        <div style={{
          width: '100%',
          height: '200px',
          backgroundColor: '#f3f4f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          <ImageWithLoading
            src={store.storeImage}
            alt={store.storeName}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            skeletonStyle={{
              borderRadius: '0'
            }}
            fallbackSrc={store.image}
          />
          {/* Placeholder when image fails to load */}
          <div style={{
            display: 'none',
            width: '100%',
            height: '100%',
            backgroundColor: '#e5e7eb',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            color: '#6b7280'
          }}>
            <ImageWithLoading
              src={store.image}
              alt={store.name}
              style={{
                width: '80px',
                height: '80px',
                objectFit: 'cover',
                borderRadius: '50%',
                marginBottom: '10px'
              }}
              skeletonStyle={{
                width: '80px',
                height: '80px',
                borderRadius: '50%'
              }}
            />
            <p style={{ fontSize: '14px', margin: 0 }}>ภาพร้าน</p>
          </div>
        </div>

        {/* Store Info */}
        <div style={{ padding: '16px' }}>
          {/* Store Logo and Name */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '8px'
          }}>
            <ImageWithLoading
              src={store.logo}
              alt={`${store.storeName} Logo`}
              style={{
                width: '50px',
                height: '50px',
                objectFit: 'contain',
                borderRadius: '8px',
                backgroundColor: '#f9fafb',
                padding: '8px'
              }}
              skeletonStyle={{
                width: '50px',
                height: '50px',
                borderRadius: '8px'
              }}
              showSkeleton={false}
            />
            <h1 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#1f2937',
              margin: '0',
              lineHeight: '1.3',
              flex: 1
            }}>
              {store.storeName}
            </h1>
          </div>

          {/* Location */}
          <div style={{ 
            marginBottom: '12px',
            paddingTop: '0',
            borderTop: 'none',
            WebkitTapHighlightColor: 'transparent'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px',
              WebkitTapHighlightColor: 'transparent'
            }}>
              <MapPin size={16} style={{ color: '#dc2626', marginTop: '2px', flexShrink: 0 }} />
              <div style={{
                WebkitTapHighlightColor: 'transparent',
                userSelect: 'none'
              }}>
                <p style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  margin: '0 0 4px 0',
                  textDecoration: 'none'
                }}>
                  ตั้งอยู่ใน
                </p>
                <p style={{
                  fontSize: '13px',
                  color: '#6b7280',
                  margin: '0 0 2px 0',
                  lineHeight: '1.4'
                }}>
                  {store.location.floor}
                </p>
                <p style={{
                  fontSize: '13px',
                  color: '#6b7280',
                  margin: '0 0 2px 0',
                  lineHeight: '1.4'
                }}>
                  {store.location.address}
                </p>
                <p style={{
                  fontSize: '13px',
                  color: '#6b7280',
                  margin: '0 0 2px 0',
                  lineHeight: '1.4'
                }}>
                  {store.location.district}
                </p>
                <p style={{
                  fontSize: '13px',
                  color: '#6b7280',
                  margin: '0',
                  lineHeight: '1.4'
                }}>
                  {store.location.postalCode}
                </p>
              </div>
            </div>
          </div>

          {/* Operating Hours & Phone */}
          <div style={{ marginBottom: '12px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              {/* Operating Hours */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                flex: 1
              }}>
                <Clock size={14} style={{ color: '#dc2626', flexShrink: 0 }} />
                <div>
                  <p style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#374151',
                    margin: '0 0 2px 0'
                  }}>
                    เวลาทำการ
                  </p>
                  <p style={{
                    fontSize: '11px',
                    color: '#6b7280',
                    margin: '0'
                  }}>
                    {store.hours}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                flex: 1
              }}>
                <Phone size={14} style={{ color: '#dc2626', flexShrink: 0 }} />
                <div>
                  <p style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#374151',
                    margin: '0 0 2px 0'
                  }}>
                    โทรศัพท์
                  </p>
                  <p style={{
                    fontSize: '11px',
                    color: '#6b7280',
                    margin: '0'
                  }}>
                    {store.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* QR Code Instructions */}
          <div style={{ 
            marginBottom: '16px',
            padding: '12px',
            backgroundColor: '#fef3c7',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{
              width: '16px',
              height: '16px',
              backgroundColor: '#f59e0b',
              borderRadius: '3px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '10px',
              fontWeight: 'bold',
              flexShrink: 0
            }}>
              !
            </div>
            <p style={{
              fontSize: '12px',
              color: '#92400e',
              margin: '0',
              lineHeight: '1.4'
            }}>
              ตามหา QR Code หน้าร้าน แล้วสแกนเพื่อเช็คอิน
            </p>
          </div>

          {/* Map Button */}
          <button
            onClick={handleMapClick}
            style={{
              width: '100%',
              padding: '16px',
              background: 'linear-gradient(135deg, #ec4899, #dc2626)',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 6px 16px rgba(220, 38, 38, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.3)'
            }}
          >
            Map
          </button>
        </div>
      </div>
    </div>
  )
}

export default StoreDetail
