"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar } from "@/components/ui/avatar"
import { AlertTriangle, Send, X } from 'lucide-react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

interface Mentor {
    name: string;
    occupation: string;
    image_path: string;
}

interface ReportIssueProps {
    mentor: Mentor;
}

const issueTypes = [
    "Inappropriate behavior",
    "Not responding to messages",
    "Missed scheduled meeting",
    "Poor quality of mentorship",
    "Other"
]

const ReportIssue: React.FC<ReportIssueProps> = ({ mentor }) => {
    const [issueType, setIssueType] = useState<string | undefined>(undefined)
    const [description, setDescription] = useState('')
    const [error, setError] = useState<string | null>(null)

    const params = useSearchParams();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!issueType || !description) {
            setError('Please fill in all required fields')
            return
        }
        // Here you would typically send the issue report to your backend
        console.log('Issue reported:', { issueType, description })
        // Reset form and show confirmation (in a real app, you'd probably navigate to a confirmation page)
        setIssueType(undefined)
        setDescription('')
        setError(null)
        alert('Issue reported successfully. We will review your report and take appropriate action.')
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full md:w-[calc(100%-425px)] md:flex flex-col overflow-y-auto max-w-4xl mx-auto p-6 bg-gradient-to-br from-white via-blue-50 to-white dark:from-gray-900 dark:to-gray-800"
        >
            <motion.div
                className="bg-white dark:bg-gray-800 rounded-lg border p-6 mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <div className='flex items-center mb-4 justify-between'>
                    <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 flex items-center">
                        <AlertTriangle className="mr-2 h-6 w-6" />
                        Report an Issue
                    </h1>
                    <Button
                        variant="outline"
                        size={"icon"}
                        className="text-red-700 rounded-full dark:text-red-300 flex items-center justify-center"
                        onClick={() => {
                            const newParams = new URLSearchParams(params);
                            newParams.delete("profile", "view");
                            newParams.delete("schedule", "meeting");
                            newParams.delete("report", "issue");
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
                    <div>
                        <label htmlFor="issueType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Type of Issue
                        </label>
                        <Select onValueChange={setIssueType}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select the type of issue" />
                            </SelectTrigger>
                            <SelectContent>
                                {issueTypes.map((type) => (
                                    <SelectItem key={type} value={type}>{type}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Description of the Issue
                        </label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Please provide details about the issue you're experiencing"
                            className="w-full"
                            rows={5}
                        />
                    </div>
                    {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                    )}
                    <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
                        <Send className="mr-2 h-5 w-5" />
                        Submit Report
                    </Button>
                </form>
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                    We take all reports seriously and will investigate each one thoroughly. Thank you for helping us maintain a safe and productive mentorship environment.
                </p>
            </motion.div>
        </motion.div>
    )
}

export default ReportIssue