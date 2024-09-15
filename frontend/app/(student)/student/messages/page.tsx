"use client";

import React, { useState, useEffect, use } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { AutosizeTextarea } from "@/components/custom/resizable-textarea";
import { motion, AnimatePresence, m } from "framer-motion";
import { ArrowLeft, PhoneIcon, PlusIcon, SendHorizontalIcon, Search, MoreVertical, Paperclip, Smile, Loader2Icon } from "lucide-react";
import { useParams, useSearchParams } from 'next/navigation'
import { getMyMentors } from "@/utils/actions";
import { Badge } from "@/components/ui/badge";
import ChatIcon from "@/components/icons/chat-icon";
import ChatStarter from "@/components/custom/chat-starter";
import { time } from "console";

interface Mentor {
  id: number;
  name: string;
  email: string;
  lastSeen: string;
  image_path: string;
  occupation: string,
  type: string;
}

interface Message {
  id: number;
  text: string;
  sender: "student" | "mentor";
  timestamp: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hi John, I'm struggling with the React project we discussed earlier. Could you please help me understand the issue I'm facing?",
    sender: "student",
    timestamp: "10:30 AM"
  },
  {
    id: 2,
    text: "Sure, let me take a look. Can you please share the code or describe the issue in more detail?",
    sender: "mentor",
    timestamp: "10:32 AM"
  },
];

