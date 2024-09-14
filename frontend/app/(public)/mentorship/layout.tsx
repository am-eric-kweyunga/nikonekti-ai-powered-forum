import React from 'react'
import { getSession } from '@auth0/nextjs-auth0'
import { redirect } from 'next/navigation'


const ApplicationLayout = async ({ children }: { children: React.ReactNode }) => {
    const session = await getSession()

    if (session) {
        return redirect(`/student/mentors`)
    }

    return <>{
        children
    }</>
}

export default ApplicationLayout