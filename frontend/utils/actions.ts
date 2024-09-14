"use server"
import { getSession } from "@auth0/nextjs-auth0"

export async function getStudentsConnections() {
    const session = await getSession()

    return fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/student_connections`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            student_email: session?.user?.email,
        })
    })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                return data.connections
            } else {
                console.error('Error fetching connections:', data.message)
                return []
            }
        })
        .catch(error => {
            console.error('Error fetching connections:', error)
            return []
        })
}