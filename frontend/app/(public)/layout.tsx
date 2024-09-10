// creating a layout for public group
import SessionProvider from '@/lib/provider';
import React from 'react'

export default function PublicLayout({ children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='w-full h-screen'>
            <SessionProvider>
                {children}
            </SessionProvider>
        </div>
    )
}
