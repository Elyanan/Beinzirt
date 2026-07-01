import { NextResponse, type NextRequest } from 'next/server'
import {
  ADMIN_COOKIE,
  adminCookieOptions,
  createAdminSessionToken,
  verifyAdminSession,
} from '@/lib/admin-auth'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAdminRoute = pathname.startsWith('/admin')
  if (!isAdminRoute) return NextResponse.next()

  const isLoginRoute = pathname === '/admin/login'
  const authenticated = await verifyAdminSession(request.cookies.get(ADMIN_COOKIE)?.value)

  if (!authenticated && !isLoginRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  if (authenticated && isLoginRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/dashboard'
    url.search = ''
    const response = NextResponse.redirect(url)
    response.cookies.set(ADMIN_COOKIE, await createAdminSessionToken(), adminCookieOptions())
    return response
  }

  const response = NextResponse.next()
  if (authenticated) {
    response.cookies.set(ADMIN_COOKIE, await createAdminSessionToken(), adminCookieOptions())
  }
  return response
}

export const config = {
  matcher: ['/admin/:path*'],
}
