import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const tokenAccount = request.cookies.get("tokenAccount")?.value;
  const tokenCompany = request.cookies.get("tokenCompany")?.value;

  const pathname = request.nextUrl.pathname;

  if(pathname.startsWith('/user-manage')) {
    if(!tokenAccount) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  if(pathname.startsWith('/company-manage')) {
    if(!tokenCompany) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }
}
 
export const config = {
  matcher: [
    '/user-manage/:path*',
    '/company-manage/:path*',
  ],
}