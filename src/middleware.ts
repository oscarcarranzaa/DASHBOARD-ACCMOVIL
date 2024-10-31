import { jwtVerify } from 'jose'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('updateToken')

  if (token?.value === undefined) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const tokenValue = token?.value
  try {
    if (tokenValue) {
      const secretKey = process.env.JWT_REFRESH_KEY || ''

      const secret = new TextEncoder().encode(secretKey)

      await jwtVerify(tokenValue, secret)
      return NextResponse.next()
    }
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}
export const config = {
  matcher: '/dash/:path*',
}
