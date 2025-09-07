import { USER_ACCESS_TOKEN } from '@/constants/common';
import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get(USER_ACCESS_TOKEN);

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/tests/:path+', '/vocabulary/:path*', '/flashcards/:path*'],
};
