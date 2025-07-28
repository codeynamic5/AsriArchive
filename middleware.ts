import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is for admin routes
  if (request.nextUrl.pathname.startsWith('/admin/dashboard') || 
      request.nextUrl.pathname.startsWith('/admin/upload')) {
    
    // In a real app, you'd verify the JWT token or session here
    // For now, we'll let the client-side handle the authentication
    // since we're using localStorage
    
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*', '/admin/upload/:path*']
};
