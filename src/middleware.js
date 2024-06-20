import { NextResponse } from 'next/server';
// import { getToken } from 'next-auth/jwt';
// import { prisma } from '@prisma/client'; // Adjust the import based on your ORM

export async function middleware(req) {
    // const token = await getToken({ req, secret: process.env.JWT_SECRET });

    // if (!token) {
    //     return NextResponse.redirect(new URL('/login', req.url));
    // }

    // const user = await prisma.customer.findUnique({
    //     where: { email: token.email },
    // });

    // if (!user || user.role !== 'admin') {
    // console.log("--------------------------------------------"); 
    //     return NextResponse.redirect(new URL('/not-authorized', req.url));
    // // }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'], // Routes that require admin access
};
