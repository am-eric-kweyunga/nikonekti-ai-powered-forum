"use client"

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Star, MessageCircle, Users, Plus, Check, Loader2, MessageSquare, XCircle, X } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { toast } from '@/hooks/use-toast'
import { getStudentsConnections, getUser } from '@/utils/actions'
import Loading from '@/components/custom/loading'

interface Mentor {
  type: string
  name: string
  email: string
  occupation: string
  ratings: string
  image_path: string
  location: string
}

interface User {
  id: number
  name: string
  email: string
  picture: string
}

export default function Mentors() {
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [hasMore, setHasMore] = useState(true)
  const [user, setUser] = useState<User>()
  const [connections, setConnections] = useState<any[]>([])
  const loader = useRef<HTMLDivElement | null>(null)

  const router = useRouter()

  const fetchMentors = useCallback(async (start: number, limit: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/search_mentors?start=${start}&limit=${limit}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) throw new Error('Failed to fetch mentors')
      const data = await response.json()

      if (data.status === 'success') {
        setHasMore(data.mentors.length === limit)
        setMentors(prevMentors => [...prevMentors, ...data.mentors])
      } else {
        console.error('Error fetching mentors:', data.message)
      }
    } catch (error) {
      console.error('Error fetching mentors:', error)
      toast({
        title: 'Error',
        description: 'Failed to fetch mentors. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }, [])

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0]
    if (target.isIntersecting && !loading && hasMore) {
      fetchMentors(mentors.length, 10)
    }
  }, [fetchMentors, loading, hasMore])

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '10px',
      threshold: 1.0
    })

    if (loader.current) observer.observe(loader.current)
    return () => observer.disconnect()
  }, [handleObserver])

  useEffect(() => {
    const fetchUserAndConnections = async () => {
      try {
        const userData = await getUser()
        if (userData) {
          setUser({
            id: userData.sub,
            name: userData.name,
            email: userData.email,
            picture: userData.picture
          })
        }
        const connectionsData = await getStudentsConnections()
        setConnections(connectionsData)
      } catch (error) {
        console.error('Error fetching user data:', error)
        toast({
          title: 'Error',
          description: 'Failed to fetch user data. Please try again.',
          variant: 'destructive',
        })
      }
    }
    fetchUserAndConnections()
  }, [])

  useEffect(() => {
    setMentors([])
    setLoading(true)
    setTimeout(() => {
      fetchMentors(0, 10)
    }, 500)
  }, [fetchMentors])

  const filteredMentors = mentors.filter(mentor =>
    mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentor.occupation.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading && mentors.length === 0) {
    return <Loading isLoading={loading} />
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-full bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 w-full"
    >
      <header className="bg-white dark:bg-gray-800 border-b p-4 sticky top-0 z-10 w-full flex justify-center shadow-md">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center w-full">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-4 md:mb-0"
          >
            Mentors
          </motion.h1>
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Input
                type="text"
                placeholder="Search mentors..."
                className="pl-10 pr-4 py-2 w-full rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <Button variant="outline" className="text-blue-700 dark:text-blue-300 border-blue-700 dark:border-blue-300 hover:bg-blue-700 hover:text-white dark:hover:bg-blue-700">
              <Filter size={20} className="mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredMentors.map((mentor, index) => (
              <MentorCard key={mentor.email} mentor={mentor} user={user} connections={connections} />
            ))}
          </motion.div>
        </AnimatePresence>
        {loading && <div className="text-center mt-4">Loading...</div>}
        <div ref={loader} />
      </main>
    </motion.div>
  )
}

