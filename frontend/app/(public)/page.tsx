import { redirect } from 'next/navigation'
import React from 'react'
import { getSession } from '@auth0/nextjs-auth0'

const index = async () => {
  const session = await getSession();
  if ( session?.user) {
    return redirect(`/${session?.user?.email}`)
  }
  return redirect('http://nikonekti.vercel.app/api/auth/login')
}

export default index