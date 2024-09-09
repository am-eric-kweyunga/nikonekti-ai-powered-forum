import HeaderComponent from '@/components/forum/header';
import SidebarComponent from '@/components/forum/sidebar';
import React from 'react'
import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';

export default async function SessionLayout({ children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getSession();

    if (!session?.user) {
        return redirect('/api/auth/login')
    }
    return (
        <div className="flex h-svh w-full flex-col bg-white">
            <HeaderComponent />
            <div className="flex flex-1 overflow-y-auto">
                <SidebarComponent />
                {children}
            </div>
        </div>
    )
}