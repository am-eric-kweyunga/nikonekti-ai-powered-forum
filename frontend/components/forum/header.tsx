"use client"
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { useUser } from '@auth0/nextjs-auth0/client'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Link from 'next/link'
import Logo from './logo'
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
import SidebarComponent from './sidebar'
import { FaHome, FaChalkboardTeacher, FaComments, FaBookOpen, FaBookReader, FaCalendarAlt } from 'react-icons/fa'

const HeaderComponent = () => {
  const { user, error, isLoading } = useUser()
  const router = useRouter()
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm sm:px-6">

      <div className="flex items-center gap-1 justify-center">

        <MobileSidebar />

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


const MobileSidebar = () => {
  const { user, error, isLoading } = useUser()

  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className='md:hidden block'>
        <Button variant="ghost" size="icon" className="rounded-full">
          <LucideMenu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className=" sm:w-[420px]">
        <SheetHeader>
          <SheetTitle>
            <Link href={`/${user?.email}`} className="text-2xl font-bold text-blue-700">
              <Logo />
            </Link>
          </SheetTitle>
          <SheetDescription>
            <div className="flex flex-col items-center gap-2 w-full">
              <Button variant="outline" size="sm">
                About Nikonekti
              </Button>
            </div>
          </SheetDescription>
        </SheetHeader>

        <div className='w-full h-full overflow-hidden'>
          <nav className={`w-full md:flex flex-col bg-white p-5 sm:flex`}>
            <div className="space-y-2">
              <Link
                href={`/${user?.email}`}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                <FaHome /> Home
              </Link>
              <Link
                href={`/${user?.email}/mentors`}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                <FaChalkboardTeacher /> Mentors
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                <FaComments /> Messages
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                <FaBookOpen /> Forums
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                <FaBookReader /> Resources
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                <FaCalendarAlt /> Events
              </Link>
            </div>
          </nav>
        </div>

        <SheetFooter>
          <div className="flex flex-col items-center gap-2 w-full">
            <Button variant="outline" size="sm">
              Logout
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}



