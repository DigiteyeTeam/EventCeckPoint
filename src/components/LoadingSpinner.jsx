import { motion } from 'framer-motion'

function LoadingSpinner({ size = 40, color = '#FCD34D' }) {
  return (
    <motion.div
      style={{
        width: size,
        height: size,
        border: `3px solid ${color}20`,
        borderTop: `3px solid ${color}`,
        borderRadius: '50%',
        display: 'inline-block'
      }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear'
      }}
    />
  )
}

export default LoadingSpinner
