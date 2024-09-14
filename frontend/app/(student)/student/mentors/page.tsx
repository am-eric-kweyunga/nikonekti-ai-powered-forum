'use client'
import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Star, MessageCircle, Users, Plus, Check, Loader2, MessageSquare, XCircle, X } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { toast } from '@/hooks/use-toast'

// sever actions
import { getStudentsConnections, getUser } from '@/utils/actions'
import Loading from '@/components/custom/loading'
import { list } from 'postcss'

// Define a type for the mentor data
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
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [hasMore, setHasMore] = useState(true)
  const loader = useRef<HTMLDivElement | null>(null)

  const [user, setUser] = useState<User>()

  const [connections, setConnections] = useState<any[]>([])

  const fetchMentors = async (start: number, limit: number) => {
    setLoading(true)
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
        // Checking for more mentors
        setHasMore(data.mentors.length > 0)
        setMentors(prevMentors => [...prevMentors, ...data.mentors])
      } else {
        console.error('Error fetching mentors:', data.message)
      }
    } catch (error) {
      console.error('Error fetching mentors:', error)
    } finally {
      setLoading(false)
    }
  }


  const handleObserver = async (entities: IntersectionObserverEntry[]) => {
    const target = entities[0]
    if (target.isIntersecting && !loading && hasMore) {
      fetchMentors(mentors.length, 10)
      const data = await getStudentsConnections()
      setConnections(data)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '200px',
      threshold: 1.0
    })

    if (loader.current) observer.observe(loader.current)
    return () => observer.disconnect()
  }, [loading, user, hasMore])

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser()
      if (user) {
        setUser({
          id: user.sub,
          name: user.name,
          email: user.email,
          picture: user.picture
        })
      }
    }
    fetchUser()
  }, [hasMore, loading, mentors])

  const filteredMentors = mentors.filter(mentor =>
    mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentor.occupation.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="animate-spin" />
      </div>
    )
  }
  return (
    <div className="min-h-full bg-white dark:bg-gray-900 w-full">
      <header className="bg-white border-b p-2 md:p-4 sticky top-0 z-10 w-full flex justify-center">
        <div className="container mx-auto flex md:flex-row flex-col justify-between items-center w-full py-2">
          <h1 className="text-2xl font-bold text-blue-700 md:pb-0 pb-3 uppercase">Mentors</h1>
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="relative !w-full md:w-auto min-w-2xl flex items-center justify-center">
              <Input
                type="text"
                placeholder="Looking for a mentor?, search here..."
                className="pl-10 pr-4 py-5 md:py-2 !min-w-xl !w-full transition-all ease-linear duration-200 rounded-full bg-white/10 text-gray-400 placeholder-white/50 !outline-none focus:outline-none focus:ring-2 focus:ring-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/55" size={20} />
            </div>
            <Button variant="outline" className="text-black hidden  border-white hover:bg-white hover:text-blue-700">
              <Filter size={20} className="mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-4 md:py-8 px-2 md:px-10">
        {/* <div>
          { 
            JSON.stringify(connections)
          }
        </div> */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6">
          {connections && filteredMentors.map((mentor, index) => (
            <div key={index} className="bg-white min-w-80 dark:bg-gray-800 rounded-lg border overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={mentor.image_path} alt={mentor.name} />
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
                  {user && <ConnectWithMentor mentor={mentor} user={user} connections={connections} />}
                  <MentorsInfo mentor={mentor} />
                </div>
              </div>
            </div>
          ))}        </div>
        {loading && <p className="text-center mt-4 text-blue-600 "> Loading mentors... </p>}
        <div ref={loader} />
      </main>
    </div>
  )
}

function MentorsInfo({ mentor }: { mentor: Mentor }) {

  return (
    <Dialog>
      <DialogTrigger className="text-blue-700 text-nowrap border-blue-700 hover:bg-blue-700 hover:text-white flex items-center justify-center rounded-md p-2 text-sm font-semibold  border hover:border-white transition-all ease-linear duration-200" >
        Mentor&apos;s Info
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Mentor&apos;s Info</DialogTitle>
          <DialogDescription className='flex items-center gap-3 py-2'>
            <Avatar>
              <AvatarImage src={mentor.image_path} alt={mentor.name} />
              <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {mentor.name}
            <Badge variant="secondary" className="mt-1 uppercase">{mentor.type}</Badge>
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              Name
            </Label>
            <Input id="name" value={mentor.name} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              Occupation
            </Label>
            <Input id="occupation" value={mentor.occupation} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              Email
            </Label>
            <Input id="email" value={mentor.email} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              Ratings
            </Label>
            <Input id="ratings" value={mentor.ratings} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              Location
            </Label>
            <Input id="location" value={mentor.location} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ConnectWithMentor({ mentor, user, connections }: { mentor: Mentor, user: User, connections: any[] }) {

  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const [isError, setIsError] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const [note, setNote] = useState('')

  // fetching connect with mentor
  const connectWithMentor = async () => {
    setIsLoading(true)
    setIsSuccess(false)
    setIsError(false)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/connect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          student_email: user.email,
          mentor_email: mentor.email,
          note: note
        })
      })
      const data = await response.json()

      if (response.ok && data.status === 'success') {
        setIsSuccess(true)

        // delay then set isOpen to false
        setTimeout(() => {
          setIsOpen(false)
        }, 2000)
        toast({
          title: 'Success',
          description: 'Connection  request sent successfully',
          variant: 'default',
        })
      }
      else {
        setIsError(true)
      }
    }
    catch (error) {
      console.log(error)
      setIsError(true)
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {connections.map((connection: any) => connection.mentor_email).includes(mentor.email) ? (

        <DialogTrigger disabled className="border-green-600 text-nowrap min-w-32 bg-white hover:bg-white/30 text-green-600 flex items-center justify-center rounded-md p-2 text-sm font-semibold  border  transition-all ease-linear duration-200" >
          <Plus className="mr-2 h-4 w-4 border" />
          <Badge variant="secondary" className=" uppercase bg-green-200">Connected</Badge>
        </DialogTrigger>
      ) : (
        <DialogTrigger className="border-blue-700 text-nowrap min-w-32 bg-blue-700 hover:bg-blue-600 text-white flex items-center justify-center rounded-md p-2 text-sm font-semibold  border  transition-all ease-linear duration-200" >
          <Plus className="mr-2 h-4 w-4 border" />
          Connect
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>Connect with <Badge className='bg-white !shadow-none border border-black/20 text-lg text-black'>{mentor.name}</Badge></DialogTitle>
          <DialogDescription>
            <b>Pesonalize your connection with a note to the mentor</b>, you can leave it empty if you want, and hit connect to connect with the mentor.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-rows items-center gap-4">
            <Label className="text-start">
              Send a note
            </Label>
            <Input
              id="text"
              placeholder="i.e. Hello my name is Juma"
              className="col-span-3"
              onChange={(e) => setNote(e.target.value)}
              value={note}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className={`bg-blue-700 hover:bg-blue-800 text-white w-full transition-all duration-100 ${isLoading ? 'cursor-not-allowed !bg-blue-700' : ''} ${isSuccess ? 'bg-green-600 hover:bg-green-700' : ''} ${isError ? 'bg-red-600 hover:bg-red-700' : ''}`}
            onClick={connectWithMentor}>
            {
              isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> connecting...</> :
                isSuccess ? <><Check className="mr-2 h-4 w-4" />Requested</> :
                  isError ? (<><X className="mr-2 h-4 w-4 text-white border-white border" /> Can not connect, try again!</>) :
                    (<><Plus className="mr-2 h-4 w-4 border " /> connect</>)
            }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}