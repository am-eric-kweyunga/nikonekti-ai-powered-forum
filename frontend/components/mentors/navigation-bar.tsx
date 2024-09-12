"use client"
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { useUser } from '@auth0/nextjs-auth0/client'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Link from 'next/link'
import { LucideMenu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { FaHome, FaChalkboardTeacher, FaComments, FaBookOpen, FaBookReader, FaCalendarAlt } from 'react-icons/fa'
import Logo from '../forum/logo'

const NavigationBar = () => {
  const router = useRouter()
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm sm:px-6">

      <div className="flex items-center gap-3 justify-center">

        <MobileSidebar />

        <Link href={`/mentor`} className="text-2xl font-bold text-blue-700">
          <Logo />
        </Link>

      </div>

      <div className="flex flex-row-reverse items-center gap-4">

        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => {
          router.push(`/mentor/profile`)
        }}>

          <Avatar>
            <AvatarImage src={``} />
            <AvatarFallback className='bg-blue-700/20 text-white animate-pulse'>U</AvatarFallback>
          </Avatar>

        </Button>

      </div>
    </header>
  )
}

export default NavigationBar


const MobileSidebar = () => {
  const { user, error, isLoading } = useUser()

  const [open, setOpen] = React.useState(false)
  const route = useRouter()
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className='md:hidden block'>
        <Button variant="outline" size="icon" className=" flex justify-center items-center">
          <LucideMenu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className=" sm:w-[420px] flex flex-col-reverse">
        <SheetHeader className='py-5'>
          <SheetDescription className='py-3'>
            <div className="flex flex-col items-center justify-center gap-2 w-full">
              <div className='flex items-center justify-center gap-2 w-full'>
                <Avatar>
                  <AvatarImage src={`${user?.picture}`} />
                  <AvatarFallback className='bg-blue-700/20 text-white animate-pulse'>U</AvatarFallback>
                </Avatar>
                <div className='flex flex-col items-start justify-center w-full'>
                  <p className='text-lg font-semibold'>{user?.name}</p>
                  <p className='text-sm text-gray-500'>{user?.email}</p>
                </div>
              </div>
              <Button variant="outline" size="lg" className='text-lg font-semibold'
                onClick={() => route.push('/api/auth/logout')}>
                Logout
              </Button>
            </div>
          </SheetDescription>
        </SheetHeader>

        <div className='w-full h-full overflow-hidden py-5'>
          <nav className={`w-full flex flex-col bg-white p-5 uppercase`}>
            <div className="space-y-2 flex flex-col gap-2 justify-center items-start">
              <Link
                href={`/${user?.email}`}
                className="flex text-muted-foreground flex-row-reverse justify-between w-full items-center gap-2 rounded-md px-3 py-2 text-2xl font-medium hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                <FaHome className='text-muted-foreground opacity-40' /> Home
              </Link>
              <Link
                href={`/${user?.email}/mentors`}
                className="flex text-muted-foreground flex-row-reverse justify-between w-full  items-center gap-2 rounded-md px-3 py-2 text-2xl font-medium hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                <FaChalkboardTeacher className='text-muted-foreground opacity-40' /> Mentors
              </Link>
              <Link
                href="#"
                className="flex text-muted-foreground flex-row-reverse justify-between w-full  items-center gap-2 rounded-md px-3 py-2 text-2xl font-medium hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                <FaComments className='text-muted-foreground opacity-40' /> Messages
              </Link>
              <Link
                href="#"
                className="flex text-muted-foreground flex-row-reverse justify-between w-full  items-center gap-2 rounded-md px-3 py-2 text-2xl font-medium hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                <FaBookOpen className='text-muted-foreground opacity-40' /> Forums
              </Link>
              <Link
                href="#"
                className="flex text-muted-foreground flex-row-reverse justify-between w-full  items-center gap-2 rounded-md px-3 py-2 text-2xl font-medium hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                <FaBookReader className='text-muted-foreground opacity-40' /> Resources
              </Link>
              <Link
                href="#"
                className="flex text-muted-foreground flex-row-reverse justify-between w-full  items-center gap-2 rounded-md px-3 py-2 text-2xl font-medium hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                <FaCalendarAlt className='text-muted-foreground opacity-40' /> Events
              </Link>
            </div>
          </nav>
        </div>
      </SheetContent>
    </Sheet >
  )
}



