import { NextResponse, type NextRequest } from 'next/server'
import { ADMIN_COOKIE, verifyAdminSession } from '@/lib/admin-auth'

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
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
