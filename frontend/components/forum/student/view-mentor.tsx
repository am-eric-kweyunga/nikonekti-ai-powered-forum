"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Star, MessageCircle, ThumbsUp, Send, MapPin, Clock, Target, Brain, CalendarClock, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

interface Review {
    id: number;
    author: string;
    content: string;
    rating: number;
}

interface Mentor {
    name: string;
    email: string;
    location: string;
    occupation: string;
    type: string;
    experience: string;
    interests: string;
    goals: string;
    availability: string;
    image_path: string;
}

const StarRating: React.FC<{ rating: number; onRate: (rating: number) => void }> = ({ rating, onRate }) => {
    return (
        <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                    key={star}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onRate(star)}
                >
                    <Star
                        className={`h-6 w-6 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                </motion.button>
            ))}
        </div>
    )
}

const MentorProfile: React.FC<{ mentor: Mentor }> = ({ mentor }) => {
    const [likes, setLikes] = useState(0)
    const [userRating, setUserRating] = useState(0)
    const [reviewContent, setReviewContent] = useState('')
    const [reviews, setReviews] = useState<Review[]>([])

    const params = useSearchParams();

    const handleLike = () => {
        setLikes(likes + 1)
    }

    const handleSubmitReview = () => {
        if (reviewContent && userRating > 0) {
            const newReview: Review = {
                id: reviews.length + 1,
                author: "You",
                content: reviewContent,
                rating: userRating,
            }
            setReviews([newReview, ...reviews])
            setReviewContent('')
            setUserRating(0)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full md:w-[calc(100%-425px)] md:flex flex-col overflow-y-auto max-w-4xl mx-auto p-6 bg-gradient-to-br from-white via-blue-50 to-white dark:from-gray-900 dark:to-gray-800"
        >
            <motion.div
                className="bg-white dark:bg-gray-800 rounded-lg border mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <div className='flex items-center pb-4 mb-4 p-6 justify-between border-b'>
                    <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center">Mentor</h1>
                    <Button
                        variant="outline"
                        size={"icon"}
                        className="text-blue-700 rounded-full dark:text-blue-300 flex items-center justify-center"
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
                <div className="flex items-center mb-4 px-6">
                    <Avatar className="h-24 w-24 rounded-full mr-4 relative">
                        <Image fill src={mentor.image_path} alt={mentor.name} className="rounded-full object-cover" />
                    </Avatar>
                    <div>
                        <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-300">{mentor.name}</h1>
                        <p className="text-gray-600 dark:text-gray-400">{mentor.occupation}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{mentor.email}</p>
                        <div className="flex items-center mt-2">
                            {reviews.length > 0 ? (
                                <StarRating rating={Math.round(reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length)} onRate={() => { }} />
                            ) : (
                                <p className="text-gray-600 dark:text-gray-400">No ratings yet</p>
                            )}
                        </div>
                    </div>
                </div>
                <p className="text-gray-700 px-6 dark:text-gray-300 mb-4">{mentor.goals}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 px-6">
                    <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{mentor.location}</span>
                    </div>
                    <div className="flex items-center">
                        <Brain className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{mentor.type}</span>
                    </div>
                    <div className="flex items-center">
                        <Clock className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{mentor.availability} hrs/week</span>
                    </div>
                    <div className="flex items-center">
                        <Target className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{mentor.interests}</span>
                    </div>
                </div>
                <div className="flex justify-between pb-6 px-6">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => {
                            const newParams = new URLSearchParams(params);
                            newParams.delete("profile", "view");
                            newParams.set("schedule", "meeting");
                            window.history.pushState({}, '', `${window.location.pathname}?${newParams}`);
                        }}
                    >
                        <CalendarClock className="mr-2 h-5 w-5" />
                        Schedule Meeting
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleLike}>
                        <ThumbsUp className="mr-2 h-5 w-5" />
                        Like ({likes})
                    </Button>
                </div>
            </motion.div>

            <motion.div
                className="bg-white dark:bg-gray-800 rounded-lg border p-6 mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                <h2 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-300">Leave a Review</h2>
                <StarRating rating={userRating} onRate={setUserRating} />
                <Textarea
                    className="mt-4 mb-2"
                    placeholder="Write your review here..."
                    value={reviewContent}
                    onChange={(e) => setReviewContent(e.target.value)}
                />
                <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSubmitReview}>
                    <Send className="mr-2 h-5 w-5" />
                    Submit Review
                </Button>
            </motion.div>

            <motion.div
                className="bg-white dark:bg-gray-800 rounded-lg border p-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                <h2 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-300">Reviews</h2>
                <AnimatePresence>
                    {reviews.map((review) => (
                        <motion.div
                            key={review.id}
                            className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold text-gray-700 dark:text-gray-300">{review.author}</span>
                                <div className="flex">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400">{review.content}</p>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    )
}

export default MentorProfile