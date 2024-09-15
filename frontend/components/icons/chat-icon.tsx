import React from 'react'
import { motion } from 'framer-motion'

interface ChatIconProps {
  size?: number
  color?: string
  backgroundColor?: string
}

export default function ChatIcon({ size = 40, color = "#1D58B0", backgroundColor = "white" }: ChatIconProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      {/* Background circle */}
      <circle cx="50" cy="50" r="50" fill={color} />
      
      {/* Inner circle (face) */}
      <circle cx="50" cy="50" r="43" fill={backgroundColor} />
      
      {/* Eyes */}
      <circle cx="35" cy="40" r="6" fill={color} />
      <circle cx="65" cy="40" r="6" fill={color} />
      
      {/* Smile */}
      <path
        d="M35 60C35 60 50 70 65 60"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
      
      {/* Chat bubble */}
      <path
        d="M85 50C85 69.33 69.33 85 50 85C30.67 85 15 69.33 15 50C15 30.67 30.67 15 50 15C69.33 15 85 30.67 85 50Z"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Chat bubble tail */}
      <path
        d="M85 65L95 75"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  )
}