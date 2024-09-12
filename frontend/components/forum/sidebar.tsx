"use client"
import Link from 'next/link'
import React from 'react'
import { FaHome, FaChalkboardTeacher, FaEnvelope, FaComments, FaBookOpen, FaCalendarAlt, FaInfoCircle, FaBookReader } from 'react-icons/fa'
import { usePathname } from 'next/navigation'
import { useUser } from '@auth0/nextjs-auth0/client';
const SidebarComponent = () => {

  const pathname = usePathname()
  const { user } = useUser()

  return (
    <nav className={` hidden w-52 md:flex flex-col border-r bg-white p-4 sm:flex` }>
      <div className="space-y-2">
        <Link
          href={`/${user?.email}`}
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
        >
          <FaHome /> Home
        </Link>
        <Link
          href={`/${user?.email}/mentors`}
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
        >
          <FaChalkboardTeacher /> Mentors
        </Link>
        <Link
          href={`/${user?.email}/messages`}
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
        >
          <FaComments /> Messages
        </Link>
        <Link
          href="#"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
        >
          <FaBookOpen /> Forums
        </Link>
        <Link
          href="#"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
        >
          <FaBookReader /> Resources
        </Link>
        <Link
          href="#"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
        >
          <FaCalendarAlt /> Events
        </Link>
      </div>
    </nav>
  )
}

export default SidebarComponent
