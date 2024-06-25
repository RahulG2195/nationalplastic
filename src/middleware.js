import { NextResponse } from 'next/server';
import { verifyToken } from './utils/jwtAuth';

const secret = 'national_plastic'; 

export async function middleware(req) {
    const token = req.cookies.get('token')?.value;
    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
        const decodedToken = await verifyToken(token, secret);
        const role = decodedToken.role;

        if (role === 'admin') {
            // NextResponse.headers.set
            // NextResponse.headers.set('x-admin-access', 'true');
            return NextResponse.next();
        }
    } catch (error) {
        console.log(error.message);
        return NextResponse.redirect(new URL('/Login', req.url));
    }

    return NextResponse.redirect(new URL('/unauthorized', req.url));
}

export const config = {
    matcher: ['/admin/:path*'],
};