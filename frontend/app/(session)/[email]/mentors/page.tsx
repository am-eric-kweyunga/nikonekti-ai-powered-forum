"use client"
import React, { useState } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DotsVerticalIcon, FaceIcon } from '@radix-ui/react-icons'
import { PhoneIcon, SendHorizontalIcon } from 'lucide-react'
import { AutosizeTextarea } from '@/components/custom/resizable-textarea'

const messages = [
  { id: 1, text: "Hi John, I'm struggling with the React project we discussed earlier. Could you please help me understand the issue I'm facing?", sender: "student" },
  { id: 2, text: "Sure, let me take a look. Can you please share the code or describe the issue in more detail?", sender: "mentor" },
  // Add more messages as needed
];

export default function Component() {
  const [messageList, setMessageList] = useState(messages);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() === "") return;
    const newMessage = {
      id: messageList.length + 1,
      text: message,
      sender: "mentor", // or "student" based on the user role
    };
    setMessageList([...messageList, newMessage]);
    setMessage("");
  };

  return (
    <div className='w-full h-full p-1 bg-gray-50'>
      <div className='w-full h-full flex overflow-hidden justify-between items-center md:rounded-xl bg-white'>

        <div className='h-full border rounded-sm rounded-l-xl p-4 w-64 shadow hidden'>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

        </div>

        <div className='w-full md:px-1 h-full md:bg-gray-50'>
          <Card className='h-full md:border flex flex-col !rounded-sm md:shadow overflow-hidden'>

            {/* Card Header */}
            <CardHeader className='flex flex-row w-full justify-between bg-blue-50 p-3 md:p-6'>
              <div className='flex flex-col overflow-hidden'>
                <CardTitle className='flex items-center gap-2 p-0'>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className='text-base font-semibold'>Mentor Name</p>
                  </div>
                </CardTitle>
                <CardDescription className='flex items-center gap-4 text-xs'>
                  <p>Last seen yesterday at 9:32 PM</p>
                </CardDescription>
              </div>

              <div className='flex items-center gap-1 h-full'>
                <Button variant={"outline"} className='flex h-12 w-12 items-center rounded-full'>
                  <PhoneIcon className='h-4 w-4' />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant={"outline"} className='flex h-12 w-12 items-center rounded-full'>
                      <DotsVerticalIcon />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side='bottom' align='end' className="w-40 mt-6">
                    <DropdownMenuItem>Report</DropdownMenuItem>
                    <DropdownMenuItem>Clear chat</DropdownMenuItem>
                    <DropdownMenuItem>Mute notifications</DropdownMenuItem>
                    <DropdownMenuItem>Delete chat</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>

            {/* Card Content */}
            <CardContent className='w-full h-full py-5 overflow-auto'>
              <div className="flex flex-col gap-2">
                {messageList.map(msg => (
                  <div key={msg.id} className={`flex items-start gap-2 ${msg.sender === "mentor" ? "justify-start" : "justify-end"}`}>
                    {msg.sender === "mentor" && (
                      <Avatar className="w-8 h-8 border">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`rounded-lg p-3 md:max-w-[75%] ${msg.sender === "mentor" ? "bg-muted" : "!bg-blue-700/80 text-white "}`}>
                      <p className="text-sm">{msg.text}</p>
                    </div>
                    {msg.sender === "student" && (
                      <Avatar className="w-8 h-8 border">
                        <AvatarImage src="https://github.com/shadcn.pn" />
                        <AvatarFallback>ST</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>

            {/* Card Footer */}
            <CardFooter className='w-full h-auto bg-inherit bottom-0 p-3'>
              <div className="w-full flex gap-2 justify-center items-center">
                <Button variant={'ghost'} className='h-8 w-8 rounded-full relative'>
                  <FaceIcon className='absolute h-8 w-8 text-gray-500' />
                </Button>
                <AutosizeTextarea
                  className={`border resize-none transition-all ease-linear duration-300 ${message ? " transition-all ease-linear duration-300" : "!rounded-full transition-all ease-linear duration-300"}`}
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button
                  variant={'default'}
                  className='h-10 w-10 rounded-full relative bg-blue-700/85 hover:bg-blue-700/80'
                  onClick={handleSend}
                >
                  <SendHorizontalIcon className='absolute h-4 w-4 text-white' />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
