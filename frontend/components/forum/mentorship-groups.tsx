import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { PlusIcon, ChevronRightIcon } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import Link from 'next/link'

const MentorshipGroups = () => {
    return (
        <Card>
            <CardHeader className="flex items-center justify-between">
                <CardTitle>Mentorship Groups</CardTitle>
                <Button variant="outline" size="sm">
                    <PlusIcon className="h-4 w-4" />
                    Join Mentorship Groups
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <Link
                        href="#"
                        className="flex items-center justify-between rounded-md bg-gray-100 px-3 py-2 hover:bg-gray-200"
                    >
                        <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8 bg-blue-700 text-white overflow-hidden">
                                <AvatarImage src=''/>
                                <AvatarFallback>JA</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-medium">Jane Appleseed</div>
                                <div className="text-sm text-gray-500">UI/UX Designer</div>
                            </div>
                        </div>
                        <ChevronRightIcon className="h-5 w-5 text-gray-500" />
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}

export default MentorshipGroups