"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useUser } from '@auth0/nextjs-auth0/client'
import { Home, Users, MessageSquare, BookOpen, BookText, Calendar, Menu } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const SidebarComponent = () => {
  const pathname = usePathname()
  const { user } = useUser()
  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()

  const menuItems = [
    { href: '/student', icon: Home, label: 'Home' },
    { href: '/student/mentors', icon: Users, label: 'Mentors' },
    { href: '/student/messages', icon: MessageSquare, label: 'Messages' },
    { href: '#', icon: BookOpen, label: 'Forums' },
    { href: '#', icon: BookText, label: 'Resources' },
    { href: '#', icon: Calendar, label: 'Events' },
  ]

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: "-100%" },
  }

  return (
    <AnimatePresence>
      {(isOpen || typeof window !== 'undefined' && window.innerWidth >= 768) && (
        <motion.nav
          className=" hidden !w-56 md:flex flex-col border-r bg-white sm:flex  top-0  left-0 h-full p-4 z-40"
          initial="closed"
          animate="open"
          exit="closed"
          variants={sidebarVariants}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-center mb-8">
              <motion.svg
                width="80"
                height="80"
                viewBox="0 0 270 270"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <circle cx="135" cy="135" r="135" fill="#1D58B0" />
                <circle cx="134.5" cy="135.5" r="117.5" fill="white" />
                <rect x="56" y="94" width="42" height="56" rx="21" fill="#1D58B0" />
                <rect x="172" y="94" width="42" height="56" rx="21" fill="#1D58B0" />
                <path d="M98 194C98 194 135 220 172 194" stroke="#1D58B0" strokeWidth="18" strokeLinecap="round" />
              </motion.svg>
            </div>

            <div className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${pathname === item.href ? 'bg-[#1D58B0] text-white' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </motion.div>
                </Link>
              ))}
            </div>

            <div className="mt-auto">
              {user && (
                <motion.div
                  className="flex items-center gap-2 rounded-md px-3 py-2 bg-gray-100"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => router.push('/student/profile')}
                >
                  <Avatar>
                    <AvatarImage src={user.picture || '/placeholder.svg?height=32&width=32'} />
                    <AvatarFallback>{user?.name?.slice(0, 1)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                </motion.div>
              )}
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

export default SidebarComponent
