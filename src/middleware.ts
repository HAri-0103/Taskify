import { url } from 'inspector';
import { JwtPayload } from 'jsonwebtoken';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
 
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublic = path === '/Login'|| path === '/Signup';
  const token = request.cookies.get('token')?.value||'';
  if(isPublic && token){
    return NextResponse.redirect(new URL('/',request.nextUrl));
  }
  if(!isPublic && !token){
    return NextResponse.redirect(new URL('/Login'||'/Signin',request.nextUrl));
  }
}
export const config = {
  matcher: [
    '/',
    '/Login',
    '/Signup',
  ],
}