function MentorCard({ mentor, user, connections }: { mentor: Mentor, user?: User, connections: any[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-lg border overflow-hidden transition-transform duration-300 hover:scale-[1.02] shadow-lg"
    >
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={mentor.image_path} alt={mentor.name} className='object-cover object-center' />
            <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{mentor.name}</h2>
            <Badge variant="secondary" className="mt-1">{mentor.occupation}</Badge>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            <Star className="text-yellow-400 mr-1" size={20} />
            <span className="text-gray-600 dark:text-gray-300">{mentor.ratings}</span>
          </div>
          <div className="flex items-center">
            <Users className="text-blue-500 mr-1" size={20} />
            <span className="text-gray-600 dark:text-gray-300">students</span>
          </div>
        </div>
        <div className="mt-6 flex justify-between items-center">
          <ConnectWithMentor mentor={mentor} user={user} connections={connections} />
          <MentorsInfo mentor={mentor} />
        </div>
      </div>
    </motion.div>
  )
}

function MentorsInfo({ mentor }: { mentor: Mentor }) {
  return (
    <Dialog>
      <DialogTrigger className="text-blue-700 dark:text-blue-300 text-nowrap border-blue-700 dark:border-blue-300 hover:bg-blue-700 hover:text-white dark:hover:bg-blue-600 flex items-center justify-center rounded-md p-2 text-sm font-semibold border hover:border-white transition-all ease-linear duration-200">
        Mentor&apos;s Info
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-blue-700 dark:text-blue-300">Mentor&apos;s Info</DialogTitle>
          <DialogDescription className='flex items-center gap-3 py-2'>
            <Avatar>
              <AvatarImage src={mentor.image_path} alt={mentor.name} />
              <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-gray-800 dark:text-gray-200">{mentor.name}</span>
            <Badge variant="secondary" className="mt-1 uppercase">{mentor.type}</Badge>
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <InfoField label="Name" value={mentor.name} />
          <InfoField label="Occupation" value={mentor.occupation} />
          <InfoField label="Email" value={mentor.email} />
          <InfoField label="Ratings" value={mentor.ratings} />
          <InfoField label="Location" value={mentor.location} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

function InfoField({ label, value }: { label: string, value: string }) {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label className="text-right text-gray-600 dark:text-gray-400">{label}</Label>
      <Input id={label.toLowerCase()} value={value} className="col-span-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200" readOnly />
    </div>
  )
}

function ConnectWithMentor({ mentor, user, connections }: { mentor: Mentor, user?: User, connections: any[] }) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [note, setNote] = useState('')

  const connectWithMentor = async () => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to connect with a mentor.',
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)
    setIsSuccess(false)
    setIsError(false)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/connect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_email: user.email, mentor_email: mentor.email, note })
      })
      const data = await response.json()

      if (response.ok && data.status === 'success') {
        setIsSuccess(true)
        setTimeout(() => setIsOpen(false), 2000)
        toast({
          title: 'Success',
          description: 'Connection request sent successfully',
          variant: 'default',
        })
      } else {
        setIsError(true)
        throw new Error(data.message || 'Failed to connect with mentor')
      }
    } catch (error) {
      console.error(error)
      setIsError(true)
      toast({
        title: 'Error',
        description: 'Failed to connect with mentor. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const isConnected = connections.some((connection: any) => connection.mentor_email === mentor.email)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        disabled={isConnected}
        className={`text-nowrap min-w-32 flex items-center justify-center rounded-md p-2 text-sm font-semibold border transition-all ease-linear duration-200 ${isConnected
            ? "border-green-600 bg-white hover:bg-white/30 text-green-600"
            : "border-blue-700 bg-blue-700 hover:bg-blue-600 text-white"
          }`}
      >
        {isConnected ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            <Badge variant="secondary" className="uppercase bg-green-200">Connected</Badge>
          </>
        ) : (
          <>
            <Plus className="mr-2 h-4 w-4" />
            Connect
          </>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2 text-blue-700 dark:text-blue-300'>
            Connect with <Badge className='bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-lg'>{mentor.name}</Badge>
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            <b>Personalize your connection with a note to the mentor</b>, or leave it empty if you prefer.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-rows items-center gap-4">
            <Label className="text-start text-gray-700 dark:text-gray-300">Send a note</Label>
            <Input
              id="note"
              placeholder="e.g., Hello, I'm interested in your mentorship..."
              className="col-span-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              onChange={(e) => setNote(e.target.value)}
              value={note}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className={`w-full transition-all duration-300 ${isLoading ? 'bg-blue-500 cursor-not-allowed' :
                isSuccess ? 'bg-green-600 hover:bg-green-700' :
                  isError ? 'bg-red-600 hover:bg-red-700' :
                    'bg-blue-700 hover:bg-blue-800'
              } text-white`}
            onClick={connectWithMentor}
            disabled={isLoading}
          >
            {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Connecting...</> :
              isSuccess ? <><Check className="mr-2 h-4 w-4" /> Requested</> :
                isError ? <><X className="mr-2 h-4 w-4" /> Try again</> :
                  <><Plus className="mr-2 h-4 w-4" /> Connect</>}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}