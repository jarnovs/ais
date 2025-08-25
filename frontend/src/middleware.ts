import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

async function verifyToken(token: string): Promise<boolean> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth`,
      {
        headers: {
          Cookie: `token=${token}`,
        },
      },
    );
    return response.ok;
  } catch (error) {
    console.error('Token verification failed:', error);
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('token');

    if (!token) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    const isValidToken = await verifyToken(token.value);
    if (!isValidToken) {
      const response = NextResponse.redirect(
        new URL('/admin/login', request.url),
      );
      response.cookies.delete('token');
      return response;
    }
  }

  if (pathname === '/admin/login') {
    const token = request.cookies.get('token');
    if (token) {
      const isValidToken = await verifyToken(token.value);
      if (isValidToken) {
        const adminUrl = new URL('/admin', request.url);
        return NextResponse.redirect(adminUrl);
      } else {
        const response = NextResponse.next();
        response.cookies.delete('token');
        return response;
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
