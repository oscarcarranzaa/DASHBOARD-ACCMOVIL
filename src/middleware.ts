import { jwtVerify } from 'jose'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('updateToken')
  const tokenValue = token?.value

  // Si el usuario intenta acceder a `/login` y ya tiene un token, redirigir a `/dash`
  if (request.nextUrl.pathname === '/login' && tokenValue) {
    try {
      const secretKey = process.env.JWT_REFRESH_KEY || ''
      const secret = new TextEncoder().encode(secretKey)

      await jwtVerify(tokenValue, secret)
      return NextResponse.redirect(new URL('/dash/dashboard', request.url))
    } catch (error) {
      // Si el token es inválido o expira, no se redirige y se permite el acceso a `/login`
    }
  }

  // Si el token no existe o es inválido, redirigir al usuario a `/login` cuando intenta acceder a `/dash`
  if (request.nextUrl.pathname.startsWith('/dash') && !tokenValue) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    // Verificar el token para rutas protegidas en `/dash`
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
  matcher: ['/dash/:path*', '/login'],
}
