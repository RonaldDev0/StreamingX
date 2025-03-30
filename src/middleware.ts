import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse, NextRequest } from 'next/server'

export async function middleware (req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const { data: { session } } = await supabase.auth.getSession()
  const { pathname, searchParams } = req.nextUrl

  if (searchParams.has('code')) return res

  if (pathname === '/login' && session?.user?.role === 'authenticated') {
    return NextResponse.redirect(new URL('/', req.url))
  }

  if (!session && ['/profile', '/upload'].includes(pathname)) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|manifest.json|icons/|svg/).*)']
}
