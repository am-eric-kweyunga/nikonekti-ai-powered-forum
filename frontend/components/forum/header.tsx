"use client"
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { useUser } from '@auth0/nextjs-auth0/client'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Link from 'next/link'
import Logo from './logo'

const HeaderComponent = () => {
    const  { user, error, isLoading } = useUser()
    const router = useRouter()
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm sm:px-6">
        <div className="flex items-center gap-4">
          <Link href={`/${user?.email}`} className="text-2xl font-bold text-blue-700">
            <Logo />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => {
            router.push(`/${user?.email}/profile`)
          }}>
            <Avatar>
              <AvatarImage src={`${user?.picture}`} />
              <AvatarFallback className='bg-blue-700/20 text-white animate-pulse'>U</AvatarFallback>
            </Avatar>
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </div>
      </header>
  )
}

export default HeaderComponent