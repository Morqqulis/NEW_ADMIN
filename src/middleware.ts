import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
	// Add debug logging
	console.log('Middleware path:', request.nextUrl.pathname)
	console.log('Auth cookie:', request.cookies.get('auth_token')?.value)

	const isAuthenticated = request.cookies.has('auth_token')
	const isLoginPage = request.nextUrl.pathname === '/login'

	// Public paths that don't require auth
	const publicPaths = ['/login', '/_next', '/api/auth', '/favicon.ico']

	const isPublicPath = publicPaths.some(path => request.nextUrl.pathname.startsWith(path))

	if (!isAuthenticated && !isPublicPath) {
		return NextResponse.redirect(new URL('/login', request.url))
	}

	if (isAuthenticated && isLoginPage && request.nextUrl.pathname === '/') {
		return NextResponse.redirect(new URL('/dashboard', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico).*)',
	],
}
