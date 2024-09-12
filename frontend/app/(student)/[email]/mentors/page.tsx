'use client'
import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Star, MessageCircle, Users } from 'lucide-react'

// Mock data generator relevant to Nikonekti
const generateMentors = (start: number, end: number) => {
  const mentorExpertise = [
    "Career Counseling", "STEM Guidance", "University Applications",
    "Scholarship Advice", "Professional Development"
  ];

  return Array.from({ length: end - start }, (_, index) => ({
    id: start + index,
    name: `Mentor ${start + index}`,
    expertise: mentorExpertise[Math.floor(Math.random() * mentorExpertise.length)],
    rating: (Math.random() * 2 + 3).toFixed(1),
    students: Math.floor(Math.random() * 100),
    image: `/placeholder.svg?height=100&width=100&text=M${start + index}`
  }))
}

export default function Mentors() {
  const [mentors, setMentors] = useState(() => generateMentors(0, 20))  // Avoids hydration error by keeping initial state stable
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const loader = useRef(null)

  const handleObserver = (entities: IntersectionObserverEntry[]) => {
    const target = entities[0]
    if (target.isIntersecting && !loading) {
      loadMore()
    }
  }

  const loadMore = () => {
    setLoading(true)
    setTimeout(() => {
      const newMentors = generateMentors(mentors.length, mentors.length + 10)
      setMentors(prevMentors => [...prevMentors, ...newMentors])
      setLoading(false)
    }, 1000)
  }

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0
    }
    const observer = new IntersectionObserver(handleObserver, option)
    if (loader.current) observer.observe(loader.current)
    return () => observer.disconnect()
  }, [])

  const filteredMentors = mentors.filter(mentor => 
    mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentor.expertise.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 ">
      <header className="bg-white border-b p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700">Nikonekti Mentors</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Search mentors..." 
                className="pl-10 pr-4 py-2 transition-all ease-linear duration-200  rounded-full bg-white/10 text-gray-400 placeholder-white/50 !outline-none focus:outline-none focus:ring-2 focus:ring-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={20} />
            </div>
            <Button variant="outline" className="text-black border-white hover:bg-white hover:text-blue-700">
              <Filter size={20} className="mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map(mentor => (
            <div key={mentor.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden transition-transform duration-300 hover:scale-105">
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={mentor.image} alt={mentor.name} />
                    <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{mentor.name}</h2>
                    <Badge variant="secondary" className="mt-1">{mentor.expertise}</Badge>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="text-yellow-400 mr-1" size={20} />
                    <span className="text-gray-600 dark:text-gray-300">{mentor.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="text-blue-500 mr-1" size={20} />
                    <span className="text-gray-600 dark:text-gray-300">{mentor.students} students</span>
                  </div>
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <Button className="bg-blue-700 hover:bg-blue-800 text-white">
                    Connect
                  </Button>
                  <Button variant="outline" className="text-blue-700 border-blue-700 hover:bg-blue-700 hover:text-white">
                    <MessageCircle size={20} className="mr-2" />
                    Message
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {loading && <p className="text-center mt-4 text-gray-600 dark:text-gray-400">Loading more mentors...</p>}
        <div ref={loader} />
      </main>
    </div>
  )
}
