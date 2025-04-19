import { jwtVerify } from 'jose'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('updateToken')?.value

  // Verificar el token
  const verifyToken = async (token: string) => {
    const secret = new TextEncoder().encode(process.env.JWT_REFRESH_KEY || '')
    return await jwtVerify(token, secret)
  }

  const isLoginPage = request.nextUrl.pathname === '/login'
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/dash')

  if (token) {
    try {
      await verifyToken(token)
      // Usuario autenticado intenta ir a login
      if (isLoginPage) {
        return NextResponse.redirect(new URL('/dash/dashboard', request.url))
      }

      // Usuario autenticado en ruta válida
      return NextResponse.next()
    } catch (error) {
      // Token inválido o expirado
      if (isProtectedRoute) {
        return NextResponse.redirect(new URL('/login', request.url))
      }

      // Si está en login con token inválido, lo dejamos entrar
      return NextResponse.next()
    }
  } else {
    // Si no hay token y es ruta protegida, redirigir a login
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Dejar pasar a login sin token
    return NextResponse.next()
  }
}

export const config = {
  matcher: ['/dash/:path*', '/login'],
}
