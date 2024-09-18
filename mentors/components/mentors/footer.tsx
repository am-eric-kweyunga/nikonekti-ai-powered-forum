import React from 'react'
import Link from 'next/link'
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function MentorFooter() {
  return (
    <footer className="bg-blue-900 text-white">
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
                { label: 'Dashboard', href: '/mentor/dashboard' },
                { label: 'My Mentees', href: '/mentor/mentees' },
                { label: 'Resources', href: '/mentor/resources' },
                { label: 'Community', href: '/mentor/community' },
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
                <span className="text-sm">+1 (555) 123-4567</span>
              </li>
            </ul>
            <Link href="/mentor/faq" className="text-sm hover:text-blue-300 transition-colors">
              FAQ for Mentors
            </Link>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Connected</h3>
            <div className="flex space-x-4">
              {[
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Linkedin, label: 'LinkedIn' },
                { Icon: Instagram, label: 'Instagram' },
              ].map(({ Icon, label }) => (
                <Button key={label} variant="ghost" size="icon" className="hover:bg-blue-800" aria-label={label}>
                  <Icon className="h-5 w-5" />
                </Button>
              ))}
            </div>
            <Link href="/mentor/newsletter" className="inline-block">
              <Button variant="outline" className="text-white border-white hover:bg-blue-800">
                Subscribe to Newsletter
              </Button>
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-blue-800 text-center text-sm text-blue-300">
          <p>&copy; {new Date().getFullYear()} Nikonekti. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy-policy" className="hover:text-blue-200 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-blue-200 transition-colors">
              Terms of Service
            </Link>
            <Link href="/mentor-agreement" className="hover:text-blue-200 transition-colors">
              Mentor Agreement
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}