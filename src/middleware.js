import { NextResponse } from 'next/server';
import { verifyToken } from './utils/jwtAuth';
import { notifyError } from "@/utils/notify";

const secret = 'national_plastic';

export const config = {
  matcher: ['/admin/:path*'],
  // runtime: 'nodejs' // Specify Node.js runtime here
};

export async function middleware(request) {
  const token = request.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  try {
    const decodedToken = await verifyToken(token, secret);
    const role = decodedToken.role;
    if (role === 'admin') {
      return NextResponse.next();
    }
  } catch (error) {
    return NextResponse.redirect(new URL('/Login', request.url));
  }
  
  notifyError("Session Expired Please Login Again");
  return NextResponse.redirect(new URL('/Login', request.url));
}