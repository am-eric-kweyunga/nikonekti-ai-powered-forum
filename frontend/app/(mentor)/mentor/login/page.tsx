"use client"

import React, { useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LogIn, Mail, Lock, Loader2Icon } from 'lucide-react'

function Login(props: { setToken: (arg0: any) => void }) {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  })

  const [isLoading, setIsLoading] = useState(false)
  const controls = useAnimation()

  async function logMeIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify({
          email: loginForm.email,
          password: loginForm.password
        })
      })

      const data = await response.json()
      props.setToken(data.access_token)

    } catch (error) {
      console.error("Login error:", error)
    } finally {
      setIsLoading(false)
      setLoginForm({ email: "", password: "" })
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target
    setLoginForm(prevForm => ({
      ...prevForm,
      [name]: value
    }))
  }

  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  const logoVariants = {
    idle: { rotate: 0 },
    wiggle: { rotate: [0, -10, 10, -10, 10, 0], transition: { duration: 0.5 } }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-white border rounded-lg p-8">
          <div className="flex justify-center mb-8">
            <motion.svg
              width="120"
              height="120"
              viewBox="0 0 270 270"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              variants={logoVariants}
              initial="idle"
              whileHover="wiggle"
            >
              <motion.circle
                cx="135"
                cy="135"
                r="129"
                fill="#1D58B0"
                animate={{ scale: [1, 1.05, 1], transition: { repeat: Infinity, duration: 3 } }}
              />
              <circle cx="134.5" cy="135.5" r="117.5" fill="white" />
              <rect x="56" y="94" width="42" height="56" rx="21" fill="#1D58B0" />
              <rect x="172" y="94" width="42" height="56" rx="21" fill="#1D58B0" />
              <path d="M98 194C98 194 135 220 172 194" stroke="#1D58B0" strokeWidth="18" strokeLinecap="round" />
            </motion.svg>
          </div>
          <h1 className="text-3xl font-bold text-center text-[#1D58B0] mb-6">Welcome Back!</h1>
          <form onSubmit={logMeIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={loginForm.email}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={loginForm.password}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-[#1D58B0] hover:bg-[#1D58B0]/90 flex gap-2 justify-center items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className='flex justify-center items-center'
                >
                  <Loader2Icon className="animate-spin mx-auto" size={18} />
                </motion.div>
              ) : (
                <LogIn className="mr-2" size={18} />
              )}
              {isLoading ? "Logging in..." : "Log In"}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <a href="#" className="font-medium text-[#1D58B0] hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default Login