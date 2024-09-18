'use client'

import React, { useEffect, useState } from 'react'
import { Bell, MessageSquare, UserPlus, Settings, Book, ChevronRight } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from 'next/link'
import { getMentorConnections } from '@/actions/auth_actions'

interface Connection {
    name: string;
    email: string;
    image_path: string;
}

export default function MentorDashboard() {
    const [isVisible, setIsVisible] = useState(true)
    const [connections, setConnections] = useState<Connection[]>([])

    useEffect(() => {
        async function GetMentorConnections() {
            const data = await getMentorConnections();
            console.log(data);

            if (data.status == "success") {
                setConnections(data.connections)
            } else {
                setConnections([])
            }
        }
        GetMentorConnections()
    }, [])

    useEffect(() => {
        // selcet active cehat from url
        const chatId = new URLSearchParams(window.location.search).get('student')
        if (chatId) {
            setIsVisible(false)
        }
    }, [])

    const notifications = [
        { id: 1, message: "New connection request from Alice", time: "2 hours ago" },
        { id: 2, message: "Bob sent you a message", time: "1 day ago" },
        { id: 3, message: "Reminder: Mentoring session with Charlie tomorrow", time: "1 day ago" },
    ]

    const messages = [
        { id: 1, name: "Fiona Brown", message: "Thank you for your advice!", time: "3 hours ago", avatar: "/placeholder.svg?height=40&width=40" },
        { id: 2, name: "George Smith", message: "Can we schedule a call?", time: "1 day ago", avatar: "/placeholder.svg?height=40&width=40" },
    ]

    return (
        <div className="container mx-auto p-4 space-y-6">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-blue-900">Mentor Dashboard</h1>
                <div className="flex items-center space-x-4">
                    <Switch
                        checked={isVisible}
                        onCheckedChange={setIsVisible}
                        className="data-[state=checked]:bg-blue-600"
                    />
                    <span className="text-sm text-blue-800">
                        {isVisible ? "Visible to Students" : "Invisible to Students"}
                    </span>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle>Activity Feed</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="notifications" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                                <TabsTrigger value="connections">Connections</TabsTrigger>
                                <TabsTrigger value="messages">Messages</TabsTrigger>
                            </TabsList>
                            <TabsContent value="notifications">
                                <ScrollArea className="h-[300px]">
                                    {notifications.map((notification) => (
                                        <div key={notification.id} className="flex items-start space-x-4 mb-4">
                                            <Bell className="h-5 w-5 text-blue-600 mt-1" />
                                            <div>
                                                <p className="text-sm">{notification.message}</p>
                                                <p className="text-xs text-gray-500">{notification.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </ScrollArea>
                            </TabsContent>
                            <TabsContent value="connections">
                                <ScrollArea className="h-[300px]">
                                    {connections.length > 0 ? connections.map((request, index) => (
                                        <Link href={`/dashboard/messages?student=${request.email}`} key={index}>
                                            <div key={index} className="flex items-center justify-between mb-4">
                                                <div className="flex items-center space-x-4">
                                                    <Avatar>
                                                        <AvatarImage src={request?.image_path} alt={request?.name} />
                                                        <AvatarFallback>{request?.name.slice(0, 2)}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-medium">{request?.name}</p>
                                                        <p className="text-sm text-gray-500">{request?.email}</p>
                                                    </div>
                                                </div>
                                                <Button size="sm" className='bg-green-500'>connected</Button>
                                            </div>
                                        </Link>
                                    )) : (
                                        <p className='text-center py-5'>No connections yet</p>
                                    )}
                                </ScrollArea>
                            </TabsContent>
                            <TabsContent value="messages">
                                <ScrollArea className="h-[300px]">
                                    {messages.map((message) => (
                                        <div key={message.id} className="flex items-start space-x-4 mb-4">
                                            <Avatar>
                                                <AvatarImage src={message.avatar} alt={message.name} />
                                                <AvatarFallback>{message.name.slice(0, 2)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium">{message.name}</p>
                                                <p className="text-sm">{message.message}</p>
                                                <p className="text-xs text-gray-500">{message.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </ScrollArea>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Link href="/dashboard/messages" className="block">
                            <Button className="w-full justify-start" variant="outline">
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Send Message
                            </Button>
                        </Link>
                        <Button className="w-full justify-start" variant="outline">
                            <UserPlus className="mr-2 h-4 w-4" />
                            Connect with Student
                        </Button>
                        <Link href="/dashboard/settings" className="block">
                            <Button className="w-full justify-start" variant="outline">
                                <Settings className="mr-2 h-4 w-4" />
                                Account Settings
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Mentorship Resources</CardTitle>
                    <CardDescription>
                        Improve your mentoring skills with these resources
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            "Effective Communication Strategies",
                            "Building Trust with Mentees",
                            "Goal Setting in Mentorship"
                        ].map((resource, index) => (
                            <Card key={index}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {resource}
                                    </CardTitle>
                                    <Book className="h-4 w-4 text-blue-600" />
                                </CardHeader>
                                <CardContent>
                                    <Button variant="link" className="px-0">
                                        Learn More <ChevronRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}