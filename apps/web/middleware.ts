import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { getBlockingFlag } from '@joga/config/featureFlags';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ---- Feature flag gating – disabled routes return 404 for non-admin ------
  const blockingFlag = getBlockingFlag(pathname);
  if (blockingFlag) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    // Allow admin users to preview disabled features
    if (!token || token.role !== 'admin') {
      return NextResponse.rewrite(new URL('/not-found', request.url), { status: 404 });
    }
    // Admin sees the page but with noindex header
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }

  // ---- Public auth pages – allow access even when not authenticated ----------
  if (pathname.startsWith('/account/login')) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (token) {
      return NextResponse.redirect(new URL('/account', request.url));
    }
    return NextResponse.next();
  }

  // ---- Protected routes – require authentication ----------------------------
  if (
    pathname.startsWith('/account') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/paths/progress')
  ) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      const loginUrl = new URL('/account/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // ---- Admin routes – require admin role ----------------------------------
    if (pathname.startsWith('/admin')) {
      if (token.role !== 'admin') {
        return NextResponse.redirect(new URL('/account?error=unauthorized', request.url));
      }
    }
  }

  // ---- Default – allow access -----------------------------------------------
  return NextResponse.next();
}

// ---------------------------------------------------------------------------
// Matcher – run on protected routes + feature-flagged routes
// ---------------------------------------------------------------------------
export const config = {
  matcher: [
    '/account/:path*',
    '/admin/:path*',
    '/paths/progress/:path*',
    '/webinars/:path*',
    '/series/:path*',
    '/challenges/:path*',
    '/members/:path*',
  ],
};
