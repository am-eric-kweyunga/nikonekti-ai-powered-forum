import React from 'react'
import { SessionProvider } from "next-auth/react"

const MentorSessionLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-svh w-full'>
            {children}
        </div>
    )

}

export default MentorSessionLayout