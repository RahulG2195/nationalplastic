import { NextResponse , NextRequest} from 'next/server';
// import { getToken } from 'next-auth/jwt';
// import { prisma } from '@prisma/client'; // Adjust the import based on your ORM
// import { verifyToken } from './utils/jwtAuth';
// import Cookies from 'js-cookie';
// import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers'
 
// export default function Page() {
//   const cookieStore = cookies()
//   const theme = cookieStore.get('theme')
//   return '...'
// }
export async function middleware(req) {
    // console.log("[][][][][][][][][][][]")
    // console.log(req.headers);
    // console.log(req.cookies);
    // console.log(req.body);
    // console.log(req.headers.cookie);
    // const cookieStore = cookies();
    // console.log(cookieStore)


    // const token = req.cookies.get('token')?.value;
    // if (!token) {
    //     return NextResponse.redirect(new URL('/login', req.url));
    // }

    // try {
    //     // Verify and decode the token
    //     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        
    //     // Check if the user role is admin
    //     if (decodedToken.role !== 'admin') {
    //       // User is not an admin, redirect to unauthorized page
    //       return NextResponse.redirect(new URL('/unauthorized', request.url));
    //     }
    //   } catch (error) {
    //     // Token is invalid, redirect to login page
    //     return NextResponse.redirect(new URL('/login', request.url));
    //   }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'], // Routes that require admin access
};