export default function CareerGuidanceChat() {
  const [messageList, setMessageList] = useState<Message[]>(initialMessages);
  const [message, setMessage] = useState("");
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const params = useSearchParams();
  const mentor_param_mail = params.get("mentor");

  const filteredMentors = mentors.filter((mentor) =>
    mentor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGetMentors = async () => {
    try {
      const response = await getMyMentors()
      setMentors(response);
    } catch (error) {
      console.error("Error fetching mentors:", error);
    }
  };

  useEffect(() => {
    try {
      handleGetMentors()
    } catch (error) {
      console.error("Error fetching mentors:", error);
    }
  }, []);

  useEffect(() => {
    if (mentors.length > 0) {
      setLoading(false);
    }
    if (mentor_param_mail) {
      const mentor = mentors.find((mentor) => mentor.email === mentor_param_mail);
      if (mentor) {
        setSelectedMentor(mentor);
      }
    }
  }, [mentors, mentor_param_mail]);

  const handleSend = () => {
    if (message.trim() === "") return;
    const newMessage: Message = {
      id: messageList.length + 1,
      text: message,
      sender: "student",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessageList([...messageList, newMessage]);
    setMessage("");

    // Simulate mentor response after a short delay
    setTimeout(() => {
      const mentorResponse: Message = {
        id: messageList.length + 2,
        text: "I understand. Let's break down the problem step by step. Can you show me the specific part of the code where you're having trouble?",
        sender: "mentor",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessageList(prevMessages => [...prevMessages, mentorResponse]);
    }, 2000);
  };

  return (
    <div className="w-full h-full flex md:p-2 overflow-hidden justify-between items-center md:rounded-xl bg-white">

      {/* Mentor List */}
      <AnimatePresence>
        {(!selectedMentor || (selectedMentor && window.innerWidth >= 768)) && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            id="list_of_mentors"
            className="h-full relative overflow-hidden bg-white flex flex-col gap-3 border rounded-sm  w-full md:w-[425px]"
          >
            <div className="p-3 bg-white z-10 w-full border-b sticky top-0 flex justify-between items-center gap-2">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search for mentors..."
                  className="w-full pl-10 pr-4 py-2 border-none !outline-none !shadow-none rounded-lg "
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            <div className="flex flex-col gap-3 overflow-y-auto px-4 !py-5">
              {
                mentors.length > 0 ? (
                  <>
                    {filteredMentors.map((mentor) => (
                      <motion.div
                        key={mentor.id}
                        whileTap={{ scale: 0.98 }}
                        className={`${mentor.email === mentor_param_mail ? "bg-gray-100" : ""} flex justify-between items-center cursor-pointer p-2 hover:bg-gray-100 transition rounded-lg`}
                        onClick={() => {
                          setSelectedMentor(null)
                          // delay(1000)
                          setTimeout(() => {
                            setSelectedMentor(mentor);
                            const newParams = new URLSearchParams(params);
                            newParams.set("mentor", mentor.email);
                            // Update the URL with the new params
                            window.history.pushState({}, '', `${window.location.pathname}?${newParams}`);
                          }, 200)
                        }}
                        exit={{ opacity: 0 }}
                      >
                        <motion.div
                          className="flex w-full items-center gap-3 justify-between"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="relative p-2">
                              <Avatar className="h-10 w-10 relative  ring-1 ring-blue-600 ring-offset-2">
                                <AvatarImage src={mentor.image_path} className=" object-cover object-center" />
                                <AvatarFallback>{mentor.name[0]}</AvatarFallback>
                              </Avatar>
                              {/* online status */}
                              <Badge className="bg-green-600 p-1 top-0 right-0 absolute text-white/70 ml-4" variant={'secondary'}></Badge>
                            </div>
                            <div>
                              <span className="font-medium text-gray-900">{mentor.name}</span>
                              <p className="text-xs text-gray-500">{mentor.type} <Badge variant={'outline'} className="font-normal !shadow-none border text-xs">{mentor.occupation}</Badge></p>
                              <p className="text-[10px] text-gray-400">Last seen: {mentor.lastSeen}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-[#1D58B0] font-semibold">Chat</span>
                            <svg className="w-4 h-4 text-[#1D58B0]" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                              <path d="M21 7L9 19l-5.5-5.5 1.414-1.414L9 16.172 19.586 5.586z" />
                            </svg>
                          </div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </>
                ) : (
                  <>
                    {
                      loading ? (
                        <div className="flex items-center justify-center h-full">
                          <Loader2Icon className="w-6 h-6 text-gray-500 animate-spin" />
                        </div>
                      ) : (
                        error ? (
                          <div className="flex items-center justify-center h-full">
                            <p className="text-red-500">Error: {error}</p>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <p className="text-gray-500">No mentors found</p>
                          </div>
                        )
                      )
                    }
                  </>
                )
              }
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Playground */}
      <AnimatePresence>
        {selectedMentor ? (
          <motion.div
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 10, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full md:w-[calc(100%-425px)] flex flex-col gap-3 md:px-1 h-full md:bg-gray-50"
            id="chat_play_ground"
          >
            <Card className="h-full md:border flex flex-col !rounded-sm md:shadow overflow-hidden w-full">
              <CardHeader className="flex flex-col w-full justify-between items-center bg-[#1D58B0] text-white p-0">
                <CardTitle className="flex items-center gap-2 w-full justify-between p-3">
                  <div className="flex items-center gap-1 justify-center cursor-pointer">
                    <div
                      className="flex md:hidden justify-center items-center rounded-full hover:bg-[#1D58B0]/80 p-1"
                      onClick={() => {
                        setSelectedMentor(null)
                        window.history.pushState({}, '', `${window.location.pathname}`)
                      }
                      }>
                      <Button
                        className="rounded-full bg-transparent border-none hover:bg-transparent"
                        variant="ghost"
                        size="icon"
                      >
                        <ArrowLeft className="h-4 w-4 text-white" />
                      </Button>
                    </div>
                    <Avatar className="ring-1 ring-white ring-offset-2 ">
                      <AvatarImage src={selectedMentor.image_path} className="object-cover object-center" />
                      <AvatarFallback>{selectedMentor.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="ml-2">
                      <p className="text-base font-semibold">{selectedMentor.name} </p>
                      <p className="text-xs opacity-80">{selectedMentor.type} and {selectedMentor.occupation}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-1 h-full">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-[#1D58B0]/80">
                      <PhoneIcon className="h-4 w-4 text-white" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="outline-none">
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-[#1D58B0]/80">
                          <MoreVertical className="h-4 w-4 text-white" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="bottom" align="end" className="w-40 mt-1">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Schedule Meeting</DropdownMenuItem>
                        <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Report Issue</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardTitle>
                {/* <CardDescription className="flex items-center text-xs bg-[#1D58B0]/80 w-full px-2 py-2 justify-center text-white/80">
                  <p>Last seen: {selectedMentor.lastSeen}</p>
                </CardDescription> */}
              </CardHeader>

              <CardContent className="h-full py-5 w-full overflow-y-auto bg-gray-50">
                <div className="flex flex-col gap-4">
                  {messageList.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex items-start gap-2 ${msg.sender === "mentor" ? "justify-start" : "justify-end"}`}
                    >
                      {msg.sender === "mentor" && (
                        <Avatar className="w-8 h-8 border ring-1 ring-blue-600">
                          <AvatarImage src={selectedMentor?.image_path} className="object-cover" />
                          <AvatarFallback>{selectedMentor?.name[0]}</AvatarFallback>
                        </Avatar>
                      )}
                      <div className={`rounded-lg p-3 max-w-[75%] ${msg.sender === "mentor" ? "bg-white" : "bg-[#1D58B0] text-white"}`}>
                        <p className="text-sm">{msg.text}</p>
                        <p className="text-[10px] mt-1 opacity-70">{msg.timestamp}</p>
                      </div>
                      {/* {msg.sender === "student" && (
                        <Avatar className="w-8 h-8 border">
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>ST</AvatarFallback>
                        </Avatar>
                      )} */}
                    </motion.div>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="w-full h-auto bg-white bottom-0 p-3 border-t">
                <div className="w-full flex gap-2 justify-between items-center">
                  <AutosizeTextarea
                    maxHeight={150}
                    onSendMessage={handleSend}
                    className={``}
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ) : (
          <ChatStarter />
        )}
      </AnimatePresence>
    </div>
  );
}