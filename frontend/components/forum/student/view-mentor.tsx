import React from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { UserPlus, MessageCircle, Lightbulb, Target } from 'lucide-react'
import Link from 'next/link'

interface ChatIconProps {
    size?: number
    color?: string
    backgroundColor?: string
}

const ChatIcon: React.FC<ChatIconProps> = ({ size = 80, color = "#1D58B0", backgroundColor = "white" }) => {
    return (
        <motion.svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
            <circle cx="50" cy="50" r="50" fill={color} />
            <circle cx="50" cy="50" r="43" fill={backgroundColor} />
            <circle cx="35" cy="40" r="6" fill={color} />
            <circle cx="65" cy="40" r="6" fill={color} />
            <path
                d="M35 60C35 60 50 70 65 60"
                stroke={color}
                strokeWidth="4"
                strokeLinecap="round"
            />
            <path
                d="M85 50C85 69.33 69.33 85 50 85C30.67 85 15 69.33 15 50C15 30.67 30.67 15 50 15C69.33 15 85 30.67 85 50Z"
                stroke={color}
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M85 65L95 75"
                stroke={color}
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </motion.svg>
    )
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <motion.div
        className="bg-white p-6 rounded-lg shadow-md border border-blue-500/20 flex flex-col items-center text-center"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
        <div className="text-blue-600 mb-4">{icon}</div>
        <h3 className="text-sm font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-xs">{description}</p>
    </motion.div>
)

export default function ViewMentor() {
    return (
        <motion.div
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 10, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full hidden md:w-[calc(100%-425px)] justify-center items-center md:flex flex-col gap-6 md:px-4 h-full bg-gradient-to-br from-white via-blue-50 to-white dark:from-gray-900 dark:to-gray-800"
            id="chat_play_ground"
        >
            <div className="flex flex-col items-center justify-center w-full text-center">
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <ChatIcon />
                </motion.div>
                <motion.h1
                    className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Start Your Mentorship Journey
                </motion.h1>
                <motion.p
                    className="text-gray-600 text-sm dark:text-gray-400 mb-8 max-w-md"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    Connect with experienced mentors, gain valuable insights, and take the next step in your career. Your future starts with a conversation!
                </motion.p>
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <Link href="/student/mentors">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:shadow-xl transition duration-300">
                            <UserPlus className="mr-2 h-5 w-5" />
                            Find a Mentor
                        </Button>
                    </Link>
                </motion.div>
            </div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                <FeatureCard
                    icon={<MessageCircle size={32} />}
                    title="Expert Guidance"
                    description="Get personalized advice from industry professionals to navigate your career path."
                />
                <FeatureCard
                    icon={<Lightbulb size={32} />}
                    title="Inspire Growth"
                    description="Discover new perspectives and ideas to fuel your personal and professional development."
                />
            </motion.div>
        </motion.div>
    )
}