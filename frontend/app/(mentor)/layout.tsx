import React from 'react'
import { TokenProvider } from '@/lib/token-provider'

export default function MentorLayout({ children }: { children: React.ReactNode }) {

    return (
        <TokenProvider>
            <div className="flex flex-col min-h-screen">
                <main className="flex-grow">
                    {children}
                </main>
            </div>
        </TokenProvider>
    )

}