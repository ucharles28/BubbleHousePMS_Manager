import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith('/login') || 
  !request.nextUrl.pathname.startsWith('/resetpassword') || !request.nextUrl.pathname.startsWith('/forgotpassword')) {
    const cookie = request.cookies.get('logged-in')
    if (cookie) {
      if (cookie.value === "true") return;
    }
    return NextResponse.redirect(new URL('/login', request.url))
  }
}