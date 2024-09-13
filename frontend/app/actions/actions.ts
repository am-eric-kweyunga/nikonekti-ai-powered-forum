import { UserProfile } from "@auth0/nextjs-auth0/client"

// fetching students from the database
export async function fetchStudent({ user }: { user: UserProfile }) {
    if (!user || !user?.email) {
        console.error("No user or email provided");
        return null; // or throw an error based on your requirements
    }
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/find_student`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: user?.email,
            }),
        })

        if (!res.ok) {
            throw new Error(`Error: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();

        return data;

    } catch (error) {
        console.error("Error fetching student data:", error);
    }
}
