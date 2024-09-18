'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Send, ArrowLeft } from 'lucide-react'
import { getMentorConnections } from '@/actions/auth_actions'
import { io } from 'socket.io-client'
import { useUser } from '@auth0/nextjs-auth0/client'

interface Conversation {
  id: number
  name: string
  avatar: string
  lastMessage: string
  time: string
  unread: number
  email: string
}

interface Message {
  room: string,
  message: {
    id: number
    sender: 'mentor' | 'student'
    text: string
    timestamp: string
  }
}

const conversations: Conversation[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", avatar: "/placeholder.svg?height=40&width=40", lastMessage: "Thank you for your help!", time: "10:30 AM", unread: 0 },
  { id: 2, name: "Bob Smith", email: "bob@example.com", avatar: "/placeholder.svg?height=40&width=40", lastMessage: "Can we schedule a call?", time: "Yesterday", unread: 2 },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", avatar: "/placeholder.svg?height=40&width=40", lastMessage: "I have a question about...", time: "2 days ago", unread: 0 },
]

const NikonektiLogo = () => (
  <motion.svg
    width="270"
    height="270"
    viewBox="0 0 270 270"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ scale: 0.5, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{
      duration: 1,
      ease: "easeInOut",
      delay: 0.2,
    }}
  >
    <motion.circle
      cx="135"
      cy="135"
      r="135"
      fill="#1D58B0"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    />
    <motion.circle
      cx="134.5"
      cy="135.5"
      r="117.5"
      fill="white"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, delay: 0.7 }}
    />
    <motion.rect
      x="56"
      y="94"
      width="42"
      height="56"
      rx="21"
      fill="#1D58B0"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
    />
    <motion.rect
      x="172"
      y="94"
      width="42"
      height="56"
      rx="21"
      fill="#1D58B0"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.2 }}
    />
    <motion.rect
      x="98"
      y="176"
      width="74"
      height="36"
      rx="18"
      fill="#1D58B0"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.4 }}
    />
  </motion.svg>
)

export default function MentorChatPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isMobileView, setIsMobileView] = useState(false)
  const [connections, setConnections] = useState<any[]>([])

  const [socket, setSocket] = useState<any>(undefined)

  const { user } = useUser()

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    async function GetMentorConnections() {
      const data = await getMentorConnections();

      if (data.status == "success") {
        setConnections(data.connections)
      } else {
        setConnections([])
      }
    }
    GetMentorConnections()
  }, [])

  useEffect(() => {
    const studentEmail = searchParams.get('student')
    if (studentEmail) {
      const conversation = conversations.find(conv => conv.email === studentEmail)
      if (conversation) setActiveConversation(conversation)
    }
  }, [searchParams])

  const handleConversationClick = (conversation: Conversation) => {
    const data = {
      "room": user?.email + "-" + conversation.email
    }
    socket.emit("join_room", (data), (data: any) => {
      console.log(data);
    })

    setActiveConversation(conversation)
    router.push(`?student=${conversation.email}`)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const newMsg: Message = {
        room: user?.email + "-" + activeConversation?.email,
        message: {
          id: messages.length + 1,
          sender: 'mentor',
          text: newMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      }
      socket.emit("send_message", (newMsg), (data: any) => {
        console.log("Message sent successfully");
      })
      setNewMessage('')
    }
  }

  useEffect(() => {

    const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`)
    socket.on('connect', () => {
      console.log('Connected to socket')
    })

    socket.on('receive_message', (data: any) => {
      console.log(data);
      setMessages((prevMessages) => [...prevMessages, data])
    })

    setSocket(socket)

  }, [activeConversation])

  return (
    <div className="container mx-auto p-4 h-[calc(100vh-4rem)] flex flex-col">
      <h1 className="text-2xl font-bold text-blue-900 mb-4">Mentor Your Students</h1>
      <div className="flex flex-grow overflow-hidden bg-white w-full gap-1 rounded-lg shadow-lg">
        <AnimatePresence initial={false}>
          {(!isMobileView || !activeConversation) && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: isMobileView ? "100%" : "33.333333%", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border rounded-l-lg overflow-hidden"
            >
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search conversations"
                    className="pl-10 w-full"
                  />
                </div>
              </div>
              <ScrollArea className="h-[calc(100vh-16rem)]">
                {connections.map((conv) => (
                  <motion.div
                    key={conv.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-center p-4 cursor-pointer hover:bg-blue-50 ${activeConversation?.id === conv.id ? 'bg-blue-100' : ''}`}
                    onClick={() => handleConversationClick(conv)}
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={conv.image_path} alt={conv.name} />
                      <AvatarFallback>{conv.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 flex-grow">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-semibold">{conv.name}</h3>
                        <span className="text-xs text-gray-500">{conv.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{conv.email}</p>
                    </div>
                    {conv.unread > 0 && (
                      <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 ml-2">
                        {conv.unread}
                      </span>
                    )}
                  </motion.div>
                ))}
              </ScrollArea>
            </motion.div>
          )}

          {activeConversation ? (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: isMobileView ? "100%" : "66.666667%", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col border rounded-r-lg"
            >
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                {isMobileView && (
                  <Button variant="ghost" size="icon" onClick={() => setActiveConversation(null)}>
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                )}
                <div className="flex items-center">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={activeConversation.avatar} alt={activeConversation.name} />
                    <AvatarFallback>{activeConversation.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <h2 className="ml-3 font-semibold">{activeConversation.name}</h2>
                </div>
              </div>
              <ScrollArea className="flex-grow p-4">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex mb-4 ${msg.message.sender === 'mentor' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${msg.message.sender === 'mentor'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-800'
                        }`}
                    >
                      <p>{msg.message.text}</p>
                      <span className="text-xs mt-1 block text-right">
                        {msg.message.timestamp}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </ScrollArea>
              <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-grow"
                  />
                  <Button type="submit">
                    <Send className="h-5 w-5" />
                    <span className="sr-only">Send message</span>
                  </Button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-grow hidden  md:flex flex-col items-center justify-center p-4"
            >
              <NikonektiLogo />
              <motion.h2
                className="text-2xl font-bold text-blue-900 mt-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.5 }}
              >
                Welcome to Nikonekti
              </motion.h2>
              <motion.p
                className="text-gray-600 text-center mt-4 max-w-md"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.5 }}
              >
                Select a student from the list to start mentoring. Your guidance can make a significant impact on their career journey.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}