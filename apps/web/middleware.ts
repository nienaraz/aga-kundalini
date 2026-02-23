import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  // ---- Public auth pages – allow access even when not authenticated ----------
  if (pathname.startsWith('/account/login')) {
    // If already authenticated, redirect away from login page
    if (token) {
      return NextResponse.redirect(new URL('/account', request.url));
    }
    return NextResponse.next();
  }

  // ---- Not authenticated – redirect to login --------------------------------
  if (!token) {
    const loginUrl = new URL('/account/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ---- Admin routes – require admin role ------------------------------------
  if (pathname.startsWith('/admin')) {
    if (token.role !== 'admin') {
      // Authenticated but not admin – send to account page with message
      return NextResponse.redirect(new URL('/account?error=unauthorized', request.url));
    }
  }

  // ---- Authenticated user – allow access ------------------------------------
  return NextResponse.next();
}

// ---------------------------------------------------------------------------
// Matcher – only run middleware on protected routes
// ---------------------------------------------------------------------------
export const config = {
  matcher: ['/account/:path*', '/admin/:path*', '/paths/progress/:path*'],
};
