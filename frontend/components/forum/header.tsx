"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useUser } from '@auth0/nextjs-auth0/client'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger } from "@/components/ui/sheet"
import { Home, Users, MessageSquare, BookOpen, BookText, Calendar, Menu, LogOut } from 'lucide-react'
import Image from 'next/image'

const HeaderComponent = () => {
  const { user, error, isLoading } = useUser()
  const router = useRouter()

  return (
    <motion.header
      className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm sm:px-6"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center gap-3 justify-center">
        <MobileSidebar />
        <Link href={`/student`} className="text-2xl font-bold text-[#1D58B0]">
          <Image src="/images/nikonekti/nikonekti.svg" alt="Nikonekti" width={190} height={40} />
        </Link>
      </div>

      <motion.div
        className="flex flex-row-reverse items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => router.push(`/student/profile`)}
          >
            <Avatar>
              <AvatarImage src={user?.picture || ''} />
              <AvatarFallback className='bg-[#1D58B0]/20 text-white animate-pulse'>
                {user?.name?.[0] || 'U'}
              </AvatarFallback>
            </Avatar>
          </Button>
        </motion.div>
      </motion.div>
    </motion.header>
  )
}

const MobileSidebar = () => {
  const { user } = useUser()
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const menuItems = [
    { href: '/student', icon: Home, label: 'Home' },
    { href: '/student/mentors', icon: Users, label: 'Mentors' },
    { href: '#', icon: MessageSquare, label: 'Messages' },
    { href: '#', icon: BookOpen, label: 'Forums' },
    { href: '#', icon: BookText, label: 'Resources' },
    { href: '#', icon: Calendar, label: 'Events' },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className='md:hidden block'>
        <Button variant="outline" size="icon" className="flex justify-center items-center">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:w-[420px] flex flex-col">
        <SheetHeader className='py-5'>
          <SheetDescription className='py-3'>
            <motion.div
              className="flex flex-col items-center justify-center gap-2 w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className='flex items-center justify-center gap-2 w-full'>
                <Avatar>
                  <AvatarImage src={user?.picture || ''} />
                  <AvatarFallback className='bg-[#1D58B0]/20 text-white animate-pulse'>
                    {user?.name?.[0] || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className='flex flex-col items-start justify-center w-full'>
                  <p className='text-lg font-semibold'>{user?.name}</p>
                  <p className='text-sm text-gray-500'>{user?.email}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="lg"
                className='text-lg font-semibold w-full'
                onClick={() => router.push('/api/auth/logout')}
              >
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </motion.div>
          </SheetDescription>
        </SheetHeader>

        <div className='w-full h-full overflow-hidden py-5'>
          <nav className={`w-full flex flex-col bg-white p-5`}>
            <div className="space-y-2 flex flex-col gap-2 justify-center items-start">
              {menuItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex text-gray-700 justify-between w-full items-center gap-2 rounded-md px-3 py-2 text-lg font-medium hover:bg-gray-100 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <span>{item.label}</span>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <item.icon className='text-[#1D58B0] opacity-80' size={20} />
                  </motion.div>
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default HeaderComponent