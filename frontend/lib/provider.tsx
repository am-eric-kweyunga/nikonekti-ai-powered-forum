import React from 'react';
import HeaderComponent from '@/components/forum/header';
import SidebarComponent from '@/components/forum/sidebar';
import { cookies } from 'next/headers';

interface SessionProviderProps {
    children: React.ReactNode;
}

const SessionProvider = async ({ children }: SessionProviderProps) => {
    const cookieStore = cookies();  // Access server-side cookies
    const savedUserCookie = cookieStore.get('userAuth');

    if (savedUserCookie) {
        const savedUser = JSON.parse(savedUserCookie.value);

        if (savedUser.authorization === 'Authorized') {
            return (
                <div className="flex h-screen w-full flex-col bg-white">
                    <HeaderComponent />
                    <div className="flex flex-1 overflow-y-auto h-full overflow-auto">
                        <SidebarComponent />
                        <div className='overflow-y-auto h-full overflow-auto flex-1'>
                            {children}
                        </div>
                    </div>
                </div>
            );
        }
    }

    // If no cookie, still return the UI
    return (
        <div className="flex h-screen w-full flex-col bg-white">
            <HeaderComponent />
            <div className="flex flex-1 overflow-y-auto h-full overflow-auto">
                <SidebarComponent />
                <div className='overflow-y-auto h-full overflow-auto flex-1'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default SessionProvider;
