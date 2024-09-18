"use server"
import { getSession } from '@auth0/nextjs-auth0';


export async function getMentor() {
    const session = await getSession();

    if (!session) return null;

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/find_mentor`, {
            method: 'POST',
            body: JSON.stringify({
                "email": session.user.email,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        return data;


    } catch (error) {
        console.log(error);
    }
}

// getting mentor connections
export async function getMentorConnections() {
    const session = await getSession();
    if (!session) return null;

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/mentor_connections`, {
            method: 'POST',
            body: JSON.stringify({
                "mentor_email": session.user.email,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }

}