"use client"
import Link from 'next/link'
import React from 'react'
import { FaHome, FaChalkboardTeacher, FaEnvelope, FaComments, FaBookOpen, FaCalendarAlt, FaInfoCircle, FaBookReader } from 'react-icons/fa'
import { usePathname } from 'next/navigation'
import { useUser } from '@auth0/nextjs-auth0/client';
const SidebarComponent = ({ className, open, setOpen }: { className?: any, open: any, setOpen: any }) => {

  const pathname = usePathname()
  const { user } = useUser()

  return (
    <nav className={`${className} hidden w-52 md:flex flex-col border-r bg-white p-4 sm:flex` }>
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
  )
}

export default SidebarComponent
