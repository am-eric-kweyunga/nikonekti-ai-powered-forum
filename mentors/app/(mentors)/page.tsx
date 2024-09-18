import { getSession } from '@auth0/nextjs-auth0'
import { redirect } from 'next/navigation';
const Page = async () => {
    const session = await getSession();
    if (!session) return null;
    return redirect('/dashboard')

}

export default Page