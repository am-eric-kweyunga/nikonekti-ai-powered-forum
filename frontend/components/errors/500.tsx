'use client'
import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import Link from 'next/link'
import { RefreshCcw, Server, Home } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Error500() {
    const [hoveredButton, setHoveredButton] = useState<string | null>(null)
    const controls = useAnimation()

    const router = useRouter();

    const handleBack = () => {
        router.back();
    };
    useEffect(() => {
        controls.start('visible')
    }, [controls])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
    }

    const logoVariants = {
        idle: { rotate: 0 },
        shake: { rotate: [0, -5, 5, -5, 5, 0], transition: { duration: 0.5 } }
    }

    const eyeVariants = {
        idle: { scaleY: 1 },
        blink: { scaleY: 0.1, transition: { duration: 0.1 } }
    }

    const mouthVariants = {
        idle: { d: "M98 194C98 194 135 220 172 194" },
        worried: { d: "M98 204C98 204 135 188 172 204", transition: { duration: 0.3 } }
    }

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="text-center"
            >
                <motion.div variants={itemVariants} className="mb-8 flex justify-center items-center">
                    <motion.svg
                        width="270"
                        height="270"
                        viewBox="0 0 270 270"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        variants={logoVariants}
                        initial="idle"
                        whileHover="shake"
                        onHoverStart={() => {
                            controls.start('blink')
                            controls.start('worried')
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
                            animate={{ scale: [1, 1.05, 1], transition: { repeat: Infinity, duration: 3 } }}
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
                        <motion.path
                            d="M98 194C98 194 135 220 172 194"
                            stroke="#1D58B0"
                            strokeWidth="18"
                            strokeLinecap="round"
                            fill="none"
                            variants={mouthVariants}
                        />
                    </motion.svg>
                </motion.div>

                <motion.h1 variants={itemVariants} className="text-4xl font-bold text-[#1D58B0] mb-4">
                    500 - Server Error
                </motion.h1>

                <motion.p variants={itemVariants} className="text-xl text-gray-600 mb-8">
                    Oops! Our server is feeling a bit under the weather.
                </motion.p>

                <motion.div variants={itemVariants} className="flex justify-center space-x-4 mb-8">
                    <motion.div
                        className="flex items-center space-x-2 text-[#1D58B0]"
                        whileHover={{ scale: 1.1 }}
                    >
                        <Server size={24} />
                        <span className="text-lg">Server Hiccup</span>
                    </motion.div>
                    <motion.div
                        className="flex items-center space-x-2 text-[#1D58B0]"
                        whileHover={{ scale: 1.1 }}
                    >
                        <RefreshCcw size={24} />
                        <span className="text-lg">Try Again Soon</span>
                    </motion.div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-5 justify-center items-center">
                    <motion.a
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#1D58B0] hover:bg-[#1D58B0]/90 transition duration-300 ease-in-out transform hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                        onMouseEnter={() => setHoveredButton('home')}
                        onMouseLeave={() => setHoveredButton(null)}
                        href="#"
                        onClick={handleBack}
                    >
                        <Home className="mr-2" size={20} />
                        Go Back
                        {hoveredButton === 'home' && (
                            <motion.span
                                className="ml-2"
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.2 }}
                            >
                                →
                            </motion.span>
                        )}
                    </motion.a>
                    <motion.button
                        className="inline-flex items-center justify-center px-6 py-3 border border-[#1D58B0] text-base font-medium rounded-md text-[#1D58B0] bg-white hover:bg-gray-50 transition duration-300 ease-in-out transform hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                        onClick={() => window.location.reload()}
                        onMouseEnter={() => setHoveredButton('refresh')}
                        onMouseLeave={() => setHoveredButton(null)}
                    >
                        <RefreshCcw className="mr-2" size={20} />
                        Refresh Page
                        {hoveredButton === 'refresh' && (
                            <motion.span
                                className="ml-2"
                                initial={{ rotate: 0 }}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                            >
                                ↻
                            </motion.span>
                        )}
                    </motion.button>
                </motion.div>
            </motion.div>
        </div>
    )
}