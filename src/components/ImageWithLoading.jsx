import { useState } from 'react'
import { motion } from 'framer-motion'
import LoadingSpinner from './LoadingSpinner'

function ImageWithLoading({ 
  src, 
  alt, 
  style = {}, 
  className = '',
  fallbackSrc = null,
  showSkeleton = true,
  skeletonStyle = {},
  onLoad = null,
  onError = null,
  ...props 
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(src)

  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
    if (onLoad) onLoad()
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc)
      setIsLoading(true)
    } else if (onError) {
      onError()
    }
  }

  // Skeleton Loading Component
  const SkeletonLoader = () => (
    <motion.div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        borderRadius: style.borderRadius || '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...skeletonStyle
      }}
      animate={{
        backgroundPosition: ['200% 0', '-200% 0']
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'linear'
      }}
    >
      {/* Loading Spinner */}
      <LoadingSpinner size={Math.min(style.width || 40, style.height || 40) * 0.3} color="#FCD34D" />
      
      {/* Shimmer Effect */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
          borderRadius: style.borderRadius || '8px'
        }}
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </motion.div>
  )

  // Error State Component
  const ErrorState = () => (
    <motion.div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#f3f4f6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: style.borderRadius || '8px',
        border: '2px dashed #d1d5db'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div style={{ textAlign: 'center', color: '#6b7280' }}>
        <div style={{ fontSize: '24px', marginBottom: '8px' }}>📷</div>
        <div style={{ fontSize: '12px', fontWeight: '500' }}>ไม่สามารถโหลดรูปภาพได้</div>
      </div>
    </motion.div>
  )

  return (
    <div 
      style={{ 
        position: 'relative', 
        width: style.width || '100%', 
        height: style.height || 'auto',
        overflow: 'hidden',
        ...style 
      }}
      className={className}
    >
      {/* Skeleton Loading */}
      {isLoading && showSkeleton && <SkeletonLoader />}
      
      {/* Error State */}
      {hasError && !isLoading && <ErrorState />}
      
      {/* Actual Image */}
      <motion.img
        src={currentSrc}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: style.objectFit || 'cover',
          opacity: isLoading ? 0 : 1,
          ...style
        }}
        onLoad={handleLoad}
        onError={handleError}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        {...props}
      />
    </div>
  )
}

export default ImageWithLoading
