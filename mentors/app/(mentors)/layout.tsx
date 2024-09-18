"use client"
import React from 'react'
import { redirect } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import { getMentor } from '@/actions/auth_actions';
import { useRouter } from 'next/navigation';
function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useUser();
    const [loading, setIsLoading] = React.useState(false);
    const router = useRouter();
    const [mentor, setMentor] = React.useState();

    const Mentor = React.useCallback(async () => {
        setIsLoading(true);
        await getMentor().then((data) => {
            setIsLoading(false);
            if (data.authorization == "Unregistered mentor") {
                return router.push('https://forumnikonekti.vercel.app/mentorship/application')
            }

            if (data.authorization == "registered") {
                setMentor(data)
                return router.push('/dashboard')
            }
        });
        setIsLoading(false);
    }, [router]);

    React.useEffect(() => {
        if (user) {
            Mentor()
        }
    }, [Mentor, user])

    if (!user && !isLoading) return redirect('/api/auth/login');

    if (loading && !mentor) {
        return <div className='w-full h-full flex justify-center items-center'>
            <div className='w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
        </div>
    }

    if (!loading && mentor) {
        return (
            <div className='w-full h-full flex'>
                {children}
            </div>
        )
    }
}
export default DashboardLayout