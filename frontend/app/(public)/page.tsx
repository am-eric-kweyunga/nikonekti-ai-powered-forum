"use client"
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, GraduationCap, LogIn } from 'lucide-react'
import Image from 'next/image'

import { useUser } from '@auth0/nextjs-auth0/client'
import { useRouter } from 'next/navigation'
import Loading from '@/components/custom/loading'

export default function LogoutConfirmation() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)
  const { user, isLoading, error } = useUser()
  const router = useRouter()

  if (user) {
    return router.push(`/student`)
  } else if (isLoading) {
    return <Loading isLoading={isLoading} />
  } else if (error) {
    return <div>Error: {error.message}</div>
  }
  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg flex-col gap-2 p-8 max-w-md w-full border"
      >
        <Image
          src={'https://utfs.io/f/e7488cb4-5a22-4694-b726-edf1cd0c4ed4-g3v3k0.png'}
          width={80}
          height={80}
          alt='Nikonekti'
          className="mx-auto m-4"
        />
        <h1 className="text-base font-bold text-center mb-1">You&apos;ve been logged out from the Forum</h1>
        <p className="text-gray-600 text-sm text-center mb-4">Where would you like to go next?</p>

        <div className="flex flex-col gap-5">
          <motion.a
            className="flex items-center text-sm justify-center w-full py-3 px-4 bg-blue-700 text-white rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
            whileHover={{ scale: 1.005 }}
            onMouseEnter={() => setHoveredButton('home')}
            onMouseLeave={() => setHoveredButton(null)}
            href="https://nikonekti.vercel.app"
          >
            <GraduationCap className="mr-2 text-xs" size={20} />
            Exprole careers with Nikonekti
            {hoveredButton === 'home' && (
              <motion.div
                className="absolute right-4"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowLeft className="text-white" size={20} />
              </motion.div>
            )}
          </motion.a>

          <motion.a
            className="flex items-center text-sm justify-center w-full py-3 px-4 bg-white text-blue-700 border-2 border-blue-700 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
            whileHover={{ scale: 1.005 }}
            onMouseEnter={() => setHoveredButton('login')}
            onMouseLeave={() => setHoveredButton(null)}
            href='/api/auth/login'
          >
            <LogIn className="mr-2" size={20} />
            Continue to Forum
            {hoveredButton === 'login' && (
              <motion.div
                className="absolute right-4"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowLeft className="text-blue-700" size={20} />
              </motion.div>
            )}
          </motion.a>
        </div>

        <motion.div
          className="mt-8 text-center text-gray-500 text-xs cursor-default"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p>
            Thank you for visiting. To join our mentorship forum click
            <br />
            &apos;Continue to forum&apos;
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}