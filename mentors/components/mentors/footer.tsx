import React from 'react'
import Link from 'next/link'
import { Twitter, Linkedin, Instagram, Mail, Phone } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function MentorFooter() {
  return (
    <footer className="bg-blue-700 text-white bottom-0 w-full">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Nikonekti for Mentors</h3>
            <p className="text-sm text-blue-200">
              Empowering mentors to guide the next generation of professionals through AI-driven connections and resources.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: 'Dashboard', href: '/dashboard' },
                { label: 'My Mentees', href: '/dashboard/mentees' },
                // { label: 'Resources', href: '/dashboard/resources' },
                // { label: 'Community', href: '/dashboard/community' },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm hover:text-blue-300 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">mentor-support@nikonekti.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+255 747 955 454</span>
              </li>
            </ul>
            <Link href="https://nikonekti-service.vercel.app/frequent" className="text-sm hover:text-blue-300 transition-colors">
              FAQ for Mentors
            </Link>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Connected</h3>
            <div className="flex space-x-4">
              {[
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Linkedin, label: 'LinkedIn' },
                { Icon: Instagram, label: 'Instagram' },
              ].map(({ Icon, label }) => (
                <Button key={label} variant="ghost" size="icon" className="hover:bg-blue-700" aria-label={label}>
                  <Icon className="h-5 w-5" />
                </Button>
              ))}
            </div>
            <Link href="/mentor/newsletter" className="inline-block">
              <Button variant="outline" className="text-white hover:text-white bg-blue-600 border-white hover:bg-blue-700">
                Subscribe to Newsletter
              </Button>
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-blue-700 text-center text-sm text-blue-300">
          <p>&copy; {new Date().getFullYear()} Nikonekti. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="https://nikonekti-service.vercel.app/terms-of-service" target='_blank' className="hover:text-blue-200 transition-colors">
              Terms of Service
            </Link>
            <Link href="/mentor-agreement" target='_blank' className="hover:text-blue-200 transition-colors">
              Mentor&apos;s Guide to Success
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}