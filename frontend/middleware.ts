import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0/edge';

export async function middleware(req: NextRequest) {
  // Get session using Auth
  const session = await getSession();

  // If session is not present, redirect to login page
  if (!session) {
    const loginUrl = new URL('/api/auth/login', process.env.AUTH0_BASE_URL);
    return NextResponse.redirect(loginUrl);
  }

  // Extract user information
  const user = session.user;
  
  // Check if the request path starts with '/email'
  if (req.nextUrl.pathname.startsWith(`/${user?.email}`)) {
    return NextResponse.next();
  }

  // Redirect non-matching paths to a 404 page
  return NextResponse.redirect(new URL('/404', process.env.AUTH0_BASE_URL));
}

// Apply this middleware to all routes
export const config = {
  matcher: ['/[email]/:path*'], // Match all routes
};
