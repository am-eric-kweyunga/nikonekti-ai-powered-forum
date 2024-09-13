import React from 'react';
import HeaderComponent from '@/components/forum/header';
import SidebarComponent from '@/components/forum/sidebar';
import { getSession } from '@auth0/nextjs-auth0';
import Error500 from '@/components/errors/500';
interface SessionProviderProps {
    children: React.ReactNode;
}

const SessionProvider = async ({ children }: SessionProviderProps) => {
    const session = await getSession();

    // regiter the user to the database
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/add_student`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: session?.user?.email,
            name: session?.user?.name,
            picture: session?.user?.picture,
        })
    })
    const data = await res.json();
    console.log(data);
    if (data.status === "success" || data.authorization === 'Authorized') {
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
    } else if (data.status === "error") {
        return (
            <Error500 />
        );
    }
};

export default SessionProvider;
