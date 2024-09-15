"use server"
import { getSession } from "@auth0/nextjs-auth0"
import { cookies } from "next/headers"

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

export async function getUser() {
    const session = await getSession()
    return session?.user
}

export async function setCookie({ name, value, expires }: { name: string, value: string, expires: Date }) {
    const session = await getSession()

    if (session?.user?.email) {
        cookies().set({
            name: name,
            value: value,
            expires: expires,
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
        })
    }

}

export async function registerStudent() {
    const session = await getSession()

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/add_student`, {
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
    if (!response.ok) {
        throw new Error('Failed to register student')
    }
    return response
}

export async function getMyMentors() {
    const session = await getSession()
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/my_mentors`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            student_email: session?.user?.email,
        })
    })
    if (!response.ok) {
        throw new Error('Failed to fetch mentors')
    }
    const data = await response.json()
    return data.mentors
}

export async function fetchStudent() {

    const session = await getSession()

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/find_student`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            student_email: session?.user?.email,
        })
    })
    if (!response.ok) {
        throw new Error('Failed to fetch student')
    }
    const data = await response.json()
    console.log(data)
    return data
}