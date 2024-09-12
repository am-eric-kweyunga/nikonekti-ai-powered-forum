import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'

export default function Loading({ isLoading }: { isLoading: boolean }) {
  const controls = useAnimation()

  useEffect(() => {
    if (!isLoading) {
      controls.start('loaded')
    }
  }, [isLoading, controls])

  const containerVariants = {
    loading: { scale: 1 },
    loaded: { scale: 0, transition: { duration: 0.5, ease: 'easeInOut' } }
  }

  const logoVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.1, rotate: 5, transition: { duration: 0.3 } }
  }

  const eyeVariants = {
    idle: { scaleY: 1 },
    blink: { scaleY: 0.1, transition: { duration: 0.1 } }
  }

  const mouthVariants = {
    idle: { scaleY: 1 },
    smile: { scaleY: 1.5, transition: { duration: 0.3 } }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <motion.div
        variants={containerVariants}
        initial="loading"
        animate={controls}
        className="relative p-4"
      >
        <motion.svg
          width="200"
          height="200"
          viewBox="0 0 270 270"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          variants={logoVariants}
          initial="idle"
          whileHover="hover"
          onHoverStart={() => {
            controls.start('blink')
            controls.start('smile')
          }}
          onHoverEnd={() => {
            controls.start('idle')
          }}
        >
          <motion.circle
            cx="135"
            cy="135"
            r="129"
            fill="#1D58B0"
            animate={{ scale: [1, 1.05, 1], transition: { repeat: Infinity, duration: 2 } }}
          />
          <circle cx="134.5" cy="135.5" r="117.5" fill="white" />
          <motion.rect
            x="56"
            y="94"
            width="42"
            height="56"
            rx="21"
            fill="#1D58B0"
            variants={eyeVariants}
          />
          <motion.rect
            x="172"
            y="94"
            width="42"
            height="56"
            rx="21"
            fill="#1D58B0"
            variants={eyeVariants}
          />
          <motion.rect
            x="98"
            y="176"
            width="74"
            height="36"
            rx="18"
            fill="#1D58B0"
            variants={mouthVariants}
          />
        </motion.svg>
        {isLoading && (
          <motion.div
            className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          >
            <p className="text-lg font-semibold text-[#1D58B0]">...</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}