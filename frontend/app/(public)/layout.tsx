import React from 'react'
import { Toaster } from "@/components/ui/toaster"

export default function PublicLayout({ children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='w-full h-screen'>
            {children}
            <Toaster />
        </div>
    )
}
