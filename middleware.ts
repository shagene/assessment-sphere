import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getTenant } from './lib/getTenant'

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const { hostname } = new URL(request.url)
  const subdomains = hostname.split('.').slice(0, -2) // Remove 'assessmentsphere.com'

  if (subdomains.length === 0) {
    // Handle main site
    return NextResponse.next()
  }

  const tenant = await getTenant(subdomains)

  if (!tenant) {
    // Redirect to main site if tenant not found
    url.hostname = 'assessmentsphere.com'
    return NextResponse.redirect(url)
  }

  // Add tenant info to request headers
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-tenant-id', tenant.id)
  // Remove or comment out the following line:
  // requestHeaders.set('x-tenant-type', tenant.type)

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
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
}
