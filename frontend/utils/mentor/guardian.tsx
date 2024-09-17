"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { useTokenContext } from '@/lib/token-provider'
import Loading from '@/components/custom/loading'

const Guardian = ({ children }: { children: React.ReactNode }) => {

    const { token, isLoading } = useTokenContext()
    const router = useRouter()

    if (!token) {
        router.push("/mentor/login")
    } else if (isLoading) {
        return (
            <Loading isLoading={isLoading} />
        )
    } if (token && token !== undefined) {
        return <>{children}</>
    }
    
    return null
}

export default Guardian