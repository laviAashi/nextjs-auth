import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === '/login' || path === '/signup' || path === '/verifyemail';

  const token = request.cookies.get('token')?.value || '';

  if (request.nextUrl.pathname.startsWith('/login') && token) {
    return NextResponse.rewrite(new URL('/login', request.nextUrl));
  }

  if (request.nextUrl.pathname.startsWith('/signup') && token) {
    return NextResponse.rewrite(new URL('/signup', request.nextUrl));
  }

  if (request.nextUrl.pathname.startsWith('/verifyemail') && token) {
    return NextResponse.rewrite(new URL('/verifyemail', request.nextUrl));
  }

  if (!token && isPublicPath) {
    return NextResponse.rewrite(new URL('/login', request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/profile', '/login', '/signup', '/verifyemail'],
};
