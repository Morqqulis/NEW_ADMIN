import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const PUBLIC_PATHS = ['/login', '/_next', '/api/auth', '/favicon.ico'] as const

type PublicPath = (typeof PUBLIC_PATHS)[number]

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl
	const isAuthenticated = request.cookies.has('auth_token')

	if (PUBLIC_PATHS.some(path => pathname.startsWith(path))) {
		if (isAuthenticated && pathname === '/login') {
			return NextResponse.redirect(new URL('/', request.url))
		}
		return NextResponse.next()
	}

	if (!isAuthenticated) {
		return NextResponse.redirect(new URL('/login', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: [
		// Защищаем все пути кроме статических ресурсов
		'/((?!_next/static|_next/image|favicon.ico).*)',
		// Явно указываем API роуты которые нужно защищать
		'/api/:path*',
	],
}
