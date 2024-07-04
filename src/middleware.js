import { NextResponse } from 'next/server';
import { verifyToken } from './utils/jwtAuth';
import { notifyError} from "@/utils/notify";
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
            return NextResponse.next();
        }
    } catch (error) {
        return NextResponse.redirect(new URL('/Login', req.url));
    }
    notifyError("Session Expired Please Login Again");
    return NextResponse.redirect(new URL('/unauthorized', req.url));
}

export const config = {
    matcher: ['/admin/:path*'],
};