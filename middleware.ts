import { NextRequest, NextResponse } from 'next/server';
import { getTenant } from './lib/getTenant';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';
  const subdomains = hostname.split('.').slice(0, -2); // Assuming your main domain has two parts (e.g., example.com)

  // Allow access to the landing page, login pages, and other public routes without a tenant
  if (url.pathname === '/' || url.pathname === '/login' || url.pathname.startsWith('/login/')) {
    return NextResponse.next();
  }

  const tenant = await getTenant(subdomains);

  if (!tenant) {
    // Redirect to a 404 page or show an error
    return NextResponse.redirect(new URL('/404', request.url));
  }

  // Add tenant information to the request
  request.headers.set('x-tenant-id', tenant.id);
  request.headers.set('x-tenant-subdomain', tenant.subdomain);

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
