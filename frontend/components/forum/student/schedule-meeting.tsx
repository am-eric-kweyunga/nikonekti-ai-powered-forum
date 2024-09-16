"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Avatar } from "@/components/ui/avatar"
import { CalendarDays, Clock, MessageSquare, X } from 'lucide-react'
import Image from 'next/image'
import { toast } from '@/hooks/use-toast'
import { useSearchParams } from 'next/navigation'

interface Mentor {
    name: string;
    occupation: string;
    image_path: string;
}

interface ScheduleMeetingProps {
    mentor: Mentor;
}

const ScheduleMeeting: React.FC<ScheduleMeetingProps> = ({ mentor }) => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
    const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)
    const [topic, setTopic] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState<string | null>(null)

    const params = useSearchParams();
    const mentor_param_mail = params.get("mentor");
    const mentor_param_profile = params.get("profile");
    const mentor_param_schedule = params.get("schedule");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedDate || !selectedTime || !topic) {
            setError('Please fill in all required fields')
            return
        }
        // Here you would typically send the meeting request to your backend
        console.log('Meeting scheduled:', { selectedDate, selectedTime, topic, description })
        setSelectedDate(undefined)
        setSelectedTime(undefined)
        setTopic('')
        setDescription('')
        setError(null)
        toast({
            title: 'Meeting scheduled!',
            description: 'Your meeting has been scheduled successfully.',
        })
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full md:w-[calc(100%-425px)] md:flex flex-col overflow-y-auto max-w-4xl mx-auto p-6 bg-gradient-to-br from-white via-blue-50 to-white dark:from-gray-900 dark:to-gray-800"
        >
            <motion.div
                className="bg-white/80 dark:bg-gray-800 rounded-lg  p-6 mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <div className='flex justify-between items-center mb-4'>
                    <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-300 ">Schedule a Meeting</h1>
                    <Button
                        variant="outline"
                        size={"icon"}
                        className="text-blue-700 dark:text-blue-300mrounded-full flex items-center justify-center"
                        onClick={() => {
                            const newParams = new URLSearchParams(params);
                            newParams.delete("profile", "view");
                            newParams.delete("schedule", "meeting");
                            window.history.pushState({}, '', `${window.location.pathname}?${newParams}`);
                        }}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex items-center mb-6">
                    <Avatar className="h-16 w-16 rounded-full mr-4 relative">
                        <Image fill src={mentor.image_path} alt={mentor.name} className="rounded-full object-cover" />
                    </Avatar>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{mentor.name}</h2>
                        <p className="text-gray-600 dark:text-gray-400">{mentor.occupation}</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className='w-full flex justify-center items-center flex-col transition-all duration-300 ease-linear'>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Select Date
                        </label>
                        <Calendar
                            mode="single"
                            selected={selectedDate}

                            fromYear={2024}
                            toYear={2030}
                            onSelect={(date) => setSelectedDate(date)}
                            className="rounded-md border !w-full flex justify-center items-center transition-all duration-300 ease-linear"
                        />
                    </div>
                    <div>
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Select Time
                        </label>
                        <Select onValueChange={setSelectedTime}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a time slot" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="09:00">09:00 AM</SelectItem>
                                <SelectItem value="10:00">10:00 AM</SelectItem>
                                <SelectItem value="11:00">11:00 AM</SelectItem>
                                <SelectItem value="13:00">01:00 PM</SelectItem>
                                <SelectItem value="14:00">02:00 PM</SelectItem>
                                <SelectItem value="15:00">03:00 PM</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Meeting Topic
                        </label>
                        <Input
                            id="topic"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="e.g., Career Advice, Project Discussion"
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Description (Optional)
                        </label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Provide any additional details or questions you'd like to discuss"
                            className="w-full"
                        />
                    </div>
                    {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                    )}
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        <CalendarDays className="mr-2 h-5 w-5" />
                        Schedule Meeting
                    </Button>
                </form>
            </motion.div>
        </motion.div>
    )
}
export default ScheduleMeeting