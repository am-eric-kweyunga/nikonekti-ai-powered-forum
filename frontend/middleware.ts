import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0/edge';
import { notFound } from 'next/navigation';

export async function middleware(req: NextRequest) {
  // Get session using Auth
  const session = await getSession();

  // Check if the request path starts with '/student'
  if (req.nextUrl.pathname.startsWith(`/student`)) {

    // If session is not present, redirect to public page
    if (!session) {
      const loginUrl = new URL('/', process.env.AUTH0_BASE_URL);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  } else {
    // redirecting to 404 page
    notFound();
  }

}

export const config = {
  matcher: ['/student/:path*'],
};
