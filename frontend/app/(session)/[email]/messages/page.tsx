"use client";
import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsVerticalIcon, FaceIcon } from "@radix-ui/react-icons";
import { ArrowLeft, PhoneIcon, PlusIcon, SendHorizontalIcon } from "lucide-react";
import { AutosizeTextarea } from "@/components/custom/resizable-textarea";
import { Input } from "@/components/ui/input";

interface Mentor {
  id: number;
  name: string;
  lastSeen: string;
  avatar: string;
}

const mentors = [
  { id: 1, name: "John Doe", lastSeen: "Yesterday at 9:32 PM", avatar: "https://github.com/shadcn.png" },
  { id: 2, name: "Jane Smith", lastSeen: "Today at 1:45 PM", avatar: "https://github.com/shadcn.png" },
  { id: 3, name: "Michael Johnson", lastSeen: "Today at 11:20 AM", avatar: "https://github.com/shadcn.png" },
];

const messages = [
  {
    id: 1,
    text: "Hi John, I'm struggling with the React project we discussed earlier. Could you please help me understand the issue I'm facing?",
    sender: "student",
  },
  { id: 2, text: "Sure, let me take a look. Can you please share the code or describe the issue in more detail?", sender: "mentor" },
];

export default function MessagesChatPage() {
  const [messageList, setMessageList] = useState(messages);
  const [message, setMessage] = useState("");
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter mentors based on search input
  const filteredMentors = mentors.filter((mentor) =>
    mentor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSend = () => {
    if (message.trim() === "") return;
    const newMessage = {
      id: messageList.length + 1,
      text: message,
      sender: "student", // or "mentor" based on the user role
    };
    setMessageList([...messageList, newMessage]);
    setMessage("");
  };

  return (
    <div className="w-full h-full flex p-2 overflow-hidden justify-between items-center md:rounded-xl bg-white">
      {/* Mentor List */}
      <div
        id="list_of_mentors"
        className={`h-full relative overflow-hidden bg-white flex flex-col gap-3 border rounded-sm md:rounded-l-xl w-full md:w-[425px] shadow ${selectedMentor ? "hidden md:flex" : "block"}`}
      >
        {/* Search Bar */}
        <div className=" p-3 bg-white z-10 w-full border-b sticky top-0 flex justify-between items-center gap-2">
          <Input
            type="text"
            placeholder="Search for mentors..."
            className="w-full p-2 border !outline-none border-gray-300 rounded-lg !ring-0 focus:ring-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update the search term
          />
          <Button variant={"outline"} size={"icon"} className="!p-2">
            <PlusIcon />
          </Button>
        </div>

        <div className="flex flex-col gap-3 overflow-y-auto px-4 !py-5">
          {filteredMentors.map((mentor) => (
            <div
              key={mentor.id}
              className="flex justify-between items-center cursor-pointer p-2 hover:bg-gray-100 transition"
              onClick={() => setSelectedMentor(mentor)}
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={mentor.avatar} />
                  <AvatarFallback>{mentor.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <span className="font-medium text-gray-900">{mentor.name}</span>
                  <p className="text-[10px] text-gray-500">Last seen: {mentor.lastSeen}</p>
                </div>
              </div>
              {/* Message Tick Icon */}
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-400"></span>
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M21 7L9 19l-5.5-5.5 1.414-1.414L9 16.172 19.586 5.586z" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Playground */}
      <div
        id="chat_play_ground"
        className={`w-full md:px-1 h-full md:bg-gray-50 ${selectedMentor ? "block" : "hidden md:block"
          }`}
      >
        {selectedMentor && (
          <Card className="h-full md:border flex flex-col !rounded-sm md:shadow overflow-hidden">
            {/* Card Header */}
            <CardHeader className="flex flex-col w-full justify-between items-center bg-blue-50 p-0">

              <CardTitle className="flex items-center gap-2 w-full justify-between p-3">

                <div className="flex items-center gap-2 justify-center cursor-pointer">
                  <div className="flex md:hidden justify-center items-center rounded-full hover:bg-white p-1" onClick={() => setSelectedMentor(null)}>
                    {/* Back Button for Mobile */}
                    <Button
                      className="rounded-full bg-transparent border-none hover:bg-transparent"
                      variant={"ghost"}
                      size={"icon"}
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>

                    <Avatar>
                      <AvatarImage src={selectedMentor.avatar} />
                      <AvatarFallback>{selectedMentor.name[0]}</AvatarFallback>
                    </Avatar>
                  </div>

                  <Avatar className="hidden md:flex">
                    <AvatarImage src={selectedMentor.avatar} />
                    <AvatarFallback>{selectedMentor.name[0]}</AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="text-base font-semibold">{selectedMentor.name}</p>
                  </div>

                </div>


                <div className="flex items-center justify-center gap-1 h-full"
                >
                  <Button variant={"outline"} size={"icon"} className="flex bg-transparent items-center rounded-full hover:bg-white">
                    <PhoneIcon className="h-4 w-4" />
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger className="outline-none">
                      <Button variant={"outline"} size={"icon"} className="flex bg-transparent items-center rounded-full hover:bg-white">
                        <DotsVerticalIcon />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="bottom" align="end" className="w-40 mt-6">
                      <DropdownMenuItem>Report</DropdownMenuItem>
                      <DropdownMenuItem>Clear chat</DropdownMenuItem>
                      <DropdownMenuItem>Mute notifications</DropdownMenuItem>
                      <DropdownMenuItem>Delete chat</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                </div>

              </CardTitle>

              <CardDescription className="flex items-center text-xs bg-white w-full px-2 py-2 justify-center">
                <p>Last seen: {selectedMentor.lastSeen}</p>
              </CardDescription>

            </CardHeader>

            {/* Card Content */}
            <CardContent className="h-full py-5 w-full overflow-y-auto">
              <div className="flex flex-col gap-2">
                {messageList.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2 ${msg.sender === "mentor" ? "justify-start" : "justify-end"}`}
                  >
                    {msg.sender === "mentor" && (
                      <Avatar className="w-8 h-8 border">
                        <AvatarImage src={selectedMentor?.avatar} />
                        <AvatarFallback>{selectedMentor?.name[0]}</AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`rounded-lg p-3 md:max-w-[75%] ${msg.sender === "mentor" ? "bg-muted" : "!bg-blue-700/80 text-white"}`}>
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
            <CardFooter className="w-full h-auto bg-inherit bottom-0 p-3">
              <div className="w-full flex gap-2 justify-between items-center">

                <div className="flex items-center gap-2">
                  <Button variant={"ghost"} size="icon" className="rounded-full relative">
                    <FaceIcon className="absolute h-8 w-8 text-gray-500" />
                  </Button>
                </div>

                <AutosizeTextarea
                  maxHeight={150}
                  minHeight={10}
                  className={`border px-5 w-full transition-all ease-linear duration-300 ${message != "" ? "transition-all ease-linear duration-300" : "!rounded-full !h-10 transition-all ease-linear duration-300"
                    }`}
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />

                <div>
                  <Button
                    variant={"default"}
                    size="icon"
                    className="rounded-full relative bg-blue-700/85 hover:bg-blue-700/80"
                    onClick={handleSend}
                  >
                    <SendHorizontalIcon className="text-white" />
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};
