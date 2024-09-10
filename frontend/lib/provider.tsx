import { getSession } from '@auth0/nextjs-auth0';
import React from 'react';
import { redirect } from 'next/navigation';
import HeaderComponent from '@/components/forum/header';
import SidebarComponent from '@/components/forum/sidebar';

interface SessionProviderProps {
    children: React.ReactNode;
}

const SessionProvider = async ({ children }: SessionProviderProps) => {
    const session = await getSession();
    
    if (!session?.user) {
        redirect('/');  // Redirect if no session
        return null;
    }

    // Data for the student profile
    const studentProfileData = {
        name: session.user.name,
        email: session.user.email,
        bio: '',
        educationLevel: '',
        institution: '',
        subjects: '',
        careerInterest: '',
        dreamJob: '',
        softSkills: '',
        mentorshipHelp: '',
        goals: '',
    };

    try {
        // Registering students to the database by fetching /add_student endpoint
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/add_student`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(studentProfileData),
        });

        const response = await res.json();
        
        if (response.status !== "success" && response.authorization !== 'Authorized') {
            return (
                <div className="flex h-screen w-full flex-col bg-white">
                    <HeaderComponent />
                    <div className="flex flex-1 overflow-y-auto h-full overflow-auto">
                        <SidebarComponent />
                        <div className='overflow-y-auto h-full overflow-auto flex-1'>
                            <div className='flex flex-col items-center justify-center h-full'>
                                <h1 className='text-2xl font-bold'>You are not authorized to access this page.</h1>
                                <p className='text-muted-foreground'>Please contact the administrator for more information.</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

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

    } catch (error) {
        console.error("Error fetching student data:", error);
        return (
            <div className="flex h-screen w-full flex-col bg-white">
                <HeaderComponent />
                <div className="flex flex-1 overflow-y-auto h-full overflow-auto">
                    <SidebarComponent />
                    <div className='overflow-y-auto h-full overflow-auto flex-1'>
                        <div className='flex flex-col items-center justify-center h-full'>
                            <h1 className='text-2xl font-bold'>An error occurred.</h1>
                            <p className='text-muted-foreground'>Please try again later.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default SessionProvider;
