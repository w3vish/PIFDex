import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Intercept requests to `/404` and redirect to your dynamic Pokémon page
  if (pathname === '/404') {
    // Redirect to the Pokémon page for sprite ID 404
    return NextResponse.rewrite(new URL('/', request.url));
  }

  return NextResponse.next(); // Continue with the request
}

export const config = {
  matcher: ['/404'], // Only apply middleware to `/404`
};
